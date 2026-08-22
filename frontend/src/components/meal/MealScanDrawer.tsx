//  Version 1

// import {
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerHeader,
//   DrawerBody,
//   DrawerFooter,
//   Button,
//   VStack,
//   HStack,
//   Box,
//   Text,
//   Image,
//   Badge,
//   Input,
//   Divider,
//   Alert,
//   AlertIcon,
//   IconButton
// } from "@chakra-ui/react";

// import {
//   CloseIcon
// } from "@chakra-ui/icons";

// import {
//   useEffect,
//   useState
// } from "react";


// interface Props {

//   isOpen: boolean;

//   onClose: () => void;

//   imageUrl?: string | null;

//   items: any[];

//   total: {

//     calories: number;

//     protein: number;

//     carbs: number;

//     fats: number;

//     fiber: number;

//   };

//   loading?: boolean;

//   onConfirm: (
//     items: any[]
//   ) => void;
// }


// const MealScanDrawer = ({
//   isOpen,
//   onClose,
//   imageUrl,
//   items,
//   total,
//   loading = false,
//   onConfirm
// }: Props) => {


//   const [
//     editableItems,
//     setEditableItems
//   ] = useState<any[]>([]);


//   /* ---------------------------------------
//      LOAD ITEMS
//   ---------------------------------------- */

//   useEffect(() => {

//     setEditableItems(
//       (items || []).map(
//         (item) => ({

//           ...item,

//           grams:
//             Number(
//               item.grams ??
//               item.estimatedGrams ??
//               100
//             ),

//           quantity:
//             Number(
//               item.quantity ?? 1
//             ),

//           preparationStyle:
//             item.preparationStyle ??
//             "REGULAR",

//           fiber:
//             Number(
//               item.fiber ??
//               item.fibre ??
//               0
//             )

//         })
//       )
//     );

//   }, [items]);


//   /* ---------------------------------------
//      UPDATE GRAMS
//   ---------------------------------------- */

//   const updateGrams = (
//     index: number,
//     grams: number
//   ) => {

//     setEditableItems(
//       prev => {

//         return prev.map(
//           (
//             item,
//             i
//           ) => {

//             if (
//               i !== index
//             ) {
//               return item;
//             }


//             const originalGrams =
//               Number(
//                 item.grams
//               ) || 1;


//             const ratio =
//               grams /
//               originalGrams;


//             return {

//               ...item,

//               grams,


//               serving: {

//                 ...(item.serving || {}),

//                 id:
//                   item.serving?.id ??
//                   0,

//                 value:
//                   grams,

//                 unit:
//                   "g",

//                 label:
//                   `${grams} g`,

//                 grams

//               },


//               calories:
//                 Math.round(
//                   (
//                     Number(
//                       item.calories
//                     ) || 0
//                   ) *
//                   ratio
//                 ),


//               protein:
//                 Number(
//                   (
//                     (
//                       Number(
//                         item.protein
//                       ) || 0
//                     ) *
//                     ratio
//                   ).toFixed(1)
//                 ),


//               carbs:
//                 Number(
//                   (
//                     (
//                       Number(
//                         item.carbs
//                       ) || 0
//                     ) *
//                     ratio
//                   ).toFixed(1)
//                 ),


//               fats:
//                 Number(
//                   (
//                     (
//                       Number(
//                         item.fats
//                       ) || 0
//                     ) *
//                     ratio
//                   ).toFixed(1)
//                 ),


//               fiber:
//                 Number(
//                   (
//                     (
//                       Number(
//                         item.fiber
//                       ) || 0
//                     ) *
//                     ratio
//                   ).toFixed(1)
//                 )

//             };

//           }
//         );

//       }
//     );

//   };


//   /* ---------------------------------------
//      TOTAL
//   ---------------------------------------- */

//   const calculatedTotal =
//     editableItems.reduce(
//       (
//         acc,
//         item
//       ) => {

//         acc.calories +=
//           Number(
//             item.calories
//           ) || 0;

//         acc.protein +=
//           Number(
//             item.protein
//           ) || 0;

//         acc.carbs +=
//           Number(
//             item.carbs
//           ) || 0;

//         acc.fats +=
//           Number(
//             item.fats
//           ) || 0;

//         acc.fiber +=
//           Number(
//             item.fiber
//           ) || 0;

//         return acc;

//       },
//       {
//         calories: 0,
//         protein: 0,
//         carbs: 0,
//         fats: 0,
//         fiber: 0
//       }
//     );


//   /* ---------------------------------------
//      FINAL CONFIRM
//   ---------------------------------------- */

//   const handleConfirm = () => {

//     const finalItems =
//       editableItems.map(
//         item => ({

//           /*
//           ---------------------------------
//           SAME SHAPE AS MANUAL MEALS
//           ---------------------------------
//           */

//           foodId:
//             item.foodId,

//           name:
//             item.name,

//           serving:
//             item.serving ?? {

//               id: 0,

//               value:
//                 item.grams,

//               unit:
//                 "g",

//               label:
//                 `${item.grams} g`,

//               grams:
//                 item.grams

//             },

//           quantity:
//             Number(
//               item.quantity ?? 1
//             ),

//           preparationStyle:
//             item.preparationStyle ??
//             "REGULAR",

//           grams:
//             Number(
//               item.grams
//             ) || 0,

//           calories:
//             Number(
//               item.calories
//             ) || 0,

//           protein:
//             Number(
//               item.protein
//             ) || 0,

//           carbs:
//             Number(
//               item.carbs
//             ) || 0,

//           fats:
//             Number(
//               item.fats
//             ) || 0,

//           fiber:
//             Number(
//               item.fiber
//             ) || 0,

//           /*
//           ---------------------------------
//           Keep scan metadata too.
//           This is stored inside food_items
//           by your existing confirm API.
//           ---------------------------------
//           */

//           confidence:
//             item.confidence,

//           source:
//             item.source

//         })
//       );


//     onConfirm(
//       finalItems
//     );

//   };


//   return (

//     <Drawer
//       placement="bottom"
//       isOpen={isOpen}
//       onClose={onClose}
//     >

//       <DrawerOverlay />


//       <DrawerContent
//         borderTopRadius="30px"
//         maxH="92vh"
//       >


//         {/* --------------------------------
//             HEADER
//         --------------------------------- */}

//         <DrawerHeader>

//           <HStack
//             justify="space-between"
//           >

//             <Box>

//               <Text
//                 fontSize="sm"
//                 color="gray.500"
//               >
//                 NEKA AI SCAN
//               </Text>

//               <Text
//                 fontSize="2xl"
//                 fontWeight="800"
//               >
//                 We found your meal
//               </Text>

//             </Box>


//             <IconButton
//               aria-label="Close"
//               icon={
//                 <CloseIcon />
//               }
//               variant="ghost"
//               onClick={
//                 onClose
//               }
//             />

//           </HStack>

//         </DrawerHeader>


//         {/* --------------------------------
//             BODY
//         --------------------------------- */}

//         <DrawerBody>

//           <VStack
//             align="stretch"
//             spacing={5}
//           >


//             {/* IMAGE */}

