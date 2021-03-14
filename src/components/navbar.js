import { Box, Image } from "@chakra-ui/react";

const Navbar = () => {
    return (
        <Box d='flex' height='76px' w='100%' bg='#022b44' alignItems='left' justifyContent='left' position="fixed" top='0' zIndex='1'> 
            <Image src='logo-evos.png'  h='75px' w='auto' pl='24px'/>
        </Box>
    )
}

export default Navbar;