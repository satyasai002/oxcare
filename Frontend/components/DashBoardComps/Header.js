import { Box, Button, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react';
import React from 'react'

const Header = () => {
  return (
    <>
    <Flex direction="row" w="full" gap={12} alignItems="center" justifyContent="space-between" id='Home'>
        <Flex direction="row-reverse" w="60%">
          <Box w="80%">
          <Heading fontSize={"64px"} fontWeight={600} >We Will Help</Heading>
            <Heading fontSize={"64px"} fontWeight={600}>You To Improve</Heading>
            <Heading fontSize={"64px"} fontWeight={600}>Your Mental Health</Heading>
            <Text w="75%" py={4}>Eu sit proin amet quis malesuada vitae elit. Vel consectetur nibh quis ullamcorper quis. Quam enim tortor, id sed</Text>
            <Flex direction="row" gap={8}>
              <Button bg="#2DCF57" alignItems="center" color="white" fontSize={18} fontWeight={500} pt={1}>Get Appointment</Button>

            </Flex>
          </Box>
            
        </Flex>
        <Spacer/>
        <Box>
            <Image src="./Header-Doc.png" w={"54%"} ></Image>
        </Box>
    </Flex>
      
    </>
  )
}

export default Header;
