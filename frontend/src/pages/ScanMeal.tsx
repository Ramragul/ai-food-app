// Version 1

// import {
//   Box,
//   Button,
//   Center,
//   Heading,
//   HStack,
//   Icon,
//   Image,
//   Input,
//   Text,
//   VStack,
// } from "@chakra-ui/react";

// import {
//   FiArrowLeft,
//   FiCamera,
//   FiImage,
//   FiRefreshCw,
// } from "react-icons/fi";

// import {
//   useRef,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";


// const ScanMeal = () => {

//   const navigate = useNavigate();

//   const cameraInputRef =
//     useRef<HTMLInputElement>(null);

//   const galleryInputRef =
//     useRef<HTMLInputElement>(null);

//   const [image, setImage] =
//     useState<File | null>(null);

//   const [preview, setPreview] =
//     useState<string | null>(null);


//   const handleImageSelect =
//     (
//       event:
//         React.ChangeEvent<HTMLInputElement>
//     ) => {

//       const file =
//         event.target.files?.[0];

//       if (!file) {
//         return;
//       }

//       if (
//         !file.type.startsWith("image/")
//       ) {

//         return;

//       }

//       setImage(file);

//       const objectUrl =
//         URL.createObjectURL(file);

//       setPreview(objectUrl);

//     };


//   const clearImage = () => {

//     if (preview) {
//       URL.revokeObjectURL(preview);
//     }

//     setImage(null);

//     setPreview(null);

//   };


//   return (

//     <Box
//       minH="100vh"
//       bg="linear-gradient(
//         180deg,
//         #ffffff 0%,
//         #f4faff 100%
//       )"
//     >

//       <Box
//         maxW="480px"
//         mx="auto"
//         px={5}
//         pt={6}
//         pb={20}
//       >

//         {/* Back */}

//         <Button
//           variant="ghost"
//           leftIcon={
//             <Icon as={FiArrowLeft} />
//           }
//           px={0}
//           mb={8}
//           onClick={() =>
//             navigate("/home")
//           }
//         >
//           Dashboard
//         </Button>


//         {!preview ? (

//           <VStack
//             spacing={7}
//             align="stretch"
//           >

//             {/* Hero */}

//             <VStack
//               spacing={3}
//               textAlign="center"
//             >

//               <Center
//                 w="76px"
//                 h="76px"
//                 mx="auto"
//                 borderRadius="26px"
//                 bg="brand.50"
//                 color="brand.500"
//               >

//                 <Icon
//                   as={FiCamera}
//                   boxSize={9}
//                 />

//               </Center>


//               <Heading
//                 fontSize="3xl"
//                 letterSpacing="-1px"
//               >
//                 Scan your meal
//               </Heading>


//               <Text
//                 color="gray.500"
//                 fontSize="sm"
//                 lineHeight="1.7"
//                 maxW="350px"
//               >
//                 Take a photo of your meal
//                 and let NEKA identify the
//                 foods and estimate their
//                 portions.
//               </Text>

//             </VStack>


//             {/* Camera */}

//             <Button
//               h="64px"
//               borderRadius="22px"
//               colorScheme="blue"
//               leftIcon={
//                 <Icon
//                   as={FiCamera}
//                   boxSize={5}
//                 />
//               }
//               fontSize="md"
//               fontWeight="700"
//               onClick={() =>
//                 cameraInputRef.current?.click()
//               }
//             >
//               Take a photo
//             </Button>


//             {/* Gallery */}

//             <Button
//               h="64px"
//               borderRadius="22px"
//               variant="outline"
//               leftIcon={
//                 <Icon
//                   as={FiImage}
//                   boxSize={5}
//                 />
//               }
//               fontSize="md"
//               fontWeight="700"
//               onClick={() =>
//                 galleryInputRef.current?.click()
//               }
//             >
//               Choose from gallery
//             </Button>


//             {/* Explanation */}

//             <Box
//               bg="white"
//               borderRadius="24px"
//               p={5}
//               border="1px solid"
//               borderColor="gray.100"
//               boxShadow="0 12px 35px rgba(0,0,0,.05)"
//             >

//               <VStack
//                 align="stretch"
//                 spacing={3}
//               >

//                 <Text
//                   fontWeight="700"
//                 >
//                   ✨ What NEKA will do
//                 </Text>

//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Identify the foods on
//                   your plate
//                 </Text>

//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Estimate portion sizes
//                 </Text>

//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Calculate nutrition
//                 </Text>

//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Let you review everything
//                   before saving
//                 </Text>

//               </VStack>

//             </Box>


//             {/* Camera input */}

//             <Input
//               ref={cameraInputRef}
//               type="file"
//               accept="image/*"
//               capture="environment"
//               display="none"
//               onChange={
//                 handleImageSelect
//               }
//             />


//             {/* Gallery input */}

//             <Input
//               ref={galleryInputRef}
//               type="file"
//               accept="image/*"
//               display="none"
//               onChange={
//                 handleImageSelect
//               }
//             />

//           </VStack>

//         ) : (

//           /* --------------------------------
//              IMAGE PREVIEW
//           -------------------------------- */

//           <VStack
//             spacing={5}
//             align="stretch"
//           >

//             <Heading
//               fontSize="2xl"
//             >
//               Review your photo
//             </Heading>


//             <Box
//               borderRadius="28px"
//               overflow="hidden"
//               bg="gray.100"
//               boxShadow="
//                 0 18px 45px
//                 rgba(0,0,0,.10)
//               "
//             >

//               <Image
//                 src={preview}
//                 w="100%"
//                 maxH="520px"
//                 objectFit="cover"
//                 alt="Meal preview"
//               />

//             </Box>


//             <Box
//               bg="blue.50"
//               borderRadius="20px"
//               p={4}
//             >

//               <Text
//                 fontSize="sm"
//                 color="blue.700"
//                 fontWeight="600"
//               >
//                 💡 For better accuracy
//               </Text>

//               <Text
//                 fontSize="sm"
//                 color="blue.600"
//                 mt={1}
//               >
//                 Make sure the whole plate
//                 is visible and the food is
//                 reasonably well lit.
//               </Text>

//             </Box>


//             <HStack spacing={3}>

//               <Button
//                 flex={1}
//                 h="56px"
//                 borderRadius="18px"
//                 variant="outline"
//                 leftIcon={
//                   <Icon
//                     as={FiRefreshCw}
//                   />
//                 }
//                 onClick={clearImage}
//               >
//                 Retake
//               </Button>


//               <Button
//                 flex={2}
//                 h="56px"
//                 borderRadius="18px"
//                 colorScheme="blue"
//                 fontWeight="700"
//                 isDisabled={!image}
//               >
//                 Analyze Meal ✨
//               </Button>

//             </HStack>

//           </VStack>

//         )}

//       </Box>

//     </Box>

//   );
// };

// export default ScanMeal;


// Version 2

// import {
//   Box,
//   Button,
//   Center,
//   Heading,
//   HStack,
//   Icon,
//   Image,
//   Input,
//   Text,
//   VStack,
//   useToast,
// } from "@chakra-ui/react";

// import {
//   FiArrowLeft,
//   FiCamera,
//   FiImage,
//   FiRefreshCw,
// } from "react-icons/fi";

// import {
//   useRef,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import api from "../utils/api";

// import MealTypeSelector from "../components/meal/MealTypeSelector";
// import MealScanDrawer from "../components/meal/MealScanDrawer";

// import { useAuth } from "../context/AuthContext";


// interface ScanFoodItem {
//   foodId: number;
//   name: string;

//   grams: number;

//   calories: number;
//   protein: number;
//   carbs: number;
//   fats: number;
//   fiber: number;

//   confidence: number;

//   source?: string;

//   quantity?: number;

//   serving?: any;

//   preparationStyle?: string;
// }


// const ScanMeal = () => {

//   const navigate = useNavigate();

//   const toast = useToast();

//   const { user } = useAuth();

//   const userId = user.id;


//   const cameraInputRef =
//     useRef<HTMLInputElement>(null);

//   const galleryInputRef =
//     useRef<HTMLInputElement>(null);


//   /* ---------------------------------------
//      IMAGE
//   ---------------------------------------- */

//   const [image, setImage] =
//     useState<File | null>(null);

//   const [preview, setPreview] =
//     useState<string | null>(null);


//   /* ---------------------------------------
//      MEAL TYPE
//   ---------------------------------------- */

//   const [mealType, setMealType] =
//     useState("BREAKFAST");


//   /* ---------------------------------------
//      SCAN
//   ---------------------------------------- */

//   const [analyzing, setAnalyzing] =
//     useState(false);


//   /* ---------------------------------------
//      DRAWER
//   ---------------------------------------- */

//   const [drawerOpen, setDrawerOpen] =
//     useState(false);

//   const [scanItems, setScanItems] =
//     useState<ScanFoodItem[]>([]);

//   const [scanTotal, setScanTotal] =
//     useState({
//       calories: 0,
//       protein: 0,
//       carbs: 0,
//       fats: 0,
//       fiber: 0,
//     });


//   /* ---------------------------------------
//      IMAGE SELECT
//   ---------------------------------------- */

//   const handleImageSelect =
//     (
//       event:
//         React.ChangeEvent<HTMLInputElement>
//     ) => {

//       const file =
//         event.target.files?.[0];

//       if (!file) {
//         return;
//       }

//       if (
//         !file.type.startsWith("image/")
//       ) {

//         toast({
//           title:
//             "Please select an image",
//           status:
//             "warning",
//           duration:
//             2000,
//           isClosable:
//             true
//         });

//         return;
//       }


//       /* revoke old preview */

//       if (preview) {
//         URL.revokeObjectURL(preview);
//       }


//       setImage(file);

//       const objectUrl =
//         URL.createObjectURL(file);

//       setPreview(objectUrl);

//     };


//   /* ---------------------------------------
//      CLEAR IMAGE
//   ---------------------------------------- */

//   const clearImage = () => {

//     if (preview) {
//       URL.revokeObjectURL(preview);
//     }

//     setImage(null);

//     setPreview(null);

//     setScanItems([]);

//     setScanTotal({
//       calories: 0,
//       protein: 0,
//       carbs: 0,
//       fats: 0,
//       fiber: 0
//     });


//     /* Reset file inputs */

//     if (cameraInputRef.current) {
//       cameraInputRef.current.value = "";
//     }

//     if (galleryInputRef.current) {
//       galleryInputRef.current.value = "";
//     }

//   };


//   /* ---------------------------------------
//      NORMALIZE AI RESULT
//   ---------------------------------------- */

//   const normalizeScanItem =
//     (
//       item: any,
//       index: number
//     ): ScanFoodItem => {

//       const grams =
//         Number(
//           item.grams ??
//           item.estimatedGrams ??
//           item.estimatedPortionGrams ??
//           item.portionGrams ??
//           100
//         ) || 100;


//       return {

//         foodId:
//           Number(
//             item.foodId ??
//             item.id ??
//             0
//           ),

//         name:
//           item.name ??
//           item.food ??
//           item.detectedName ??
//           `Food ${index + 1}`,

//         grams,

//         calories:
//           Number(
//             item.calories ?? 0
//           ),

//         protein:
//           Number(
//             item.protein ?? 0
//           ),

//         carbs:
//           Number(
//             item.carbs ?? 0
//           ),

//         fats:
//           Number(
//             item.fats ??
//             item.fat ??
//             0
//           ),

//         fiber:
//           Number(
//             item.fiber ??
//             item.fibre ??
//             0
//           ),

//         confidence:
//           Number(
//             item.confidence ?? 0
//           ),

//         source:
//           item.source ??
//           "AI",

//         quantity:
//           Number(
//             item.quantity ?? 1
//           ),

//         serving:
//           item.serving ?? {
//             id: 0,
//             value: grams,
//             unit: "g",
//             label: `${grams} g`,
//             grams
//           },

//         preparationStyle:
//           item.preparationStyle ??
//           "REGULAR"

//       };

//     };


//   /* ---------------------------------------
//      ANALYZE MEAL
//   ---------------------------------------- */

//   const handleAnalyzeMeal =
//     async () => {

//       if (!image) {
//         return;
//       }


//       try {

//         setAnalyzing(true);


//         const formData =
//           new FormData();

//         formData.append(
//           "image",
//           image
//         );


