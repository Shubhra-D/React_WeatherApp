import {
  Button,
  Heading,
  Flex,
  Input,
  Text,
  Box,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";

import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import {
  FaCloudShowersWater,
  FaHand,
  FaTemperatureQuarter,
  FaUmbrella,
} from "react-icons/fa6";
import { auth, provider } from "../firebase/firebaseConfig";
import { FaCloudSunRain, FaHome, FaTint, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { SkeletonText } from "../components/ui/skeleton";
import Time from "./Time";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = ({ user, fetchWeather, weatherData, loading, error }) => {
  const condition = weatherData?.current?.condition?.text;
  const [location, setLocation] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("React_WeatherApp/Images/clear.jpeg");
 const audioRef = useRef(new Audio());
 //sound enable or disable
 const [isSoundOn,setSound] = useState(true);
 // Login
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in:", result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // Location Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    fetchWeather(location);
  };

  // Dynamic Background Change
  useEffect(() => {
    if (!condition) return;
    const imageMap = {
      Clear: "React_WeatherApp/Images/clear.jpeg",
      Sunny: "React_WeatherApp/Images/sunny.jpeg",
      Rain: "React_WeatherApp/Images/rain.jpeg",
      Drizzle: "React_WeatherApp/Images/rain.jpeg",
      "Light rain": "React_WeatherApp/Images/drizzle.jpeg",
      Snow: "React_WeatherApp/Images/snow.jpeg",
      "Light snow":"React_WeatherApp/Images/snow.jpeg",
      Cloudy: "React_WeatherApp/Images/cloud.jpeg",
      Overcast: "React_WeatherApp/Images/cloud.jpeg",
      Mist: "React_WeatherApp/Images/cloud.jpeg",
      "Patchy light snow":"React_WeatherApp/Images/snow.jpeg"
    };
    const soundMap = {
        Clear:"React_WeatherApp/Sounds/sunny.mp3",
        Sunny:"React_WeatherApp/Sounds/sunny.mp3",
        Rain:"React_WeatherApp/Sounds/Heavyrain.mp3",
        "Light rain":"React_WeatherApp/Sounds/RAIN.mp3",
        Drizzle:"React_WeatherApp/Sounds/RAIN.mp3",
        Snow:"React_WeatherApp/Sounds/snow.mp3",
        Cloudy:"React_WeatherApp/Sounds/wind.mp3",
        Overcast:"React_WeatherApp/Sounds/overcast.mp3",
        Mist:"React_WeatherApp/Sounds/wind.mp3"
        
        
    };
    const newSound = soundMap[condition.trim()]||"React_WeatherApp/Sounds/sunny.mp3"
    //stop the previous sound
    audioRef.current.pause();

    //set the new sound
    audioRef.current.src = newSound;
    audioRef.current.load()//reload the new sound
    if(isSoundOn){
      audioRef.current.play()
      .catch((err)=>console.log("Error playing the audio",err))

    }
    setBackgroundImage(imageMap[condition.trim()] )|| "/Images/clear.jpeg";


    return ()=>{
      audioRef.current.pause()
    }
  }, [condition,isSoundOn]);


  
  // Toggle Sound Function
const toggleSound = () => {
  setSound((prev) => {
    if (prev) {
      audioRef.current.pause(); // Mute when toggled off
    } else {
      audioRef.current.play().catch((err) => console.error("Audio Play Error:", err)); // Play when toggled on
    }

    return !prev
  }); // Toggle state
  
  
};

  
  return (
    <div
      id="home-cont"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "background 0.5s ease-in-out", // Smooth background transition
      }}
    >
      {!user ? (
        <VStack gap={4} p={5} m={"40px"} >
          <Flex fontFamily={"cursive"} fontWeight={"bolder"}>
            Welcome to Our <FaCloudSunRain color="yellowGreen" /> Weather App
          </Flex>
          <Text fontSize={"md"} fontWeight={"bolder"}>
            Here you can check real-time weather updates for any location. Log in to continue.
          </Text>
          <Button onClick={login} bg={"green"} color={"white"}>
            Login
          </Button>
        </VStack>
      ) : (
        <VStack gap={4} p={5} borderRadius="lg">
          <Flex>
            <Heading size={"2xl"}>Hello, {user.displayName}!</Heading>
            <FaHand color="yellow" />
          </Flex>

          <Text>Enter your location to get the latest weather updates.</Text>
          <Box
            display={"flex"}
            gap={3}
            borderRadius={"8px"}
            boxShadow={"rgba(0,0,0,0.35) 0px 5px 10px"}
            p={3}
            bg="gray.300"
          >
            <Input
              border={"none"}
              bg={"gray.100"}
              type="text"
              placeholder="Enter Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button onClick={handleSubmit} bg={"green"} colorPalette={"white"}>
              Submit
            </Button>
          </Box>

          {loading && (
            <HStack>
              <SkeletonText noOfLines={3} />
            </HStack>
          )}
          {error && <Text color={"red.500"}>{error}</Text>}

          {weatherData && (
            
            <Box p={5} bg={"gray.500"} borderRadius={"lg"} shadow={"md"} m={3}>
              <Button onClick={toggleSound} colorPalette={"teal"} mt={4}>
                  {isSoundOn ? <FaVolumeUp/> : <FaVolumeMute/>}
              </Button>
              <Flex color={"crimson"}>
                <Heading as={"h3"}>Weather Updates of {weatherData.location.name}</Heading>
                <FaHome />
              </Flex>

              <Image src={weatherData.current.condition.icon} alt="weather-icon" mx="auto" />
              <Time timezone={weatherData.location.tz_id} />

              <Flex p={5}>
                <FaTemperatureQuarter color="red" size={"24px"} />
                <Text fontWeight={"bolder"} color={"blackAlpha.800"}>
                  Temperature: {weatherData.current.temp_c}°C
                </Text>
              </Flex>

              <Flex p={5}>
                <FaCloudShowersWater color="blue" size={"24px"} />
                <Text fontWeight={"bolder"} color={"blackAlpha.800"}>
                  Condition: {weatherData.current.condition.text}
                </Text>
              </Flex>

              <Flex p={5}>
                <FaTint size={"20px"} />
                <Text fontWeight={"bolder"} color={"blackAlpha.800"}>
                  Humidity: {weatherData.current.humidity}%
                </Text>
              </Flex>

              <Flex>
                <Text fontWeight={"bolder"} color={"yellow.600"}>
                  Thank you for Visiting...
                </Text>
                <FaUmbrella color="purple.900" />
              </Flex>
            </Box>
          )}

        </VStack>
      )}
    </div>
  );
};

export default Home;

