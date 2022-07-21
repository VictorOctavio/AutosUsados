import User from '../models/User';
import Auto from '../models/Auto';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import sendEmail from '../lib/nodemailer';
import cloudinary from 'cloudinary';
import fs from 'fs-extra';



//Create new user
export const createUser = async (req, res) => {
    try {
        const { email, nombre, password, roles } = req.body;

        const validateEmail = await User.findOne({ email });
        if (validateEmail) return res.json({ err: true, message: 'Email ya registrado' });

        //Create model new Usuario
        const user = new User({ email, nombre, password: await User.encryptPassword(password) });

        //roles
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            if (foundRoles.length <= 0) return res.json({ err: true, message: 'roles no existente' });
            user.roles = foundRoles.map(rol => rol._id)
        } else {
            const role = await Role.findOne({ name: "user" });
            user.roles = [role._id]
        }

        //Guardar usuarios base datos
        const new_user = await user.save();
        if (!new_user) return res.json({ err: true, message: 'error al intentar guarda usuario' });

        //Crate token y send email
        const token = jwt.sign({ id: new_user._id }, process.env.SECRET);

        await sendEmail('confirm', token, email);

        //Message exito
        return res.header('auth-token', token).json({ err: null, message: `Hola, ${new_user.nombre} te hemos enviado un email para validar tu cuenta`, data: user, token });

    } catch (err) { return res.json({ err: true, message: err.message }) }
}
//VERIFICATION USER
export const validarEmail = async (req, res) => {
    try {
        const updateUser = await User.findOneAndUpdate({ _id: req.user.id }, { confirmMail: true });
        if (!updateUser) return res.json({ err: true, message: `Error de Validació` });
        return res.json({ err: null, message: `Bienvenido ${updateUser.nombre}`, nameUser: updateUser.nombre });
    } catch (err) { return res.json({ err: true, message: err.message }) }
}



//RECUPERAR CONTRASEÑA
export const recuperarClave = async (req, res) => {
    try {

        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.json({ err: true, message: 'Email no existente' });

        const token = jwt.sign({ id: user._id }, process.env.SECRET);

        await sendEmail('recuperarClave', token, email);

        return res.header('auth-token', token).json({ err: null, token, message: `Se ah enviado mail en ${user.email} para recuperar clave` });

    } catch (err) { return res.json({ err: true, message: err.message }) }
}



//Confimación de recuperacion de cuenta
export const confrimRecuperarClave = async (req, res) => {
    try {

        const { password, confirm } = req.body;
        if (password !== confirm) return res.json({ err: true, message: 'Las claves no coinciden' });

        const clave = await User.encryptPassword(password);
        const updateUser = await User.findOneAndUpdate({ _id: req.user.id }, { password: clave });
        if (!updateUser) return res.json({ err: true, message: 'No se ha podido actualizar clave' });

        return res.json({ err: null, message: `${updateUser.nombre.toUpperCase()}, se actualizo tu clave.` });

    } catch (err) { return res.json({ err: true, message: err.message }) }
}



//LOGIN
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.json({ err: true, message: 'email o clave incorrecta' })

        const validatePassword = await User.comparePassword(password, user.password);
        if (!validatePassword) return res.json({ err: true, message: 'email o clave incorrecta' });

        if (user.bloqued) return res.json({ err: true, message: `${user.nombre}, tu cuenta ha sido bloqueada` });
        if (!user.confirmMail) return res.json({ err: true, message: `${user.nombre}, tu email no ha sido confirmado` })

        //token
        const token = jwt.sign({ id: user._id }, process.env.SECRET);

        const dataUsuario = {
            nombre: user.nombre,
            visitar: user.visitas
        }

        //Message exito
        return res.header('auth-token', token).json({ err: null, message: `Hola ${user.nombre.toUpperCase()} :)`, data: dataUsuario, token });

    } catch (err) { return res.json({ err: true, message: err.message }) }
}



// Validar token 
export const validateToken = async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.json({ err: true, message: 'usuario no existente' });

        let informacion_usuario = {
            ...user.informacion,
            avatar: user.avatar
        }

        return res.json({ err: false, message: 'token & usuario correcto', data: informacion_usuario });

    } catch (err) { return res.json({ err: true, message: err.message }) }
}



