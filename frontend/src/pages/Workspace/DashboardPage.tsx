// Version 1

// import {
//   SimpleGrid,
//   VStack,
//   Heading
// } from "@chakra-ui/react";

// import {
//   Users,
//   Heart,
//   Target,
//   Mail
// } from "lucide-react";


// import MetricCard from "../../components/WorkspaceUI/MetricCard";
// import PageHeader from "../../components/WorkspaceUI/PageHeader";
// import InsightCard from "../../components/WorkspaceUI/InsightCard";

// import {getWorkspaceDashboard} from "../../services/workspace/dashboard.service";
// import { useEffect, useState } from "react";

// const DashboardPage = () => {

//     const [dashboard, setDashboard] =
//   useState<any>(null);

// const [loading, setLoading] =
//   useState(true);

// const [error, setError] =
//   useState("");

//   useEffect(() => {

//   loadDashboard();

// }, []);

// const loadDashboard = async () => {

//   try {

//     setLoading(true);

//     const data =
//       await getWorkspaceDashboard();

//     setDashboard(data);

//   }
//   catch {

//     setError(
//       "Unable to load workspace."
//     );

//   }
//   finally {

//     setLoading(false);

//   }

// };

// const insight =
//   dashboard?.quick_actions?.[0];

//   if (error) {

//   return (

//     <PageHeader
//       title="Dashboard"
//       subtitle={error}
//     />

//   );

// }

//   return (

    

//     <VStack
//       spacing={8}
//       align="stretch"
//     >

//       <PageHeader

//         title="Dashboard"

//         subtitle="Monitor your organization at a glance."

//       />

//       <SimpleGrid

//         columns={{
//           base: 1,
//           md: 2,
//           xl: 4
//         }}

//         spacing={6}

//       >

//         <MetricCard
//           title="Employees"
         
//           value={
//             dashboard?.summary ?.employees ?? 0}
//             loading={loading}
//           icon={Users}
//           footer="Loading..."
//         />

//         <MetricCard
//           title="Clients"
//             value={
//             dashboard?.summary ?.clients ?? 0}
//             loading={loading}
//           icon={Heart}
//           footer="Loading..."
//         />

//         <MetricCard
//           title="Assignments"
//                     value={
//             dashboard?.summary ?.assignments ?? 0}
//             loading={loading}
//           icon={Target}
//           footer="Loading..."
//         />

//         <MetricCard
//           title="Pending Invitations"
//                    value={
//             dashboard?.summary ?.pendingInvitations ?? 0}
//             loading={loading}
//           icon={Mail}
//           variant="warning"
//           footer="Loading..."
//         />

//       </SimpleGrid>

//       <VStack

//         align="stretch"

//         spacing={4}

//       >

//         <Heading
//           size="md"
//         >

//           Workspace Insights

//         </Heading>
// {/* 
//         <InsightCard

//           title="Everything looks good"

//           description="No pending invitations or client assignments."

//         /> */}
//         <InsightCard

//   title={
//     insight?.title ??
//     "Workspace"
//   }

//   description={
//     insight?.description ??
//     ""
//   }

// />

//       </VStack>

//     </VStack>

//   );

// };

// export default DashboardPage;


// Version 2 : Updated Version 1

import {
  SimpleGrid,
  VStack,
  Heading,

} from "@chakra-ui/react";

import {
  Users,
  Heart,
  Target,
  Mail,

  
} from "lucide-react";

// import {
//     ChevronLeftIcon
// } from "@chakra-ui/icons";

import {
  useEffect,
  useState
} from "react";





import MetricCard from "../../components/WorkspaceUI/MetricCard";
import PageHeader from "../../components/WorkspaceUI/PageHeader";
import InsightCard from "../../components/WorkspaceUI/InsightCard";
import ActivityTimeline from "../../components/WorkspaceUI/ActivityTimeline";

import {
  getWorkspaceDashboard,
  type OrganizationDashboard
} from "../../services/workspace/dashboard.service";
// import { useNavigate } from "react-router-dom";


