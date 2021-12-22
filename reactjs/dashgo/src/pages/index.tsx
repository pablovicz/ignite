import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'


import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})


export default function SignIn() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    event.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
  }

  return (

    <Flex
      width="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}  //em pixels
        bg="gray.800"
        p="8"   // 8 * 4 = 32px  | 8/2 = 2rem
        borderRadius={8}
        flexDirection="column"
        noValidate   // desabilita validacao default do HTML5
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            label="E-mail"
            type="email"
            error={formState.errors.email}
            {...register('email')} 
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            error={formState.errors.password}
            {...register('password')} 
          />
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
