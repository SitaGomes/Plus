import { Center } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IMenuCard {
    children: ReactNode,
    active?: boolean,
}

export function MenuCard({children, active = false}: IMenuCard){


    if (active) {
        return(
            <Center w="130px" h="50px" borderRadius="20px" bgColor="brand.white-500">
                {children}
            </Center>
        )
    }

    return(
        <Center w="130px">
            {children}
        </Center>
    )
}