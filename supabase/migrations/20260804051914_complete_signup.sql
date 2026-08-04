create or replace function public.complete_signup(
    p_username text,
    p_avatar_url text,
    p_invite_code text
)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
    v_user_id uuid;
    v_profile public.profiles;
    v_invite invite_codes%rowtype;
begin
    -- Current authenticated user
    v_user_id := auth.uid();

    if v_user_id is null then
        raise exception 'Not authenticated';
    end if;

    -- Lock invite code row to prevent concurrent use
    select *
    into v_invite
    from invite_codes
    where code_hash = p_invite_code
    for update;

    if not found then
        raise exception 'Invalid invite code';
    end if;

    if v_invite.used_at is not null then
        raise exception 'Invite code already used';
    end if;

    if v_invite.expires_at is not null
       and v_invite.expires_at < now() then
        raise exception 'Invite code expired';
    end if;

    -- Prevent duplicate profile creation
    if exists (
        select 1
        from profiles
        where id = v_user_id
    ) then
        raise exception 'Profile already exists';
    end if;

    -- Create profile
    insert into profiles (
        id,
        username,
        avatar_url
    )
    values (
        v_user_id,
        p_username,
        p_avatar_url
    )
    returning *
    into v_profile;

    -- Consume invite
    update invite_codes
    set
        used_at = now(),
        used_by = v_user_id
    where id = v_invite.id;

    return v_profile;
end;
$$;

grant execute on function public.complete_signup(text, text, text)
to authenticated;