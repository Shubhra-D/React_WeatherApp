import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import React from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { FaHandsPraying, FaRainbow } from "react-icons/fa6";



const Navbar = ({ user, setUser }) => {
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.log("Error Logging", err);
    }
  };
  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <Box bg={"blackAlpha.900"} color={"white"} p={4}>
        <Flex align={"center"}>
          <Heading as={"h2"} fontWeight={"bolder"}>
          ⛈️ Weather App❄️
          </Heading>

          <Spacer />
          <Heading>
            {user ? (
              <Flex align={"center"} gap={4}>
                <Heading>Welcome</Heading>
                <FaHandsPraying size={32} color="goldenrod"/>,
                <Heading>{user.displayName}</Heading>
                <Button onClick={logout} bg={"blue.300"}>
                  Logout
                </Button>
              </Flex>
            ) : (
              <Button onClick={login} color={"white"} bg={"blue.300"} >
                Login
              </Button>
            )}
          </Heading>
        </Flex>
      </Box>
    </div>
  );
};

export default Navbar;
