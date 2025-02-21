import User from "../user/user.model.js"
import Category from "../category/category.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const categoryExist = async (name= "") => {
    const existe = await Category.findOne({name})
    if(existe){
        throw new Error(`The category ${name} already exists`)
    }
}


