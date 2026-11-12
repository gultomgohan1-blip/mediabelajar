LMS DKV — EDITORIAL DESIGN STUDIO
Versi visual yang diperbarui untuk pembelajaran Desain Grafis.

ISI PAKET
- index.html : halaman identitas, pembahasan lima bab, Design Studio, kuis, dan angket SUS.
- style.css  : tema Editorial Design School (paper/ink, cobalt, coral, dan lime), responsif untuk desktop dan ponsel.
- script.js  : navigasi utama, latihan inti, kuis, angket SUS, perhitungan skor, dan pengiriman Google Apps Script.
- studio.js  : editor poster PNG, pilihan brief, style presets, simulator scanner, daftar aset, tantangan layout, dan pratinjau portofolio.
- README.txt : petunjuk paket.

ARAH VISUAL BARU
- Latar bergaya kertas dengan tipografi editorial dan aksen warna yang lebih berani.
- Galeri visual di halaman materi serta gambar referensi pada masing-masing bab.
- Kartu navigasi bab, panel materi yang lebih rapi, dan layout gambar-caption.
- Tema gelap tetap tersedia melalui tombol tema.

GAMBAR REFERENSI INTERNET DAN KREDIT
Gambar pada halaman materi dimuat dari situs sumber dan memiliki tautan kredit pada caption:
1. Beyond Print — Design & Branding: https://www.beyondprint.com.au/services/design-and-branding-services
2. Hristo Butchvarov — The Power of Color (Dribbble): https://dribbble.com/shots/15705035-The-Power-of-Color-Infographic-Poster
3. Louise Brownlow — Moodboard Example (Behance): https://www.behance.net/gallery/69613079/Moodboard-Example-InDesign
4. Xtrme — Professional Art Reproduction: https://print.xtrme.com/preserving-the-original-how-professional-art-reproduction-brings-artwork-to-life
5. Vantura Digital — Brand Identity Workspace: https://vanturadigital.com/
Catatan: gambar referensi dimiliki oleh penerbit/pembuat aslinya. Gambar dipakai untuk analisis pembelajaran; jangan mengklaimnya sebagai karya siswa. Website memerlukan koneksi internet untuk memuat gambar eksternal. Jika penyedia mengubah URL atau membatasi hotlink, ganti src gambar dengan file milik sendiri yang memiliki izin penggunaan.

PEMBAHASAN MATERI
1. Unsur tata letak: garis, bidang, ilustrasi, bitmap/vektor, tipografi, warna, gelap-terang, tekstur, ruang.
2. Fungsi, komponen, dan model warna: persepsi warna, roda warna, RGB, CMYK, HSL, Lab, gamut, spot/process color.
3. Prinsip tata letak: proporsi, golden ratio, keseimbangan, irama, kontras, kesatuan, harmoni, grid, margin, kolom, bleed.
4. Scanner: jenis, komponen, cara kerja, pengaturan, resolusi, proses pemindaian, format hasil.
5. Data digital melalui internet: browser, download, upload, pengelolaan file, keamanan, dan domain.
Sumber materi utama: buku Desain Grafis SMK Kelas XI, Direktorat Pembinaan SMK, 2013 (Bab 1–5). Buku tersebut terbit untuk Kelas XI/Kurikulum 2013; guru perlu menyesuaikan kedalaman dan urutan dengan CP/ATP yang berlaku.

DESIGN STUDIO — PILIHAN YANG DIPERBANYAK
- 8 palet warna: Forest, Ocean, Sunset, Editorial, Citrus, Lavender, Monochrome, Coral.
- 7 komposisi: Center, Split, Diagonal, Swiss, Frame, Collage, Type-led.
- 6 motif: Circles, Lines, Geometry, Grid, Waves, Cut-out.
- 8 tema brief: lingkungan, literasi digital, kesehatan, anti-perundungan, hemat energi, budaya lokal, hemat air, dan brief bebas.
- 4 kartu style preset: Editorial Grid, Bold Typography, Color Blocks, Organic Flow.
- Hasil editor poster bisa diekspor menjadi PNG dari browser.
- Scan Lab dan Asset Hunter merupakan simulator/latihan. Inventaris aset hanya disimpan pada tampilan sesi browser.
- Pratinjau portofolio berjalan lokal. File karya tidak dikirim ke server LMS.

FITUR YANG DIPERTAHANKAN
- script.js dipertahankan identik.
- Kuis tetap 15 soal, 45 detik per soal.
- Format payload pengiriman: kodeSiswa, skorKuis, skorSus.
- Perhitungan SUS dan 10 pernyataannya tidak diubah.
- URL Google Apps Script tidak diubah.
Penting: pengiriman aktual ke Google Apps Script tetap harus diuji dari domain GitHub Pages setelah deploy. Jangan unggah data pribadi siswa atau kredensial ke repository publik.

UPLOAD KE GITHUB PAGES
1. Ekstrak ZIP.
2. Unggah lima file di atas langsung ke root repository (folder utama).
3. Ganti index.html dan style.css versi lama; tambahkan studio.js; pertahankan script.js yang sama.
4. Pastikan Settings > Pages menggunakan branch main dan folder /(root).
5. Setelah deploy, buka website dan tekan Ctrl + F5.
6. Uji identitas, lima tab materi, editor poster, ekspor PNG, tantangan layout, kuis, angket SUS, dan pengiriman data.