const DashboardPage = () => {

  const [dashboard, setDashboard] =
    useState<OrganizationDashboard | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    // const navigate = useNavigate();

    // const {setOrganization} = useWorkspace();

  useEffect(() => {

    void loadDashboard();

  }, []);

  

  const loadDashboard = async () => {

    try {

      setLoading(true);

      const data =
        await getWorkspaceDashboard();

          // setOrganization(data.organization);

      setDashboard(data);

    } catch {

      setError(
        "Unable to load workspace."
      );

    } finally {

      setLoading(false);

    }

  };

  const insight =
    dashboard?.quick_actions?.[0];

  if (error) {

    return (

      <VStack
        spacing={8}
        align="stretch"
      >

        <PageHeader
          title="Dashboard"
          subtitle="Workspace overview."
        />

        <InsightCard
          title="Unable to load workspace"
          description={error}
        />

      </VStack>

    );

  }

  return (

    <VStack
      spacing={8}
      align="stretch"
    >

      {/* <PageHeader
        title={
          dashboard?.organization?.name ??
          "Dashboard"
        }
        subtitle="Monitor your workspace at a glance."
      /> */}
      {/* <PageHeader
    title={
        dashboard?.organization?.name ??
        "Dashboard"
    }

    subtitle={`${dashboard?.organization?.organization_type} • ${dashboard?.organization?.workspace_code}`}
 /> */}

{/* <VStack

    align="stretch"

    spacing={1}

>

    <Button

        leftIcon={<ChevronLeftIcon />}

        variant="ghost"

        justifyContent="flex-start"

        w="fit-content"

        color="gray.500"

        fontWeight="500"

        size="sm"

        _hover={{

            bg: "transparent",

            color: "blue.500"

        }}

        onClick={() =>
            navigate("/home")
        }

    >

        Back to NEKA

    </Button>

    <PageHeader

        title={
            dashboard?.organization?.name ??
            "Dashboard"
        }

        subtitle={`${dashboard?.organization?.organization_type} • ${dashboard?.organization?.workspace_code}`}

    />

</VStack> */}

      <SimpleGrid

        columns={{
          base: 1,
          md: 2,
          xl: 4
        }}

        spacing={6}

      >

        <MetricCard
          title="Employees"
          value={
            dashboard?.summary?.employees ?? 0
          }
          loading={loading}
          icon={Users}
          footer="Active employees"
        />

        <MetricCard
          title="Clients"
          value={
            dashboard?.summary?.clients ?? 0
          }
          loading={loading}
          icon={Heart}
          footer="Registered clients"
        />

        <MetricCard
          title="Active Assignments"
          value={
            dashboard?.summary?.active_assignments ?? 0
          }
          loading={loading}
          icon={Target}
          footer="Coach assignments"
        />

        <MetricCard
          title="Pending Invitations"
          value={
            (dashboard?.summary?.pending_employee_invitations ?? 0) +
            (dashboard?.summary?.pending_client_invitations ?? 0)
          }
          loading={loading}
          icon={Mail}
          variant="warning"
          footer="Awaiting acceptance"
        />

      </SimpleGrid>

      <VStack

        align="stretch"

        spacing={4}

      >

        <Heading
          size="md"
        >

          Workspace Insights

        </Heading>

        <InsightCard

          title={
            insight?.title ??
            "Everything looks good"
          }

          description={
            insight?.description ??
            "No pending actions."
          }

        />
        <VStack
  align="stretch"
  spacing={4}
>

  <Heading
    size="md"
  >

    Recent Activity

  </Heading>

  {/* <ActivityTimeline

    activities={
      dashboard?.recent_activity ?? []
    }

  /> */}

  <ActivityTimeline
    activities={
        dashboard?.recent_activity?.slice(0, 5) ?? []
    }
/>


</VStack>

      </VStack>

    </VStack>

  );

};

export default DashboardPage;