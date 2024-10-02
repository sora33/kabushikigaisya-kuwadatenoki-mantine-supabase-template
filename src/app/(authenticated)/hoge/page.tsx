import { Box, Button, Code, Stack, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { prisma } from "~/lib/prisma";
import { createServerClient } from "~/lib/supabase";
const updateUserMetadata = async (formData: FormData) => {
	"use server";
	const supabase = createServerClient();
	const firstName = formData.get("firstName")?.toString();
	const { error } = await supabase.auth.updateUser({
		data: { first_name: firstName },
	});

	if (error) {
		console.error(error);
		return { error: error.message };
	}

	return { success: "ユーザーメタデータが更新されました" };
};

export default async function Page() {
	const supabase = createServerClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// const userData = await prisma.user.findUnique({
	// 	where: { id: user?.id },
	// });
	// console.log("userData", userData);

	return (
		<Stack gap="xl">
			<Link
				href="/notes"
				style={{ color: "blue", textDecoration: "underline", fontSize: "sm" }}
			>
				ノート一覧
			</Link>
			<Box>
				<Title order={2} mb="md">
					ユーザー詳細
				</Title>
				<Code block>{JSON.stringify(user, null, 2)}</Code>
			</Box>
			{/* <Box>
				<Title order={2} mb="md">
					ユーザーデータ
				</Title>
				<Code block>{JSON.stringify(userData, null, 2)}</Code>
			</Box> */}
			<Box>
				<Title order={2} mb="md">
					メタデータの更新
				</Title>
				<form action={updateUserMetadata}>
					<Stack>
						<TextInput
							label="名前"
							name="firstName"
							placeholder="名前を入力"
							defaultValue={user?.user_metadata.first_name ?? ""}
							required
						/>
						<Button type="submit">更新</Button>
					</Stack>
				</form>
			</Box>
		</Stack>
	);
}
