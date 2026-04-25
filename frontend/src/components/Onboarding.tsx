// Version 1

// import {
//     Box,
//     VStack,
//     Text,
//     Button,
//     HStack,
//   } from "@chakra-ui/react";
//   import { useState } from "react";
//   import lottie from "lottie-web";
//   import { useEffect, useRef } from "react";
  
//   const slides = [
//     {
//       title: "🍳 Smart Meal Generator",
//       desc: "Create meals instantly based on your goal",
//       animation: "https://assets2.lottiefiles.com/packages/lf20_j1adxtyb.json",
//     },
//     {
//       title: "🥗 Choose Ingredients",
//       desc: "Pick what you have or let AI decide",
//       animation: "https://assets2.lottiefiles.com/packages/lf20_3rwasyjy.json",
//     },
//     {
//       title: "🎯 Personalized for You",
//       desc: "Weight loss, gain or balanced diet",
//       animation: "https://assets2.lottiefiles.com/packages/lf20_tutvdkg0.json",
//     },
//   ];
  
//   const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
//     const [step, setStep] = useState(0);
//     const animationRef = useRef<HTMLDivElement | null>(null);
  
//     // Load animation
//     useEffect(() => {
//       if (!animationRef.current) return;
  
//       const anim = lottie.loadAnimation({
//         container: animationRef.current,
//         renderer: "svg",
//         loop: true,
//         autoplay: true,
//         path: slides[step].animation,
//       });
  
//       return () => anim.destroy();
//     }, [step]);
  
//     const next = () => {
//       if (step < slides.length - 1) {
//         setStep(step + 1);
//       } else {
//         localStorage.setItem("seenOnboarding", "true");
//         onComplete();
//       }
//     };
  
//     const skip = () => {
//       localStorage.setItem("seenOnboarding", "true");
//       onComplete();
//     };
  
//     return (
//       <Box
//         position="fixed"
//         top="0"
//         left="0"
//         w="100vw"
//         h="100vh"
//         bg="linear-gradient(135deg,#eaf6ff,#b9e2fd)"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         zIndex="9999"
//       >
//         <VStack spacing={8} maxW="350px" textAlign="center">
  
//           {/* Animation */}
//           <Box ref={animationRef} w="220px" h="220px" />
  
//           {/* Text */}
//           <VStack spacing={2}>
//             <Text fontSize="xl" fontWeight="bold">
//               {slides[step].title}
//             </Text>
//             <Text fontSize="sm" color="gray.600">
//               {slides[step].desc}
//             </Text>
//           </VStack>
  
//           {/* Dots */}
//           <HStack spacing={2}>
//             {slides.map((_, i) => (
//               <Box
//                 key={i}
//                 w={step === i ? "12px" : "8px"}
//                 h={step === i ? "12px" : "8px"}
//                 borderRadius="full"
//                 bg={step === i ? "blue.400" : "gray.300"}
//                 transition="all 0.3s"
//               />
//             ))}
//           </HStack>
  
//           {/* Buttons */}
//           <HStack w="100%" justify="space-between">
//             <Button variant="ghost" onClick={skip}>
//               Skip
//             </Button>
  
//             <Button colorScheme="blue" onClick={next}>
//               {step === slides.length - 1 ? "Get Started" : "Next"}
//             </Button>
//           </HStack>
//         </VStack>
//       </Box>
//     );
//   };
  
//   export default Onboarding;



// Version 2 :

// import {
//   Box,
//   VStack,
//   Text,
//   Button,
//   HStack,
// } from "@chakra-ui/react";
// import { useState, useEffect, useRef } from "react";
// import lottie from "lottie-web";
// import { useSwipeable } from "react-swipeable";

// import foodChoice from "../animations/food-choice.json";
// import goal from "../animations/goal.json"
// import chefCooking from "../animations/chef-cooking.json"
// import chefCookingPizza from "../animations/chef-making-pizza.json"

// const slides = [
//   {
//     title: "😩 Bored of Diet Food?",
//     desc: "No more bland meals. Eat healthy AND tasty.",
//     animation: foodChoice,
//   },
//   {
//     title: "🍳 Smart Meal Generator",
//     desc: "Create delicious meals using ingredients you already have.",
//     animation: chefCooking,
//   },
//   {
//     title: "🎯 Achieve Your Goals",
//     desc: "Weight loss, muscle gain or balance — we’ve got you.",
//     animation: goal,
//   },
// ];

