import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res
      .status(401)
      .json({ message: "You do not have access to this service" });
  }
  await db.connect();
  await db.disconnect();

  res.status(200).json({ message: "Succesful process" });
}