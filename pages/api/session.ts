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
        discounts: {
          collection_id:
            "ac64ea74280411e2e145dadd18c2d5b6",
          discount: 0.5,
          name: "Rolling Bones",
          image: "https://cdn.coralcube.io/111/rs:fit:400:400:0:0/aHR0cHM6Ly9uZnQtY29sbGFnZS5zMy5ldS1jZW50cmFsLTEuYW1hem9uYXdzLmNvbS9wdWJsaWMvcm9sbGluZ19ib25lcy5QTkc_dD0xNjc2NDgwNzAw",
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
