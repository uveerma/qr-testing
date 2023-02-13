import { MintModal } from "@/components/Mint.modal";
import useIsMounted from "@/hooks/useIsMounted";
import {
  useToast,
  Button,
  Container,
  Card,
  Heading,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const mounted = useIsMounted();
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const mintMatic = async () => {
    setIsLoading(true);
    const { data } = await axios.post("/api/matic/", {
      walletAddress: address,
    });
    console.log(data);
    toast({
      title: `NFT minted`,
      status: "success",
      isClosable: true,
    });
    setIsLoading(false);
  };

  const mintSol = async () => {
    onOpen();
  };

  return (
    <>
      <Container maxW={"7xl"}>
        <MintModal isOpen={isOpen} onClose={onClose} />
        <Card align="center" mt={10}>
          <Heading size="md">Get NFT Airdrop</Heading>
          <Text>
            Mint or Airdrop a free, gasless NFT here and get discount while{" "}
            <Link color={"blue"} href="/">
              Checkout
            </Link>
          </Text>
          <Stack direction={"row"} pt={5}>
            <Button colorScheme="purple" width="200px" mr={4} onClick={mintSol}>
              Mint Solana NFT
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
                    onClick={mintMatic}
                    isLoading={isLoading}
                    width="200px"
                    colorScheme="linkedin"
                  >
                    Mint Matic NFT
                  </Button>
                )
              : null}
          </Stack>
        </Card>
      </Container>
    </>
  );
}
