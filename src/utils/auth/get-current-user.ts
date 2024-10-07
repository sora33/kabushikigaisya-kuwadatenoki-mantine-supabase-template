import type { User } from "@supabase/supabase-js";
import { cache } from "react";
import { createServerClient } from "~/lib/supabase";

export const getCurrentUser = cache(
	async (): Promise<{
		isAdmin: boolean;
		isSignedIn: boolean;
		currentUser: User | null;
	}> => {
		const supabase = createServerClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();

		const isAdmin = user?.app_metadata.role === "admin";
		const isSignedIn = !!user;
		const currentUser: User | null = user;

		return { isAdmin, isSignedIn, currentUser };
	},
);
