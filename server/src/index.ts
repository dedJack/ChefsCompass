import dotenv from "dotenv";
import cors from "cors";
import express, { Express } from "express";
import connectToMongoDB from "./db/db";

dotenv.config();
const app: Express = express();
app.use(cors());
app.use(express.json());
connectToMongoDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Chef's Campuss is running on port ${port}`);
});