//             {imageUrl && (

//               <Image
//                 src={imageUrl}
//                 alt="Scanned meal"
//                 w="100%"
//                 h="180px"
//                 objectFit="cover"
//                 borderRadius="22px"
//               />

//             )}


//             {/* INFO */}

//             <Alert
//               status="info"
//               borderRadius="xl"
//               bg="blue.50"
//             >

//               <AlertIcon />

//               <Text
//                 fontSize="sm"
//               >

//                 NEKA identified{" "}

//                 <b>
//                   {editableItems.length}
//                 </b>{" "}

//                 food items.

//                 Review the estimated
//                 portions before adding
//                 them to your meal.

//               </Text>

//             </Alert>


//             {/* --------------------------------
//                 FOOD ITEMS
//             --------------------------------- */}

//             {editableItems.map(
//               (
//                 item,
//                 index
//               ) => (

//                 <Box
//                   key={
//                     `${item.name}-${index}`
//                   }
//                   bg="white"
//                   border="1px solid"
//                   borderColor="gray.100"
//                   borderRadius="2xl"
//                   p={4}
//                   boxShadow="sm"
//                 >


//                   <HStack
//                     justify="space-between"
//                     align="start"
//                   >

//                     <Box>

//                       <Text
//                         fontWeight="800"
//                         fontSize="md"
//                       >
//                         🍽️ {item.name}
//                       </Text>


//                       <HStack
//                         mt={2}
//                         spacing={2}
//                         wrap="wrap"
//                       >

//                         {typeof item.confidence ===
//                           "number" && (

//                           <Badge
//                             colorScheme={
//                               item.confidence >=
//                               0.85
//                                 ? "green"
//                                 : item.confidence >=
//                                   0.65
//                                 ? "yellow"
//                                 : "orange"
//                             }
//                             borderRadius="full"
//                           >

//                             {Math.round(
//                               item.confidence *
//                               100
//                             )}% confidence

//                           </Badge>

//                         )}


//                         <Badge
//                           colorScheme={
//                             item.source ===
//                             "DATABASE"
//                               ? "blue"
//                               : "purple"
//                           }
//                           borderRadius="full"
//                         >

//                           {item.source ===
//                           "DATABASE"
//                             ? "NEKA Nutrition"
//                             : "AI Estimate"}

//                         </Badge>

//                       </HStack>

//                     </Box>


//                     <Box
//                       textAlign="right"
//                     >

//                       <Text
//                         fontSize="lg"
//                         fontWeight="800"
//                       >
//                         {Math.round(
//                           item.calories
//                         )}
//                       </Text>

//                       <Text
//                         fontSize="xs"
//                         color="gray.500"
//                       >
//                         kcal
//                       </Text>

//                     </Box>

//                   </HStack>


//                   <Divider
//                     my={4}
//                   />


//                   {/* GRAMS */}

//                   <HStack>

//                     <Box
//                       flex={1}
//                     >

//                       <Text
//                         fontSize="xs"
//                         color="gray.500"
//                         mb={1}
//                       >
//                         Estimated portion
//                       </Text>


//                       <Input
//                         type="number"
//                         value={
//                           item.grams
//                         }
//                         onChange={(
//                           e
//                         ) => {

//                           const value =
//                             Math.max(
//                               1,
//                               Number(
//                                 e.target.value
//                               ) || 1
//                             );


//                           updateGrams(
//                             index,
//                             value
//                           );

//                         }}
//                         borderRadius="xl"
//                       />

//                     </Box>


//                     <Box
//                       pt={5}
//                     >

//                       <Text
//                         fontWeight="700"
//                       >
//                         grams
//                       </Text>

//                     </Box>

//                   </HStack>


//                   {/* MACROS */}

//                   <HStack
//                     mt={4}
//                     spacing={2}
//                   >

//                     <Macro
//                       label="Protein"
//                       value={
//                         item.protein
//                       }
//                       bg="purple.50"
//                     />

//                     <Macro
//                       label="Carbs"
//                       value={
//                         item.carbs
//                       }
//                       bg="orange.50"
//                     />

//                     <Macro
//                       label="Fat"
//                       value={
//                         item.fats
//                       }
//                       bg="green.50"
//                     />

//                   </HStack>

//                 </Box>

//               )
//             )}


//             {/* --------------------------------
//                 TOTAL
//             --------------------------------- */}

//             <Box
//               bg="gray.50"
//               borderRadius="2xl"
//               p={5}
//             >

//               <Text
//                 fontSize="xs"
//                 color="gray.500"
//                 textTransform="uppercase"
//                 letterSpacing="1px"
//               >
//                 Estimated meal
//               </Text>


//               <Text
//                 fontSize="4xl"
//                 fontWeight="900"
//                 color="brand.500"
//               >
//                 {Math.round(
//                   calculatedTotal.calories
//                 )}
//               </Text>


//               <Text
//                 fontSize="sm"
//                 color="gray.500"
//               >
//                 kcal
//               </Text>


//               <HStack
//                 mt={4}
//                 spacing={2}
//               >

//                 <MacroSummary
//                   label="Protein"
//                   value={
//                     calculatedTotal.protein
//                   }
//                 />

//                 <MacroSummary
//                   label="Carbs"
//                   value={
//                     calculatedTotal.carbs
//                   }
//                 />

//                 <MacroSummary
//                   label="Fat"
//                   value={
//                     calculatedTotal.fats
//                   }
//                 />

//               </HStack>

//             </Box>

//           </VStack>

//         </DrawerBody>


//         {/* --------------------------------
//             FOOTER
//         --------------------------------- */}

//         <DrawerFooter>

//           <Button
//             w="100%"
//             h="56px"
//             bg="brand.500"
//             color="white"
//             borderRadius="18px"
//             fontWeight="800"
//             isLoading={loading}
//             isDisabled={
//               editableItems.length === 0
//             }
//             onClick={
//               handleConfirm
//             }
//           >
//             ✓ Add Scanned Meal
//           </Button>

//         </DrawerFooter>

//       </DrawerContent>

//     </Drawer>

//   );

// };


// /* =========================================
//    MACRO
// ========================================= */

// interface MacroProps {

//   label: string;

//   value: number;

//   bg: string;

// }


// const Macro = ({
//   label,
//   value,
//   bg
// }: MacroProps) => (

//   <Box
//     flex={1}
//     bg={bg}
//     borderRadius="lg"
//     p={2}
//     textAlign="center"
//   >

//     <Text
//       fontSize="xs"
//       color="gray.500"
//     >
//       {label}
//     </Text>

//     <Text
//       fontWeight="700"
//     >
//       {Number(
//         value || 0
//       ).toFixed(1)}
//       g
//     </Text>

//   </Box>

// );


// /* =========================================
//    SUMMARY
// ========================================= */

// interface MacroSummaryProps {

//   label: string;

//   value: number;

// }


// const MacroSummary = ({
//   label,
//   value
// }: MacroSummaryProps) => (

//   <Box
//     flex={1}
//   >

//     <Text
//       fontSize="xs"
//     >
//       {label}
//     </Text>

