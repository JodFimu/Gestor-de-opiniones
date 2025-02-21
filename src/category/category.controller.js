import Category from './category.model.js';

export const getCategory = async (req, res) =>{
    try {
        const {limite=5, desde=0}= req.query
        const query = {status:true}

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            categories
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: err.message
        })
    }
}

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

export const editCategory = async (req, res) => {
    try{
        const { cid } = req.params;
        const data = req.body;

        const category = await Category.findByIdAndUpdate(cid, data, { new: true }); 

        return res.status(200).json({
            success: true,
            message: 'Categoria actualizada',
            category
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar la categoria',
            error: err.message
        });
    }
}

export const deleteCategory = async (req,res) =>{
    try {
        const {cid } = req.params;
        const category = await Category.findByIdAndUpdate(cid, {status: false}, {new: true});

        // funcion para cambiar la categoria de todas las publicaciones con esta categoria

        return res.status(200).json({
            success: true,
            message: 'Categoria eliminada',
            category
        });

    } catch (err) {
        
    }

}