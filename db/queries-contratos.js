const knex = require('./knex'); // connection

module.exports = {
    getAll(){
        return knex('contratos');
    },
    getOne(id){
        return knex('contratos').where('id',id).first();
    },
    create(objectToInsert){
        return knex('contratos').insert(objectToInsert, '*');
    },
    update(id,dataToUpdate){
        return knex('contratos').where('id',id).update(dataToUpdate, '*');
    },
    delete(id){
        return knex('contratos').where('id',id).del();
    }
}