const Message = require("../models/message-model");

var prepareSocket = function(socket) {
  console.log("hello world");
  socket.on("send_message", function(data) {
    new Message(data).save().then(() => {
      fetchMessages();
    });
  });

  socket.join("main");

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
};

module.exports = prepareSocket;
