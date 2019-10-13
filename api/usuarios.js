const express = require('express');
const router = express.Router();

const queries = require('../db/queries')

function validId (req,res,next){
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid ID'));
}
router.get('/',(req,res)=>{
    queries.getAll().then(usuarios => {
        return res.json(usuarios);
    })
})

router.get('/:id', validId, (req,res,next)=>{
    queries.getOne(req.params.id).then(usuario => {
        if(usuario){
            return res.json(usuario)
        } else{
            next();
        }
    })
})

router.post('/', (req, res, next)=> {
    queries.create(req.body).then(usuarios => {
        return res.json(usuarios[0]);
    })
})

router.put('/:id', validId, (req,res,next) => {
    queries.update(req.params.id, req.body).then( usuarios => {
        return res.json(usuarios[0]);
    })
})

router.delete('/:id', validId, (req,res,next) => {
    queries.delete(req.params.id).then(() => {
        return res.json({
            deleted: true
        });
    })
})

module.exports = router;
