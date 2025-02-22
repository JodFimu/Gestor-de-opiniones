import Comment from './comment.model.js';
import Post from '../post/post.model.js';
import User from '../user/user.model.js';

export const createComment = async (req, res) => {
    try {
        const {usuario} = req;
        const {comment} = req.body;
        const { post } = req.params;

        const postExists = await Post.findById(post);

        if (!postExists) {
            return res.status(404).json({
                succes: false,
                message: "Post not found"
            });
        }

        const auth = usuario._id;

        const newComment = new Comment({comment, auth, post});
        const savedComment = await newComment.save();
        
        return res.status(201).json(savedComment);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}