//     <Text
//       fontWeight="700"
//     >
//       {Number(
//         value || 0
//       ).toFixed(1)}
//       g
//     </Text>

//   </Box>

// );


// export default MealScanDrawer;


// Version 2

// import {
//   Drawer,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerHeader,
//   DrawerBody,
//   DrawerFooter,
//   Button,
//   VStack,
//   HStack,
//   Box,
//   Text,
//   Image,
//   Badge,
//   IconButton,
//   Input,
//   Divider,
//   Alert,
//   AlertIcon,
//   Collapse,
//   useDisclosure,
// } from "@chakra-ui/react";

// import {
//   CloseIcon,
//   DeleteIcon,
//   EditIcon,
//   AddIcon,
//   CheckIcon,
// } from "@chakra-ui/icons";

// import {
//   useEffect,
//   useState,
// } from "react";

// interface Props {
//   isOpen: boolean;

//   onClose: () => void;

//   imageUrl?: string | null;

//   items: any[];

//   total: {
//     calories: number;
//     protein: number;
//     carbs: number;
//     fats: number;
//     fiber: number;
//   };

//   loading?: boolean;

//   onConfirm: (
//     items: any[]
//   ) => void;

//   /*
//    * Called when user taps "Add food".
//    *
//    * Parent should open the existing
//    * FoodSearchInput / FoodServingDrawer flow.
//    */
//   onAddFood?: () => void;
// }

// const MealScanDrawer = ({
//   isOpen,
//   onClose,
//   imageUrl,
//   items,
//   loading = false,
//   onConfirm,
//   onAddFood,
// }: Props) => {

//   const [
//     editableItems,
//     setEditableItems
//   ] = useState<any[]>([]);

//   /*
//    * Keeps numeric inputs as strings while
//    * the user is typing.
//    *
//    * This fixes:
//    *
//    * 30 -> delete -> 1
//    *
//    * Instead:
//    *
//    * 30 -> "" -> 2 -> 20
//    */
//   const [
//     draftGrams,
//     setDraftGrams
//   ] = useState<Record<number, string>>({});

//   const [
//     editingNutrition,
//     setEditingNutrition
//   ] = useState<Record<number, boolean>>({});


//   /*
//    * Copy AI results into local editable state.
//    */
//   useEffect(() => {

//     const clonedItems =
//       (items || []).map(
//         (item) => ({
//           ...item
//         })
//       );

//     setEditableItems(
//       clonedItems
//     );

//     /*
//      * Initialize gram drafts.
//      */
//     const gramsDraft: Record<
//       number,
//       string
//     > = {};

//     clonedItems.forEach(
//       (item, index) => {

//         gramsDraft[index] =
//           String(
//             item.grams ?? ""
//           );

//       }
//     );

//     setDraftGrams(
//       gramsDraft
//     );

//     setEditingNutrition({});

//   }, [items]);


//   /*
//    * ----------------------------------------
//    * UPDATE GRAMS
//    * ----------------------------------------
//    *
//    * Nutrition scales from the previous
//    * committed grams value.
//    */
//   const commitGrams = (
//     index: number
//   ) => {

//     const raw =
//       draftGrams[index];

//     const grams =
//       Number(raw);

//     /*
//      * If user leaves it empty or enters
//      * invalid value, restore previous value.
//      */
//     if (
//       !Number.isFinite(grams) ||
//       grams <= 0
//     ) {

//       setDraftGrams(
//         prev => ({
//           ...prev,
//           [index]:
//             String(
//               editableItems[index]?.grams ?? ""
//             )
//         })
//       );

//       return;
//     }

//     setEditableItems(
//       prev => {

//         return prev.map(
//           (item, i) => {

//             if (
//               i !== index
//             ) {
//               return item;
//             }

//             const originalGrams =
//               Number(
//                 item.grams
//               ) || 1;

//             const ratio =
//               grams /
//               originalGrams;

//             return {

//               ...item,

//               grams,

//               serving: {
//                 ...item.serving,

//                 value:
//                   grams,

//                 label:
//                   `${grams} g`,

//                 grams
//               },

//               calories:
//                 Math.round(
//                   (
//                     Number(
//                       item.calories
//                     ) || 0
//                   ) *
//                   ratio
//                 ),

//               protein:
//                 Number(
//                   (
//                     (
//                       Number(
//                         item.protein
//                       ) || 0
//                     ) *
//                     ratio
//                   ).toFixed(1)
//                 ),

//               carbs:
//                 Number(
//                   (
//                     (
//                       Number(
//                         item.carbs
//                       ) || 0
//                     ) *
//                     ratio
//                   ).toFixed(1)
//                 ),

//               fats:
//                 Number(
//                   (
//                     (
//                       Number(
//                         item.fats
//                       ) || 0
//                     ) *
//                     ratio
//                   ).toFixed(1)
//                 ),

//               fiber:
//                 Number(
//                   (
//                     (
//                       Number(
//                         item.fiber
//                       ) || 0
//                     ) *
//                     ratio
//                   ).toFixed(1)
//                 )
//             };

//           }
//         );

//       }
//     );

//   };


//   /*
//    * ----------------------------------------
//    * UPDATE MACRO
//    * ----------------------------------------
//    */
//   const updateNutrition = (
//     index: number,
//     field:
//       | "calories"
//       | "protein"
//       | "carbs"
//       | "fats"
//       | "fiber",
//     value: string
//   ) => {

//     /*
//      * Allow empty value while typing.
//      */
//     const numericValue =
//       value === ""
//         ? ""
//         : Number(value);

//     setEditableItems(
//       prev =>
//         prev.map(
//           (item, i) => {

//             if (
//               i !== index
//             ) {
//               return item;
//             }

//             return {
//               ...item,
//               [field]:
//                 numericValue
//             };

//           }
//         )
//     );

//   };


//   /*
//    * ----------------------------------------
//    * COMMIT MACRO ON BLUR
//    * ----------------------------------------
//    */
//   const commitNutrition = (
//     index: number,
//     field:
//       | "calories"
//       | "protein"
//       | "carbs"
//       | "fats"
//       | "fiber"
//   ) => {

//     setEditableItems(
//       prev =>
//         prev.map(
//           (item, i) => {

//             if (
//               i !== index
//             ) {
//               return item;
//             }

//             const value =
//               Number(
//                 item[field]
//               );

//             return {
//               ...item,
//               [field]:
//                 Number.isFinite(value) &&
//                 value >= 0
//                   ? value
//                   : 0
//             };

//           }
//         )
//     );

//   };


//   /*
//    * ----------------------------------------
//    * REMOVE FOOD
//    * ----------------------------------------
//    */
//   const removeFood = (
//     index: number
//   ) => {

//     setEditableItems(
//       prev =>
//         prev.filter(
//           (_, i) =>
//             i !== index
//         )
//     );

//     /*
//      * Remove its draft state as well.
//      */
//     setDraftGrams(
//       prev => {

//         const next: Record<
//           number,
//           string
//         > = {};

//         Object.keys(prev)
//           .forEach(
//             key => {

//               const oldIndex =
//                 Number(key);

//               if (
//                 oldIndex === index
//               ) {
//                 return;
//               }

