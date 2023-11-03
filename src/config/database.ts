import mongoose from "mongoose";

const cluster = process.env.DB_CLUSTER;
const password = process.env.DB_PASSWORD;
const id = process.env.DB_ID;
const db = process.env.DB_NAME;

const uri = `mongodb+srv://${cluster}:${password}@${cluster}.${id}.mongodb.net/${db}?retryWrites=true&w=majority`;

export async function mongodb() {
  await mongoose.connect(uri);
  console.log("connected to " + cluster);
}
