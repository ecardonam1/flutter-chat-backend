const { comprobarJWT } = require("../helpers/jwt");
const {io} = require("../index");
const {usuarioConectado,usuarioDesconectado, grabarMensaje} = require('../controllers/socket');





//Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    // console.log(client.handshake.headers);
    const [valido,uid] = comprobarJWT(client.handshake.headers['x-token'])

    if(!valido){return client.disconnect();}

    usuarioConectado(uid);  

    client.join(uid);

    client.to(uid).emit('');

    client.on('mensaje-personal',async (payload)=>{

      await  grabarMensaje(payload);
      io.to(payload.para).emit('mensaje-personal',payload);
    });

    client.on('disconnect', () => { 
      usuarioDesconectado(uid);
     });

  });