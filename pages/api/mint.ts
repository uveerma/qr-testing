import { Request, Response } from "express";
import * as anchor from "@project-serum/anchor";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import base58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

export const mint = async (req: Request, res: Response) => {
  const { account } = req.body;

  try {
    if (req.method === "GET") {
      return res.status(200).json({
        label: "Nike Coupon NFT",
        icon: "https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png",
      });
    }

    if (req.method === "POST") {
      if (!account) {
        return res.status(400).json({ error: "No account provided" });
      }

      const connection = new anchor.web3.Connection("https://api.mainnet-beta.solana.com");
      const user = new anchor.web3.PublicKey(account);
      const mint = anchor.web3.Keypair.generate();
      const keypair = anchor.web3.Keypair.fromSecretKey(
        base58.decode(process.env.SOL_PRIVATE_KEY!)
      );
      const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));

      const transactionBuilder = await metaplex.nfts().builders().create({
        uri: "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1675415684/superteam-call_z5zyyv.json",
        name: "Solana Ecosystem Community Call",
        symbol: "SUPR",
        sellerFeeBasisPoints: 10000,
        useNewMint: mint,
        tokenOwner: user,
      });

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      const transaction = transactionBuilder.toTransaction({
        blockhash,
        lastValidBlockHeight,
      });

      transaction.partialSign(mint, keypair);

      const serializedTransaction = transaction.serialize({
        requireAllSignatures: false,
      });
      const base64 = serializedTransaction.toString("base64");

      return res.status(200).json({
        transaction: base64,
        message: "50% discount coupon",
      });
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
};