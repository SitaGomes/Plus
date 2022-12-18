import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTransaction } from "../../hooks/useTransaction";
import { TransactionRow } from "./TransactionRow";

export function TransactionHistory(){

    const {transactions} = useTransaction()

    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
    }, [setHydrated])

    if(!hydrated) {
        return null
    }

    //? NextJS render the HTML from the server, so if i want to render the context's data, I'll need to wait 

    return(
        <TableContainer bgColor="brand.white-900" borderRadius="20px" p={3}>
            <Table variant='simple' size="lg" >
                <Thead>
                    <Tr>
                        <Th>Anotação</Th>
                        <Th>Categoria</Th>
                        <Th>Tipo</Th>
                        <Th>Preço</Th>
                        <Th>Data</Th>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    
                    {transactions.map(t => (
                        <TransactionRow 
                            category={t.category}
                            date={t.date}
                            reminder={t.anotation}
                            type={t.type}
                            value={t.price}
                            key={t.id}
                        />
                    ))}
                            
                </Tbody>
            </Table>
        </TableContainer>
    )
}