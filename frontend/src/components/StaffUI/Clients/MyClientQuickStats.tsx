// import {
//     Box,
//     Grid,
//     Stat,
//     StatLabel,
//     StatNumber
// } from "@chakra-ui/react";

// import type { ClientDetails } from "../../../services/staff/client.types";

// interface Props {
//     client: ClientDetails;
// }

// const StatItem = ({
//     label,
//     value
// }: {
//     label: string;
//     value: string | number;
// }) => (

//     <Box
//         bg="white"
//         borderRadius="xl"
//         borderWidth="1px"
//         borderColor="gray.200"
//         p={5}
//     >

//         <Stat>

//             <StatLabel>

//                 {label}

//             </StatLabel>

//             <StatNumber>

//                 {value}

//             </StatNumber>

//         </Stat>

//     </Box>

// );

// const MyClientQuickStats = ({ client }: Props) => {

//     return (

//         <Grid

//             templateColumns={{

//                 base: "repeat(2,1fr)",

//                 xl: "repeat(4,1fr)"

//             }}

//             gap={5}

//         >

//             <StatItem
//                 label="Weight"
//                 value={`${client.fitness_profile.weight_kg} kg`}
//             />

//             <StatItem
//                 label="Target"
//                 value={`${client.fitness_profile.target_weight} kg`}
//             />

//             <StatItem
//                 label="Calories"
//                 value={
//                     client.today
//                         ? client.today.consumed.calories
//                         : "--"
//                 }
//             />

//             <StatItem
//                 label="Protein"
//                 value={
//                     client.today
//                         ? `${client.today.consumed.protein} g`
//                         : "--"
//                 }
//             />

//         </Grid>

//     );

// };

// export default MyClientQuickStats;


// Version 2

import {
    Box,
    Grid,
    Stat,
    StatLabel,
    StatNumber
} from "@chakra-ui/react";

import type { ClientDetails } from "../../../services/staff/client.types";

interface Props {
    client: ClientDetails;
}

const StatItem = ({
    label,
    value
}: {
    label: string;
    value: string | number;
}) => (

    <Box
        bg="white"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="gray.200"
        p={5}
    >
        <Stat>

            <StatLabel>
                {label}
            </StatLabel>

            <StatNumber>
                {value}
            </StatNumber>

        </Stat>
    </Box>

);

const MyClientQuickStats = ({ client }: Props) => {

    const fitnessProfile = client.fitness_profile;

    return (

        <Grid
            templateColumns={{
                base: "repeat(2,1fr)",
                xl: "repeat(4,1fr)"
            }}
            gap={5}
        >

            <StatItem
                label="Weight"
                value={
                    fitnessProfile
                        ? `${fitnessProfile.weight_kg} kg`
                        : "--"
                }
            />

            <StatItem
                label="Target"
                value={
                    fitnessProfile
                        ? `${fitnessProfile.target_weight} kg`
                        : "--"
                }
            />

            <StatItem
                label="Calories"
                value={
                    client.today
                        ? client.today.consumed.calories
                        : "--"
                }
            />

            <StatItem
                label="Protein"
                value={
                    client.today
                        ? `${client.today.consumed.protein} g`
                        : "--"
                }
            />

        </Grid>

    );

};

export default MyClientQuickStats;