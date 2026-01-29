import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

let io;

/**
 * Initialize Socket.IO server attached to the given http server.
 * @param {import('http').Server} server
 * @returns {import('socket.io').Server} io instance
 */
export function initializeSocket(server) {
  if (io) return io;

  io = new Server(server, {
    cors: {
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on('join', async (data) => {
      const { userId, userType } = data;

        console.log(`User joined: ${userId} as ${userType} with socket id: ${socket.id}`);

        if (userType === 'user') {
            await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === 'captain') {
            await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
    });

            socket.on('update-location-captain', async (data) => {
                const { userId, location } = data;

                if(!location || !location.ltd || !location.lng){
                  return socket.emit('error', { message: 'Invalid location data' });
                }

                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });

            });

            socket.on('disconnect', () => {
                console.log(`User disconnected:, ${socket.id}`);
            });

    socket.on("disconnect", (reason) => {
      console.log("Client disconnected:", socket.id, reason);
    });
  });

}


/**
 * Send an event to a specific socket id.
 * @param {string} socketId
 * @param {string} event
 * @param {any} data
 */
export function sendMessageToSocketId(socketId, messageObject) {
    console.log(`Message sent to socket ${socketId}:`, messageObject.data);


  if (!io) throw new Error("Socket.IO is not initialized. Call initializeSocket(server) first.");
  io.to(socketId).emit(messageObject.event, messageObject.data);
}

export default { initializeSocket, sendMessageToSocketId };
