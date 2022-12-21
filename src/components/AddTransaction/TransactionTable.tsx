import { Button, FormErrorMessage, Grid, InputGroup, FormControl, Select, Text } from "@chakra-ui/react";
import { useTransaction } from "../../hooks/useTransaction";

import {v4} from "uuid"

import { Input } from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface TransactionTable {
    deposit: boolean;
}

interface ITransactionTable {
    anotation: string,
    category: string,
    price: number,
    date: Date,
}

const transactionSchema = yup.object().shape({
    anotation: yup.string().required("Adicione uma anotação"),
    category: yup.string().required("Categoria obrigatória"),
    price: yup.number().required("Preço obrigatório").positive("Valor deve ser positivo"),
    date: yup.date().required("Data obrigatória")
})


export function TransactionTable({deposit}: TransactionTable) {

    const {handleAddTransaction} = useTransaction()
    const {register, handleSubmit, formState, resetField} = useForm<ITransactionTable>({resolver: yupResolver(transactionSchema)})

    const {errors} = formState

    const handleNewTransaction: SubmitHandler<ITransactionTable> = async ({category, date, price, anotation}) => {
        console.log(category, date, price, anotation)

        handleAddTransaction({
            id: v4(),
            category: category,
            date: date,
            anotation: anotation,
            price: price,
            type: deposit ? 'despesa' : 'receita'
        })

        resetField("category")
        resetField("date")
        resetField("anotation")
        resetField("price")
    }
    
   
    return (
        <>
            <Grid
                templateColumns={["repeat(1, 1fr)",
                'repeat(2, 1fr)']}
                gap={6}
            >
                <Input
                    {...register("anotation")}
                    variant='filled'
                    placeholder='Anatação'
                    name="anotation"
                    error={errors.anotation}
                />

                <InputGroup>
                    <Input
                        {...register("price")}
                        variant='filled'
                        type="number"
                        placeholder='Valor R$' 
                        name="price"
                        error={errors.price}
                    />
                </InputGroup>

                {deposit 
                    ? (
                        
                        <FormControl isInvalid={!!errors.category}>
                            <Select variant='filled' {...register("category")} >
                                <option value=''>Selecione uma categoria...</option>
                                <option value='casa'>Casa</option>
                                <option value='lanches'>Lanches</option>
                                <option value='saidas'>Saidas</option>
                            </Select>

                            {!!errors.category && (
                                <FormErrorMessage>{errors.category.message}</FormErrorMessage>
                            )}
                        </FormControl>

                    )
                    : (
                        <FormControl isInvalid={!!errors.category}>
                            <Select variant='filled' {...register("category")} >
                                <option value=''>Selecione uma categoria...</option>
                                <option value='salario'>Salario</option>
                                <option value='freelance'>Freelance</option>
                                <option value='negocio'>Negócio</option>
                            </Select>

                            {!!errors.category && (
                                <FormErrorMessage>{errors.category.message}</FormErrorMessage>
                            )}
                        </FormControl>
                    )
                }

                <Input
                    {...register("date")}
                    variant='filled'
                    type="date"
                    placeholder='Data' 
                    name="date"
                    error={errors.date}
                /> 
            </Grid>

            {deposit 
                ? (
                    <Button
                        alignSelf="flex-end"
                        size='sm'
                        colorScheme="red"
                        onClick={handleSubmit(handleNewTransaction)}
                    >
                        <Text px={6} color="brand.white-900">
                            NOVA DESPESA
                        </Text>
                    </Button>
                )
                : (
                    <Button
                        alignSelf="flex-end"
                        size='sm'
                        colorScheme="green"
                        onClick={handleSubmit(handleNewTransaction)}
                    >
                        <Text px={6} color="brand.white-900">
                            NOVA RECEITA
                        </Text>
                    </Button>
                )
            }

        </>
    )
    
}