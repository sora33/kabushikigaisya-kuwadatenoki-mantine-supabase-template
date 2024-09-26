import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "global.css";
import { Stack } from "@mantine/core";
import type { Viewport } from "next";
import type React from "react";
import { theme } from "theme";
import { Footer } from "~/components";
import { Container } from "~/components/modules";
import { Header } from "~/components/modules/header";
import { MantineDateProvider } from "~/utils";

export const metadata = {
	title: {
		default: "案件名",
		template: "%s | 案件名",
	},
	description: "案件の説明文を入れる",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	minimumScale: 1,
	userScalable: false,
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.ico" />
			</head>
			<body>
				<MantineProvider defaultColorScheme="light" theme={theme}>
					<MantineDateProvider>
						<Notifications />
						<Header />
						<Container mt="xl" pb="6rem">
							<Stack gap="sm" flex="1" pt="md">
								{children}
							</Stack>
						</Container>
						<Footer />
					</MantineDateProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
