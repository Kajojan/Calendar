const express = require('express')
const User = require('../models/user')
const {
    createUser,
    getCallendars,
    getSingleCallendar,
    deleteEvent,
    addEvent
} = require('../controllers/calControllers')

const router = express.Router()

router.get('/:user_id',getCallendars)

router.get('/:user_id/:cal_id',getSingleCallendar)

router.post('/', createUser)

router.post('/:user_id/:cal_id/:month_id/:day_id/:event_id', addEvent)

router.delete('/:user_id/:cal_id/:month_id/:day_id/:event_id',deleteEvent)

router.patch('/:id', (req,res)=>{
    res.json({mssg: 'update single'})
})

module.exports = router