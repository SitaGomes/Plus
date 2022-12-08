import {useContext} from "react"
import {TransactionContext} from "../context/transactionContext"

export function useTransaction() {
    const data = useContext(TransactionContext)

    return data
}