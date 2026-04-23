// Version 1 : Simple working version

// import {
//     Box,
//     Input,
//     Button,
//     VStack,
//     Text,
//     Select,
//     HStack
//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import api from "../api/axios";
//   import { useAuth } from "../context/AuthContext";
//   import { useNavigate } from "react-router-dom";
  
//   const AuthPage = () => {
//     const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
//     const { login } = useAuth();
//     const navigate = useNavigate();
  
//     const [form, setForm] = useState<any>({
//       name: "",
//       nickname: "Macha",
//       mobile: "",
//       email: "",
//       age_range: "18-25",
//       gender: "Male",
//       goal: "LOSS",
//       password: "",
//       newPassword: ""
//     });
  
//     const handleSubmit = async () => {
//       try {
//         if (mode === "login") {
//           const res = await api.post("/auth/login", {
//             mobile: form.mobile,
//             password: form.password
//           });
//           login(res.data);
//           navigate("/home");
//         }
  
//         if (mode === "signup") {
//           const res = await api.post("/auth/signup", form);
//           login(res.data);
//           navigate("/home");
//         }
  
//         if (mode === "reset") {
//           await api.post("/auth/reset-password", {
//             mobile: form.mobile,
//             newPassword: form.newPassword
//           });
//           alert("Password updated 🔥");
//           setMode("login");
//         }
//       } catch (err: any) {
//         alert(err?.response?.data?.error || "Something went wrong");
//       }
//     };
  
//     return (
//       <Box
//         minH="100vh"
//         bg="linear-gradient(135deg,#b9e2fd,#63bdf4,#eaf6ff)"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         {/* 🔥 GLASS CARD */}
//         <Box
//           bg="rgba(255,255,255,0.85)"
//           backdropFilter="blur(10px)"
//           p={8}
//           borderRadius="2xl"
//           w="360px"
//           boxShadow="xl"
//         >
//           <VStack spacing={5}>
  
//             {/* 🔥 TITLE */}
//             <Text fontSize="2xl" fontWeight="bold" color="brand.700">
//               {mode === "login" && "Welcome Back 👋"}
//               {mode === "signup" && "Start Your Journey 💙"}
//               {mode === "reset" && "Reset Password 🔑"}
//             </Text>
  
//             {/* 🔥 TOGGLE TABS */}
//             <HStack spacing={3}>
//               <Button
//                 size="sm"
//                 borderRadius="full"
//                 bg={mode === "login" ? "brand.500" : "gray.200"}
//                 color={mode === "login" ? "white" : "black"}
//                 onClick={() => setMode("login")}
//               >
//                 Login
//               </Button>
  
//               <Button
//                 size="sm"
//                 borderRadius="full"
//                 bg={mode === "signup" ? "brand.500" : "gray.200"}
//                 color={mode === "signup" ? "white" : "black"}
//                 onClick={() => setMode("signup")}
//               >
//                 Signup
//               </Button>
  
//               <Button
//                 size="sm"
//                 borderRadius="full"
//                 bg={mode === "reset" ? "brand.500" : "gray.200"}
//                 color={mode === "reset" ? "white" : "black"}
//                 onClick={() => setMode("reset")}
//               >
//                 Reset
//               </Button>
//             </HStack>
  
//             {/* 🔐 LOGIN */}
//             {mode === "login" && (
//               <>
//                 <Input placeholder="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
//                 <Input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
//               </>
//             )}
  
//             {/* 🆕 SIGNUP */}
//             {mode === "signup" && (
//               <>
//                 <Input placeholder="Your Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
  
//                 <Select onChange={(e) => setForm({ ...form, nickname: e.target.value })}>
//                   <option>Macha</option>
//                   <option>Nanba</option>
//                   <option>Dear</option>
//                   <option>Buddy</option>
//                   <option>Sir</option>
//                   <option>Ma’am</option>
//                 </Select>
  
//                 <Input placeholder="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
//                 <Input placeholder="Email (optional)" onChange={(e) => setForm({ ...form, email: e.target.value })} />
  
//                 <Select onChange={(e) => setForm({ ...form, age_range: e.target.value })}>
//                   <option>18-25</option>
//                   <option>26-35</option>
//                   <option>36-45</option>
//                   <option>45+</option>
//                 </Select>
  
