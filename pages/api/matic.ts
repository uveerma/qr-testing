import { NextApiRequest, NextApiResponse } from "next";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { walletAddress } = req.body;
    try {
      const sdk = ThirdwebSDK.fromPrivateKey(
        process.env.ETH_PRIVATE_KEY!,
        "matic"
      );

      const metadata = {
        name: "Nike NFT Coupon",
        description: "Get 50% discount on checkout by holding this coupon NFT",
        image:
          "https://gateway.ipfscdn.io/ipfs/QmWc7tgRyGtDVwrAfLGJpoLDmcfemGKbbw8XYBT6g3TNSG/Screenshot%202023-02-12%20193100.png", // This can be an image url or file
      };

      const metadataWithSupply = {
        metadata,
        supply: 2,
      };
      const contract = await sdk.getContract(
        "0x0AaC69886E4f44Fe08170e106613cb05619E5845"
      );
      const result = await contract.erc1155.mintTo(
        walletAddress!,
        metadataWithSupply
      );

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: "Error Minting NFT",
      });
    }
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
};

export default handler;
