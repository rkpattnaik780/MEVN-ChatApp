import {Message} from "../models/message.model";

let connectedUsers = [];

export const prepareSocket = function (socket) {
    // Join main room
    socket.join("main");

    function fetchMessages() {
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
        ]).exec((err, messages) => {
            if (err) throw err;
            socket.emit("messages_fetched", messages);
            socket.to("main").emit("messages_fetched", messages);
        });
    }

    // Send message event handler
    socket.on("send_message", function (data) {
        new Message(data).save().then(() => {
            fetchMessages();
        });
    });

    // Fetch messages event handler
    socket.on("fetch_messages", fetchMessages);


    socket.on("user_joined", async data => {
        if (!connectedUsers.some(user => user._id === data._id)) {
            connectedUsers.push({
                _id: data._id,
                username: data.username,
                image: data.image
            });
        }
        socket.emit("users_fetched", connectedUsers);
        socket.to("main").emit("users_fetched", connectedUsers);
    });

    socket.on("user_disconnected", async data => {
        connectedUsers = connectedUsers.filter(user => user._id !== data._id);
        socket.emit("users_fetched", connectedUsers);
        socket.to("main").emit("users_fetched", connectedUsers);
    });
};