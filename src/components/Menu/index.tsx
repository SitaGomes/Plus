import { useBreakpointValue } from "@chakra-ui/react";
import Router from "next/router";
import { useLocalAuth } from "../../hooks/useLocalAuth";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export function Menu(){

    const isMobileView = useBreakpointValue({
        base: true,
        lg: false,
    })

    const {user} = useLocalAuth()

    if(!user) {
        Router.push("/")
    }


    if(isMobileView) {
        return <MobileMenu 
                    userName={user.name ? user.name : "user"} 
                    userEmail={user.email ? user.email : "email"}
                />
    }

    return <DesktopMenu 
                userName={user.name ? user.name : "user"} 
                userEmail={user.email ? user.email : "email"}
            />
    
}