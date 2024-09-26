import {
	Badge,
	Button,
	Container,
	Flex,
	Group,
	Box as MantineHeader,
	Text,
} from "@mantine/core";
import Link from "next/link";
import { signOutAction } from "~/app/auth/actions";
import { hasSupabaseEnvVars } from "~/lib/supabase/check-env-vars";
import { createServerClient } from "~/lib/supabase/server";

export const Header = async () => {
	const res = hasSupabaseEnvVars
		? await createServerClient().auth.getUser()
		: null;
	const user = res?.data?.user;

	if (!hasSupabaseEnvVars) {
		return (
			<MantineHeader h={60}>
				<Container size="xl" h="100%">
					<Flex align="center" justify="center" h="100%">
						<Badge color="red" variant="filled">
							.env.localファイルにanon keyとURLを更新してください
						</Badge>
					</Flex>
				</Container>
			</MantineHeader>
		);
	}

	return (
		<MantineHeader h={60} bg="gray.1">
			<Container size="xl" h="100%">
				<Flex justify="space-between" align="center" h="100%">
					<Text component={Link} href="/" fw={600}>
						Next.js Supabase Starter
					</Text>
					<Group>
						{user ? (
							<Flex gap="md" align="center">
								<Text>こんにちは、{user.email}さん！</Text>
								<form action={signOutAction}>
									<Button type="submit" variant="outline">
										ログアウト
									</Button>
								</form>
							</Flex>
						) : (
							<Group>
								<Button
									component={Link}
									href="/auth/sign-in"
									variant="outline"
									size="sm"
								>
									ログイン
								</Button>
								<Button component={Link} href="/auth/sign-up" size="sm">
									新規登録
								</Button>
							</Group>
						)}
					</Group>
				</Flex>
			</Container>
		</MantineHeader>
	);
};
