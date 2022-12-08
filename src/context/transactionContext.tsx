import { createContext, ReactNode, useCallback, useState } from "react";
import { useLocalState } from "../hooks/useLocalState";

interface ITransaction {
    anotation: string,
    category: string,
    price: number,
    date: Date
}

interface ITransactionContext {
    transactions: ITransaction[],
    handleSetTransaction: (transaction: ITransaction) => void
}

interface ITransactionProvider {
    children: ReactNode
}

export const TransactionContext = createContext<ITransactionContext>({} as ITransactionContext);

export function TransactionProvider({children}: ITransactionProvider) {

    const [transactions, setTransaction] = useLocalState<ITransaction[]>("transaction", [])

    const handleSetTransaction = useCallback((transaction: ITransaction) => {
        setTransaction([...transactions, transaction])
    }, [transactions, setTransaction])

    return(
        <TransactionContext.Provider value={{transactions, handleSetTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}