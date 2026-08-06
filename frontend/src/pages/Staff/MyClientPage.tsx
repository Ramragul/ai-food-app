// import {
//     Grid,
//     VStack,
//     HStack,
//     Button,
//     Box
// } from "@chakra-ui/react";

// import {
//     useEffect,
//     useState
// } from "react";



// import LoadingState from "../../components/Shared/LoadingState";

// import MyClientHeader from "../../components/StaffUI/Clients/MyClientHeader";
// import MyClientQuickStats from "../../components/StaffUI/Clients/MyClientQuickStats";
// // import MyClientProfileCard from "../../components/StaffUI/Clients/MyClientProfileCard";
// // import MyClientNutritionCard from "../../components/StaffUI/Clients/MyClientNutritionCard";
// // import MyClientCoachNotes from "../../components/StaffUI/Clients/MyClientCoachNotes";
// // import MyClientPermissions from "../../components/StaffUI/Clients/MyClientPermissions";

// import {
    
//     getClientDetails
// } from "../../services/staff/client.service";

// import type { ClientDetails } from "../../services/staff/client.types";
// import MyClientProfileCard from "../../components/StaffUI/Clients/MyProfileCard";
// import MyClientNutritionCard from "../../components/StaffUI/Clients/MyClientNutritionCard";
// import MyClientCoachNotes from "../../components/StaffUI/Clients/MyClientCoachNotes";
// import MyClientPermissions from "../../components/StaffUI/Clients/MyClientPermissions";

// import NutritionOverview from "../../components/StaffUI/Clients/Nutrition/NutritionOverview";


// import {
//     useNavigate,
//     useParams
// } from "react-router-dom";



// import { FiArrowLeft } from "react-icons/fi";
// import CoachNotes from "../../components/StaffUI/Clients/CoachNotes/CoachNotes";

// import GoalAssignment from "../../components/StaffUI/Clients/GoalAssignment/GoalAssignment";

// const MyClientPage = () => {

//     const { memberId } = useParams();

//     const navigate = useNavigate();

//     const [client, setClient] =
//         useState<ClientDetails | null>(null);

//     const [loading, setLoading] =
//         useState(true);

//     useEffect(() => {

//         if (!memberId) {
//             return;
//         }

//         loadClient();

//     }, [memberId]);

//     const loadClient = async () => {

//         try {

//             console.log("load client is loading")

//             const data =
//                 await getClientDetails(
//                     Number(memberId)
//                 );

//                 console.log("data is " +JSON.stringify(data))

//             setClient(data);

//         }

//         finally {

//             setLoading(false);

//         }

//     };

//     if (loading) {

//         return (
//             <LoadingState
//                 message="Loading client..."
//             />
//         );

//     }

   

//     if (!client) {

//         return null;

//     }

    

//     return (

// <>


//         <VStack
//             spacing={6}
//             align="stretch"
//         >
              

// <Box
//     position="sticky"
//     top="72px"
//     zIndex={90}
//     bg="gray.50"
//     py={3}
//     mb={2}
// >
//     <Button
//         leftIcon={<FiArrowLeft />}
//         variant="ghost"
//         onClick={() => navigate(-1)}
//     >
//         Back
//     </Button>
// </Box>



//             <MyClientHeader
//                 client={client}
//             />



//             <MyClientQuickStats
//                 client={client}
//             />




// <Grid
//     templateColumns={{
//         base: "1fr",
//         xl: "1fr 1fr"
//     }}
//     gap={6}
// >

//     <MyClientProfileCard
//         client={client}
//     />

//     <MyClientNutritionCard
//         client={client}
//     />


// </Grid>

// <Box mt={6} w="100%">
//     <NutritionOverview
//         memberId={Number(memberId)}
//     />
// </Box>

// {client.permissions.can_create_goal && (
//     <Box mt={6}>
//         <GoalAssignment
//             memberId={Number(memberId)}
//             client={client}
//             onSuccess={loadClient}
//         />
//     </Box>
// )}


//     {/* <VStack
//         spacing={6}
//         mt={6}
//     > */}

