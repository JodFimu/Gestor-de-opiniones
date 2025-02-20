import Category from './category.model.js';

export const createCategory = async (req, res) => {
    try{
        const data = req.body;

        const newCategory = await Category.create(data);

        return res.status(201).json({
            success: true,
            message: 'Categoria creada',
            category: newCategory
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al crear la categoria',
            error: err.message
        });   
    }
}