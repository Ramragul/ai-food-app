import {
  HStack,
  Icon,
  Text,
  Badge
} from "@chakra-ui/react";

import {
  NavLink
} from "react-router-dom";

import type {
  StaffNavigationItem
} from "../../config/navigation/staff.navigation";


interface Props {

  item: StaffNavigationItem;

  badgeCount?: number;

  onNavigate?: () => void;

}

const NavigationItem = ({
  item,
  badgeCount, onNavigate
}: Props) => {

  return (

    <NavLink
      to={item.path}
      onClick={onNavigate}
      style={{
    textDecoration: "none"
  }}
    >

      {({ isActive }) => (

        <HStack

          px={4}

          py={3}

          borderRadius="16px"

          cursor="pointer"

          transition="all .25s"

          bg={
            isActive
              ? "brand.50"
              : "transparent"
          }

          _hover={{

            bg: "brand.50",

            transform:
              "translateX(4px)"

          }}

          justify="space-between"

        >

          <HStack>

            <Icon

              as={item.icon}

              color={
                isActive
                  ? "brand.600"
                  : "gray.500"
              }

              boxSize={5}

            />

            <Text

              fontWeight={
                isActive
                  ? "600"
                  : "500"
              }

              color={
                isActive
                  ? "brand.700"
                  : "gray.700"
              }

            >

              {item.label}

            </Text>

          </HStack>

          {badgeCount !== undefined &&
            badgeCount > 0 && (

            <Badge

              colorScheme="blue"

              borderRadius="full"

            >

              {badgeCount}

            </Badge>

          )}

        </HStack>

      )}

    </NavLink>
  

  );

};

export default NavigationItem;