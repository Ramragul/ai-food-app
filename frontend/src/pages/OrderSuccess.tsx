import { Box, Text, VStack, Heading } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { type Order } from "../types/order";

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const order = state as Order;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box textAlign="center" mt={20}>
      <VStack spacing={4}>
        <Heading>✅ Order Placed!</Heading>
        <Text fontSize="lg">{order.recipe_name}</Text>
        <Text>Status: {order.status}</Text>
      </VStack>
    </Box>
  );
};

export default OrderSuccess;