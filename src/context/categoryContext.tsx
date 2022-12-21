import { createContext, ReactNode, useCallback } from "react";
import { useLocalState } from "../hooks/useLocalState";

interface ICategory {
    id: string,
    name: string,
    isExpense: boolean
}

interface ICategoryContext {
    categories: ICategory[],
    handleAddCategory: (category: ICategory) => void,
    handleEditCategory: (category: ICategory) => void,
    handleDeleteCategory: (categoryId: string) => void
}

interface ICategoryProvider {
    children: ReactNode
}

export const CategoryContext = createContext<ICategoryContext>({} as ICategoryContext);

export function CategoryProvider({children}: ICategoryProvider) {

    const [categories, setCategory] = useLocalState<ICategory[]>("categories", [])

    const handleAddCategory = useCallback((category: ICategory) => {
        setCategory([...categories, category])
    }, [categories, setCategory])

    const handleDeleteCategory = useCallback((categoryId: string) => {
        setCategory(categories.filter(c => c.id !== categoryId))
    }, [categories, setCategory])

    const handleEditCategory = useCallback((category: ICategory) => {

        const newCategory = categories.map(c => {
            if(c.id === category.id) {
                return {...c, name: category.name}
            }

            return c
        });

        setCategory(newCategory)
    }, [categories, setCategory])

    return(
        <CategoryContext.Provider value={{categories, handleAddCategory, handleDeleteCategory, handleEditCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}