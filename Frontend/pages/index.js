import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import NavBar from "@/components/DashBoardComps/NavBar";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/DashBoardComps/Header";
import Achivement from "@/components/DashBoardComps/Achivement";
import Feature from "@/components/DashBoardComps/Feature";
import Footer from "@/components/DashBoardComps/Footer";
import Contact from "@/components/DashBoardComps/Contact";
import Appointment from "@/components/DashBoardComps/FindDoctor";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
   <Box bg="gray.100">
    <Flex direction="column" gap={4}>
      <Box bg="#EAFFF0" minH="100vh" p={4}>
      <NavBar isDoctor={false}/>
      <Header/>
      </Box>
    <Appointment/>
    <Achivement/>
    <Feature/>
    <Contact/>
    <Footer/>
    </Flex>
  
   </Box>
  );
}
