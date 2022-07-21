import {connect} from 'mongoose';
import {MONGODB_URI} from './config';

( async() => {
    try{

        const db = await connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('DB connect to', db.connection.name);

    }catch(err){console.log(err)}
} )()