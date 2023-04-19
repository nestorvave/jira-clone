import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import EntryModel, { IEntry } from "../../../../models/Entry";

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    default:
      return res.status(400).json({ message: "Endpoint has not found" });
  }
}
const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await EntryModel.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  console.log(entries);
  res.status(200).json(entries);
};
