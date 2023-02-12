import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  NumberInputField,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  NumberInputStepper,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useCheckout } from "@candypay/react-checkout-pos";
import { useRouter } from "next/router";

export default function Simple() {
  const [value, setValue] = useState(5);
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const intentHandler = async () => {
    const { data } = await axios.post("/api/session/", {
      charge: value,
    });
    return data.session_id;
  };

  const commerceHandler = async () => {
    setLoad(true);
    const price = value * 0.01;

    const response = await axios.post(
      "https://api.commerce.coinbase.com/charges/",
      {
        name: "The Human Fund",
        description: "Money For People",
        pricing_type: "fixed_price",
        local_price: {
          amount: `${price}`,
          currency: "USD",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CC-Api-Key": "957d57f9-b8b8-4b4e-bd7d-984b96dd716f",
          "X-CC-Version": "2018-03-22",
        },
      }
    );

    const payment_url = response.data.data.hosted_url;
    setLoad(false)
    router.push(payment_url);
  };

  const { mutate, isLoading } = useCheckout(intentHandler);

  const theme = {
    primaryColor: "#1E1A17",
    secondaryColor: "#0000ff",
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={
              "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png"
            }
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              Nike Air Force 1
            </Heading>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color={"gray.800"} fontSize={"2xl"} fontWeight={"300"}>
                The radiance lives on in the Nike Air Force 1 '07, the
                basketball original that puts a fresh spin on what you know
                best: durably stitched overlays, clean finishes and the perfect
                amount of flash to make you shine.{" "}
              </Text>
            </VStack>
          </Stack>
          <Stack direction="column" spacing={1}>
            <h1>Quantity</h1>
            <NumberInput
              size="lg"
              maxW={32}
              defaultValue={5}
              min={1}
              onChange={(valueString) => setValue(parseInt(valueString))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          <Stack direction="row" spacing={4}>
            {isLoading ? (
              <Button width="200px" isLoading colorScheme="purple">
                {" "}
              </Button>
            ) : (
              <Button colorScheme="purple" width="200px" onClick={mutate}>
                Pay with Solana{" "}
              </Button>
            )}
            <Button
              width="200px"
              colorScheme="linkedin"
              onClick={commerceHandler}
              isLoading={load}
            >
              Pay with Polygon
            </Button>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
