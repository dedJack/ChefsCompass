import mongoose, { Schema } from "mongoose";

export interface IFavourite extends Document {
    userId:mongoose.Types.ObjectId;
    recipeId:mongoose.Types.ObjectId;
    createdAt: Date
}
const FavouriteSchema = new Schema<IFavourite>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    recipeId:{
        type:Schema.Types.ObjectId,
        ref:'Recipe',
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
});

export default mongoose.model<IFavourite>('Favorite',FavouriteSchema);