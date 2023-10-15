import { User } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "UpdatedAt" | "emailVerified"
> & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string | null;
}