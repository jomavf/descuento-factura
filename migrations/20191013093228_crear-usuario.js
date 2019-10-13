exports.up = function(knex) {
    return knex.schema.createTable('usuarios', (table)=> {
        table.increments('id');
        table.text('cuenta_abono');
        table.text('tipo_documento');
        table.text('numero_documento');
        table.text('razon_social');
        table.text('direccion');
        table.text('nombre_contacto');
        table.text('cargo_contacto');
        table.text('telefono');
        table.text('telefono_contacto');
        table.text('ruc');
        table.text('codigo_postal');
        table.text('nombre');
        table.text('apellido');
        table.text('nif');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('usuarios')
};