//         {/* <MyClientCoachNotes
//             client={client}
//         /> */}
 



     

//         <CoachNotes
//           memberId={Number(memberId)}
//         />

//         <MyClientPermissions
//             client={client}
//         />

//     {/* </VStack> */}

//         </VStack>
// </>
//     );

// };



// export default MyClientPage;



// Version 2

// import {
//     Grid,
//     VStack,
//     HStack,
//     Button,
//     Box
// } from "@chakra-ui/react";

// import {
//     useEffect,
//     useState
// } from "react";



// import LoadingState from "../../components/Shared/LoadingState";

// import MyClientHeader from "../../components/StaffUI/Clients/MyClientHeader";
// import MyClientQuickStats from "../../components/StaffUI/Clients/MyClientQuickStats";
// // import MyClientProfileCard from "../../components/StaffUI/Clients/MyClientProfileCard";
// // import MyClientNutritionCard from "../../components/StaffUI/Clients/MyClientNutritionCard";
// // import MyClientCoachNotes from "../../components/StaffUI/Clients/MyClientCoachNotes";
// // import MyClientPermissions from "../../components/StaffUI/Clients/MyClientPermissions";

// import {
    
//     getClientDetails
// } from "../../services/staff/client.service";

// import type { ClientDetails } from "../../services/staff/client.types";
// import MyClientProfileCard from "../../components/StaffUI/Clients/MyProfileCard";
// import MyClientNutritionCard from "../../components/StaffUI/Clients/MyClientNutritionCard";
// import MyClientCoachNotes from "../../components/StaffUI/Clients/MyClientCoachNotes";
// import MyClientPermissions from "../../components/StaffUI/Clients/MyClientPermissions";

// import NutritionOverview from "../../components/StaffUI/Clients/Nutrition/NutritionOverview";


// import {
//     useNavigate,
//     useParams
// } from "react-router-dom";



// import { FiArrowLeft } from "react-icons/fi";
// import CoachNotes from "../../components/StaffUI/Clients/CoachNotes/CoachNotes";

// import GoalAssignment from "../../components/StaffUI/Clients/GoalAssignment/GoalAssignment";

// const MyClientPage = () => {

//     const { memberId } = useParams();

//     const navigate = useNavigate();

//     const [client, setClient] =
//         useState<ClientDetails | null>(null);

//     const [loading, setLoading] =
//         useState(true);

//     useEffect(() => {

//         if (!memberId) {
//             return;
//         }

//         loadClient();

//     }, [memberId]);

//     const loadClient = async () => {

//         try {

//             console.log("load client is loading")

//             const data =
//                 await getClientDetails(
//                     Number(memberId)
//                 );

//                 console.log("data is " +JSON.stringify(data))

//             setClient(data);

//         }

//         finally {

//             setLoading(false);

//         }

//     };

//     if (loading) {

//         return (
//             <LoadingState
//                 message="Loading client..."
//             />
//         );

//     }

   

//     if (!client) {

//         return null;

//     }

    

//     return (

// <>


//         <VStack
//             spacing={6}
//             align="stretch"
//         >
              

// <Box
//     position="sticky"
//     top="72px"
//     zIndex={90}
//     bg="gray.50"
//     py={3}
//     mb={2}
// >
//     <Button
//         leftIcon={<FiArrowLeft />}
//         variant="ghost"
//         onClick={() => navigate(-1)}
//     >
//         Back
//     </Button>
// </Box>



//             <MyClientHeader
//                 client={client}
//             />



//             <MyClientQuickStats
//                 client={client}
//             />


// {client.consent.granted ? (

//     <>

//         <Grid
//             templateColumns={{
//                 base: "1fr",
//                 xl: "1fr 1fr"
//             }}
//             gap={6}
//         >

//             <MyClientProfileCard
//                 client={client}
//             />

//             <MyClientNutritionCard
//                 client={client}
//             />

//         </Grid>

//         <Box mt={6} w="100%">
//             <NutritionOverview
//                 memberId={Number(memberId)}
//             />
//         </Box>

