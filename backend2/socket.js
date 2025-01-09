const socketIO = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: "https://uber-clone-liart-eight.vercel.app",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected: " + socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (!userId || !userType) {
        console.error("Invalid join event data");
        return;
      }

      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { new: true }
          );
        } else {
          console.error("Invalid userType");
        }
      } catch (error) {
        console.error("Error updating socketId:", error.message);
      }
    });

    socket.on("update-location-captain", async (data) => {
      try {
        const { captainId, location } = data;

        if (
          !location ||
          typeof location.lng !== "number" ||
          typeof location.ltd !== "number"
        ) {
          console.error("Invalid location data received");
          return;
        }

        await captainModel.findByIdAndUpdate(captainId, {
          location: {
            lng: location.lng,
            ltd: location.ltd,
          },
        });
      } catch (error) {
        console.error("Error updating captain location:", error.message);
      }
    });

    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  if (!io) {
    console.error("Socket.io is not initialized.");
    return;
  }
  console.log("Sending message to: ", socketId);

  io.to(socketId).emit(messageObject.event, messageObject.data);
};

module.exports = { initializeSocket, sendMessageToSocketId };
