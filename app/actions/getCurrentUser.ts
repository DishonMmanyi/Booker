import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";


export function getSession () {

    return getServerSession(authOptions)
}

export default async function getCurrentUser() {

    try {
        const session = await getSession();
        //make sure session is valid
        if(!session?.user?.email){
            return null;
        }
            //quering database to find current user record
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if(!currentUser){
            return null;
        }
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerfied: currentUser.emailVerified?.toISOString() || null
        };

    } catch(error: any){
        return null;
    }
}