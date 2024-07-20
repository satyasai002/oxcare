import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { BsCheck } from "react-icons/bs";

// Replace test data with your own
const features = [
  {
    id: 1,
    title: "Specialized Medical Services",
    text: "From cardiology to orthopedics, we offer a comprehensive array of specialized medical services to address a variety of health conditions.",
  },
  {
    id: 2,
    title: "Surgical Excellence",
    text: "Our state-of-the-art surgical facilities and skilled surgeons perform a wide range of procedures, ensuring the best possible outcomes for our patients.",
  },
  {
    id: 3,
    title: "Maternity and Pediatric Care",
    text: "We provide exceptional care for expectant mothers and children, with a focus on ensuring a safe and nurturing environment.",
  },
  {
    id: 4,
    title: "Diagnostic Services",
    text: "Our advanced diagnostic equipment and experienced staff enable us to accurately diagnose and treat medical conditions.",
  },
  {
    id: 5,
    title: "Patient-Centered Care",
    text: "We believe in patient-centered care, where your comfort, dignity, and well-being are our top priorities. Our caring and compassionate staff are here to support you and your family throughout your healthcare journey.",
  },
  {
    id: 6,
    title: "Community Involvement",
    text: "As an integral part of the community, we actively engage in health education and outreach programs to promote wellness and preventive care. We are committed to improving the health and quality of life for everyone we serve.",
  },
];

export default function Feature() {
  return (
    <Box p={4} py={8} id="Services">
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={"3xl"}>Services We Offer</Heading>
        <Text color={"gray.600"} fontSize={"xl"}>
          Our mission is to deliver exceptional medical care, support, and
          comfort to our patients during their times of need. We strive to be a
          trusted healthcare partner, offering a range of services to meet the
          diverse needs of our community.
        </Text>
      </Stack>

      <Container maxW={"6xl"} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {features.map((feature) => (
            <HStack key={feature.id} align={"top"}>
              <Box color={"green.400"} px={2}>
                <BsCheck />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>{feature.title}</Text>
                <Text color={"gray.600"}>{feature.text}</Text>
              </VStack>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
