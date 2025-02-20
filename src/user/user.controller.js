import User from "../user/user.model.js"
import { hash, verify } from "argon2" 
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const updateUser = async (req,res) =>{
    try {
        const { usuario } = req;
        const data = req.body;

        const updatedUser = await User.findByIdAndUpdate(usuario._id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { usuario } = req;
        const { newPassword } = req.body;
        const { password } = req.body;
        
        const verifyPassword = await verify(usuario.password, password);

        if(!verifyPassword){
            return res.status(400).json({
                success: false,
                message: "Contraseña incorrecta"
            });
        }

        console.log(newPassword )
        const user = await User.findById(usuario._id);

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(usuario._id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        });
    }
};


export const updatePicture = async (req, res) =>{
    try{
        const { usuario } = req;
        let newProfilePicture = req.file ? req.file.filename : null;

        if(!newProfilePicture){
            return res.status(400).json({
                success: false,
                msg: 'No se proporciono ningun archivo'
            });
        }

        const user = await User.findById(usuario._id)

        if(user.profilePicture){
            const oldProfilePicture = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture)
            await fs.unlink(oldProfilePicture)
        }

        user.profilePicture = newProfilePicture
        await user.save()

        res.status(200).json({
            success: true,
            msg: 'Foto actualizada',
        });
    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la foto del usuario',
            error: err.message
        });
    }
}