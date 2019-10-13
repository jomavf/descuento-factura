
exports.up = function(knex) {
    return knex.schema.createTable('bancos', (table)=> {
        table.increments('id');
        table.decimal('tasa',30,7);
        table.text('moneda');
        table.text('nombre');
        table.decimal('costos_gastos_ope',8,2);
        table.decimal('tasa_moratoria',30,7);
        table.decimal('tasa_compensatoria',30,7);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('bancos');
};
