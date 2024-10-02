"use server";

import { headers } from "next/headers";
import { createServerClient } from "~/lib/supabase";
import { supabaseAuthErrorCodeToJapaneseMessage } from "~/lib/supabase/error-code";
import { type SignUpFormSchema, signUpFormSchema } from "./schema";

export const signUpAction = async (data: SignUpFormSchema) => {
	const supabase = createServerClient();
	const origin = headers().get("origin");
	console.log(origin);

	// バリデーション
	const result = signUpFormSchema.safeParse(data);
	if (!result.success) {
		throw new Error(result.error.message);
	}

	const { error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
			data: {
				agency: data.agency,
				agency_kana: data.agencyKana,
				name: data.name,
				name_kana: data.nameKana,
				position: data.position,
				postal_code: data.postalCode,
				prefecture: data.prefecture,
				address: data.address,
				phone_number: data.phoneNumber,
				contact_phone_number: data.contactPhoneNumber,
				contact_fax_number: data.contactFaxNumber,
				...(data.relatedUserId ? { related_user_id: data.relatedUserId } : {}), // 関係者のID
				is_organizer: data.isOrganizer,
				is_lecturer: data.isLecturer,
				is_kankijuku: data.isKankijuku,
			},
		},
	});

	if (error) {
		console.error(`${error.code} ${error.message}`);
		throw new Error(
			error.code
				? supabaseAuthErrorCodeToJapaneseMessage[error.code]
				: error.message,
		);
	}
	return;
};
