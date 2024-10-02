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
import React from "react";
import { signOutAction } from "~/app/auth/actions";
import { NextjsAnchor } from "~/components/ui";
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
				<Container size="xl" maw={2000} h="100%">
					<Flex align="center" justify="center" h="100%" px="md">
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
			<Container size="xl" maw={2000} h="100%">
				<Flex justify="space-between" align="center" h="100%" px="md">
					<Text component={Link} href="/" fw={600}>
						講習会管理アプリ
					</Text>
					<Group>
						{user ? (
							<Flex gap="md" align="center">
								<NextjsAnchor href="/c" fw={600}>
									講習会一覧（顧客向け）
								</NextjsAnchor>
								<form action={signOutAction}>
									<Button type="submit" variant="outline" size="sm">
										ログアウト
									</Button>
								</form>
							</Flex>
						) : (
							<Group>
								<NextjsAnchor href="/c">講習会一覧（顧客向け）</NextjsAnchor>
								{/* <Button component={Link} href="/auth/sign-in" size="sm">
									ログイン
								</Button> */}
							</Group>
						)}
					</Group>
				</Flex>
			</Container>
		</MantineHeader>
	);
};
