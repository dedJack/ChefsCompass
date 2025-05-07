import express, { response, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import Recipe from "../models/Recipe";
import Favourite from "../models/Favourite";

const router = express.Router();

router.post(
  "/add-favourite",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const recipeId = req.body.recipeId;
      const userId = req.body.userId; // ✅ Get from decoded token

      const newFavourite = await Recipe.findById(recipeId);
      if (!newFavourite) {
        res.status(404).json({ success: false, message: "Recipe not found" });
        return;
      }
      const isAlreadyFavourite = await Favourite.findOne({ userId, recipeId });
      if (isAlreadyFavourite) {
        res.status(400).json({ success: false, message: "Already favourite" });
        return;
      }

      const favourite = new Favourite({ userId, recipeId });
      await favourite.save();

      res.status(200).json({
        success: true,
        message: "Favourites saved.",
        data: favourite,
      });
      return;
    } catch (e) {
      console.error("Error adding favourite:", e);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }
  }
);

router.delete(
  "/delete-favourite/:recipeId",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const recipeId = req.params.recipeId;
      const userId = req.userId; 
      const deletedFavourite = await Favourite.findOneAndDelete({
        userId,
        recipeId,
      })
      if (!deletedFavourite) {
        res.status(400).json({ success: false, message: "Recipe not found" });
        return;
      }
      res.status(200).json({
        success: true,
        message: "Favourites saved.",
        data: deletedFavourite,
      });
      return;
    } catch (e) {
      console.error("Error adding favourite:", e);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }
  }
);

router.get('/get-favourites',authMiddleware,async(req:AuthRequest,res:Response)=>{
  try {
    const userId = req.userId;
    const fetchFavourites = await Favourite.find({userId});

    if(!fetchFavourites){
      res.status(404).json({
        success: false,
        message: "You have no favourites",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Favourites fetched.",
      data: fetchFavourites,
    });
    return;
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
    
  }
})

export default router;
