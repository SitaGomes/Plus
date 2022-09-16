import {useContext} from "react"
import {AuthContext} from "../context/authContext"

export function useLocalAuth() {
    const data = useContext(AuthContext)

    return data
}