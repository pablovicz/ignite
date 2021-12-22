import { useState, useRef } from 'react';
import { Flex, Input, Icon } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

//controled components
// componentes que controlamos o estado deles atraves do useState do react

//uncontroled components (usamos useRef)
// formas de acessar o valor de um input somente no momento em que for necessaario
// não armazenamos seu valor dentro de um estado no react

// Imperativa -> controlamos o elemento atraves da ref, dizemos o que queremos fazer
// searchInputRef.current.focus() 


export function SearchBox() {

    // controled components
    //const [search, setSearch] = useState('');

    const searchInputRef = useRef<HTMLInputElement>(null);

    console.log(searchInputRef.current?.value);

    return (
        <Flex
            as="label"
            flex="1"
            py="4"
            px="8"
            ml="6"
            maxWidth={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg="gray.800"
            borderRadius="full"
        >
            <Input
                color="gray.50"
                variant="unstyled"
                px="4"
                mr="4"
                placeholder="Buscar na plataforma"
                _placeholder={{ color: "gray.400" }}
                // controled components
                //value={search}
                //onChange={event => setSearch(event.target.value)}

                // uncontroled component
                ref={searchInputRef}

            />
            <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
    );
}