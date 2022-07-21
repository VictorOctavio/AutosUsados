import { createTransport } from 'nodemailer';
import sendMail from './nodemailerMSG';

async function sendEmail(accion, token, email, message) {
    try {

        let textHTML = ``;

        if(accion === 'confirm') textHTML = sendMail.verifyMail(token);
        else if(accion === 'recuperarClave') textHTML = sendMail.recuperarClave(token);
        else if(accion === ('users' || 'subs')) textHTML = sendEmail.messageUsers(message); 
        
        const transporter = createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        await transporter.sendMail({
            from: 'Bienvenido a UsadoAutos <usadosautos@gmail.com>',
            to: email,
            subject: 'Empieza a publicar o ver autos ahora mismo',
            html: textHTML
        })

    } catch (err) { return console.log(err.message) }
}

export default sendEmail;