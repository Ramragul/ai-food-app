// Version 1

// import {
//   Box,
//   Text,
//   VStack,
//   Spinner
// } from "@chakra-ui/react";

// import {
//   useEffect,
//   useState
// } from "react";

// import {
//   useNavigate,
//   useParams
// } from "react-router-dom";

// import api from "../../utils/api";

// import FitnessGuideCard
// from "../../components/fitness/FitnessGuideCard";

// const FitnessCategoryPage = () => {

//   const { category } =
//     useParams();

//   const navigate =
//     useNavigate();

//   const [guides,
//     setGuides] =
//     useState([]);

//   const [loading,
//     setLoading] =
//     useState(true);

//   useEffect(() => {

//     loadGuides();

//   }, [category]);

//   const loadGuides =
//     async () => {

//       try {

//         const res =
//           await api.get(
//             `/fitness/guides?category=${category}`
//           );

//         setGuides(
//           res.data || []
//         );

//       } catch (err) {

//         console.error(err);

//       } finally {

//         setLoading(false);

//       }
//     };

//   if (loading) {

//     return (
//       <Box p={8}>
//         <Spinner />
//       </Box>
//     );
//   }

//   return (

//     <Box p={5}>

//       <Text
//         fontSize="2xl"
//         fontWeight="900"
//         mb={5}
//       >
//         💪 {category}
//       </Text>

//       <VStack
//         spacing={5}
//         align="stretch"
//       >

//         {guides.map(
//           (guide: any) => (

//             <FitnessGuideCard
//               key={guide.id}
//               guide={guide}
//               onClick={() =>
//                 navigate(
//                   `/fitness/guide/${guide.id}`
//                 )
//               }
//             />

//           )
//         )}

//       </VStack>

//     </Box>
//   );
// };

// export default FitnessCategoryPage;


// Version 2

import {
  Box,
  Text,
  VStack,
  Spinner,
  HStack,
  IconButton,
  Center
} from "@chakra-ui/react";

import {
  ArrowBackIcon
} from "@chakra-ui/icons";

import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../../utils/api";

import FitnessGuideCard
from "../../components/fitness/FitnessGuideCard";

const FitnessCategoryPage = () => {

  const { category } =
    useParams();

  const navigate =
    useNavigate();

  const [guides,
    setGuides] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    if (category) {
      loadGuides();
    }

  }, [category]);

  const loadGuides =
    async () => {

      try {

        setLoading(true);

        const res =
          await api.get(
            `/fitness/guides?category=${category}`
          );

        setGuides(
          res.data || []
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }
    };

  if (loading) {

    return (

      <Center h="70vh">

        <Spinner
          size="xl"
          color="brand.500"
          thickness="4px"
        />

      </Center>

    );
  }

  return (

    <Box
      p={5}
      bg="#f8fafc"
      minH="100vh"
    >

      <HStack
        mb={6}
        spacing={3}
      >

        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon />}
          borderRadius="full"
          onClick={() =>
            navigate(-1)
          }
        />

        <Text
          fontSize="2xl"
          fontWeight="900"
        >
          💪 {category}
        </Text>

      </HStack>

      {guides.length === 0 ? (

        <Box
          bg="white"
          borderRadius="3xl"
          p={8}
          textAlign="center"
        >

          <Text
            fontSize="lg"
            fontWeight="700"
          >
            No workouts available
          </Text>

          <Text
            mt={2}
            color="gray.500"
          >
            Guides will appear here soon.
          </Text>

        </Box>

      ) : (

        <VStack
          spacing={5}
          align="stretch"
        >

          {guides.map(
            (guide: any) => (

              <FitnessGuideCard
                key={guide.id}
                guide={guide}
                onClick={() =>
                  navigate(
                    `/fitness/guide/${guide.id}`
                  )
                }
              />

            )
          )}

        </VStack>

      )}

    </Box>

  );
};

export default FitnessCategoryPage;