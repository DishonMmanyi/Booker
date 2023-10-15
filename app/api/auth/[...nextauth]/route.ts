import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type AuthOptions } from "next-auth";
import  NextAuth  from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";


//configuration file for nextauth for user sign in and session creation
export const authOptions: AuthOptions = {

    adapter: PrismaAdapter(prisma),
    providers: [ //allow users to sign in with different methods
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }), //allow users to sign in with email/password
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'},
            }, //checks email/password against info in db
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Invalid credentials");
                }
            

            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            });

            if (!user || !user?.hashedPassword){
                throw new Error('Invalid credentials');
            }
            const isCorrectPassowrd = await bcrypt.compare(
                credentials.password,
                user.hashedPassword
            );

            if (!isCorrectPassowrd){
                throw new Error("Invalid credentials")
            }

            return user
        }
        })
    ], //redirect to root page after successful sign in
    pages: {
        signIn: '/'
    },
    debug: process.env.NODE_ENV == 'development',
    session: { //using jwt for session management
        strategy: "jwt"
    }, //secret to secure auth tokens
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }