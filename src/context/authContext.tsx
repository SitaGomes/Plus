import { createContext, ReactNode, useCallback, useState } from "react";
import { useLocalState } from "../hooks/useLocalState";

export interface IUser {
    name: string | null,
    email: string | null,
    photo_url?: string | null,
}

interface IAuthContext {
    user: IUser,
    handleSetUser: (user: IUser) => void,
}

interface IAuthProvider {
    children: ReactNode
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({children}: IAuthProvider) {

    const [user, setUser] = useLocalState("user", {} as IUser)

    const handleSetUser = useCallback((user: IUser) => {
        setUser(user)
    }, [setUser])

    return(
        <AuthContext.Provider value={{handleSetUser, user}}>
            {children}
        </AuthContext.Provider>
    )
}