import { Button, Container, Heading,Flex, Input, Text ,Box, HStack,Image, VStack} from "@chakra-ui/react";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { FaCloudShowersWater, FaHand, FaTemperatureQuarter, FaThumbtack, FaUmbrella } from "react-icons/fa6";
import { auth, provider } from "../firebase/firebaseConfig";
import { FaCloudSunRain, FaHome } from 'react-icons/fa'
import { SkeletonText } from "../components/ui/skeleton";


const Home = ({user,fetchWeather,weatherData,loading,error}) => {
  const [location, setLocation] = useState("");
  
  //login
  const login = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("User logged in:", result.user);
    } catch (error) {
        console.error("Login Error:", error);
    }
};
  //location submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    fetchWeather(location);
};

  return (
    <div id="home-cont">
        <Container textAlign={"center"} p={5}>
      {!user ? (
        <VStack gap={4} p={5} m={"40px"} boxShadow={"rgba(0,0,0,0.45) 0px 5px 15px"}>
          <Flex>
            Welcome to Our <FaCloudSunRain color="yellowGreen"/> Weather App
          </Flex>
          <Text fontSize={"md"}>
            Here you can check real-time weather updates for any location. Log
            in to continue.
          </Text>
          <Button onClick={login} bg={"green"} colorPalette={"white"}>Login</Button>
        </VStack>
      ) : (
        <VStack gap={4}>
          <Heading size={"lg"} colorPalette={"blue"}>
            Hello ,{user.displayName}! <FaHand color="yellow"/>
          </Heading>
          <Text>Enter your location to get the latest weather updates.</Text>
          <Box display={"flex"} gap={3} borderRadius={"8px"} boxShadow={"rgba(0,0,0,0.35) 0px 5px 10px"}>
            <Input border={"none"} bg={"gray.400"}
              type="text"
              placeholder="Enter Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button onClick={handleSubmit} bg={"green"} colorPalette={"white"}>Submit</Button>
         </Box>
          {loading && <HStack>
            <SkeletonText noOfLines={3}/>
          </HStack>}
          {error && <Text color={"red.500"}>{error}</Text>}
          
          {weatherData && (
            <Box p={5} bg={"blue.200"} borderRadius={"lg"} shadow={"md"} m={3} >
               <Heading as={"h3"} color={"crimson"}>Weather Updates of {weatherData.location.name}<FaHome/></Heading>
               <Image src={weatherData.current.condition.icon} align={"center"} alt="weather-icon"/>

                <Text fontWeight={"bolder"}>Temperature <FaTemperatureQuarter/>: {weatherData.current.temp_c}°C</Text>
                <Text fontWeight={"medium"}>Condition : {weatherData.current.condition.text}</Text>
                <Text>Humidity <FaCloudShowersWater color="grey" size={"24px"}/>: {weatherData.current.humidity}%</Text>
            </Box>
          )}
          <Flex>
          <Text fontWeight={"bolder"} color={"yellow.600"}>Thankyou for Visiting...</Text>
           <FaUmbrella color="purple.900"/>
          </Flex>
        </VStack>
      )}
    </Container>
    </div>
  );
};

export default Home;
