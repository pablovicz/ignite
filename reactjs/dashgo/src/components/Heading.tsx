import { ReactNode } from 'react';

import {Heading as ChakraHeading, HeadingProps as ChakraHeadingProps} from '@chakra-ui/react';

interface HeadingProps extends ChakraHeadingProps {
    children: ReactNode;
}

export function Heading({ children, ...rest }: HeadingProps) {
    return (
        <ChakraHeading size="lg" fontWeight="normal" {...rest}>
            {children}
        </ChakraHeading>
    );
}