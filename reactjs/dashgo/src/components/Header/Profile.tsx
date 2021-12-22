import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Pablo Woina</Text>
                    <Text color="gray.300" fontSize="small">pw@gmail.com</Text>
                </Box>
            )}
            <Avatar size="md" name="Pablo Woinarovicz" href="https://avatars.githubusercontent.com/u/68609973?v=4" />

        </Flex>
    );
}