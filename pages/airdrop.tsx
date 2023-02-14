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
  Divider,
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
    const msg = await axios.post(
      "https://qr-testing-webhook-production.up.railway.app/poly",
      {
        walletAddress: address,
      }
    );
    console.log(msg);
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
          <Heading size="md">Membership NFT</Heading>
          <Text>
          Acquire a membership NFT to receive a discount during{" "}
            <Link color={"blue"} href="/">
              checkout
            </Link>
          </Text>
          <Stack direction={"row"} pt={5}>
            <Button colorScheme="purple" width="200px" mr={4} onClick={mintSol}>
              Mint Solana NFT
            </Button>
            <a target="_blank" rel="noopener noreferrer" href={"https://opensea.io/collection/galxe-oat-2"}>
              <Button width="200px" colorScheme="linkedin">
                Buy Polygon NFT
              </Button>
            </a>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
