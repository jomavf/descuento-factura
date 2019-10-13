
exports.up = function(knex) {
    return knex.schema.createTable('contratos', (table)=> {
        table.increments('id');
        table.integer('banco_id').unsigned();
        table.foreign('banco_id').references('bancos.id')
        table.integer('factura_id').unsigned();
        table.foreign('factura_id').references('facturas.id')
        table.text('codigo_unico');
        table.decimal('monto_descuento',10,2);
        table.decimal('valor_neto',10,2);
        table.decimal('valor_recibido',10,2);
        table.decimal('valor_entregado',10,2);
        table.decimal('tcea',20,7);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('contratos');
};
