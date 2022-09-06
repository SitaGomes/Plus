import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"

export function PasswordInput() {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Input
          variant="filled"
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Senha'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Esconder' : 'Mostrar'}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }