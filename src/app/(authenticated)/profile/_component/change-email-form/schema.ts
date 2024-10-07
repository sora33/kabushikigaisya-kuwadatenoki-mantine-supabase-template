import { z } from "zod";
import { emailValidation } from "~/lib/zod";

export const changeEmailFormSchema = z
	.object({
		email: emailValidation.describe("現在のメールアドレス"),
		changeEmail: z.string().optional().describe("新しいメールアドレス"),
	})
	.refine((data) => data.email !== data.changeEmail, {
		message:
			"メールアドレスを変更する場合は、新しいメールアドレスを入力してください。",
		path: ["changeEmail"],
	});

export type ChangeEmailFormSchema = z.infer<typeof changeEmailFormSchema>;
