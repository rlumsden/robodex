const express = require('express')
const {
    getRobots,
    addNewRobot,
    updateRobot,
    deleteRobot
} = require('../controllers/robotControllers')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/')
    .get(protect, getRobots)
    .post(protect, addNewRobot)

router.route('/:id')
    .put(protect, updateRobot)
    .delete(protect, deleteRobot)

module.exports = router