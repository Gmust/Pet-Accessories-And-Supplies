'use client';


import { Flex, HStack, Text } from '@chakra-ui/react';
import { BiSolidDog } from 'react-icons/bi';
import { FaCat } from 'react-icons/fa';
import { GiCat, GiSittingDog } from 'react-icons/gi';
import { LuBird, LuFish, LuRat } from 'react-icons/lu';

export const PetCards = () => {
  return (
    <HStack width='full' align='end' justify='space-around'>
      <Flex flexDirection='column' justify='center' align='unset'>
        <Text fontSize='3xl'>
          <GiCat />
        </Text>
        <Text fontSize='xl'>Cats</Text>
      </Flex>
      <Flex flexDirection='column' justify='center' align='center'>
        <Text fontSize='3xl'>
          <GiSittingDog />
        </Text>
        <Text fontSize='xl'>Dogs</Text>
      </Flex>
      <Flex flexDirection='column' justify='center' align='center'>
        <Flex>
          <Text fontSize='3xl'>
            <FaCat />
          </Text>
          <Text fontSize='3xl'>
            <BiSolidDog />
          </Text>
        </Flex>
        <Text fontSize='xl'>Kittens an Puppies</Text>
      </Flex>
      <Flex flexDirection='column' justify='center' align='center'>
        <Text fontSize='3xl'>
          <LuRat />
        </Text>
        <Flex>
          <Text fontSize='3xl'>
            <LuBird />
          </Text>
          <Text fontSize='3xl'>
            <LuFish />
          </Text>
        </Flex>
        <Text fontSize='xl'>Other pets</Text>
      </Flex>
    </HStack>
  );
};

