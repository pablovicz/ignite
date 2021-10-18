import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '../components/Form/Input';

type signInFormData = {
  email: string;
  password: string;
}

export default function Home() {

  const { register, handleSubmit, formState } = useForm();

  const handleSignin: SubmitHandler<signInFormData> = (values, event) => {
    event.preventDefault
    console.log(values);
  }

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
        onSubmit={handleSubmit(handleSignin)}
      >
        <Stack spacing="4">
          <Input type="email" label="E-mail" name="email" ref={register} />
          <Input type="password" label="Senha" name="password" ref={register} />

        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
