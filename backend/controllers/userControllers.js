const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async  (req, res) => {
    // destructure all user fields from the request body
    const { name, email, password } = req.body
    // check all fields are completed
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please complete all fields')
    }
    // check if user exists
    const userExists = await User.findOne({
        email
    })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })        
    } else {
        res.status(400)
        throw new Error('Invalid details')
    }
})

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const authenticateUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        email
    })
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    get current user
// @route   GET /api/users/me
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {    
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
        _id,
        name,
        email
    })
})

// generate jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    authenticateUser,
    getCurrentUser
}