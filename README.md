# Real-time Video and Audio Sharing

A modernized real-time video and audio streaming application built with Node.js, Socket.IO, and WebRTC.

## 🚀 Features

- **Real-time Audio & Video Streaming**: Share your webcam and microphone with multiple viewers simultaneously
- **WebRTC Technology**: Direct peer-to-peer streaming with low latency
- **Modern Stack**: Built with Socket.IO 4.x and Express 4.x
- **Device Selection**: Choose from multiple cameras and microphones
- **Responsive Design**: Works on desktop and mobile devices
- **Multiple Viewers**: Support for multiple simultaneous viewers

## 📋 Requirements

- Node.js 14.0.0 or higher
- A modern web browser with WebRTC support (Chrome, Firefox, Safari, Edge)
- HTTPS connection (required for getUserMedia in production)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/fyhao/Real-time-video-sharing-built-on-nowJS-and-Node.JS.git
cd Real-time-video-sharing-built-on-nowJS-and-Node.JS
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node web.js
```

4. Open your browser:
   - Host page: `http://localhost:8080/host`
   - Viewer page: `http://localhost:8080/`

## 📖 Usage

### For the Host (Broadcaster):

1. Navigate to `http://localhost:8080/host`
2. Click **"Start Webcam & Audio"** button
3. Allow camera and microphone permissions when prompted
4. Select your preferred camera and microphone from the dropdowns
5. Your video and audio will now be broadcast to all connected viewers

### For Viewers:

1. Navigate to `http://localhost:8080/`
2. Click **"Connect to Stream"** button
3. The host's video and audio stream will appear automatically
4. You can disconnect at any time using the **"Disconnect"** button

## 🏗️ Architecture

### Technology Stack:

- **Backend**: Node.js with Express 4.x
- **Real-time Communication**: Socket.IO 4.x for signaling
- **Streaming**: WebRTC for peer-to-peer audio/video transmission
- **Frontend**: Vanilla JavaScript with modern Web APIs

### How It Works:

1. **Host** captures video/audio using `getUserMedia()` API
2. **Socket.IO** handles WebRTC signaling (offers, answers, ICE candidates)
3. **WebRTC** establishes peer-to-peer connections between host and viewers
4. **Viewers** receive and display the media stream in real-time

## 🔒 Security Notes

- For production deployment, use HTTPS (required for getUserMedia)
- Consider implementing authentication for host access
- Use TURN servers for NAT traversal in restrictive networks
- Limit the number of simultaneous connections based on your bandwidth

## 🌐 Deployment

### Heroku:

The app includes a `Procfile` for easy Heroku deployment:

```bash
heroku create your-app-name
git push heroku main
```

### Other Platforms:

Set the `PORT` environment variable. The app will automatically use it:

```bash
PORT=3000 node web.js
```

## 🆚 Changes from Original

This is a modernized version of the original nowJS-based application:

### What Changed:

- ✅ Replaced deprecated **nowJS** with **Socket.IO 4.x**
- ✅ Updated **Express** from 2.2.0 to 4.18.2
- ✅ Replaced canvas-based frame sharing with **WebRTC streaming**
- ✅ Added **audio streaming** support (was video-only before)
- ✅ Implemented proper WebRTC peer connections
- ✅ Modern ES6+ JavaScript syntax
- ✅ Improved UI with responsive design
- ✅ Device selection for cameras and microphones
- ✅ Better error handling and status messages

### Why These Changes:

1. **nowJS is deprecated** - No longer maintained, incompatible with modern Node.js
2. **WebRTC is the standard** - Purpose-built for real-time media streaming
3. **Better Performance** - Direct peer-to-peer connections instead of base64 images
4. **Audio Support** - The original only shared video frames, now includes audio
5. **Modern Dependencies** - Compatible with current Node.js versions

## 🐛 Troubleshooting

### Camera/Microphone Not Working:

- Ensure you've granted browser permissions
- Check if another application is using the devices
- Try using HTTPS instead of HTTP
- Verify your browser supports WebRTC

### Connection Issues:

- Check if both host and viewer are on the same network
- Verify the server is running and accessible
- Check browser console for error messages
- Try using different STUN/TURN servers

### No Audio/Video on Viewer Side:

- Ensure the host has started broadcasting
- Check if the viewer clicked "Connect to Stream"
- Verify both browsers support WebRTC
- Check the browser console for errors

## 📝 API Reference

### Socket.IO Events

**Client to Server:**
- `register-host` - Register as the broadcasting host
- `offer` - Send WebRTC offer to establish connection
- `answer` - Send WebRTC answer in response to offer
- `ice-candidate` - Exchange ICE candidates for NAT traversal

**Server to Client:**
- `offer` - Receive WebRTC offer from peer
- `answer` - Receive WebRTC answer from peer
- `ice-candidate` - Receive ICE candidate from peer
- `peer-disconnected` - Notification when a peer disconnects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project maintains the original license from the base repository.

## 👤 Authors

- Original Author: fyhao
- Modernization: Updated with Socket.IO and WebRTC support

## 🙏 Acknowledgments

- Original project by fyhao
- Socket.IO team for the excellent real-time framework
- WebRTC community for the peer-to-peer technology
