const net = require("net");
const fs = require("fs");

const getFile = function (requestedFile) {
  const connection = net.createConnection({
    host: "localhost",
    port: 9000,
  });
  connection.setEncoding("utf8");

  //Request the file name specified from the command line from the server
  connection.on("connect", () => {
    console.log(`Requesting file ${requestedFile} .......`);
    //send a message to the server
    connection.write(requestedFile);
  });

  //Log the file sent back by the server
  connection.on("data", (data) => {
    console.log(data);
  });
};

//Get the requested file from the user
getFile(process.argv[2]);
