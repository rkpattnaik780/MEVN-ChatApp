import errorHandler from "errorhandler";

import app from "./app";
import { prepareSocket } from "./routes/socket";
import * as http from "http";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */

const port = app.get("port");
const server = http.createServer(app);
//const io = require("socket.io")(server);
import * as ioModule from "socket.io";
const io = ioModule.default(server);
io.on("connection", prepareSocket);

server.listen(port,() => {
  console.log("Server started successfully");
});

// const server = app.listen(port, () => {
//     console.log(
//         "  App is running at http://localhost:%d in %s mode",
//         app.get("port"),
//         app.get("env")
//     );
//     console.log("  Press CTRL-C to stop\n");
// });

export default server;
