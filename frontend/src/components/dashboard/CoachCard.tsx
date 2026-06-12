// Version 1

// import {
//   Box,
//   Text,
//   VStack
// } from "@chakra-ui/react";

// interface Props {
//   data: any;
// }

// const CoachCard = ({
//   data
// }: Props) => {

//   let title =
//     "🔥 Great Job";

//   let message =
//     "You're on track today.";

//   if (
//     data.remaining?.protein >
//     50
//   ) {

//     title =
//       "💪 Protein Needed";

//     message = `
// Need ${Math.round(
//   data.remaining.protein
// )}g more protein today.
//     `;
//   }

//   else if (
//     data.remaining?.calories <
//     300
//   ) {

//     title =
//       "🎯 Almost There";

//     message =
//       "You're very close to your calorie target.";
//   }

//   return (
//     <Box
//       mt={5}
//       bg="linear-gradient(
//       135deg,
//       #bfdbfe,
//       #93c5fd
//       )"
//       color="gray.800"
//       borderRadius="3xl"
//       p={5}
//     >

//       <VStack
//         align="stretch"
//         spacing={2}
//       >

//         <Text
//           fontWeight="800"
//           fontSize="lg"
//         >
//           {title}
//         </Text>

//         <Text>
//           {message}
//         </Text>

//       </VStack>

//     </Box>
//   );
// };

// export default CoachCard;


// Version 2

import {
  Box,
  Text,
  VStack,
  HStack,
  Badge
} from "@chakra-ui/react";

interface Props {
  data: any;
}

const CoachCard = ({
  data
}: Props) => {

  const goalType =
    data.goalInfo?.goalType;

  const remaining =
    data.remaining || {};

  const consumed =
    data.consumed || 0;

  const target =
    data.target || 0;

  let title =
    "🏆 Great Progress";

  let message =
    "You're on track today. Keep going!";

  let badgeColor =
    "green";

  /* -------------------------------- */
  /* OVER TARGET */
  /* -------------------------------- */

  if (
    data.status ===
    "OVER_TARGET"
  ) {

    title =
      "🚶 Recovery Insight";

    message =
      "You've exceeded today's calorie target. A short walk and lighter next meal can help balance things.";

    badgeColor =
      "red";
  }

  /* -------------------------------- */
  /* LEAN MUSCLE GAIN */
  /* -------------------------------- */

  else if (
    goalType ===
    "lean_muscle_gain"
  ) {

    if (
      remaining.protein > 50
    ) {

      title =
        "💪 Muscle Gain Insight";

      message =
        `You're still ${Math.round(
          remaining.protein
        )}g away from your protein target. Focus on protein-rich foods in your remaining meals.`;

      badgeColor =
        "purple";
    }

    else if (
      consumed <
      target * 0.5
    ) {

      title =
        "🍽️ Fuel Up";

      message =
        "You're below halfway toward today's calorie target. Add quality calories to support muscle growth.";

      badgeColor =
        "blue";
    }

    else {

      title =
        "🚀 Lean Gain On Track";

      message =
        "Calories and protein intake are progressing well. Stay consistent through the rest of the day.";

      badgeColor =
        "green";
    }
  }

  /* -------------------------------- */
  /* FAT LOSS */
  /* -------------------------------- */

  else if (
    goalType ===
    "fat_loss"
  ) {

    if (
      remaining.protein > 40
    ) {

      title =
        "🥩 Protein Priority";

      message =
        `You still need ${Math.round(
          remaining.protein
        )}g protein today. Prioritizing protein helps preserve muscle while losing fat.`;

      badgeColor =
        "orange";
    }

    else {

      title =
        "🔥 Fat Loss Progress";

      message =
        "You're progressing well toward your calorie target. Stay hydrated and focus on high-protein foods.";

      badgeColor =
        "green";
    }
  }

  /* -------------------------------- */
  /* CARBS LOW */
  /* -------------------------------- */

  else if (
    remaining.carbs > 100
  ) {

    title =
      "⚡ Energy Insight";

    message =
      `You're still ${Math.round(
        remaining.carbs
      )}g short on carbs. Consider fruits, oats, rice or potatoes to maintain energy levels.`;

    badgeColor =
      "blue";
  }

  /* -------------------------------- */
  /* ALMOST DONE */
  /* -------------------------------- */

  else if (
    remaining.calories < 300
  ) {

    title =
      "🎯 Almost There";

    message =
      "You're very close to today's calorie target. One balanced meal should get you there.";

    badgeColor =
      "green";
  }

  return (
    <Box
      mt={5}
      position="relative"
      overflow="hidden"
      bg="linear-gradient(
        135deg,
        #dbeafe,
        #bfdbfe
      )"
      borderRadius="3xl"
      p={5}
      boxShadow="
        0 12px 30px
        rgba(59,130,246,0.15)
      "
    >

      <Box
        position="absolute"
        top="-25px"
        right="-25px"
        w="100px"
        h="100px"
        borderRadius="full"
        bg="rgba(255,255,255,0.25)"
      />

      <VStack
        align="stretch"
        spacing={3}
      >

        <HStack
          justify="space-between"
        >

          <Text
            fontSize="lg"
            fontWeight="800"
          >
            {title}
          </Text>

          <Badge
            colorScheme={
              badgeColor
            }
            borderRadius="full"
            px={3}
            py={1}
          >
            NEKA COACH
          </Badge>

        </HStack>

        <Text
          color="gray.700"
          lineHeight="1.7"
        >
          {message}
        </Text>

      </VStack>

    </Box>
  );
};

export default CoachCard;