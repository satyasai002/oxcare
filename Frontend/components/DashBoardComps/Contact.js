import {
    Button,
    Center,
    Container,
    Flex,
    Heading,
    Input,
    Text,
  } from '@chakra-ui/react'
  import React, { useState } from 'react'
  
  const Contact = () => {
    const [contactDetails, setContactDetails] = useState({})
    return (
        <Container maxW="container.xl" my={12} w="full" id='Contact'>
            <Center>
              <Flex
                bgColor="#000000"
                rounded="xl"
                direction={{ base: 'column-reverse', lg: 'row' }}
                justifyContent="between"
                
                py={20}
                px={{ base: 4, lg: 20 }}
                gap={{ base: 1, lg: 6 }}
                boxShadow="xl"
                w="70%"
              >
                <Flex
                  direction="column"
                  gap={1}
                  
                  fontFamily="'Roboto'"
                  color="white"
                  w="60%"
                >
                    <Text fontWeight={400} fontSize={12}>Need a Doctor counsealing?</Text>
                    <Heading fontWeight={500} >Request a Call Back Today Now</Heading>
                    <Text fontWeight={400} fontSize={12}>Eu sit proin amet quis malesuada vitae elit. Vel consectetur nibh quis ullamcorper quis. Quam enim tortor, id sed</Text>

                    </Flex>
                  <Flex direction="column" gap={4} w="50%" >
                        <Input placeholder='Your Name' bg="white" fontSize={12}></Input>
                        <Input placeholder='Your Mobile Number' bg="white" fontSize={12}></Input>
                        <Input placeholder='date' bg="white" fontSize={12}></Input>
                        <Button w="40%" bg="#242424" color="white" fontWeight={500}>Request Now</Button>
                  </Flex>
                   
                 
                
              </Flex>
            </Center>
        </Container>
    )
  }
  
  export default Contact
  