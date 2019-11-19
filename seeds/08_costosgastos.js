const costosgastos = require('../data/costosgastos')
exports.seed = function(knex) {
  return knex('costosgastos').del()
    .then(function () {
      return knex('costosgastos').insert(costosgastos);
    });
};