import { NextApiRequest, NextApiResponse } from "next";
import { candypay } from "../../lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    try {
      const response = await candypay.session.create({
        success_url: "https://pos-crypto-pay.vercel.app/",
        cancel_url: "https://pos-crypto-pay.vercel.app/",
        tokens: ["shdw", "bonk"],
        items: [
          {
            name: "Nike Air Force",
            image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png",
            price: 0.1,
            quantity: 1,
          },
        ],
          discounts:{
            collection_id:
              "HVNvZSGUtDn1RgYsYLpuRpav3TNeYAmZjPDKf4GGS8Db", 
            discount: 0.5,
            name: "Solana Attendance POAP",
            image:
              "https://res.cloudinary.com/dtzqgftjk/image/upload/v1671540678/Vector_1_zxj0wf.png",
          }
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
