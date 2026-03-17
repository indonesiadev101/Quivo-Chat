document.addEventListener('DOMContentLoaded', () => {
    console.log("Script Quivo Berjalan!");

    // Ambil semua elemen
    const btnBuatID = document.getElementById('btn-buat-id');
    const btnMasuk = document.getElementById('btn-masuk');
    const idDisplay = document.getElementById('id-display');
    const generatedIDText = document.getElementById('generated-id');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const myIdLabel = document.getElementById('my-id-label');

    // 1. Fungsi Tombol Buat ID
    if (btnBuatID) {
        btnBuatID.onclick = () => {
            console.log("Tombol Buat ID diklik");
            const angkaRandom = Math.floor(100000 + Math.random() * 900000);
            const idBaru = "QV" + angkaRandom;
            
            generatedIDText.innerText = idBaru;
            btnBuatID.style.display = 'none'; // Sembunyikan tombol buat
            idDisplay.style.display = 'block'; // Munculkan hasil ID & tombol masuk
        };
    }

    // 2. Fungsi Tombol Masuk Chat
    if (btnMasuk) {
        btnMasuk.onclick = () => {
            console.log("Tombol Masuk diklik");
            const idFix = generatedIDText.innerText;
            
            welcomeScreen.style.display = 'none'; // Tutup layar awal
            mainApp.style.display = 'flex'; // Munculkan aplikasi chat
            myIdLabel.innerText = "ID: " + idFix;
        };
    }
});