import { Box, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";

export function TransactionTable(){
    return(
        <TableContainer bgColor="brand.white-900" borderRadius="20px" p={3}>
            <Table variant='simple' size="lg" >
                <Thead>
                    <Tr>
                        <Th>Anotação</Th>
                        <Th>Categoria</Th>
                        <Th>Tipo</Th>
                        <Th isNumeric>Preço</Th>
                        <Th>Data</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Pão</Td>
                        <Td>Padaria</Td>
                        <Td>Despesa</Td>
                        <Td isNumeric>25.4</Td>
                        <Td>12/04/2022</Td>
                        <Td>Edit</Td>
                    </Tr>
                    <Tr>
                        <Td>Pão</Td>
                        <Td>Padaria</Td>
                        <Td>Despesa</Td>
                        <Td isNumeric>25.4</Td>
                        <Td>13/04/2022</Td>
                        <Td>Edit</Td>
                    </Tr>
                    <Tr>
                        <Td>Pão</Td>
                        <Td>Padaria</Td>
                        <Td>Despesa</Td>
                        <Td isNumeric>25.4</Td>
                        <Td>15/04/2022</Td>
                        <Td>Edit</Td>
                    </Tr>
                    
                </Tbody>
            </Table>
        </TableContainer>
    )
}