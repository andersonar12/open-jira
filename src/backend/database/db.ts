import mongoose from "mongoose";

export const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("Database connected in " + process.env["MONGO_URL"]);
  } catch (error) {
    console.log(error);
  }
};

export const dbDisconnect = async () => {
  if (!mongoose.connections[0].readyState) {
    return;
  }

  try {
    await mongoose.disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.log(error);
  }
};
