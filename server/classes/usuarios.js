class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        this.personas.push({ id, nombre, sala });
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(per => per.id === id)[0];
        return persona;
    }

    getPersonaByName(name) {
        let persona = this.personas.filter(per => per.nombre === name)[0];

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasBySala(sala) {
        let persona = this.personas.filter(per => per.sala === sala);
        return persona;
    }

    delPersona(id) {
        let personaBorrada = this.getPersona(id);
        let persona = this.personas.filter(per => per.id != id);
        this.personas = persona;
        return personaBorrada;
    }

    getPersonasPorSala(sala) {
        // Por hacer algo
    }

}


module.exports = { Usuarios };