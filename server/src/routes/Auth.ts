import express, { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check Whether email exists.
    const isExistingEmail = await User.findOne({ email });
    if (isExistingEmail) {
      res.status(400).json({ message: "User exists with same email." });
    }

    //Hashing the password.
    const hashedPass = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Route 2: Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const {email, password } = req.body;

    // Check for existing email
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      res.status(400).json({ success: false, message: "Email doesn't exist" });
      return;
    }

    // Compare password
    const isMatchPass = await bcrypt.compare(password, currentUser?.password);
    if (!isMatchPass) {
      res.status(400).json({ success: false, message: "Invalid password" });
      return;
    }

    //create token
    const token = jwt.sign({ userId: currentUser._id }, "JWT_SECRET", {
      expiresIn: "30d",
    });

    // If login is successful
    res.status(200).json({ success: true, token, userId: currentUser._id, message: "Login successful" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false ,message: "Internal server error" });
  }
});

//route 4: Get user by verifying token,
router.get('/get-user',authMiddleware,async(req: AuthRequest, res:Response )=>{
  try {
    res.status(200).json({success:true, message:'Token is valid.'})
  } catch (e) {
    res.status(500).json({success:false, message:'internal server error'})
  }
})

export default router;
