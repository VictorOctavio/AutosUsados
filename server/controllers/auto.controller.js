import Auto from '../models/Auto';
import cloudinary from 'cloudinary';
import fs from 'fs-extra';
import User from '../models/User';

const validateInformacion = (data, images) => {
    let  message = {err: false, message: ''};
    if(data.titulo.length <= 4) message = {err: true, message: 'EL TITULO ES DEMASIADO CORTO'}
    if(data.titulo.length > 50) message = {err: true, message: 'EL TITULO ES DEMASIADO LARGO'}
    if(images.length <= 0) return  message = {err: true, message: 'NECESITAR SUBIR IMAGEN'}
    if(data.descripcion.length >= 2000) return  message = {err: true, message: 'LA DESCRIPCION DEBE SER MENOR A 1000 CARACTERES'}

    return message;
}

export const createPublication = async (req, res) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    const statePublicacion = validateInformacion(req.body, req.files);
    if(statePublicacion.err) return res.json({err: true, message: statePublicacion.message})

    try {

        //Capturar data del body
        const { titulo, precio, descripcion, unidadPrecio, tipoPublicacion, kilometros, carroceria, color, marca, modelo, transmision } = req.body;
        const informacion = { kilometros, carroceria, color, marca, modelo, transmision }

        //create model auto
        const auto = new Auto({ titulo, precio, unidadPrecio, descripcion, informacion, tipoPublicacion });

        auto.userId = req.user.id;

        // Validar usuario y su informacion completa
        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.json({ err: true, message: 'usuario no existe' })
        for (let item in user.informacion) {
            if (typeof user.informacion[item] === 'string') {
                if (user.informacion[item].length <= 0) return res.json({ err: true, message: `necesitas completar todos los datos de informacion.` })
            }
        }
        auto.user = user.informacion;

        //save imagenes in cloudinary
        for (let i = 0; i < req.files.length; i++) {

            //Subir clodinary
            const data = await cloudinary.v2.uploader.upload(req.files[i].path, {
                folder: 'autosUsados'
            })
            auto.imagesURL.push(data.url);

            //Remover image
            await fs.remove(req.files[i].path);
        }

        //Guardar publicacion
        await auto.save();

        return res.json({ err: null, auto, message: `se ha creado ${auto.titulo} exitosamente!` });

    } catch (err) { return res.json({ err: true, message: err.message }) }
}


//GET PUBLICACION
export const getPublicacion = async (req, res) => {
    try {
        const { id } = req.params;

        const auto = await Auto.findOne({ _id: id });
        if (!auto) return res.json({ err: true, message: 'Publicación no existente' });

        //Tomar Referencia
        let referencia0 = 200000;
        let referencia1 = 800;

        //Relacionados segun el precio caso dolar y caso peso
        let relacionado1;
        if (auto.unidadPrecio === 'peso') {
            relacionado1 = await Auto.find({
                tipoPublicacion: auto.tipoPublicacion,
                $or: [{ unidadPrecio: "peso", precio: { $lte: auto.precio * + referencia0 } },
                { unidadPrecio: "dolar", precio: { $lte: auto.precio / 310 + referencia1 } }]
            }).sort('-createAt')

        } else {
            relacionado1 = await Auto.find({
                tipoPublicacion: auto.tipoPublicacion,
                $or: [{ unidadPrecio: "peso", precio: { $lte: auto.precio * 310 + referencia0 } },
                { unidadPrecio: "dolar", precio: { $lte: auto.precio + referencia1 } }]
            }).sort('-createAt')
        }

        //Relacionado seguro tipo de la carroceria
        let relacionados2 = await Auto.find({ "informacion.carroceria": auto.informacion.carroceria }).sort('-createAt');

        //Guardar historial de visita del usuario
        let guardado = false;
        if (req.user) {
            const user = await User.findOne({ _id: req.user.id });
            if (!user.visitas.includes(auto.informacion.marca)) {
                if (user.visitas.length < 5) user.visitas.push(auto.informacion.marca);
                else {
                    user.visitas.shift();
                    user.visitas.push(auto.informacion.marca);
                }
                await User.findByIdAndUpdate({ _id: req.user.id }, user, { new: true });
            }

            // Saber si el usuario tiene guardado 
        
            if(user.guardados.includes(auto._id)){
                user.guardados = user.guardados.filter(item => item.toString() !== id.toString());
                guardado = true;
            } 
        }

        relacionado1 = relacionado1.filter(item => item._id.toString() !== auto._id.toString());
        relacionados2 = relacionados2.filter(item => item._id.toString() !== auto._id.toString());

        const relacionados = [relacionado1, relacionados2];
        const data = {...auto._doc, relacionados}

        data.guardado = guardado;

        //Respuesta exitosa!
        return res.json({ err: null, data })

    } catch (err) { return res.json({ err: true, message: err.message }) }
}



