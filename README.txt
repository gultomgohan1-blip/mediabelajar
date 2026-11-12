LMS DKV — PEMBAHASAN DESAIN GRAFIS

ISI PAKET
- index.html : halaman pembelajaran, pembahasan, latihan, dan antarmuka evaluasi.
- style.css  : gaya visual neon/dark LMS.
- script.js  : navigasi utama, mini-lab tata letak, kuis, angket SUS, serta pengiriman data.
- studio.js  : Design Studio, editor poster PNG, simulator scanner, daftar aset, dan pratinjau portofolio.

SUSUNAN PEMBAHASAN
1. Unsur-unsur tata letak: garis, bidang, ilustrasi, bitmap/vektor, tipografi, warna, gelap-terang, tekstur, dan ruang.
2. Warna: persepsi warna, roda warna, RGB, CMYK, HSL, Lab, gamut, spot/process color, fungsi warna.
3. Prinsip tata letak: proporsi, golden ratio, keseimbangan, irama, kontras, kesatuan, harmoni, grid, margin, kolom, dan bleed.
4. Scanner: jenis, komponen, cara kerja, pengaturan, resolusi, proses pemindaian, dan format hasil.
5. Data digital melalui internet: browser, istilah internet, download, upload, pengelolaan file, keamanan, dan domain.

SUMBER MATERI
Pembahasan disusun ulang dengan bahasa penjelasan sendiri berdasarkan buku "Desain Grafis SMK Kelas XI" (Direktorat Pembinaan SMK, Kementerian Pendidikan dan Kebudayaan, 2013), terutama Bab 1 sampai Bab 5. Buku tersebut merupakan bahan ajar Kelas XI Kurikulum 2013; untuk pembelajaran kelas/kurikulum saat ini, guru perlu menyesuaikan kedalaman dan urutan materi dengan CP serta ATP yang berlaku.
Ilustrasi diagram pada LMS dibuat ulang dalam HTML/CSS/SVG dan bukan salinan gambar halaman buku.

DESIGN STUDIO
- Guided Practice: editor poster langsung dengan headline, teks pendukung, palet warna, dan pilihan komposisi; hasil dapat diekspor sebagai PNG.
- Design Challenge: susun elemen poster dengan drag-and-drop atau ketukan pada layar sentuh, lalu selesaikan tantangan kontras dan hierarki.
- Scan Lab: simulator rekomendasi mode warna dan resolusi untuk foto, sketsa, dan dokumen.
- Asset Hunter: catat nama aset, sumber, dan lisensi untuk latihan pengelolaan bahan desain.
- Project & Portfolio: brief poster kampanye, checklist kualitas, serta pratinjau file gambar/PDF secara lokal. File portofolio tidak dikirim ke server LMS.

UPLOAD KE GITHUB PAGES
1. Ekstrak ZIP.
2. Unggah index.html, style.css, script.js, studio.js, dan README.txt langsung ke root repository.
3. Pastikan index.html berada di root, bukan di dalam subfolder.
4. Pilih Settings > Pages > Deploy from a branch > main > /(root) > Save.

CATATAN INTEGRASI
- URL Google Apps Script, nama field payload (kodeSiswa, skorKuis, skorSus), perhitungan SUS, dan mekanisme pengiriman dipertahankan.
- File script.js tetap identik dengan versi sebelumnya; interaksi tambahan ditempatkan pada studio.js.
- Kuis tetap berisi 15 soal dengan waktu 45 detik per soal.
- Editor poster menghasilkan PNG di browser. Pratinjau portofolio dan daftar aset bersifat lokal/sesi browser; keduanya tidak dikirim ke backend.
- Setelah hosting diperbarui, uji alur identitas, Design Studio, tantangan layout, kuis, dan angket di browser. Pengiriman aktual ke Apps Script perlu diuji dari domain hosting.
- Jangan mengunggah data pribadi siswa, kredensial, atau informasi rahasia ke repository publik.
