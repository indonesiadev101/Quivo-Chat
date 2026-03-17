const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.static(path.join(__dirname, 'public')));

// Menyimpan daftar user yang online
let users = {};

io.on('connection', (socket) => {
    console.log('User terhubung:', socket.id);

    // Saat user mendaftarkan ID-nya
    socket.on('register-id', (myID) => {
        users[myID] = socket.id;
        console.log(`ID ${myID} terdaftar dengan socket ${socket.id}`);
    });

    // Saat user mengirim pesan ke ID tertentu
    socket.on('kirim-pesan', (data) => {
        const targetSocketId = users[data.ke];
        if (targetSocketId) {
            io.to(targetSocketId).emit('pesan-baru', {
                dari: data.dari,
                isi: data.isi
            });
        }
    });

    socket.on('disconnect', () => {
        // Hapus user dari daftar jika disconnect
        for (let id in users) {
            if (users[id] === socket.id) delete users[id];
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));