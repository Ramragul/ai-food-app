import type { BadgeProps } from "@chakra-ui/react";

export const getRoleColor = (
    role: string
): BadgeProps["colorScheme"] => {

    switch (role.toUpperCase()) {

        case "OWNER":
            return "purple";

        case "ADMIN":
            return "red";

        case "TRAINER":
            return "blue";

        case "DIETITIAN":
            return "green";

        case "RECEPTIONIST":
            return "orange";

        case "CLIENT":
            return "gray";

        default:
            return "gray";

    }

};