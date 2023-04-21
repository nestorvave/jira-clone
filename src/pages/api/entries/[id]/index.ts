import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../../../database";
import EntryModel from "../../../../../models/Entry";
import { IEntry } from "../../../../../models/Entry";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "ID is not valid" });
  }

  switch (req.method) {
    case "PUT":
      return updateEntries(req, res);
    case "GET":
      return getEntry(req, res);
    default:
      res.status(400).json({ message: "Method is not valid" });
  }

  res.status(200).json({ message: "ds" });
}
const updateEntries = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await db.connect();
  const { id } = req.query;
  const entryToUpdate = await EntryModel.findById(id);
  if (!entryToUpdate) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "Entry not found with id provided" });
  }
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;
  try {
    const updateEntry = await EntryModel.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    return res.status(200).json(updateEntry!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({ message: error.errors.status.message });
  }
};
const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const { id } = req.query;
  const entryInDB = await EntryModel.findById(id);
  if (!entryInDB) {
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "Entry not found with id provided" });
  }

  return res.status(200).json(entryInDB);
};
