import {
    Avatar,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    useDisclosure,
    Flex,
    Input,
    SimpleGrid,
    Text,
    useColorModeValue,
    Box,
    Button,
    FormControl,
    FormLabel,
    Stack,
    Select,
    Heading,
    Spacer,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { useRouter } from "next/router";
import NavBar from "@/components/DashBoardComps/NavBar";
import { appointmentGet } from "@/api/api/Doctor/auth";
import TestimonialCard from "@/components/Appointment/TestimonialCard";
  
  
  export default function Doctor() {
    const router =new useRouter();
    const [data, setData] = useState([]);
    const [date, setDate] = useState(null);
    const [selected,setSelected] = useState(1)
    useEffect(()=>{
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
       getData(today);
       setDate(today)
    },[])
    async function getData(e) {
      setDate(e);
      const token = await localStorage.getItem("docToken");
      if (token != null) {
        const response = await appointmentGet({date:new Date(e)},token)
        if (response.status === 200) {
          const res = response;
          setData(res.data.data);
        } else {
          console.error("request failed");
        }
      }
      else{
        router.push('./login')
      }
    }
    return (
      <Box>
        <NavBar isDoctor={true} />
        <Flex
          pt={10}
          justifyContent={"center"}
          direction={"row"}
          width={"full"}
          overflow={"hidden"}
        >
          <Box w="75%">
          {
              data?.length !== 0 && (
                <TestimonialCard
                data={data[selected]}
              />
              )
             } 
          </Box>
             
          <Flex direction="column" p={12} w="25%">
            <Input
              type="date"
              value={date}
              w="full"
              onChange={(e) => {
                getData(e.target.value);
              }}
            ></Input>
          <Box mt={8}>
            <Flex direction="column">
            {data?.map((appoint, index) => (
            <Box as="button" key={index} p={4}  mb={4} _hover={{
              bgGradient: "linear(to-l, #2DCF57,#aee5be)",
              boxShadow: "xl",
              borderRadius: "xl"
            }}
            bgGradient= {selected=== index ? "linear(to-l, #2DCF57,#aee5be)":""}
            borderRadius= {selected=== index ? "xl":""}
            onClick={()=>{setSelected(index)}}
            >
              <Flex direction="row" gap={4} alignItems="center">
                <Avatar pt={1} size="md" name={appoint.patient.name}/>
                <Flex direction="column" alignItems="flex-start">
                  <Heading fontWeight={500} size="md">{`${appoint.patient.name}`}</Heading>
                 
                 </Flex>
                 <Spacer/>
                 <Text p={1} px={2} bg="green.100" borderRadius="md">{appoint.shift}</Text>

              </Flex>

            </Box>
          ))}
            </Flex>
          
        </Box>
          </Flex>
        </Flex>
      </Box>
    );
  }
  