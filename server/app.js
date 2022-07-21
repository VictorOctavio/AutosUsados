import express from 'express';
import morgan from 'morgan';

//Rutas
import autoRouter from './routes/auto.route';
import userRouter from './routes/user.route';
import adminRouter from './routes/admin.route';

//Inicialization express
const app = express();

//Config/Setting

//configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, auth-token');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));

//Rutas
app.use('/api', autoRouter);
app.use('/api', userRouter);
app.use('/api', adminRouter);

//Export module
export default app;