
const express = require('express')
const User = require('../models/user')
const {
    createUser,
    getCallendars,
    getSingleCallendar,
    deleteEvent,
    addEvent,
    checkLogin,
    addCal,
} = require('../controllers/calControllers')

const router = express.Router()

router.put('/:user_id',addCal)

router.get('/:user_id',getCallendars)

router.get('/:user_id/:cal_id',getSingleCallendar)

router.post('/', createUser)

router.post('/:login', checkLogin)

router.put('/:user_id/:cal_id/:month_id/:day_id/', addEvent)

router.delete('/:user_id/:cal_id/:month_id/:day_id/:event_id',deleteEvent)

router.patch('/:id', (req,res)=>{
    res.json({mssg: 'update single'})
})

module.exports = router