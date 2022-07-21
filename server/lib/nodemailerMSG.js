const sendEmail = {
  verifyMail: (token) => {
    return (
      `
      <div style=" font-family: Arial; padding: 50px 50px; background: linear-gradient( 225deg, #380472 0%, #18101f 50%, #4c2bc5 100% ); width: auto; margin: 0 auto; " > <div style=" background: rgba(255, 255, 255, 0.158); padding: 10px 0; width: 100%; " > <h1 style=" color: #fff; font-weight: 800; margin-bottom: 10px; text-align: center; " > VALICACIÓN DE CUENTA </h1> <h6 style=" color: rgb(255, 255, 255); font-weight: 300; font-size: 18px; text-align: center; " > Tu email ha sido registrado en <a href="http://localhost:3000/" target="_blanck" style="color: rgb(180, 149, 12); text-align: center" >usedautos.com</a > </h6> <a href="http://localhost:3000/confirmar-cuenta/${token}" target="_blanck" style="margin-top: 50px;" > <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/05/attachment_80478730.png?auto=format&q=60&fit=max&w=930" alt="img-gaming" width="300px" style="display: block; margin: 0 auto" /> </a> <h6 style="font-size: 16px; text-align: center; color: #fff"> haz click en la imagen o <a href="http://localhost:3000/confirmar-cuenta/${token}" target="_blanck" style="color: rgb(180, 149, 12)" >aqui</a > para validarlo </h6> <p style="text-align: center; color: #fff"> En caso que no seas tú, puedes ignorarlo </p> <img src="https://res.cloudinary.com/dyntggmrp/image/upload/v1623778080/logo_isbszw.png" style="display: block; margin: 0 auto" width="50px" /> </div> </div>
      `
    )
  },

  recuperarClave: (token) => {
    return (
      `
      <div style=" font-family: Arial; padding: 50px 50px; background: linear-gradient( 225deg, #16012e 0%, #08030e 50%, #0d0627 100% ); width: auto; margin: 0 auto; " > <div style=" background: rgba(255, 255, 255, 0.158); padding: 10px 0; width: 100%; " > <h1 style=" color: #fff; font-weight: 800; margin-bottom: 10px; text-align: center; " > RECUPERAR CLAVE </h1> <h6 style=" color: rgb(255, 255, 255); font-weight: 300; font-size: 18px; text-align: center; " > Solicitaste recuperar clave en <a href="http://localhost:3000/" target="_blanck" style="color: rgb(180, 149, 12); text-align: center" >usedautos.com</a > </h6> <a href="http://localhost:3000/recuperar-cuenta/${token}" target="_blanck" style="margin-top: 50px" > <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/05/attachment_80478730.png?auto=format&q=60&fit=max&w=930" alt="img-gaming" width="300px" style="display: block; margin: 0 auto" /> </a> <h6 style="font-size: 16px; text-align: center; color: #fff"> haz click en la imagen o <a href="http://localhost:3000/recuperar-cuenta/${token}" target="_blanck" style="color: rgb(180, 149, 12)" >aqui</a > para restablecerla </h6> <p style="text-align: center; color: #fff"> En caso que no seas tú, puedes ignorarlo, <br />su cuenta esta segura. </p> <img src="https://res.cloudinary.com/dyntggmrp/image/upload/v1623778080/logo_isbszw.png" style="display: block; margin: 0 auto" width="50px" /> </div> </div>
      `
    )
  },

  messageUsers: (message) => {
    return(
      `
      <div style=" font-family: Arial; padding: 50px 50px; background: linear-gradient( 225deg, #b40505 0%, #0a0a0a 50%, #361c04 100% ); width: auto; margin: 0 auto; " > <div style=" background: rgba(255, 255, 255, 0.158); padding: 10px 0; width: 100%; " > <h1 style=" color: #fff; font-weight: 800; margin-bottom: 10px; text-align: center; " >${message.titulo.toUpperCase()}</h1><a href="${message.url}" target="_blanck" style="margin-top: 50px;" > <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/05/attachment_80478730.png?auto=format&q=60&fit=max&w=930" alt="img-gaming" width="100px" style="display: block; margin: 0 auto" /> </a><p style="text-align: center; color: #fff; width: 60%; margin: 20px auto;">${message.texto}</p> <img src="https://res.cloudinary.com/dyntggmrp/image/upload/v1623778080/logo_isbszw.png" style="display: block; margin: 0 auto" width="50px" /> </div> </div>
      `
    )
  }
}

export default sendEmail;