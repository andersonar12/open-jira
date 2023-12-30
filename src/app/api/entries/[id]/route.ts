import { dbConnect, dbDisconnect } from "@/backend/database/db";
import { EntryModel, IEntry } from "@/backend/models/Entry";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const entryFounded = await EntryModel.findById(params.id) //.lean();

  try {
    return NextResponse.json(entryFounded);
  } catch (err) {
    return NextResponse.json({ error: err });
  } finally {
    await dbDisconnect();
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  try {

    const entryToUpdate = await EntryModel.findById(params.id);

    if (!entryToUpdate) {
      await dbDisconnect();
      return NextResponse.json({ error: "Entry not found" });
    }

    const { description, status } = await request.json();

    // entryToUpdate['description'] = description;
    // entryToUpdate['status'] = status;
    // await entryToUpdate.save();

    const updatedEntry = await EntryModel.findByIdAndUpdate(
      params.id, { description, status }, { new: true, runValidators: true }
    )

    return NextResponse.json(updatedEntry);

  } catch (error) {
    return NextResponse.json(error);
  } finally {
    await dbDisconnect();
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const entryToDelete = await EntryModel.findById(params.id);

    await entryToDelete?.deleteOne();

    return NextResponse.json({ entryDeleted: entryToDelete });

  } catch (error) {
    return NextResponse.json(error);
  } finally {
    await dbDisconnect();
  }
}