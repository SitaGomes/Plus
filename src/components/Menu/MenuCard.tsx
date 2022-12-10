import { Center } from "@chakra-ui/react";
import { ReactNode } from "react";
import Link from 'next/link'


interface IMenuCard {
    children: ReactNode,
    active?: boolean,
    href: string,
}

export function MenuCard({href, children, active = false}: IMenuCard){


    if (active) {
        return(
            <Center
                w="130px"
                h="50px"
                borderRadius="20px"
                bgColor="brand.white-500"
            >
                <Link href={href}>
                    {children}
                </Link>
            </Center>
        )
    }

    return(
        <Center
            w="130px"
        >
            <Link href={href}>
                {children}
            </Link>
        </Center>
    )
}