import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { useLocalAuth } from "../../../hooks/useLocalAuth";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "412258101923-blaih2nhb0pjkrha8bkksluts28rq6eg.apps.googleusercontent.com",
            clientSecret: "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",
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            },
            


        })

    ]
})