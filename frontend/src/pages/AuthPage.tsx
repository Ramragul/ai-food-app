//  Version 1 : Working Version

// import {
//   Box,
//   Input,
//   Button,
//   Icon,
//   VStack,
//   Text,
//   Flex,
//   Select,
//   Progress,
//   Spinner
// } from "@chakra-ui/react";
// import { useState } from "react";
// import api from "../utils/api"
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { FaHeart } from "react-icons/fa";

// import fitnessVideo from "../assets/videos/fitness.mp4";
// // import { ArrowBackIcon } from "@chakra-ui/icons";

// const AuthPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
//   const [step, setStep] = useState(1);

//   // ✅ NEW
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const [form, setForm] = useState<any>({
//     name: "",
//     nickname: "Macha",
//     mobile: "",
//     email: "",
//     age_range: "18-25",
//     gender: "Male",
//     goal: "LOSS",
//     password: "",
//     newPassword: ""
//   });

//   const totalSteps = 5;

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       setMessage("");

//       if (mode === "login") {
//         const res = await api.post("/auth/login", {
//           mobile: form.mobile,
//           password: form.password
//         });
//         login(res.data);
//         setMessage("")
//         navigate("/home");
//       }

//       if (mode === "signup") {
//         const res = await api.post("/auth/signup", form);
//         login(res.data);
//         setMessage("")
//         navigate("/home");
//       }

//       if (mode === "reset") {
//         await api.post("/auth/reset-password", {
//           mobile: form.mobile,
//           newPassword: form.newPassword
//         });
//         setMessage("Password updated 🔥");
//         setMode("login");
//         setLoading(false);
//       }
//     } catch (err: any) {
//       setMessage(
//         err?.response?.data?.error || "Something went wrong"
//       );
//       setLoading(false);
//     }
//   };

//   const nextStep = () => {
//     if (step < totalSteps) setStep(step + 1);
//     else handleSubmit();
//   };

//   const prevStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   return (
//     <Box minH="100vh" position="relative" overflow="hidden">

//       <video autoPlay muted loop playsInline preload="auto"
//         style={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           objectFit: "cover"
//         }}
//       >
//         <source src={fitnessVideo} type="video/mp4" />
//         {/* <source src="https://www.w3schools.com/html/mov_bbb.mp4" type= "video/mp4" /> */}
//       </video>



//       <Box position="absolute" w="100%" h="100%" bg="rgba(0,0,0,0.35)" />

//       <Flex minH="100vh" align="center" justify="center" position="relative" zIndex={2} px={4}>
//         <Box
//           bg="rgba(255,255,255,0.06)"
//           backdropFilter="blur(8px)"
//           border="1px solid rgba(255,255,255,0.25)"
//           p={8}
//           borderRadius="2xl"
//           w="360px"
//           boxShadow="0 20px 60px rgba(0,0,0,0.6)"
//         >
//           <VStack spacing={5} color="white">

//             <Text fontSize="2xl" fontWeight="bold" textAlign="center"
//               display="flex" alignItems="center" justifyContent="center" gap="6px">
//               Let’s get started
//               <Icon as={FaHeart} color="#B9E2FD" boxSize="18px" />
//             </Text>

//             <Text fontSize="sm" color="gray.200" textAlign="center">
//               Your fitness partner for better living
//             </Text>

//             {/* ✅ MESSAGE */}
//             {message && (
//               <Box
//                 w="100%"
//                 textAlign="center"
//                 fontSize="sm"
//                 bg="rgba(255,255,255,0.15)"
//                 background="brand.400"
//                 border="1px solid rgba(255,255,255,0.25)"
//                 p={2}
//                 borderRadius="md"
//               >
//                 {message}
//               </Box>
//             )}

//             {/* LOGIN */}
//             {mode === "login" && (
//               <>
//                 <Input placeholder="Mobile"
//                  _placeholder={{ color: "gray.100" }}
//                   bg="rgba(255,255,255,0.25)"
//                   value={form.mobile}
//                   onChange={(e) => setForm({ ...form, mobile: e.target.value })}
//                 />

//                 <Input type="password" placeholder="Password"
//                  _placeholder={{ color: "gray.100" }}
//                   bg="rgba(255,255,255,0.25)"
//                   value={form.password}
//                   onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 />

//                 <Button w="100%" bg="brand.500" onClick={handleSubmit} isDisabled={loading}>
//                   {loading ? <Spinner size="sm" /> : "Login →"}
//                 </Button>

//                 <Text fontSize="sm" color="brand.200" cursor="pointer"
//                   // onClick={() => setMode("reset")}
//                   onClick={() => {
//                     setMessage("");
//                     setMode("reset");
                    
//                   }}
                  
//                   >
//                   Forgot Password?
//                 </Text>

//                 <Text fontSize="sm" color="gray.200" cursor="pointer"
//                   // onClick={() => { setMode("signup"); setStep(1); }}
//                   onClick={() => {
//                     setMessage("");
//                     setMode("signup");
//                     setStep(1);
//                   }}
                  
//                   >
//                   New here? Signup
//                 </Text>
//               </>
//             )}

//             {/* RESET */}
//             {mode === "reset" && (
//               <>
//                 <Input placeholder="Mobile"
//                  _placeholder={{ color: "gray.100" }}
//                   bg="rgba(255,255,255,0.25)"
//                   onChange={(e) => setForm({ ...form, mobile: e.target.value })}
//                 />

//                 <Input type="password" placeholder="New Password"
//                  _placeholder={{ color: "gray.100" }}
//                   bg="rgba(255,255,255,0.25)"
//                   onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
//                 />

//                 <Button w="100%" bg="brand.500" onClick={handleSubmit} isDisabled={loading}>
//                   {loading ? <Spinner size="sm" /> : "Reset →"}
//                 </Button>

//                 <Text fontSize="sm" cursor="pointer" 
//                 // onClick={() => setMode("login")}
//                 onClick={() => {
//                   setMessage("");
//                   setMode("login");
//                 }}
//                 >
//                   Back to Login
//                 </Text>
//               </>
//             )}

//             {/* SIGNUP (UNCHANGED UI) */}
//             // ONLY showing signup section fix — rest of your file stays SAME

// {/* 🆕 SIGNUP */}
// {mode === "signup" && (
//   <>
//     <Progress
//       value={(step / totalSteps) * 100}
//       w="100%"
//       borderRadius="full"
//       colorScheme="brand"
//     />

//     {/* ✅ STEP 1 */}
//     {step === 1 && (
//       <>
//         <Text>What should we call you?</Text>
//         <Input
//           placeholder="Your Name"
//           value={form.name}
//           bg="rgba(255,255,255,0.25)"
//           _placeholder={{ color: "gray.100" }}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//         />
//         <Select
//           bg="rgba(255,255,255,0.25)"
//           onChange={(e) =>
//             setForm({ ...form, nickname: e.target.value })
//           }
//         >

                
          
//           <option>Macha</option>
//           <option>Machi</option>
//           <option>Nanba</option>
//           <option>Dear</option>
//           <option>Buddy</option>
//           <option>Friend</option>
//           <option>Dhosth</option>
//           <option>Sir</option>
//           <option>Ma’am</option>
//         </Select>
//       </>
//     )}

//     {/* ✅ STEP 2 */}
//     {step === 2 && (
//       <>
//         <Text>How can we reach you?</Text>
//         <Input
//           placeholder="Mobile"
//           value={form.mobile}
//           bg="rgba(255,255,255,0.25)"
//           _placeholder={{ color: "gray.100" }}
//           onChange={(e) =>
//             setForm({ ...form, mobile: e.target.value })
//           }
//         />
//         <Input
//           placeholder="Email"
//           value={form.email}
//           bg="rgba(255,255,255,0.25)"
//           _placeholder={{ color: "gray.100" }}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />
//       </>
//     )}

//     {/* ✅ STEP 3 */}
//     {step === 3 && (
//       <>
//         <Text>Tell us about you</Text>
//         <Select
//           bg="rgba(255,255,255,0.25)"
//           value={form.age_range}
//           onChange={(e) =>
//             setForm({ ...form, age_range: e.target.value })
//           }
//         >
//           <option>18-25</option>
//           <option>26-35</option>
//           <option>26-35</option>
//           <option>36-45</option>
//           <option>45+</option>
//         </Select>
//         <Select
//           bg="rgba(255,255,255,0.25)"
//           value={form.gender}
//           onChange={(e) =>
//             setForm({ ...form, gender: e.target.value })
//           }
//         >
//           <option>Male</option>
//           <option>Female</option>
//         </Select>
//       </>
//     )}

//     {/* ✅ STEP 4 */}
//     {step === 4 && (
//       <>
//         <Text>Your goal?</Text>
//         <Select
//           bg="rgba(255,255,255,0.25)"
//           value={form.goal}
//           onChange={(e) =>
//             setForm({ ...form, goal: e.target.value })
//           }
//         >
//           <option value="LOSS">🔥 Lose Weight</option>
//           <option value="GAIN">💪 Gain Muscle</option>
//           <option value="MAINTAIN">⚖️ Maintain</option>
//           <option value="Fat_Loss">🔥 Fat Loss</option>
//           <option value="athletic">🏃 Athletic</option>
//           <option value="healthy_lifestyle">❤️ Healtht Lifestyle</option>
//         </Select>
//       </>
//     )}




//     {/* ✅ STEP 5 */}
//     {step === 5 && (
//       <>
//         <Text>Secure your account</Text>
//         <Input
//           type="password"
//           placeholder="Password"
//           _placeholder={{ color: "gray.100" }}
//           bg="rgba(255,255,255,0.25)"
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />
//       </>
//     )}

//     {/* CONTROLS */}
//     <Flex w="100%" align="center" justify="space-between" mt={2}>
//       {step > 1 ? (
//         <Box onClick={prevStep} cursor="pointer">←</Box>
//       ) : <Box w="40px" />}

//       <Text fontSize="xs" color="gray.300">
//         Step {step} / {totalSteps}
//       </Text>

//       <Button
//         px={6}
//         bg="brand.500"
//         onClick={nextStep}
//         isDisabled={loading}
//       >
//         {loading
//           ? <Spinner size="sm" />
//           : step === totalSteps
//           ? "🚀 Finish"
//           : "Next →"}
//       </Button>
      
//     </Flex>

//     <Flex align="center" w="100%" gap={2}>
//   <Box flex="1" h="1px" bg="whiteAlpha.300" />
//   {/* <Text
//     fontSize="xs"
//     cursor="pointer"
//     color="gray.300"
//     _hover={{ color: "white" }}
//     onClick={() => setMode("login")}
//   >
//     Back to Login
//   </Text> */}
//   <Text
//   fontSize="xs"
//   color="gray.300"
//   cursor="pointer"
//   _hover={{ color: "#B9E2FD" }}
//   transition="all 0.2s ease"
//   // onClick={() => setMode("login")}
//   onClick={() => {
//     setMessage("");
//     setMode("login");
//   }}
// >
//   Back to Login
// </Text>
//   <Box flex="1" h="1px" bg="whiteAlpha.300" />
// </Flex>

//   </>
// )}

//           </VStack>
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// export default AuthPage;


// Version 2 : Enhancement to version 1

import {
  Box,
  Input,
  Button,
  Icon,
  VStack,
  Text,
  Flex,

  Progress,
  Spinner,

  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  HStack
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import api from "../utils/api"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import fitnessVideo from "../assets/videos/fitness.mp4";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
// import { ArrowBackIcon } from "@chakra-ui/icons";



import onboardingAnimation from "../animations/onboarding.json";
import lottie from "lottie-web";





const AuthPage = () => {
 
  const { login } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [step, setStep] = useState(1);

  // ✅ NEW
  const [loading, setLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [message, setMessage] = useState("");

  const animationRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<any>({
    name: "",
    nickname: "Macha",
    mobile: "",
    email: "",
    age_range: "18-25",
    gender: "Male",
    goal: "LOSS",
    password: "",
    newPassword: ""
  });

  const totalSteps = 5;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage("");

      if (mode === "login") {
        const res = await api.post("/auth/login", {
          mobile: form.mobile,
          password: form.password
        });
        login(res.data);
        setMessage("")
        navigate("/home");
      }

      if (mode === "signup") {
        setSignupLoading(false);
        const res = await api.post("/auth/signup", form);
        login(res.data);
        setMessage("")
        navigate("/home");
      }

      if (mode === "reset") {
        await api.post("/auth/reset-password", {
          mobile: form.mobile,
          newPassword: form.newPassword
        });
        setMessage("Password updated 🔥");
        setMode("login");
        setLoading(false);
      }
    } catch (err: any) {
      setMessage(
        err?.response?.data?.error || "Something went wrong"
      );
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };


//   const onboardingMessages = [
//   "🎉 Excited to welcome you to NEKA",
//   "👋 Creating your account",
//   "🎯 Personalizing your fitness journey",
//   "💪 Preparing your nutrition experience",
//   "🧠 Setting up your AI companion",
//   "🚀 Almost ready..."
// ];

// const [loadingStep, setLoadingStep] = useState(0);

// useEffect(() => {
//   if (!signupLoading) return;

//   setLoadingStep(0);

//   const interval = setInterval(() => {
//     setLoadingStep((prev) =>
//       prev < onboardingMessages.length - 1
//         ? prev + 1
//         : prev
//     );
//   }, 1500);

//   return () => clearInterval(interval);

// }, [signupLoading]);

useEffect(() => {
  if (!signupLoading || !animationRef.current) return;

  const anim = lottie.loadAnimation({
    container: animationRef.current,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData:
      (onboardingAnimation as any)?.default ||
      onboardingAnimation,
  });

  return () => anim.destroy();

}, [signupLoading]);
  return (
    <>
    <Box minH="100vh" position="relative" overflow="hidden">
      {/* {signupLoading && (
  <Flex
    position="fixed"
    top={0}
    left={0}
    w="100vw"
    h="100vh"
    bg="rgba(0,0,0,0.88)"
    backdropFilter="blur(14px)"
    justify="center"
    align="center"
    zIndex={9999}
  >
    <VStack spacing={5}>
      
<Box
  w="220px"
  h="220px"
  ref={animationRef}
/>

      <Text
        color="white"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
      >
        {onboardingMessages[loadingStep]}
      </Text>

      <Text
        color="gray.300"
        textAlign="center"
        maxW="320px"
      >
        Building your personalized fitness experience...
      </Text>

      <Progress
        size="sm"
        value={
          ((loadingStep + 1) /
            onboardingMessages.length) *
          100
        }
        w="260px"
        borderRadius="full"
        colorScheme="blue"
      />

    </VStack>
  </Flex>
)} */}

      <video autoPlay muted loop playsInline preload="auto"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      >
        <source src={fitnessVideo} type="video/mp4" />
        {/* <source src="https://www.w3schools.com/html/mov_bbb.mp4" type= "video/mp4" /> */}
      </video>



      <Box position="absolute" w="100%" h="100%" bg="rgba(0,0,0,0.35)" />

      <Flex minH="100vh" align="center" justify="center" position="relative" zIndex={2} px={4}>
        <Box
          bg="rgba(255,255,255,0.06)"
          backdropFilter="blur(8px)"
          border="1px solid rgba(255,255,255,0.25)"
          p={8}
          borderRadius="2xl"
          w="360px"
          boxShadow="0 20px 60px rgba(0,0,0,0.6)"
        >
          <VStack spacing={5} color="white">

            <Text fontSize="2xl" fontWeight="bold" textAlign="center"
              display="flex" alignItems="center" justifyContent="center" gap="6px">
              Let’s get started
              <Icon as={FaHeart} color="#B9E2FD" boxSize="18px" />
            </Text>

            <Text fontSize="sm" color="gray.200" textAlign="center">
              Your fitness partner for better living
            </Text>

            {/* ✅ MESSAGE */}
            {message && (
              <Box
                w="100%"
                textAlign="center"
                fontSize="sm"
                bg="rgba(255,255,255,0.15)"
                background="brand.400"
                border="1px solid rgba(255,255,255,0.25)"
                p={2}
                borderRadius="md"
              >
                {message}
              </Box>
            )}

            {/* LOGIN */}
            {mode === "login" && (
              <>
                <Input placeholder="Mobile"
                 _placeholder={{ color: "gray.100" }}
                  bg="rgba(255,255,255,0.25)"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />

                <Input type="password" placeholder="Password"
                 _placeholder={{ color: "gray.100" }}
                  bg="rgba(255,255,255,0.25)"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <Button w="100%" bg="brand.500" onClick={handleSubmit} isDisabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Login →"}
                </Button>

                <Text fontSize="sm" color="brand.200" cursor="pointer"
                  // onClick={() => setMode("reset")}
                  onClick={() => {
                    setMessage("");
                    setMode("reset");
                    
                  }}
                  
                  >
                  Forgot Password?
                </Text>

                <Text fontSize="sm" color="gray.200" cursor="pointer"
                  // onClick={() => { setMode("signup"); setStep(1); }}
                  onClick={() => {
                    setMessage("");
                    setMode("signup");
                    setStep(1);
                  }}
                  
                  >
                  New here? Signup
                </Text>
              </>
            )}

            {/* RESET */}
            {mode === "reset" && (
              <>
                <Input placeholder="Mobile"
                 _placeholder={{ color: "gray.100" }}
                  bg="rgba(255,255,255,0.25)"
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />

                <Input type="password" placeholder="New Password"
                 _placeholder={{ color: "gray.100" }}
                  bg="rgba(255,255,255,0.25)"
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                />

                <Button w="100%" bg="brand.500" onClick={handleSubmit} isDisabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Reset →"}
                </Button>

                <Text fontSize="sm" cursor="pointer" 
                // onClick={() => setMode("login")}
                onClick={() => {
                  setMessage("");
                  setMode("login");
                }}
                >
                  Back to Login
                </Text>
              </>
            )}

            {/* SIGNUP (UNCHANGED UI) */}
            // ONLY showing signup section fix — rest of your file stays SAME

{/* 🆕 SIGNUP */}
{mode === "signup" && (
  <>
    <Progress
      value={(step / totalSteps) * 100}
      w="100%"
      borderRadius="full"
      colorScheme="brand"
    />

    {/* ✅ STEP 1 */}
    {step === 1 && (
      <>
        <Text>What should we call you?</Text>
        <Input
          placeholder="Your Name"
          value={form.name}
          bg="rgba(255,255,255,0.25)"
          _placeholder={{ color: "gray.100" }}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        {/* <Select
          bg="rgba(255,255,255,0.25)"
          onChange={(e) =>
            setForm({ ...form, nickname: e.target.value })
          }
        >

                
          
          <option>Macha</option>
          <option>Machi</option>
          <option>Nanba</option>
          <option>Dear</option>
          <option>Buddy</option>
          <option>Friend</option>
          <option>Dhosth</option>
          <option>Sir</option>
          <option>Ma’am</option>
        </Select>
      </>
    )} */}

<Menu>
  <MenuButton
    as={Button}
    w="100%"
    textAlign="left"
    rightIcon={<ChevronDownIcon />}
    borderRadius="xl"
    h="52px"
    bg="rgba(255,255,255,0.15)"
    backdropFilter="blur(20px)"
    border="1px solid rgba(255,255,255,0.2)"
    color="white"
    fontWeight="500"
    _hover={{
      bg: "rgba(255,255,255,0.20)",
    }}
    _active={{
      bg: "rgba(255,255,255,0.20)",
    }}
  >
    {form.nickname || "How should I call you?"}
  </MenuButton>

  <MenuList
    p={2}
    minW="260px"
    borderRadius="24px"
    // bg="rgba(15,23,42,0.80)"
    bg="#0F172A"
    backdropFilter="blur(30px)"
    border="1px solid rgba(255,255,255,0.15)"
    boxShadow="
      0 20px 50px rgba(0,0,0,0.35),
      inset 0 1px 0 rgba(255,255,255,0.1)
    "
  >
    {[
      { icon: "👋", label: "Macha" },
      { icon: "🤝", label: "Nanba" },
      { icon: "❤️", label: "Dear" },
      { icon: "🎯", label: "Buddy" },
      { icon: "👥", label: "Friend" },
      { icon: "👨🏼‍🎓", label: "Sir" },
      { icon: "👩‍🎓", label: "Ma'am" },
    ].map((item) => (
      <MenuItem
        key={item.label}
        borderRadius="16px"
        py={3}
        px={4}
        mb={1}
        bg={
          form.nickname === item.label
            ? "rgba(56,189,248,0.20)"
            : "transparent"
        }
        color="white"
        _hover={{
          bg: "rgba(255,255,255,0.08)",
        }}
        _focus={{
          bg: "rgba(255,255,255,0.08)",
        }}
        onClick={() =>
          setForm({
            ...form,
            nickname: item.label,
          })
        }
      >
        <HStack w="100%" justify="space-between">
          <HStack spacing={3}>
            <Text fontSize="lg">
              {item.icon}
            </Text>

            <Text fontWeight="500">
              {item.label}
            </Text>
          </HStack>

          {form.nickname === item.label && (
            <CheckIcon
              color="#38bdf8"
              boxSize={4}
            />
          )}
        </HStack>
      </MenuItem>
    ))}
  </MenuList>
</Menu>
   
 </>
 )}

    {/* ✅ STEP 2 */}
    {step === 2 && (
      <>
        <Text>How can we reach you?</Text>
        <Input
          placeholder="Mobile"
          value={form.mobile}
          bg="rgba(255,255,255,0.25)"
          _placeholder={{ color: "gray.100" }}
          onChange={(e) =>
            setForm({ ...form, mobile: e.target.value })
          }
        />
        <Input
          placeholder="Email"
          value={form.email}
          bg="rgba(255,255,255,0.25)"
          _placeholder={{ color: "gray.100" }}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
      </>
    )}

    {/* ✅ STEP 3 */}
    {step === 3 && (
      <>
        <Text>Tell us about you</Text>
<Menu placement="top-start" gutter={8}>
  <MenuButton
    as={Button}
    w="100%"
    textAlign="left"
    rightIcon={<ChevronDownIcon />}
    borderRadius="xl"
    h="52px"
    bg="rgba(255,255,255,0.15)"
    backdropFilter="blur(20px)"
    border="1px solid rgba(255,255,255,0.2)"
    color="white"
    fontWeight="500"
    _hover={{
      bg: "rgba(255,255,255,0.20)",
    }}
  >
    {form.age_range || "Select Age Range"}
  </MenuButton>

  <MenuList
    p={2}
    minW="260px"
    borderRadius="24px"
    bg="rgba(15,23,42,0.95)"
    border="1px solid rgba(255,255,255,0.1)"
    boxShadow="0 20px 50px rgba(0,0,0,0.35)"
  >
    {[
      "18-25",
      "26-35",
      "36-45",
      "46-55",
      "55+",
    ].map((age) => (
      <MenuItem
        key={age}
        borderRadius="16px"
        py={3}
        px={4}
        mb={1}
        color="white"
        bg={
          form.age_range === age
            ? "rgba(56,189,248,0.20)"
            : "transparent"
        }
        _hover={{
          bg: "rgba(255,255,255,0.08)",
        }}
        _focus={{
          bg: "rgba(255,255,255,0.08)",
        }}
        onClick={() =>
          setForm({
            ...form,
            age_range: age,
          })
        }
      >
        <HStack
          w="100%"
          justify="space-between"
        >
          <Text>{age}</Text>

          {form.age_range === age && (
            <CheckIcon
              color="#38bdf8"
              boxSize={4}
            />
          )}
        </HStack>
      </MenuItem>
    ))}
  </MenuList>
</Menu>
<Menu placement="top-start" gutter={8}>
  <MenuButton
    as={Button}
    w="100%"
    textAlign="left"
    rightIcon={<ChevronDownIcon />}
    borderRadius="xl"
    h="52px"
    bg="rgba(255,255,255,0.15)"
    backdropFilter="blur(20px)"
    border="1px solid rgba(255,255,255,0.2)"
    color="white"
    fontWeight="500"
    _hover={{
      bg: "rgba(255,255,255,0.20)",
    }}
    _active={{
      bg: "rgba(255,255,255,0.20)",
    }}
  >
    {form.gender
      ? form.gender === "Male"
        ? "👨 Male"
        : "👩 Female"
      : "Select Gender"}
  </MenuButton>

  <MenuList
    p={2}
    minW="260px"
    borderRadius="24px"
    bg="rgba(15,23,42,0.95)"
    border="1px solid rgba(255,255,255,0.1)"
    boxShadow="0 20px 50px rgba(0,0,0,0.35)"
  >
    {[
      {
        icon: "👨",
        label: "Male",
      },
      {
        icon: "👩",
        label: "Female",
      },
    ].map((item) => (
      <MenuItem
        key={item.label}
        borderRadius="16px"
        py={3}
        px={4}
        mb={1}
        color="white"
        bg={
          form.gender === item.label
            ? "rgba(56,189,248,0.20)"
            : "transparent"
        }
        _hover={{
          bg: "rgba(255,255,255,0.08)",
        }}
        _focus={{
          bg: "rgba(255,255,255,0.08)",
        }}
        onClick={() =>
          setForm({
            ...form,
            gender: item.label,
          })
        }
      >
        <HStack
          w="100%"
          justify="space-between"
        >
          <HStack spacing={3}>
            <Text fontSize="lg">
              {item.icon}
            </Text>

            <Text>
              {item.label}
            </Text>
          </HStack>

          {form.gender === item.label && (
            <CheckIcon
              color="#38bdf8"
              boxSize={4}
            />
          )}
        </HStack>
      </MenuItem>
    ))}
  </MenuList>
</Menu>
      </>
    )}

    {/* ✅ STEP 4 */}
    {step === 4 && (
      <>
        <Text>Your goal?</Text>
<Menu placement="top-start" gutter={8}>
  <MenuButton
    as={Button}
    w="100%"
    textAlign="left"
    rightIcon={<ChevronDownIcon />}
    borderRadius="xl"
    h="52px"
    bg="rgba(255,255,255,0.15)"
    backdropFilter="blur(20px)"
    border="1px solid rgba(255,255,255,0.2)"
    color="white"
    fontWeight="500"
    _hover={{
      bg: "rgba(255,255,255,0.20)",
    }}
    _active={{
      bg: "rgba(255,255,255,0.20)",
    }}
  >
    {(() => {
      const selected = [
        { value: "LOSS", label: "🔥 Lose Weight" },
        { value: "GAIN", label: "💪 Gain Muscle" },
        { value: "MAINTAIN", label: "⚖️ Maintain" },
        { value: "Fat_Loss", label: "🔥 Fat Loss" },
        { value: "athletic", label: "🏃 Athletic" },
        {
          value: "healthy_lifestyle",
          label: "❤️ Healthy Lifestyle",
        },
      ].find((g) => g.value === form.goal);

      return selected?.label || "Select Goal";
    })()}
  </MenuButton>

  <MenuList
    p={2}
    minW="280px"
    borderRadius="24px"
    bg="rgba(15,23,42,0.95)"
    border="1px solid rgba(255,255,255,0.1)"
    boxShadow="0 20px 50px rgba(0,0,0,0.35)"
  >
    {[
      { value: "LOSS", label: "🔥 Lose Weight" },
      { value: "GAIN", label: "💪 Gain Muscle" },
      { value: "MAINTAIN", label: "⚖️ Maintain" },
      { value: "Fat_Loss", label: "🔥 Fat Loss" },
      { value: "athletic", label: "🏃 Athletic" },
      {
        value: "healthy_lifestyle",
        label: "❤️ Healthy Lifestyle",
      },
    ].map((goal) => (
      <MenuItem
        key={goal.value}
        borderRadius="16px"
        py={3}
        px={4}
        mb={1}
        color="white"
        bg={
          form.goal === goal.value
            ? "rgba(56,189,248,0.20)"
            : "transparent"
        }
        _hover={{
          bg: "rgba(255,255,255,0.08)",
        }}
        _focus={{
          bg: "rgba(255,255,255,0.08)",
        }}
        onClick={() =>
          setForm({
            ...form,
            goal: goal.value,
          })
        }
      >
        <HStack
          w="100%"
          justify="space-between"
        >
          <Text>
            {goal.label}
          </Text>

          {form.goal === goal.value && (
            <CheckIcon
              color="#38bdf8"
              boxSize={4}
            />
          )}
        </HStack>
      </MenuItem>
    ))}
  </MenuList>
</Menu>
      </>
    )}




    {/* ✅ STEP 5 */}
    {step === 5 && (
      <>
        <Text>Secure your account</Text>
        <Input
          type="password"
          placeholder="Password"
          _placeholder={{ color: "gray.100" }}
          bg="rgba(255,255,255,0.25)"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
      </>
    )}

    {/* CONTROLS */}
    <Flex w="100%" align="center" justify="space-between" mt={2}>
      {step > 1 ? (
        <Box onClick={prevStep} cursor="pointer">←</Box>
      ) : <Box w="40px" />}

      <Text fontSize="xs" color="gray.300">
        Step {step} / {totalSteps}
      </Text>

      <Button
        px={6}
        bg="brand.500"
        onClick={nextStep}
        isDisabled={loading}
      >
        {/* {loading
          ? <Spinner size="sm" />
          : step === totalSteps
          ? "🚀 Finish"
          : "Next →"} */}
          {loading ? (
  <HStack spacing={2}>
    <Spinner size="sm" />
    <Text fontSize="sm">
      Creating Account...
    </Text>
  </HStack>
) : step === totalSteps ? (
  "🚀 Finish"
) : (
  "Next →"
)}
      </Button>
      
    </Flex>

    <Flex align="center" w="100%" gap={2}>
  <Box flex="1" h="1px" bg="whiteAlpha.300" />
  {/* <Text
    fontSize="xs"
    cursor="pointer"
    color="gray.300"
    _hover={{ color: "white" }}
    onClick={() => setMode("login")}
  >
    Back to Login
  </Text> */}
  <Text
  fontSize="xs"
  color="gray.300"
  cursor="pointer"
  _hover={{ color: "#B9E2FD" }}
  transition="all 0.2s ease"
  // onClick={() => setMode("login")}
  onClick={() => {
    setMessage("");
    setMode("login");
  }}
>
  Back to Login
</Text>
  <Box flex="1" h="1px" bg="whiteAlpha.300" />
</Flex>

  </>
)}

          </VStack>
        </Box>
      </Flex>
    </Box>
    </>
  );
};

export default AuthPage;

