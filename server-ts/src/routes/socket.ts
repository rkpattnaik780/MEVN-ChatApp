import {Message} from "../models/message.model";
import {Events, Rooms} from "./enums/SocketIO";
import {Socket} from "socket.io";
import {MessageCreateDTO, UserMessageDTO} from "../models/message.model.dto";
import {UserConnectDTO} from "../models/user.model.dto";

let connectedUsers: UserConnectDTO[] = [];

export const prepareSocket = (socket: Socket): void => {
    // Join main room
    socket.join(Rooms.Main);

    function fetchMessages(): void {
        Message.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "providerId",
                    foreignField: "providerId",
                    as: "user"
                }
            },
            {$sort: {time: 1}},
            {$unwind: "$user"},
            {
                $project: {
                    _id: 1,
                    message: 1,
                    time: 1,
                    username: "$user.username",
                    image: "$user.image",
                    name: "$user.name"
                }
            }
        ]).exec((err, messages: UserMessageDTO[]): void => {
            if (err) throw err;
            socket.emit(Events.MessagesFetched, messages);
            socket.to(Rooms.Main).emit(Events.MessagesFetched, messages);
        });
    }

    // Send message event handler
    socket.on(Events.SendMessage, (data: MessageCreateDTO): void => {
        new Message(data).save().then(() => {
            fetchMessages();
        });
    });

    // Fetch messages event handler
    socket.on(Events.FetchMessages, fetchMessages);


    socket.on(Events.UserJoined, async (data: UserConnectDTO): Promise<void> => {
        if (!connectedUsers.some(user => user._id === data._id)) {
            connectedUsers.push({
                _id: data._id,
                username: data.username,
                image: data.image
            });
        }
        socket.emit(Events.UsersFetched, connectedUsers);
        socket.to(Rooms.Main).emit(Events.UsersFetched, connectedUsers);
    });

    socket.on(Events.UserDisconnected, async (data: UserConnectDTO): Promise<void> => {
        connectedUsers = connectedUsers.filter(user => user._id !== data._id);
        socket.emit(Events.UsersFetched, connectedUsers);
        socket.to(Rooms.Main).emit(Events.UsersFetched, connectedUsers);
    });
};