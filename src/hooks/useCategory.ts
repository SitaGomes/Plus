import {useContext} from "react"
import { CategoryContext } from "../context/categoryContext"

export function useCategory() {
    const data = useContext(CategoryContext)

    return data
}