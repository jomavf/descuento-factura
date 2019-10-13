const usuarios = require('../data/usuarios')
exports.seed = function(knex) {
  return knex('usuarios').del()
    .then(function () {
      return knex('usuarios').insert(usuarios);
    });
};