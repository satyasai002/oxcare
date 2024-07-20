import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Icon,
  useBreakpointValue,
  Progress,
} from "@chakra-ui/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { doctorSignUp } from "@/api/api/Doctor/auth";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
export default function SignupCard(){
   const [name,setName] = useState();
   const [speciality,setSpeciality] = useState();
   const [email,setEmail] = useState();
   const [password,setPassword] = useState();
   const [mobile,setMobile] = useState();
   const router = useRouter();
   const Signup = async (e) => {
     e.preventDefault();

     if (email == "" || password == "" || mobile == "" || name == "" || speciality == "") {
       toast.error("Input fields can't be empty", {
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
     const response = doctorSignUp({ email, password, name, mobile, speciality })
     if (response.status === 200) {
       const data = response.data;
       toast.success("Account created " + name, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
       localStorage.setItem("token", data.token);
       router.push("/login");
     } else {
       toast.error("Email already in use !!", {
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
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up Form 1
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Mobile</FormLabel>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="lastName" isRequired>
                <FormLabel>Speciality</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => {
                    setSpeciality(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    //   type={showPassword ? "text" : "password"}
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex
                pt={4}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text>
                  Already a user? <Link color={"#2DCF57"} onClick={()=>{router.push("/doctor/login")}}>Login</Link>
                </Text>
                <Button
                  fontFamily={"heading"}
                  bg="#2DCF57"
                  color={"white"}
                  onClick={(e)=>{Signup(e)}}
                >
                  SignUp
                </Button>
              </Flex>
            </Stack>
          </Box>
        </Stack>
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
      </Flex>
    );
}
