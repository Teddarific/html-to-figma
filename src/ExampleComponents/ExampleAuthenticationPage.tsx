import {
  Box,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Link,
  Heading,
  ChakraProvider,
} from '@chakra-ui/react'
import { User, Lock, Mail, Calendar } from 'lucide-react'
import React from 'react'

export function ExampleAuthenticationPage() {
  return (
    <ChakraProvider>
      <Box p={8} maxW="md" mx="auto">
        <Heading textAlign="center" mb={6}>
          Welcome to Our Platform
        </Heading>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Username or Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <User />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="Enter your username or email"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Lock />
                    </InputLeftElement>
                    <Input type="password" placeholder="Enter your password" />
                  </InputGroup>
                </FormControl>
                <Link alignSelf="flex-start" href="#" color="teal.500">
                  Forgot Password?
                </Link>
                <Button colorScheme="teal" width="full">
                  Login
                </Button>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <User />
                    </InputLeftElement>
                    <Input type="text" placeholder="Enter your full name" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Mail />
                    </InputLeftElement>
                    <Input type="email" placeholder="Enter your email" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Lock />
                    </InputLeftElement>
                    <Input type="password" placeholder="Choose a password" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Calendar />
                    </InputLeftElement>
                    <Input type="date" />
                  </InputGroup>
                </FormControl>
                <Button colorScheme="teal" width="full">
                  Sign Up
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </ChakraProvider>
  )
}
