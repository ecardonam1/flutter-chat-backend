const usuario_model = require('../models/usuario_model');
const Usuario = require('../models/usuario_model');
const Mensaje = require('../models/mensaje_model');

const usuarioConectado = async (uid = '') => {
    const usuario = await usuario_model.findById(uid);
    usuario.online = true;

    await usuario.save();

    return usuario;
}

const usuarioDesconectado = async (uid = '') => {
    const usuario = await usuario_model.findById(uid);
    usuario.online = false;

    await usuario.save();

    return usuario;
}

const grabarMensaje = async(payload ) => {

    /*

    */  

       try{
           const mensaje = Mensaje(payload);
           await mensaje.save();
        return true;
       }catch(error){
        return false;
       }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}