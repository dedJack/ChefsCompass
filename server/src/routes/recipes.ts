import express, { NextFunction, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import Recipe from "../models/Recipe";

const router = express.Router();

//Route 1: Add recipes.
router.post(
  "/create-recipes",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
      
      const { title, description, difficulty } = req.body;
      try {
        const newRecipe = new Recipe({
          title,
          description,
          difficulty,
          createdBy: req.userId,
        });
    
        await newRecipe.save();
        res.status(201).json({success:true, message:"Recipe added successfully",data: newRecipe});
        return ;
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success:true, message:"Internal server error"});
        return;        
    }
  }
);

//route 2: get all recipes.
router.get('/get-recipes',authMiddleware,async(req:AuthRequest,res:Response)=>{

    try {
        const fetchRecipe = await Recipe.find({});
        res.status(201).json({success:true,message:"Recipe successfully fetched.",fetchRecipe});
        return;
    } catch (e) {
        console.error(e);
        res.status(500).json({success:false,message:"Intenal server error"});
        return;
    }
})

//route 3:get all recipes by id.
router.get('/get-recipes-id',authMiddleware,async(req:AuthRequest,res:Response)=>{
    // const { createdAt} = req.body
    try{
        const fetchRecipeById = await Recipe.find({createdAt:req.userId});
        res.status(201).json({success:true,message:"Recipe successfully fetched.",fetchRecipeById});
    }catch(e){
        console.error(e);
        res.status(500).json({success:false,message:"Intenal server error"});
        return;
    }
})

//route 4:get recipe by Id.
router.get('/get-recipes/:params',authMiddleware,async(req:AuthRequest, res:Response)=>{
    try {
        const recipeId = req.params.params;
        const recipeDetail = await Recipe.findById(recipeId);
        if(!recipeDetail){
            res.status(404).json({success:true,message:"recipe not found."});
        }
        res.status(200).json({success:true, message:"Recepie found.",data: recipeDetail});
        return;
    } catch (e) {
        console.error(e);
        res.status(500).json({success:false,message:"Intenal server error"});
        return;
    }
})

export default router;
