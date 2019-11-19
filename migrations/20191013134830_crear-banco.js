
exports.up = function(knex) {
    return knex.schema.createTable('bancos', (table)=> {
        table.increments('id');
        table.text('nombre');
        table.text('moneda_aceptada');
        table.decimal('retencion',8,2);
        table.decimal('costos_iniciales',8,2);
        table.decimal('costos_finales',8,2);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('bancos');
};
