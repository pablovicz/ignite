import { Text, Link as ChakraLink, Icon, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { ElementType } from 'toasted-notes/node_modules/@types/react';

interface NavLinkProps  extends ChakraLinkProps{
    icon: ElementType;
    children: string;
}

export function NavLink({icon, children, ...rest}: NavLinkProps){
    return (
        <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
        </ChakraLink>
    );
}