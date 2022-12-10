import { useBreakpointValue } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { useLocalAuth } from "../../hooks/useLocalAuth";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export function Menu(){
    
    const router = useRouter()
    const [path] = useState(router.asPath)

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
                    path={path}
                />
    }

    return <DesktopMenu 
                userName={user.name ? user.name : "user"} 
                userEmail={user.email ? user.email : "email"}
                path={path}
            />
    
}