
exports.up = function(knex) {
    return knex.schema.createTable('facturas', (table)=> {
        table.increments('id');
        table.integer('usuario_id').unsigned();
        table.foreign('usuario_id').references('usuarios.id');
        table.integer('deudor_id').unsigned();
        table.foreign('deudor_id').references('deudores.id');
        table.datetime('fecha_emision', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.datetime('fecha_vencimiento', { precision: 6 });
        table.text('numero_serie');
        table.text('numero_correlativo');
        table.text('tipo_pago');
        table.decimal('valor_venta',8,2);
        table.decimal('igv',16,7);
        table.decimal('precio_venta',20,2);
        table.decimal('monto_neto_pago',20,2);
        table.text('ruc_imprenta');
        table.datetime('fecha_impresion', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.text('numero_autorizacion_impresion');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('facturas');
};