//         {client?.permissions?.can_create_goal && (
//             <Box mt={6}>
//                 <GoalAssignment
//                     memberId={Number(memberId)}
//                     client={client}
//                     onSuccess={loadClient}
//                 />
//             </Box>
//         )}

//         <CoachNotes
//             memberId={Number(memberId)}
//         />

//         <MyClientPermissions
//             client={client}
//         />

//     </>

// ) : (

//     <Box
//         mt={2}
//         bg="white"
//         borderRadius="3xl"
//         p={10}
//         boxShadow="sm"
//         border="1px solid"
//         borderColor="gray.200"
//         textAlign="center"
//     >

//         <Box
//             fontSize="64px"
//             mb={4}
//         >
//             🔒
//         </Box>

//         <Box
//             fontSize="2xl"
//             fontWeight="800"
//             color="gray.800"
//         >
//             Health Data Access Pending
//         </Box>

//         <Box
//             mt={4}
//             color="gray.600"
//             fontSize="md"
//             maxW="600px"
//             mx="auto"
//             lineHeight="tall"
//         >
//             <strong>{client.client.name}</strong> hasn't granted consent to share
//             health and nutrition information with you yet.
//             <br /><br />
//             Until consent is provided, personal health information remains
//             private and cannot be viewed by coaches.
//         </Box>

//         <Grid
//             mt={8}
//             templateColumns={{
//                 base: "1fr",
//                 md: "repeat(2, 1fr)"
//             }}
//             gap={4}
//         >

//             <Box
//                 p={4}
//                 borderRadius="xl"
//                 bg="gray.50"
//             >
//                 🥗 Nutrition Tracking
//             </Box>

//             <Box
//                 p={4}
//                 borderRadius="xl"
//                 bg="gray.50"
//             >
//                 🎯 Goal Assignment
//             </Box>

//             <Box
//                 p={4}
//                 borderRadius="xl"
//                 bg="gray.50"
//             >
//                 📈 Progress Analytics
//             </Box>

//             <Box
//                 p={4}
//                 borderRadius="xl"
//                 bg="gray.50"
//             >
//                 📝 Coach Notes
//             </Box>

//         </Grid>

//         <Box
//             mt={8}
//             color="blue.600"
//             fontWeight="600"
//         >
//             Waiting for client approval...
//         </Box>

//     </Box>

// )}




// <Grid
//     templateColumns={{
//         base: "1fr",
//         xl: "1fr 1fr"
//     }}
//     gap={6}
// >

//     <MyClientProfileCard
//         client={client}
//     />

//     <MyClientNutritionCard
//         client={client}
//     />


// </Grid>

// <Box mt={6} w="100%">
//     <NutritionOverview
//         memberId={Number(memberId)}
//     />
// </Box>

// {client.permissions?.can_create_goal && (
//     <Box mt={6}>
//         <GoalAssignment
//             memberId={Number(memberId)}
//             client={client}
//             onSuccess={loadClient}
//         />
//     </Box>
// )}


//     {/* <VStack
//         spacing={6}
//         mt={6}
//     > */}

//         {/* <MyClientCoachNotes
//             client={client}
//         /> */}
 



     

//         <CoachNotes
//           memberId={Number(memberId)}
//         />

//         <MyClientPermissions
//             client={client}
//         />

//     {/* </VStack> */}

//         </VStack>
// </>
//     );

// };



// export default MyClientPage;








// Version 3

import {
    Grid,
    VStack,
    Button,
    Box
} from "@chakra-ui/react";

import {
    useEffect,
    useState
} from "react";



import LoadingState from "../../components/Shared/LoadingState";

import MyClientHeader from "../../components/StaffUI/Clients/MyClientHeader";
import MyClientQuickStats from "../../components/StaffUI/Clients/MyClientQuickStats";
// import MyClientProfileCard from "../../components/StaffUI/Clients/MyClientProfileCard";
// import MyClientNutritionCard from "../../components/StaffUI/Clients/MyClientNutritionCard";
// // import MyClientPermissions from "../../components/StaffUI/Clients/MyClientPermissions";

import {
    
    getClientDetails
} from "../../services/staff/client.service";

