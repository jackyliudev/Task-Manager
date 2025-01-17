const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

const authMiddleware = require('../middleware/auth');

// @desc    Login/Landing page
// @route   GET /

router.get('/', authMiddleware.checkAuth,homeController.getIndex)

module.exports = router;