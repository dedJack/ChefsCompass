import dotenv from "dotenv";
import cors from "cors";
import express, { Express } from "express";
import connectToMongoDB from "./db/db";
import authRoutes from './routes/Auth'
import recipeRoutes from './routes/recipes'
import favouriteRoutes from './routes/favourite'

dotenv.config();
const app: Express = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/recipe',recipeRoutes);
app.use('/api/favourite',favouriteRoutes);

connectToMongoDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Chef's Campuss is running on port ${port}`);
});
