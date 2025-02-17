import { Session } from "next-auth";
import { prisma } from "./prisma";

async function getUserIdOnServer(session: Session): Promise<string> {
  const user = await prisma.user.findFirst({
    where: { email: session.user?.email as string },
    select: { id: true },
  });

  // This should never happen
  if (!user) {
    throw new Error("User not found");
  }

  return user.id;
}

export { getUserIdOnServer };
