import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { charge } = req.body;
    const price = charge * 0.01;

    try {
        const response = await axios.post(
            'https://api.commerce.coinbase.com/charges/',
            {
                "name":"The Human Fund",
                "description":"Money For People",
                "pricing_type":"fixed_price",
                "local_price": {
                    amount: `${price}`,
                    currency: "USD"
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CC-Api-Key': '957d57f9-b8b8-4b4e-bd7d-984b96dd716f',
                    'X-CC-Version': '2018-03-22'
                }
            }
        );

      return res.status(200).json(response.data.id);
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
