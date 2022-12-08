export const convertDate = (date: Date) => new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long", 
    year: "numeric"
})