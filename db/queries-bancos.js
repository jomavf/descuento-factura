const knex = require('./knex'); // connection

module.exports = {
    getAll(){
        return knex('bancos');
    },
    getOne(id){
        return knex('bancos').where('id',id).first();
    },
    create(objectToInsert){
        return knex('bancos').insert(objectToInsert, '*');
    },
    update(id,dataToUpdate){
        return knex('bancos').where('id',id).update(dataToUpdate, '*');
    },
    delete(id){
        return knex('bancos').where('id',id).del();
    }
}