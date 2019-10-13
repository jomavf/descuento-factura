const bancos = require('../data/bancos')
exports.seed = function(knex) {
  return knex('bancos').del()
    .then(function () {
      return knex('bancos').insert(bancos);
    });
};