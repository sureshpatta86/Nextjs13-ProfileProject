import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connection established successfully");
    });
  } catch (error) {
    console.log("Something goes wrong!" + error);
    process.exit();
  }
}
