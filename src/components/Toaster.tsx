import { useEffect, useState } from "react";
import {Toaster as ToasterMessage} from "react-hot-toast";

export function Toaster() {

    const [isClientSide, setIsClientSide] = useState(false)

    useEffect(() => {
        setIsClientSide(true);
    }, [])

    if (isClientSide){
        return <ToasterMessage   
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
        
            // Default options for specific types
            success: {
                duration: 3000,
                style: {
                    color: "#FAF9F9",
                    background: "#2CDA9D",
                },
                iconTheme: {
                    primary: "green",
                    secondary: "white",
                }
            },
            error: {
                duration: 3000,
                style: {
                    color: "#FAF9F9",
                    background: "#EE6C4D",
                },
                iconTheme: {
                    primary: "red",
                    secondary: "white",
                }
            },
            }}         
        />
    }

    return <></>
}