//                 <Select onChange={(e) => setForm({ ...form, gender: e.target.value })}>
//                   <option>Male</option>
//                   <option>Female</option>
//                 </Select>
  
//                 <Select onChange={(e) => setForm({ ...form, goal: e.target.value })}>
//                   <option value="LOSS">Weight Loss</option>
//                   <option value="GAIN">Weight Gain</option>
//                   <option value="MAINTAIN">Maintain</option>
//                 </Select>
  
//                 <Input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
//               </>
//             )}
  
//             {/* 🔑 RESET */}
//             {mode === "reset" && (
//               <>
//                 <Input placeholder="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
//                 <Input type="password" placeholder="New Password" onChange={(e) => setForm({ ...form, newPassword: e.target.value })} />
//               </>
//             )}
  
//             {/* 🔥 ACTION */}
//             <Button
//               w="100%"
//               size="lg"
//               borderRadius="xl"
//               bg="brand.500"
//               color="white"
//               onClick={handleSubmit}
//             >
//               {mode === "login" && "Login"}
//               {mode === "signup" && "Create Account"}
//               {mode === "reset" && "Update Password"}
//             </Button>
  
//           </VStack>
//         </Box>
//       </Box>
//     );
//   };
  
//   export default AuthPage;






// Version 2 : Enhancement to version 1

// import {
//     Box,
//     Input,
//     Button,
//     VStack,
//     Text,
//     HStack,
//     Flex
//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import api from "../api/axios";
//   import { useAuth } from "../context/AuthContext";
//   import { useNavigate } from "react-router-dom";
  
//   const AuthPage = () => {
//     const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
//     const { login } = useAuth();
//     const navigate = useNavigate();
  
//     const [form, setForm] = useState<any>({
//       name: "",
//       mobile: "",
//       password: "",
//       newPassword: ""
//     });
  
//     const handleSubmit = async () => {
//       try {
//         if (mode === "login") {
//           const res = await api.post("/auth/login", {
//             mobile: form.mobile,
//             password: form.password
//           });
  
//           login(res.data);
//           navigate("/home");
//         }
  
//         if (mode === "signup") {
//           const res = await api.post("/auth/signup", {
//             name: form.name,
//             mobile: form.mobile,
//             password: form.password
//           });
  
//           login(res.data);
//           navigate("/home");
//         }
  
//         if (mode === "reset") {
//           await api.post("/auth/reset-password", {
//             mobile: form.mobile,
//             newPassword: form.newPassword
//           });
  
//           alert("Password updated 🔥");
//           setMode("login");
//         }
//       } catch (err: any) {
//         alert(err?.response?.data?.error || "Something went wrong");
//       }
//     };
  
//     return (
//       <Box minH="100vh" position="relative" overflow="hidden">
  
//         {/* 🎥 VIDEO BACKGROUND */}
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             objectFit: "cover"
//           }}
//         >
//           <source src="/videos/fitness.mp4" type="video/mp4" />
//         </video>
  
//         {/* 🌑 OVERLAY */}
//         <Box position="absolute" w="100%" h="100%" bg="rgba(0,0,0,0.35)" />
  
//         {/* 🔥 CONTENT */}
//         <Flex minH="100vh" align="center" justify="center" px={4} zIndex={2} position="relative">
  
//           <Box
//             bg="rgba(255,255,255,0.08)"
//             backdropFilter="blur(14px)"
//             border="1px solid rgba(255,255,255,0.2)"
//             p={8}
//             borderRadius="2xl"
//             w="360px"
//             boxShadow="0 20px 60px rgba(0,0,0,0.6)"
//           >
//             <VStack spacing={6} color="white">
  
//               {/* 🔥 HEADLINE */}
//               <Text fontSize="3xl" fontWeight="bold" textAlign="center">
//                 Transform Your Life 💪
//               </Text>
  
//               <Text fontSize="sm" color="gray.300" textAlign="center">
//                 Your AI-powered fitness partner 💙
//               </Text>
  
//               {/* 🔁 TOGGLE */}
//               <HStack>
//                 {["login", "signup", "reset"].map((m) => (
//                   <Button
//                     key={m}
//                     size="sm"
//                     borderRadius="full"
//                     bg={mode === m ? "brand.400" : "whiteAlpha.300"}
//                     color="white"
//                     onClick={() => setMode(m as any)}
//                   >
//                     {m}
//                   </Button>
//                 ))}
//               </HStack>
  
