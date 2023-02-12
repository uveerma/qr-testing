import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useIsMounted from '../hooks/useIsMounted';
import {useAccount} from 'wagmi'
import { Alchemy, Network } from "alchemy-sdk";
import { Button } from "@chakra-ui/react";

export default function Home() {
  const mounted = useIsMounted();
  const {address} = useAccount();
  const config = {
    apiKey: 'LuicHLT5VC12MSjLYUqoP7KHvompKRfa',
    network: Network.MATIC_MAINNET,
  };
  const alchemy = new Alchemy(config);

  // Address of a wallet holding trump NFTS- 0xd5bEA673Af5b959F95553602B919c4603F6cD4C3
  // Contract of Trump card NFTs- 0x24A11e702CD90f034Ea44FaF1e180C0C654AC5d9

  const getNfts = async () => {
    const nfts = await alchemy.nft.verifyNftOwnership('0xd5bEA673Af5b959F95553602B919c4603F6cD4C3', '0x24A11e702CD90f034Ea44FaF1e180C0C654AC5d9');
    console.log(nfts);
  };

  return (
    <>
    <ConnectButton showBalance={false} />
   {mounted() ? address && <p>My Address is {address}</p> : null}
   {mounted() ? address && <Button onClick={getNfts}>Get NFTs</Button> : null}
    </>
  )
}
