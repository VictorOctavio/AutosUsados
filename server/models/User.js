import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import paginate from 'mongoose-paginate-v2';

const userSchema = Schema({
    nombre: String,
    email: String,
    confirmMail: {
        default: false,
        type: Boolean
    },
    password: String,
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "role"
    }],
    bloqued: {
        type: Boolean,
        default: false
    },
    guardados: [{
        ref: 'auto',
        type: Schema.Types.ObjectId
    }],
    informacion: {
        telefono: String,
        whatsapp: String,
        residencia: String,
        correoElectronico: String
    },
    visitas: Array,
    avatar: {
        type: String,
        default: 'https://kahoot.com/files/2018/02/padraic_avatar.png' 
    }
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async (pass, password) => {
    return await bcrypt.compare(pass, password)
}

userSchema.plugin(paginate);

export default model('user', userSchema)