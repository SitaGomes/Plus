import { Heading, Text, VStack } from "@chakra-ui/react";


export function TransactionCard() {
    return(
        <VStack spacing={6} align="flex-start">
            <VStack
                spacing={0}
                bgColor="brand.orange-500"
                w="250px"
                py={2}
                borderRadius="20px"
                color="brand.white-900"
            >
                <Text fontSize="sm">TOTAL DE DESPESA</Text>
                <Heading size="lg">R$ 3.000</Heading>
            </VStack>

            <VStack
                spacing={0}
                bgColor="brand.green-500"
                w="250px"
                py={2}
                borderRadius="20px"
                color="brand.white-900"
            >
                <Text fontSize="sm">TOTAL DE RECEITA</Text>
                <Heading size="lg">R$ 5.000</Heading>
            </VStack>

            <VStack
                spacing={0}
                bgColor="brand.white-900"
                w="250px"
                py={2}
                borderRadius="20px"
                color="brand.green-500"
            >
                <Text fontSize="sm">SALDO TOTAL</Text>
                <Heading size="lg">R$ 2.000</Heading>
            </VStack>

        </VStack>
    )
}