//         /*
//         -----------------------------------
//         IMPORTANT

//         Backend receives:

//         multipart/form-data
//         image = meal photo
//         -----------------------------------
//         */

//         const response =
//           await api.post(
//             "/nutrition/scan-meal",
//             formData,
//             {
//               headers: {
//                 "Content-Type":
//                   "multipart/form-data"
//               }
//             }
//           );


//         const responseData =
//           response.data;


//         /*
//         -----------------------------------
//         Support both:

//         {
//           items: []
//           total: {}
//         }

//         and:

//         {
//           meal: {
//             items: [],
//             total: {}
//           }
//         }
//         -----------------------------------
//         */

//         const result =
//           responseData?.meal ??
//           responseData;


//         const rawItems =
//           result?.items ??
//           [];


//         if (
//           !Array.isArray(rawItems) ||
//           rawItems.length === 0
//         ) {

//           toast({
//             title:
//               "No food items detected",
//             description:
//               "Try taking a clearer photo with the whole plate visible.",
//             status:
//               "warning",
//             duration:
//               3500,
//             isClosable:
//               true
//           });

//           return;

//         }


//         const normalizedItems =
//           rawItems.map(
//             (
//               item: any,
//               index: number
//             ) =>
//               normalizeScanItem(
//                 item,
//                 index
//               )
//           );


//         setScanItems(
//           normalizedItems
//         );


//         /*
//         -----------------------------------
//         Calculate initial total from items

//         This protects us even if backend
//         total is missing.
//         -----------------------------------
//         */

//         const calculatedTotal =
//           normalizedItems.reduce(
//             (
//               acc,
//               item
//             ) => {

//               acc.calories +=
//                 Number(
//                   item.calories
//                 ) || 0;

//               acc.protein +=
//                 Number(
//                   item.protein
//                 ) || 0;

//               acc.carbs +=
//                 Number(
//                   item.carbs
//                 ) || 0;

//               acc.fats +=
//                 Number(
//                   item.fats
//                 ) || 0;

//               acc.fiber +=
//                 Number(
//                   item.fiber
//                 ) || 0;

//               return acc;

//             },
//             {
//               calories: 0,
//               protein: 0,
//               carbs: 0,
//               fats: 0,
//               fiber: 0
//             }
//           );


//         setScanTotal(
//           result?.total ?? calculatedTotal
//         );


//         setDrawerOpen(true);


//       } catch (error: any) {

//         console.error(
//           "Meal scan failed:",
//           error
//         );


//         toast({
//           title:
//             "Unable to analyze meal",
//           description:
//             error?.response?.data?.message ??
//             "Something went wrong while analyzing your meal.",
//           status:
//             "error",
//           duration:
//             3500,
//           isClosable:
//             true
//         });


//       } finally {

//         setAnalyzing(false);

//       }

//     };


//   /* ---------------------------------------
//      SAVE SCANNED MEAL
//   ---------------------------------------- */

//   const handleConfirmScan =
//     async (
//       items: any[]
//     ) => {

//       try {

//         /*
//         -----------------------------------
//         Recalculate total from edited items
//         -----------------------------------
//         */

//         const total =
//           items.reduce(
//             (
//               acc,
//               item
//             ) => {

//               acc.calories +=
//                 Number(
//                   item.calories
//                 ) || 0;

//               acc.protein +=
//                 Number(
//                   item.protein
//                 ) || 0;

//               acc.carbs +=
//                 Number(
//                   item.carbs
//                 ) || 0;

//               acc.fats +=
//                 Number(
//                   item.fats
//                 ) || 0;

//               acc.fiber +=
//                 Number(
//                   item.fiber
//                 ) || 0;

//               return acc;

//             },
//             {
//               calories: 0,
//               protein: 0,
//               carbs: 0,
//               fats: 0,
//               fiber: 0
//             }
//           );


//         /*
//         -----------------------------------
//         SAME API USED BY AddMeal.tsx
//         -----------------------------------
//         */

//         await api.post(
//           "/nutrition/confirm-meal",
//           {

//             userId,

//             mealType,

//             items,

//             total

//           }
//         );


//         toast({

//           title:
//             "Meal saved successfully",

//           description:
//             "Your scanned meal has been added to today's nutrition.",

//           status:
//             "success",

//           duration:
//             2500,

//           isClosable:
//             true

//         });


//         setDrawerOpen(false);

//         clearImage();


//         /*
//         -----------------------------------
//         Go back to dashboard
//         -----------------------------------
//         */

//         navigate("/home");


//       } catch (error) {

//         console.error(
//           "Failed to save scanned meal:",
//           error
//         );


//         toast({

//           title:
//             "Failed to save meal",

//           description:
//             "Please try again.",

//           status:
//             "error",

//           duration:
//             2500,

//           isClosable:
//             true

//         });

//       }

//     };


//   return (

//     <Box
//       minH="100vh"
//       bg="linear-gradient(
//         180deg,
//         #ffffff 0%,
//         #f4faff 100%
//       )"
//     >

//       <Box
//         maxW="480px"
//         mx="auto"
//         px={5}
//         pt={6}
//         pb={20}
//       >

//         {/* --------------------------------
//             BACK
//         --------------------------------- */}

//         <Button
//           variant="ghost"
//           leftIcon={
//             <Icon
//               as={FiArrowLeft}
//             />
//           }
//           px={0}
//           mb={8}
//           onClick={() =>
//             navigate("/home")
//           }
//         >
//           Dashboard
//         </Button>


//         {!preview ? (

//           <VStack
//             spacing={7}
//             align="stretch"
//           >

//             {/* --------------------------------
//                 HERO
//             --------------------------------- */}

//             <VStack
//               spacing={3}
//               textAlign="center"
//             >

//               <Center
//                 w="76px"
//                 h="76px"
//                 mx="auto"
//                 borderRadius="26px"
//                 bg="brand.50"
//                 color="brand.500"
//               >

//                 <Icon
//                   as={FiCamera}
//                   boxSize={9}
//                 />

//               </Center>


//               <Heading
//                 fontSize="3xl"
//                 letterSpacing="-1px"
//               >
//                 Scan your meal
//               </Heading>


//               <Text
//                 color="gray.500"
//                 fontSize="sm"
//                 lineHeight="1.7"
//                 maxW="350px"
//               >
//                 Take a photo of your meal
//                 and let NEKA identify the
//                 foods and estimate their
//                 portions.
//               </Text>

//             </VStack>


//             {/* --------------------------------
//                 MEAL TYPE
//             --------------------------------- */}

//             <Box>

//               <Text
//                 fontWeight="700"
//                 fontSize="md"
//                 mb={3}
//               >
//                 What meal is this?
//               </Text>

//               <MealTypeSelector
//                 mealType={mealType}
//                 setMealType={setMealType}
//               />

//             </Box>


//             {/* --------------------------------
//                 CAMERA
//             --------------------------------- */}

//             <Button
//               h="64px"
//               borderRadius="22px"
//               colorScheme="blue"
//               leftIcon={
//                 <Icon
//                   as={FiCamera}
//                   boxSize={5}
//                 />
//               }
//               fontSize="md"
//               fontWeight="700"
//               onClick={() =>
//                 cameraInputRef.current?.click()
//               }
//             >
//               Take a photo
//             </Button>


//             {/* --------------------------------
//                 GALLERY
//             --------------------------------- */}

//             <Button
//               h="64px"
//               borderRadius="22px"
//               variant="outline"
//               leftIcon={
//                 <Icon
//                   as={FiImage}
//                   boxSize={5}
//                 />
//               }
//               fontSize="md"
//               fontWeight="700"
//               onClick={() =>
//                 galleryInputRef.current?.click()
//               }
//             >
//               Choose from gallery
//             </Button>


//             {/* --------------------------------
//                 EXPLANATION
//             --------------------------------- */}

//             <Box
//               bg="white"
//               borderRadius="24px"
//               p={5}
//               border="1px solid"
//               borderColor="gray.100"
//               boxShadow="
//                 0 12px 35px
//                 rgba(0,0,0,.05)
//               "
//             >

//               <VStack
//                 align="stretch"
//                 spacing={3}
//               >

//                 <Text
//                   fontWeight="700"
//                 >
//                   ✨ What NEKA will do
//                 </Text>

//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Identify the foods on
//                   your plate
//                 </Text>

//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Estimate portion sizes
//                 </Text>

//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Calculate nutrition
//                 </Text>

//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Let you review everything
//                   before saving
//                 </Text>

//               </VStack>

//             </Box>


//             {/* --------------------------------
//                 CAMERA INPUT
//             --------------------------------- */}

//             <Input
//               ref={cameraInputRef}
//               type="file"
//               accept="image/*"
//               capture="environment"
//               display="none"
//               onChange={
//                 handleImageSelect
//               }
//             />


//             {/* --------------------------------
//                 GALLERY INPUT
//             --------------------------------- */}

//             <Input
//               ref={galleryInputRef}
//               type="file"
//               accept="image/*"
//               display="none"
//               onChange={
//                 handleImageSelect
//               }
//             />

//           </VStack>

//         ) : (

//           /* --------------------------------
//              IMAGE PREVIEW
//           -------------------------------- */

//           <VStack
//             spacing={5}
//             align="stretch"
//           >

//             <Heading
//               fontSize="2xl"
//             >
//               Review your photo
//             </Heading>


//             <Box
//               borderRadius="28px"
//               overflow="hidden"
//               bg="gray.100"
//               boxShadow="
//                 0 18px 45px
//                 rgba(0,0,0,.10)
//               "
//             >

//               <Image
//                 src={preview}
//                 w="100%"
//                 maxH="520px"
//                 objectFit="cover"
//                 alt="Meal preview"
//               />

//             </Box>


//             <Box
//               bg="blue.50"
//               borderRadius="20px"
//               p={4}
//             >

//               <Text
//                 fontSize="sm"
//                 color="blue.700"
//                 fontWeight="600"
//               >
//                 💡 For better accuracy
//               </Text>

//               <Text
//                 fontSize="sm"
//                 color="blue.600"
//                 mt={1}
//               >
//                 Make sure the whole plate
//                 is visible and the food is
//                 reasonably well lit.
//               </Text>

//             </Box>


//             <HStack spacing={3}>

//               <Button
//                 flex={1}
//                 h="56px"
//                 borderRadius="18px"
//                 variant="outline"
//                 leftIcon={
//                   <Icon
//                     as={FiRefreshCw}
//                   />
//                 }
//                 onClick={clearImage}
//                 isDisabled={analyzing}
//               >
//                 Retake
//               </Button>


//               <Button
//                 flex={2}
//                 h="56px"
//                 borderRadius="18px"
//                 colorScheme="blue"
//                 fontWeight="700"
//                 isDisabled={!image}
//                 isLoading={analyzing}
//                 loadingText="Analyzing..."
//                 onClick={
//                   handleAnalyzeMeal
//                 }
//               >
//                 Analyze Meal ✨
//               </Button>

//             </HStack>

//           </VStack>

//         )}

//       </Box>


//       {/* --------------------------------------
//           AI REVIEW DRAWER
//       --------------------------------------- */}

//       <MealScanDrawer

//         isOpen={
//           drawerOpen
//         }

//         onClose={() =>
//           setDrawerOpen(false)
//         }

//         imageUrl={
//           preview
//         }

//         items={
//           scanItems
//         }

//         total={
//           scanTotal
//         }

//         loading={false}

//         onConfirm={
//           handleConfirmScan
//         }

//       />

//     </Box>

//   );
// };


// export default ScanMeal;


// Version 3


// import {
//   Box,
//   Button,
//   Center,
//   Heading,
//   HStack,
//   Icon,
//   Image,
//   Input,
//   Text,
//   VStack,
//   useToast,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerHeader,
//   DrawerBody,
//   IconButton,
// } from "@chakra-ui/react";

// import {
//   CloseIcon,
// } from "@chakra-ui/icons";

// import {
//   FiArrowLeft,
//   FiCamera,
//   FiImage,
//   FiRefreshCw,
// } from "react-icons/fi";

// import {
//   useRef,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import api from "../utils/api";

// import MealTypeSelector
//   from "../components/meal/MealTypeSelector";

// import MealScanDrawer
//   from "../components/meal/MealScanDrawer";

// import FoodSearchInput
//   from "../components/meal/FoodSearchInput";

