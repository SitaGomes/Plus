import { Center, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface IHeader {
    children: ReactNode,
    inverted?: boolean,
}

export function Header({children, inverted}:IHeader) {

    const color = inverted
        ? "brand.green-500"
        : "brand.orange-500"
    
    const borderTopRightRadius = inverted
        ? "20px"
        : "0px"
    
    const borderTopLeftRadius = inverted
        ? "0px"
        : "20px"

    return (
       <Center
          borderTopLeftRadius={borderTopLeftRadius}
          borderTopRightRadius={borderTopRightRadius}
          w="100%"
          h="100%"
          color="brand.white-900"

          bgColor={color}
          py={4}
        >
            <Text           
                fontWeight="medium"
                fontSize={["lg","2xl"]}
            >
                {children}
            </Text>
        </Center>
    )
}