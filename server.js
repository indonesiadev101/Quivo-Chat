const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Mengatur agar folder 'public' bisa diakses oleh browser (HTML, CSS, JS kita)
app.use(express.static('public'));

// Objek untuk menyimpan data user yang sedang online
let onlineUsers = {}; 

io.on('connection', (socket) => {
    console.log('Seseorang membuka Quivo...');

    // 1. Menangani Pendaftaran ID Quivo
    socket.on('register-user', (quivoID) => {
        socket.quivoID = quivoID; // Simpan ID di sesi socket
        onlineUsers[quivoID] = socket.id; // Simpan mapping ID ke Socket ID
        console.log(`User terdaftar dengan ID: ${quivoID}`);
        
        // Memberitahu semua orang bahwa ada user baru (opsional)
        io.emit('receive-message', { 
            sender: 'System', 
            text: `${quivoID} bergabung ke Quivo!` 
        });
    });

    // 2. Menangani Pengiriman Pesan Real-time
    socket.on('send-message', (data) => {
        // data berisi: { sender: 'QV123...', text: 'Halo!' }
        console.log(`Pesan dari ${data.sender}: ${data.text}`);
        
        // Kirimkan pesan ini ke SEMUA orang yang sedang buka aplikasi
        io.emit('receive-message', data);
    });

    // 3. Menangani Pembuatan Group
    socket.on('create-group', (groupData) => {
        // groupData berisi: { name: 'Nama Group', admin: 'QV...' }
        socket.join(groupData.name); // Masukkan pembuat group ke 'ruangan' khusus
        console.log(`Group "${groupData.name}" dibuat oleh Admin: ${groupData.admin}`);
        
        // Kirim konfirmasi ke admin
        socket.emit('receive-message', { 
            sender: 'System', 
            text: `Group ${groupData.name} berhasil dibuat. Anda adalah Admin.` 
        });
    });

    // 4. Menangani User Terputus (Tutup browser)
    socket.on('disconnect', () => {
        if (socket.quivoID) {
            delete onlineUsers[socket.quivoID];
            console.log(`${socket.quivoID} keluar dari Quivo.`);
        }
    });
});

// Menentukan Port (3000)
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log(`QUIVO CHAT SERVER JALAN!`);
    console.log(`Klik di sini: http://localhost:${PORT}`);
    console.log('-------------------------------------------');
});