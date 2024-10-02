"use client";

import { Box, Divider, Flex, NavLink, Stack } from "@mantine/core";
import {
	IconCalendar,
	IconChartBar,
	IconUser,
	IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import { NextjsAnchor } from "~/components/ui";

const data = [
	{
		link: "/seminar",
		label: "講習会一覧",
		icon: IconCalendar,
		isAdmin: true,
		isOrganizer: true,
	},
	{
		link: "/report",
		label: "集計",
		icon: IconChartBar,
		isAdmin: true,
		isOrganizer: false,
	},
	{
		link: "/users",
		label: "アカウント管理",
		icon: IconUsers,
		isAdmin: true,
		isOrganizer: false,
	},
	{
		link: "/mypage",
		label: "マイページ",
		icon: IconUser,
		isAdmin: false,
		isOrganizer: true,
	},
];

export const Sidebar = () => {
	const pathname = usePathname();
	const isActive = (link: string) => pathname.startsWith(link);
	const [seminarType, setSeminarType] = useQueryState("seminarType", {
		parse: (value) => value || "all",
		serialize: (value) => value,
	});

	return (
		<Flex direction="column" h="100%">
			<Box flex="1">
				<Stack gap="xs">
					{data.map((item) => {
						return (
							<NavLink
								component={Link}
								// href={`${item.link}?seminarType=${seminarType}`}
								href={`${item.link}`}
								key={item.label}
								label={item.label}
								active={isActive(item.link)}
								variant="filled"
								fw={600}
								leftSection={<item.icon size={20} />}
								style={{
									borderRadius: "0.5rem",
								}}
							/>
						);
					})}
				</Stack>
			</Box>
			<Divider my="md" w="100%" />
			<Stack gap="xs">
				{[
					{ href: "/download", label: "ダウンロード各種" },
					{ href: "/notice", label: "講習会注意事項" },
				].map((link) => (
					<NextjsAnchor
						key={link.href}
						fw={600}
						// href={`${link.href}?seminarType=${seminarType}`}
						href={`${link.href}`}
					>
						{link.label}
					</NextjsAnchor>
				))}
			</Stack>
		</Flex>
	);
};
