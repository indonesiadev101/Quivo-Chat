const socket = io(); // Menghubungkan ke server
let targetID = ""; // ID teman yang sedang diajak chat
let myID = "";

document.addEventListener('DOMContentLoaded', () => {
    const btnBuat = document.getElementById('btn-buat-id');
    const btnMasuk = document.getElementById('btn-masuk');
    const btnTambah = document.getElementById('btn-tambah-kontak');
    const btnKirim = document.getElementById('btn-kirim');
    const inputMsg = document.getElementById('msg-input');
    const chatBox = document.getElementById('chat-box');

    // 1. Buat ID
    btnBuat.onclick = () => {
        myID = "QV" + Math.floor(100000 + Math.random() * 900000);
        document.getElementById('generated-id').innerText = myID;
        btnBuat.style.display = 'none';
        document.getElementById('id-display').style.display = 'block';
    };

    // 2. Masuk & Daftarkan ID ke Server
    btnMasuk.onclick = () => {
        document.getElementById('my-id-label').innerText = "ID: " + myID;
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
        
        socket.emit('register-id', myID); // Beritahu server ID kita
    };

    // 3. Tambah & Pilih Kontak
    btnTambah.onclick = () => {
        const idTeman = prompt("Masukkan ID Quivo Teman:");
        if (idTeman) {
            const div = document.createElement('div');
            div.className = "contact-item";
            div.innerText = "👤 " + idTeman;
            div.onclick = () => {
                targetID = idTeman;
                document.getElementById('current-chat-target').innerText = "Chat dengan: " + targetID;
                inputMsg.disabled = false;
                btnKirim.disabled = false;
            };
            document.getElementById('contacts-container').appendChild(div);
        }
    };

    // 4. Kirim Pesan
    btnKirim.onclick = () => {
        const pesan = inputMsg.value;
        if (pesan && targetID) {
            socket.emit('kirim-pesan', { dari: myID, ke: targetID, isi: pesan });
            tampilkanPesan(pesan, 'msg-me');
            inputMsg.value = "";
        }
    };

    // 5. Terima Pesan dari Server
    socket.on('pesan-baru', (data) => {
        if (data.dari === targetID) {
            tampilkanPesan(data.isi, 'msg-them');
        } else {
            alert("Pesan baru dari " + data.dari);
        }
    });

    function tampilkanPesan(teks, tipe) {
        const div = document.createElement('div');
        div.className = tipe === 'msg-me' ? "msg-me" : "msg-them";
        div.innerText = teks;
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});