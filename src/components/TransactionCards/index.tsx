import { Heading, Text, VStack } from "@chakra-ui/react";
import { Card } from "./Card";


export function TransactionCard() {
    return(
        <VStack spacing={6} w={["100%","100%","100%",250]}>
            
            <Card>
                <Text fontSize="sm">TOTAL DE DESPESA</Text>
                <Heading size="lg">R$ 3.000</Heading>
            </Card>

            <Card income>
                <Text fontSize="sm">TOTAL DE RECEITA</Text>
                <Heading size="lg">R$ 5.000</Heading>
            </Card>

            <Card total>
                <Text fontSize="sm">SALDO TOTAL</Text>
                <Heading size="lg">R$ 2.000</Heading>
            </Card>

        </VStack>
    )
}