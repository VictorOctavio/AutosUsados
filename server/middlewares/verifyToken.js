import jwt from 'jsonwebtoken';
import Role from '../models/Role';
import User from '../models/User';

export const verifyToken = async (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ err: true, message: 'no existe token en cabezera' });

    try {
        //Validamos token
        const token_validate = jwt.verify(token, process.env.SECRET);
        req.user = token_validate;
        next();

    } catch (err) { return res.json({ err: true, message: err.message }) }
}


export const getToken = async (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) return next();

    try {
        
        //Validamos token
        const token_validate = jwt.verify(token, process.env.SECRET);
        req.user = token_validate;
        next();

    } catch (err) { res.json({ err: true, message: err.message }) }
}

export const verifyModerador = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.json({ err: true, message: 'usuario no existe' });

        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === ('moderator' || 'admin')) return next();
        }

        return res.json({ err: true, message: 'No tienes permisos de moderador' });
    } catch (err) { return res.json({ err: true, message: err.message }) }
}

export const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.json({ err: true, message: 'usuario no existe' });

        const roles = await Role.find({ _id: { $in: user.roles } });

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') return next();
        }

        return res.json({ err: true, message: 'No tienes permisos de moderador' });
    } catch (err) { return res.json({ err: true, message: err.message }) }
}