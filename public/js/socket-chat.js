var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
        renderizarUsuarios(resp.lista);
    });

});

socket.on('mensajeASalaClientes', function(data) {

    console.log('Clientes: nuevo mensaje', data);
    renderizarMensaje(false, data);


});
// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});



// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {
    console.log('LISTA PERSONAS');
    console.log(personas);
    renderizarUsuarios(personas);
});


// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});