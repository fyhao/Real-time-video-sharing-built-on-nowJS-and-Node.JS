/**
 * Real Time Video and Audio Sharing built on Socket.IO and Node.JS
 * Modernized from nowJS implementation
 * Author: fyhao
 */

// include utility library
const util = require('./util.js');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// create express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// serve static content in /static directory
app.use("/static", express.static(__dirname + "/static"));

// handle main page, the client page
app.get("/", function(req, res) {
	res.contentType("text/html");
	res.send(util.template('index'));
});

// handle host page, the page to do the main control
app.get("/host", function(req, res) {
	res.contentType("text/html");
	res.send(util.template('host'));
});

// make this process listen to port 80 or 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

// to create a unique key for each registered session name
let key = 0;

// to store each registered session name and socket mapping
const clients = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
	console.log('New client connected:', socket.id);
	
	// Generate a name for this client
	const clientName = 'user' + ++key;
	clients.set(socket.id, { name: clientName, isHost: false });
	
	// Handle host registration
	socket.on('register-host', () => {
		const client = clients.get(socket.id);
		if (client) {
			client.isHost = true;
			console.log('Host registered:', clientName);
		}
	});
	
	// Handle WebRTC signaling for video/audio streaming
	socket.on('offer', (data) => {
		// Broadcast offer to all clients except sender
		socket.broadcast.emit('offer', {
			offer: data.offer,
			sender: socket.id
		});
	});
	
	socket.on('answer', (data) => {
		// Send answer back to the offerer
		io.to(data.target).emit('answer', {
			answer: data.answer,
			sender: socket.id
		});
	});
	
	socket.on('ice-candidate', (data) => {
		// Forward ICE candidates
		if (data.target) {
			io.to(data.target).emit('ice-candidate', {
				candidate: data.candidate,
				sender: socket.id
			});
		} else {
			// Broadcast to all if no specific target
			socket.broadcast.emit('ice-candidate', {
				candidate: data.candidate,
				sender: socket.id
			});
		}
	});
	
	// Legacy support: Handle image sharing (for canvas-based streaming)
	socket.on('share-image', (data) => {
		const client = clients.get(socket.id);
		if (client && client.isHost) {
			// Broadcast image to all clients except the sender
			socket.broadcast.emit('update-image', data);
		}
	});
	
	// Handle disconnection
	socket.on('disconnect', () => {
		const client = clients.get(socket.id);
		if (client) {
			console.log('Client disconnected:', client.name);
			clients.delete(socket.id);
		}
		// Notify other clients about disconnection
		socket.broadcast.emit('peer-disconnected', socket.id);
	});
});

