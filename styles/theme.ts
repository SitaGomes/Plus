import {extendTheme} from '@chakra-ui/react'


export const theme = extendTheme({
    colors:{
        brand: {
            "orange-500": '#EE6C4D',
            "green-500": '#2CDA9D',
            "black-700": '#222725',
            "grey-500": '#353535',
            "white-500": '#ECF0EB',
            "white-900": "#FAF9F9"
        }
    },
    fonts: {
        heading: 'Poppins',
        body: 'Poppins'
    },
    styles: {
        global: {
            body: {
                bg: "brand.white-500",
                color: "brand.black-700",
            }
        }
    }
    
})