import { NextApiRequest, NextApiResponse } from "next";
import { candypay } from "../../lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { charge } = req.body;
    const price = charge * 0.01;

    try {
      const response = await candypay.session.create({
        success_url: "https://posolpayments.vercel.app/success",
        cancel_url: "https://posolpayments.vercel.app/",
        tokens: ["shdw", "bonk"],
        items: [
          {
            name: "Test Product 1",
            image: "https://candypay.fun/assets/logo.png",
            price: price,
            quantity: 1,
          },
        ],
        discounts: {
          verified_creator_address:
            "4ZCiGakZJy5aJsLpMBNBNwyrmNCCSCzukzhaPzzd4d7v",
          discount: 0.2,
          name: "Spaces NFT List",
          image: "https://i.ibb.co/qMr52vL/Screenshot-2022-12-27-040620.png",
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
