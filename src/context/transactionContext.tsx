import { createContext, ReactNode, useState } from "react";

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

    const [transactions, setTransaction] = useState<ITransaction[]>([])

    function handleSetTransaction(transaction: ITransaction) {
        setTransaction([...transactions, transaction])
    }

    return(
        <TransactionContext.Provider value={{transactions, handleSetTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}