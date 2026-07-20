import {
    Grid,
    VStack,
    HStack,
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
// import MyClientCoachNotes from "../../components/StaffUI/Clients/MyClientCoachNotes";
// import MyClientPermissions from "../../components/StaffUI/Clients/MyClientPermissions";

import {
    
    getClientDetails
} from "../../services/staff/client.service";

import type { ClientDetails } from "../../services/staff/client.types";
import MyClientProfileCard from "../../components/StaffUI/Clients/MyProfileCard";
import MyClientNutritionCard from "../../components/StaffUI/Clients/MyClientNutritionCard";
import MyClientCoachNotes from "../../components/StaffUI/Clients/MyClientCoachNotes";
import MyClientPermissions from "../../components/StaffUI/Clients/MyClientPermissions";


import {
    useNavigate,
    useParams
} from "react-router-dom";



import { FiArrowLeft } from "react-icons/fi";
import CoachNotes from "../../components/StaffUI/Clients/CoachNotes/CoachNotes";

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
    {/* <VStack
        spacing={6}
        mt={6}
    > */}

        {/* <MyClientCoachNotes
            client={client}
        /> */}
 



     

        <CoachNotes
          memberId={Number(memberId)}
        />

        <MyClientPermissions
            client={client}
        />

    {/* </VStack> */}

        </VStack>
</>
    );

};



export default MyClientPage;