import { signup, login, profile, logout } from "../controllers/userController.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/profile",authMiddleware, profile);

export default router;