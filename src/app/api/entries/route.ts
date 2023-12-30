import { dbConnect, dbDisconnect } from "@/backend/database/db";
import { initialData } from "@/backend/database/initialData";
import { EntryModel, IEntry } from "@/backend/models/Entry";
import { NextResponse } from "next/server";

// type Data =  {message : string} | IEntry[]
export async function GET() {
  try {
    return NextResponse.json({ entries: await getEntries() });
  } catch (err) {
    return NextResponse.json({ error: "Failed to load data" });
  } finally {
    await dbDisconnect();
  }
}

export async function POST(request: Request) {
  try {
    return NextResponse.json({ entry: await addEntry(request) });
  } catch (err) {
    return NextResponse.json({ error: err });
  }finally {
    await dbDisconnect();
  }
}


async function getEntries() {
  await dbConnect();
  const entries = await EntryModel.find().sort({ createdAt: "ascending" });
  return entries;
}

async function addEntry(request: Request) {
  await dbConnect();

  const { description } = await request.json();

  const newEntry = new EntryModel({
    description,
    createdAt: Date.now(),
    status: "pending",
  });

  await newEntry.save();
  return newEntry;
}
