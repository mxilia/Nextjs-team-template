create table invite_codes (
    id uuid primary key
        default gen_random_uuid(),

    code_hash text not null unique,

    created_by uuid
        references profiles(id)
        on delete set null,

    used_by uuid
        references profiles(id)
        on delete set null,

    created_at timestamptz not null default now(),

    used_at timestamptz,

    expires_at timestamptz
);

create index idx_invite_codes_unused
    on invite_codes(created_at)
    where used_at is null;