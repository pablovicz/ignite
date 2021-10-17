import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

interface ProfileProps {
    showProfileData?: boolean;
}


export function Profile({ showProfileData = true }: ProfileProps) {

    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Pablo Woinarovicz</Text>
                    <Text color="gray.300" fontSize="small">
                        pablowoina2205@gmail.com
                    </Text>
                </Box>
            )}
            <Avatar
                size="md"
                name="Pablo Woinarovicz"
                src="https://github.com/pablovicz.png"
            />

        </Flex>
    );
}