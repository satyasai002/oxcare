
import Footer from "@/components/DashBoardComps/Footer";
import NavBar from "@/components/DashBoardComps/NavBar";
import Prescriptions from "@/components/Prescription";
import { Box } from "@chakra-ui/react";
import React from "react";

const Prescription = () => {
  return (
    <Box>
      <NavBar isDoctor={false} />
      <Prescriptions />
      <Footer />
    </Box>
  );
};

export default Prescription;
