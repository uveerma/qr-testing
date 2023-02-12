import { PayModal } from "@/components/Pay.modal";
import { Button, useDisclosure } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Alchemy, Network } from "alchemy-sdk";
import { useState } from "react";
import { useAccount } from "wagmi";
import useIsMounted from "../hooks/useIsMounted";

export default function Home() {
  const mounted = useIsMounted();
  const { address } = useAccount();
  const config = {
    apiKey: "LuicHLT5VC12MSjLYUqoP7KHvompKRfa",
    network: Network.MATIC_MAINNET,
  };
  const alchemy = new Alchemy(config);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEligible, setIsEligible] = useState(false);

  // Address of a wallet holding trump NFTS- 0xd5bEA673Af5b959F95553602B919c4603F6cD4C3
  // Contract of Trump card NFTs- 0x24A11e702CD90f034Ea44FaF1e180C0C654AC5d9

  const getNfts = async () => {
    setIsLoading(true);
    const nfts = await alchemy.nft.verifyNftOwnership(
      "0xd5bEA673Af5b959F95553602B919c4603F6cD4C3",
      "0x24A11e702CD90f034Ea44FaF1e180C0C654AC5d9"
    );
    console.log(nfts);
    setIsEligible(nfts);
    onOpen();
    setIsLoading(false);
  };

  return (
    <>
      {/* <PayModal isOpen={isOpen} onClose={onClose} isEligible={isEligible} /> */}
      <ConnectButton showBalance={false} />
      {mounted() ? address && <p>My Address is {address}</p> : null}
      {mounted()
        ? address && (
            <Button onClick={getNfts} isLoading={isLoading}>
              Get NFTs
            </Button>
          )
        : null}
    </>
  );
}
