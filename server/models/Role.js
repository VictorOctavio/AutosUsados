import {model, Schema} from 'mongoose';

const roleSchema = Schema({
    name: String
},{
    versionKey: false
});

export default model('role', roleSchema);