//GET PUBLICACIONES
export const getPublicaciones = async (req, res) => {
    try {

        //Obtener querys(filtros)
        const { id = 'all' } = req.params;
        const { limit = 21, page = 1, sort = '-createdAt' } = req.query;

        let data = [];
        let recomedacionesHistorial = [];
        let historial = [];

        if (req.user) {
            const user = await User.findOne({ _id: req.user.id });
            if (user.visitas.length > 0) historial = user.visitas;
        };


        // Query filtros
        const filterQuery = {
            "informacion.marca": req.query.marca || null,
            "informacion.color": req.query.color || null,
            "informacion.carroceria": req.query.carroceria || null,
            "informacion.kilometros": parseInt(req.query.kilometros) || null,
            "user.residencia": req.query.residencia || null
        }
        

        for(let item in filterQuery){
            if(filterQuery[item]) {
                if(item === "informacion.kilometros") filterQuery[item] = {$lte: filterQuery[item]}
                else filterQuery[item] = { $regex: '.*' + filterQuery[item] + '.*', $options: "i" }
            } else delete filterQuery[item];
        }

        //Traer todos las publicaciones
        if (id === 'all') {

            // Si usuario existe y tiene visitas recomendadas
            if (historial.length > 0) {
                recomedacionesHistorial = await Auto.paginate({ "informacion.marca": { $in: historial } }, { limit, page, sort });
                data = await Auto.paginate(filterQuery, { limit, page, sort })
            } else data = await Auto.paginate(filterQuery, { limit, page, sort })

        } else if (id === 'auto' || id === 'moto' || id === 'accesorio') {

            // Realizar busqueda segun tipo de publicación
            filterQuery.tipoPublicacion = id;
            data = await Auto.paginate(filterQuery, { limit, page, sort });

        } else {

            //Realizar Busqueda segun el buscardor tipeado por usuario
            data = await Auto.paginate({
                $or: [
                    { titulo: { $regex: '.*' + id + '.*', $options: "i" } },
                    { tipoPublicacion: { $regex: '.*' + id + '.*', $options: "i" } },
                    { "informacion.color": { $regex: '.*' + id + '.*', $options: "i" } },
                    { "informacion.marca": { $regex: '.*' + id + '.*', $options: "i" } },
                    { "informacion.carroceria": { $regex: '.*' + id + '.*', $options: "i" } }
                ]
            }, { limit, page, sort });
        }

        if(recomedacionesHistorial.length <= 0) recomedacionesHistorial = data;
        data.recomendacion = recomedacionesHistorial.docs;
        
        //Respuesta exitosa!
        return res.json({ err: null, data: data })

    } catch (err) { return res.json({ err: true, message: err.message }) }
}



//UPDATE PUBLICACION
export const updatePublicacion = async (req, res) => {
    try {
        //Capturar id y datos a actualizar
        const { id } = req.params;
        const update = req.body;

        //Verificar si el elem a update es del usuario
        const auto = await Auto.findOne({ _id: id });
        if (!auto) return res.json({ err: true, message: 'auto con ese id no encontrado' })
        if (req.user.id !== auto.userId.toString()) return res.json({ err: true, message: 'La publicacion no es del usuario' });


        const autoUpdate = await Auto.findOneAndUpdate({ _id: id }, update, { new: true })
        if (!autoUpdate) return res.json({ err: true, message: 'Error al intentar actualizar' });

        //Respuesta exitosa!
        return res.json({ err: null, message: `La publicación ${autoUpdate.titulo} Actualizo con exito`, data: autoUpdate })

    } catch (err) { return res.json({ err: true, message: err.message }) }
}


//DELETE PUBLICACION
export const deletePublicacion = async (req, res) => {
    try {

        //Capturar id de elemento a eliminar
        const { id } = req.params;

        //Verificar si el elem a update es del usuario
        const auto = await Auto.findOne({ _id: id });
        if (!auto) return res.json({ err: true, message: 'auto con ese id no encontrado' })
        if (req.user.id !== auto.userId.toString()) return res.json({ err: true, message: 'La publicacion no es del usuario' });

        //eliminar elem
        const autoDelete = await Auto.findOneAndDelete({ _id: id });
        if (!autoDelete) return res.json({ err: true, message: 'Error al intentar eliminar' });

        //Respuesta exitosa!
        return res.json({ err: null, message: `Se ha eliminado ${autoDelete.titulo}` });

    } catch (err) { return res.json({ err: true, message: err.message }) }
}
