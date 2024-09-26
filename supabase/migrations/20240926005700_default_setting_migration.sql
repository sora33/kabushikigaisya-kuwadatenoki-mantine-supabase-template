-- https://qiita.com/ryuta_yoshida/items/c57547b1a0d57427c858

-- 権限削除
ALTER DEFAULT privileges IN SCHEMA public REVOKE all ON tables FROM anon;
ALTER DEFAULT privileges IN SCHEMA public REVOKE all ON functions FROM anon;
ALTER DEFAULT privileges IN SCHEMA public REVOKE all ON sequences FROM anon;
