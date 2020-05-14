const Message = require("../models/message-model");
var connected_users = [];

var prepareSocket = function(socket) {
  // Join main room
  socket.join("main");

  // Send message event handler
  socket.on("send_message", function(data) {
    new Message(data).save().then(() => {
      fetchMessages();
    });
  });

  // Fetch messages event handler
  socket.on("fetch_messages", fetchMessages);

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
      { $sort: { time: 1 } },
      { $unwind: "$user" },
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

  socket.on("user_joined", async data => {
    if (!connected_users.some(user => user._id === data._id)) {
      connected_users.push({
        _id: data._id,
        username: data.username,
        image: data.image
      });
    }
    socket.emit("users_fetched", connected_users);
    socket.to("main").emit("users_fetched", connected_users);
  });

  socket.on("user_disconnected", async data => {
    connected_users = connected_users.filter(user => user._id !== data._id);
    socket.emit("users_fetched", connected_users);
    socket.to("main").emit("users_fetched", connected_users);
  });
};

module.exports = prepareSocket;
