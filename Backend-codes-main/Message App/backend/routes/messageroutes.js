import express from "express";
import { sendMessage, getMessages } from "../Controllers/UserController.js";

const router = express.Router();

router.post("/message", sendMessage);
router.get("/messages/:senderId/:receiverId", getMessages);

export default router;
