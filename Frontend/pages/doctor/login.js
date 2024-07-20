
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Checkbox,
  Link,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { doctorLogin } from "@/api/api/Doctor/auth";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Segun Adebayo",
    url: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Kent Dodds",
    url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name: "Christian Nwamba",
    url: "https://plus.unsplash.com/premium_photo-1661766718556-13c2efac1388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

export default function JoinOurTeam() {
  const router = useRouter();
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
   const Login = async (e) => {
     e.preventDefault();
     if (email == '' || password == '') {
      console.log("hello");
       toast.error("Email and Password can't be empty", {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
       return;
     }
     const response =await doctorLogin({email,password})
     const data = response.data
     if (response.status === 200) {
       toast.success("Welcome user " + data.doctorData[0].name, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
       localStorage.setItem("docToken", data.token);
       router.push("/doctor/dashboard");
     } else {
      toast.error("Email and password doesn't match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
       console.error("Login failed");
     }
   };
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        pt={{ base: 10, sm: 20, lg: 32 }}
      >
        <Center>
        <Stack spacing={{ base: 10, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Consult India’s Top{" "}
            <Text
              as={"span"}
              bg="#2DCF57"
              bgClip="text"
            >
              Doctors
            </Text>{" "}
            Online, Safely From Home.
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bg: "#2DCF57",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              ...
            </Text>
          </Stack>
        </Stack>
        </Center>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Welcome Back
              <Text
                as={"span"}
                bg={"#2DCF57"}
                bgClip="text"
              >
                 !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              As pioneers in the healthcare segment, we understand the
              importance of trust. And that is why, over the years, we worked on
              building that trust..
            </Text>
          </Stack>
          <Box as={"form"}>
            <Stack spacing={4}>
              <Input
                placeholder="Email"
                bg={"gray.100"}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                placeholder="Password"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>
            <Flex pt="10" justifyContent="space-between">
              <Checkbox colorScheme="green" defaultChecked>
                Remember Me
              </Checkbox>
              <Text cursor="pointer" color="#2DCF57">
                Forgot Password?
              </Text>
            </Flex>
            <Flex gap="3" justifyContent="center" flexDirection="column">
              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bg="#2DCF57"
                color={"white"}
                onClick={Login}
              >
                Login
              </Button>
              <Flex gap="4px">
                <Text fontWeight="500" fontFamily="'Poppins'">
                  Don't have an Account ?
                </Text>
                <Link
                  cursor="pointer"
                  fontWeight="500"
                  fontFamily="'Poppins'"
                  color="#2DCF57"
                  onClick={() => {
                    router.push("/doctor/signup");
                  }}
                >
                  Sign Up
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Stack>
      </Container>
      
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}
