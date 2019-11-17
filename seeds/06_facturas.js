const facturas = require('../data/facturas')
exports.seed = function(knex) {
  return knex('facturas').del()
    .then(function () {
      return knex('facturas').insert(facturas);
    });
};