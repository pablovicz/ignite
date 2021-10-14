import { Flex,Button, Stack, FormLabel, FormControl } from '@chakra-ui/react';
import { Input } from '../components/Form/Input';


export default function Home() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"  // medida do chakra -> 8 = 2rem = 32px
        borderRadius={8}
        flexDirection="column"
      >
        <Stack spacing="4">
          <Input type="email" label="E-mail" name="email"/>
          <Input type="password" label="Senha" name="password"/>
    
        </Stack>
        <Button type="submit" mt="6" colorScheme="pink" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
