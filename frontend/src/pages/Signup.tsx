import {
    Box,
    Input,
    Button,
    VStack,
    Text,
    Select
  } from "@chakra-ui/react";
  import { useState } from "react";
  // import api from "../api/axios";
  import api from "../utils/api";
  import { useAuth } from "../context/AuthContext";
  
  const Signup = () => {
    const [step, setStep] = useState(0);
    const { login } = useAuth();
  
    const [form, setForm] = useState({
      name: "",
      nickname: "Macha",
      mobile: "",
      email: "",
      age_range: "18-25",
      gender: "Male",
      goal: "LOSS",
      password: ""
    });
  
    const handleNext = () => setStep((s) => s + 1);
  
    const handleSubmit = async () => {
      const res = await api.post("/auth/signup", form);
      login(res.data);
    };
  
    return (
      <Box minH="100vh" bg="linear-gradient(135deg,#eaf6ff,#b9e2fd)" display="flex" alignItems="center" justifyContent="center">
        <Box bg="white" p={8} borderRadius="2xl" w="350px" boxShadow="lg">
          <VStack spacing={4}>
  
            <Text fontSize="xl" fontWeight="bold">
              {["Tell me about you", "Contact info", "Profile", "Security"][step]}
            </Text>
  
            {step === 0 && (
              <>
                <Input placeholder="Your Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Select onChange={(e) => setForm({ ...form, nickname: e.target.value })}>
                  <option>Macha</option>
                  <option>Nanba</option>
                  <option>Dear</option>
                  <option>Buddy</option>
                  <option>Sir</option>
                  <option>Ma’am</option>
                </Select>
              </>
            )}
  
            {step === 1 && (
              <>
                <Input placeholder="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
                <Input placeholder="Email (optional)" onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </>
            )}
  
            {step === 2 && (
              <>
                <Select onChange={(e) => setForm({ ...form, age_range: e.target.value })}>
                  <option>18-25</option>
                  <option>26-35</option>
                  <option>36-45</option>
                  <option>45+</option>
                </Select>
  
                <Select onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                  <option>Male</option>
                  <option>Female</option>
                </Select>
  
                <Select onChange={(e) => setForm({ ...form, goal: e.target.value })}>
                  <option value="LOSS">Weight Loss</option>
                  <option value="GAIN">Weight Gain</option>
                  <option value="MAINTAIN">Maintain</option>
                </Select>
              </>
            )}
  
            {step === 3 && (
              <Input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            )}
  
            {step < 3 ? (
              <Button bg="brand.500" color="white" w="100%" onClick={handleNext}>
                Next →
              </Button>
            ) : (
              <Button bg="brand.500" color="white" w="100%" onClick={handleSubmit}>
                Start Journey 🔥
              </Button>
            )}
          </VStack>
        </Box>
      </Box>
    );
  };
  
  export default Signup;