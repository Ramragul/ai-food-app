import { useEffect, useState } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";
import type { Order } from "../types/order";
import api from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // const res = await fetch(
        //   "http://localhost:3004/api/orders/user/1"
        // );

        const res = await api.get(
          "/orders/user/1"
        );

       

        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Spinner size="lg" mt={10} />;

  return (
    <Box p={5}>
      <VStack spacing={4} align="start">
        {orders.map((order) => (
          <Box
            key={order.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            width="100%"
          >
            <Text fontWeight="bold">{order.recipe_name}</Text>
            <Text>Status: {order.status}</Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(order.created_at).toLocaleString()}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Orders;