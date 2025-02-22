import Post from "../post/post.model.js"
import Category from "../category/category.model.js"

export const createPost = async(req, res) =>{
    try {
        const {usuario} = req
        const data = req.body

        data.auth = usuario._id

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
    const {pid} = req.params;

    const post = await Post.findById(pid);

    if(usuario._id.toString() !== post.auth.toString()){
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
    const {pid} = req.params;

    const post = await Post.findById(pid);

    if(usuario._id.toString() !== post.auth.toString()){
        return res.status(400).json({
            success: false,
            msg: 'No puedes editar este post'
        });
    }

    const updatedPost = await Post.findByIdAndUpdate(pid, { status: false }, {new: true});

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