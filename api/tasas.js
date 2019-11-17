const express = require('express');
const router = express.Router();

const queries = require('../db/queries-tasas')

router.get('/',(req,res)=>{
    queries.getAll().then(result => {
        return res.json(result);
    })
})

router.get('/:id', (req,res,next)=>{
    queries.getOne(req.params.id).then(object => {
        if(object){
            return res.json(object)
        } else{
            next();
        }
    })
})

router.post('/', (req, res, next)=> {
    queries.create(req.body).then(listCreated => {
        return res.json(listCreated[0]);
    })
})

router.put('/:id', (req,res,next) => {
    queries.update(req.params.id, req.body).then( listUpdated => {
        return res.json(listUpdated[0]);
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
