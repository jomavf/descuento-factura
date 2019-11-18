
exports.up = function(knex) {
    return knex.schema.createTable('contratos', (table)=> {
        table.increments('id');
        table.integer('banco_id').unsigned();
        table.foreign('banco_id').references('bancos.id')
        table.integer('factura_id').unsigned();
        table.foreign('factura_id').references('facturas.id')
        table.integer('usuario_id').unsigned();
        table.foreign('usuario_id').references('usuarios.id')
        // Resultados
        table.datetime("fecha_giro"); 
        table.datetime("fecha_vencimiento");
        table.decimal('valor_nominal',10,2);
        table.integer('dias').unsigned();
        table.decimal('retencion',10,2);
        table.decimal('tasa_efectiva',10,7);
        table.decimal('porcentaje_descuento',10,7);
        table.decimal('descuento',10,2);
        table.decimal('costos_iniciales',10,2);
        table.decimal('costos_finales',10,2);
        table.decimal('valor_neto',10,2);
        table.decimal('valor_recibido',10,2);
        table.decimal('valor_entregado',10,2);
        table.decimal('tcea',10,7);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('contratos');
};
