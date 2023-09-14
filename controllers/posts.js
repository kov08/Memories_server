import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


// export const getPosts = async (req, res) => {
//     try {
//         const postMessages = await PostMessage.find();
        
//         console.log(postMessages);
//         res.status(200).json(postMessages);

//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
//     // res.send('THIS WORKS ! Amazing great'); THIS CAUSE ERROR OF CONNECTION LOST!
// } 

export const getPost = async (req, res) => {
    const { id }= req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPosts = async (req, res) => {
    const { page} = req.query;
    // console.log(error.message);
    
    try{
    const LIMIT = 8 ;
    const startIndex = (Number(page) - 1) * LIMIT;  // to get starting index of every page
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({ _id: -1}).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    // res.send('THIS WORKS ! Amazing great'); THIS CAUSE ERROR OF CONNECTION LOST!

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const {searchQuery, tags} = req.query

    try {
        const title = new RegExp(searchQuery, 'i');
        const posts = await PostMessage.find({ $or: [{title} ,{tags: { $in: tags.split(',') }}]});
        

        res.json({data: posts});
    } catch (error) {
        res.status(404).json({ error });
    }

}

export const createPost =  async (req, res)=>{
    const post = req.body;

    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    
    try {
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

export const updatePost = async (req, res) => {
    
    console.log("INdeniacna: ", req.params)
    
    const { idTest } = req.params;
    const post = req.body;

    // if(!mongoose.Types.ObjectId.isValid(_id)) res.return(404).send('No Post with that id');
    if(!mongoose.Types.ObjectId.isValid(idTest)) return res.status(404).send('No Post with that id');
    
    const updatePost = await PostMessage.findByIdAndUpdate(idTest, {...post, idTest}, {new: true});
    
    res.json(updatePost);
}

export const deletePost = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) res.return(404).send('No Post with that id');
    // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');
    
    await PostMessage.findByIdAndRemove(id);
    // This above line cause error whereas in tutorial it is written 
    
    console.log('DELETE');
    
    res.json({ message: 'Post deleted successfully' });
} 

export const likePost = async (req, res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({ message: 'Unauthenticated' });
    
    if(!mongoose.Types.ObjectId.isValid(id)) res.return(404).send('No Post with that id');
    // console.log('Post Matched');
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    
    if( index === -1 ) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id != String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
    
}

export const commentPost = async (req, res) => {
    const {id} = req.params;
    const {value} = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    // console.log('COMMENT LOG: ', req.body);

    res.json(updatedPost);
}