//               {/* 🔐 LOGIN */}
//               {mode === "login" && (
//                 <>
//                   <Input
//                     bg="whiteAlpha.300"
//                     placeholder="Mobile"
//                     value={form.mobile}
//                     onChange={(e) =>
//                       setForm({ ...form, mobile: e.target.value })
//                     }
//                   />
//                   <Input
//                     bg="whiteAlpha.300"
//                     type="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={(e) =>
//                       setForm({ ...form, password: e.target.value })
//                     }
//                   />
//                 </>
//               )}
  
//               {/* 🆕 SIGNUP */}
//               {mode === "signup" && (
//                 <>
//                   <Input
//                     bg="whiteAlpha.300"
//                     placeholder="Name"
//                     value={form.name}
//                     onChange={(e) =>
//                       setForm({ ...form, name: e.target.value })
//                     }
//                   />
//                   <Input
//                     bg="whiteAlpha.300"
//                     placeholder="Mobile"
//                     value={form.mobile}
//                     onChange={(e) =>
//                       setForm({ ...form, mobile: e.target.value })
//                     }
//                   />
//                   <Input
//                     bg="whiteAlpha.300"
//                     type="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={(e) =>
//                       setForm({ ...form, password: e.target.value })
//                     }
//                   />
//                 </>
//               )}
  
//               {/* 🔑 RESET */}
//               {mode === "reset" && (
//                 <>
//                   <Input
//                     bg="whiteAlpha.300"
//                     placeholder="Mobile"
//                     value={form.mobile}
//                     onChange={(e) =>
//                       setForm({ ...form, mobile: e.target.value })
//                     }
//                   />
//                   <Input
//                     bg="whiteAlpha.300"
//                     type="password"
//                     placeholder="New Password"
//                     value={form.newPassword}
//                     onChange={(e) =>
//                       setForm({ ...form, newPassword: e.target.value })
//                     }
//                   />
//                 </>
//               )}
  
//               {/* 🔥 CTA */}
//               <Button
//                 w="100%"
//                 size="lg"
//                 bg="brand.500"
//                 color="white"
//                 onClick={handleSubmit}   // ✅ FIXED
//                 _hover={{
//                   bg: "brand.600",
//                   transform: "scale(1.05)"
//                 }}
//               >
//                 Continue →
//               </Button>
  
//             </VStack>
//           </Box>
//         </Flex>
//       </Box>
//     );
//   };
  
//   export default AuthPage;








// Version 3 : from v2

// import {
//     Box,
//     Input,
//     Button,
//     VStack,
//     Text,
//     Flex,
//     Select,
//     Progress
//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import api from "../api/axios";
//   import { useAuth } from "../context/AuthContext";
//   import { useNavigate } from "react-router-dom";
  
//   const AuthPage = () => {
//     const { login } = useAuth();
//     const navigate = useNavigate();
  
//     const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
//     const [step, setStep] = useState(1);
  
//     const [form, setForm] = useState<any>({
//       name: "",
//       nickname: "Macha",
//       mobile: "",
//       email: "",
//       age_range: "18-25",
//       gender: "Male",
//       goal: "LOSS",
//       password: "",
//       newPassword: ""
//     });
  
//     const totalSteps = 5;
  
//     const handleSubmit = async () => {
//       try {
//         if (mode === "login") {
//           const res = await api.post("/auth/login", form);
//           login(res.data);
//           navigate("/home");
//         }
  
//         if (mode === "signup") {
//           const res = await api.post("/auth/signup", form);
//           login(res.data);
//           navigate("/home");
//         }
  
//         if (mode === "reset") {
//           await api.post("/auth/reset-password", {
//             mobile: form.mobile,
//             newPassword: form.newPassword
//           });
//           alert("Password updated");
//           setMode("login");
//         }
//       } catch (err: any) {
//         alert(err?.response?.data?.error || "Error");
//       }
//     };
  
//     const nextStep = () => {
//       if (step < totalSteps) setStep(step + 1);
//       else handleSubmit();
//     };
  
//     return (
//       <Box minH="100vh" position="relative">
  
//         {/* 🎥 VIDEO */}
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="none"
//           style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             objectFit: "cover"
//           }}
//         >
//           <source src="/videos/fitness.mp4" type="video/mp4" />
//         </video>
  