// import FoodServingDrawer
//   from "../components/meal/FoodServingDrawer";

// import { useAuth }
//   from "../context/AuthContext";


// interface ScanFoodItem {

//   foodId: number;

//   name: string;

//   grams: number;

//   calories: number;

//   protein: number;

//   carbs: number;

//   fats: number;

//   fiber: number;

//   confidence: number;

//   source?: string;

//   quantity?: number;

//   serving?: any;

//   preparationStyle?: string;
// }


// const ScanMeal = () => {

//   const navigate = useNavigate();

//   const toast = useToast();

//   const { user } = useAuth();

//   const userId = user.id;


//   const cameraInputRef =
//     useRef<HTMLInputElement>(null);

//   const galleryInputRef =
//     useRef<HTMLInputElement>(null);


//   /* ---------------------------------------
//      IMAGE
//   ---------------------------------------- */

//   const [image, setImage] =
//     useState<File | null>(null);

//   const [preview, setPreview] =
//     useState<string | null>(null);


//   /* ---------------------------------------
//      MEAL TYPE
//   ---------------------------------------- */

//   const [mealType, setMealType] =
//     useState("BREAKFAST");


//   /* ---------------------------------------
//      SCAN
//   ---------------------------------------- */

//   const [analyzing, setAnalyzing] =
//     useState(false);


//   /* ---------------------------------------
//      DRAWER
//   ---------------------------------------- */

//   const [drawerOpen, setDrawerOpen] =
//     useState(false);

//   const [scanItems, setScanItems] =
//     useState<ScanFoodItem[]>([]);

//   const [scanTotal, setScanTotal] =
//     useState({

//       calories: 0,

//       protein: 0,

//       carbs: 0,

//       fats: 0,

//       fiber: 0,

//     });


//   /* ---------------------------------------
//      ADD FOOD FLOW
//   ---------------------------------------- */

//   const [addFoodOpen, setAddFoodOpen] =
//     useState(false);

//   const [selectedFood, setSelectedFood] =
//     useState<any>(null);

//   const [foodServingOpen, setFoodServingOpen] =
//     useState(false);


//   /* ---------------------------------------
//      IMAGE SELECT
//   ---------------------------------------- */

//   const handleImageSelect =
//     (
//       event:
//         React.ChangeEvent<HTMLInputElement>
//     ) => {

//       const file =
//         event.target.files?.[0];

//       if (!file) {
//         return;
//       }


//       if (
//         !file.type.startsWith("image/")
//       ) {

//         toast({

//           title:
//             "Please select an image",

//           status:
//             "warning",

//           duration:
//             2000,

//           isClosable:
//             true,

//         });

//         return;
//       }


//       /* revoke old preview */

//       if (preview) {

//         URL.revokeObjectURL(
//           preview
//         );

//       }


//       setImage(file);


//       const objectUrl =
//         URL.createObjectURL(file);


//       setPreview(
//         objectUrl
//       );

//     };


//   /* ---------------------------------------
//      CLEAR IMAGE
//   ---------------------------------------- */

//   const clearImage = () => {

//     if (preview) {

//       URL.revokeObjectURL(
//         preview
//       );

//     }


//     setImage(null);

//     setPreview(null);

//     setScanItems([]);


//     setScanTotal({

//       calories: 0,

//       protein: 0,

//       carbs: 0,

//       fats: 0,

//       fiber: 0,

//     });


//     setAddFoodOpen(false);

//     setSelectedFood(null);

//     setFoodServingOpen(false);


//     /* Reset file inputs */

//     if (cameraInputRef.current) {

//       cameraInputRef.current.value =
//         "";

//     }


//     if (galleryInputRef.current) {

//       galleryInputRef.current.value =
//         "";

//     }

//   };


//   /* ---------------------------------------
//      NORMALIZE AI RESULT
//   ---------------------------------------- */

//   const normalizeScanItem =
//     (
//       item: any,
//       index: number
//     ): ScanFoodItem => {

//       const grams =
//         Number(
//           item.grams ??
//           item.estimatedGrams ??
//           item.estimatedPortionGrams ??
//           item.portionGrams ??
//           100
//         ) || 100;


//       return {

//         foodId:
//           Number(
//             item.foodId ??
//             item.id ??
//             0
//           ),

//         name:
//           item.name ??
//           item.food ??
//           item.detectedName ??
//           `Food ${index + 1}`,

//         grams,


//         calories:
//           Number(
//             item.calories ?? 0
//           ),


//         protein:
//           Number(
//             item.protein ?? 0
//           ),


//         carbs:
//           Number(
//             item.carbs ?? 0
//           ),


//         fats:
//           Number(
//             item.fats ??
//             item.fat ??
//             0
//           ),


//         fiber:
//           Number(
//             item.fiber ??
//             item.fibre ??
//             0
//           ),


//         confidence:
//           Number(
//             item.confidence ?? 0
//           ),


//         source:
//           item.source ??
//           "AI",


//         quantity:
//           Number(
//             item.quantity ?? 1
//           ),


//         serving:
//           item.serving ?? {

//             id: 0,

//             value: grams,

//             unit: "g",

//             label:
//               `${grams} g`,

//             grams,

//           },


//         preparationStyle:
//           item.preparationStyle ??
//           "REGULAR",

//       };

//     };


//   /* ---------------------------------------
//      ANALYZE MEAL
//   ---------------------------------------- */

//   const handleAnalyzeMeal =
//     async () => {

//       if (!image) {
//         return;
//       }


//       try {

//         setAnalyzing(true);


//         const formData =
//           new FormData();


//         formData.append(
//           "image",
//           image
//         );


//         const response =
//           await api.post(

//             "/nutrition/scan-meal",

//             formData,

//             {

//               headers: {

//                 "Content-Type":
//                   "multipart/form-data",

//               },

//             }

//           );


//         const responseData =
//           response.data;


//         const result =
//           responseData?.meal ??
//           responseData;


//         const rawItems =
//           result?.items ??
//           [];


//         if (
//           !Array.isArray(rawItems) ||
//           rawItems.length === 0
//         ) {

//           toast({

//             title:
//               "No food items detected",

//             description:
//               "Try taking a clearer photo with the whole plate visible.",

//             status:
//               "warning",

//             duration:
//               3500,

//             isClosable:
//               true,

//           });

//           return;

//         }


//         const normalizedItems =
//           rawItems.map(
//             (
//               item: any,
//               index: number
//             ) =>
//               normalizeScanItem(
//                 item,
//                 index
//               )
//           );


//         setScanItems(
//           normalizedItems
//         );


//         /*
//          * Calculate initial total.
//          */

//         const calculatedTotal =
//           normalizedItems.reduce(

//             (
//               acc,
//               item
//             ) => {

//               acc.calories +=
//                 Number(
//                   item.calories
//                 ) || 0;

//               acc.protein +=
//                 Number(
//                   item.protein
//                 ) || 0;

//               acc.carbs +=
//                 Number(
//                   item.carbs
//                 ) || 0;

//               acc.fats +=
//                 Number(
//                   item.fats
//                 ) || 0;

//               acc.fiber +=
//                 Number(
//                   item.fiber
//                 ) || 0;

//               return acc;

//             },

//             {

//               calories: 0,

//               protein: 0,

//               carbs: 0,

//               fats: 0,

//               fiber: 0,

//             }

//           );


//         setScanTotal(
//           result?.total ??
//           calculatedTotal
//         );


//         setDrawerOpen(
//           true
//         );


//       } catch (error: any) {

//         console.error(
//           "Meal scan failed:",
//           error
//         );


//         toast({

//           title:
//             "Unable to analyze meal",

//           description:
//             error?.response?.data?.message ??
//             "Something went wrong while analyzing your meal.",

//           status:
//             "error",

//           duration:
//             3500,

//           isClosable:
//             true,

//         });


//       } finally {

//         setAnalyzing(
//           false
//         );

//       }

//     };


//   /* ---------------------------------------
//      ADD FOOD
//   ---------------------------------------- */

//   const handleAddFood = () => {

//     setAddFoodOpen(true);

//   };


//   /* ---------------------------------------
//      FOOD SELECTED FROM SEARCH
//   ---------------------------------------- */

//   const handleFoodSelect =
//     async (
//       food: any
//     ) => {

//       try {

//         const response =
//           await api.get(

//             `/nutrition/food-details/${food.id}`

//           );


//         setSelectedFood(
//           response.data
//         );


//         setAddFoodOpen(
//           false
//         );


//         setFoodServingOpen(
//           true
//         );


//       } catch (error) {

//         console.error(
//           "Failed to load food details:",
//           error
//         );


//         toast({

//           title:
//             "Failed to load food details",

//           status:
//             "error",

//           duration:
//             2000,

//           isClosable:
//             true,

//         });

//       }

//     };


//   /* ---------------------------------------
//      SAVE FOOD FROM SERVING DRAWER
//   ---------------------------------------- */

//   const handleFoodSave =
//     (
//       foodSelection: any
//     ) => {

//       /*
//        * Prevent duplicate foods.
//        */

//       const exists =
//         scanItems.some(

//           item =>
//             item.foodId ===
//             foodSelection.foodId

//         );


//       if (exists) {

//         toast({

//           title:
//             "Food already added",

//           description:
//             "You can edit its portion instead.",

//           status:
//             "info",

//           duration:
//             1800,

//           isClosable:
//             true,

//         });

//         return;

//       }


//       const newItem: ScanFoodItem = {

//         foodId:
//           Number(
//             foodSelection.foodId
//           ),

//         name:
//           foodSelection.name,

//         grams:
//           Number(
//             foodSelection.grams
//           ) || 0,

//         calories:
//           Number(
//             foodSelection.calories
//           ) || 0,

//         protein:
//           Number(
//             foodSelection.protein
//           ) || 0,

//         carbs:
//           Number(
//             foodSelection.carbs
//           ) || 0,

//         fats:
//           Number(
//             foodSelection.fats
//           ) || 0,

//         fiber:
//           Number(
//             foodSelection.fiber
//           ) || 0,

//         /*
//          * Manually added foods are not
//          * AI detected, so confidence
//          * doesn't apply.
//          */

//         confidence: 1,

//         source:
//           "DATABASE",

//         quantity:
//           Number(
//             foodSelection.quantity
//           ) || 1,

//         serving:
//           foodSelection.serving ??
//           {

//             value:
//               foodSelection.grams,

//             unit:
//               foodSelection.unit ??
//               "g",

//             label:
//               `${foodSelection.grams} g`,

//             grams:
//               foodSelection.grams,

//           },

//       };


//       setScanItems(
//         prev => [
//           ...prev,
//           newItem,
//         ]
//       );


//       setFoodServingOpen(
//         false
//       );

//       setSelectedFood(
//         null
//       );


//       toast({

//         title:
//           `${newItem.name} added`,

//         description:
//           "Food added to your scanned meal.",

//         status:
//           "success",

//         duration:
//           1500,

//         isClosable:
//           true,

//       });

//     };


//   /* ---------------------------------------
//      GENERATE FOOD
//      ---------------------------------------- */

//   const handleGenerateFood =
//     async (
//       foodName: string
//     ) => {

//       try {

//         const response =
//           await api.post(

//             "/nutrition/generate-food",

//             {
//               foodName,
//             }

//           );


//         /*
//          * Reuse the exact same
//          * FoodServingDrawer flow.
//          */

//         const foodDetails =
//           await api.get(

//             `/nutrition/food-details/${response.data.foodReferenceId}`

//           );


//         setSelectedFood(
//           foodDetails.data
//         );


//         setAddFoodOpen(
//           false
//         );


//         setFoodServingOpen(
//           true
//         );


//       } catch (error) {

//         console.error(
//           "Failed to generate food:",
//           error
//         );


//         toast({

//           title:
//             "Unable to generate food",

//           description:
//             "NEKA couldn't create this food right now.",

//           status:
//             "error",

//           duration:
//             2500,

//           isClosable:
//             true,

//         });

//       }

//     };


//   /* ---------------------------------------
//      SAVE SCANNED MEAL
//   ---------------------------------------- */

//   const handleConfirmScan =
//     async (
//       items: any[]
//     ) => {

//       try {

//         const total =
//           items.reduce(

//             (
//               acc,
//               item
//             ) => {

//               acc.calories +=
//                 Number(
//                   item.calories
//                 ) || 0;

