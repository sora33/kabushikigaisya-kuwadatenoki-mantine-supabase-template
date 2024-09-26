import { Container, Stack } from "@mantine/core";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Container size="xs" w="100%">
			<Stack gap="md" py="md">
				{children}
			</Stack>
		</Container>
	);
}