import type { ClientDetails } from "../../services/staff/client.types";
import MyClientProfileCard from "../../components/StaffUI/Clients/MyProfileCard";
import MyClientNutritionCard from "../../components/StaffUI/Clients/MyClientNutritionCard";
import MyClientPermissions from "../../components/StaffUI/Clients/MyClientPermissions";

import NutritionOverview from "../../components/StaffUI/Clients/Nutrition/NutritionOverview";


import {
    useNavigate,
    useParams
} from "react-router-dom";



import { FiArrowLeft } from "react-icons/fi";
import CoachNotes from "../../components/StaffUI/Clients/CoachNotes/CoachNotes";

import GoalAssignment from "../../components/StaffUI/Clients/GoalAssignment/GoalAssignment";

const MyClientPage = () => {

    const { memberId } = useParams();

    const navigate = useNavigate();

    const [client, setClient] =
        useState<ClientDetails | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        if (!memberId) {
            return;
        }

        loadClient();

    }, [memberId]);

    const loadClient = async () => {

        try {

            const data =
                await getClientDetails(
                    Number(memberId)
                );

            setClient(data);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <LoadingState
                message="Loading client..."
            />
        );

    }

   

    if (!client) {

        return null;

    }

    

    return (

<>


        <VStack
            spacing={6}
            align="stretch"
        >
              

<Box
    position="sticky"
    top="72px"
    zIndex={90}
    bg="gray.50"
    py={3}
    mb={2}
>
    <Button
        leftIcon={<FiArrowLeft />}
        variant="ghost"
        onClick={() => navigate(-1)}
    >
        Back
    </Button>
</Box>



            <MyClientHeader
                client={client}
            />



            <MyClientQuickStats
                client={client}
            />


{client.consent.granted ? (

    <>

        <Grid
            templateColumns={{
                base: "1fr",
                xl: "1fr 1fr"
            }}
            gap={6}
        >

            <MyClientProfileCard
                client={client}
            />

            <MyClientNutritionCard
                client={client}
            />

        </Grid>

        <Box mt={6} w="100%">
            <NutritionOverview
                memberId={Number(memberId)}
            />
        </Box>

        {client?.permissions?.can_create_goal && (
            <Box mt={6}>
                <GoalAssignment
                    memberId={Number(memberId)}
                    client={client}
                    onSuccess={loadClient}
                />
            </Box>
        )}

        <CoachNotes
            memberId={Number(memberId)}
        />

        <MyClientPermissions
            client={client}
        />

    </>

) : (

    <Box
        mt={2}
        bg="white"
        borderRadius="3xl"
        p={10}
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.200"
        textAlign="center"
    >

        <Box
            fontSize="64px"
            mb={4}
        >
            🔒
        </Box>

        <Box
            fontSize="2xl"
            fontWeight="800"
            color="gray.800"
        >
            Health Data Access Pending
        </Box>

        <Box
            mt={4}
            color="gray.600"
            fontSize="md"
            maxW="600px"
            mx="auto"
            lineHeight="tall"
        >
            <strong>{client.client.name}</strong> hasn't granted consent to share
            health and nutrition information with you yet.
            <br /><br />
            Until consent is provided, personal health information remains
            private and cannot be viewed by coaches.
        </Box>

        <Grid
            mt={8}
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)"
            }}
            gap={4}
        >

            <Box
                p={4}
                borderRadius="xl"
                bg="gray.50"
            >
                🥗 Nutrition Tracking
            </Box>

            <Box
                p={4}
                borderRadius="xl"
                bg="gray.50"
            >
                🎯 Goal Assignment
            </Box>

            <Box
                p={4}
                borderRadius="xl"
                bg="gray.50"
            >
                📈 Progress Analytics
            </Box>

            <Box
                p={4}
                borderRadius="xl"
                bg="gray.50"
            >
                📝 Coach Notes
            </Box>

        </Grid>

        <Box
            mt={8}
            color="blue.600"
            fontWeight="600"
        >
            Waiting for client approval...
        </Box>

    </Box>

)}



        </VStack>
</>
    );

};



export default MyClientPage;