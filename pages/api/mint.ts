import { Request, Response } from "express";
import * as anchor from "@project-serum/anchor";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import base58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

export type MakeTransactionInputData = {
  account: string;
};

type MakeTransactionGetResponse = {
  label: string;
  icon: string;
};

export type MakeTransactionOutputData = {
  transaction: string;
  message: string;
};

type ErrorOutput = {
  error: string;
};

function get(res: Response<MakeTransactionGetResponse>) {
  res.status(200).json({
    label: "Nike Coupon NFT",
    icon: "https://cdn.freebiesupply.com/logos/large/2x/nike-4-logo-png-transparent.png",
  });
}

async function post(
  req: Request,
  res: Response<MakeTransactionOutputData | ErrorOutput>
) {
  try {
    const { account } = req.body as MakeTransactionInputData;
    if (!account) {
      res.status(40).json({ error: "No account provided" });
      return;
    }
    console.log(account as string);

    const connection = new anchor.web3.Connection(
      "https://winter-rough-spree.solana-mainnet.quiknode.pro/dd249994018e9179b642aed5be7830f3ac7c0a39/"
    );
    const user = new anchor.web3.PublicKey(account);
    const reference = anchor.web3.Keypair.generate().publicKey;
    const mint = anchor.web3.Keypair.generate();
    const keypair = anchor.web3.Keypair.fromSecretKey(
      base58.decode("2AmqcXAcB9P7ueDYAWRyDbeHu5bRSDpFi7DCeKm4L6D19ptMe9gg1hUgXJW1xCYzKhVJDQAx5PdeBQJkT3mStTuc")
    );
    const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));

    const transactionBuilder = await metaplex.nfts().builders().create({
      uri: "https://res.cloudinary.com/dtzqgftjk/raw/upload/v1676294544/nike-coupon_hi0151.json",
      name: "Nike NFT Coupon",
      symbol: "NIKE",
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

    transaction.instructions[0].keys.push({
      pubkey: user,
      isSigner: true,
      isWritable: false,
    });
    transaction.instructions[0].keys.push({
      pubkey: reference,
      isSigner: false,
      isWritable: false,
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error creating transaction" });
    return;
  }
}

export default async function handler(
  req: Request,
  res: Response<
    MakeTransactionGetResponse | MakeTransactionOutputData | ErrorOutput
  >
) {
  if (req.method === "GET") {
    return get(res);
  } else if (req.method === "POST") {
    return await post(req, res);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