//               const newIndex =
//                 oldIndex > index
//                   ? oldIndex - 1
//                   : oldIndex;

//               next[newIndex] =
//                 prev[oldIndex];

//             }
//           );

//         return next;

//       }
//     );

//   };


//   /*
//    * ----------------------------------------
//    * CALCULATED TOTAL
//    * ----------------------------------------
//    */
//   const calculatedTotal =
//     editableItems.reduce(
//       (acc, item) => {

//         acc.calories +=
//           Number(
//             item.calories
//           ) || 0;

//         acc.protein +=
//           Number(
//             item.protein
//           ) || 0;

//         acc.carbs +=
//           Number(
//             item.carbs
//           ) || 0;

//         acc.fats +=
//           Number(
//             item.fats
//           ) || 0;

//         acc.fiber +=
//           Number(
//             item.fiber
//           ) || 0;

//         return acc;

//       },
//       {
//         calories: 0,
//         protein: 0,
//         carbs: 0,
//         fats: 0,
//         fiber: 0
//       }
//     );


//   /*
//    * ----------------------------------------
//    * CONFIDENCE COLOR
//    * ----------------------------------------
//    */
//   const getConfidenceColor =
//     (
//       confidence: number
//     ) => {

//       if (
//         confidence >= 0.85
//       ) {
//         return "green";
//       }

//       if (
//         confidence >= 0.65
//       ) {
//         return "yellow";
//       }

//       return "orange";
//     };


//   /*
//    * ----------------------------------------
//    * NUTRITION FIELD
//    * ----------------------------------------
//    */
//   const NutritionField = ({
//     label,
//     value,
//     index,
//     field,
//     unit
//   }: {
//     label: string;
//     value: any;
//     index: number;
//     field:
//       | "calories"
//       | "protein"
//       | "carbs"
//       | "fats"
//       | "fiber";
//     unit: string;
//   }) => {

//     return (

//       <Box flex={1}>

//         <Text
//           fontSize="10px"
//           color="gray.500"
//           mb={1}
//         >
//           {label}
//         </Text>

//         <HStack>

//           <Input
//             type="number"
//             min={0}
//             value={
//               value === ""
//                 ? ""
//                 : value
//             }
//             onChange={(e) =>
//               updateNutrition(
//                 index,
//                 field,
//                 e.target.value
//               )
//             }
//             onBlur={() =>
//               commitNutrition(
//                 index,
//                 field
//               )
//             }
//             borderRadius="12px"
//             size="sm"
//             bg="white"
//           />

//           <Text
//             fontSize="xs"
//             color="gray.500"
//           >
//             {unit}
//           </Text>

//         </HStack>

//       </Box>

//     );

//   };


//   return (

//     <Drawer
//       placement="bottom"
//       isOpen={isOpen}
//       onClose={onClose}
//     >

//       <DrawerOverlay />

//       <DrawerContent
//         borderTopRadius="30px"
//         maxH="94vh"
//       >

//         {/* ------------------------------------
//             HEADER
//         ------------------------------------- */}

//         <DrawerHeader>

//           <HStack
//             justify="space-between"
//           >

//             <Box>

//               <Text
//                 fontSize="sm"
//                 color="gray.500"
//                 letterSpacing="1px"
//               >
//                 NEKA AI SCAN
//               </Text>

//               <Text
//                 fontSize="2xl"
//                 fontWeight="800"
//               >
//                 We found your meal
//               </Text>

//             </Box>

//             <IconButton
//               aria-label="Close"
//               icon={
//                 <CloseIcon />
//               }
//               variant="ghost"
//               onClick={onClose}
//             />

//           </HStack>

//         </DrawerHeader>


//         {/* ------------------------------------
//             BODY
//         ------------------------------------- */}

//         <DrawerBody>

//           <VStack
//             align="stretch"
//             spacing={5}
//             pb={4}
//           >

//             {/* IMAGE */}

//             {imageUrl && (

//               <Image
//                 src={imageUrl}
//                 alt="Scanned meal"
//                 w="100%"
//                 h="180px"
//                 objectFit="cover"
//                 borderRadius="22px"
//               />

//             )}


//             {/* INFO */}

//             <Alert
//               status="info"
//               borderRadius="xl"
//               bg="blue.50"
//             >

//               <AlertIcon />

//               <Text
//                 fontSize="sm"
//               >

//                 NEKA identified{" "}

//                 <b>
//                   {editableItems.length}
//                 </b>{" "}

//                 food items.

//                 <br />

//                 Review the estimates
//                 before saving.

//               </Text>

//             </Alert>


//             {/* --------------------------------
//                 FOOD ITEMS
//             --------------------------------- */}

//             {editableItems.map(
//               (item, index) => {

//                 const isEditing =
//                   editingNutrition[
//                     index
//                   ] || false;

//                 return (

//                   <Box
//                     key={
//                       `${item.foodId || item.id || item.name}-${index}`
//                     }
//                     bg="white"
//                     border="1px solid"
//                     borderColor="gray.100"
//                     borderRadius="2xl"
//                     p={4}
//                     boxShadow="sm"
//                   >

//                     {/* HEADER */}

//                     <HStack
//                       justify="space-between"
//                       align="start"
//                     >

//                       <Box
//                         flex={1}
//                         pr={2}
//                       >

//                         <Text
//                           fontWeight="800"
//                           fontSize="md"
//                         >
//                           🍽️ {item.name}
//                         </Text>

//                         <HStack
//                           mt={2}
//                           spacing={2}
//                           flexWrap="wrap"
//                         >

//                           {item.confidence !==
//                             undefined && (

//                             <Badge
//                               colorScheme={
//                                 getConfidenceColor(
//                                   Number(
//                                     item.confidence
//                                   )
//                                 )
//                               }
//                               borderRadius="full"
//                             >

//                               {Math.round(
//                                 Number(
//                                   item.confidence
//                                 ) * 100
//                               )}
//                               % confidence

//                             </Badge>

//                           )}

//                           <Badge
//                             colorScheme={
//                               item.source ===
//                               "DATABASE"
//                                 ? "blue"
//                                 : "purple"
//                             }
//                             borderRadius="full"
//                           >

//                             {item.source ===
//                             "DATABASE"
//                               ? "NEKA Nutrition"
//                               : "AI Estimate"}

//                           </Badge>

//                         </HStack>

//                       </Box>


//                       {/* REMOVE */}

//                       <IconButton
//                         aria-label={
//                           `Remove ${item.name}`
//                         }
//                         icon={
//                           <DeleteIcon />
//                         }
//                         size="sm"
//                         variant="ghost"
//                         colorScheme="red"
//                         onClick={() =>
//                           removeFood(
//                             index
//                           )
//                         }
//                       />

//                     </HStack>


//                     <Divider
//                       my={4}
//                     />


//                     {/* PORTION */}

//                     <HStack
//                       align="end"
//                     >

//                       <Box flex={1}>

//                         <Text
//                           fontSize="xs"
//                           color="gray.500"
//                           mb={1}
//                         >
//                           Estimated portion
//                         </Text>

