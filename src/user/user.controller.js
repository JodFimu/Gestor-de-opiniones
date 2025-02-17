import User from "../user/user.model.js"
import { hash, verify } from "argon2" 

export const updateuser = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { usuario } = req;
        const { newPassword } = req.body;

        const user = await User.findById(usuario._id);

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(uid, { password: encryptedPassword }, { new: true });

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