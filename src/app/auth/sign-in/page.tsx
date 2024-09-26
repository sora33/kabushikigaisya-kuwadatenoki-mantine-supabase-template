import {
	Button,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import Link from "next/link";
import { signInAction } from "~/app/auth/actions";
import { FormMessage, type Message } from "~/components/modules/form-message";

export default function SignIn({ searchParams }: { searchParams: Message }) {
	return (
		<form>
			<Stack>
				<div>
					<Title order={2}>ログイン</Title>
					<Text size="sm" c="dimmed">
						アカウントをお持ちでない方は{" "}
						<Link
							href="/auth/sign-up"
							style={{ color: "blue", textDecoration: "underline" }}
						>
							新規登録
						</Link>
					</Text>
				</div>
				<TextInput
					label="メールアドレス"
					type="email"
					name="email"
					placeholder="you@example.com"
					defaultValue={
						process.env.NODE_ENV === "development" ? "admin@example.com" : ""
					}
					required
				/>
				<PasswordInput
					label="パスワード"
					name="password"
					placeholder="パスワードを入力"
					defaultValue={
						process.env.NODE_ENV === "development" ? "Admin1234" : ""
					}
					required
				/>
				<Text size="xs" ta="right">
					<Link
						href="/auth/forgot-password"
						style={{ color: "blue", textDecoration: "underline" }}
					>
						パスワードをお忘れですか？
					</Link>
				</Text>
				<Button type="submit" formAction={signInAction}>
					ログイン
				</Button>
				<FormMessage message={searchParams} />
			</Stack>
		</form>
	);
}
