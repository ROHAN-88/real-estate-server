import mongoose from "mongoose";

const db_connect = async () => {
  const db_URL = process.env.MONGO_URL;
  try {
    await mongoose.connect(db_URL);
    console.log("DataBase Connect");
  } catch (e) {
    console.log({ message: e.message });
  }
};

export default db_connect;
