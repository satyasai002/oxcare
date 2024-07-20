import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { color } from 'framer-motion';
import React from 'react'

const achivements = [
    { name: "Onile Support", data: "24/7",color:"#2DCF57"  },
    { name: "Doctors", data: "100+",color:"#242424"  },
    { name: "Active Patient", data: "1M+" ,color:"#2DCF57" },
    { name: "Interested", data: "5M+",color:"#242424"  },
];


const Achivement = () => {
    return (
        <Flex direction="row" justifyContent="space-evenly" my={20}>
            {
                achivements.map((achv, index) => (
                    <Box bg={achv.color} color="white" px="70px" py="30px" borderRadius={13} alignSelf="center">
                        <Flex direction="column" gap={3} alignItems="center" >
                            <Heading fontSize={40}>{achv.data}</Heading>
                            <Text fontSize={20}>{achv.name}</Text>
                        </Flex>
                    </Box>
                ))
            }

        </Flex>
    )
}

export default Achivement
