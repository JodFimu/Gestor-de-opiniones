import Post from "../post/post.model.js"
import Category from "../category/category.model.js"
import User from "../user/user.model.js"

export const createPost = async(req, res) =>{
    try {
        const {usuario} = req
        const data = req.body

        const categoria = Category.findById(data.category)

        if (!categoria) {
            return res.status(400).json({
                succes: false,
                message: "la categoria no existe"
            })
        }

        const post = await Post.create(data);

        return res.status(201).json({
            message: "Post has been created",
            post: post
        });
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al crear el post"
        })
    }
}

export const editPost = async (req, res) =>{
    try{
    const { usuario } = req;
    const data = req.body;
    const pid = req.params;


    if(usuario._id != data.auth){
        return res.status(400).json({
            success: false,
            msg: 'No puedes editar este post'
        });
    }

    const updatedPost = await Post.findByIdAndUpdate(pid, data, {new: true});

    res.status(200).json({
        success: true,
        msg: 'Post Actualizado',
        user: updatedPost,
    });
    }catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el post',
            error: err.message
        });
    }
}

export const deletePost = async (req, res) =>{
    try{
    const { usuario } = req;
    const data = req.body;
    const pid = req.params;


    if(usuario._id != data.auth){
        return res.status(400).json({
            success: false,
            msg: 'No puedes eliminar este post'
        });
    }

    const updatedPost = await Post.findByIdAndUpdate(pid, { stauts: false }, {new: true});

    res.status(200).json({
        success: true,
        msg: 'Post eliminado',
        user: updatedPost,
    });
    }catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al eliminar el post',
            error: err.message
        });
    }
}