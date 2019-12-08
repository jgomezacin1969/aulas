const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');
const usuarios = new Usuarios();
const { crearMensaje } = require('../utils/funcutils');


io.on('connection', (client) => {




    client.emit('enviarMensaje', crearMensaje(false, "Administrador", "Bienvenido al Chat"));

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback(crearMensaje(true, "Administrador", "Nombre,SALA es obligatorio"));
        } else {
            usuarios.agregarPersona(client.id, data.nombre, data.sala);

            client.join(data.sala);
            client.broadcast.emit('EnviarMensajeClientes', crearMensaje(false, "Administrador", `NUEVO usuario ${data.nombre}`));
            console.log('==========       =============');
            console.log(usuarios.getPersonasBySala(data.sala));
            client.broadcast.to(data.sala).emit('listaPersonas', 'LISTA PERSONAS:' + usuarios.getPersonasBySala(data.sala).length);
            client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasBySala(data.sala));
            if (data.input != null) {
                client.broadcast.to(data.sala).emit('EnviarMensajeClientes', crearMensaje(false, data.nombre, 'MENSAJE A TOD@S:' + data.input));
            }
            // console.log(usuarios);
            return callback({ error: false, lista: usuarios.getPersonasBySala(data.sala) });
        }


    });


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
        let personaDesconectada = usuarios.delPersona(client.id);
        if (personaDesconectada) {
            console.log('SALLLLAAAAAAAAAAAA' + personaDesconectada.sala);
            // client.broadcast.to(personaDesconectada.sala).emit('EnviarMensajeClientes', crearMensaje(false, "Administrador", `El usuario ${personaDesconectada.nombre} salió del Chat`));
            client.broadcast.to(personaDesconectada.sala).emit('listaPersonas', usuarios.getPersonasBySala(personaDesconectada.sala));
            console.log(usuarios.getPersonasBySala(personaDesconectada.sala));
        }
    });

    // Escuchar el cliente
    client.on('enviarMensajeServidor', (data, callback) => {

        console.log(data);
        let user = usuarios.getPersona(client.id).nombre;
        let mensa = { usuario: user, mensaje: data.mensaje };
        let lGlobal = !(data.nickname);
        console.log(lGlobal);
        if (lGlobal) {
            client.broadcast.emit('EnviarMensajeClientes', mensa);
        } else {
            let userid = usuarios.getPersonaByName(data.nickname);
            if (userid != undefined) {
                client.broadcast.to(userid.id).emit('EnviarMensajeClientes', crearMensaje(false, user, `El usuario ${user} te ha enviado un mensaje`));
            }
        }
    });

    client.on('mensajeASala', (data, callback) => {
        console.log('Mensaje para repartir', data);
        if (!data.mensaje || !data.sala) {
            return callback(crearMensaje(true, "Administrador", "Mensaje,SALA es obligatorio"));
        } else {
            console.log('distribuir');
            client.broadcast.to(data.sala).emit('mensajeASalaClientes', data);
            return callback({ error: false, lista: usuarios.getPersonasBySala(data.sala) });
        }


    });
});