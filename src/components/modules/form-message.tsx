import { Alert } from "@mantine/core";

export type Message =
	| { success: string }
	| { error: string }
	| { message: string };

export function FormMessage({ message }: { message: Message }) {
	return (
		<>
			{"success" in message && (
				<Alert variant="light" color="green" title="成功">
					{message.success}
				</Alert>
			)}
			{"error" in message && (
				<Alert variant="light" color="red" title="エラー">
					{message.error}
				</Alert>
			)}
			{"message" in message && (
				<Alert variant="light" color="blue" title="メッセージ">
					{message.message}
				</Alert>
			)}
		</>
	);
}