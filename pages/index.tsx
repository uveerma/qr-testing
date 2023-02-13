import { PayModal } from "@/components/Pay.modal";
import useIsMounted from "@/hooks/useIsMounted";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  ListItem,
  ListIcon,
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
      "0x0AaC69886E4f44Fe08170e106613cb05619E5845"
    );
    setIsEligible(nfts);
    onOpen();
    setIsLoading(false);
  };

  const sessionHandler = async () => {
    setLoadkar(true);
    const { data } = await axios.post("/api/session/");
    const url = data.redirect_url.replace("checkout", "pos");
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
                  best: durably stitched overlays, clean finishes and the
                  perfect amount of flash to make you shine.{" "}
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
                      label={"Connect Matic wallet"}
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
                      Pay with Matic
                    </Button>
                  )
                : null}
            </Stack>
            <Divider />
            <List spacing={3}>
              <Heading size="small">Usage Instruction</Heading>
              <ListItem>
                <ListIcon as={ChevronRightIcon} color="purple.500" />
                Visit the{" "}
                <Link color={"blue"} href="/airdrop">
                  Airdrop Page
                </Link> and mint a free Solana and Matic NFT, to experince the discount feature
              </ListItem>
              <ListItem>
                <ListIcon as={ChevronRightIcon} color="purple.500" />
                Connect your wallet on website to experince discount feature on Matic, while on Solana it works seamlessly on the checkout page itself 
              </ListItem>
              <ListItem>
                <ListIcon as={ChevronRightIcon} color="purple.500" />
                After successful payment, every Solana wallet will get airdropped a few NIKE tokens which demonstrate how merchants can power 
                loyalty incentivatison programs with crypto! This feature is not possible to power with Matic or Eth payment providers in any way! 
              </ListItem>
            </List>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
