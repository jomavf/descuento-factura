const knex = require('./knex'); // connection

module.exports = {
    getAll(query){
        const knexQuery = knex('costosgastos')

        if (query.bancoId){
            return knexQuery.where('banco_id',query.bancoId)
        }
        return knexQuery
    },
    getOne(id){
        return knex('costosgastos').where('id',id).first();
    },
    create(usuario){
        return knex('costosgastos').insert(usuario, '*');
    },
    update(id,usuario){
        return knex('costosgastos').where('id',id).update(usuario, '*');
    },
    delete(id){
        return knex('costosgastos').where('id',id).del();
    }
}