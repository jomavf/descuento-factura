const knex = require('./knex'); // connection

module.exports = {
    getAll(){
        return knex('usuarios');
    },
    getOne(id){
        return knex('usuarios').where('id',id).first();
    },
    create(usuario){
        return knex('usuarios').insert(usuario, '*');
    },
    update(id,usuario){
        return knex('usuarios').where('id',id).update(usuario, '*');
    },
    delete(id){
        return knex('usuarios').where('id',id).del();
    },
    checkUser(usuario,password){
        return knex('usuarios').where('usuario',usuario).and.where('password',password)
    }
}