const knex = require('./knex'); // connection

module.exports = {
    getAll(){
        return knex('tasas');
    },
    getOne(id){
        return knex('tasas').where('id',id).first();
    },
    create(objectToInsert){
        return knex('tasas').insert(objectToInsert, '*');
    },
    update(id,dataToUpdate){
        return knex('tasas').where('id',id).update(dataToUpdate, '*');
    },
    delete(id){
        return knex('tasas').where('id',id).del();
    }
}