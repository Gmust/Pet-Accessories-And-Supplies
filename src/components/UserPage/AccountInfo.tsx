'use client';

import { Avatar, Box, Flex, Text, VStack } from '@chakra-ui/react';
import { LiaUserCircleSolid } from 'react-icons/lia';

export const AccountInfo = ({ username, email }: Pick<User, 'email' | 'username'>) => {
  return (
    <Box display='flex' alignItems='flex-start' flexDirection='column'>
      <Flex flexDirection='column' alignItems='center' padding='10'>
        <LiaUserCircleSolid style={{fontSize: '100px'}}/>
        <VStack mt='6px'>
          <Text fontSize='2xl' fontWeight='medium'>{username}</Text>
          <Text fontSize='2xl' fontWeight='medium'>{email}</Text>
        </VStack>
      </Flex>
    </Box>
  );
};

