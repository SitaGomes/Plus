require("dotenv").config();
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
    providers: [
        GoogleProvider({
            clientSecret: "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",
            clientId: "412258101923-8iamjmal32mrsi1nque2gqjf99np530b.apps.googleusercontent.com",
        })
    ]
})