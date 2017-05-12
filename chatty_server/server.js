// server.js

// const express = require('express');
const SocketServer = require('ws');

// Set the port to 3001
const PORT = 3001;

// Id Generator
const uuidV4 = require('uuid/v4');

// Create a new express server
// const server = express()
//    // Make the express server serve static assets (html, javascript, css) from the /public folder
//   .use(express.static('public'))
//   .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ port: PORT });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
const broadcast = (message) => {
  wss.clients.forEach((c) => {
      c.send(JSON.stringify(message));
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (newMessage) => {
    const message = JSON.parse(newMessage);
    console.log(message)
    message.id = uuidV4();
    switch (message.type) {
      case "Post Message":
      message.type = "Incoming Message"
        break;
      case "Post Notification":
      message.type = "Incoming Notification"
        break;
    }
    broadcast(message);
    console.log('received message: ', message)
  })


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
