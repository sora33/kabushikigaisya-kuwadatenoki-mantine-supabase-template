import { Container, Flex, Box as MantineFooter, Text } from "@mantine/core";
import { NextjsAnchor } from "~/components/ui";

// export const footerLinks = [
// 	{ href: "/auth/download", label: "ダウンロード各種" },
// 	{ href: "/auth/notice", label: "講習会注意事項" },
// 	// { href: "/c/terms", label: "利用規約" },
// ];

export const Footer = () => {
	return (
		<MantineFooter component="footer" h={60}>
			{/* <Container size="xl" h="100%">
				<Flex align="center" h="100%" gap="md">
					{footerLinks.map((link) => (
						<NextjsAnchor key={link.href} href={link.href} c="white">
							{link.label}
						</NextjsAnchor>
					))}
				</Flex>
			</Container> */}
			<Container size="xl" h="100%">
				<Flex align="center" justify="center" h="100%" gap="md">
					<Text size="xs">Powered by 環境保全研究所</Text>
				</Flex>
			</Container>
		</MantineFooter>
	);
};
