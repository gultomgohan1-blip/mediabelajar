LMS DKV — KREASI COLORFUL CREATIVE ACADEMY
Redesign menyeluruh dengan arah visual colorful: hangat, cerah, editorial, dan ekspresif.

ISI PAKET (semua file berada langsung di root ZIP)
- index.html : identitas, lima bab pembahasan, Design Studio, kuis, dan angket SUS.
- style.css  : sistem visual Colorful Creative Academy, layout responsif, galeri visual, dan komponen interaktif.
- script.js  : navigasi utama, latihan materi, kuis, SUS, perhitungan skor, dan pengiriman Google Apps Script.
- studio.js  : editor poster PNG, preset brief, pilihan desain, simulator scanner, inventaris aset, tantangan layout, dan portofolio lokal.
- README.txt : petunjuk penggunaan dan sumber visual.

ARAH VISUAL
- Identitas halaman pembuka menggunakan dua kolom: area pengenalan yang ekspresif dan kartu identitas siswa.
- Hero materi menggunakan komposisi asimetris, tipografi display, aksen coral, cobalt, lemon, mint, dan violet.
- Lima kartu bab memiliki warna dan simbol berbeda agar navigasi mudah dikenali.
- Pembahasan memakai kartu materi, blok sorotan, visual utama, serta galeri referensi per bab.
- Design Studio memakai panel warna cerah, kontrol yang lebih jelas, dan area canvas kontras.
- Kuis, hasil, dan SUS menggunakan kartu dengan kontras yang mudah dibaca.
- Mode gelap tetap tersedia lewat tombol tema.

REFERENSI VISUAL INTERNET DAN KREDIT
Gambar eksternal dimuat langsung dari situs asal. Setiap kartu/figure memiliki tautan sumber. Pemilik hak cipta tetap pihak pembuat/penerbit:
1. California State University, Long Beach — INSIGHTS 2023 Student Show poster: https://www.csulb.edu/school-of-art/article/insights-2023-school-art-student-show
2. Kenan Yiğit — SALT Typographic Poster Series (Behance): https://www.behance.net/gallery/173354975/TYPOGRAPHIC-POSTER-DESIGN-FOR-SALT
3. Buzzvel — Colour Theory Infographic: https://buzzvel.com/blog/the-psychology-of-colors-in-uiux
4. Presentation Team — Vector vs Bitmap: https://www.presentationteam.com/bitmap-and-vector-graphics-in-presentations/
5. Webdesign Journal — Broken-grid design examples: https://www.webdesign-journal.de/grafik-design-trends-stile/
6. Warriors Studio — Graphic Design Festival Scotland identity: https://warriorsstudio.com/projects/graphic-design-festival-scotland-2016-identity
7. Ceedo — Colour accuracy in scanners for artwork: https://www.ceedo.com/color-accuracy-in-scanners-for-artwork/
8. Xtrme — Professional art reproduction: https://print.xtrme.com/preserving-the-original-how-professional-art-reproduction-brings-artwork-to-life
9. Rebecca Stephany — Poster archive: https://rebeccastephany.com/
10. Vantura Digital — Brand identity workspace: https://vanturadigital.com/

Penting tentang gambar:
- Situs sumber dapat mengubah URL, membatasi hotlink, atau mengubah akses. Jika gambar tidak tampil, kartu memiliki warna fallback; ganti src dengan gambar milik sendiri atau gambar yang izinnya sesuai.
- Untuk publikasi/penilaian resmi, pastikan penggunaan gambar eksternal sesuai lisensi dan ketentuan pemiliknya. Tautan sumber/kredit disediakan agar karya dapat ditelusuri.
- Contoh karya di galeri adalah referensi untuk dianalisis, bukan karya siswa LMS.

PEMBAHASAN MATERI (mengikuti buku yang dilampirkan)
1. Unsur tata letak: garis, bidang, ilustrasi, bitmap/vektor, tipografi, warna, gelap-terang, tekstur, dan ruang.
2. Fungsi, komponen, dan model warna: persepsi warna, roda warna, RGB, CMYK, HSL, Lab, gamut, warna proses, dan spot color.
3. Prinsip tata letak: proporsi, golden ratio, keseimbangan, irama, kontras, kesatuan, harmoni, grid, margin, kolom, dan bleed.
4. Scanner: jenis, komponen, cara kerja, pengaturan, resolusi, proses pemindaian, dan format hasil.
5. Data digital melalui internet: browser, download, upload, pengelolaan file, keamanan, dan domain.
Sumber utama: buku Desain Grafis SMK Kelas XI, Direktorat Pembinaan SMK, 2013 (Bab 1–5). Buku ditujukan untuk Kelas XI dalam konteks Kurikulum 2013; guru perlu menyesuaikan kedalaman/urutan dengan CP dan ATP yang berlaku.

DESIGN STUDIO
- 10 preset tema brief + brief bebas: lingkungan/plastik, hemat air, hemat energi, literasi digital, kesehatan, anti-perundungan, budaya lokal, daur ulang, membaca, dan sekolah bersih.
- 8 palet warna: Forest, Ocean, Sunset, Editorial, Citrus, Lavender, Monochrome, dan Coral.
- 8 komposisi layout: Center, Split, Diagonal, Swiss, Frame, Collage, Type-led, dan Asymmetrical.
- 7 pilihan motif: Circles, Lines, Geometry, Grid, Waves, Cut-out, dan None.
- 6 preset gaya: Swiss Editorial, Type Explosion, Neo Pop, Organic Flow, Modern Split, Dynamic Cut.
- Canvas A4 diperbarui dari pilihan tema, palet, layout, motif, headline, deskripsi, dan ajakan. Hasil dapat diekspor PNG.
- Scan Lab dan Asset Hunter adalah simulator/latihan. Inventaris aset hanya disimpan sementara pada tampilan sesi.
- Pratinjau portofolio berjalan lokal. File karya tidak dikirim ke server LMS.

FITUR YANG DIPERTAHANKAN
- script.js dipertahankan identik dari versi sebelumnya.
- Kuis tetap 15 soal, 45 detik per soal.
- Payload pengiriman tetap: kodeSiswa, skorKuis, skorSus.
- Perhitungan SUS dan 10 pernyataannya tidak diubah.
- URL Google Apps Script tidak diubah.
Catatan: pengiriman aktual ke Google Apps Script belum dapat diverifikasi dari ZIP lokal. Uji kembali melalui domain GitHub Pages setelah deploy. Jangan memasukkan kredensial rahasia atau data pribadi siswa ke repository publik.

UPLOAD KE GITHUB PAGES
1. Ekstrak ZIP.
2. Unggah kelima file di atas langsung ke root repository (folder utama), bukan ke subfolder.
3. Ganti index.html dan style.css; tambahkan/perbarui studio.js; script.js disertakan dengan isi yang sama.
4. Pastikan Settings > Pages menggunakan branch main dan folder /(root).
5. Setelah deployment selesai, buka website dan tekan Ctrl + F5.
6. Uji identitas, lima tab materi, galeri gambar, tab Design Studio, pergantian brief/palet/layout/motif, ekspor PNG, tantangan layout, kuis, SUS, dan pengiriman data.
