-- https://qiita.com/ryuta_yoshida/items/c57547b1a0d57427c858

-- トリガー関数
CREATE OR REPLACE FUNCTION public.handle_user_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO public.user (id, first_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'first_name');
  ELSIF (TG_OP = 'UPDATE') THEN
    UPDATE public.user
    SET first_name = NEW.raw_user_meta_data->>'first_name'
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

-- 新規ユーザー作成時のトリガー
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_changes();

-- ユーザーメタデータ更新時のトリガー
CREATE TRIGGER on_auth_user_metadata_updated
  AFTER UPDATE OF raw_user_meta_data ON auth.users
  FOR EACH ROW
  WHEN (OLD.raw_user_meta_data IS DISTINCT FROM NEW.raw_user_meta_data)
  EXECUTE FUNCTION public.handle_user_changes();
