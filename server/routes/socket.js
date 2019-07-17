var prepareSocket = function(socket) {
  console.log("hello world");
  socket.on("send_message", function(data) {
    console.log(data);
  });
};

module.exports = prepareSocket;
