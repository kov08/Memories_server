import express from "express";
import auth from "../middleware/auth.js";
import { chat } from "../controllers/chat.js";

const router = express.Router();

router.get("/chats/:id", chat)

export default router;