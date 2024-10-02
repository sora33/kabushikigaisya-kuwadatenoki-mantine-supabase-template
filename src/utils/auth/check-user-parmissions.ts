import { prisma } from "~/lib/prisma";
import { getCurrentUser } from "~/utils/auth/current-user";

export async function checkUserPermissions(seminarId: string) {
	const seminar = await prisma.seminar.findUnique({
		select: { lecturerId: true, organizerId: true },
		where: { id: seminarId },
	});

	const { isAdmin, currentUser } = await getCurrentUser();
	const isOrganizer = seminar?.organizerId === currentUser?.id;
	const isLecturer = seminar?.lecturerId === currentUser?.id;

	return { isOrganizer, isLecturer, isAdmin, currentUser };
}
