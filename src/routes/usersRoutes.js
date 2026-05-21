const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const usersController = require('../controllers/usersController');

const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/users');
    },

    filename: (req, file, cb) => {
        const newFileName = 'user-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

router.get('/login', guestMiddleware, usersController.login);
router.post('/login', guestMiddleware, usersController.processLogin);

router.get('/register', guestMiddleware, usersController.register);
router.post('/register', guestMiddleware, upload.single('image'), usersController.store);

router.get('/profile', authMiddleware, usersController.profile);
router.get('/logout', authMiddleware, usersController.logout);

module.exports = router;