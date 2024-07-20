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
    Text,
    Box,
    Button,
    FormControl,
    FormLabel,
    Stack,
    Select,
    Heading,
    Center,
  } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import AddPrescriptionModal from "./PrescriptionModal";

export default function TestimonialCard(props) {
    const router = useRouter();
    const {  data} = props;
    const {
      isOpen: isPresOpen,
      onOpen: onPresOpen,
      onClose: onPresClose,
    } = useDisclosure();
    
   
    
    return (
      <Box px={12} py={8}>
        <Center>
        <Flex direction="column" gap={4}>
          <Flex direction="row" alignItems="center" gap={4}>
            <Avatar size="xl" name={data.patient.name}></Avatar>
          <Heading>{data.patient.name}</Heading>
          </Flex>
          <Box p={4}>

          <Flex direction="row" gap={2} fontSize={20}>
          <Text fontWeight={600}>Gender :</Text>
          <Text>{data.patient.gender}</Text>

          </Flex>
          <Flex direction="row" gap={2} fontSize={20}>
          <Text fontWeight={600}>Age :</Text>
          <Text>{data.patient.age}</Text>

          </Flex>
          <Flex direction="row" gap={2} fontSize={20}>
          <Text fontWeight={600}>Symptoms:</Text>
          <Text>{data.symptoms}</Text>

          </Flex>
          </Box>
          <Button bgGradient= "linear(to-l, #2DCF57,#aee5be)" color="white" mt="3" onClick={onPresOpen}>
              Add Prescription
            </Button>

        </Flex>
            
        <AddPrescriptionModal data={data}  isPresOpen={isPresOpen} onPresClose={onPresClose} onPresOpen={onPresOpen} />
        </Center>
      </Box>
        
    );
  }
  