// const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
//   const [step, setStep] = useState(0);
//   const animationRef = useRef<HTMLDivElement | null>(null);

//   // 🔥 AUTO SLIDE
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setStep((prev) => (prev + 1) % slides.length);
//     }, 3500);

//     return () => clearInterval(timer);
//   }, []);

//   // 🔥 LOTTIE LOAD
//   useEffect(() => {
//     if (!animationRef.current) return;

//     const anim = lottie.loadAnimation({
//       container: animationRef.current,
//       renderer: "svg",
//       loop: true,
//       autoplay: true,
//       path: slides[step].animation,
//     });

//     return () => anim.destroy();
//   }, [step]);

//   // 🔥 SWIPE SUPPORT
//   const handlers = useSwipeable({
//     onSwipedLeft: () =>
//       setStep((prev) => Math.min(prev + 1, slides.length - 1)),
//     onSwipedRight: () =>
//       setStep((prev) => Math.max(prev - 1, 0)),
//     trackMouse: true,
//   });

//   const handleNext = () => {
//     if (step < slides.length - 1) {
//       setStep(step + 1);
//     } else {
//       localStorage.setItem("seenOnboarding", "true");
//       onComplete();
//     }
//   };

//   const handleSkip = () => {
//     localStorage.setItem("seenOnboarding", "true");
//     onComplete();
//   };

//   return (
//     <Box
//       {...handlers}
//       position="fixed"
//       top="0"
//       left="0"
//       w="100vw"
//       h="100vh"
//       bg="linear-gradient(135deg,#eaf6ff,#b9e2fd)"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       zIndex="9999"
//       px={6}
//     >
//       <VStack spacing={10} maxW="400px" textAlign="center">

//         {/* 🔥 ANIMATION */}
//         <Box
//           ref={animationRef}
//           w="240px"
//           h="240px"
//           transition="all 0.4s ease"
//         />

//         {/* 🔥 TEXT */}
//         <VStack spacing={3}>
//           <Text
//             fontSize="2xl"
//             fontWeight="bold"
//             color="gray.800"
//           >
//             {slides[step].title}
//           </Text>

//           <Text fontSize="sm" color="gray.600">
//             {slides[step].desc}
//           </Text>
//         </VStack>

//         {/* 🔥 DOTS */}
//         <HStack spacing={2}>
//           {slides.map((_, i) => (
//             <Box
//               key={i}
//               w={step === i ? "16px" : "8px"}
//               h="8px"
//               borderRadius="full"
//               bg={step === i ? "brand.300" : "gray.300"}
//               transition="all 0.3s"
//             />
//           ))}
//         </HStack>

//         {/* 🔥 BUTTONS */}
//         <HStack w="100%" justify="space-between">

//           <Button variant="ghost" onClick={handleSkip}>
//             Skip
//           </Button>

//           <Button
//             bg="brand.300"
//             color="white"
//             px={6}
//             onClick={handleNext}
//           >
//             {step === slides.length - 1 ? "Start Now 🚀" : "Next"}
//           </Button>

//         </HStack>
//       </VStack>
//     </Box>
//   );
// };

// export default Onboarding;






// import {
//   Box,
//   VStack,
//   Text,
// } from "@chakra-ui/react";
// import { useState, useEffect, useRef } from "react";
// import lottie from "lottie-web";

// import foodChoice from "../animations/food-choice.json";
// import goal from "../animations/goal.json";
// import chefCooking from "../animations/chef-making-pizza.json";

// const slides = [
//   {
//     title: "Tired of boring diet food?",
//     desc: "Healthy doesn’t have to be tasteless anymore.",
//     animation: foodChoice,
//   },
//   {
//     title: "Cook with what you have",
//     desc: "We turn your ingredients into delicious meals.",
//     animation: chefCooking,
//   },
//   {
//     title: "Stay consistent effortlessly",
//     desc: "Track your goals and eat smarter every day.",
//     animation: goal,
//   },
// ];

// const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
//   const [step, setStep] = useState(0);
//   const [opacity, setOpacity] = useState(1);
//   const animationRef = useRef<HTMLDivElement | null>(null);

