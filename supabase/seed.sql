-- -- デフォルトユーザーのUUID、メールアドレス、パスワードをここに記載します。
-- WITH credentials(id, mail, pass, name) AS (
--   SELECT * FROM (VALUES
--     (gen_random_uuid(), 'admin@example.com', 'Admin1234', '管理者')
--   ) AS users(id, mail, pass, name)
-- ),
-- create_user AS (
--   INSERT INTO auth.users (id, instance_id, role, aud, email, raw_app_meta_data, raw_user_meta_data, is_super_admin, encrypted_password, created_at, updated_at, last_sign_in_at, email_confirmed_at, confirmation_sent_at, confirmation_token, recovery_token, email_change_token_new, email_change)
--   SELECT
--     id::uuid,
--     '00000000-0000-0000-0000-000000000000',
--     'authenticated',
--     'authenticated',
--     mail,
--     '{"provider":"email","providers":["email"], "role": "admin"}'::jsonb,
--     jsonb_build_object('name', name),
--     FALSE,
--     crypt(pass, gen_salt('bf')),
--     NOW(), NOW(), NOW(), NOW(), NOW(), '', '', '', ''
--   FROM credentials
--   RETURNING id
-- ),
-- -- デフォルトユーザーの認証情報を作成します。
-- create_identity AS (
--   INSERT INTO auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
--   SELECT gen_random_uuid(), id, id, jsonb_build_object('sub', id::text), 'email', NOW(), NOW(), NOW()
--   FROM create_user
--   RETURNING user_id
-- )

-- デフォルトユーザーのUUID、メールアドレス、パスワードをここに記載します。
WITH credentials(id, mail, pass, name) AS (
  SELECT * FROM (VALUES
    (gen_random_uuid(), 'admin@example.com', 'Admin1234', '管理者')
  ) AS users(id, mail, pass, name)
),
create_user AS (
  INSERT INTO auth.users (id, instance_id, role, aud, email, raw_app_meta_data, raw_user_meta_data, is_super_admin, encrypted_password, created_at, updated_at, last_sign_in_at, email_confirmed_at, confirmation_sent_at, confirmation_token, recovery_token, email_change_token_new, email_change)
  SELECT
    id::uuid,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    mail,
    '{"provider":"email","providers":["email"], "role": "admin"}'::jsonb,
    jsonb_build_object('first_name', name),
    FALSE,
    crypt(pass, gen_salt('bf')),
    NOW(), NOW(), NOW(), NOW(), NOW(), '', '', '', ''
  FROM credentials
  RETURNING id
),
-- デフォルトユーザーの認証情報を作成します。
create_identity AS (
  INSERT INTO auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  SELECT gen_random_uuid(), id, id, jsonb_build_object('sub', id::text), 'email', NOW(), NOW(), NOW()
  FROM create_user
  RETURNING user_id
)
-- メインのINSERT文またはSELECT文をここに追加
SELECT 'ユーザーとアイデンティティが正常に作成されました' AS result;
