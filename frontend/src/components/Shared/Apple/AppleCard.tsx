import {
    Box,
    type BoxProps
} from "@chakra-ui/react";

type AppleCardProps = BoxProps;

const AppleCard = ({
    children,
    ...props
}: AppleCardProps) => {

    return (

        <Box
            bg="white"
            borderRadius="24px"
            p={{
                base: 5,
                md: 6
            }}
            border="1px solid"
            borderColor="gray.100"
            boxShadow="0 10px 35px rgba(15,23,42,0.06)"
            transition="all .25s ease"
            _hover={{
                transform: "translateY(-3px)",
                boxShadow:
                    "0 20px 45px rgba(15,23,42,0.10)"
            }}
            {...props}
        >

            {children}

        </Box>

    );

};

export default AppleCard;