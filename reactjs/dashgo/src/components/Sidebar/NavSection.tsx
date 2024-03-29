import { Box, Text, Stack, Link, Icon } from "@chakra-ui/react";
import { RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { ReactNode } from "toasted-notes/node_modules/@types/react";


interface NavSectionProps {
    title: string;
    children: ReactNode;
}


export function NavSection({ title, children }: NavSectionProps) {
    return (
        <Box>
            <Text
                fontWeight="bold"
                color="gray.400"
                fontSize="small"
            >
                {title.toUpperCase()}
            </Text>
            <Stack spacing="4" mt="8" align="stretch">
                {children}
            </Stack>
        </Box>
    );
}