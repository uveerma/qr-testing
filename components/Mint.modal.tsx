import {
  Box,
  Image,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Link,
} from "@chakra-ui/react";
import { FC } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const MintModal: FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg">Membership NFT</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center" flexDir="column">
          <Tabs isFitted variant='enclosed'>
            <TabList mb={1}>
              <Tab _selected={{ color: 'white', bg: 'purple.500' }}>Mint Solana NFT</Tab>
              <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Buy Polygon NFT</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text align="center" fontSize="md" mb="3" mt="0.5">
                  Scan this QR Code from your Phantom wallet and acquire a membership NFT to receive discount.
                </Text>
                <Box px={10} mb={3}>
                  <Image
                    src="https://res.cloudinary.com/dtzqgftjk/image/upload/v1676907754/qr-code_-_2023-02-20T211225.731_j5j2dk.png"
                    alt="Mint Solana NFT"
                  />
                </Box>
              </TabPanel>
              <TabPanel>
              <Text align="center" fontSize="md" mb="3" mt="0.5">
                  Scan this QR Code and visit opensea to purchase a membership NFT and receive discount.
                </Text>
                <Box px={10} mb={3}>
                  <Image
                    src="https://res.cloudinary.com/dtzqgftjk/image/upload/v1676902319/qr-code_-_2023-02-20T194148.632_nitsps.png"
                    alt="Buy Polygon NFT"
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { MintModal };