//               acc.protein +=
//                 Number(
//                   item.protein
//                 ) || 0;

//               acc.carbs +=
//                 Number(
//                   item.carbs
//                 ) || 0;

//               acc.fats +=
//                 Number(
//                   item.fats
//                 ) || 0;

//               acc.fiber +=
//                 Number(
//                   item.fiber
//                 ) || 0;

//               return acc;

//             },

//             {

//               calories: 0,

//               protein: 0,

//               carbs: 0,

//               fats: 0,

//               fiber: 0,

//             }

//           );


//         await api.post(

//           "/nutrition/confirm-meal",

//           {

//             userId,

//             mealType,

//             items,

//             total,

//           }

//         );


//         toast({

//           title:
//             "Meal saved successfully",

//           description:
//             "Your scanned meal has been added to today's nutrition.",

//           status:
//             "success",

//           duration:
//             2500,

//           isClosable:
//             true,

//         });


//         setDrawerOpen(
//           false
//         );


//         clearImage();


//         navigate(
//           "/home"
//         );


//       } catch (error) {

//         console.error(
//           "Failed to save scanned meal:",
//           error
//         );


//         toast({

//           title:
//             "Failed to save meal",

//           description:
//             "Please try again.",

//           status:
//             "error",

//           duration:
//             2500,

//           isClosable:
//             true,

//         });

//       }

//     };


//   return (

//     <Box
//       minH="100vh"
//       bg="linear-gradient(
//         180deg,
//         #ffffff 0%,
//         #f4faff 100%
//       )"
//     >

//       <Box
//         maxW="480px"
//         mx="auto"
//         px={5}
//         pt={6}
//         pb={20}
//       >

//         {/* BACK */}

//         <Button
//           variant="ghost"
//           leftIcon={
//             <Icon
//               as={FiArrowLeft}
//             />
//           }
//           px={0}
//           mb={8}
//           onClick={() =>
//             navigate("/home")
//           }
//         >
//           Dashboard
//         </Button>


//         {!preview ? (

//           <VStack
//             spacing={7}
//             align="stretch"
//           >

//             {/* HERO */}

//             <VStack
//               spacing={3}
//               textAlign="center"
//             >

//               <Center
//                 w="76px"
//                 h="76px"
//                 mx="auto"
//                 borderRadius="26px"
//                 bg="brand.50"
//                 color="brand.500"
//               >

//                 <Icon
//                   as={FiCamera}
//                   boxSize={9}
//                 />

//               </Center>


//               <Heading
//                 fontSize="3xl"
//                 letterSpacing="-1px"
//               >
//                 Scan your meal
//               </Heading>


//               <Text
//                 color="gray.500"
//                 fontSize="sm"
//                 lineHeight="1.7"
//                 maxW="350px"
//               >
//                 Take a photo of your meal
//                 and let NEKA identify the
//                 foods and estimate their
//                 portions.
//               </Text>

//             </VStack>


//             {/* MEAL TYPE */}

//             <Box>

//               <Text
//                 fontWeight="700"
//                 fontSize="md"
//                 mb={3}
//               >
//                 What meal is this?
//               </Text>


//               <MealTypeSelector
//                 mealType={
//                   mealType
//                 }
//                 setMealType={
//                   setMealType
//                 }
//               />

//             </Box>


//             {/* CAMERA */}

//             <Button
//               h="64px"
//               borderRadius="22px"
//               colorScheme="blue"
//               leftIcon={
//                 <Icon
//                   as={FiCamera}
//                   boxSize={5}
//                 />
//               }
//               fontSize="md"
//               fontWeight="700"
//               onClick={() =>
//                 cameraInputRef.current?.click()
//               }
//             >
//               Take a photo
//             </Button>


//             {/* GALLERY */}

//             <Button
//               h="64px"
//               borderRadius="22px"
//               variant="outline"
//               leftIcon={
//                 <Icon
//                   as={FiImage}
//                   boxSize={5}
//                 />
//               }
//               fontSize="md"
//               fontWeight="700"
//               onClick={() =>
//                 galleryInputRef.current?.click()
//               }
//             >
//               Choose from gallery
//             </Button>


//             {/* EXPLANATION */}

//             <Box
//               bg="white"
//               borderRadius="24px"
//               p={5}
//               border="1px solid"
//               borderColor="gray.100"
//               boxShadow="
//                 0 12px 35px
//                 rgba(0,0,0,.05)
//               "
//             >

//               <VStack
//                 align="stretch"
//                 spacing={3}
//               >

//                 <Text
//                   fontWeight="700"
//                 >
//                   ✨ What NEKA will do
//                 </Text>


//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Identify the foods on
//                   your plate
//                 </Text>


//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Estimate portion sizes
//                 </Text>


//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Calculate nutrition
//                 </Text>


//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Let you review everything
//                   before saving
//                 </Text>

//               </VStack>

//             </Box>


//             {/* CAMERA INPUT */}

//             <Input
//               ref={
//                 cameraInputRef
//               }
//               type="file"
//               accept="image/*"
//               capture="environment"
//               display="none"
//               onChange={
//                 handleImageSelect
//               }
//             />


//             {/* GALLERY INPUT */}

//             <Input
//               ref={
//                 galleryInputRef
//               }
//               type="file"
//               accept="image/*"
//               display="none"
//               onChange={
//                 handleImageSelect
//               }
//             />

//           </VStack>

//         ) : (

//           /* IMAGE PREVIEW */

//           <VStack
//             spacing={5}
//             align="stretch"
//           >

//             <Heading
//               fontSize="2xl"
//             >
//               Review your photo
//             </Heading>


//             <Box
//               borderRadius="28px"
//               overflow="hidden"
//               bg="gray.100"
//               boxShadow="
//                 0 18px 45px
//                 rgba(0,0,0,.10)
//               "
//             >

//               <Image
//                 src={preview}
//                 w="100%"
//                 maxH="520px"
//                 objectFit="cover"
//                 alt="Meal preview"
//               />

//             </Box>


//             <Box
//               bg="blue.50"
//               borderRadius="20px"
//               p={4}
//             >

//               <Text
//                 fontSize="sm"
//                 color="blue.700"
//                 fontWeight="600"
//               >
//                 💡 For better accuracy
//               </Text>


//               <Text
//                 fontSize="sm"
//                 color="blue.600"
//                 mt={1}
//               >
//                 Make sure the whole plate
//                 is visible and the food is
//                 reasonably well lit.
//               </Text>

//             </Box>


//             <HStack
//               spacing={3}
//             >

//               <Button
//                 flex={1}
//                 h="56px"
//                 borderRadius="18px"
//                 variant="outline"
//                 leftIcon={
//                   <Icon
//                     as={FiRefreshCw}
//                   />
//                 }
//                 onClick={
//                   clearImage
//                 }
//                 isDisabled={
//                   analyzing
//                 }
//               >
//                 Retake
//               </Button>


//               <Button
//                 flex={2}
//                 h="56px"
//                 borderRadius="18px"
//                 colorScheme="blue"
//                 fontWeight="700"
//                 isDisabled={
//                   !image
//                 }
//                 isLoading={
//                   analyzing
//                 }
//                 loadingText="Analyzing..."
//                 onClick={
//                   handleAnalyzeMeal
//                 }
//               >
//                 Analyze Meal ✨
//               </Button>

//             </HStack>

//           </VStack>

//         )}

//       </Box>


//       {/* --------------------------------------
//           AI REVIEW DRAWER
//       --------------------------------------- */}

//       <MealScanDrawer

//         isOpen={
//           drawerOpen
//         }

//         onClose={() =>
//           setDrawerOpen(
//             false
//           )
//         }

//         imageUrl={
//           preview
//         }

//         items={
//           scanItems
//         }

//         total={
//           scanTotal
//         }

//         loading={
//           false
//         }

//         onConfirm={
//           handleConfirmScan
//         }

//         onAddFood={
//           handleAddFood
//         }

//       />


//       {/* --------------------------------------
//           ADD FOOD DRAWER
//       --------------------------------------- */}

//       <Drawer
//         placement="bottom"
//         isOpen={
//           addFoodOpen
//         }
//         onClose={() =>
//           setAddFoodOpen(
//             false
//           )
//         }
//       >

//         <DrawerOverlay />

//         <DrawerContent
//           borderTopRadius="30px"
//           maxH="80vh"
//         >

//           <DrawerHeader>

//             <HStack
//               justify="space-between"
//             >

//               <Box>

//                 <Text
//                   fontSize="xs"
//                   color="gray.500"
//                   textTransform="uppercase"
//                   letterSpacing="1px"
//                 >
//                   Add to scanned meal
//                 </Text>

//                 <Text
//                   fontSize="2xl"
//                   fontWeight="800"
//                 >
//                   Add food
//                 </Text>

//               </Box>

//               <IconButton
//                 aria-label="Close"
//                 icon={
//                   <CloseIcon />
//                 }
//                 variant="ghost"
//                 onClick={() =>
//                   setAddFoodOpen(
//                     false
//                   )
//                 }
//               />

//             </HStack>

//           </DrawerHeader>


//           <DrawerBody>

//             <VStack
//               align="stretch"
//               spacing={4}
//             >

//               <Text
//                 fontSize="sm"
//                 color="gray.500"
//               >
//                 Search for a food from
//                 NEKA's nutrition database.
//               </Text>


//               <FoodSearchInput

//                 onSelectFood={
//                   handleFoodSelect
//                 }

//                 onGenerateFood={
//                   handleGenerateFood
//                 }

//               />

//             </VStack>

//           </DrawerBody>

//         </DrawerContent>

//       </Drawer>


//       {/* --------------------------------------
//           FOOD SERVING DRAWER
//       --------------------------------------- */}

//       <FoodServingDrawer

//         isOpen={
//           foodServingOpen
//         }

//         onClose={() => {

//           setFoodServingOpen(
//             false
//           );

//           setSelectedFood(
//             null
//           );

//         }}

//         food={
//           selectedFood
//         }

//         onSave={
//           handleFoodSave
//         }

//       />

//     </Box>

//   );

// };


// export default ScanMeal;



// Version 4 : bug fix of v3

// import {
//   Box,
//   Button,
//   Center,
//   Heading,
//   HStack,
//   Icon,
//   Image,
//   Input,
//   Text,
//   VStack,
//   useToast,
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerHeader,
//   DrawerBody,
//   IconButton,
//   Spinner,
// } from "@chakra-ui/react";

// import {
//   CloseIcon,
// } from "@chakra-ui/icons";

// import {
//   FiArrowLeft,
//   FiCamera,
//   FiImage,
//   FiRefreshCw,
//   FiClipboard,
// } from "react-icons/fi";

// import {
//   useRef,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import api from "../utils/api";

// import MealTypeSelector
//   from "../components/meal/MealTypeSelector";

// import MealScanDrawer
//   from "../components/meal/MealScanDrawer";

// import FoodSearchInput
//   from "../components/meal/FoodSearchInput";

// import FoodServingDrawer
//   from "../components/meal/FoodServingDrawer";

// import { useAuth }
//   from "../context/AuthContext";


// interface ScanFoodItem {

//   foodId: number | null;

//   name: string;

//   grams: number;

//   calories: number;

//   protein: number;

//   carbs: number;

//   fats: number;

//   fiber: number;

//   confidence: number;

//   source?: string;

//   quantity?: number;

//   serving?: any;

//   preparationStyle?: string;
// }


// const ScanMeal = () => {

//   const navigate = useNavigate();

//   const toast = useToast();

//   const { user } = useAuth();

//   const userId = user.id;


//   const cameraInputRef =
//     useRef<HTMLInputElement>(null);

//   const galleryInputRef =
//     useRef<HTMLInputElement>(null);


//   /* ---------------------------------------
//      IMAGE
//   ---------------------------------------- */

//   const [image, setImage] =
//     useState<File | null>(null);

//   const [preview, setPreview] =
//     useState<string | null>(null);


//   /* ---------------------------------------
//      MEAL TYPE
//   ---------------------------------------- */

//   const [mealType, setMealType] =
//     useState("BREAKFAST");


//   /* ---------------------------------------
//      SCAN
//   ---------------------------------------- */

//   const [analyzing, setAnalyzing] =
//     useState(false);


//   /* ---------------------------------------
//      SCAN RESULT
//   ---------------------------------------- */