//                         <Input
//                           type="number"
//                           min={1}
//                           value={
//                             draftGrams[
//                               index
//                             ] ?? ""
//                           }
//                           onChange={(e) => {

//                             setDraftGrams(
//                               prev => ({
//                                 ...prev,
//                                 [index]:
//                                   e.target.value
//                               })
//                             );

//                           }}
//                           onBlur={() =>
//                             commitGrams(
//                               index
//                             )
//                           }
//                           borderRadius="xl"
//                         />

//                       </Box>

//                       <Text
//                         fontWeight="700"
//                         pb={3}
//                       >
//                         grams
//                       </Text>

//                     </HStack>


//                     {/* --------------------------------
//                         NUTRITION SUMMARY
//                     --------------------------------- */}

//                     {!isEditing && (

//                       <HStack
//                         mt={4}
//                         spacing={2}
//                       >

//                         <Box
//                           flex={1}
//                           bg="purple.50"
//                           borderRadius="lg"
//                           p={2}
//                           textAlign="center"
//                         >

//                           <Text
//                             fontSize="xs"
//                             color="gray.500"
//                           >
//                             Protein
//                           </Text>

//                           <Text
//                             fontWeight="700"
//                           >
//                             {Number(
//                               item.protein || 0
//                             ).toFixed(1)}
//                             g
//                           </Text>

//                         </Box>


//                         <Box
//                           flex={1}
//                           bg="orange.50"
//                           borderRadius="lg"
//                           p={2}
//                           textAlign="center"
//                         >

//                           <Text
//                             fontSize="xs"
//                             color="gray.500"
//                           >
//                             Carbs
//                           </Text>

//                           <Text
//                             fontWeight="700"
//                           >
//                             {Number(
//                               item.carbs || 0
//                             ).toFixed(1)}
//                             g
//                           </Text>

//                         </Box>


//                         <Box
//                           flex={1}
//                           bg="green.50"
//                           borderRadius="lg"
//                           p={2}
//                           textAlign="center"
//                         >

//                           <Text
//                             fontSize="xs"
//                             color="gray.500"
//                           >
//                             Fat
//                           </Text>

//                           <Text
//                             fontWeight="700"
//                           >
//                             {Number(
//                               item.fats || 0
//                             ).toFixed(1)}
//                             g
//                           </Text>

//                         </Box>

//                       </HStack>

//                     )}


//                     {/* --------------------------------
//                         EDIT NUTRITION
//                     --------------------------------- */}

//                     <Collapse
//                       in={isEditing}
//                       animateOpacity
//                     >

//                       <Box
//                         mt={4}
//                         p={3}
//                         bg="gray.50"
//                         borderRadius="xl"
//                       >

//                         <Text
//                           fontSize="xs"
//                           fontWeight="800"
//                           color="gray.600"
//                           mb={3}
//                           textTransform="uppercase"
//                           letterSpacing="1px"
//                         >
//                           Edit nutrition
//                         </Text>


//                         <VStack
//                           spacing={3}
//                           align="stretch"
//                         >

//                           <HStack>

//                             <NutritionField
//                               label="Calories"
//                               value={
//                                 item.calories
//                               }
//                               index={index}
//                               field="calories"
//                               unit="kcal"
//                             />

//                             <NutritionField
//                               label="Protein"
//                               value={
//                                 item.protein
//                               }
//                               index={index}
//                               field="protein"
//                               unit="g"
//                             />

//                           </HStack>


//                           <HStack>

//                             <NutritionField
//                               label="Carbs"
//                               value={
//                                 item.carbs
//                               }
//                               index={index}
//                               field="carbs"
//                               unit="g"
//                             />

//                             <NutritionField
//                               label="Fat"
//                               value={
//                                 item.fats
//                               }
//                               index={index}
//                               field="fats"
//                               unit="g"
//                             />

//                           </HStack>


//                           <NutritionField
//                             label="Fiber"
//                             value={
//                               item.fiber
//                             }
//                             index={index}
//                             field="fiber"
//                             unit="g"
//                           />

//                         </VStack>

//                       </Box>

//                     </Collapse>


//                     {/* EDIT BUTTON */}

//                     <Button
//                       mt={4}
//                       size="sm"
//                       variant="ghost"
//                       leftIcon={
//                         isEditing
//                           ? <CheckIcon />
//                           : <EditIcon />
//                       }
//                       colorScheme="blue"
//                       onClick={() => {

//                         setEditingNutrition(
//                           prev => ({
//                             ...prev,
//                             [index]:
//                               !isEditing
//                           })
//                         );

//                       }}
//                     >

//                       {isEditing
//                         ? "Done editing"
//                         : "Edit nutrition"}

//                     </Button>

//                   </Box>

//                 );

//               }
//             )}


//             {/* --------------------------------
//                 ADD FOOD
//             --------------------------------- */}

//             <Box
//               border="1px dashed"
//               borderColor="blue.300"
//               bg="blue.50"
//               borderRadius="2xl"
//               p={5}
//               textAlign="center"
//             >

//               <Text
//                 fontWeight="800"
//                 fontSize="md"
//               >
//                 Didn't catch something?
//               </Text>

//               <Text
//                 mt={1}
//                 fontSize="sm"
//                 color="gray.600"
//               >
//                 Add any missing food to this
//                 meal before saving.
//               </Text>

//               <Button
//                 mt={4}
//                 leftIcon={
//                   <AddIcon />
//                 }
//                 colorScheme="blue"
//                 borderRadius="full"
//                 onClick={
//                   onAddFood
//                 }
//               >
//                 Add food
//               </Button>

//             </Box>


//             {/* --------------------------------
//                 TOTAL
//             --------------------------------- */}

//             <Box
//               bg="gray.50"
//               borderRadius="2xl"
//               p={5}
//             >

//               <Text
//                 fontSize="xs"
//                 color="gray.500"
//                 textTransform="uppercase"
//                 letterSpacing="1px"
//               >
//                 Estimated meal
//               </Text>


//               <Text
//                 fontSize="4xl"
//                 fontWeight="900"
//                 color="brand.500"
//               >
//                 {Math.round(
//                   calculatedTotal.calories
//                 )}
//               </Text>


//               <Text
//                 fontSize="sm"
//                 color="gray.500"
//               >
//                 kcal
//               </Text>


//               <HStack
//                 mt={4}
//                 spacing={2}
//               >

//                 <Box flex={1}>
//                   <Text
//                     fontSize="xs"
//                   >
//                     Protein
//                   </Text>

//                   <Text
//                     fontWeight="700"
//                   >
//                     {calculatedTotal.protein.toFixed(
//                       1
//                     )}
//                     g
//                   </Text>
//                 </Box>


//                 <Box flex={1}>
//                   <Text
//                     fontSize="xs"
//                   >
//                     Carbs
//                   </Text>

//                   <Text
//                     fontWeight="700"
//                   >
//                     {calculatedTotal.carbs.toFixed(
//                       1
//                     )}
//                     g
//                   </Text>
//                 </Box>


//                 <Box flex={1}>
//                   <Text
//                     fontSize="xs"
//                   >
//                     Fat
//                   </Text>

