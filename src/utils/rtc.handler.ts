import { Socket } from "socket.io";

interface ICandidateRoomParams {
  roomID: string;
  peerID: string;
  name: string;
}

interface IRoomParams {
  roomID: string;
  peerID: string;
}

export const rooms = new Map<string, string[]>();

export const RTCHandler = (socket: Socket) => {
  console.log(`[info]: A user [${socket.id}] has connected.`);

  const joinRoom = (data: IRoomParams) => {
    console.log(`[info]: A user is joining the room.`);

    socket.join(data.roomID);
    socket.to(data.roomID).emit("user-joined-room", data);

    if (!rooms.has(data.roomID)) {
      rooms.set(data.roomID, [data.peerID]);
    } else {
      const peers = rooms.get(data.roomID);
      peers?.push(data.peerID);
      rooms.set(data.roomID, peers!);
    }

    socket.emit("all-users", rooms.get(data.roomID));

    socket.on("disconnect", () => {
      console.log(`[info]: A user [${data.peerID}] has been disconnected.`);
      socket.to(data.roomID).emit("user-left-room", data.peerID);
    });
  };

  const candidateJoinRoom = (data: ICandidateRoomParams) => {
    console.log(`[info]: A candidate is joining the room.`);
    console.log(`[info]: ${data.name} [${data.peerID}] is joining the room.`);

    console.log(data);
    socket.join(data.roomID);
    console.log(socket.rooms.keys());
    socket.to(data.roomID).emit("all-users", rooms.get(data.roomID));
    socket.to(data.roomID).emit("candidate-joined-room", data);

    socket.on("disconnect", () => {
      console.log(
        `[info]: A candidate [${data.peerID}] has been disconnected.`
      );
      socket.to(data.roomID).emit("candidate-left-room", data);
      candidateLeaveRoom(data);
    });
  };

  const candidateLeaveRoom = (data: ICandidateRoomParams) => {
    console.log(`[info]: A candidate is leaving the room.`);
    console.log(`[info]: ${data.name} [${data.peerID}] is leaving the room.`);

    socket.to(data.roomID).emit("candidate-left-room", data);
  };

  socket.on("candidate-join-room", candidateJoinRoom);
  socket.on("join-room", joinRoom);
};
