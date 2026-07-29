import {
  SimpleGrid,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  FiPlusCircle,
  FiCamera,
  FiDroplet,
  FiActivity,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import AppleCard from "../apple/AppleCard";

const actions = [
  {
    label: "Meal",
    icon: FiPlusCircle,
    route: "/add-meal",
  },
  {
    label: "Scan",
    icon: FiCamera,
    disabled: true,
  },
  {
    label: "Water",
    icon: FiDroplet,
    disabled: true,
  },
  {
    label: "Weight",
    icon: FiActivity,
    disabled: true,
  },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      spacing={4}
      mb={6}
    >
      {actions.map((action) => (
        <AppleCard
          key={action.label}
          cursor={action.disabled ? "default" : "pointer"}
          opacity={action.disabled ? 0.55 : 1}
          textAlign="center"
          onClick={() =>
            !action.disabled &&
            navigate(action.route!)
          }
        >
          <VStack spacing={3}>
            <Icon
              as={action.icon}
              boxSize={7}
              color="brand.500"
            />

            <Text
              fontWeight="700"
              fontSize="sm"
            >
              {action.label}
            </Text>
          </VStack>
        </AppleCard>
      ))}
    </SimpleGrid>
  );
};

export default QuickActions;