const deudores = require('../data/deudores')
exports.seed = function(knex) {
  return knex('deudores').del()
    .then(function () {
      return knex('deudores').insert(deudores);
    });
};