//         {/* 🌑 OVERLAY */}
//         <Box position="absolute" w="100%" h="100%" bg="rgba(0,0,0,0.35)" />
  
//         {/* CONTENT */}
//         <Flex minH="100vh" align="center" justify="center" zIndex={2} position="relative">
  
//           <Box
//             bg="rgba(255,255,255,0.08)"
//             backdropFilter="blur(10px)"
//             p={8}
//             borderRadius="2xl"
//             w="360px"
//           >
//             <VStack spacing={5} color="white">
  
//               <Text fontSize="2xl" fontWeight="bold">
//                 Let’s get started 💙
//               </Text>
  
//               {mode === "signup" && (
//                 <Progress
//                   value={(step / totalSteps) * 100}
//                   w="100%"
//                   borderRadius="full"
//                   colorScheme="blue"
//                 />
//               )}
  
//               {/* 🔐 LOGIN */}
//               {mode === "login" && (
//                 <>
//                   <Input placeholder="Mobile"
//                     bg="rgba(255,255,255,0.18)"
//                     value={form.mobile}
//                     onChange={(e)=>setForm({...form, mobile:e.target.value})}
//                   />
//                   <Input type="password" placeholder="Password"
//                     bg="rgba(255,255,255,0.18)"
//                     value={form.password}
//                     onChange={(e)=>setForm({...form, password:e.target.value})}
//                   />
//                   <Button w="100%" bg="brand.500" onClick={handleSubmit}>
//                     Login →
//                   </Button>
//                 </>
//               )}
  
//               {/* 🆕 SIGNUP STEP FLOW */}
//               {mode === "signup" && (
//                 <>
//                   {step === 1 && (
//                     <>
//                       <Text>What should we call you?</Text>
//                       <Input placeholder="Your Name"
//                         bg="rgba(255,255,255,0.18)"
//                         onChange={(e)=>setForm({...form, name:e.target.value})}
//                       />
//                       <Select bg="rgba(255,255,255,0.18)"
//                         onChange={(e)=>setForm({...form, nickname:e.target.value})}
//                       >
//                         <option>Macha</option>
//                         <option>Nanba</option>
//                         <option>Buddy</option>
//                       </Select>
//                     </>
//                   )}
  
//                   {step === 2 && (
//                     <>
//                       <Text>How can we reach you?</Text>
//                       <Input placeholder="Mobile"
//                         bg="rgba(255,255,255,0.18)"
//                         onChange={(e)=>setForm({...form, mobile:e.target.value})}
//                       />
//                       <Input placeholder="Email (optional)"
//                         bg="rgba(255,255,255,0.18)"
//                         onChange={(e)=>setForm({...form, email:e.target.value})}
//                       />
//                     </>
//                   )}
  
//                   {step === 3 && (
//                     <>
//                       <Text>Tell us about you</Text>
//                       <Select bg="rgba(255,255,255,0.18)"
//                         onChange={(e)=>setForm({...form, age_range:e.target.value})}
//                       >
//                         <option>18-25</option>
//                         <option>26-35</option>
//                       </Select>
//                       <Select bg="rgba(255,255,255,0.18)"
//                         onChange={(e)=>setForm({...form, gender:e.target.value})}
//                       >
//                         <option>Male</option>
//                         <option>Female</option>
//                       </Select>
//                     </>
//                   )}
  
//                   {step === 4 && (
//                     <>
//                       <Text>Your goal?</Text>
//                       <Select bg="rgba(255,255,255,0.18)"
//                         onChange={(e)=>setForm({...form, goal:e.target.value})}
//                       >
//                         <option value="LOSS">🔥 Lose Weight</option>
//                         <option value="GAIN">💪 Gain Muscle</option>
//                         <option value="MAINTAIN">⚖️ Stay Fit</option>
//                       </Select>
//                     </>
//                   )}
  
//                   {step === 5 && (
//                     <>
//                       <Text>Secure your account</Text>
//                       <Input type="password" placeholder="Password"
//                         bg="rgba(255,255,255,0.18)"
//                         onChange={(e)=>setForm({...form, password:e.target.value})}
//                       />
//                     </>
//                   )}
  
//                   <Button w="100%" bg="brand.500" onClick={nextStep}>
//                     {step === totalSteps ? "Finish 🚀" : "Next →"}
//                   </Button>
//                 </>
//               )}
  
