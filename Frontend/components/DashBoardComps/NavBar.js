import { useEffect, useRef, useState } from "react";
import {
  Flex,
  Text,
  Heading,
  HStack,
  Link,
  Button,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiHomeHeart, BiTrip } from "react-icons/bi";
import { GrGallery, GrContact } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";

const links = [
  { name: "Home", href: "#Home", icon: <BiHomeHeart /> },
  { name: "Prescription", href: "patient/prescription", icon: <BiTrip /> },
  { name: "Services", href: "#Services", icon: <GrGallery /> },
  { name: "Contact", href: "#Contact", icon: <GrContact /> },
];

const LinkItem = ({ href, children }) => {
  const ScrollView = (href) => {
    if(href.charAt(0)==="#"){
    const ele = document.querySelector(href);
    if (ele) ele.scrollIntoView();
    }
  }
  return (
    <Link
      onClick={() => { ScrollView(href) }}
      href={href}
      fontSize="20px"
      color="black"
      _hover={{ color: "color5" }}
      _active={{ color: "color5" }}
      fontWeight="normal"
    >
      {children}
    </Link>
  )
}



const NavBar = ({ isDoctor }) => {
  const router = useRouter()
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const Logout = () => {
    localStorage.removeItem("token");
    router.push("/login")
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setisLoggedIn(true)
    else setisLoggedIn(false)
  })
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={4}
      pt={5}
    >
      <Link
        cursor={"pointer"}
        style={{ textDecoration: "none" }}
        href="./dashboard"
        fontSize="28px" color="#2DCF57"
        fontWeight={600}
      >oxcare
      </Link>
      {!isDoctor && (
        <>
          <HStack
            gap={{ base: 4, lg: 8 }}
          >
            {links.map(({ name, href }) => (
              <LinkItem key={name} href={href}>
                {name}
              </LinkItem>
            ))}

          </HStack>

          {
            !isLoggedIn ? (<HStack >
              <Button bg="#EAFFF0" pt={1} fontSize={18} fontWeight={500} onClick={()=>{router.push("./login")}}>Login</Button>
              <Button bg="#2DCF57" color="white" pt={1} fontSize={18} fontWeight={500} onClick={()=>{router.push("patient/signup")}}>signup</Button>
            </HStack>) : (
              <Box as="button" onClick={Logout}>
                 <CgProfile size={40}/>
              </Box>
             
            )
          }

        </>
      )}
    </Flex>
  );
};

export default NavBar;
