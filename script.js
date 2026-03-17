// Tunggu sampai seluruh halaman (HTML & CSS) selesai dimuat
window.addEventListener('load', () => {
    console.log("Quivo Script: Berhasil Dimuat!");

    const btnBuatID = document.getElementById('btn-buat-id');
    const idDisplay = document.getElementById('id-display');
    const generatedIDText = document.getElementById('generated-id');

    if (btnBuatID) {
        console.log("Tombol ditemukan!");
        
        btnBuatID.addEventListener('click', () => {
            console.log("Tombol diklik!");
            
            // Logika buat ID
            const randomNum = Math.floor(10000000 + Math.random() * 90000000);
            const myID = `QV${randomNum}`;
            
            // Update tampilan
            generatedIDText.innerText = myID;
            btnBuatID.style.display = 'none'; // Sembunyikan tombol
            idDisplay.classList.remove('hidden'); // Munculkan ID
            
            console.log("ID Baru Dibuat: " + myID);
        });
    } else {
        console.error("Error: Tombol 'btn-buat-id' tidak ditemukan di HTML!");
    }
});
// Tunggu semua elemen HTML muncul
window.addEventListener('DOMContentLoaded', () => {
    
    // 1. Ambil semua elemen yang dibutuhkan
    const btnBuatID = document.getElementById('btn-buat-id');
    const btnMasuk = document.getElementById('btn-masuk');
    const idDisplay = document.getElementById('id-display');
    const generatedIDText = document.getElementById('generated-id');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainApp = document.getElementById('main-app');
    const myIdLabel = document.getElementById('my-id-label');

    // 2. Logika Tombol "Buat ID Mu"
    if (btnBuatID) {
        btnBuatID.onclick = () => {
            const randomNum = Math.floor(10000000 + Math.random() * 90000000);
            const myID = `QV${randomNum}`;
            
            generatedIDText.innerText = myID; // Tampilkan ID-nya
            btnBuatID.classList.add('hidden'); // Sembunyikan tombol Buat ID
            idDisplay.classList.remove('hidden'); // Munculkan area ID dan tombol Masuk
            
            console.log("ID Berhasil Dibuat: " + myID);
        };
    }

    // 3. Logika Tombol "Masuk ke Chat" (INI YANG TADI BERMASALAH)
    if (btnMasuk) {
        btnMasuk.onclick = () => {
            const idBaru = generatedIDText.innerText;
            
            // Sembunyikan layar awal, munculkan aplikasi chat
            welcomeScreen.classList.add('hidden');
            mainApp.classList.remove('hidden');
            
            // Pasang ID kamu di sidebar
            myIdLabel.innerText = "ID: " + idBaru;
            
            console.log("Berhasil Masuk dengan ID: " + idBaru);
            
            // Mulai koneksi socket (Opsional jika sudah ada server)
            // const socket = io(); 
        };
    }
});