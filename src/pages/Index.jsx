import React, { useState } from "react";
import { Box, Heading, Input, Button, FormControl, FormLabel, Select, Text, VStack, HStack, Divider, Stat, StatLabel, StatNumber, useToast } from "@chakra-ui/react";

const Index = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newSalary, setNewSalary] = useState({
    salary: "",
    role: "",
    experience: "",
    education: "",
    location: "",
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    setNewSalary({ ...newSalary, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSalaryData([...salaryData, newSalary]);
    setNewSalary({ salary: "", role: "", experience: "", education: "" });
    toast({
      title: "Salary data added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredData = salaryData.filter((data) => data.role.toLowerCase().includes(searchTerm.toLowerCase()) || data.education.toLowerCase().includes(searchTerm.toLowerCase()));

  const averageSalary = filteredData.reduce((sum, data) => sum + parseInt(data.salary), 0) / filteredData.length;

  const isOverpaid = (salary) => salary > averageSalary;

  return (
    <Box maxWidth="800px" margin="auto" padding="4">
      <Heading as="h1" size="xl" textAlign="center" marginBottom="8">
        Salary Database for DN
      </Heading>

      <VStack spacing="8" align="stretch">
        <Box>
          <Heading as="h2" size="lg" marginBottom="4">
            Add Salary Data
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="salary" isRequired marginBottom="4">
              <FormLabel>Salary</FormLabel>
              <Input type="number" name="salary" value={newSalary.salary} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="role" isRequired marginBottom="4">
              <FormLabel>Role</FormLabel>
              <Input type="text" name="role" value={newSalary.role} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="experience" isRequired marginBottom="4">
              <FormLabel>Years of Experience</FormLabel>
              <Select name="experience" value={newSalary.experience} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </Select>
            </FormControl>
            <FormControl id="education" isRequired marginBottom="4">
              <FormLabel>Education</FormLabel>
              <Select name="education" value={newSalary.education} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </Select>
            </FormControl>
            <FormControl id="location" isRequired marginBottom="4">
              <FormLabel>Location</FormLabel>
              <Input type="text" name="location" value={newSalary.location} onChange={handleInputChange} />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
          </form>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" marginBottom="4">
            Search Salary Data
          </Heading>
          <Input type="text" placeholder="Search by role or education" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} marginBottom="4" />

          {filteredData.length > 0 ? (
            <>
              <Stat>
                <StatLabel>Average Salary</StatLabel>
                <StatNumber>${averageSalary.toFixed(2)}</StatNumber>
              </Stat>

              {filteredData.map((data, index) => (
                <Box key={index} borderWidth="1px" borderRadius="md" padding="4" marginBottom="4">
                  <HStack spacing="4">
                    <Text fontWeight="bold">Role:</Text>
                    <Text>{data.role}</Text>
                  </HStack>
                  <HStack spacing="4">
                    <Text fontWeight="bold">Salary:</Text>
                    <Text>${data.salary}</Text>
                  </HStack>
                  <HStack spacing="4">
                    <Text fontWeight="bold">Experience:</Text>
                    <Text>{data.experience}</Text>
                  </HStack>
                  <HStack spacing="4">
                    <Text fontWeight="bold">Education:</Text>
                    <Text>{data.education}</Text>
                  </HStack>
                  <Text fontWeight="bold" color={isOverpaid(data.salary) ? "green.500" : "red.500"}>
                    {isOverpaid(data.salary) ? "Overpaid" : "Underpaid"}
                  </Text>
                </Box>
              ))}
            </>
          ) : (
            <Text>No salary data found.</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Index;
