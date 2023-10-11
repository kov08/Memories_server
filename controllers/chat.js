import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


export const chat = async (req, res) => {
    const { id }= req.params;

    try {
        // const post = await PostMessage.findById(id);
        const singleChat = await chats.find((c) => c._id=== id);

        res.send(singleChat);        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}