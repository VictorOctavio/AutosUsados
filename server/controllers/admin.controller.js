import User from '../models/User';
import Role from '../models/Role';
import Auto from '../models/Auto';
import sendMail from '../lib/nodemailer';


// ACCION BLOCK USER 
export const bloquearUser = async(req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id});
        if(!user) return res.json({err: true, message: 'No se ha encontrado usuario con ese id'});

        const bloquedUser = await User.findOneAndUpdate({_id: user.id}, {bloqued: !user.bloqued}, {new: true});
        if(!bloquedUser) return res.json({err: true, message: 'No se ah podido bloqued'});

        let message;
        if(user.bloqued) message = 'Usuario ha sido desbloqueado';
        else message = 'Usuario ha sido bloqueado';

        return res.json({err: null, message, data: bloquedUser});
    
    }catch(err){return res.json({err: true, message: err.message})}
}


//ELIMINAR PUBLICACION
export const deletePublicacion = async(req, res) => {
    try{
        
        const publicacion = await Auto.findOneAndRemove({_id: req.params.id});
        if(!publicacion) return res.json({err: true, message: 'No se ha podido eliminar actualizar'});

        return res.json({err: null, message: `${publicacion.titulo} se ha eliminado con exito!`});

    }catch(err){return res.json({err: true, message: err.message})}
}


//Asignar roles
export const asignarRoles = async(req, res) => {
    try{
        const {id} = req.params;
        const {rol, accion} = req.body;

        const rolesFound = await Role.findOne({name: rol});
        if(!rolesFound) return res.json({err: true, message: 'roles no existentes'});

        const user = await User.findOne({_id: id});
        if(!user) return res.json({err: true, message: 'usuario no encontrado con ese id'});

        // //Asignar o quitar
        if(accion === 'add') user.roles = user.roles.push(rolesFound._id);
        else  user.roles = user.roles.filter(role => role.toString() !== rolesFound._id.toString());

        const update = await User.findOneAndUpdate({_id: id}, user, {new: true});
        if(!update) return res.json({err: true, message: 'no se ha podido asiganar roles al usuario'})

        return res.json({err: null, message: 'Roles asignado', data: update});

    }catch(err){return res.json({err: true, message: err.message})}
}


//Send message user
export const sendMailUsers = async(req, res) => {
    try{
        // message = {url: "", titulo: "", texto: ""}
        const {message, destino} = req.body;

        let users = [];
        if(destino === 'subs') console.log('subs');
        else users = await User.find({confirmMail: true});
        
        users.map(user => sendMail(destino, null, user, message));

    }catch(err){return res.json({err: true, message: err.message})}
}


//Get usuarios
export const getUsers = async(req, res) => {
    try{
        
        const {limit = 30, page = 1, sort = '-createdAt'} = req.query;
        const users = User.paginate({}, {limit, page, sort});

        return res.json({err: null, data: users});
        
    }catch(err){return res.json({err: true, message: err.message})}
}