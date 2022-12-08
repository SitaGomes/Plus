import { Heading, HTMLChakraProps, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTransaction } from "../../hooks/useTransaction";
import { formatPrice } from "../../utils/format";
import { Card } from "./Card";

interface ITransactionCard extends HTMLChakraProps<"div">{}


export function TransactionCard({...rest}: ITransactionCard) {

    const {transactions} = useTransaction()

    const [revenue, setRevenue] = useState(0)
    const [deposit, setDeposit] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {

        setRevenue(transactions.reduce((sum, transaction) => {
            if(transaction.type === 'revenue'){
                return sum + transaction.value
            }
            return sum += 0
        }, 0))

        setDeposit(transactions.reduce((sum, transaction) => {
            if(transaction.type === 'deposit'){
                return sum + transaction.value
            }
            return sum += 0
        }, 0))

    }, [transactions])


    useEffect(() => (
        setTotal(revenue - deposit)
    ), [deposit, revenue])

  
    return(
        <VStack spacing={6} justifyContent="space-between" w={["100%", "100%", "100%", 250]} {...rest}>
            
            <Card p={4}>
                <Text fontSize="sm">TOTAL DE DESPESA</Text>
                <Heading size="lg">{formatPrice(deposit)}</Heading>
            </Card>

            <Card income>
                <Text fontSize="sm">TOTAL DE RECEITA</Text>
                <Heading size="lg">{formatPrice(revenue)}</Heading>
            </Card>

            <Card total color={total > 0 ? "brand.green-500" : "brand.orange-500"}>
                <Text fontSize="sm">SALDO TOTAL</Text>
                <Heading size="lg">{formatPrice(total)}</Heading>
            </Card>

        </VStack>
    )
}