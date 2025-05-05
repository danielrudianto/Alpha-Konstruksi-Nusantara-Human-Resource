"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RTCHandler = exports.rooms = void 0;
exports.rooms = new Map();
const RTCHandler = (socket) => {
    console.log(`[info]: A user [${socket.id}] has connected.`);
    const joinRoom = (data) => {
        console.log(`[info]: A user is joining the room.`);
        socket.join(data.roomID);
        socket.to(data.roomID).emit("user-joined-room", data);
        if (!exports.rooms.has(data.roomID)) {
            exports.rooms.set(data.roomID, [data.peerID]);
        }
        else {
            const peers = exports.rooms.get(data.roomID);
            peers === null || peers === void 0 ? void 0 : peers.push(data.peerID);
            exports.rooms.set(data.roomID, peers);
        }
        socket.emit("all-users", exports.rooms.get(data.roomID));
        socket.on("disconnect", () => {
            console.log(`[info]: A user [${data.peerID}] has been disconnected.`);
            socket.to(data.roomID).emit("user-left-room", data.peerID);
        });
    };
    const candidateJoinRoom = (data) => {
        console.log(`[info]: A candidate is joining the room.`);
        console.log(`[info]: ${data.name} [${data.peerID}] is joining the room.`);
        console.log(data);
        socket.join(data.roomID);
        console.log(socket.rooms.keys());
        socket.to(data.roomID).emit("all-users", exports.rooms.get(data.roomID));
        socket.to(data.roomID).emit("candidate-joined-room", data);
        socket.on("disconnect", () => {
            console.log(`[info]: A candidate [${data.peerID}] has been disconnected.`);
            socket.to(data.roomID).emit("candidate-left-room", data);
            candidateLeaveRoom(data);
        });
    };
    const candidateLeaveRoom = (data) => {
        console.log(`[info]: A candidate is leaving the room.`);
        console.log(`[info]: ${data.name} [${data.peerID}] is leaving the room.`);
        socket.to(data.roomID).emit("candidate-left-room", data);
    };
    socket.on("candidate-join-room", candidateJoinRoom);
    socket.on("join-room", joinRoom);
};
exports.RTCHandler = RTCHandler;
