const knex = require('./knex'); // connection

module.exports = {
    getAll(){
        return knex('deudores');
    },
    getOne(id){
        return knex('deudores').where('id',id).first();
    },
    create(objectToInsert){
        return knex('deudores').insert(objectToInsert, '*');
    },
    update(id,dataToUpdate){
        return knex('deudores').where('id',id).update(dataToUpdate, '*');
    },
    delete(id){
        return knex('deudores').where('id',id).del();
    }
}