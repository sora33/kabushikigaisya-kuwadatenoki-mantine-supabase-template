"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "~/lib/supabase";
import { getCurrentUser } from "~/utils/auth/get-current-user";
import { type ChangeEmailFormSchema, changeEmailFormSchema } from "./schema";

export const updateProfileAction = async (data: ChangeEmailFormSchema) => {
	const { currentUser } = await getCurrentUser();
	if (!currentUser) {
		throw new Error("ユーザーが見つかりません。");
	}
	const result = changeEmailFormSchema.safeParse(data);
	if (!result.success) {
		throw new Error(result.error.message);
	}

	const supabase = createServerClient();

	const { error } = await supabase.auth.updateUser({
		email: data.email,
	});

	if (error) {
		throw new Error(error.message);
	}

	revalidatePath("/profile");
	return;
};
