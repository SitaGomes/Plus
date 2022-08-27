import { useBreakpointValue } from "@chakra-ui/react";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export function Menu(){

    const isMobileView = useBreakpointValue({
        base: true,
        lg: false,
    })

    if(isMobileView) {
        return <MobileMenu />
    }

    return <DesktopMenu />
    
}