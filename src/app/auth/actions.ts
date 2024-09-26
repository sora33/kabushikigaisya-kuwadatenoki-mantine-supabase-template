"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "~/lib/supabase";
import { supabaseAuthErrorCodeToJapaneseMessage } from "~/lib/supabase/error-code";
import { encodedRedirect } from "~/utils/encoded-redirect";

export const signUpAction = async (formData: FormData) => {
	const firstName = formData.get("firstName")?.toString();
	const email = formData.get("email")?.toString();
	const password = formData.get("password")?.toString();
	const supabase = createServerClient();
	const origin = headers().get("origin");

	if (!firstName || !email || !password) {
		return { error: "Email and password are required" };
	}

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
			data: {
				first_name: firstName,
			},
		},
	});

	if (error) {
		console.error(`${error.code} ${error.message}`);
		return encodedRedirect(
			"error",
			"/auth/sign-up",
			error.code
				? supabaseAuthErrorCodeToJapaneseMessage[error.code]
				: error.message,
		);
	}
	return encodedRedirect(
		"success",
		"/auth/sign-up",
		"登録完了しました。メールをご確認ください。",
	);
};

export const signInAction = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = createServerClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error(JSON.stringify(error, null, 2));
		return encodedRedirect(
			"error",
			"/auth/sign-in",
			"メールアドレスまたはパスワードが間違っています。",
		);
	}

	return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
	const email = formData.get("email")?.toString();
	const supabase = createServerClient();
	const origin = headers().get("origin");
	const callbackUrl = formData.get("callbackUrl")?.toString();

	if (!email) {
		return encodedRedirect(
			"error",
			"/auth/forgot-password",
			"メールアドレスは必須です。",
		);
	}

	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${origin}/auth/callback?redirect_to=/auth/reset-password`,
	});

	if (error) {
		console.error(error.message);
		return encodedRedirect(
			"error",
			"/auth/forgot-password",
			error.code
				? supabaseAuthErrorCodeToJapaneseMessage[error.code]
				: error.message,
		);
	}

	if (callbackUrl) {
		return redirect(callbackUrl);
	}

	return encodedRedirect(
		"success",
		"/auth/forgot-password",
		"パスワードリセットのためのリンクをメールで送信しました。",
	);
};

export const resetPasswordAction = async (formData: FormData) => {
	const supabase = createServerClient();

	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (!password || !confirmPassword) {
		encodedRedirect(
			"error",
			"/auth/reset-password",
			"パスワードと確認用パスワードは必須です。",
		);
	}

	if (password !== confirmPassword) {
		encodedRedirect(
			"error",
			"/auth/reset-password",
			"パスワードが一致しません。",
		);
	}

	const { error } = await supabase.auth.updateUser({
		password: password,
	});

	if (error) {
		encodedRedirect("error", "/auth/reset-password", "エラーが発生しました。");
	}

	return encodedRedirect(
		"success",
		"/auth/reset-password",
		"パスワードを更新しました。",
	);
};

export const signOutAction = async () => {
	const supabase = createServerClient();
	await supabase.auth.signOut();
	return redirect("/auth/sign-in");
};