import {
  Box,
  Image,
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
        <ModalHeader fontSize="lg">Mint Solana NFT</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center" flexDir="column">
          <Text align="center" fontSize="md" mb="3" mt="0.5">
            Scan this QR Code from your Phantom wallet and acquire a membership NFT to receive discount during{" "}
            <Link color={"blue"} href="/">
              checkout{" "}
            </Link>
          </Text>
          <Box px={10} mb={3}>
            <Image
              src="https://res.cloudinary.com/dtzqgftjk/image/upload/v1676323319/nike-coupon_qloadj.png"
              alt="Solana mint nft"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { MintModal };
