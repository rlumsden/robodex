const express = require('express')
const {
    registerUser,
    authenticateUser,
    getCurrentUser
} = require('../controllers/userControllers')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', registerUser)    
router.post('/login', authenticateUser)
router.get('/me', protect, getCurrentUser)

module.exports = router