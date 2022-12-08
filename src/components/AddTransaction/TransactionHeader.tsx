import { Center, HTMLChakraProps, Text } from "@chakra-ui/react"
import { ReactNode } from "react"

interface IHeader extends HTMLChakraProps<"div"> {
    children: ReactNode,
    inverted?: boolean,
}

export function TransactionHeader({children, inverted, ...rest}:IHeader) {

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

          cursor={"pointer"}

          bgColor={color}
          py={4}
          {...rest}
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