import {  ride } from "../models/ride.model.js";
import { getDistanceandTime, getAddressCoordinate, getAutoCompleteSuggestionsService } from "./maps.service.js";

async function getFare(pickup, destination){


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
        ubergo: baseFare.ubergo + ((distanceTime.distance.value/1609.34) * perMileRate.ubergo) + ((distanceTime.duration.value/60) * perMinuteRate.ubergo),
        uberxl: baseFare.uberxl + ((distanceTime.distance.value/1609.34) * perMileRate.uberxl) + ((distanceTime.duration.value/60) * perMinuteRate.uberxl),
        comfort: baseFare.comfort + ((distanceTime.distance.value/1609.34) * perMileRate.comfort) + ((distanceTime.duration.value/60) * perMinuteRate.comfort),
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

