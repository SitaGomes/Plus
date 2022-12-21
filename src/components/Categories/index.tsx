import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import {Input} from "../Input"

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillDelete, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import * as yup from "yup";

import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from "react-toastify";

import { useCategory } from "../../hooks/useCategory";
import { useLocalAuth } from "../../hooks/useLocalAuth";
import { CategoryCard } from "./CategoryCard";

interface IExpenseCategory {
    title: string;
    isExpense?: boolean
}

export interface IExpense {
    name: string
}

export const expenseSchema = yup.object().shape({
    name: yup.string().min(3, "Despesa deve ter mais de 3 caracteres"),
})


export function CategoryTable({title, isExpense = false}: IExpenseCategory) {

    const [isOpen, setIsOpen] = useState(false)
    const supabase = useSupabaseClient()
    const {user} = useLocalAuth()
    const {handleAddCategory, categories} = useCategory()

    console.log(categories)

    const {register, handleSubmit, formState: {errors}, resetField} = useForm<IExpense>({resolver: yupResolver(expenseSchema)})

    const onOpen = () => {
        setIsOpen(true)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const handleAddNewCategory: SubmitHandler<IExpense> = async ({name}) => {

        const {data, error} = await supabase
            .from("categories")
            .upsert({
                id: uuidv4(),
                name: name,
                isdeposit: isExpense,
                user_id: user.id
            })
            .select()

        if(error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }

        toast.success("Nova categoria adicionada", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        handleAddCategory({
            id: data?.[0].id,
            isExpense: data?.[0].isdeposit,
            name: data?.[0].name,
        })
    
        resetField("name")
    }




    // const [hydrated, setHydrated] = useState(false)
    // useEffect(() => {
    //     setHydrated(true)
    // }, [setHydrated])


    // if(!hydrated) {
    //     return null
    // }

    return(
        <Box w="100%" mb={10}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">
                    Categorias de {title}
                </Text>
                <Button onClick={onOpen} bg="transparent">
                    <AiFillPlusCircle size="30px"/>
                </Button>
            </Flex>
            <TableContainer bgColor="brand.white-900" borderRadius="20px" p={3}>
                <Table variant='simple' size="lg" >
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <>
                            {categories.map(category => 
                                category.isExpense === isExpense
                                    && (
                                        <CategoryCard
                                            isExpense={isExpense}
                                            id={category.id}
                                            name={category.name}
                                            key={category.id}
                                        />
                                    )
                            )}
                        </>
                    </Tbody>
                </Table>
            </TableContainer>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar categoria de {title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        
                        <VStack as={"form"} onSubmit={handleSubmit(handleAddNewCategory)} w="100%" gap={5} mb={5}>

                            <Input
                                {...register("name")}
                                label="Nome"
                                name="name"
                                placeholder={isExpense ? "Conta de luz..." : "Salário..."}
                                error={errors.name}
                            />

                            <Button type="submit" colorScheme="green" >Adicionar</Button>
                        </VStack>

                    </ModalBody>
                </ModalContent>
            </Modal>

        </Box>
    )
}