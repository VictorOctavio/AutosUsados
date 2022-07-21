import {model, Schema} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const autoSchema = Schema({
    tipoPublicacion: String,
    titulo: String,
    precio: Number,
    unidadPrecio: String,
    userId: {
        ref: 'user',
        type: Schema.Types.ObjectId
    },
    informacion: {
        kilometros: Number,
        carroceria: String,
        color: String,
        marca: String,
        modelo: Number,
        transmision: String
    },
    descripcion: String,
    imagesURL: Array,
    user: {
        telefono: String,
        residencia: String,
        correoElectronico: String,
        whatsapp: String
    }
},{
    versionKey: false,
    timestamps: true
});

autoSchema.plugin(paginate);

export default model('auto', autoSchema);