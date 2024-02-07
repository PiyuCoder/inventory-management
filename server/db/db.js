import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
};
