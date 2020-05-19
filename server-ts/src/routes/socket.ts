"use strict";

export const prepareSocket = (socket: any) => {
  console.log("Hello World!");
  socket.on("send_message", function(data) {
    // new Message(data).save().then(() => {
    //   fetchMessages();
    // });
  });
};