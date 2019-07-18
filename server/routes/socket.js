const Message = require("../models/message-model");

var prepareSocket = function(socket) {
  console.log("hello world");
  socket.on("send_message", function(data) {
    new Message(data).save().then(message => {
      fetchMessages();
    });
  });

  socket.on("fetch_messages", fetchMessages);

  function fetchMessages() {
    Message.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "githubId",
          foreignField: "githubId",
          as: "user"
        }
      },
      { $sort: { time: 1 } },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          message: 1,
          githubId: 1,
          username: "$user.username",
          image: "$user.image"
        }
      }
    ]).exec((err, messages) => {
      if (err) throw err;
      socket.emit("messages_fetched", messages);
    });
  }
};

module.exports = prepareSocket;