//                   <Text
//                     fontWeight="700"
//                   >
//                     {calculatedTotal.fats.toFixed(
//                       1
//                     )}
//                     g
//                   </Text>
//                 </Box>


//                 <Box flex={1}>
//                   <Text
//                     fontSize="xs"
//                   >
//                     Fiber
//                   </Text>

//                   <Text
//                     fontWeight="700"
//                   >
//                     {calculatedTotal.fiber.toFixed(
//                       1
//                     )}
//                     g
//                   </Text>
//                 </Box>

//               </HStack>

//             </Box>

//           </VStack>

//         </DrawerBody>


//         {/* ------------------------------------
//             FOOTER
//         ------------------------------------- */}

//         <DrawerFooter>

//           <Button
//             w="100%"
//             h="56px"
//             bg="brand.500"
//             color="white"
//             borderRadius="18px"
//             fontWeight="800"
//             isLoading={loading}
//             isDisabled={
//               editableItems.length === 0
//             }
//             onClick={() =>
//               onConfirm(
//                 editableItems
//               )
//             }
//           >
//             ✓ Add Scanned Meal
//           </Button>

//         </DrawerFooter>

//       </DrawerContent>

//     </Drawer>

//   );

// };

// export default MealScanDrawer;


// Version 3 : bug fix of 2

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  VStack,
  HStack,
  Box,
  Text,
  Image,
  Badge,
  IconButton,
  Input,
  Divider,
  Alert,
  AlertIcon,
  Collapse,
} from "@chakra-ui/react";

import {
  CloseIcon,
  DeleteIcon,
  EditIcon,
  AddIcon,
  CheckIcon,
} from "@chakra-ui/icons";

import {
  useEffect,
  useState,
} from "react";


interface Props {

  isOpen: boolean;

  onClose: () => void;

  imageUrl?: string | null;

  items: any[];

  total: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };

  loading?: boolean;

  onConfirm: (
    items: any[]
  ) => void;

  onAddFood?: () => void;
}


