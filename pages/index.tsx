import { PayModal } from "@/components/Pay.modal";
import useIsMounted from "@/hooks/useIsMounted";
import { useCheckout } from "@candypay/react-checkout-pos";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ConnectButton, darkTheme } from "@rainbow-me/rainbowkit";
import { Alchemy, Network } from "alchemy-sdk";
import axios from "axios";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const [value, setValue] = useState(5);
  const mounted = useIsMounted();
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEligible, setIsEligible] = useState(false);
  const [isSmthLoading, setIsLoading] = useState(false);

  const config = {
    apiKey: "LuicHLT5VC12MSjLYUqoP7KHvompKRfa",
    network: Network.MATIC_MAINNET,
  };

  const alchemy = new Alchemy(config);

  const getNfts = async () => {
    setIsLoading(true);
    const nfts = await alchemy.nft.verifyNftOwnership(
      address!,
      "0x3b477a6b1be236628b08839e1e8cf8ba8d93589a"
    );
    console.log(nfts);
    setIsEligible(nfts);
    onOpen();
    setIsLoading(false);
  };

  const sessionHandler = async () => {
    const { data } = await axios.post("/api/session/", {
      charge: value,
    });
    return data.session_id;
  };

  const { mutate, isLoading } = useCheckout(sessionHandler);

  return (
    <Container maxW={"7xl"}>
      <PayModal isOpen={isOpen} onClose={onClose} isEligible={isEligible} />
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
              Nike Air Force - $0.1
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
                The radiance lives on in the Nike Air Force 1 &apos;07, the
                basketball original that puts a fresh spin on what you know
                best: durably stitched overlays, clean finishes and the perfect
                amount of flash to make you shine.{" "}
              </Text>
            </VStack>
          </Stack>
          <Stack direction="row" spacing={4}>
            {isLoading ? (
              <Button width="200px" isLoading colorScheme="purple">
                {" "}
              </Button>
            ) : (
              <Button colorScheme="purple" mr={6} width="200px" as='b' borderRadius={8} onClick={mutate}>
                Pay with Solana{" "}
              </Button>
            )}

            {mounted()
              ? !address && (
                  <ConnectButton
                    label={"Pay with Polygon"}
                    showBalance={false}
                  />
                )
              : null}
            {mounted()
              ? address && (
                  <Button
                    onClick={getNfts}
                    isLoading={isSmthLoading}
                    width="200px"
                    colorScheme="linkedin"
                  >
                    Pay with Polygon
                  </Button>
                )
              : null}
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
