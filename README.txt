KREASI DKV — CREATIVE LEARNING ACADEMY
Redesign berdasarkan hasil wawancara pengguna.

RANGKUMAN KEPUTUSAN DESAIN
1. Sistem belajar hybrid: ada urutan yang direkomendasikan, tetapi materi dan praktik dapat diulang/dibuka kembali.
2. Navigasi utama: sidebar desktop, drawer + navigasi cepat pada HP.
3. Materi: Hybrid Visual + Editorial; kartu ringkasan dan detail materi yang lebih lengkap.
4. Praktik: kombinasi latihan per bab dan ruang khusus Design Studio.
5. Visual: gabungan referensi karya eksternal beratribusi dan diagram/ilustrasi pembelajaran.
6. Portofolio: galeri lokal di perangkat siswa + opsi kirim ke penyimpanan kelas melalui Apps Script terpisah.

ISI PAKET
- index.html
- style.css
- script.js (dipertahankan identik; jangan edit untuk redesign)
- studio.js (editor poster, scan lab, asset hunter, challenge)
- app-navigation.js (sidebar, drawer HP, rute belajar, progres bab lokal)
- portfolio.js (portofolio lokal IndexedDB + pengiriman opsional ke Apps Script)
- PORTFOLIO_APPS_SCRIPT.gs (backend opsional untuk penyimpanan Drive dan pencatatan Sheet)

CARA UPLOAD KE GITHUB PAGES
1. Ekstrak ZIP.
2. Unggah semua file frontend berikut langsung ke ROOT repository: index.html, style.css, script.js, studio.js, app-navigation.js, portfolio.js.
3. Jangan upload PORTFOLIO_APPS_SCRIPT.gs sebagai file web biasa. File itu untuk Google Apps Script (lihat bagian berikutnya).
4. Commit changes.
5. GitHub Pages tetap menggunakan branch main dan folder /(root).
6. Buka website dengan Ctrl+Shift+R setelah deployment selesai.

PENGUMPULAN PORTOFOLIO TERINTEGRASI KE GURU (OPSIONAL, BUTUH SETUP)
Penting: galeri portofolio langsung bekerja secara lokal dengan IndexedDB. Agar guru dapat menerima file di Google Drive, siapkan backend terpisah berikut. Endpoint kuis/SUS yang lama TIDAK diganti atau disentuh.

A. Siapkan Apps Script baru
1. Buka https://script.google.com/ dan buat project baru, misalnya "KREASI DKV Portfolio".
2. Salin seluruh isi PORTFOLIO_APPS_SCRIPT.gs ke Code.gs.
3. Pilih fungsi setupPortfolioStorage lalu klik Run satu kali. Berikan izin Drive dan Spreadsheet. Hasil log berisi URL folder Drive dan spreadsheet daftar pengumpulan.
4. Pastikan folder dan spreadsheet tetap privat di akun guru/administrator. Jangan mengubah akses folder menjadi publik.
5. Deploy > New deployment > Select type: Web app.
6. Execute as: Me. Who has access: Anyone (diperlukan untuk form submission dari GitHub Pages; batasi distribusi URL dan pantau daftar pengumpulan).
7. Salin URL Web App yang berakhiran /exec.

B. Hubungkan endpoint portofolio ke web
1. Di repository GitHub, buka portfolio.js lalu klik Edit.
2. Temukan baris const PORTFOLIO_ENDPOINT = '';
3. Tempel URL Web App di antara tanda kutip, contoh: const PORTFOLIO_ENDPOINT = 'https://script.google.com/macros/s/...../exec';
4. Commit perubahan.
5. Tombol "Kirim ke guru" akan aktif setelah halaman dimuat ulang.

CATATAN PRIVASI DAN KEAMANAN
- Form menggunakan kode siswa dan kelas, bukan nama lengkap. Jangan meminta alamat rumah, nomor telepon, atau data pribadi lain dalam catatan proyek.
- File diterima ke folder Drive milik administrator dan tidak otomatis dibagikan ke publik.
- Endpoint Apps Script dengan akses Anyone dapat menerima permintaan dari siapa pun yang memperoleh URL. URL di frontend bukan rahasia. Administrator harus memeriksa pengumpulan, kuota, dan aktivitas mencurigakan. Untuk penggunaan produksi berskala besar, gunakan autentikasi institusi dan penyimpanan yang dikelola sekolah.
- Batas ukuran berkas 5 MB; format PNG/JPG/WEBP/PDF.
- Hasil yang tersimpan di IndexedDB hanya tersedia pada browser/perangkat yang sama. Hapus data browser dapat menghapus salinan lokal; kirim ke Drive untuk salinan guru.

FITUR YANG DIPERTAHANKAN
- script.js disalin byte-for-byte dari versi Colorful Mobile Contrast.
- API_URL kuis/SUS tetap sama.
- Payload pengiriman tetap {kodeSiswa, skorKuis, skorSus}.
- Kuis 15 soal dengan timer 45 detik per soal.
- 10 butir SUS dan rumus skornya tidak diubah.
- portfolio.js menggunakan endpoint terpisah; tidak menggantikan endpoint pengiriman kuis/SUS.

PENGUJIAN SETELAH DEPLOY
1. Login dengan kode format S01–S999 dan pilih kelas.
2. Buka sidebar: ringkasan, materi, bab, Guided Practice, Design Challenge, Project & Portfolio.
3. Tandai satu bab selesai dan pastikan progres sidebar berubah.
4. Coba brief Hemat Air, ganti palet, layout, motif, lalu ekspor PNG.
5. Tambahkan satu karya uji ke portofolio lokal; refresh halaman dan pastikan masih muncul di galeri.
6. Jika endpoint portofolio sudah disiapkan, kirim satu file uji kecil dan pastikan file masuk Drive serta baris tercatat di Sheet.
7. Selesaikan kuis dan SUS; pastikan data dikirim ke endpoint lama seperti sebelumnya.
8. Uji HP: buka drawer sidebar, coba quick navigation, pastikan tidak ada scroll horizontal.

SUMBER MATERI
Pembahasan mengikuti isi buku Desain Grafis SMK Kelas XI (Direktorat Pembinaan SMK, 2013), Bab 1–5. Buku ini disusun dalam konteks Kurikulum 2013 dan untuk kelas XI; guru perlu menyesuaikan urutan/kedalaman dengan CP dan ATP kelas yang digunakan.

PERBAIKAN DESIGN CHALLENGE (versi ini)
- Navigasi sidebar membuka panel Design Challenge secara langsung.
- Panel diberi ARIA state agar tab dan konten tetap sinkron.
- Susun elemen poster mendukung drag-and-drop dan pilih-lalu-ketuk untuk HP.
- Setelah 3 elemen ditempatkan, Level 2 (kontras) dan Level 3 (hierarki) muncul bertahap.
- Kuis/SUS dan endpoint Apps Script lama tidak diubah.
