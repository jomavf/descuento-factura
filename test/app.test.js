const request = require('supertest');
const knex = require('../db/knex');
const expect = require('chai').expect;

const app = require('../app');

describe('CRUD usuarios', ()=> {

    before(()=>{
        //run migrations
        knex.migrate.latest()
        .then(()=>{
            // run seeds
            return knex.seed.run();
        });
    });
    
    it('Listar todos las filas',(done)=> {
        request(app)
            .get('/api/v1/usuarios')
            .set('Accept', 'application/json')
            .expect('Content-type',/json/)
            .expect(200, done());
    })
});