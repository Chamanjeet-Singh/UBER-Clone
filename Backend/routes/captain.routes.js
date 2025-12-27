import express from 'express';
import registerCaptain from '../controllers/captain.controller.js';
const router = express.Router();
import {body } from 'express-validator';


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




export default router;

