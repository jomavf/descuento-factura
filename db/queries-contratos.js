const knex = require('./knex'); // connection

module.exports = {
    getAll(query){
        const knexQuery = knex('contratos')

        if (query.userId){
            return knexQuery.where('usuario_id',query.userId)
        }
        return knexQuery
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