const express = require('express');
const router = express.Router();

const queries = require('../db/queries-costosgastos')

router.get('/',(req,res)=>{
    const {bancoId} =  req.query
    queries.getAll({bancoId}).then(usuarios => {
        return res.json(usuarios);
    })
})

router.get('/:id', (req,res,next)=>{
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

router.put('/:id', (req,res,next) => {
    queries.update(req.params.id, req.body).then( usuarios => {
        return res.json(usuarios[0]);
    })
})


router.delete('/:id', (req,res,next) => {
    queries.delete(req.params.id).then(() => {
        return res.json({
            deleted: true
        });
    })
})

module.exports = router;