//   const [drawerOpen, setDrawerOpen] =
//     useState(false);

//   const [scanItems, setScanItems] =
//     useState<ScanFoodItem[]>([]);

//   const [scanTotal, setScanTotal] =
//     useState({
//       calories: 0,
//       protein: 0,
//       carbs: 0,
//       fats: 0,
//       fiber: 0,
//     });


//   /* ---------------------------------------
//      ADD FOOD FLOW
//   ---------------------------------------- */

//   const [addFoodOpen, setAddFoodOpen] =
//     useState(false);

//   const [selectedFood, setSelectedFood] =
//     useState<any>(null);

//   const [foodServingOpen, setFoodServingOpen] =
//     useState(false);


//   /* ---------------------------------------
//      IMAGE SELECT
//   ---------------------------------------- */

//   const handleImageSelect =
//     (
//       event:
//         React.ChangeEvent<HTMLInputElement>
//     ) => {

//       const file =
//         event.target.files?.[0];

//       if (!file) {
//         return;
//       }

//       if (
//         !file.type.startsWith("image/")
//       ) {

//         toast({
//           title:
//             "Please select an image",
//           status:
//             "warning",
//           duration:
//             2000,
//           isClosable:
//             true,
//         });

//         return;
//       }


//       if (preview) {

//         URL.revokeObjectURL(
//           preview
//         );

//       }


//       setImage(file);

//       const objectUrl =
//         URL.createObjectURL(file);

//       setPreview(
//         objectUrl
//       );

//       /*
//        * New image means new scan.
//        */

//       setScanItems([]);

//       setScanTotal({
//         calories: 0,
//         protein: 0,
//         carbs: 0,
//         fats: 0,
//         fiber: 0,
//       });

//     };


//   /* ---------------------------------------
//      CLEAR IMAGE
//   ---------------------------------------- */

//   const clearImage = () => {

//     if (preview) {

//       URL.revokeObjectURL(
//         preview
//       );

//     }

//     setImage(null);

//     setPreview(null);

//     setScanItems([]);

//     setScanTotal({
//       calories: 0,
//       protein: 0,
//       carbs: 0,
//       fats: 0,
//       fiber: 0,
//     });

//     setDrawerOpen(false);

//     setAddFoodOpen(false);

//     setSelectedFood(null);

//     setFoodServingOpen(false);


//     if (cameraInputRef.current) {

//       cameraInputRef.current.value =
//         "";

//     }


//     if (galleryInputRef.current) {

//       galleryInputRef.current.value =
//         "";

//     }

//   };


//   /* ---------------------------------------
//      NORMALIZE AI RESULT
//   ---------------------------------------- */

//   const normalizeScanItem =
//     (
//       item: any,
//       index: number
//     ): ScanFoodItem => {

//       const grams =
//         Number(
//           item.grams ??
//           item.estimatedGrams ??
//           item.estimatedPortionGrams ??
//           item.portionGrams ??
//           100
//         ) || 100;


//       return {

//         /*
//          * IMPORTANT:
//          * AI detected foods may have
//          * foodId = null.
//          */
//         foodId:
//           item.foodId ??
//           item.id ??
//           null,

//         name:
//           item.name ??
//           item.food ??
//           item.detectedName ??
//           `Food ${index + 1}`,

//         grams,

//         calories:
//           Number(
//             item.calories ?? 0
//           ),

//         protein:
//           Number(
//             item.protein ?? 0
//           ),

//         carbs:
//           Number(
//             item.carbs ?? 0
//           ),

//         fats:
//           Number(
//             item.fats ??
//             item.fat ??
//             0
//           ),

//         fiber:
//           Number(
//             item.fiber ??
//             item.fibre ??
//             0
//           ),

//         confidence:
//           Number(
//             item.confidence ?? 0
//           ),

//         source:
//           item.source ??
//           "AI",

//         quantity:
//           Number(
//             item.quantity ?? 1
//           ),

//         serving:
//           item.serving ?? {

//             id: "SCAN",

//             value:
//               grams,

//             unit:
//               "g",

//             label:
//               `${grams} g`,

//             grams,

//           },

//         preparationStyle:
//           item.preparationStyle ??
//           "REGULAR",

//       };

//     };


//   /* ---------------------------------------
//      ANALYZE MEAL
//   ---------------------------------------- */

//   const handleAnalyzeMeal =
//     async () => {

//       if (!image) {
//         return;
//       }


//       try {

//         setAnalyzing(true);


//         const formData =
//           new FormData();

//         formData.append(
//           "image",
//           image
//         );


//         const response =
//           await api.post(
//             "/nutrition/scan-meal",
//             formData,
//             {
//               headers: {
//                 "Content-Type":
//                   "multipart/form-data",
//               },
//             }
//           );


//         const responseData =
//           response.data;


//         /*
//          * Backend currently returns:
//          *
//          * {
//          *   success: true,
//          *   mealDetected: true,
//          *   items: [],
//          *   total: {}
//          * }
//          *
//          * Keep support for a nested
//          * `meal` response as well.
//          */

//         const result =
//           responseData?.meal ??
//           responseData;


//         const rawItems =
//           result?.items ??
//           [];


//         if (
//           !Array.isArray(rawItems) ||
//           rawItems.length === 0
//         ) {

//           toast({

//             title:
//               "No food items detected",

//             description:
//               "Try taking a clearer photo with the whole plate visible.",

//             status:
//               "warning",

//             duration:
//               3500,

//             isClosable:
//               true,

//           });

//           return;

//         }


//         const normalizedItems =
//           rawItems.map(
//             (
//               item: any,
//               index: number
//             ) =>
//               normalizeScanItem(
//                 item,
//                 index
//               )
//           );


//         setScanItems(
//           normalizedItems
//         );


//         /*
//          * Calculate total ourselves.
//          *
//          * This makes the UI resilient even
//          * if backend total is missing.
//          */

//         const calculatedTotal =
//           normalizedItems.reduce(
//             (
//               acc,
//               item
//             ) => {

//               acc.calories +=
//                 Number(
//                   item.calories
//                 ) || 0;

//               acc.protein +=
//                 Number(
//                   item.protein
//                 ) || 0;

//               acc.carbs +=
//                 Number(
//                   item.carbs
//                 ) || 0;

//               acc.fats +=
//                 Number(
//                   item.fats
//                 ) || 0;

//               acc.fiber +=
//                 Number(
//                   item.fiber
//                 ) || 0;

//               return acc;

//             },
//             {
//               calories: 0,
//               protein: 0,
//               carbs: 0,
//               fats: 0,
//               fiber: 0,
//             }
//           );


//         /*
//          * Backend total is preferred when
//          * available.
//          */

//         setScanTotal(
//           result?.total ??
//           calculatedTotal
//         );


//         /*
//          * Open review drawer.
//          */

//         setDrawerOpen(
//           true
//         );


//       } catch (error: any) {

//         console.error(
//           "Meal scan failed:",
//           error
//         );


//         toast({

//           title:
//             "Unable to analyze meal",

//           description:
//             error?.response?.data?.message ??
//             "Something went wrong while analyzing your meal.",

//           status:
//             "error",

//           duration:
//             3500,

//           isClosable:
//             true,

//         });

//       } finally {

//         setAnalyzing(
//           false
//         );

//       }

//     };


//   /* ---------------------------------------
//      REOPEN SCAN REVIEW
//   ---------------------------------------- */

//   const handleReviewScan = () => {

//     if (!scanItems.length) {
//       return;
//     }

//     setDrawerOpen(true);

//   };


//   /* ---------------------------------------
//      ADD FOOD
//   ---------------------------------------- */

//   const handleAddFood = () => {

//     /*
//      * Close scan review first.
//      *
//      * We DON'T clear scanItems.
//      */

//     setDrawerOpen(false);

//     setAddFoodOpen(true);

//   };


//   /* ---------------------------------------
//      FOOD SELECTED FROM SEARCH
//   ---------------------------------------- */

//   const handleFoodSelect =
//     async (
//       food: any
//     ) => {

//       try {

//         const response =
//           await api.get(
//             `/nutrition/food-details/${food.id}`
//           );


//         setSelectedFood(
//           response.data
//         );


//         setAddFoodOpen(
//           false
//         );


//         setFoodServingOpen(
//           true
//         );


//       } catch (error) {

//         console.error(
//           "Failed to load food details:",
//           error
//         );


//         toast({

//           title:
//             "Failed to load food details",

//           status:
//             "error",

//           duration:
//             2000,

//           isClosable:
//             true,

//         });

//       }

//     };


//   /* ---------------------------------------
//      SAVE FOOD FROM SERVING DRAWER
//   ---------------------------------------- */

//   const handleFoodSave =
//     (
//       foodSelection: any
//     ) => {

//       /*
//        * Only reject duplicate real IDs.
//        *
//        * AI scanned foods can have null foodId.
//        */

//       const foodId =
//         Number(
//           foodSelection.foodId
//         );


//       const exists =
//         Number.isFinite(foodId) &&
//         scanItems.some(
//           item =>
//             Number(
//               item.foodId
//             ) === foodId
//         );


//       if (exists) {

//         toast({

//           title:
//             "Food already added",

//           description:
//             "You can edit its portion instead.",

//           status:
//             "info",

//           duration:
//             1800,

//           isClosable:
//             true,

//         });

//         return;

//       }


//       const newItem:
//         ScanFoodItem = {

//         foodId:
//           Number.isFinite(foodId)
//             ? foodId
//             : null,

//         name:
//           foodSelection.name,

//         grams:
//           Number(
//             foodSelection.grams
//           ) || 0,

//         calories:
//           Number(
//             foodSelection.calories
//           ) || 0,

//         protein:
//           Number(
//             foodSelection.protein
//           ) || 0,

//         carbs:
//           Number(
//             foodSelection.carbs
//           ) || 0,

//         fats:
//           Number(
//             foodSelection.fats
//           ) || 0,

//         fiber:
//           Number(
//             foodSelection.fiber
//           ) || 0,

//         confidence:
//           1,

//         source:
//           "DATABASE",

//         quantity:
//           Number(
//             foodSelection.quantity
//           ) || 1,

//         serving:
//           foodSelection.serving ??
//           {
//             value:
//               foodSelection.grams,

//             unit:
//               foodSelection.unit ??
//               "g",

//             label:
//               `${foodSelection.grams} g`,

//             grams:
//               foodSelection.grams,
//           },

//       };


//       /*
//        * IMPORTANT:
//        * Append to existing scan list.
//        */

//       setScanItems(
//         prev => [
//           ...prev,
//           newItem,
//         ]
//       );


//       setFoodServingOpen(
//         false
//       );

//       setSelectedFood(
//         null
//       );


//       /*
//        * Return directly to scan review.
//        */

//       setDrawerOpen(
//         true
//       );


//       toast({

//         title:
//           `${newItem.name} added`,

//         description:
//           "Food added to your scanned meal.",

//         status:
//           "success",

//         duration:
//           1500,

//         isClosable:
//           true,

//       });

//     };


//   /* ---------------------------------------
//      GENERATE FOOD
//   ---------------------------------------- */

//   const handleGenerateFood =
//     async (
//       foodName: string
//     ) => {

//       try {

//         const response =
//           await api.post(
//             "/nutrition/generate-food",
//             {
//               foodName,
//             }
//           );


//         /*
//          * Your backend generate-food
//          * returns foodReferenceId.
//          */

//         const foodReferenceId =
//           response.data?.foodReferenceId;


//         if (!foodReferenceId) {

//           throw new Error(
//             "Generated food reference ID missing"
//           );

//         }


//         /*
//          * Reuse the existing
//          * FoodServingDrawer flow.
//          */

//         const foodDetails =
//           await api.get(
//             `/nutrition/food-details/${foodReferenceId}`
//           );


//         setSelectedFood(
//           foodDetails.data
//         );


//         setAddFoodOpen(
//           false
//         );


//         setFoodServingOpen(
//           true
//         );


//       } catch (error) {

//         console.error(
//           "Failed to generate food:",
//           error
//         );


//         toast({

//           title:
//             "Unable to generate food",

//           description:
//             "NEKA couldn't create this food right now.",

//           status:
//             "error",

//           duration:
//             2500,

//           isClosable:
//             true,

//         });

//       }

//     };


