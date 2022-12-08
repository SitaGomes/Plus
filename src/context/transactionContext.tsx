import { createContext, ReactNode, useCallback } from "react";
import { useLocalState } from "../hooks/useLocalState";

interface ITransaction {
    id: string,
    reminder: string,
    category: string,
    value: number,
    date: Date,
    type: "deposit" | "revenue"
}

interface ITransactionContext {
    transactions: ITransaction[],
    handleAddTransaction: (transaction: ITransaction) => void
}

interface ITransactionProvider {
    children: ReactNode
}

export const TransactionContext = createContext<ITransactionContext>({} as ITransactionContext);

export function TransactionProvider({children}: ITransactionProvider) {

    const [transactions, setTransaction] = useLocalState<ITransaction[]>("transaction", [])

    const handleAddTransaction = useCallback((transaction: ITransaction) => {
        setTransaction([...transactions, transaction])
    }, [transactions, setTransaction])

    return(
        <TransactionContext.Provider value={{transactions, handleAddTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}