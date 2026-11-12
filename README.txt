LMS DKV — PEMBAHASAN DESAIN GRAFIS

ISI PAKET
- index.html : halaman pembelajaran, pembahasan, latihan, dan antarmuka evaluasi.
- style.css  : gaya visual neon/dark LMS.
- script.js  : navigasi, latihan interaktif, kuis, angket SUS, serta pengiriman data.

SUSUNAN PEMBAHASAN
1. Unsur-unsur tata letak: garis, bidang, ilustrasi, bitmap/vektor, tipografi, warna, gelap-terang, tekstur, dan ruang.
2. Warna: persepsi warna, roda warna, RGB, CMYK, HSL, Lab, gamut, spot/process color, fungsi warna.
3. Prinsip tata letak: proporsi, golden ratio, keseimbangan, irama, kontras, kesatuan, harmoni, grid, margin, kolom, dan bleed.
4. Scanner: jenis, komponen, cara kerja, pengaturan, resolusi, proses pemindaian, dan format hasil.
5. Data digital melalui internet: browser, istilah internet, download, upload, pengelolaan file, keamanan, dan domain.

SUMBER MATERI
Pembahasan disusun ulang dengan bahasa penjelasan sendiri berdasarkan buku "Desain Grafis SMK Kelas XI" (Direktorat Pembinaan SMK, Kementerian Pendidikan dan Kebudayaan, 2013), terutama Bab 1 sampai Bab 5. Buku tersebut merupakan bahan ajar Kelas XI Kurikulum 2013; untuk pembelajaran kelas/kurikulum saat ini, guru perlu menyesuaikan kedalaman dan urutan materi dengan CP serta ATP yang berlaku.
Ilustrasi diagram pada LMS dibuat ulang dalam HTML/CSS/SVG dan bukan salinan gambar halaman buku.

UPLOAD KE GITHUB PAGES
1. Ekstrak ZIP.
2. Unggah index.html, style.css, script.js, dan README.txt langsung ke root repository.
3. Pastikan index.html berada di root, bukan di dalam subfolder.
4. Pilih Settings > Pages > Deploy from a branch > main > /(root) > Save.

CATATAN INTEGRASI
- URL Google Apps Script, nama field payload (kodeSiswa, skorKuis, skorSus), perhitungan SUS, dan mekanisme pengiriman dipertahankan.
- File script.js tidak diubah dalam revisi pembahasan ini.
- Kuis tetap berisi 15 soal dengan waktu 45 detik per soal.
- Setelah hosting diperbarui, uji alur identitas, praktik, kuis, dan angket di browser. Pengiriman aktual ke Apps Script perlu diuji dari domain hosting.
- Jangan mengunggah data pribadi siswa, kredensial, atau informasi rahasia ke repository publik.
