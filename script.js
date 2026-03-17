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