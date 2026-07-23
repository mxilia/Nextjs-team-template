create extension if not exists pgcrypto;

create table profiles (
    id uuid primary key
        references auth.users(id)
        on delete cascade,

    username text not null unique,
    avatar_url text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table rooms (
    id uuid primary key
        default gen_random_uuid(),

    -- NULL for direct messages
    name text,

    created_by uuid
        references profiles(id)
        on delete set null,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),

    -- Soft delete
    deleted_at timestamptz
);

create table room_members (
    room_id uuid not null
        references rooms(id)
        on delete cascade,

    profile_id uuid not null
        references profiles(id)
        on delete cascade,

    joined_at timestamptz not null default now(),

    primary key (room_id, profile_id)
);

create table messages (
    id uuid primary key
        default gen_random_uuid(),

    room_id uuid not null
        references rooms(id)
        on delete restrict,

    sender_id uuid
        references profiles(id)
        on delete set null,

    content text not null
        check (char_length(content) > 0),

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index idx_room_members_profile
    on room_members(profile_id);

create index idx_messages_room_created
    on messages(room_id, created_at);

create index idx_messages_sender
    on messages(sender_id);

create index idx_rooms_active
    on rooms(created_at)
    where deleted_at is null;