//               {/* 🔑 RESET */}
//               {mode === "reset" && (
//                 <>
//                   <Input placeholder="Mobile"
//                     bg="rgba(255,255,255,0.18)"
//                     onChange={(e)=>setForm({...form, mobile:e.target.value})}
//                   />
//                   <Input type="password" placeholder="New Password"
//                     bg="rgba(255,255,255,0.18)"
//                     onChange={(e)=>setForm({...form, newPassword:e.target.value})}
//                   />
//                   <Button w="100%" bg="brand.500" onClick={handleSubmit}>
//                     Reset →
//                   </Button>
//                 </>
//               )}
  
//               {/* 🔁 SWITCH */}
//               <Text fontSize="sm" color="gray.300">
//                 {mode === "login" && (
//                   <span onClick={()=>setMode("signup")} style={{cursor:"pointer"}}>
//                     New here? Signup
//                   </span>
//                 )}
//                 {mode === "signup" && (
//                   <span onClick={()=>setMode("login")} style={{cursor:"pointer"}}>
//                     Already have account? Login
//                   </span>
//                 )}
//               </Text>
  
//             </VStack>
//           </Box>
//         </Flex>
//       </Box>
//     );
//   };
  
//   export default AuthPage;


// Version 4 : from v3

import {
  Box,
  Input,
  Button,
  Icon,
  VStack,
  Text,
  Flex,
  Select,
  Progress,
  HStack
} from "@chakra-ui/react";
import { useState } from "react";
// import api from "../api/axios";
import api from "../utils/api"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "signup" | "reset">("login");
  const [step, setStep] = useState(1);

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
      if (mode === "login") {
        const res = await api.post("/auth/login", {
          mobile: form.mobile,
          password: form.password
        });
        login(res.data);
        navigate("/home");
      }

      if (mode === "signup") {
        const res = await api.post("/auth/signup", form);
        login(res.data);
        navigate("/home");
      }

      if (mode === "reset") {
        await api.post("/auth/reset-password", {
          mobile: form.mobile,
          newPassword: form.newPassword
        });
        alert("Password updated 🔥");
        setMode("login");
      }
    } catch (err: any) {
      alert(err?.response?.data?.error || "Something went wrong");
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Box minH="100vh" position="relative" overflow="hidden">

      {/* 🎥 VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      >
        <source src="/videos/fitness.mp4" type="video/mp4" />
      </video>

      {/* 🌑 OVERLAY */}
      <Box position="absolute" w="100%" h="100%" bg="rgba(0,0,0,0.35)" />

      {/* 🔥 CONTENT */}
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        position="relative"
        zIndex={2}
        px={4}
      >
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

            {/* <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Let’s get started 💙
            </Text> */}

          {/* <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Let’s get started{" "}
            <Icon as={FiHeart} color="#B9E2FD" fill="#B9E2FD" />
          </Text> */}

          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="6px"
          >
            Let’s get started
            <Icon as={FaHeart} color="#B9E2FD" boxSize="18px" />
          </Text>

            <Text fontSize="sm" color="gray.200" textAlign="center">
              Your fitness partner for better living
            </Text>

            {/* 🔐 LOGIN */}
            {mode === "login" && (
              <>
                <Input
                  placeholder="Mobile"
                  bg="rgba(255,255,255,0.25)"
                  color="white"
                  _placeholder={{ color: "gray.100" }}
                  value={form.mobile}
                  onChange={(e) =>
                    setForm({ ...form, mobile: e.target.value })
                  }
                />

                <Input
                  type="password"
                  placeholder="Password"
                  bg="rgba(255,255,255,0.25)"
                  color="white"
                  _placeholder={{ color: "gray.100" }}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <Button w="100%" bg="brand.500" onClick={handleSubmit}>
                  Login →
                </Button>

                <Text
                  fontSize="sm"
                  color="blue.200"
                  cursor="pointer"
                  onClick={() => setMode("reset")}
                >
                  Forgot Password?
                </Text>

                <Text
                  fontSize="sm"
                  color="gray.200"
                  cursor="pointer"
                  onClick={() => {
                    setMode("signup");
                    setStep(1);
                  }}
                >
                  New here? Signup
                </Text>
              </>
            )}

            {/* 🔑 RESET */}
            {mode === "reset" && (
              <>
                <Input
                  placeholder="Mobile"
                  bg="rgba(255,255,255,0.25)"
                  color="white"
                  _placeholder={{ color: "gray.100" }}
                  onChange={(e) =>
                    setForm({ ...form, mobile: e.target.value })
                  }
                />

                <Input
                  type="password"
                  placeholder="New Password"
                  bg="rgba(255,255,255,0.25)"
                  color="white"
                  _placeholder={{ color: "gray.100" }}
                  onChange={(e) =>
                    setForm({ ...form, newPassword: e.target.value })
                  }
                />

                <Button w="100%" bg="brand.500" onClick={handleSubmit}>
                  Reset →
                </Button>

                <Text
                  fontSize="sm"
                  color="gray.200"
                  cursor="pointer"
                  onClick={() => setMode("login")}
                >
                  Back to Login
                </Text>
              </>
            )}

            {/* 🆕 SIGNUP */}
            {mode === "signup" && (
              <>
                <Progress
                  value={(step / totalSteps) * 100}
                  w="100%"
                  borderRadius="full"
                  colorScheme="brand"
                />

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
                    <Select
                      bg="rgba(255,255,255,0.25)"
                      onChange={(e) =>
                        setForm({ ...form, nickname: e.target.value })
                      }
                    >
                      <option>Macha</option>
                      <option>Nanba</option>
                      <option>Buddy</option>
                    </Select>
                  </>
                )}

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
                      value= {form.email}
                      bg="rgba(255,255,255,0.25)"
                      _placeholder={{ color: "gray.100" }}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <Text>Tell us about you</Text>
                    <Select
                      bg="rgba(255,255,255,0.25)"
                      value={form.age_range}
                      onChange={(e) =>
                        setForm({ ...form, age_range: e.target.value })
                      }
                    >
                      <option>18-25</option>
                      <option>26-35</option>
                    </Select>
                    <Select
                      bg="rgba(255,255,255,0.25)"
                      value={form.gender}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value })
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </Select>
                  </>
                )}

                {step === 4 && (
                  <>
                    <Text>Your goal?</Text>
                    <Select
                      bg="rgba(255,255,255,0.25)"
                      value={form.goal}
                      onChange={(e) =>
                        setForm({ ...form, goal: e.target.value })
                      }
                    >
                      <option value="LOSS">🔥 Lose Weight</option>
                      <option value="GAIN">💪 Gain Muscle</option>
                      <option value="MAINTAIN">⚖️ Maintain</option>
                    </Select>
                  </>
                )}

                {step === 5 && (
                  <>
                    <Text>Secure your account</Text>
                    <Input
                      type="password"
                      placeholder="Password"
                      bg="rgba(255,255,255,0.25)"
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </>
                )}
{/* 
                <HStack w="100%">
                  {step > 1 && (
                    <Button w="30%" onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  <Button w="70%" bg="brand.500" onClick={nextStep}>
                    {step === totalSteps ? "Finish 🚀" : "Next →"}
                  </Button>
                </HStack> */}

