import {
	Button,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import Link from "next/link";
import { signUpAction } from "~/app/auth/actions";
import { FormMessage, type Message } from "~/components/modules/form-message";

export default function SignUp({ searchParams }: { searchParams: Message }) {
	if ("message" in searchParams) {
		return (
			<Stack align="center" justify="center" h="100vh">
				<FormMessage message={searchParams} />
			</Stack>
		);
	}

	return (
		<form>
			<Stack>
				<Title order={2}>新規登録</Title>
				<Text size="sm" c="dimmed">
					すでにアカウントをお持ちですか？{" "}
					<Link
						href="/auth/sign-in"
						style={{ color: "blue", textDecoration: "underline" }}
					>
						ログイン
					</Link>
				</Text>
				<TextInput
					label="名前"
					name="firstName"
					placeholder="名前を入力"
					required
				/>
				<TextInput
					label="メールアドレス"
					type="email"
					name="email"
					placeholder="you@example.com"
					required
				/>
				<PasswordInput
					label="パスワード"
					name="password"
					placeholder="パスワードを入力"
					minLength={6}
					required
				/>
				<Button type="submit" formAction={signUpAction}>
					登録する
				</Button>
				<FormMessage message={searchParams} />
			</Stack>
		</form>
	);
}
