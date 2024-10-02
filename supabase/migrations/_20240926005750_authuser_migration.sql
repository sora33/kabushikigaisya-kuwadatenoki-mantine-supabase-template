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

-- トリガー関数の作成
create or replace function public.handle_user_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (tg_op = 'INSERT') then
    insert into public.user (
      id, email, name, name_kana, position, agency, agency_kana,
      postal_code, prefecture, address, phone_number, contact_phone_number,
      contact_fax_number, related_user_id, is_organizer, is_lecturer, is_kankijuku, created_at, updated_at
    )
    values (
      new.id,
      new.email,
      coalesce(new.raw_user_meta_data->>'name', ''),
      coalesce(new.raw_user_meta_data->>'name_kana', ''),
      new.raw_user_meta_data->>'position',
      coalesce(new.raw_user_meta_data->>'agency', ''),
      coalesce(new.raw_user_meta_data->>'agency_kana', ''),
      coalesce(new.raw_user_meta_data->>'postal_code', ''),
      coalesce(new.raw_user_meta_data->>'prefecture', ''),
      coalesce(new.raw_user_meta_data->>'address', ''),
      coalesce(new.raw_user_meta_data->>'phone_number', ''),
      new.raw_user_meta_data->>'contact_phone_number',
      new.raw_user_meta_data->>'contact_fax_number',
      (case when new.raw_user_meta_data->>'related_user_id' = '' then null else (new.raw_user_meta_data->>'related_user_id')::uuid end),
      coalesce((new.raw_user_meta_data->>'is_organizer')::boolean, false),
      coalesce((new.raw_user_meta_data->>'is_lecturer')::boolean, false),
      coalesce((new.raw_user_meta_data->>'is_kankijuku')::boolean, false),
      now(),
      now()
    );
  elsif (tg_op = 'UPDATE') then
    update public.user
    set
      email = new.email,
      name = coalesce(new.raw_user_meta_data->>'name', name),
      name_kana = coalesce(new.raw_user_meta_data->>'name_kana', name_kana),
      position = new.raw_user_meta_data->>'position',
      agency = coalesce(new.raw_user_meta_data->>'agency', agency),
      agency_kana = coalesce(new.raw_user_meta_data->>'agency_kana', agency_kana),
      postal_code = coalesce(new.raw_user_meta_data->>'postal_code', postal_code),
      prefecture = coalesce(new.raw_user_meta_data->>'prefecture', prefecture),
      address = coalesce(new.raw_user_meta_data->>'address', address),
      phone_number = coalesce(new.raw_user_meta_data->>'phone_number', phone_number),
      contact_phone_number = new.raw_user_meta_data->>'contact_phone_number',
      contact_fax_number = new.raw_user_meta_data->>'contact_fax_number',
      related_user_id = (case when new.raw_user_meta_data->>'related_user_id' = '' then null else (new.raw_user_meta_data->>'related_user_id')::uuid end),
      is_organizer = coalesce((new.raw_user_meta_data->>'is_organizer')::boolean, is_organizer),
      is_lecturer = coalesce((new.raw_user_meta_data->>'is_lecturer')::boolean, is_lecturer),
      is_kankijuku = coalesce((new.raw_user_meta_data->>'is_kankijuku')::boolean, is_kankijuku),
      updated_at = now()
    where id = new.id;
  end if;
  return new;
end;
$$;

comment on function public.handle_user_changes() is 'auth.usersテーブルの変更をpublic.userテーブルに反映するトリガー関数';

-- 新規ユーザー作成時のトリガー
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_user_changes();

-- ユーザーメタデータ更新時のトリガー
create trigger on_auth_user_updated
  after update of raw_user_meta_data, raw_app_meta_data, email on auth.users
  for each row
  when (
    old.raw_user_meta_data is distinct from new.raw_user_meta_data or
    old.raw_app_meta_data is distinct from new.raw_app_meta_data or
    old.email is distinct from new.email
  )
  execute function public.handle_user_changes();


-- セミナーファイル用のストレージバケットを作成
insert into storage.buckets (id, name, public)
values ('seminar-file', 'seminar-file', true);

-- バケットのセキュリティ設定
create policy "作成は認証済みユーザーのみ可能"
  on storage.objects for insert
  with check (bucket_id = 'seminar-file' and auth.role() = 'authenticated');

create policy "読み取りは全員可能"
  on storage.objects for select
  using (bucket_id = 'seminar-file');

create policy "更新は認証済みユーザーのみ可能"
  on storage.objects for update
  using (bucket_id = 'seminar-file' and auth.role() = 'authenticated');

create policy "削除は認証済みユーザーのみ可能"
  on storage.objects for delete
  using (bucket_id = 'seminar-file' and auth.role() = 'authenticated');
