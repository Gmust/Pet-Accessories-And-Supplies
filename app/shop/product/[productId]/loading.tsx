'use client';

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Kbd,
  ListItem,
  Skeleton,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import styles from './productPage.module.css';


export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div>
      <div className={styles.productPageWrapper}>
        <div className={styles.container}>
          <>
            <div className={styles.leftSide}>
              <Container width='350px' className={styles.test} height='100%'>
                <Skeleton position='relative' width={{ base: '300px' }} height={{ base: '400px' }} />
              </Container>
            </div>
            <div className={styles.rightSide}>
              <Flex flexDirection='column' position='relative'>
                <Flex flexDirection='column'>
                  <Flex justify='space-between' align='center'>
                    <Skeleton />
                    <Skeleton />
                  </Flex>
                  <Skeleton />
                </Flex>
                <Flex mt='1' justify='space-between'>
                  <Skeleton />
                  <Divider orientation='vertical' colorScheme='facebook' variant='solid' />
                  <HStack spacing='2'>
                    <Flex>
                      <Skeleton />
                    </Flex>
                    <Skeleton />
                    <Skeleton />
                  </HStack>
                </Flex>
                <Flex direction='column'>
                  <Heading size='md' marginTop='3'>
                    Description
                  </Heading>
                  <Text width='350px' wordBreak='break-word'>
                    <Skeleton height={{ base: '200px' }} />
                  </Text>
                </Flex>
                <Flex direction='column' height='full'>
                  <Heading marginTop='3' size='md'>Additional info</Heading>
                  <UnorderedList>
                    <ListItem><Skeleton /></ListItem>
                    <ListItem><Skeleton /></ListItem>
                    <ListItem><Skeleton /></ListItem>
                    <ListItem><Skeleton /></ListItem>
                    <ListItem><Skeleton /></ListItem>
                    <ListItem><Skeleton /></ListItem>
                  </UnorderedList>
                </Flex>
              </Flex>
            </div>
            <div className={styles.addToCart}>
              <Flex borderRadius='6px' w='90%' align='center' justify='space-between' backgroundColor='lightblue'
                    padding='3'>
                <HStack spacing='2' alignItems='center'>
                  <Box position='relative' w='45px' h='55px'>
                    <Skeleton />
                  </Box>
                  <Stack spacing='-1'>
                    <HStack spacing='2' align='center'>
                      <Skeleton />
                      <Skeleton />
                    </HStack>
                    <Skeleton />
                  </Stack>
                </HStack>
                <HStack spacing='5'>
                  <HStack spacing='2' align='center'>
                    <Text>Qty:</Text>
                    <Text fontSize='xl' cursor='pointer'><CiSquareMinus /></Text>
                    <Text fontSize='2xl' marginBottom='1'><Kbd><Skeleton />
                    </Kbd></Text>
                    <Text fontSize='xl' cursor='pointer'><CiSquarePlus /></Text>
                  </HStack>
                  <Button colorScheme='yellow' p='1'>ADD TO CART</Button>
                </HStack>
              </Flex>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}