<Flex w="100%" align="center" justify="space-between" mt={2}>

{/* 🔙 GLASS BACK BUTTON */}
{step > 1 ? (
  <Box
    onClick={prevStep}
    cursor="pointer"
    px={4}
    py={2}
    borderRadius="full"
    bg="rgba(255,255,255,0.15)"
    backdropFilter="blur(10px)"
    border="1px solid rgba(255,255,255,0.25)"
    color="white"
    fontSize="sm"
    _hover={{
      bg: "rgba(255,255,255,0.25)",
      transform: "scale(1.05)"
    }}
    transition="all 0.2s"
  >
    ←
  </Box>
) : (
  <Box w="40px" /> // spacing balance
)}

{/* 🧠 STEP INDICATOR */}
<Text fontSize="xs" color="gray.300">
  Step {step} / {totalSteps}
</Text>


{/* 👉 NEXT BUTTON */}
<Button
  px={6}
  bg="brand.500"
  color="white"
  borderRadius="full"
  onClick={nextStep}
  _hover={{
    bg: "brand.600",
    transform: "scale(1.05)"
  }}
  transition="all 0.2s"
>
  {step === totalSteps ? "🚀 Finish" : "Next →"}
</Button>

</Flex>


                <Text
                  fontSize="sm"
                  color="gray.200"
                  cursor="pointer"
                  onClick={() => setMode("login")}
                >
                  Already have account? Login
                </Text>
              </>
            )}

          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthPage;