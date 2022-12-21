import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Td, Tr, VStack } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRef, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AiFillDelete, AiFillEdit } from "react-icons/ai"
import { toast, ToastContainer } from "react-toastify"
import { expenseSchema, IExpense } from "."
import { useCategory } from "../../hooks/useCategory"
import { Input } from "../Input"

interface ICategoryCard {
    id: string,
    name: string,
    isExpense: boolean
}

export function CategoryCard({id, name, isExpense}: ICategoryCard) {

    const supabase = useSupabaseClient()
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const cancelRef = useRef(null)
    const {register, handleSubmit, formState: {errors}} = useForm<IExpense>({resolver: yupResolver(expenseSchema)})

    const {handleDeleteCategory, handleEditCategory} = useCategory()

    const openEditModal = () => {
        setEditModal(true)
    }

    const closeEditModal = () => {
        setEditModal(false)
    }

    const openDeleteModal = () => {
        setDeleteModal(true)
    }

    const closeDeleteModal = () => {
        setDeleteModal(false)
    }

    const handleEditNewCategory: SubmitHandler<IExpense> = async ({name}) => {
        const {error} = await supabase
            .from("categories")
            .update({name: name})
            .eq("id", id)

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

        toast.success("Categoria editada com sucesso", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })

        handleEditCategory({
            id: id,
            name: name,
            isExpense: isExpense
        })

        closeEditModal()
    }

    const handleDeleteNewCategory = async (categoryId: string) => {
        const {error} = await supabase
        .from("categories")
        .delete()
        .eq("id", categoryId)

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

        toast.success("Categoria deletada com sucesso", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        handleDeleteCategory(categoryId)
    }


    return(
        <Tr>

            <Td>{name}</Td>
            <Td>
                <Button onClick={openEditModal} bg="transparent">
                    <AiFillEdit size="20px"/>
                </Button>
            </Td>
            <Td>
                <Button onClick={openDeleteModal} bg="transparent">
                    <AiFillDelete size="20px"/>
                </Button>


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

                <Modal isOpen={editModal} onClose={closeEditModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Editar categoria</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            
                            <VStack as={"form"} onSubmit={handleSubmit(handleEditNewCategory)} w="100%" gap={5} mb={5}>

                                <Input
                                    {...register("name")}
                                    label="Nome"
                                    name="name"
                                    placeholder={name}
                                    error={errors.name}
                                />

                                <Button type="submit" colorScheme="green">Editar</Button>
                            </VStack>

                        </ModalBody>
                    </ModalContent>
                </Modal>


                <AlertDialog
                    leastDestructiveRef={cancelRef}
                    motionPreset='slideInBottom'
                    onClose={closeDeleteModal}
                    isOpen={deleteModal}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                    <AlertDialogHeader>Deletar categoria `{name}`?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Tem a certeza que deseja deletar a categoria `{name}`?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={closeDeleteModal}>
                            Cancelar
                        </Button>
                        <Button onClick={() => handleDeleteNewCategory(id)} colorScheme='red' ml={3}>
                            Deletar
                        </Button>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </Td>
        </Tr>
    )
}