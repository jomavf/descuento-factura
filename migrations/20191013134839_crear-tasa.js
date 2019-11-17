
exports.up = function(knex) {
    return knex.schema.createTable('tasas', (table)=> {
        table.increments('id');
        table.decimal('valor',30,7);
        table.text('tipo');
        table.text('periodo');
        table.decimal('plazo_tasa',30,7);
        table.integer('banco_id').unsigned();
        table.foreign('banco_id').references('bancos.id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasas');
};