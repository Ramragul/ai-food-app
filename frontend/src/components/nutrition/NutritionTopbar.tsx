// import {
//   Box,
//   Button,
//   HStack,
//   Text,
// } from "@chakra-ui/react";

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const NutritionTopBar = () => {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   if (user) {
//     return null;
//   }

//   return (
//     <HStack
//       justify="flex-end"
//       spacing={2}
//       mb={2}
//     >
//       <Button
//         variant="ghost"
//         size="sm"
//         color="gray.600"
//         fontWeight="600"
//         onClick={() => navigate("/login")}
//       >
//         Log in
//       </Button>

//       <Button
//         size="sm"
//         colorScheme="blue"
//         borderRadius="full"
//         px={4}
//         onClick={() => navigate("/login")}
//       >
//         Get started free
//       </Button>
//     </HStack>
//   );
// };

// export default NutritionTopBar;


// Version 2

import {
  Button,
  HStack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NutritionTopBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <HStack
      justify={user ? "flex-start" : "flex-end"}
      spacing={2}
      mb={2}
    >

      {user ? (

        <Button
          variant="ghost"
          size="sm"
          color="gray.600"
          fontWeight="600"
          onClick={() => navigate("/home")}
        >
          ← Dashboard
        </Button>

      ) : (

        <>
          <Button
            variant="ghost"
            size="sm"
            color="gray.600"
            fontWeight="600"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>

          <Button
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            px={4}
            onClick={() => navigate("/login")}
          >
            Get started free
          </Button>
        </>

      )}

    </HStack>
  );
};

export default NutritionTopBar;