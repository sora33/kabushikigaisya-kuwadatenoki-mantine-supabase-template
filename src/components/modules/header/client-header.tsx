import { Container, Flex, Box as MantineHeader, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const ClientHeader = () => {
	return (
		<MantineHeader h={60} bg="primary.5">
			<Container size="xl" maw={2000} h="100%">
				<Flex justify="space-between" align="center" h="100%" px="md">
					<Text component={Link} href="/" fw={600} c="white">
						講習会一覧
					</Text>
				</Flex>
			</Container>
		</MantineHeader>
	);
};
