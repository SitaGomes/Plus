import { Box,  Button,  Grid,  HStack, Input, InputGroup, InputLeftElement, Select, Text, VStack,  } from "@chakra-ui/react";
import { useState } from "react";
import { TransactionTable } from "../AddTransaction/TransactionTable";
import { TransactionHeader } from "./TransactionHeader";

export function AddTransaction(){

    const [isDepositMode, setIsDepositMode] = useState(true)

    function toggleChangeMode() {
        setIsDepositMode(!isDepositMode)
    }

    return(
        <Box mt={5} borderRadius="20px" bg="brand.white-900">
            <HStack spacing={0} align="center" justifyContent="space-around">
                <TransactionHeader onClick={toggleChangeMode}>
                    DESPESA
                </TransactionHeader>
                <TransactionHeader inverted onClick={toggleChangeMode}>
                    RECEITA
                </TransactionHeader>
            </HStack>
            <Box display="flex" flexDir="column" p={6} gap={6}>
                <TransactionTable deposit={isDepositMode}/>
            </Box>
        </Box>
    )
}