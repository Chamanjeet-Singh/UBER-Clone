import { createRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getCaptainsInTheRadius } from "../services/maps.service.js";
import { getAddressCoordinate } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { ride } from "../models/ride.model.js";
import { endRide } from "../services/ride.service.js";

export const createRideController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try{
        const ride = await createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
         res.status(201).json({ ride });

         const pickupCoordinates = await getAddressCoordinate(pickup);
         console.log(pickupCoordinates);

        const captainsInTheRadius = await  getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 1.5);

        ride.otp = ""
        const ridewithUser = await ride.modelName.findOne({ _id: ride._id }).populate('user');

        captainsInTheRadius.map(captain =>{

            console.log(captain, ride);

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: ridewithUser });

        })

    }catch(error){
        return res.status(500).json({ error: error.message });
    }

};

export const getFareController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try{
        const fare = await getFare(pickup, destination);
        return res.status(200).json({ fare });

    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

export const confirmRideController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try{
        const ride = await rideService.confirmRide({rideId, captain: req.captain});

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });
        return res.status(200).json(ride);  
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

export const startRideController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
    
    try{
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}

export const endRideController = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try{
        const ride = await endRide({ rideId, captain: req.captain });
        
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })  
        return res.status(200).json(ride);
    }catch(error){
        return res.status(500).json({ error: error.message });
    }
}