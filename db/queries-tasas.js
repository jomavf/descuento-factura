const knex = require('./knex'); // connection

module.exports = {
    // localhost:3000/api/v1/tasas?bancoId=2
    getAll(query){
        const knexQuery = knex('tasas')
        if (query.bancoId){
            return knexQuery.where('banco_id',query.bancoId)
        }
        return knexQuery
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