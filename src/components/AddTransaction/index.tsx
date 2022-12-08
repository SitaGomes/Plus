import { Box,  Button,  Center,  Grid,  HStack, Input, InputGroup, InputLeftElement, Select, Text, VStack,  } from "@chakra-ui/react";
import { useState } from "react";
import { TransactionTable } from "../AddTransaction/TransactionTable";

export function AddTransaction(){

    const [isDepositMode, setIsDepositMode] = useState(true)

    function toggleDepositMode() {
        setIsDepositMode(true)
    }

    function toggleRevenueMode() {
        setIsDepositMode(false)
    }

    return(
        <Box mt={5} borderRadius="20px" bg="brand.white-900">

            <HStack
                spacing={0}
                align="center"
                justifyContent="space-around"

            >

                <Center
                    borderTopLeftRadius="20px"
                    w="100%"
                    h="100%"
                    color={isDepositMode ? "brand.white-900" : "GrayText"}

                    cursor={"pointer"}

                    bgColor={isDepositMode ? "brand.orange-500" : "#D25D41"}
                    py={4}
                    onClick={toggleDepositMode}

                >
                    <Text           
                        fontWeight="medium"
                        fontSize={["lg","2xl"]}
                    >
                        DESPESA
                    </Text>
                </Center>
               
                <Center
                    borderTopRightRadius="20px"
                    w="100%"
                    h="100%"
                    color={isDepositMode ? "GrayText" : "brand.white-900"}

                    cursor={"pointer"}

                    bgColor={isDepositMode ? "#22B481" : "brand.green-500"}
                    py={4}
                    onClick={toggleRevenueMode}
                >
                    <Text           
                        fontWeight="medium"
                        fontSize={["lg","2xl"]}
                    >
                        RECEITA
                    </Text>
                </Center>



            </HStack>

            <Box display="flex" flexDir="column" p={6} gap={6}>
                <TransactionTable deposit={isDepositMode}/>
            </Box>
        </Box>
    )
}