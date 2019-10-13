exports.up = function(knex) {
    return knex.schema.createTable('deudores', (table)=> {
        table.increments('id');
        table.text('nombres');
        table.text('apellidos');
        table.text('contacto');
        table.text('telefono');
        table.text('ruc');
        table.text('direccion');
        table.text('nif');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('deudores')
};