const MealScanDrawer = ({
  isOpen,
  onClose,
  imageUrl,
  items,
  loading = false,
  onConfirm,
  onAddFood,
}: Props) => {


  const [
    editableItems,
    setEditableItems,
  ] = useState<any[]>([]);


  /*
   * Keep input values as strings.
   *
   * This means:
   *
   * 30
   * ↓
   * ""
   * ↓
   * 2
   * ↓
   * 20
   *
   * instead of Chakra/React forcing
   * the field back to 1.
   */

  const [
    draftGrams,
    setDraftGrams,
  ] = useState<
    Record<number, string>
  >({});


  const [
    editingNutrition,
    setEditingNutrition,
  ] = useState<
    Record<number, boolean>
  >({});


  /* ---------------------------------------
     COPY ITEMS INTO LOCAL STATE
  ---------------------------------------- */

  useEffect(() => {

    const clonedItems =
      (items || []).map(
        item => ({
          ...item,
        })
      );


    setEditableItems(
      clonedItems
    );


    const gramsDraft:
      Record<number, string> = {};


    clonedItems.forEach(
      (
        item,
        index
      ) => {

        gramsDraft[index] =
          String(
            item.grams ?? ""
          );

      }
    );


    setDraftGrams(
      gramsDraft
    );


    setEditingNutrition({});

  }, [items]);


  /* ---------------------------------------
     UPDATE GRAMS
  ---------------------------------------- */

  const commitGrams = (
    index: number
  ) => {

    const raw =
      draftGrams[index];


    const grams =
      Number(raw);


    /*
     * Empty / invalid:
     * restore previous value.
     */

    if (
      !Number.isFinite(grams) ||
      grams <= 0
    ) {

      setDraftGrams(
        prev => ({
          ...prev,
          [index]:
            String(
              editableItems[index]
                ?.grams ?? ""
            ),
        })
      );

      return;

    }


    setEditableItems(
      prev => {

        return prev.map(
          (
            item,
            i
          ) => {

            if (
              i !== index
            ) {
              return item;
            }


            const originalGrams =
              Number(
                item.grams
              ) || 1;


            const ratio =
              grams /
              originalGrams;


            return {

              ...item,

              grams,

              serving: {

                ...item.serving,

                value:
                  grams,

                label:
                  `${grams} g`,

                grams,

              },

              calories:
                Math.round(
                  (
                    Number(
                      item.calories
                    ) || 0
                  ) *
                  ratio
                ),

              protein:
                Number(
                  (
                    (
                      Number(
                        item.protein
                      ) || 0
                    ) *
                    ratio
                  ).toFixed(1)
                ),

              carbs:
                Number(
                  (
                    (
                      Number(
                        item.carbs
                      ) || 0
                    ) *
                    ratio
                  ).toFixed(1)
                ),

              fats:
                Number(
                  (
                    (
                      Number(
                        item.fats
                      ) || 0
                    ) *
                    ratio
                  ).toFixed(1)
                ),

              fiber:
                Number(
                  (
                    (
                      Number(
                        item.fiber
                      ) || 0
                    ) *
                    ratio
                  ).toFixed(1)
                ),

            };

          }
        );

      }
    );

  };


  /* ---------------------------------------
     UPDATE NUTRITION
  ---------------------------------------- */

  const updateNutrition = (
    index: number,
    field:
      | "calories"
      | "protein"
      | "carbs"
      | "fats"
      | "fiber",
    value: string
  ) => {


    /*
     * Keep empty string while typing.
     */

    const numericValue =
      value === ""
        ? ""
        : Number(value);


    setEditableItems(
      prev =>
        prev.map(
          (
            item,
            i
          ) => {

            if (
              i !== index
            ) {
              return item;
            }


            return {

              ...item,

              [field]:
                numericValue,

            };

          }
        )
    );

  };


  /* ---------------------------------------
     COMMIT NUTRITION
  ---------------------------------------- */

  const commitNutrition = (
    index: number,
    field:
      | "calories"
      | "protein"
      | "carbs"
      | "fats"
      | "fiber"
  ) => {

    setEditableItems(
      prev =>
        prev.map(
          (
            item,
            i
          ) => {

            if (
              i !== index
            ) {
              return item;
            }


            const value =
              Number(
                item[field]
              );


            return {

              ...item,

              [field]:
                Number.isFinite(value) &&
                value >= 0
                  ? value
                  : 0,

            };

          }
        )
    );

  };


  /* ---------------------------------------
     REMOVE FOOD
  ---------------------------------------- */

  const removeFood = (
    index: number
  ) => {

    setEditableItems(
      prev =>
        prev.filter(
          (
            _,
            i
          ) =>
            i !== index
        )
    );


    /*
     * Rebuild grams drafts
     * so indexes stay aligned.
     */

    setDraftGrams(
      prev => {

        const next:
          Record<number, string> = {};


        Object.keys(prev)
          .forEach(
            key => {

              const oldIndex =
                Number(key);


              if (
                oldIndex === index
              ) {
                return;
              }


              const newIndex =
                oldIndex > index
                  ? oldIndex - 1
                  : oldIndex;


              next[newIndex] =
                prev[oldIndex];

            }
          );


        return next;

      }
    );


    /*
     * Rebuild edit states too.
     */

    setEditingNutrition(
      prev => {

        const next:
          Record<number, boolean> = {};


        Object.keys(prev)
          .forEach(
            key => {

              const oldIndex =
                Number(key);


              if (
                oldIndex === index
              ) {
                return;
              }


              const newIndex =
                oldIndex > index
                  ? oldIndex - 1
                  : oldIndex;


              next[newIndex] =
                prev[oldIndex];

            }
          );


        return next;

      }
    );

  };


  /* ---------------------------------------
     TOTAL
  ---------------------------------------- */

  const calculatedTotal =
    editableItems.reduce(
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


  /* ---------------------------------------
     CONFIDENCE
  ---------------------------------------- */

  const getConfidenceColor =
    (
      confidence: number
    ) => {

      if (
        confidence >= 0.85
      ) {
        return "green";
      }


      if (
        confidence >= 0.65
      ) {
        return "yellow";
      }


      return "orange";

    };


  /* ---------------------------------------
     NUTRITION FIELD
  ---------------------------------------- */

  const NutritionField = ({
    label,
    value,
    index,
    field,
    unit,
  }: {
    label: string;
    value: any;
    index: number;
    field:
      | "calories"
      | "protein"
      | "carbs"
      | "fats"
      | "fiber";
    unit: string;
  }) => {

    return (

      <Box flex={1}>

        <Text
          fontSize="10px"
          color="gray.500"
          mb={1}
        >
          {label}
        </Text>


        <HStack>

          <Input
            type="number"
            min={0}
            value={
              value === ""
                ? ""
                : value
            }
            onChange={
              e =>
                updateNutrition(
                  index,
                  field,
                  e.target.value
                )
            }
            onBlur={() =>
              commitNutrition(
                index,
                field
              )
            }
            borderRadius="12px"
            size="sm"
            bg="white"
          />


          <Text
            fontSize="xs"
            color="gray.500"
          >
            {unit}
          </Text>

        </HStack>

      </Box>

    );

  };


  return (

    <Drawer
      placement="bottom"
      isOpen={isOpen}
      onClose={onClose}
    >

      <DrawerOverlay
        bg="blackAlpha.400"
      />


      <DrawerContent
        borderTopRadius="30px"
        maxH="94vh"
        bg="white"
      >

        {/* --------------------------------
            HEADER
        --------------------------------- */}

        <DrawerHeader>

          <HStack
            justify="space-between"
          >

            <Box>

              <Text
                fontSize="sm"
                color="gray.500"
                letterSpacing="1px"
              >
                NEKA AI SCAN
              </Text>


              <Text
                fontSize="2xl"
                fontWeight="800"
              >
                We found your meal
              </Text>

            </Box>


            <IconButton
              aria-label="Close"
              icon={
                <CloseIcon />
              }
              variant="ghost"
              onClick={
                onClose
              }
            />

          </HStack>

        </DrawerHeader>


        {/* --------------------------------
            BODY
        --------------------------------- */}

        <DrawerBody>

          <VStack
            align="stretch"
            spacing={5}
            pb={4}
          >

            {/* IMAGE */}

            {imageUrl && (

              <Image
                src={imageUrl}
                alt="Scanned meal"
                w="100%"
                h="180px"
                objectFit="cover"
                borderRadius="22px"
              />

            )}


            {/* INFO */}

            <Alert
              status="info"
              borderRadius="xl"
              bg="blue.50"
            >

              <AlertIcon />

              <Text
                fontSize="sm"
              >

                NEKA identified{" "}

                <b>
                  {editableItems.length}
                </b>{" "}

                food item
                {editableItems.length !== 1
                  ? "s"
                  : ""}.

                <br />

                Review the estimates
                before saving.

              </Text>

            </Alert>


            {/* --------------------------------
                FOOD ITEMS
            --------------------------------- */}

            {editableItems.length === 0 ? (

              <Box
                textAlign="center"
                py={8}
                bg="gray.50"
                borderRadius="2xl"
              >

                <Text
                  fontWeight="700"
                >
                  No food items
                </Text>

                <Text
                  mt={1}
                  fontSize="sm"
                  color="gray.500"
                >
                  Add a food manually below.
                </Text>

              </Box>

            ) : (

              editableItems.map(
                (
                  item,
                  index
                ) => {

                  const isEditing =
                    editingNutrition[
                      index
                    ] || false;


                  return (

                    <Box
                      key={
                        `${
                          item.foodId ??
                          item.id ??
                          item.name
                        }-${index}`
                      }
                      bg="white"
                      border="1px solid"
                      borderColor="gray.100"
                      borderRadius="2xl"
                      p={4}
                      boxShadow="sm"
                    >

                      {/* HEADER */}

                      <HStack
                        justify="space-between"
                        align="start"
                      >

                        <Box
                          flex={1}
                          pr={2}
                        >

                          <Text
                            fontWeight="800"
                            fontSize="md"
                          >
                            🍽️ {item.name}
                          </Text>


                          <HStack
                            mt={2}
                            spacing={2}
                            flexWrap="wrap"
                          >

                            {item.confidence !==
                              undefined && (

                              <Badge
                                colorScheme={
                                  getConfidenceColor(
                                    Number(
                                      item.confidence
                                    )
                                  )
                                }
                                borderRadius="full"
                              >
                                {Math.round(
                                  Number(
                                    item.confidence
                                  ) * 100
                                )}
                                % confidence
                              </Badge>

                            )}


                            <Badge
                              colorScheme={
                                item.source ===
                                "DATABASE"
                                  ? "blue"
                                  : "purple"
                              }
                              borderRadius="full"
                            >
                              {item.source ===
                              "DATABASE"
                                ? "NEKA Nutrition"
                                : "AI Estimate"}
                            </Badge>

                          </HStack>

                        </Box>


                        {/* REMOVE */}

                        <IconButton
                          aria-label={
                            `Remove ${item.name}`
                          }
                          icon={
                            <DeleteIcon />
                          }
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() =>
                            removeFood(
                              index
                            )
                          }
                        />

                      </HStack>


                      <Divider
                        my={4}
                      />


                      {/* PORTION */}

                      <HStack
                        align="end"
                      >

                        <Box flex={1}>

                          <Text
                            fontSize="xs"
                            color="gray.500"
                            mb={1}
                          >
                            Estimated portion
                          </Text>


                          <Input
                            type="number"
                            min={1}
                            value={
                              draftGrams[
                                index
                              ] ?? ""
                            }
                            onChange={
                              e => {

                                setDraftGrams(
                                  prev => ({
                                    ...prev,
                                    [index]:
                                      e.target.value,
                                  })
                                );

                              }
                            }
                            onBlur={() =>
                              commitGrams(
                                index
                              )
                            }
                            borderRadius="xl"
                          />

                        </Box>


                        <Text
                          fontWeight="700"
                          pb={3}
                        >
                          grams
                        </Text>

                      </HStack>


                      {/* NUTRITION SUMMARY */}

                      {!isEditing && (

                        <HStack
                          mt={4}
                          spacing={2}
                        >

                          <Box
                            flex={1}
                            bg="purple.50"
                            borderRadius="lg"
                            p={2}
                            textAlign="center"
                          >

                            <Text
                              fontSize="xs"
                              color="gray.500"
                            >
                              Protein
                            </Text>


                            <Text
                              fontWeight="700"
                            >
                              {Number(
                                item.protein || 0
                              ).toFixed(1)}
                              g
                            </Text>

                          </Box>


                          <Box
                            flex={1}
                            bg="orange.50"
                            borderRadius="lg"
                            p={2}
                            textAlign="center"
                          >

                            <Text
                              fontSize="xs"
                              color="gray.500"
                            >
                              Carbs
                            </Text>


                            <Text
                              fontWeight="700"
                            >
                              {Number(
                                item.carbs || 0
                              ).toFixed(1)}
                              g
                            </Text>

                          </Box>


                          <Box
                            flex={1}
                            bg="green.50"
                            borderRadius="lg"
                            p={2}
                            textAlign="center"
                          >

                            <Text
                              fontSize="xs"
                              color="gray.500"
                            >
                              Fat
                            </Text>


                            <Text
                              fontWeight="700"
                            >
                              {Number(
                                item.fats || 0
                              ).toFixed(1)}
                              g
                            </Text>

                          </Box>

                        </HStack>

                      )}


                      {/* EDIT NUTRITION */}

                      <Collapse
                        in={
                          isEditing
                        }
                        animateOpacity
                      >

                        <Box
                          mt={4}
                          p={3}
                          bg="gray.50"
                          borderRadius="xl"
                        >

                          <Text
                            fontSize="xs"
                            fontWeight="800"
                            color="gray.600"
                            mb={3}
                            textTransform="uppercase"
                            letterSpacing="1px"
                          >
                            Edit nutrition
                          </Text>


                          <VStack
                            spacing={3}
                            align="stretch"
                          >

                            <HStack>

                              <NutritionField
                                label="Calories"
                                value={
                                  item.calories
                                }
                                index={
                                  index
                                }
                                field="calories"
                                unit="kcal"
                              />


                              <NutritionField
                                label="Protein"
                                value={
                                  item.protein
                                }
                                index={
                                  index
                                }
                                field="protein"
                                unit="g"
                              />

                            </HStack>


                            <HStack>

                              <NutritionField
                                label="Carbs"
                                value={
                                  item.carbs
                                }
                                index={
                                  index
                                }
                                field="carbs"
                                unit="g"
                              />


                              <NutritionField
                                label="Fat"
                                value={
                                  item.fats
                                }
                                index={
                                  index
                                }
                                field="fats"
                                unit="g"
                              />

                            </HStack>


                            <NutritionField
                              label="Fiber"
                              value={
                                item.fiber
                              }
                              index={
                                index
                              }
                              field="fiber"
                              unit="g"
                            />

                          </VStack>

                        </Box>

                      </Collapse>


                      {/* EDIT BUTTON */}

                      <Button
                        mt={4}
                        size="sm"
                        variant="ghost"
                        leftIcon={
                          isEditing
                            ? <CheckIcon />
                            : <EditIcon />
                        }
                        colorScheme="blue"
                        onClick={() => {

                          setEditingNutrition(
                            prev => ({
                              ...prev,
                              [index]:
                                !isEditing,
                            })
                          );

                        }}
                      >

                        {isEditing
                          ? "Done editing"
                          : "Edit nutrition"}

                      </Button>

                    </Box>

                  );

                }

              )

            )}


            {/* --------------------------------
                ADD FOOD
            --------------------------------- */}

            <Box
              border="1px dashed"
              borderColor="blue.300"
              bg="blue.50"
              borderRadius="2xl"
              p={5}
              textAlign="center"
            >

              <Text
                fontWeight="800"
                fontSize="md"
              >
                Didn't catch something?
              </Text>


              <Text
                mt={1}
                fontSize="sm"
                color="gray.600"
              >
                Add any missing food to this
                meal before saving.
              </Text>


              <Button
                mt={4}
                leftIcon={
                  <AddIcon />
                }
                colorScheme="blue"
                borderRadius="full"
                onClick={
                  onAddFood
                }
              >
                Add food
              </Button>

            </Box>


            {/* --------------------------------
                TOTAL
            --------------------------------- */}

            <Box
              bg="gray.50"
              border="1px solid"
              borderColor="gray.100"
              borderRadius="2xl"
              p={5}
            >

              <Text
                fontSize="xs"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="1px"
              >
                Estimated meal
              </Text>


              <Text
                fontSize="4xl"
                fontWeight="900"
                color="brand.500"
                lineHeight="1"
                mt={2}
              >
                {Math.round(
                  calculatedTotal.calories
                )}
              </Text>


              <Text
                fontSize="sm"
                color="gray.500"
                mt={1}
              >
                kcal
              </Text>


              <HStack
                mt={5}
                spacing={2}
              >

                <Box
                  flex={1}
                  bg="white"
                  borderRadius="xl"
                  p={3}
                >

                  <Text
                    fontSize="xs"
                    color="gray.500"
                  >
                    Protein
                  </Text>

                  <Text
                    fontWeight="800"
                  >
                    {calculatedTotal.protein.toFixed(
                      1
                    )}
                    g
                  </Text>

                </Box>


                <Box
                  flex={1}
                  bg="white"
                  borderRadius="xl"
                  p={3}
                >

                  <Text
                    fontSize="xs"
                    color="gray.500"
                  >
                    Carbs
                  </Text>

                  <Text
                    fontWeight="800"
                  >
                    {calculatedTotal.carbs.toFixed(
                      1
                    )}
                    g
                  </Text>

                </Box>


                <Box
                  flex={1}
                  bg="white"
                  borderRadius="xl"
                  p={3}
                >

                  <Text
                    fontSize="xs"
                    color="gray.500"
                  >
                    Fat
                  </Text>

                  <Text
                    fontWeight="800"
                  >
                    {calculatedTotal.fats.toFixed(
                      1
                    )}
                    g
                  </Text>

                </Box>


                <Box
                  flex={1}
                  bg="white"
                  borderRadius="xl"
                  p={3}
                >

                  <Text
                    fontSize="xs"
                    color="gray.500"
                  >
                    Fiber
                  </Text>

                  <Text
                    fontWeight="800"
                  >
                    {calculatedTotal.fiber.toFixed(
                      1
                    )}
                    g
                  </Text>

                </Box>

              </HStack>

            </Box>

          </VStack>

        </DrawerBody>


        {/* --------------------------------
            FOOTER
        --------------------------------- */}

        <DrawerFooter>

          <Button
            w="100%"
            h="56px"
            bg="brand.500"
            color="white"
            borderRadius="18px"
            fontWeight="800"
            isLoading={
              loading
            }
            isDisabled={
              editableItems.length === 0
            }
            _hover={{
              bg: "brand.600",
            }}
            onClick={() =>
              onConfirm(
                editableItems
              )
            }
          >
            ✓ Add Scanned Meal
          </Button>

        </DrawerFooter>

      </DrawerContent>

    </Drawer>

  );

};


export default MealScanDrawer;