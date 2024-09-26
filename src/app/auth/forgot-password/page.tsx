import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { forgotPasswordAction } from "~/app/auth/actions";
import { FormMessage, type Message } from "~/components/modules/form-message";

export default function ForgotPassword({
	searchParams,
}: {
	searchParams: Message;
}) {
	return (
		<form>
			<Stack>
				<div>
					<Title order={2}>パスワードリセット</Title>
					<Text size="sm" c="dimmed">
						すでにアカウントをお持ちですか？{" "}
						<Link
							href="/auth/sign-in"
							style={{ color: "blue", textDecoration: "underline" }}
						>
							ログイン
						</Link>
					</Text>
				</div>
				<TextInput
					label="メールアドレス"
					type="email"
					name="email"
					placeholder="you@example.com"
					required
				/>
				<Button type="submit" formAction={forgotPasswordAction}>
					パスワードをリセット
				</Button>
				<FormMessage message={searchParams} />
			</Stack>
		</form>
	);
}
