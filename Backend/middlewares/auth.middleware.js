import userModel from "../models/user.model.js";
import captainModel from "../models/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklistToken.model.js";

const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Unauthorized.");
    }

    const isBlacklisted = await BlacklistToken.findOne({ "token": token });

    if (isBlacklisted) {
        return res.status(401).send("Access denied. Token is blacklisted.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).send("Invalid token.");
    }
}   

const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Unauthorized.");
    }

    const isBlacklisted = await BlacklistToken.findOne({ "token": token });

    if (isBlacklisted) {
        return res.status(401).send("Access denied. Token is blacklisted.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;
        return next();
       
    }
     catch (err) {
        res.status(401).send("Unauthorized.");
    }

}


export { authUser, authCaptain };