//   /* ---------------------------------------
//      SAVE SCANNED MEAL
//   ---------------------------------------- */

//   const handleConfirmScan =
//     async (
//       items: any[]
//     ) => {

//       try {

//         const total =
//           items.reduce(
//             (
//               acc,
//               item
//             ) => {

//               acc.calories +=
//                 Number(
//                   item.calories
//                 ) || 0;

//               acc.protein +=
//                 Number(
//                   item.protein
//                 ) || 0;

//               acc.carbs +=
//                 Number(
//                   item.carbs
//                 ) || 0;

//               acc.fats +=
//                 Number(
//                   item.fats
//                 ) || 0;

//               acc.fiber +=
//                 Number(
//                   item.fiber
//                 ) || 0;

//               return acc;

//             },
//             {
//               calories: 0,
//               protein: 0,
//               carbs: 0,
//               fats: 0,
//               fiber: 0,
//             }
//           );


//         await api.post(
//           "/nutrition/confirm-meal",
//           {
//             userId,
//             mealType,
//             items,
//             total,
//           }
//         );


//         toast({

//           title:
//             "Meal saved successfully",

//           description:
//             "Your scanned meal has been added to today's nutrition.",

//           status:
//             "success",

//           duration:
//             2500,

//           isClosable:
//             true,

//         });


//         setDrawerOpen(
//           false
//         );


//         clearImage();


//         navigate(
//           "/home"
//         );


//       } catch (error) {

//         console.error(
//           "Failed to save scanned meal:",
//           error
//         );


//         toast({

//           title:
//             "Failed to save meal",

//           description:
//             "Please try again.",

//           status:
//             "error",

//           duration:
//             2500,

//           isClosable:
//             true,

//         });

//       }

//     };


//   return (

//     <Box
//       minH="100vh"
//       bg="
//         linear-gradient(
//           180deg,
//           #ffffff 0%,
//           #f4faff 100%
//         )
//       "
//     >

//       <Box
//         maxW="480px"
//         mx="auto"
//         px={5}
//         pt={6}
//         pb={20}
//       >

//         {/* BACK */}

//         <Button
//           variant="ghost"
//           leftIcon={
//             <Icon
//               as={FiArrowLeft}
//             />
//           }
//           px={0}
//           mb={8}
//           onClick={() =>
//             navigate("/home")
//           }
//         >
//           Dashboard
//         </Button>


//         {!preview ? (

//           <VStack
//             spacing={7}
//             align="stretch"
//           >

//             {/* HERO */}

//             <VStack
//               spacing={3}
//               textAlign="center"
//             >

//               <Center
//                 w="76px"
//                 h="76px"
//                 mx="auto"
//                 borderRadius="26px"
//                 bg="brand.50"
//                 color="brand.500"
//               >

//                 <Icon
//                   as={FiCamera}
//                   boxSize={9}
//                 />

//               </Center>


//               <Heading
//                 fontSize="3xl"
//                 letterSpacing="-1px"
//               >
//                 Scan your meal
//               </Heading>


//               <Text
//                 color="gray.500"
//                 fontSize="sm"
//                 lineHeight="1.7"
//                 maxW="350px"
//               >
//                 Take a photo of your meal
//                 and let NEKA identify the
//                 foods and estimate their
//                 portions.
//               </Text>

//             </VStack>


//             {/* MEAL TYPE */}

//             <Box>

//               <Text
//                 fontWeight="700"
//                 fontSize="md"
//                 mb={3}
//               >
//                 What meal is this?
//               </Text>


//               <MealTypeSelector
//                 mealType={
//                   mealType
//                 }
//                 setMealType={
//                   setMealType
//                 }
//               />

//             </Box>


//             {/* CAMERA */}

//             <Button
//               h="64px"
//               borderRadius="22px"
//               colorScheme="blue"
//               leftIcon={
//                 <Icon
//                   as={FiCamera}
//                   boxSize={5}
//                 />
//               }
//               fontSize="md"
//               fontWeight="700"
//               onClick={() =>
//                 cameraInputRef.current?.click()
//               }
//             >
//               Take a photo
//             </Button>


//             {/* GALLERY */}

//             <Button
//               h="64px"
//               borderRadius="22px"
//               variant="outline"
//               leftIcon={
//                 <Icon
//                   as={FiImage}
//                   boxSize={5}
//                 />
//               }
//               fontSize="md"
//               fontWeight="700"
//               onClick={() =>
//                 galleryInputRef.current?.click()
//               }
//             >
//               Choose from gallery
//             </Button>


//             {/* EXISTING SCAN REVIEW */}

//             {scanItems.length > 0 && (

//               <Button
//                 h="56px"
//                 borderRadius="20px"
//                 variant="outline"
//                 colorScheme="blue"
//                 leftIcon={
//                   <Icon
//                     as={FiClipboard}
//                   />
//                 }
//                 onClick={
//                   handleReviewScan
//                 }
//               >
//                 Review scanned meal
//               </Button>

//             )}


//             {/* EXPLANATION */}

//             <Box
//               bg="white"
//               borderRadius="24px"
//               p={5}
//               border="1px solid"
//               borderColor="gray.100"
//               boxShadow="
//                 0 12px 35px
//                 rgba(0,0,0,.05)
//               "
//             >

//               <VStack
//                 align="stretch"
//                 spacing={3}
//               >

//                 <Text
//                   fontWeight="700"
//                 >
//                   ✨ What NEKA will do
//                 </Text>


//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Identify the foods on
//                   your plate
//                 </Text>


//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Estimate portion sizes
//                 </Text>


//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Calculate nutrition
//                 </Text>


//                 <Text
//                   fontSize="sm"
//                   color="gray.500"
//                 >
//                   • Let you review everything
//                   before saving
//                 </Text>

//               </VStack>

//             </Box>


//             {/* CAMERA INPUT */}

//             <Input
//               ref={
//                 cameraInputRef
//               }
//               type="file"
//               accept="image/*"
//               capture="environment"
//               display="none"
//               onChange={
//                 handleImageSelect
//               }
//             />


//             {/* GALLERY INPUT */}

//             <Input
//               ref={
//                 galleryInputRef
//               }
//               type="file"
//               accept="image/*"
//               display="none"
//               onChange={
//                 handleImageSelect
//               }
//             />

//           </VStack>

//         ) : (

//           /* IMAGE PREVIEW */

//           <VStack
//             spacing={5}
//             align="stretch"
//           >

//             <Heading
//               fontSize="2xl"
//             >
//               Review your photo
//             </Heading>


//             <Box
//               borderRadius="28px"
//               overflow="hidden"
//               bg="gray.100"
//               boxShadow="
//                 0 18px 45px
//                 rgba(0,0,0,.10)
//               "
//             >

//               <Image
//                 src={preview}
//                 w="100%"
//                 maxH="520px"
//                 objectFit="cover"
//                 alt="Meal preview"
//               />

//             </Box>


//             <Box
//               bg="blue.50"
//               borderRadius="20px"
//               p={4}
//             >

//               <Text
//                 fontSize="sm"
//                 color="blue.700"
//                 fontWeight="600"
//               >
//                 💡 For better accuracy
//               </Text>


//               <Text
//                 fontSize="sm"
//                 color="blue.600"
//                 mt={1}
//               >
//                 Make sure the whole plate
//                 is visible and the food is
//                 reasonably well lit.
//               </Text>

//             </Box>


//             {/* REVIEW EXISTING SCAN */}

//             {scanItems.length > 0 && (

//               <Button
//                 h="56px"
//                 borderRadius="20px"
//                 variant="outline"
//                 colorScheme="blue"
//                 leftIcon={
//                   <Icon
//                     as={FiClipboard}
//                   />
//                 }
//                 onClick={
//                   handleReviewScan
//                 }
//               >
//                 Review scanned meal
//               </Button>

//             )}


//             <HStack
//               spacing={3}
//             >

//               <Button
//                 flex={1}
//                 h="56px"
//                 borderRadius="18px"
//                 variant="outline"
//                 leftIcon={
//                   <Icon
//                     as={FiRefreshCw}
//                   />
//                 }
//                 onClick={
//                   clearImage
//                 }
//                 isDisabled={
//                   analyzing
//                 }
//               >
//                 Retake
//               </Button>


//               <Button
//                 flex={2}
//                 h="56px"
//                 borderRadius="18px"
//                 colorScheme="blue"
//                 fontWeight="700"
//                 isDisabled={
//                   !image
//                 }
//                 isLoading={
//                   analyzing
//                 }
//                 loadingText="Analyzing..."
//                 onClick={
//                   handleAnalyzeMeal
//                 }
//               >
//                 Analyze Meal ✨
//               </Button>

//             </HStack>

//           </VStack>

//         )}

//       </Box>


//       {/* --------------------------------------
//           AI REVIEW DRAWER
//       --------------------------------------- */}

//       <MealScanDrawer

//         isOpen={
//           drawerOpen
//         }

//         onClose={() =>
//           setDrawerOpen(
//             false
//           )
//         }

//         imageUrl={
//           preview
//         }

//         items={
//           scanItems
//         }

//         total={
//           scanTotal
//         }

//         loading={
//           false
//         }

//         onConfirm={
//           handleConfirmScan
//         }

//         onAddFood={
//           handleAddFood
//         }

//       />


//       {/* --------------------------------------
//           ADD FOOD DRAWER
//       --------------------------------------- */}

//       <Drawer
//         placement="right"
//         isOpen={
//           addFoodOpen
//         }
//         onClose={() =>
//           setAddFoodOpen(
//             false
//           )
//         }
//       >

//         <DrawerOverlay />

//         <DrawerContent
//           borderLeftRadius={{
//             base: "24px",
//             md: "30px",
//           }}
//           maxW={{
//             base: "100%",
//             sm: "430px",
//           }}
//         >

//           <DrawerHeader>

//             <HStack
//               justify="space-between"
//             >

//               <Box>

//                 <Text
//                   fontSize="xs"
//                   color="gray.500"
//                   textTransform="uppercase"
//                   letterSpacing="1px"
//                 >
//                   Add to scanned meal
//                 </Text>

//                 <Text
//                   fontSize="2xl"
//                   fontWeight="800"
//                 >
//                   Add food
//                 </Text>

//               </Box>


//               <IconButton
//                 aria-label="Close"
//                 icon={
//                   <CloseIcon />
//                 }
//                 variant="ghost"
//                 onClick={() =>
//                   setAddFoodOpen(
//                     false
//                   )
//                 }
//               />

//             </HStack>

//           </DrawerHeader>


//           <DrawerBody>

//             <VStack
//               align="stretch"
//               spacing={4}
//             >

//               <Text
//                 fontSize="sm"
//                 color="gray.500"
//               >
//                 Search for a food from
//                 NEKA's nutrition database.
//                 If it isn't available,
//                 NEKA can generate it.
//               </Text>


//               <FoodSearchInput

//                 onSelectFood={
//                   handleFoodSelect
//                 }

//                 onGenerateFood={
//                   handleGenerateFood
//                 }

//               />

//             </VStack>

//           </DrawerBody>

//         </DrawerContent>

//       </Drawer>


//       {/* --------------------------------------
//           FOOD SERVING DRAWER
//       --------------------------------------- */}

//       <FoodServingDrawer

//         isOpen={
//           foodServingOpen
//         }

//         onClose={() => {

//           setFoodServingOpen(
//             false
//           );

//           setSelectedFood(
//             null
//           );

//         }}

//         food={
//           selectedFood
//         }

//         onSave={
//           handleFoodSave
//         }

//       />


//       {/* --------------------------------------
//           ANALYZING OVERLAY
//       --------------------------------------- */}

//       {analyzing && (

//         <Box
//           position="fixed"
//           inset={0}
//           zIndex={2000}
//           bg="blackAlpha.300"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >

//           <Box
//             bg="white"
//             borderRadius="24px"
//             px={8}
//             py={7}
//             textAlign="center"
//             boxShadow="2xl"
//           >

//             <Spinner
//               size="xl"
//               color="brand.500"
//             />

//             <Text
//               mt={4}
//               fontWeight="800"
//             >
//               NEKA is analyzing your meal...
//             </Text>

//             <Text
//               mt={1}
//               fontSize="sm"
//               color="gray.500"
//             >
//               Identifying foods and estimating portions
//             </Text>

