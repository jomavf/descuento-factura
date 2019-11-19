
exports.up = function(knex) {
    return knex.schema.createTable('costosgastos', (table)=> {
        table.increments('id');
        table.integer('banco_id').unsigned();
        table.foreign('banco_id').references('bancos.id')
        table.text('nombre')
        table.text('descripcion')
        table.decimal('valor',10,2);
        table.integer('estado');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('costosgastos');
};
