import { createServerClient } from "~/lib/supabase";

export async function getCurrentUser() {
	const supabase = createServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const isAdmin = user?.app_metadata.role === "admin";
	const isSignedIn = !!user;
	const currentUser = user;

	return { isAdmin, isSignedIn, currentUser };
}
