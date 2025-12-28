import express from 'express';
import {registerCaptain, getCaptainProfile, loginCaptain, logoutCaptain} from '../controllers/captain.controller.js';
const router = express.Router();
import {body } from 'express-validator';
import { authCaptain, authUser } from '../middlewares/auth.middleware.js';


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 2 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate number must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be a positive integer'),
    body('vehicle.vehicleType').isLength({ min: 3 }).withMessage('Vehicle type must be at least 3 characters long'),
],
    registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
    loginCaptain
)

router.get('/profile', authCaptain, getCaptainProfile);

router.get('/logout', authCaptain,  logoutCaptain);




export default router;

