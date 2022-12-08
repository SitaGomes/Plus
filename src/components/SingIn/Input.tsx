import { forwardRef, ForwardRefRenderFunction, useState } from "react"

import { FieldError } from "react-hook-form"

import { Input as ChakraInput, InputProps as ChakraInputProps, FormLabel, FormControl, FormErrorMessage, InputGroup, InputRightElement, Button} from "@chakra-ui/react"

interface InputProps extends ChakraInputProps {
    name: string;
    password?: boolean
    label?: string;
    error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = 
    ({error=null, password=false, name, label, ...rest}, ref) => {
        //? first type goes to ref, that's gonna be an input

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)



        if(password) {
            return(
                <FormControl isInvalid={!!error}>
                    {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>} {/* if it doesnt exist */}

                    <InputGroup>
                        <ChakraInput
                            name={name}
                            id={name}
                            ref={ref}
                            type={show ? 'text' : 'password'}
                            variant="filled"
                            size="lg"
                            {...rest}
                        />

                        <InputRightElement width='4.5rem' height="100%">
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Esconder' : 'Mostrar'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>

                    {!!error && (
                        <FormErrorMessage>{error.message}</FormErrorMessage>
                    )}
                </FormControl>
            )
        }

        return (
            <FormControl isInvalid={!!error}>
                {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>} {/* if it doesnt exist */}

                <ChakraInput
                    name={name}
                    id={name}
                    variant="filled"
                    size="lg"
                    ref={ref}
                    {...rest}
                />

                {!!error && (
                    <FormErrorMessage>{error.message}</FormErrorMessage>
                )}
            </FormControl>
        )
}

export const Input = forwardRef(InputBase) //Just passing the ref 