//           </Box>

//         </Box>

//       )}

//     </Box>

//   );

// };


// export default ScanMeal;



import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  IconButton,
  Spinner,
} from "@chakra-ui/react";

import {
  CloseIcon,
} from "@chakra-ui/icons";

import {
  FiArrowLeft,
  FiCamera,
  FiImage,
  FiRefreshCw,
  FiClipboard,
} from "react-icons/fi";

import {
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../utils/api";

import MealTypeSelector
  from "../components/meal/MealTypeSelector";

import MealScanDrawer
  from "../components/meal/MealScanDrawer";

import FoodSearchInput
  from "../components/meal/FoodSearchInput";

import FoodServingDrawer
  from "../components/meal/FoodServingDrawer";

import AIFoodReviewDrawer
  from "../components/meal/AIFoodReviewDrawer";

import { useAuth }
  from "../context/AuthContext";


interface ScanFoodItem {

  foodId: number | null;

  name: string;

  grams: number;

  calories: number;

  protein: number;

  carbs: number;

  fats: number;

  fiber: number;

  confidence: number;

  source?: string;

  quantity?: number;

  serving?: any;

  preparationStyle?: string;
}


const ScanMeal = () => {

  const navigate = useNavigate();

  const toast = useToast();

  const { user } = useAuth();

  const userId = user.id;


  const cameraInputRef =
    useRef<HTMLInputElement>(null);

  const galleryInputRef =
    useRef<HTMLInputElement>(null);


  /* ---------------------------------------
     IMAGE
  ---------------------------------------- */

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);


  /* ---------------------------------------
     MEAL TYPE
  ---------------------------------------- */

  const [mealType, setMealType] =
    useState("BREAKFAST");


  /* ---------------------------------------
     SCAN
  ---------------------------------------- */

  const [analyzing, setAnalyzing] =
    useState(false);


  /* ---------------------------------------
     SCAN RESULT
  ---------------------------------------- */

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [scanItems, setScanItems] =
    useState<ScanFoodItem[]>([]);

  const [scanTotal, setScanTotal] =
    useState({
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
    });


  /* ---------------------------------------
     ADD FOOD FLOW
  ---------------------------------------- */

  const [addFoodOpen, setAddFoodOpen] =
    useState(false);

  const [selectedFood, setSelectedFood] =
    useState<any>(null);

  /* ---------------------------------------
     AI GENERATED FOOD REVIEW
  ---------------------------------------- */

  const [aiFood, setAiFood] =
    useState<any>(null);

  const [aiDrawerOpen, setAiDrawerOpen] =
    useState(false);

  const [foodServingOpen, setFoodServingOpen] =
    useState(false);


  /* ---------------------------------------
     IMAGE SELECT
  ---------------------------------------- */

  const handleImageSelect =
    (
      event:
        React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      if (
        !file.type.startsWith("image/")
      ) {

        toast({
          title:
            "Please select an image",
          status:
            "warning",
          duration:
            2000,
          isClosable:
            true,
        });

        return;
      }


      if (preview) {

        URL.revokeObjectURL(
          preview
        );

      }


      setImage(file);

      const objectUrl =
        URL.createObjectURL(file);

      setPreview(
        objectUrl
      );

      /*
       * New image means new scan.
       */

      setScanItems([]);

      setScanTotal({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        fiber: 0,
      });

    };


  /* ---------------------------------------
     CLEAR IMAGE
  ---------------------------------------- */

  const clearImage = () => {

    if (preview) {

      URL.revokeObjectURL(
        preview
      );

    }

    setImage(null);

    setPreview(null);

    setScanItems([]);

    setScanTotal({
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
    });

    setDrawerOpen(false);

    setAddFoodOpen(false);

    setSelectedFood(null);

    setFoodServingOpen(false);


    if (cameraInputRef.current) {

      cameraInputRef.current.value =
        "";

    }


    if (galleryInputRef.current) {

      galleryInputRef.current.value =
        "";

    }

  };


  /* ---------------------------------------
     NORMALIZE AI RESULT
  ---------------------------------------- */

  const normalizeScanItem =
    (
      item: any,
      index: number
    ): ScanFoodItem => {

      const grams =
        Number(
          item.grams ??
          item.estimatedGrams ??
          item.estimatedPortionGrams ??
          item.portionGrams ??
          100
        ) || 100;


      return {

        /*
         * IMPORTANT:
         * AI detected foods may have
         * foodId = null.
         */
        foodId:
          item.foodId ??
          item.id ??
          null,

        name:
          item.name ??
          item.food ??
          item.detectedName ??
          `Food ${index + 1}`,

        grams,

        calories:
          Number(
            item.calories ?? 0
          ),

        protein:
          Number(
            item.protein ?? 0
          ),

        carbs:
          Number(
            item.carbs ?? 0
          ),

        fats:
          Number(
            item.fats ??
            item.fat ??
            0
          ),

        fiber:
          Number(
            item.fiber ??
            item.fibre ??
            0
          ),

        confidence:
          Number(
            item.confidence ?? 0
          ),

        source:
          item.source ??
          "AI",

        quantity:
          Number(
            item.quantity ?? 1
          ),

        serving:
          item.serving ?? {

            id: "SCAN",

            value:
              grams,

            unit:
              "g",

            label:
              `${grams} g`,

            grams,

          },

        preparationStyle:
          item.preparationStyle ??
          "REGULAR",

      };

    };


  /* ---------------------------------------
     ANALYZE MEAL
  ---------------------------------------- */

  const handleAnalyzeMeal =
    async () => {

      if (!image) {
        return;
      }


      try {

        setAnalyzing(true);


        const formData =
          new FormData();

        formData.append(
          "image",
          image
        );


        const response =
          await api.post(
            "/nutrition/scan-meal",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );


        const responseData =
          response.data;


        /*
         * Backend currently returns:
         *
         * {
         *   success: true,
         *   mealDetected: true,
         *   items: [],
         *   total: {}
         * }
         *
         * Keep support for a nested
         * `meal` response as well.
         */

        const result =
          responseData?.meal ??
          responseData;


        const rawItems =
          result?.items ??
          [];


        if (
          !Array.isArray(rawItems) ||
          rawItems.length === 0
        ) {

          toast({

            title:
              "No food items detected",

            description:
              "Try taking a clearer photo with the whole plate visible.",

            status:
              "warning",

            duration:
              3500,

            isClosable:
              true,

          });

          return;

        }


        const normalizedItems =
          rawItems.map(
            (
              item: any,
              index: number
            ) =>
              normalizeScanItem(
                item,
                index
              )
          );


        setScanItems(
          normalizedItems
        );


        /*
         * Calculate total ourselves.
         *
         * This makes the UI resilient even
         * if backend total is missing.
         */

        const calculatedTotal =
          normalizedItems.reduce(
            (
              acc,
              item
            ) => {

              acc.calories +=
                Number(
                  item.calories
                ) || 0;

              acc.protein +=
                Number(
                  item.protein
                ) || 0;

              acc.carbs +=
                Number(
                  item.carbs
                ) || 0;

              acc.fats +=
                Number(
                  item.fats
                ) || 0;

              acc.fiber +=
                Number(
                  item.fiber
                ) || 0;

              return acc;

            },
            {
              calories: 0,
              protein: 0,
              carbs: 0,
              fats: 0,
              fiber: 0,
            }
          );


        /*
         * Backend total is preferred when
         * available.
         */

        setScanTotal(
          result?.total ??
          calculatedTotal
        );


        /*
         * Open review drawer.
         */

        setDrawerOpen(
          true
        );


      } catch (error: any) {

        console.error(
          "Meal scan failed:",
          error
        );


        toast({

          title:
            "Unable to analyze meal",

          description:
            error?.response?.data?.message ??
            "Something went wrong while analyzing your meal.",

          status:
            "error",

          duration:
            3500,

          isClosable:
            true,

        });

      } finally {

        setAnalyzing(
          false
        );

      }

    };


  /* ---------------------------------------
     REOPEN SCAN REVIEW
  ---------------------------------------- */

  const handleReviewScan = () => {

    if (!scanItems.length) {
      return;
    }

    setDrawerOpen(true);

  };


  /* ---------------------------------------
     ADD FOOD
  ---------------------------------------- */

  const handleAddFood = () => {

    /*
     * Close scan review first.
     *
     * We DON'T clear scanItems.
     */

    setDrawerOpen(false);

    setAddFoodOpen(true);

  };


  /* ---------------------------------------
     FOOD SELECTED FROM SEARCH
  ---------------------------------------- */

  const handleFoodSelect =
    async (
      food: any
    ) => {

      try {

        const response =
          await api.get(
            `/nutrition/food-details/${food.id}`
          );


        setSelectedFood(
          response.data
        );


        setAddFoodOpen(
          false
        );


        setFoodServingOpen(
          true
        );


      } catch (error) {

        console.error(
          "Failed to load food details:",
          error
        );


        toast({

          title:
            "Failed to load food details",

          status:
            "error",

          duration:
            2000,

          isClosable:
            true,

        });

      }

    };


  /* ---------------------------------------
     SAVE FOOD FROM SERVING DRAWER
  ---------------------------------------- */

  const handleFoodSave =
    (
      foodSelection: any
    ) => {

      /*
       * Only reject duplicate real IDs.
       *
       * AI scanned foods can have null foodId.
       */

      const foodId =
        Number(
          foodSelection.foodId
        );


      const exists =
        Number.isFinite(foodId) &&
        scanItems.some(
          item =>
            Number(
              item.foodId
            ) === foodId
        );


      if (exists) {

        toast({

          title:
            "Food already added",

          description:
            "You can edit its portion instead.",

          status:
            "info",

          duration:
            1800,

          isClosable:
            true,

        });

        return;

      }


      const newItem:
        ScanFoodItem = {

        foodId:
          Number.isFinite(foodId)
            ? foodId
            : null,

        name:
          foodSelection.name,

        grams:
          Number(
            foodSelection.grams
          ) || 0,

        calories:
          Number(
            foodSelection.calories
          ) || 0,

        protein:
          Number(
            foodSelection.protein
          ) || 0,

        carbs:
          Number(
            foodSelection.carbs
          ) || 0,

        fats:
          Number(
            foodSelection.fats
          ) || 0,

        fiber:
          Number(
            foodSelection.fiber
          ) || 0,

        confidence:
          1,

        source:
          "DATABASE",

        quantity:
          Number(
            foodSelection.quantity
          ) || 1,

        serving:
          foodSelection.serving ??
          {
            value:
              foodSelection.grams,

            unit:
              foodSelection.unit ??
              "g",

            label:
              `${foodSelection.grams} g`,

            grams:
              foodSelection.grams,
          },

      };


      /*
       * IMPORTANT:
       * Append to existing scan list.
       */

      setScanItems(
        prev => [
          ...prev,
          newItem,
        ]
      );


      setFoodServingOpen(
        false
      );

      setSelectedFood(
        null
      );


      /*
       * Return directly to scan review.
       */

      setDrawerOpen(
        true
      );


      toast({

        title:
          `${newItem.name} added`,

        description:
          "Food added to your scanned meal.",

        status:
          "success",

        duration:
          1500,

        isClosable:
          true,

      });

    };


  /* ---------------------------------------
     GENERATE FOOD
  ---------------------------------------- */

  const handleGenerateFood =
    async (
      foodName: string
    ) => {

      try {

        const response =
          await api.post(
            "/nutrition/generate-food",
            {
              foodName,
            }
          );

        /*
         * Generate-food returns the AI estimate only.
         * It does NOT save the food yet.
         * The user must review it and click
         * "Save To NEKA" first.
         */

        const generatedFood =
          response.data;

        if (!generatedFood) {
          throw new Error(
            "Generated food data missing"
          );
        }

        setAiFood(
          generatedFood
        );

        /* Keep the existing scanned foods intact. */
        setAddFoodOpen(
          false
        );

        setAiDrawerOpen(
          true
        );

      } catch (error: any) {

        console.error(
          "Failed to generate food:",
          error
        );

        toast({
          title:
            "Unable to generate food",
          description:
            error?.response?.data?.message ??
            "NEKA couldn't create this food right now.",
          status:
            "error",
          duration:
            2500,
          isClosable:
            true,
        });

      }

    };


  /* ---------------------------------------
     SAVE AI GENERATED FOOD
  ---------------------------------------- */

  const handleSaveAIFood =
    async (
      food: any
    ) => {

      try {

        /*
         * Same proven flow as AddMeal.tsx:
         *
         * Generate -> review -> create-food ->
         * foodReferenceId -> food-details ->
         * FoodServingDrawer.
         *
         * The food is NOT added to the scanned
         * meal until the user chooses its serving
         * and saves from FoodServingDrawer.
         */

        const response =
          await api.post(
            "/nutrition/create-food",
            food
          );

        const foodReferenceId =
          response.data?.foodReferenceId;

        if (!foodReferenceId) {
          throw new Error(
            "Created food reference ID missing"
          );
        }

        const foodDetails =
          await api.get(
            `/nutrition/food-details/${foodReferenceId}`
          );

        setAiDrawerOpen(
          false
        );

        setAiFood(
          null
        );

        setSelectedFood(
          foodDetails.data
        );

        setFoodServingOpen(
          true
        );

      } catch (error: any) {

        console.error(
          "Failed to save generated food:",
          error
        );

        toast({
          title:
            "Failed to save food",
          description:
            error?.response?.data?.message ??
            "NEKA couldn't save this generated food. Please try again.",
          status:
            "error",
          duration:
            2500,
          isClosable:
            true,
        });

      }

    };


  /* ---------------------------------------
     SAVE SCANNED MEAL
  ---------------------------------------- */

  const handleConfirmScan =
    async (
      items: any[]
    ) => {

      try {

        const total =
          items.reduce(
            (
              acc,
              item
            ) => {

              acc.calories +=
                Number(
                  item.calories
                ) || 0;

              acc.protein +=
                Number(
                  item.protein
                ) || 0;

              acc.carbs +=
                Number(
                  item.carbs
                ) || 0;

              acc.fats +=
                Number(
                  item.fats
                ) || 0;

              acc.fiber +=
                Number(
                  item.fiber
                ) || 0;

              return acc;

            },
            {
              calories: 0,
              protein: 0,
              carbs: 0,
              fats: 0,
              fiber: 0,
            }
          );


        await api.post(
          "/nutrition/confirm-meal",
          {
            userId,
            mealType,
            items,
            total,
          }
        );


        toast({

          title:
            "Meal saved successfully",

          description:
            "Your scanned meal has been added to today's nutrition.",

          status:
            "success",

          duration:
            2500,

          isClosable:
            true,

        });


        setDrawerOpen(
          false
        );


        clearImage();


        navigate(
          "/home"
        );


      } catch (error) {

        console.error(
          "Failed to save scanned meal:",
          error
        );


        toast({

          title:
            "Failed to save meal",

          description:
            "Please try again.",

          status:
            "error",

          duration:
            2500,

          isClosable:
            true,

        });

      }

    };


  return (

    <Box
      minH="100vh"
      bg="
        linear-gradient(
          180deg,
          #ffffff 0%,
          #f4faff 100%
        )
      "
    >

      <Box
        maxW="480px"
        mx="auto"
        px={5}
        pt={6}
        pb={20}
      >

        {/* BACK */}

        <Button
          variant="ghost"
          leftIcon={
            <Icon
              as={FiArrowLeft}
            />
          }
          px={0}
          mb={8}
          onClick={() =>
            navigate("/home")
          }
        >
          Dashboard
        </Button>


        {!preview ? (

          <VStack
            spacing={7}
            align="stretch"
          >

            {/* HERO */}

            <VStack
              spacing={3}
              textAlign="center"
            >

              <Center
                w="76px"
                h="76px"
                mx="auto"
                borderRadius="26px"
                bg="brand.50"
                color="brand.500"
              >

                <Icon
                  as={FiCamera}
                  boxSize={9}
                />

              </Center>


              <Heading
                fontSize="3xl"
                letterSpacing="-1px"
              >
                Scan your meal
              </Heading>


              <Text
                color="gray.500"
                fontSize="sm"
                lineHeight="1.7"
                maxW="350px"
              >
                Take a photo of your meal
                and let NEKA identify the
                foods and estimate their
                portions.
              </Text>

            </VStack>


            {/* MEAL TYPE */}

            <Box>

              <Text
                fontWeight="700"
                fontSize="md"
                mb={3}
              >
                What meal is this?
              </Text>


              <MealTypeSelector
                mealType={
                  mealType
                }
                setMealType={
                  setMealType
                }
              />

            </Box>


            {/* CAMERA */}

            <Button
              h="64px"
              borderRadius="22px"
              colorScheme="blue"
              leftIcon={
                <Icon
                  as={FiCamera}
                  boxSize={5}
                />
              }
              fontSize="md"
              fontWeight="700"
              onClick={() =>
                cameraInputRef.current?.click()
              }
            >
              Take a photo
            </Button>


            {/* GALLERY */}

            <Button
              h="64px"
              borderRadius="22px"
              variant="outline"
              leftIcon={
                <Icon
                  as={FiImage}
                  boxSize={5}
                />
              }
              fontSize="md"
              fontWeight="700"
              onClick={() =>
                galleryInputRef.current?.click()
              }
            >
              Choose from gallery
            </Button>


            {/* EXISTING SCAN REVIEW */}

            {scanItems.length > 0 && (

              <Button
                h="56px"
                borderRadius="20px"
                variant="outline"
                colorScheme="blue"
                leftIcon={
                  <Icon
                    as={FiClipboard}
                  />
                }
                onClick={
                  handleReviewScan
                }
              >
                Review scanned meal
              </Button>

            )}


            {/* EXPLANATION */}

            <Box
              bg="white"
              borderRadius="24px"
              p={5}
              border="1px solid"
              borderColor="gray.100"
              boxShadow="
                0 12px 35px
                rgba(0,0,0,.05)
              "
            >

              <VStack
                align="stretch"
                spacing={3}
              >

                <Text
                  fontWeight="700"
                >
                  ✨ What NEKA will do
                </Text>


                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  • Identify the foods on
                  your plate
                </Text>


                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  • Estimate portion sizes
                </Text>


                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  • Calculate nutrition
                </Text>


                <Text
                  fontSize="sm"
                  color="gray.500"
                >
                  • Let you review everything
                  before saving
                </Text>

              </VStack>

            </Box>


            {/* CAMERA INPUT */}

            <Input
              ref={
                cameraInputRef
              }
              type="file"
              accept="image/*"
              capture="environment"
              display="none"
              onChange={
                handleImageSelect
              }
            />


            {/* GALLERY INPUT */}

            <Input
              ref={
                galleryInputRef
              }
              type="file"
              accept="image/*"
              display="none"
              onChange={
                handleImageSelect
              }
            />

          </VStack>

        ) : (

          /* IMAGE PREVIEW */

          <VStack
            spacing={5}
            align="stretch"
          >

            <Heading
              fontSize="2xl"
            >
              Review your photo
            </Heading>


            <Box
              borderRadius="28px"
              overflow="hidden"
              bg="gray.100"
              boxShadow="
                0 18px 45px
                rgba(0,0,0,.10)
              "
            >

              <Image
                src={preview}
                w="100%"
                maxH="520px"
                objectFit="cover"
                alt="Meal preview"
              />

            </Box>


            <Box
              bg="blue.50"
              borderRadius="20px"
              p={4}
            >

              <Text
                fontSize="sm"
                color="blue.700"
                fontWeight="600"
              >
                💡 For better accuracy
              </Text>


              <Text
                fontSize="sm"
                color="blue.600"
                mt={1}
              >
                Make sure the whole plate
                is visible and the food is
                reasonably well lit.
              </Text>

            </Box>


            {/* REVIEW EXISTING SCAN */}

            {scanItems.length > 0 && (

              <Button
                h="56px"
                borderRadius="20px"
                variant="outline"
                colorScheme="blue"
                leftIcon={
                  <Icon
                    as={FiClipboard}
                  />
                }
                onClick={
                  handleReviewScan
                }
              >
                Review scanned meal
              </Button>

            )}


            <HStack
              spacing={3}
            >

              <Button
                flex={1}
                h="56px"
                borderRadius="18px"
                variant="outline"
                leftIcon={
                  <Icon
                    as={FiRefreshCw}
                  />
                }
                onClick={
                  clearImage
                }
                isDisabled={
                  analyzing
                }
              >
                Retake
              </Button>


              <Button
                flex={2}
                h="56px"
                borderRadius="18px"
                colorScheme="blue"
                fontWeight="700"
                isDisabled={
                  !image
                }
                isLoading={
                  analyzing
                }
                loadingText="Analyzing..."
                onClick={
                  handleAnalyzeMeal
                }
              >
                Analyze Meal ✨
              </Button>

            </HStack>

          </VStack>

        )}

      </Box>


      {/* --------------------------------------
          AI REVIEW DRAWER
      --------------------------------------- */}

      <MealScanDrawer

        isOpen={
          drawerOpen
        }

        onClose={() =>
          setDrawerOpen(
            false
          )
        }

        imageUrl={
          preview
        }

        items={
          scanItems
        }

        total={
          scanTotal
        }

        loading={
          false
        }

        onConfirm={
          handleConfirmScan
        }

        onAddFood={
          handleAddFood
        }

      />


      {/* --------------------------------------
          ADD FOOD DRAWER
      --------------------------------------- */}

      <Drawer
        placement="right"
        isOpen={
          addFoodOpen
        }
        onClose={() =>
          setAddFoodOpen(
            false
          )
        }
      >

        <DrawerOverlay />

        <DrawerContent
          borderLeftRadius={{
            base: "24px",
            md: "30px",
          }}
          maxW={{
            base: "100%",
            sm: "430px",
          }}
        >

          <DrawerHeader>

            <HStack
              justify="space-between"
            >

              <Box>

                <Text
                  fontSize="xs"
                  color="gray.500"
                  textTransform="uppercase"
                  letterSpacing="1px"
                >
                  Add to scanned meal
                </Text>

                <Text
                  fontSize="2xl"
                  fontWeight="800"
                >
                  Add food
                </Text>

              </Box>


              <IconButton
                aria-label="Close"
                icon={
                  <CloseIcon />
                }
                variant="ghost"
                onClick={() =>
                  setAddFoodOpen(
                    false
                  )
                }
              />

            </HStack>

          </DrawerHeader>


          <DrawerBody>

            <VStack
              align="stretch"
              spacing={4}
            >

              <Text
                fontSize="sm"
                color="gray.500"
              >
                Search for a food from
                NEKA's nutrition database.
                If it isn't available,
                NEKA can generate it.
              </Text>


              <FoodSearchInput

                onSelectFood={
                  handleFoodSelect
                }

                onGenerateFood={
                  handleGenerateFood
                }

              />

            </VStack>

          </DrawerBody>

        </DrawerContent>

      </Drawer>


      {/* --------------------------------------
          AI GENERATED FOOD REVIEW DRAWER
      --------------------------------------- */}

      <AIFoodReviewDrawer
        isOpen={
          aiDrawerOpen
        }
        onClose={() => {
          setAiDrawerOpen(
            false
          );
          setAiFood(
            null
          );
        }}
        food={
          aiFood
        }
        onSave={
          handleSaveAIFood
        }
      />


      {/* --------------------------------------
          FOOD SERVING DRAWER
      --------------------------------------- */}

      <FoodServingDrawer

        isOpen={
          foodServingOpen
        }

        onClose={() => {

          setFoodServingOpen(
            false
          );

          setSelectedFood(
            null
          );

        }}

        food={
          selectedFood
        }

        onSave={
          handleFoodSave
        }

      />


      {/* --------------------------------------
          ANALYZING OVERLAY
      --------------------------------------- */}

      {analyzing && (

        <Box
          position="fixed"
          inset={0}
          zIndex={2000}
          bg="blackAlpha.300"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >

          <Box
            bg="white"
            borderRadius="24px"
            px={8}
            py={7}
            textAlign="center"
            boxShadow="2xl"
          >

            <Spinner
              size="xl"
              color="brand.500"
            />

            <Text
              mt={4}
              fontWeight="800"
            >
              NEKA is analyzing your meal...
            </Text>

            <Text
              mt={1}
              fontSize="sm"
              color="gray.500"
            >
              Identifying foods and estimating portions
            </Text>

          </Box>

        </Box>

      )}

    </Box>

  );

};


export default ScanMeal;