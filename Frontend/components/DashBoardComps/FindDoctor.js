import { doctorGet } from '@/api/api/Doctor/auth';
import { Avatar, Box, Button, Container, Flex, Heading, HStack, Input, Radio, Spacer, Text, useStatStyles } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Appointment = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  useEffect(() => {
    getData();
  }, [])
  const getData = async () => {
    const response = await doctorGet();
    setData(response.data.data)

  }
  const handleSearch = () => {
      console.log(name)
      const filtered = data.filter(doctor => {
        const isNameMatch = doctor.name.toLowerCase().includes(name.toLowerCase());
        const isSpecializationMatch = doctor.speciality.toLowerCase().includes(specialization.toLowerCase());
        return isNameMatch && isSpecializationMatch;
      });
      setFilteredData(filtered);
    console.log(filtered)

    
    
  };
  return (
    <Box id='FindDoctor'>
      <Container maxW="container.xl" my={12} w="full" bg="white" borderRadius="xl" p={4}>
        <Heading>Find Doctor</Heading>
        <Flex direction="row" w="full" justifyContent="space-between" alignItems="center" p={8}>
          <Input placeholder='Name' value={name} w="30%" onChange={(e) => setName(e.target.value)} ></Input>
          <Input placeholder='Speciality' w="30%" onChange={(e) => setSpecialization(e.target.value)}></Input>
          <Button bg="#2DCF57" color="white" pt={1} w="15%" onClick={handleSearch} disabled={data ? false : true}>Search</Button>



        </Flex>
        <Box mt={8}>
          {filteredData?.map((doctor, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="md" mb={4} w="50%">
              <Flex direction="row" gap={4}>
                <Avatar pt={1} size="md" name='doctor.name'/>
                <Flex direction="column">
                  <Heading fontWeight={500} size="md">{`${doctor.name} (${doctor.speciality})`}</Heading>
                  <p>{doctor.email}</p>
                 </Flex>
                 <Spacer/>
                 <Button bg="#2DCF57" color="white" pt={1} onClick={() => {
                    router.push(`/patient/appointment?id=${doctor._id}`);
                  }}>Book Appointment</Button>

              </Flex>

            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default Appointment
