import { Badge, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const Time = ({timezone}) => {
 const [time,setTime] = useState("");
 

 useEffect(()=>{
    if(!timezone) return;

    const updateTime = ()=>{
        const cityTime = new Date().toLocaleDateString("hi-IN",{
            timeZone:timezone,
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit",
            hour12:true,
        });
        setTime(cityTime)
    };
    updateTime();
    const interval = setInterval(updateTime,1000);
    return ()=>clearInterval(interval)//cleanup unmount
 },[timezone]);

    return (
    <Text  fontWeight={"bolder"}>
       <Heading > Local Time ⏰:</Heading>
       <Badge color={"blue.500"} fontSize={"lg"}>
          {time}
        </Badge>  

    </Text>
  )
}

export default Time