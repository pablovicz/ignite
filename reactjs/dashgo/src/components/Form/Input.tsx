import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChrakraInputProps } from '@chakra-ui/react';


interface InputProps extends ChrakraInputProps {
  name: string;
  label?: string;
}


const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...rest }, ref) => {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        name={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{ bgColor: 'gray.900' }}
        size="lg"
        ref={ref}
        {...rest}
      />
    </FormControl>
  );
}

// encaminhamento da ref
export const Input = forwardRef(InputBase)