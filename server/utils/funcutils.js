const crearMensaje = (lerror, usuario, mensaje) => {
    return { error: lerror, usuario: usuario, mensaje: mensaje, fecha: new Date().getTime() };
};

module.exports = { crearMensaje };