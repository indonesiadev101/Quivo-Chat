document.addEventListener('DOMContentLoaded', () => {
    // Definisi Elemen
    const btnBuat = document.getElementById('btn-buat-id');
    const btnMasuk = document.getElementById('btn-masuk');
    const btnTambah = document.getElementById('btn-tambah-kontak');
    const btnKirim = document.getElementById('btn-kirim');
    
    const welcome = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const displayIDArea = document.getElementById('id-display');
    const textID = document.getElementById('generated-id');
    const labelID = document.getElementById('my-id-label');
    
    const inputMsg = document.getElementById('msg-input');
    const chatBox = document.getElementById('chat-box');
    const contactsContainer = document.getElementById('contacts-container');

    // 1. Logika Buat ID
    btnBuat.onclick = () => {
        const idBaru = "QV" + Math.floor(100000 + Math.random() * 900000);
        textID.innerText = idBaru;
        btnBuat.style.display = 'none';
        displayIDArea.style.display = 'block';
    };

    // 2. Logika Masuk Ke Chat
    btnMasuk.onclick = () => {
        labelID.innerText = "ID: " + textID.innerText;
        welcome.style.display = 'none';
        mainApp.style.display = 'flex';
    };

    // 3. Logika Tambah Kontak (Muncul di Sidebar)
    btnTambah.onclick = () => {
        const idTeman = prompt("Masukkan ID Quivo Teman:");
        if (idTeman) {
            const div = document.createElement('div');
            div.style.padding = "10px";
            div.style.background = "#0f3460";
            div.style.marginTop = "5px";
            div.style.borderRadius = "5px";
            div.innerText = "👤 " + idTeman;
            contactsContainer.appendChild(div);
        }
    };

    // 4. Logika Kirim Pesan (Muncul di Chat Box)
    btnKirim.onclick = () => {
        const pesan = inputMsg.value;
        if (pesan.trim() !== "") {
            const div = document.createElement('div');
            div.className = "msg-me";
            div.innerText = pesan;
            chatBox.appendChild(div);
            
            inputMsg.value = ""; // Bersihkan input
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll ke bawah
        }
    };
});