//   // 🔥 LOTTIE LOAD
//   useEffect(() => {
//     if (!animationRef.current) return;

//     const anim = lottie.loadAnimation({
//       container: animationRef.current,
//       renderer: "svg",
//       loop: true,
//       autoplay: true,
//       animationData: slides[step].animation,
//     });

//     return () => anim.destroy();
//   }, [step]);

//   // 🔥 AUTO FLOW + FADE TRANSITION
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (step === slides.length - 1) {
//         setOpacity(0);

//         setTimeout(() => {
//           localStorage.setItem("seenOnboarding", "true");
//           onComplete();
//         }, 500);
//       } else {
//         setOpacity(0);
//         setTimeout(() => {
//           setStep((prev) => prev + 1);
//           setOpacity(1);
//         }, 300);
//       }
//     }, 3200);

//     return () => clearTimeout(timer);
//   }, [step]);

//   const progress = ((step + 1) / slides.length) * 100;

//   return (
//     <Box
//       position="fixed"
//       top="0"
//       left="0"
//       w="100vw"
//       h="100vh"

//       // 🔥 PREMIUM BACKGROUND
//       bg="linear-gradient(160deg, #dff3ff, #b9e2fd, #9fd7ff)"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       zIndex="9999"
//       overflow="hidden"
//     >
//       {/* 🔥 SOFT GLOW BLOBS */}
//       <Box
//         position="absolute"
//         w="300px"
//         h="300px"
//         bg="rgba(255,255,255,0.2)"
//         borderRadius="full"
//         filter="blur(120px)"
//         top="10%"
//         left="10%"
//       />

//       <Box
//         position="absolute"
//         w="250px"
//         h="250px"
//         bg="rgba(255,255,255,0.15)"
//         borderRadius="full"
//         filter="blur(100px)"
//         bottom="10%"
//         right="10%"
//       />

//       {/* 🔥 MAIN CONTENT */}
//       <VStack
//         spacing={10}
//         maxW="420px"
//         textAlign="center"
//         px={6}
//         zIndex={1}
//         transition="all 0.4s ease"
//         opacity={opacity}
//         transform={opacity ? "scale(1)" : "scale(0.96)"}
//       >
//         {/* 🔥 PROGRESS BAR */}
//         <Box w="100%" h="4px" bg="rgba(255,255,255,0.4)" borderRadius="full">
//           <Box
//             h="100%"
//             bg="white"
//             borderRadius="full"
//             width={`${progress}%`}
//             transition="width 0.4s ease"
//           />
//         </Box>

//         {/* 🔥 LOTTIE */}
//         <Box
//           ref={animationRef}
//           w="260px"
//           h="260px"
//           sx={{
//             filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.15))",
//             animation: "float 3s ease-in-out infinite",
//           }}
//         />

//         {/* 🔥 TEXT */}
//         <VStack spacing={3}>
//           <Text
//             fontSize="2xl"
//             fontWeight="bold"
//             color="gray.800"
//           >
//             {slides[step].title}
//           </Text>

//           <Text fontSize="sm" color="gray.600">
//             {slides[step].desc}
//           </Text>
//         </VStack>
//       </VStack>

//       {/* 🔥 FLOAT ANIMATION */}
//       <style>
//         {`
//           @keyframes float {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-12px); }
//             100% { transform: translateY(0px); }
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// export default Onboarding;


// Version 11

// import {
//   Box,
//   VStack,
//   Text,
// } from "@chakra-ui/react";
// import { useState, useEffect, useRef } from "react";
// import lottie from "lottie-web";

// import foodChoice from "../animations/food-choice.json";
// import goal from "../animations/goal.json";
// import chefCooking from "../animations/chef-cooking.json";

// const slides = [
//   {
//     title: "Tired of boring diet food?",
//     desc: "Healthy doesn’t have to be tasteless anymore.",
//     animation: foodChoice,
//   },
//   {
//     title: "Cook with what you have",
//     desc: "Turn your ingredients into delicious meals instantly.",
//     animation: chefCooking,
//   },
//   {
//     title: "Stay consistent effortlessly",
//     desc: "Track your goals and eat smarter every day.",
//     animation: goal,
//   },
// ];

// const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
//   const [step, setStep] = useState(0);
//   const [opacity, setOpacity] = useState(1);
//   const animationRef = useRef<HTMLDivElement | null>(null);

//   // 🔥 LOTTIE LOAD (FIXED)
//   useEffect(() => {
//     if (!animationRef.current) return;

//     const anim = lottie.loadAnimation({
//       container: animationRef.current,
//       renderer: "svg",
//       loop: true,
//       autoplay: true,
//       animationData: slides[step].animation,
//     });

//     return () => anim.destroy();
//   }, [step]);

//   // 🔥 AUTO FLOW + SMOOTH TRANSITION
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (step === slides.length - 1) {
//         setOpacity(0);

//         setTimeout(() => {
//           localStorage.setItem("seenOnboarding", "true");
//           onComplete();
//         }, 500);
//       } else {
//         setOpacity(0);
//         setTimeout(() => {
//           setStep((prev) => prev + 1);
//           setOpacity(1);
//         }, 300);
//       }
//     }, 3200);

//     return () => clearTimeout(timer);
//   }, [step]);

//   const progress = ((step + 1) / slides.length) * 100;

//   return (
//     <Box
//       position="fixed"
//       top="0"
//       left="0"
//       w="100vw"
//       h="100vh"

//       // 🔥 PREMIUM BACKGROUND (RICH)
//       bg="radial-gradient(circle at 20% 20%, #ffffff, #dff3ff, #b9e2fd)"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       zIndex="9999"
//       overflow="hidden"
//     >
//       {/* 🔥 GLOW BLOBS */}
//       <Box
//         position="absolute"
//         w="320px"
//         h="320px"
//         bg="rgba(255,255,255,0.4)"
//         borderRadius="full"
//         filter="blur(120px)"
//         top="10%"
//         left="10%"
//       />

//       <Box
//         position="absolute"
//         w="260px"
//         h="260px"
//         bg="rgba(255,255,255,0.25)"
//         borderRadius="full"
//         filter="blur(100px)"
//         bottom="10%"
//         right="10%"
//       />

//       {/* 🔥 MAIN CONTENT (GLASS CARD) */}
//       <Box
//         p={8}
//         borderRadius="2xl"
//         bg="rgba(255,255,255,0.55)"
//         backdropFilter="blur(25px)"
//         boxShadow="0 20px 50px rgba(0,0,0,0.15)"
//       >
//         <VStack
//           spacing={12}
//           maxW="400px"
//           textAlign="center"
//           transition="all 0.4s ease"
//           opacity={opacity}
//           transform={opacity ? "scale(1)" : "scale(0.96)"}
//         >
//           {/* 🔥 PROGRESS BAR */}
//           <Box w="100%" h="4px" bg="gray.200" borderRadius="full">
//             <Box
//               h="100%"
//               bg="brand.300"
//               borderRadius="full"
//               width={`${progress}%`}
//               transition="width 0.4s ease"
//             />
//           </Box>

//           {/* 🔥 ANIMATION */}
//           <Box
//             ref={animationRef}
//             w="260px"
//             h="260px"
//             sx={{
//               filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
//               transform: "scale(1.1)",
//               animation: "float 3s ease-in-out infinite",
//             }}
//           />

//           {/* 🔥 TEXT */}
//           <VStack spacing={4}>
//             <Text
//               fontSize="2xl"
//               fontWeight="extrabold"
//               color="gray.900"
//               lineHeight="1.2"
//             >
//               {slides[step].title}
//             </Text>

//             <Text
//               fontSize="sm"
//               color="gray.700"
//               maxW="280px"
//             >
//               {slides[step].desc}
//             </Text>

//             {/* 🔥 SMALL PREMIUM TOUCH */}
//             <Text fontSize="xs" color="gray.500">
//               ✨ Smart meal intelligence inside
//             </Text>
//           </VStack>
//         </VStack>
//       </Box>

//       {/* 🔥 FLOAT ANIMATION */}
//       <style>
//         {`
//           @keyframes float {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-12px); }
//             100% { transform: translateY(0px); }
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// export default Onboarding;



// Version 12

import {
  Box,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";

import foodChoice from "../animations/food-choice.json";
import goal from "../animations/goal.json";
import chefCooking from "../animations/chef-making-pizza.json";
const slides = [
  {
    title: "Bored of diet food?",
    desc: "Healthy can be tasty.",
    animation: foodChoice,
  },
  {
    title: "Cook with what you have",
    desc: "We create meals instantly.",
    animation: chefCooking,
  },
  {
    title: "Stay on track",
    desc: "Track your daily intakes.",
    animation: goal,
  },
];

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [typedDesc, setTypedDesc] = useState("");

  const animationRef = useRef<HTMLDivElement | null>(null);

  // 🔥 LOTTIE LOAD
  useEffect(() => {
    if (!animationRef.current) return;

    const anim = lottie.loadAnimation({
      container: animationRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: slides[step].animation,
    });

    return () => anim.destroy();
  }, [step]);

  // 🔥 TYPEWRITER EFFECT
  useEffect(() => {
    let titleIndex = 0;
    let descIndex = 0;

    setTypedText("");
    setTypedDesc("");

    const titleInterval = setInterval(() => {
      titleIndex++;
      setTypedText(slides[step].title.slice(0, titleIndex));

      if (titleIndex === slides[step].title.length) {
        clearInterval(titleInterval);

        const descInterval = setInterval(() => {
          descIndex++;
          setTypedDesc(slides[step].desc.slice(0, descIndex));

          if (descIndex === slides[step].desc.length) {
            clearInterval(descInterval);
          }
        }, 20);
      }
    }, 25);

    return () => clearInterval(titleInterval);
  }, [step]);

  // 🔥 AUTO FLOW + EXIT ZOOM
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === slides.length - 1) {
        setOpacity(0);

        setTimeout(() => {
          localStorage.setItem("seenOnboarding", "true");
          onComplete();
        }, 600);
      } else {
        setOpacity(0);
        setTimeout(() => {
          setStep((prev) => prev + 1);
          setOpacity(1);
        }, 300);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [step]);

  const progress = ((step + 1) / slides.length) * 100;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"

      // 🔥 RICH BACKGROUND
      bg="radial-gradient(circle at 20% 20%, #ffffff, #dff3ff, #b9e2fd)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="9999"
      overflow="hidden"
    >
      {/* 🔥 GLOW EFFECTS */}
      <Box
        position="absolute"
        w="320px"
        h="320px"
        bg="rgba(255,255,255,0.4)"
        borderRadius="full"
        filter="blur(120px)"
        top="10%"
        left="10%"
      />

      <Box
        position="absolute"
        w="260px"
        h="260px"
        bg="rgba(255,255,255,0.25)"
        borderRadius="full"
        filter="blur(100px)"
        bottom="10%"
        right="10%"
      />

      {/* 🔥 MAIN GLASS CARD */}
      <Box
        p={8}
        borderRadius="2xl"
        bg="rgba(255,255,255,0.6)"
        backdropFilter="blur(30px)"
        boxShadow="0 20px 60px rgba(0,0,0,0.18)"
        transition="all 0.5s ease"
        opacity={opacity}
        transform={opacity ? "scale(1)" : "scale(0.94)"}
      >
        <VStack spacing={12} maxW="400px" textAlign="center">

          {/* 🔥 PROGRESS */}
          <Box w="100%" h="4px" bg="gray.200" borderRadius="full">
            <Box
              h="100%"
              bg="brand.300"
              borderRadius="full"
              width={`${progress}%`}
              transition="width 0.4s ease"
            />
          </Box>

          {/* 🔥 LOTTIE */}
          <Box
            ref={animationRef}
            w="260px"
            h="260px"
            sx={{
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
              transform: "scale(1.1)",
              animation: "float 3s ease-in-out infinite",
            }}
          />

          {/* 🔥 TEXT (TYPEWRITER) */}
          <VStack spacing={4}>
            <Text
              fontSize="2xl"
              fontWeight="extrabold"
              color="gray.900"
            >
              {typedText}
              <Box as="span" className="cursor">|</Box>
            </Text>

            <Text fontSize="sm" color="gray.700">
              {typedDesc}
            </Text>

            <Text fontSize="xs" color="gray.500">
              ✨ Smart meal intelligence inside
            </Text>
          </VStack>

        </VStack>
      </Box>

      {/* 🔥 FLOAT + CURSOR */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }

          .cursor {
            animation: blink 1s infinite;
          }

          @keyframes blink {
            0%,100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};

export default Onboarding;