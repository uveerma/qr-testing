import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { FC, useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  isEligible: boolean;
}

const PayModal: FC<IProps> = ({ isOpen, onClose, isEligible }) => {
  const [load, setLoad] = useState(false);
  const router = useRouter();

  const commerceHandler = async () => {
    setLoad(true);
    
    const price = isEligible ? 0.05 : 0.1;

    const response = await axios.post(
      "https://api.commerce.coinbase.com/charges/",
      {
        name: "Nike Air Force",
        pricing_type: "fixed_price",
        local_price: {
          amount: `${price}`,
          currency: "USD",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CC-Api-Key": "957d57f9-b8b8-4b4e-bd7d-984b96dd716f",
          "X-CC-Version": "2018-03-22",
        },
      }
    );

    const payment_url = response.data.data.hosted_url;
    setLoad(false);
    router.push(payment_url);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg">Continue with Polygon</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center" flexDir="column">
          <Text align="center" fontSize="lg" mb="4" mt="0.5">
            {isEligible
              ? "You are eligible for a 50% discount"
              : "You are not eligible for a discount"}
          </Text>

          <Button
            colorScheme="linkedin"
            mx="auto"
            my="2"
            onClick={commerceHandler}
            isLoading={load}
          >
            Checkout
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { PayModal };
