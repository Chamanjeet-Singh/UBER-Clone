import {  ride } from "../models/ride.model.js";
import { sendMessageToSocketId } from "../socket.js";
import { getDistanceandTime, getAddressCoordinate, getAutoCompleteSuggestionsService } from "./maps.service.js";

export async function getFare(pickup, destination){


    function getOTP(num){
        function generateOTP(num) {
            const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
            return otp;
        }
        return generateOTP(num);

    }

    if(!pickup || !destination){
        throw new Error('Pickup and destination are required to calculate fare');
    }

    const distanceTime = await getDistanceandTime(pickup, destination);

    const baseFare = {
        ubergo: 2.55,
        uberxl: 3.85,
        comfort: 3.50
    };

    const perMileRate = {
        ubergo: 1.75,
        uberxl: 2.85,
        comfort: 2.20
    };

    const perMinuteRate = {
        ubergo: 0.35,
        uberxl: 0.50,
        comfort: 0.40
    };

    const fare = {
        ubergo: Math.round(baseFare.ubergo + ((distanceTime.distance.value/1609.34) * perMileRate.ubergo) + ((distanceTime.duration.value/60) * perMinuteRate.ubergo)),
        uberxl: Math.round(baseFare.uberxl + ((distanceTime.distance.value/1609.34) * perMileRate.uberxl) + ((distanceTime.duration.value/60) * perMinuteRate.uberxl)),
        comfort: Math.round(baseFare.comfort + ((distanceTime.distance.value/1609.34) * perMileRate.comfort) + ((distanceTime.duration.value/60) * perMinuteRate.comfort)),
    };

    return fare;

}

export const createRide = async ({
    user,
    pickup,
    destination,
    vehicleType,
    
}) => {
    

    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required to create a ride');
    }

    const fare = await getFare(pickup, destination);

    const Ride = ride.create({
        user,
        pickup,
        destination,
        otp: getOTP(6),
        fare: fare[vehicleType],
    })
    
    return ride;
};

export const confirmRide = async ({ rideId ,captain}) => {

    if(!rideId){
        throw new Error('Ride ID is required to confirm ride');
    }

    await ride.findOneandUpdate({ _id: rideId }, {
        status: 'accepted',
        captain: captain._id
    });

    const ride = await ride.findOne({
         _id: rideId 
        }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

return ride;

};

export const startRide = async ({ rideId, otp, captain }) => {
    if(!rideId || !otp){
        throw new Error('Ride ID and OTP are required to start ride');
    }

    const ride = await ride.findOne({ _id: rideId}).populate('captain').populate('user').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'accepted'){
        throw new Error('Ride is not in accepted status');
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP');
    }

    await ride.findOneandUpdate({ _id: rideId }, {
        status: 'ongoing'
    });

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    });

    return ride;
}

export const endRide = async ({ rideId, captain }) => {
    if(!rideId){
        throw new Error('Ride ID is required to end ride');
    }

    const ride = await ride.findOne({
         _id: rideId,
        captain: captain._id
        }).populate('captain').populate('user').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'ongoing'){
        throw new Error('Ride is not in ongoing status');
    }

    await ride.findOneandUpdate({ _id: rideId }, {
        status: 'completed'
    });

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-ended',
        data: ride
    });

    

    return ride;
}

