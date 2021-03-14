/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Box, Grid, Stack, Text } from "@chakra-ui/layout";
import { useHistory } from "react-router";
import { useLazyFetch } from '../../hooks/use-lazy-fetch';
import { Skeleton } from "@chakra-ui/skeleton";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

function Home() {
  const history = useHistory();
  const [{ data, loading, error}, {fetchData, fetchMore}] = useLazyFetch();
  const [query, setQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      useEffect(() => {
        if (!isFetching) return;
        fetchMore()
        setIsFetching(false)
      }, [isFetching]);
    
      function handleScroll() {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight | isFetching ) return;
            setIsFetching(true);
      }

    const changeSearch = (e) => {
      setQuery(e.target.value)
  }

  const search = (param) => () => {
      fetchData(param)
  }

  const getDetail = (url) => () => {
    const  id = url.split("starships/")[1];
    history.push(`/detail/${id}`)
  }

    if(loading && !data){
      return (
          <Box mt='76px' p='24px'>
              <Box  mb='16px' position='relative' >
                  <Stack direction={[ "row"]} spacing="8px" position='absolute' right='0' top='1' w='300px'  size='lg'>
                      <Skeleton h='40px' w='60' />
                      <Skeleton h='40px'  w='20'/>
                  </Stack>
              </Box>

              <Grid templateColumns="repeat(2, 1fr)" gap={6} pt='48px'>
                  {[...new Array(20)].map((_, index) => (
                          <Skeleton h='200px' key={index} borderRadius='8px'/>
                  ))}
              </Grid>
          </Box>
      )
  }

    if(error){
        return <Text> Something went wrong! </Text>
    }

    return (
        <>
        <Box mt='76px' p='24px'>
            <Box  mb='16px' position='relative' >
                <Stack direction={[ "row"]} spacing="8px" position='absolute' right='0' top='1' w='300px'  size='lg'>
                        <Input type="search" value={query}  placeholder="Search"  onChange={changeSearch}/>
                        <Button colorScheme="teal" variant="solid" onClick={search(query)}>Search</Button>
                </Stack>
                
            </Box>
           
           {data && data.length > 0 ?
                <>
                <Grid templateColumns="repeat(2, 1fr)" gap={6} pt='48px'>
                        { data && data.map((item, index) => (
                            <Box key={index} w="100%" bg="linkedin.100" p='16px' borderRadius='8px' boxShadow='lg' position='relative' cursor='pointer' onClick={getDetail(item.url)}  >
                                <Text fontSize='32px' fontWeight='bold' mb='16px'>{item.name}</Text>

                                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                                    <Stack direction={[ "column"]} spacing="8px" >
                                        <Text fontSize='16px' fontWeight='bold'>Model :</Text>
                                        <Text fontSize='20px' fontWeight='bold'>{item.model}</Text>
                                    </Stack>

                                    <Stack direction={[ "column"]} spacing="8px" >
                                        <Text fontSize='16px' fontWeight='bold'>Manufacture :</Text>
                                        <Text fontSize='20px' fontWeight='bold'>{item.manufacturer}</Text>
                                    </Stack>

                                    <Stack direction={[ "column"]} spacing="8px" >
                                        <Text fontSize='16px' fontWeight='bold'>Starship Class :</Text>
                                        <Text fontSize='20px' fontWeight='bold'>{item.starship_class}</Text>
                                    </Stack>

                                    <Stack direction={[ "column"]} spacing="8px" >
                                        <Text fontSize='16px' fontWeight='bold'>Passenger :</Text>
                                        <Text fontSize='20px' fontWeight='bold'>{item.passengers === 'n/a' ? 0 : item.passengers}</Text>
                                    </Stack>
                                    
                                </Grid>
                            </Box>
                            ))
                        }
                </Grid>
                {loading &&
                    <Grid templateColumns="repeat(2, 1fr)" gap={6} pt='48px'>
                        {[...new Array(20)].map((_, index) => (
                                <Skeleton h='200px' key={index} borderRadius='8px'/>
                        ))}
                    </Grid>
                }
                </>
            : 
            <Box d='flex' height='76px' w='100%' alignItems='center' justifyContent='center'  mt='300px'> 
                <Text fontSize='32px' fontWeight='bold'>No Data Found</Text>
            </Box>
            }
        </Box>
        </>
    )
}

export default Home;