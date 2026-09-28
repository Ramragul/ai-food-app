import { Badge, HStack, Icon, Text } from "@chakra-ui/react";
import { FiClock, FiRepeat, FiTarget } from "react-icons/fi";

interface Props {
  duration?: number | null;
  exerciseCount?: number | null;
  goal?: string | null;
}

const WorkoutMeta = ({ duration, exerciseCount, goal }: Props) => (
  <HStack spacing={2} flexWrap="wrap">
    {exerciseCount ? (
      <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>
        <HStack spacing={1}>
          <Icon as={FiRepeat} boxSize={3.5} />
          <Text fontSize="xs">{exerciseCount} exercises</Text>
        </HStack>
      </Badge>
    ) : null}

    {duration ? (
      <Badge colorScheme="gray" borderRadius="full" px={3} py={1}>
        <HStack spacing={1}>
          <Icon as={FiClock} boxSize={3.5} />
          <Text fontSize="xs">~{duration} min</Text>
        </HStack>
      </Badge>
    ) : null}

    {goal ? (
      <Badge colorScheme="purple" borderRadius="full" px={3} py={1}>
        <HStack spacing={1}>
          <Icon as={FiTarget} boxSize={3.5} />
          <Text fontSize="xs">{goal}</Text>
        </HStack>
      </Badge>
    ) : null}
  </HStack>
);

export default WorkoutMeta;
