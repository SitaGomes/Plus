import { Box,  Button,  Grid,  HStack, Input, InputGroup, InputLeftElement, Select, Text, VStack,  } from "@chakra-ui/react";
import { Header } from "./TransactionHeader";

export function AddTransaction(){





    
    return(
        <Box mt={5} borderRadius="20px" bg="brand.white-900">
            <HStack spacing={0} align="center" justifyContent="space-around">
                <Header>DESPESA</Header>
                <Header inverted>RECEITA</Header>
            </HStack>
            <Box display="flex" flexDir="column" p={6} gap={6}>

                <Grid templateColumns={["repeat(1, 1fr)", 'repeat(2, 1fr)']} gap={6} >
                    <Input variant='filled' placeholder='Anatação' />

                    <InputGroup>
                        <InputLeftElement
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        >R$</InputLeftElement>
                        <Input variant='filled' type="number" placeholder='Preço' />
                    </InputGroup>

                    <Select variant='filled' placeholder='Categoria'>
                        <option value='option1'>Casa</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>

                    <Input variant='filled' type="datetime-local" placeholder='Data' /> 
                </Grid>

                <Button alignSelf="flex-end" size='sm' colorScheme="red">
                    <Text px={6} color="brand.white-900">
                        ADICIONAR DESPESA
                    </Text>
                </Button>
            </Box>
        </Box>
    )
}