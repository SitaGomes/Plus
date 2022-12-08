import { Button, FormErrorMessage, Grid, InputGroup, FormControl, Select, Text } from "@chakra-ui/react";
import { useTransaction } from "../../hooks/useTransaction";

import {v4} from "uuid"

import { Input } from "../SingIn/Input";
import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface TransactionTable {
    deposit: boolean;
}

interface ITransactionTable {
    reminder: string,
    category: string,
    value: number,
    date: Date,
}

const transactionSchema = yup.object().shape({
    reminder: yup.string().required("Adicione uma anotação"),
    category: yup.string().required("Categoria obrigatória"),
    value: yup.number().required("Preço obrigatório").positive("Valor deve ser positivo"),
    date: yup.date().required("Data obrigatória")
})


export function TransactionTable({deposit}: TransactionTable) {

    const {handleAddTransaction} = useTransaction()
    const {register, handleSubmit, formState, resetField} = useForm<ITransactionTable>({resolver: yupResolver(transactionSchema)})

    const {errors} = formState

    const handleNewTransaction: SubmitHandler<ITransactionTable> = async ({category, date, value, reminder}) => {
        console.log(category, date, value, reminder)

        handleAddTransaction({
            id: v4(),
            category: category,
            date: date,
            reminder: reminder,
            value: value,
            type: deposit ? 'deposit' : 'revenue'
        })

        resetField("category")
        resetField("date")
        resetField("reminder")
        resetField("value")
    }
    
   
    return (
        <>
            <Grid
                templateColumns={["repeat(1, 1fr)",
                'repeat(2, 1fr)']}
                gap={6}
            >
                <Input
                    {...register("reminder")}
                    variant='filled'
                    placeholder='Anatação'
                    name="reminder"
                    error={errors.reminder}
                />

                <InputGroup>
                    <Input
                        {...register("value")}
                        variant='filled'
                        type="number"
                        placeholder='Valor R$' 
                        name="value"
                        error={errors.value}
                    />
                </InputGroup>

                {deposit 
                    ? (
                        
                        <FormControl isInvalid={!!errors.category}>
                            <Select variant='filled' {...register("category")} >
                                <option value=''>Selecione uma categoria...</option>
                                <option value='casa'>Casa</option>
                                <option value='conta'>Conta</option>
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