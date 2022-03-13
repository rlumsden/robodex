const asyncHandler = require('express-async-handler')
const Robot = require('../models/robotModel')
const User = require('../models/userModel')

// @desc    Get all users robots
// @route   GET /api/robots
// @access  Private
const getRobots = asyncHandler(async  (req, res) => {
    const robots = await Robot.find({ user: req.user.id })
    res.status(200).json(robots)
})

// @desc    Add new robot
// @route   POST /api/robots
// @access  Private
const addNewRobot = asyncHandler(async (req, res) => {
    if(!req.body.name) {
        res.status(400)
        throw new Error('please add name')
    }

    // const user = User.findById(req.user.id)
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a text field')
      }

    const robot = await Robot.create({
        name: req.body.name,
        user: req.user.id
    })
    res.json(robot)
})

// @desc    Update robot by id
// @route   PUT /api/robots/:id
// @access  Private
const updateRobot = asyncHandler(async (req, res) => {
    const robot = await Robot.findById(req.params.id)
    if(!robot) {
        res.status(400)
        throw new Error('robot not found')
    }

    const user = User.findById(req.user.id)
    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // check robot belongs to user
    if(robot.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

    const updatedRobot = await Robot.findByIdAndUpdate(
        req.params.id,
        req.body
    )
    res.json(updatedRobot)
})

// @desc    Delete robot by id
// @route   DELETE /api/robots/:id
// @access  Private
const deleteRobot = asyncHandler(async (req, res) => {
    const robot = Robot.findById(req.params.id)
    if(!robot) {
        res.status(400)
        throw new Error('robot not found')
    }

    const user = User.findById(req.user.id)
    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // check robot belongs to user
    if(robot.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

    await robot.deleteOne()
    res.json(`Robot ${req.params.id} deleted`)
})

module.exports = {
    getRobots,
    addNewRobot,
    updateRobot,
    deleteRobot
}