import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useState, useEffect } from 'react';

const { chains, provider } = configureChains(
  [polygon],
  [
    alchemyProvider({ apiKey: "LuicHLT5VC12MSjLYUqoP7KHvompKRfa" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true)
  }, [])

  return (
    <>
      {ready ? (<ChakraProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            theme={lightTheme({
              accentColor: "#3182CE",
              accentColorForeground: "white",
              borderRadius: "medium",
            })}
            modalSize="compact"
            chains={chains}
          >
            <Toaster />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </ChakraProvider>) : null}
    </>
  );
}
