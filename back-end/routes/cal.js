const express = require('express')

const router = express.Router()

router.get('/',(req,res)=>{
    res.json({mssg: 'get All cal'})
})

router.get('/:id',(req,res)=>{
    res.json({mssg: 'get single cal'})
})

router.post('/',(req,res)=>{
    
    res.json({mssg: 'post a new cal'})
})

router.delete('/:id', (re1,res)=>{
    res.json({mssg: 'delete single'})
})

router.patch('/:id', (req,res)=>{
    res.json({mssg: 'update single'})
})

module.exports = router