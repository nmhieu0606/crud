const config = require('../config')
const { Router } = require('express')

const router = Router()
 
// Initialize Controller
const khachhangController = require('../controllers/khachhangController')

// Get All
router.get('/khachhang', khachhangController.list)

// Get One
router.get('/khachhang/:id', khachhangController.show)

// Create
router.post('/khachhang', config.isAuthenticated, khachhangController.create)

// Update
router.put('/khachhang/:id', config.isAuthenticated, khachhangController.update)

router.delete('/khachhang/:id',config.isAuthenticated,khachhangController.delete)

module.exports = router