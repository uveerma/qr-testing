import { PayModal } from "@/components/Pay.modal";
import useIsMounted from "@/hooks/useIsMounted";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  List,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  Divider,
  Link,
  OrderedList,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Alchemy, Network } from "alchemy-sdk";
import axios from "axios";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

export default function Home() {
  const [loadkar, setLoadkar] = useState(false);
  const mounted = useIsMounted();
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEligible, setIsEligible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const alchemy = new Alchemy({
    apiKey: "LuicHLT5VC12MSjLYUqoP7KHvompKRfa",
    network: Network.MATIC_MAINNET,
  });

  const getNfts = async () => {
    setIsLoading(true);
    const nfts = await alchemy.nft.verifyNftOwnership(
      address!,
      "0x5D666F215a85B87Cb042D59662A7ecd2C8Cc44e6"
    );
    setIsEligible(nfts);
    onOpen();
    setIsLoading(false);
  };

  const sessionHandler = async () => {
    setLoadkar(true);
    const { data } = await axios.post("/api/session/");
    console.log(data)
   const url = data.payment_url.replace("checkout", "pos");
    setLoadkar(false);
   router.push(url);
  };

  return (
    <>
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
                  best!
                  <br />
                  [Refresh the page if you do not see the polygon button]
                </Text>
              </VStack>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Button
                cursor={"pointer"}
                colorScheme="purple"
                mr={3}
                width="200px"
                as="b"
                borderRadius={8}
                isLoading={loadkar}
                onClick={sessionHandler}
              >
                Pay with Solana
              </Button>

              {mounted()
                ? !address && (
                    <ConnectButton
                      label={"Connect Polygon wallet"}
                      showBalance={false}
                    />
                  )
                : null}
              {mounted()
                ? address && (
                    <Button
                      onClick={getNfts}
                      isLoading={isLoading}
                      width="200px"
                      colorScheme="linkedin"
                    >
                      Pay with Polygon
                    </Button>
                  )
                : null}
            </Stack>
            <Divider />
            <List spacing={4}>
              <List>
                <Heading size="small">Goal of this demo:</Heading>
                <ListItem>
                  To simulate what a loyalty program for a retail brand could
                  look like when built on web3 rails (specifically – compare
                  Solana and Polygon).
                </ListItem>
              </List>
              <List>
                <Text size="small">
                  <span style={{ fontWeight: "bold" }}>UX:</span> The customer
                  visits an IRL location of a store, and is offered the option
                  to checkout using a QR code.
                </Text>
                <UnorderedList>
                  <ListItem>
                    {" "}
                    If they have a membership NFT, they receive an instant
                    discount of 50%.
                  </ListItem>
                  <ListItem>
                    {" "}
                    Once they complete payment, they receive some fungible
                    native token rewards.
                  </ListItem>
                </UnorderedList>
              </List>
              <List>
                <Heading size="small" fontWeight={700}>
                  How to test:
                </Heading>
                <OrderedList spacing={2}>
                  <ListItem>
                    Visit the{" "}
                    <Link color={"blue"} href="/airdrop">
                      Airdrop
                    </Link>{" "}
                    Page and mint a free membership NFT.
                    <UnorderedList>
                      <ListItem>
                        On Solana, you can mint one gaslessly via a QR code
                      </ListItem>
                      <ListItem>
                        On Polygon, you’ll be prompted to purchase (a very
                        affordable) NFT on Opensea.
                      </ListItem>
                    </UnorderedList>
                  </ListItem>
                  <ListItem>
                    Once you have the NFT,
                    <UnorderedList>
                      <ListItem>
                        On Solana, simply click “Pay with Solana” to check out.
                        Your discount will be automatically applied on the
                        checkout page, promoting you to only pay the difference
                        (autofilled). Choose to pay in any token -- the merchant
                        will receive USDC in real time.
                      </ListItem>
                      <ListItem>
                        On Polygon, connect your wallet to fetch your assets and
                        confirm your holding of the membership NFT. Upon
                        confirmation, move to check out. On checkout, enter the
                        exact amount to be paid in MATIC or USDC.
                      </ListItem>
                    </UnorderedList>
                  </ListItem>
                  <ListItem>
                    Upon successful payment,
                    <UnorderedList>
                      <ListItem>
                        Every Solana wallet will receive an airdrop of a few
                        NIKE tokens programmatically.
                      </ListItem>
                      <ListItem>
                        This feature is currently not possible to power with
                        Polygon in any way that’s currently off-the-shelf.
                      </ListItem>
                    </UnorderedList>
                  </ListItem>
                </OrderedList>
              </List>
            </List>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
