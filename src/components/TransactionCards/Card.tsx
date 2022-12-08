import { Box, HTMLChakraProps, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ICard extends HTMLChakraProps<"div"> {
    children: ReactNode,
    income?: boolean,
    total?: boolean
}

export function Card({children, income = false, total = false, ...rest}: ICard){

    if(income){
        return(
            <VStack
                spacing={0}
                bgColor="brand.green-500"
                w={"100%"}
                py={2}
                borderRadius="20px"
                color="brand.white-900"
                {...rest}
            >
                {children}
            </VStack>
        )
    }

    if(total){
        return(
            <VStack
                spacing={0}
                bgColor="brand.white-900"
                w={"100%"}
                py={2}
                borderRadius="20px"
                color="brand.green-500"
                {...rest}
            >
                {children}
            </VStack>
        )
    }



    return(
        <VStack
                spacing={0}
                bgColor="brand.orange-500"
                w={"100%"}
                py={2}
                borderRadius="20px"
                color="brand.white-900"
                {...rest}
            >
                {children}
        </VStack>
    )
}