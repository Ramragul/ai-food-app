import {
  Button,
  Text,
  VStack
} from "@chakra-ui/react";

interface Props {

  title: string;

  description?: string;

  actionLabel?: string;

  onAction?: () => void;

}

const EmptyState = ({

  title,

  description,

  actionLabel,

  onAction

}: Props) => (

  <VStack

    py={20}

    spacing={4}

  >

    <Text

      fontWeight="600"

      fontSize="lg"

    >

      {title}

    </Text>

    {

      description && (

        <Text

          color="gray.500"

          textAlign="center"

        >

          {description}

        </Text>

      )

    }

    {

      actionLabel && onAction && (

        <Button

          colorScheme="brand"

          onClick={onAction}

        >

          {actionLabel}

        </Button>

      )

    }

  </VStack>

);

export default EmptyState;