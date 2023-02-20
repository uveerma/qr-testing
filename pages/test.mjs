import * as anchor from "@project-serum/anchor";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import base58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

async function post(
) {
  try {
    const connection = new anchor.web3.Connection(
      "https://winter-rough-spree.solana-mainnet.quiknode.pro/dd249994018e9179b642aed5be7830f3ac7c0a39/"
    );
    const reference = anchor.web3.Keypair.generate().publicKey;
    const keypair = anchor.web3.Keypair.fromSecretKey(
      base58.decode('41gfz27CaMoic95r69XvMNvGvHwNH7hXmn1iooUSukgdtUaBkthXMrk32ijknMCPfz3RvLsANjPeFouncXey6nqe')
    );
    const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair));
    const candyMachineId = new anchor.web3.PublicKey("DkfJyR97kENzTDrhQhkcWoERtD4JCRvBgmRkyVPb2VXg");
    const candyMachine = await metaplex.candyMachinesV2().findByAddress({
      address: candyMachineId,
    });

    const mintBuilder = await metaplex.candyMachinesV2().builders().mint({
      candyMachine,
    });

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();
    const transaction = mintBuilder.toTransaction({
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
    const mintSigner = mintBuilder.getContext().mintSigner;

    const tx = await sendAndConfirmTransaction(
        connection,
        createNewTokenTransaction,
        [mintSigner, keypair],
        {
          commitment: "confirmed",
        }
      );
    
     console.log("TX done", tx)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error creating transaction" });
    return;
  }
}

post()