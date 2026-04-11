import { SimpleGrid } from "@chakra-ui/react";
import type { Recommendation } from "../../types/meal";
import RecommendationCard from "./RecommendationCard";

interface Props {
  data: Recommendation[];
}

const RecommendationList = ({ data }: Props) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={6} mt={8}>
      {data.map((item, index) => (
        <RecommendationCard key={index} data={item} />
      ))}
    </SimpleGrid>
  );
};

export default RecommendationList;