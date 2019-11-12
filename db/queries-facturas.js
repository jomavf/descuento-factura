const knex = require('./knex'); // connection

module.exports = {
    getAll(query){
        const knexQuery = knex('facturas')

        if (query.userId){
            return knexQuery.where('usuario_id',query.userId)
        }
        return knexQuery
    },
    getOne(id){
        return knex('facturas').where('id',id).first();
    },
    create(objectToInsert){
        return knex('facturas').insert(objectToInsert, '*');
    },
    update(id,dataToUpdate){
        return knex('facturas').where('id',id).update(dataToUpdate, '*');
    },
    delete(id){
        return knex('facturas').where('id',id).del();
    }
}