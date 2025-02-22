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
                message: "Post no encontrado"
            });
        }

        const auth = usuario._id;

        const newComment = new Comment({comment, auth, post});
        const savedComment = await newComment.save();
        
        return res.status(201).json({
            succes: true,
            comment: savedComment
        });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message
        });
    }
}

export const editComment = async (req, res) => {
    try {
        const {usuario} = req;
        const {comment} = req.body;
        const {oid} = req.params;

        const commentExists = await Comment.findById(oid);

        if (!commentExists) {
            return res.status(404).json({
                succes: false,
                message: "Comentario no encontrado"
            });
        }

        if (commentExists.auth.toString() !== usuario._id.toString()) {
            return res.status(401).json({
                succes: false,
                message: "No puedes editar este comentario"
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(oid, {comment}, {new: true});

        return res.status(200).json({
            succes: true,
            comment: updatedComment
        });
    } catch (error) {
        return res.status(500).json({
            succes: false,
            message: error.message
        });
    }
}

export const deleteComment = async (req, res) => {
    try{
        const {usuario} = req;
        const {oid} = req.params;

        const commentExists = await Comment.findById(oid);

        if(!commentExists){
            return res.status(404).json({
                succes: false,
                message: "Comentario no encontrado"
            });
        }

        if(commentExists.auth.toString() !== usuario._id.toString()){
            return res.status(401).json({
                succes: false,
                message: "No puedes eliminar este comentario"
            });
        }

        await Comment.findByIdAndUpdate(oid, {status: false}, {new: true});

        return res.status(200).json({
            succes: true,
            message: "Comentario eliminado",
            comment: commentExists
        });
    }catch(error){
        return res.status(500).json({
            succes: false,
            message: error.message
        });
    }

}