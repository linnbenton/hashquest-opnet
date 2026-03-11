import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(
 req: NextApiRequest,
 res: NextApiResponse
){

 const data = [

  { wallet: "0x123", hash: 1200 },
  { wallet: "0xabc", hash: 980 },
  { wallet: "0x999", hash: 750 }

 ]

 res.status(200).json(data)

}