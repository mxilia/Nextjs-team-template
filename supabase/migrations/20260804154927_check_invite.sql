create or replace function public.claim_invite_code(
    p_code_hash text
)
returns public.invite_codes
language plpgsql
security definer
set search_path = public
as $$
declare
    v_invite public.invite_codes;
begin
    update public.invite_codes
    set
        used_at = now()
    where
        code_hash = p_code_hash
        and used_at is null
        and (
            expires_at is null
            or expires_at > now()
        )
    returning *
    into v_invite;

    if not found then
        raise exception 'Invalid, expired, or already used invite code';
    end if;

    return v_invite;
end;
$$;

grant execute on function public.claim_invite_code(text)
to authenticated;