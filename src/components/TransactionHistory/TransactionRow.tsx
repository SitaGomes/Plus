import { Td, Tr } from "@chakra-ui/react";
import { convertDate } from "../../utils/date";
import { formatPrice } from "../../utils/format";


interface ITransactionRow {
    reminder: string;
    category: string;
    type: string;
    value: number;
    date: Date
}


export function TransactionRow({category, date, reminder, type, value}: ITransactionRow) {

    return(
        <Tr>
            <Td>{reminder}</Td>
            <Td>{category}</Td>
            <Td>{type}</Td>
            <Td>{formatPrice(value)}</Td>
            <Td>{convertDate(date)}</Td>
            <Td>Edit</Td>
            <Td>Del</Td>
        </Tr>
    )
}