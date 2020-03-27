var divUsuarios = $('#divUsuarios');
var frmEnviar = $('#frmEnviar');
var edtMensaje = $('#edtMensaje');
var divChatbox = $('#divChatbox');


function renderizarUsuarios(personas) { // [{},{},{}]

    var salita = $('#salita');
    let propietario = params.get('nombre');
    let usuarioBold = '';
    salita.html(params.get('sala'));


    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '<a href="index.html" class="active"> Salir</a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {
        let usuario = personas[i].nombre;
        if (personas[i].nombre === propietario) {
            usuarioBold = '<span class="font-weight-bold">' + usuario;
        } else {
            usuarioBold = '<span>' + usuario;
        }

        cfile = (usuario === "LAURA" || usuario === "JUANMA" || usuario === "PEPELU") ? usuario : "2";
        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '"  href="javascript:void(0)"><img src="assets/images/users/' + cfile + '.jpg" alt="user-img" class="img-circle"> ' + usuarioBold + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }
    divUsuarios.html(html);

    edtMensaje.attr("placeholder", propietario + ': Escribe tu mensaje aquí');
}

function renderizarMensaje(lpropio, data) { // [{},{},{}]
    let usuario = data.usuario;
    let sala = data.sala;
    let mensa = data.mensaje;

    let cfile = (usuario === "LAURA" || usuario === "JUANMA" || usuario === "PEPELU") ? usuario : "2";

    // var html = divChatbox.html();
    var html = '';

    if (lpropio) {
        html += '<li class="">';
        html += '<div class="chat-img"><img src="assets/images/users/' + cfile + '.jpg" alt="user" /></div>';
        html += '<div class="chat-content">';
        html += '<h5>' + usuario + '</h5>';
        html += '<div class="box bg-light-inverse">' + mensa + '</div>';
    } else {
        html += '<li class="animated fadeIn">';
        html += '<div class="chat-img"><img src="assets/images/users/' + cfile + '.jpg" alt="user" /></div>';
        html += '<div class="chat-content">';
        html += '<h5>' + usuario + '</h5>';
        html += '<div class="box bg-light-info">' + mensa + '</div>';
    }

    html += '</div>';
    html += '<div class="chat-time">' + data.hora + '</div>';
    html += '</li>';

    divChatbox.append(html);
    divChatbox.scrollTop(divChatbox[0].scrollHeight - divChatbox[0].clientHeight);
}


divUsuarios.on('click', 'a', function() {

    var id = $(this).data("id");
    if (id) {
        console.log(id);
    }

});

frmEnviar.submit((e) => {
    let texto = edtMensaje.val();
    // alert("Texto a enviar:" + texto);
    let today = new Date();

    let hora = strZero(today.getHours(), 2) + ':' + strZero(today.getMinutes(), 2) + ' h';

    let mensa = { usuario: usuario.nombre, sala: usuario.sala, mensaje: texto, hora: hora };
    // console.log(mensa);
    socket.emit('mensajeASala', mensa, (data) => { console.log(data); });
    renderizarMensaje(true, mensa);
    e.preventDefault();
});


function strZero(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}