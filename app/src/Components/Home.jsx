import { Center, Container, Flex, Grid, GridItem, HStack, Heading, Input, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css"
const Home = () => {

    const [sdate, setSDate] = useState('');
    const [edate, setEDate] = useState('');
    const [asteroids, setAsteroids] = useState([]);

     useEffect(() => {
    const fetchAsteroids = async () => {
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${sdate}&end_date=${edate}&api_key=JsrUx0XVmCnbjJUaTLupJCDLD2BhmAKEMBqcyDyc`);
    //   const data = await response.json();
        if(response.data.near_earth_objects){
            setAsteroids(response.data.near_earth_objects);
        }
    };
    fetchAsteroids();
  }, [sdate, edate,asteroids]);
      
    return (
        <div className='page'>
            <details color='white'>
                <summary>See More about the application</summary>
                This application is useful for those who are curious about asteroids. This application can give you the details of the asteroids around the Earth it gives their size, distance from Earth, and their names
            </details>
            <Center padding={'50px'}>
                <Flex>
                    <HStack>
                        <Input color={'white'} borderColor={'blue.300'} fontSize={'1.2rem'} type="date" onChange={(e) =>setSDate(e.target.value)} />
                        <Input color={'white'} borderColor={'blue.300'} fontSize={'1.2rem'} type="date" onChange={(e) =>setEDate(e.target.value)} />
                    </HStack>
            </Flex>
            </Center>
        <Grid className='grid' templateColumns={'repeat(2,1fr)'} w='90%'margin='auto' gap='80px'>
        {Object.keys(asteroids).map((date) => (
          <GridItem key={date} >
            <Heading bgColor={'red.500'} 
            color='white'
            className='date'
            borderRadius={'1rem'} size='md' padding={'2%'}borderTop={'1px'} borderLeft={'1px solid'} borderRight={'1px solid'}>{date}</Heading>
            <Grid  gap='40px'>
              {asteroids[date].map((asteroid) => {
                return (
                    
                <GridItem bgColor={'green.200'}
                color='black'
                borderRadius={'1rem'} key={asteroid.id} gap='10px' textAlign={'justify'} padding={'1rem'} className='griditem'>
                  <Heading size={'md'}>{`Astroid Name: ${asteroid.name}`}</Heading>
                  <Text fontSize={'1.3rem'}>{`Closest To the Earth on: ${asteroid.close_approach_data[0].close_approach_date_full}`}</Text>
                  <Text fontSize={'1.3rem'}>Estimated Diameter (KM): {asteroid.estimated_diameter.kilometers.estimated_diameter_max}</Text>
                  <Text fontSize={'1.3rem'}>Relative Velocity (km/s): {asteroid.close_approach_data[0].relative_velocity.kilometers_per_second}</Text>
                  <Text fontSize={'1.3rem'}>Miss Distance from the Earth (km): {asteroid.close_approach_data[0].miss_distance.kilometers}</Text>
                  <Text fontSize={'1.3rem'}>{`Potentially hazardous: ${asteroid.is_potentially_hazardous_asteroid === "true" ? "Yes" : "No"}`}</Text>
                </GridItem>
              
                )
              })}
            </Grid>
          </GridItem>
        ))}
      </Grid>
        </div>
    );
}

export default Home;
