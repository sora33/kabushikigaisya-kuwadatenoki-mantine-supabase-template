import { redirect } from "next/navigation";
import { createServerClient } from "~/lib/supabase/server";

export default async function Page() {
	const supabase = createServerClient();
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		return redirect("/c");
	}

	if (data) {
		return redirect("/hoge");
	}

	return redirect("/c");
}
