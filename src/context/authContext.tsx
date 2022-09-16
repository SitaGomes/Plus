import { createContext, ReactNode, useState } from "react";

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
    const [user, setUser] = useState({} as IUser)

    const handleSetUser = (user: IUser) => {
        setUser(user)
    }

    return(
        <AuthContext.Provider value={{handleSetUser, user}}>
            {children}
        </AuthContext.Provider>
    )
}