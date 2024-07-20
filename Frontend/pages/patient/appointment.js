import { appointmentCheck, appointmentCreate } from '@/api/api/User/auth'
import Achivement from '@/components/DashBoardComps/Achivement'
import Contact from '@/components/DashBoardComps/Contact'
import Feature from '@/components/DashBoardComps/Feature'
import Appointment from '@/components/DashBoardComps/FindDoctor'
import Footer from '@/components/DashBoardComps/Footer'
import Header from '@/components/DashBoardComps/Header'
import NavBar from '@/components/DashBoardComps/NavBar'
import { Box, Button, Container, Flex, Heading, Image, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react'
import moment from 'moment'
import {  useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer, toast } from "react-toastify";

const appointment = () => {
  const searchParams = useSearchParams()
  const router =  useRouter();
  const [doctorId, setDoctorId] = useState();
  const [date, setDate] = useState(null);
  const [token, setToken] = useState();
  const [slots, setSlots] = useState();
  const [selected, setSelected] = useState()
  const arr = ["morning", "afternoon", "evening"];
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [symptoms, setSymptoms] = useState();
  const [gender, setGender] = useState();
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const id = searchParams.get('id')
    console.log(id)
    if (id) setDoctorId(id);
    if (token){
      setToken(token);

    }
    else router.push("/login")
  })
  const dateChangeHandler = async (e) => {
    setDate(e);
    const shifts = await appointmentCheck({date: new Date(e), doctorId }, token)
    setSlots(shifts.data.slots)
  }
  const submitHandler = async () => {
    setLoading(true)
    const data = {
      doctor: doctorId,
      shift: arr[selected],
      date: new Date(date),
      patient: {
        name: name,
        age: age,
        gender: gender,
      },
      symptoms: symptoms,
    };
    const response = await appointmentCreate(data, token);
    toast.success("Appointment Successfully Created");
    setLoading(false)
    router.reload()

  }


  return (
    <Box>
      <Flex direction="column" gap={4}>
        <Box bg="#EAFFF0" minH="100vh">
          <NavBar />
          <Box
            bg="linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('../../Hospital-BG.png')"
            backgroundRepeat="no-repeat"
            backgroundSize="100%"
            minH="90vh"
          >
            <Flex direction="row" w="full" alignContent="center" p={12}>
              <Box color="white" pl={12} mt={20}>
                <Heading fontSize={"64px"} fontWeight={600} >We Will Help</Heading>
                <Heading fontSize={"64px"} fontWeight={600}>You To Improve</Heading>
                <Heading fontSize={"64px"} fontWeight={600}>Your Mental Health</Heading>
                <Text w="75%" py={4}>Eu sit proin amet quis malesuada vitae elit. Vel consectetur nibh quis ullamcorper quis. Quam enim tortor, id sed</Text>

              </Box>
              <Container maxW="25%" my={12} w="full" bg="white" p={8} borderRadius="xl">
                <Flex direction="column" gap={4}>
                  <Heading fontSize={25}>Book Appointment</Heading>
                  <Input placeholder="Full Name" value={name} onChange={(e) => { setName(e.target.value) }}></Input>
                  <Flex direction="row" w="full" gap={2}>
                    <Input placeholder="Gender" value={gender} onChange={(e) => { setGender(e.target.value) }}></Input>
                    <Input placeholder="Age" type='number' value={age} onChange={(e) => { setAge(e.target.value) }}></Input>
                  </Flex>
                  <Textarea placeholder="Symptoms" value={symptoms} onChange={(e) => { setSymptoms(e.target.value) }}></Textarea>
                  <Flex direction="column" gap={1}>
                    <Text >Date*</Text>
                    <Input type="date" placeholder="Date" onChange={(e) => {
                      dateChangeHandler(e.target.value);
                    }} value={date}></Input>
                  </Flex>
                  {slots && (
                    <Flex direction="row" gap={3}>
                      <Box as='button' w="33%" isDisabled={slots.morning === 0 ? true : false}
                        color={selected === 0 ? "green" : "red"}
                        borderColor={selected === 0 ? "green" : "red"}
                        border="2px"
                        borderRadius="md"
                        variant="outline"
                        onClick={() => {
                          setSelected(0);
                        }} >
                        <Text>
                          Morning
                        </Text>
                        <Text>({slots.morning})</Text>
                      </Box>

                      <Box as='button' w="33%" isDisabled={slots.afternoon === 0 ? true : false}
                        color={selected === 1 ? "green" : "red"}
                        borderColor={selected === 1 ? "green" : "red"}
                        border="2px"
                        borderRadius="md"
                        variant="outline"
                        onClick={() => {
                          setSelected(1);
                        }} >
                        <Text>
                          Afternoon
                        </Text>
                        <Text>({slots.afternoon})</Text>
                      </Box>
                      <Box as='button' w="33%" isDisabled={slots.evening === 0 ? true : false}
                        color={selected === 2 ? "green" : "red"}
                        borderColor={selected === 2 ? "green" : "red"}
                        border="2px"
                        borderRadius="md"
                        variant="outline"
                        onClick={() => {
                          setSelected(2);
                        }} >
                        <Text>
                          Evening
                        </Text>
                        <Text>({slots.evening})</Text>
                      </Box>
                    </Flex>
                  )}

                  <Button bg="#2DCF57" color="white" onClick={submitHandler} isLoading={loading}>Book Appointment</Button>
                </Flex>



              </Container>

            </Flex>

          </Box>
        </Box>
        <Achivement />
        <Feature />
        <Contact />
        <Footer />
      </Flex>
      <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                // transition:Bounce
                />
    </Box>
  )
}

export default appointment
