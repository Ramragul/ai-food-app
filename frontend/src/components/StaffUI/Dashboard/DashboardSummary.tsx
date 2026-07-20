import {
  Grid
} from "@chakra-ui/react";

import SummaryCard from "./SummaryCard";

import type {
  DashboardSummary as DashboardSummaryType
} from "../../../services/staff/dashboard.service";

interface Props {

  summary:
    DashboardSummaryType;

}

const DashboardSummary = ({
  summary
}: Props) => {

  return (

    <Grid

      templateColumns={{

        base: "1fr",

        md: "repeat(2,1fr)",

        xl: "repeat(4,1fr)"

      }}

      gap={6}

    >

      <SummaryCard

        title="Clients"

        value={
          summary.total_clients
        }

      />

      <SummaryCard

        title="Goals"

        value={
          summary.active_goals
        }

      />

      <SummaryCard

        title="Logged Today"

        value={
          summary.clients_logged_today
        }

      />

      <SummaryCard

        title="Pending"

        value={
          summary.clients_pending
        }

      />

    </Grid>

  );

};

export default DashboardSummary;