//Updata data
export const updateDataUser = async (req, res) => {
    try {
        const update = req.body;

        const userUpdate = await User.findOneAndUpdate({ _id: req.user.id }, { informacion: update }, { new: true });
        if (!userUpdate) return res.json({ err: true, message: `${userUpdate.nombre.toUpperCase()}, no se ha podido actualizar :(.` });

        return res.json({ err: null, message: `${userUpdate.nombre.toUpperCase()}, iformación actualizada :).`, data: userUpdate })

    } catch (err) { return res.json({ err: true, message: err.message }) }
}
//Updata data
export const updateGuardadosUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.json({ err: true, message: 'Error de validación de usuario' });

        const publicacion = await Auto.findOne({ _id: id });
        if (!publicacion) return res.json({ err: true, message: 'No se ha podido encontrar publicación solicitada' });

        let accion = '';
        if (user.guardados.includes(id)) {
            accion = 'eliminado';
            user.guardados = user.guardados.filter(item => item.toString() !== id.toString());
        } else {
            accion = 'guardado'
            user.guardados.push(publicacion._id);
        }

        const userUpdate = await User.findOneAndUpdate({ _id: req.user.id }, { guardados: user.guardados }, { new: true });
        if (!userUpdate) return res.json({ err: true, message: `${publicacion.titulo.toUpperCase()}, no se ha podido guardar.` });

        return res.json({ err: null, message: `${publicacion.titulo.toUpperCase()}, se ha ${accion} correctamente.`, accion, data: publicacion })

    } catch (err) { return res.json({ err: true, message: err.message }) }
}



//Publicaciones del usuario y  Guardados
export const getPublicacionesUser = async (req, res) => {
    try {
        // OBTENER PUBLICACIONES USUARIO
        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.json({ err: true, message: 'Usuario no encontrado' });

        const guardados = await Auto.paginate({ _id: { $in: user.guardados } }, { sort: '-createdAt', limit: 15 });

        const publications = await Auto.paginate({ userId: req.user.id });

        publications.guardados = guardados;

        return res.json({ err: false, data: publications });
    } catch (err) { return res.json({ err: true, message: err.message }) }
}

//Publicaciones del usuario update
export const updatePublicacionesUser = async (req, res) => {
    try {

        // VALIDAR EXISTENCIA
        const validateCreate = await Auto.findOne({ _id: req.params.id });
        if (!validateCreate) return res.json({ err: true, message: 'No se ha encontrado publicación :(' });
        if (validateCreate.userId.toString() !== req.user.id) return res.json({
            err: true, message: 'No tiene autorizacion para completar esta acción', validateCreate: req.user.id
        });

        // PUBLICACION UPDATE
        const publication = await Auto.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (!publication) return res.json({ err: true, message: 'No se ha podido completar actualización :(' });

        return res.json({ err: false, data: publication, message: `${publication.titulo} se ha actualizado con exito! :)` });
    } catch (err) { return res.json({ err: true, message: err.message }) }
}

//Publicaciones del usuario delete
export const deletePublicacionesUser = async (req, res) => {
    try {

        // VALIDAR EXISTENCIA
        const validateCreate = await Auto.findOne({ _id: req.params.id });
        if (!validateCreate) return res.json({ err: true, message: 'No se ha encontrado publicación :(' });
        if (validateCreate.userId.toString() !== req.user.id) return res.json({
            err: true, message: 'No tiene autorizacion para completar esta acción', validateCreate: req.user.id
        });

        // DELETE
        const publication = await Auto.findOneAndRemove({ _id: req.params.id });
        if (!publication) return res.json({ err: true, message: 'Error al intentar eliminar' });

        return res.json({ err: false, data: publication, message: `${publication.titulo} se elimino con exito` });

    } catch (err) { return res.json({ err: true, message: err.message }) }
}

//ACTUALIZAR AVATAR USUARIO
export const updateAvatarUser = async (req, res) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    try {

        //validacion
        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.json({ err: true, message: 'error de usuario' });

        if (!req.file) return res.json({ err: true, message: 'error al enviar mas imagenes!' });

        //Subir cloudinary
        const data = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'autosUsados/avatar' })
        const userUpdate = await User.findOneAndUpdate({ _id: req.user.id }, { avatar: data.url }, { new: true });
        if (!userUpdate) return res.json({ err: true, message: 'No se ha podido actualizar avatar' });

        //Eliminar
        fs.remove(req.file.path);

        //Respuesta exitosa
        return res.json({ err: null, message: `${user.nombre}, tu avatar se ha actualizado!`, data: data, image: data.url });

    } catch (err) { return res.json({ err: true, message: err.message }) }
}