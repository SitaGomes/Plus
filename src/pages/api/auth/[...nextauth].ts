require("dotenv").config();
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
    providers: [
        GoogleProvider({
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            clientId: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ]
})