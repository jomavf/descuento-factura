const tasas = require('../data/tasas')
exports.seed = function(knex) {
  return knex('tasas').del()
    .then(function () {
      return knex('tasas').insert(tasas);
    });
};