import {
	Anchor,
	Container,
	Flex,
	Box as MantineFooter,
	Text,
} from "@mantine/core";

export const Footer = () => {
	return (
		<MantineFooter component="footer" h={60}>
			<Container size="xl" h="100%">
				<Flex align="center" justify="center" h="100%" gap="md">
					<Text size="xs">
						Powered by{" "}
						<Anchor
							href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
							target="_blank"
							rel="noreferrer"
							fw={700}
						>
							Supabase
						</Anchor>
					</Text>
				</Flex>
			</Container>
		</MantineFooter>
	);
};
