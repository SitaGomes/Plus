import { Button, Link as Chakralink } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

interface ISinupButton {
    href: string;
    children: ReactNode
}

export function ColoredButton({children, href}: ISinupButton) {
    return(
        <Link href={href}>
            <Chakralink>
                <Button
                    bgGradient='linear(to-r,
                    brand.green-500,
                    brand.orange-500)'
                    color="brand.white-900"
                    _hover={{bgGradient: "linear(to-r, #20AB7A, #AF503A)"}}
                    w="100%"
                    transition="200ms ease-in-out"
                >
                    {children}
                </Button>
            </Chakralink>
        </Link>
    )
}