export const verifyPassword = async (password) =>{
    return (req, res, next) =>{
        if(!req.usuario){
            return res.status(500).json({
                success: false,
                message: "Se quiere verificar la contraseña antes de validar el token"
            })
        }

        const matchOldAndNewPassword = verify(usuario.password, password);

        if (!matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "Las credenciales no coinciden"
            });
        }
        next();
    }
}