const contratos = require('../data/contratos')
exports.seed = function(knex) {
  return knex('contratos').del()
    .then(function () {
      return knex('contratos').insert(contratos);
    });
};