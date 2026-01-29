import express from 'express';
import { Router } from 'express';
import { body, query } from 'express-validator';
import { confirmRideController, createRideController, getFareController, startRideController, endRideController } from '../controllers/ride.controller.js';
import { ride } from '../models/ride.model.js';
import {  authCaptain, authUser } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/create', 
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['ubergo', 'uberxl', 'comfort']).withMessage('Invalid vehicle type'),
    createRideController
)

router.get('/get-fare',
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    authUser, getFareController);


router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    confirmRideController)

router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride ID'),
    query('otp').isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    startRideController
)

router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride ID'),
    endRideController     
)



export default router;