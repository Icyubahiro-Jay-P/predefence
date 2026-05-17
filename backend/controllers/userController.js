import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email is already taken" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to signup" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email is invalid" });
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {httpOnly: true,secure: false,sameSite: "none",maxAge: 60 * 60 * 1000,});
    res.status(200).json({ message: "Logged in successfull", token });
  } catch (error) {
    res.status(500).json({ message: "Failed to log in" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const profile = async (req,res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user){
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({message: "User fetched successfully", user})
  } catch (error) {
    res.status(500).json({message: "Failed to fetch your profile"})
  }
}