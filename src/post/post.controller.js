import Post from "../post/post.model.js"
import Category from "../category/category.model.js"

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

        const post = await Category.create(data);

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
    try {
        
    } catch (err) {
        
    }
}