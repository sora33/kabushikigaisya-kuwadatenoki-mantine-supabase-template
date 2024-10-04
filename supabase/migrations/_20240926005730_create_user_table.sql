-- ユーザーテーブルの作成
-- create table public.user (
--   id uuid primary key references auth.users on delete cascade,
--   email text not null,
--   agency text not null,
--   agency_kana text not null,
--   name text not null,
--   name_kana text not null,
--   position text,
--   postal_code integer not null,
--   prefecture text not null,
--   address text,
--   phone_number integer not null,
--   contact_phone_number integer not null,
--   contact_fax_number integer,
--   related_user_id uuid references public.user(id),
--   is_organizer boolean not null default false,
--   is_lecturer boolean not null default false,
--   created_at timestamp with time zone not null default now(),
--   updated_at timestamp with time zone not null default now()
-- );

-- -- 関連ユーザーの自己参照関係を追加
-- alter table public.user
-- add constraint fk_related_user
-- foreign key (related_user_id)
-- references public.user(id);

-- comment on table public.user is 'ユーザー情報を格納するテーブル';
