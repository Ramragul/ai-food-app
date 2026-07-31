import type { BadgeProps } from "@chakra-ui/react";

export const getCategoryColor = (
    category: string
): BadgeProps["colorScheme"] => {

    switch (category.toUpperCase()) {

        case "GENERAL":
            return "gray";

        case "WORKOUT":
            return "blue";

        case "NUTRITION":
            return "green";

        case "ASSESSMENT":
            return "orange";

        case "CHECKIN":
            return "purple";

        case "MOTIVATION":
            return "pink";

        case "PROGRESS":
            return "cyan";

        default:
            return "gray";

    }

};