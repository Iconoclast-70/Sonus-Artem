const net = require("net");
const fs = require("fs");

const server = net.createServer();

server.on("connection", (socket) => {
  socket.setEncoding("utf8");

  //Retrieve the file requested by the client
  socket.on("data", (requestedFile) => {
    //Send the file to the client
    fs.readFile(`./${requestedFile}`, "utf8", (error, data) => {
      if (!error) {
        socket.write(data);
      } else {
        socket.write(error);
      }
    });
  });

  //Log to the console when the client disconnects
  socket.on("end", () => {
    console.log("client left");
  });
});

//Have the server listen on port 9000
server.listen(9000, () => {
  console.log("opened server on port: ", 9000);
});
