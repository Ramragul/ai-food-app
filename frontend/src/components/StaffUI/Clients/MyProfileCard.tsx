// Version 1

// import {
//     Badge,
//     Box,
//     Divider,
//     Heading,
//     HStack,
//     SimpleGrid,
//     Text,
//     VStack
// } from "@chakra-ui/react";

// import type {
//     ClientDetails
// } from "../../../services/staff/client.types";

// interface Props {
//     client: ClientDetails;
// }

// const capitalize = (value: string) =>
//     value?.charAt(0).toUpperCase() + value?.slice(1);

// const formatGoal = (goal: string) =>
//     goal
//         .split("_")
//         .map(
//             word =>
//                 word.charAt(0).toUpperCase() +
//                 word.slice(1)
//         )
//         .join(" ");

// const ProfileItem = ({
//     label,
//     value
// }: {
//     label: string;
//     value: string | number;
// }) => (

//     <VStack
//         align="start"
//         spacing={1}
//     >
//         <Text
//             fontSize="sm"
//             color="gray.500"
//         >
//             {label}
//         </Text>

//         <Text
//             fontWeight="600"
//             fontSize="md"
//         >
//             {value}
//         </Text>
//     </VStack>

// );

// const MyClientProfileCard = ({
//     client
// }: Props) => {

//     const profile = client.fitness_profile;

//     return (

//         <Box
//             bg="white"
//             borderRadius="xl"
//             borderWidth="1px"
//             borderColor="gray.200"
//             shadow="sm"
//             p={6}
//         >

//             <HStack
//                 justify="space-between"
//                 mb={5}
//             >

//                 <Heading size="md">

//                     Fitness Profile

//                 </Heading>

//                 <Badge
//                     colorScheme="purple"
//                 >

//                     {formatGoal(profile.goal_type)}

//                 </Badge>

//             </HStack>

//             <Divider mb={6} />

//             <SimpleGrid
//                 columns={{
//                     base: 1,
//                     md: 2
//                 }}
//                 spacing={6}
//             >

//                 <ProfileItem
//                     label="Height"
//                     value={`${profile.height_cm} cm`}
//                 />

//                 <ProfileItem
//                     label="Current Weight"
//                     value={`${profile.weight_kg} kg`}
//                 />

//                 <ProfileItem
//                     label="Target Weight"
//                     value={`${profile.target_weight} kg`}
//                 />

//                 <ProfileItem
//                     label="Activity Level"
//                     value={capitalize(profile.activity_level)}
//                 />

//                 <ProfileItem
//                     label="Duration"
//                     value={`${profile.duration_days} Days`}
//                 />

//                 <ProfileItem
//                     label="Food Preference"
//                     value={capitalize(profile.food_preference)}
//                 />

//                 <ProfileItem
//                     label="Goal Mode"
//                     value={profile.goal_mode}
//                 />

//                 <ProfileItem
//                     label="Target Source"
//                     value={profile.target_source}
//                 />

//             </SimpleGrid>

//         </Box>

//     );

// };

// export default MyClientProfileCard;



// Version 2

import {
    Badge,
    Box,
    Divider,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    VStack
} from "@chakra-ui/react";

import type {
    ClientDetails
} from "../../../services/staff/client.types";

interface Props {
    client: ClientDetails;
}

const capitalize = (value?: string) =>
    value
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : "-";

const formatGoal = (goal?: string) =>
    goal
        ? goal
              .split("_")
              .map(
                  word =>
                      word.charAt(0).toUpperCase() +
                      word.slice(1)
              )
              .join(" ")
        : "-";

const ProfileItem = ({
    icon,
    label,
    value
}: {
    icon: string;
    label: string;
    value: string | number;
}) => (
    <Box
        bg="gray.50"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="xl"
        p={4}
        transition="all .2s"
        _hover={{
            bg: "white",
            shadow: "md",
            transform: "translateY(-2px)"
        }}
    >
        <HStack
            align="start"
            spacing={3}
        >
            <Text
                fontSize="xl"
                mt="2px"
            >
                {icon}
            </Text>

            <VStack
                align="start"
                spacing={0}
            >
                <Text
                    fontSize="xs"
                    color="gray.500"
                    textTransform="uppercase"
                    letterSpacing="0.08em"
                >
                    {label}
                </Text>

                <Text
                    fontSize="md"
                    fontWeight="700"
                    color="gray.800"
                >
                    {value}
                </Text>
            </VStack>
        </HStack>
    </Box>
);

const MyClientProfileCard = ({
    client
}: Props) => {

    const profile = client.fitness_profile;

    return (
        <Box
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            shadow="sm"
            overflow="hidden"
        >
            {/* Header */}

            <Box
                px={6}
                py={5}
                bg="linear-gradient(135deg, #f8fbff 0%, #eef6ff 100%)"
            >
                <HStack
                    justify="space-between"
                    align="center"
                >
                    <VStack
                        align="start"
                        spacing={1}
                    >
                        <Heading
                            size="md"
                            color="gray.800"
                        >
                            Fitness Profile
                        </Heading>

                        <Text
                            fontSize="sm"
                            color="gray.500"
                        >
                            Current health & lifestyle information
                        </Text>
                    </VStack>

                    <Badge
                        px={4}
                        py={2}
                        borderRadius="full"
                        colorScheme="purple"
                        fontSize="0.8rem"
                        textTransform="none"
                    >
                        🎯 {formatGoal(profile.goal_type)}
                    </Badge>
                </HStack>
            </Box>

            <Divider />

            <Box p={6}>
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2
                    }}
                    spacing={5}
                >
                    <ProfileItem
                        icon="📏"
                        label="Height"
                        value={`${profile.height_cm} cm`}
                    />

                    <ProfileItem
                        icon="⚖️"
                        label="Current Weight"
                        value={`${profile.weight_kg} kg`}
                    />

                    <ProfileItem
                        icon="🎯"
                        label="Target Weight"
                        value={`${profile.target_weight} kg`}
                    />

                    <ProfileItem
                        icon="🏃"
                        label="Activity Level"
                        value={capitalize(profile.activity_level)}
                    />

                    <ProfileItem
                        icon="📅"
                        label="Program Duration"
                        value={`${profile.duration_days} Days`}
                    />

                    <ProfileItem
                        icon="🥗"
                        label="Food Preference"
                        value={capitalize(profile.food_preference)}
                    />

                    <ProfileItem
                        icon="⚡"
                        label="Goal Mode"
                        value={capitalize(profile.goal_mode)}
                    />

                    <ProfileItem
                        icon="📊"
                        label="Target Source"
                        value={capitalize(profile.target_source)}
                    />
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default MyClientProfileCard;