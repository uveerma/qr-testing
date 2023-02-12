import { NextApiRequest, NextApiResponse } from "next";
import { candypay } from "../../lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    try {
      const response = await candypay.session.create({
        success_url: "https://posolpayments.vercel.app/success",
        cancel_url: "https://posolpayments.vercel.app/",
        tokens: ["shdw", "bonk"],
        items: [
          {
            name: "Nike Air Force",
            image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png",
            price: 0.1,
            quantity: 1,
          },
        ],
        discounts: {
          verified_creator_address:
            "B4x93Px5YYcQdpvEKmbPMWKGC5a8hytNqpitQFsEAjDx",
          discount: 0.5,
          name: "LILY NFT",
          image: "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafkreihwrpyr52wax3i5drzi5pg4v2wrgylpwi54im7qb7nzz7tpdsmmzm.ipfs.nftstorage.link/",
        },
      });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);

      return res.status(200).json({
        error: "Error creating session",
      });
    }
  } else {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }
};

export default handler;
