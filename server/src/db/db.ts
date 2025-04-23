import mongoose from "mongoose";

const connectToMongoDB = async(): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL as string);
    console.log("DB connect : ",connection.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToMongoDB;
