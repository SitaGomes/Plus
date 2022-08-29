import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import {MdOutlineAlternateEmail} from "react-icons/md"

export function EmailInput() {
    return(
        <InputGroup>
            <InputLeftElement
                pointerEvents='none'
            >
                <Icon as={MdOutlineAlternateEmail} />
            </InputLeftElement>
            <Input
                type='email'
                placeholder='Email' 
                variant="filled"
            />
      </InputGroup>
    )
}