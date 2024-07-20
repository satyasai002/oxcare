import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Container,
  Heading,
  chakra,
  SimpleGrid,
  useDisclosure,
  Flex,
  useColorModeValue,
  Avatar,
  Button,
  FormLabel,
  FormControl,
  Select,
  Stack,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { prescriptionGet } from "@/api/api/User/auth";
import { FaRegFilePdf } from "react-icons/fa6";

function TestimonialCard(props) {
  const router = useRouter();
  const [current,setCurrent] = useState(1);
  const { data } = props;
  console.log(data)
  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
  function PrescriptionModal() {

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Prescription</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column" gap={5}>
                <form>
                  <Flex direction={"row"} alignContent={"center"}>
                    <FormLabel fontSize={20}>Description:</FormLabel>
                    <Text fontSize={20}>{data.description}</Text>
                  </Flex>
                  <Flex direction={"row"} alignContent={"center"}>
                    <FormLabel fontSize={20}>Diagnosis:</FormLabel>
                    <Text fontSize={20}>{data.diagnosis}</Text>
                  </Flex>
                  <FormControl>
                    <FormLabel>Medicine</FormLabel>
                    <Select onChange={(e) => setCurrent(e.target.value)}>
                      {Array.from({ length: data.medicines.length }, (_, i) => (
                        <option key={i} value={i + 1}>
                          Medicine {i + 1}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <Stack spacing={4} p={3}>
                    <Box>
                      <Flex direction={"row"} alignContent={"center"}>
                        <FormLabel fontSize={20}>Name :</FormLabel>
                        <Text fontSize={20}>
                          {data.medicines[current - 1]?.name}
                        </Text>
                      </Flex>
                      <Flex direction={"row"} alignContent={"center"}>
                        <FormLabel fontSize={20}>Dosage :</FormLabel>
                        <Text fontSize={20}>
                          {data.medicines[current - 1]?.dosage}
                        </Text>
                      </Flex>
                      <Flex direction={"row"} alignContent={"center"}>
                        <FormLabel fontSize={20}>Duration :</FormLabel>
                        <Text fontSize={20}>
                          {data.medicines[current - 1]?.duration}
                        </Text>
                      </Flex>
                      <Flex direction={"row"} alignContent={"center"}>
                        <FormLabel fontSize={20}>Instruction :</FormLabel>
                        <Text fontSize={20}>
                          {data.medicines[current - 1]?.instruction}
                        </Text>
                      </Flex>
                    </Box>
                  </Stack>
                  <Flex direction={"row"} alignContent={"center"}>
                    <FormLabel fontSize={20}>Remarks:</FormLabel>
                    <Text fontSize={20}>{data.remarks}</Text>
                  </Flex>
                    <Flex direction="row" gap={2}>
                      {
                        data.reports.map((report,index)=>(
                          <Box  as="a" href={report} p={4} _hover={{fontWeight:"500"}}>
                            <Flex direction="row" gap={2} alignItems="center">
                              
                            <FaRegFilePdf size={20}/>
                              <Text>Report-{index+1}</Text>
                            </Flex>
                          </Box>
                          
                        ))
                      }
                    </Flex>
                </form>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Flex
      boxShadow={"lg"}
      maxW={"640px"}
      direction={"row"}
      width={"full"}
      rounded={"xl"}
      p={10}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Avatar
        height={"80px"}
        width={"80px"}
        alignSelf={"center"}
        m={{ base: "35px 0 0 0", md: "0 50px 0 0" }}
      />
      <Flex direction={"column"} textAlign={"left"} gap={1}>
          <chakra.p fontFamily={"Work Sans"} fontWeight={"bold"} fontSize={25}>
            {data.patient.name}
            <chakra.span
              fontFamily={"Inter"}
              fontWeight={"medium"}
              color={"gray.500"}
            >
              - {`"${data.symptoms.slice(0,3)}"`}
            </chakra.span>
          </chakra.p>
        <Button onClick={onOpen}>Check</Button>
      </Flex>

      <PrescriptionModal />
    </Flex>
  );
}
function Prescriptions() {
  const router = useRouter();
  const [data,setData] = useState();
  useEffect(()=>{
    getData()
  },[])
  const getData = async ()=>{
    const token = await localStorage.getItem('token');
    if (token) {
      const response = await prescriptionGet({},token)
      if (response.status === 200) {
        const res = response.data;
        setData(res.data);
        console.log(res.data);
      }
      else{
        return;
      }
    } else {
      router.push("/login");
    }
  }
  return (
    <Container maxW="7xl" p="10">
      <Heading fontFamily={"Work Sans"} py={10}>
        Patient Medicine Prescriptions
      </Heading>
      <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        spacing={"20"}
        mt={16}
        mb={16}
        mx={"auto"}
      >
        {data?.map((cardInfo, index) => (
          <TestimonialCard
            key={index}
            data={cardInfo}
            index={index}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Prescriptions;
