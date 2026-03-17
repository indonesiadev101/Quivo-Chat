document.addEventListener('DOMContentLoaded', () => {
    const btnBuat = document.getElementById('btn-buat-id');
    const btnMasuk = document.getElementById('btn-masuk');
    const welcome = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const displayID = document.getElementById('id-display');
    const textID = document.getElementById('generated-id');
    const labelID = document.getElementById('my-id-label');

    // 1. Klik Buat ID
    btnBuat.onclick = () => {
        const random = Math.floor(100000 + Math.random() * 900000);
        const idBaru = "QV" + random;
        textID.innerText = idBaru;
        
        btnBuat.style.display = 'none'; // Sembunyikan tombol pertama
        displayID.style.display = 'block'; // Munculkan area ID & tombol masuk
    };

    // 2. Klik Masuk
    btnMasuk.onclick = () => {
        const idFix = textID.innerText;
        welcome.style.display = 'none'; // Hilangkan layar welcome
        mainApp.style.display = 'flex'; // Munculkan layar chat
        labelID.innerText = "ID: " + idFix;
    };
});