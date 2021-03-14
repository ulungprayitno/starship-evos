/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Stack, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useEffect } from "react";
import { useLazyFetch } from '../../hooks/use-lazy-fetch';

const Detail = (props) => {
    const [{ data, loading, error }, {getDetailById}] = useLazyFetch();

    useEffect(() => {
        getDetailById(props.match.params.id)
    }, []);

    if(loading  || !data){
        return (
            <Box mt='76px' p='24px'>
                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                    <Skeleton h='200px' borderRadius='8px'/>
                </Grid>
            </Box>
        )
    }
  
    if(error){
        return <Text> Something went wrong! </Text>
    }
    
    return (
        <Box mt='76px' p='24px'>
            <Box w="100%" bg="linkedin.100" p='16px' borderRadius='8px' boxShadow='lg' >

                <Box d='flex' w='100%' alignItems='center' justifyContent='center' mt='16px' mb='24px'> 
                    <Text fontSize='40px' fontWeight='bold' >{data.name}</Text>
                </Box>
                

                <Grid templateColumns="repeat(2, 1fr)" gap={6} pb='20px'>
                    <Box w="100%" p='16px' borderRadius='8px' boxShadow='lg' border='1px solid'>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6} pb='20px'  mt='24px'>
                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Model :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.model}</Text>
                            </Stack>

                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Manufacture :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.manufacturer}</Text>
                            </Stack>

                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Starship Class :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.starship_class}</Text>
                            </Stack>

                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Cost in Credit :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.cost_in_credits}</Text>
                            </Stack>

                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Length :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.length}</Text>
                            </Stack>

                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Max Atmosphere Speed :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.max_atmosphering_speed}</Text>
                            </Stack>

                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Crew :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.crew}</Text>
                            </Stack>

                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Passenger :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.passengers === 'n/a' ? 0 : data.passengers}</Text>
                            </Stack>
                            
                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Cargo Capacity :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.cargo_capacity}</Text>
                            </Stack>

                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Consumables :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.consumables}</Text>
                            </Stack>

                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>Hyper Drive Rating :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.hyperdrive_rating}</Text>
                            </Stack>

                            <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                <Text fontSize='16px' fontWeight='bold'>MGLT  :</Text>
                                <Text fontSize='20px' fontWeight='bold'>{data.MGLT}</Text>
                            </Stack>
                        </Grid>
                    </Box>

                    <Box w="100%" p='16px' borderRadius='8px' boxShadow='lg' border='1px solid'>
                        <Tabs isFitted variant="enclosed" pt='24px' colorScheme='linkedin'>
                            <TabList>
                                <Tab>
                                    <Text fontSize='16px' fontWeight='bold'>Pilots </Text>
                                </Tab>
                                <Tab>
                                    <Text fontSize='16px' fontWeight='bold'>Films </Text>
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel mt='16px'>
                                    {data.pilots.length > 0 ?
                                        <>
                                        { data.pilots.map((item, index) => (
                                            <Grid key={index} templateColumns="repeat(2, 1fr)" gap={6} pb='20px'>
                                                <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                                    <Text fontSize='16px' fontWeight='bold'>Name :</Text>
                                                    <Text fontSize='20px' fontWeight='bold'>{item.name}</Text>
                                                </Stack>

                                                <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                                    <Text fontSize='16px' fontWeight='bold'>Gender :</Text>
                                                    <Text fontSize='20px' fontWeight='bold'>{item.gender}</Text>
                                                </Stack>
                                            </Grid>
                                            ))
                                        }
                                        </>
                                    :
                                        <Text>No Data Found</Text>
                                    }
                                
                                </TabPanel>
                                <TabPanel mt='16px'>
                                    {data.films.length > 0 ?
                                        <>
                                        { data.films.map((item, index) => (
                                            <Grid key={index} templateColumns="repeat(2, 1fr)" gap={6} pb='20px'>
                                                <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                                    <Text fontSize='16px' fontWeight='bold'>Title :</Text>
                                                    <Text fontSize='20px' fontWeight='bold'>{item.title}</Text>
                                                </Stack>

                                                <Stack direction={[ "column"]} spacing="8px" mb='16px'>
                                                    <Text fontSize='16px' fontWeight='bold'>Release Date :</Text>
                                                    <Text fontSize='20px' fontWeight='bold'>{item.release_date}</Text>
                                                </Stack>
                                            </Grid>
                                            ))
                                        }
                                        </>
                                    :
                                        <Text>No Data Found</Text>
                                    }
                                
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Grid>

                
            </Box>
        </Box>
    )
}

export default Detail;