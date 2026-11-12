(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Navigasi area Design Studio terpisah dari navigasi bab, kuis, dan SUS.
  const studioTabs = $$('.studio-tab');
  const studioPanels = $$('.studio-panel');
  studioTabs.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.studioTab;
      studioTabs.forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
      });
      studioPanels.forEach((panel) => panel.classList.toggle('hidden', panel.id !== target));
    });
  });

  // Poster builder: pratinjau langsung dan ekspor PNG tanpa mengirim data ke server.
  const paletteMap = {
    forest:   { bg: '#102C24', paper: '#F7F5E9', accent: '#D9F36A', second: '#F3A65A', soft: '#285A47' },
    ocean:    { bg: '#102B3B', paper: '#F2F6F7', accent: '#57D8D0', second: '#F5C95B', soft: '#20566B' },
    sunset:   { bg: '#3A1C2D', paper: '#FFF3E8', accent: '#FF7D70', second: '#FFD166', soft: '#71354A' },
    editorial:{ bg: '#F0E9D9', paper: '#20232D', accent: '#3156E8', second: '#E96A4B', soft: '#D6CBB6' },
    citrus:   { bg: '#17233D', paper: '#FFF8E8', accent: '#C9F05A', second: '#4F72F2', soft: '#344A75' },
    lavender: { bg: '#29223D', paper: '#FFF8FF', accent: '#D4B8FF', second: '#FF8BB8', soft: '#594A78' },
    mono:     { bg: '#171717', paper: '#F7F4ED', accent: '#FFFFFF', second: '#A5A5A5', soft: '#414141' },
    coral:    { bg: '#F8E6D5', paper: '#2C2631', accent: '#E65D4F', second: '#E6B85C', soft: '#E9CBB5' }
  };
  const titleInput = $('#poster-title-input');
  const descInput = $('#poster-desc-input');
  const ctaInput = $('#poster-cta-input');
  const paletteInput = $('#poster-palette');
  const layoutInput = $('#poster-layout');
  const motifInput = $('#poster-motif');
  const preview = $('#poster-preview');
  const previewTitle = $('#poster-preview-title');
  const previewDesc = $('#poster-preview-desc');
  const previewCta = $('#poster-preview-cta');
  const exportStatus = $('#poster-export-status');
  const briefInput = $('#poster-brief');

  const briefPresets = {
    environment: { title: 'JAGA BUMI, MULAI HARI INI', desc: 'Kurangi plastik sekali pakai. Bawa botol minum dan tas guna ulang untuk kebiasaan yang lebih bertanggung jawab.', cta: 'PILIH GUNA ULANG', palette: 'forest', layout: 'swiss', motif: 'waves' },
    literacy: { title: 'CEK DULU SEBELUM KLIK', desc: 'Kenali sumber, periksa informasi, dan bagikan konten dengan bijak. Jejak digital dimulai dari keputusan kecil.', cta: 'JADI PENGGUNA CERDAS', palette: 'lavender', layout: 'type', motif: 'grid' },
    health: { title: 'GERAK 30 MENIT, SEHAT SETIAP HARI', desc: 'Luangkan waktu untuk bergerak, minum air yang cukup, dan istirahat dengan teratur.', cta: 'MULAI DARI SEKARANG', palette: 'ocean', layout: 'split', motif: 'circles' },
    'anti-bullying': { title: 'KATA-KATA BISA MENGUATKAN', desc: 'Hargai perbedaan, dengarkan teman, dan berani mencari bantuan ketika melihat perundungan.', cta: 'BANGUN SEKOLAH RAMAH', palette: 'coral', layout: 'collage', motif: 'cutout' },
    energy: { title: 'MATIKAN SAAT TAK DIGUNAKAN', desc: 'Gunakan listrik seperlunya. Matikan lampu dan perangkat saat tidak diperlukan.', cta: 'HEMAT ENERGI HARI INI', palette: 'citrus', layout: 'diagonal', motif: 'lines' },
    culture: { title: 'CERITAKAN BUDAYA KITA', desc: 'Kenali tradisi, bahasa, motif, dan cerita dari lingkungan sekitar. Warisan budaya hidup melalui generasi.', cta: 'BANGGA BUDAYA LOKAL', palette: 'editorial', layout: 'frame', motif: 'geometry' },
    water: { title: 'SETETES AIR, BERARTI', desc: 'Tutup keran setelah digunakan dan gunakan air secukupnya. Setiap tindakan membantu menjaga sumber daya.', cta: 'GUNAKAN AIR DENGAN BIJAK', palette: 'ocean', layout: 'center', motif: 'waves' }
  };

  function updatePosterPreview() {
    if (!preview) return;
    const variants = [
      'palette-forest','palette-ocean','palette-sunset','palette-editorial','palette-citrus','palette-lavender','palette-mono','palette-coral',
      'layout-center','layout-split','layout-diagonal','layout-swiss','layout-frame','layout-collage','layout-type',
      'motif-circles','motif-lines','motif-geometry','motif-grid','motif-waves','motif-cutout'
    ];
    preview.classList.remove(...variants);
    preview.classList.add(`palette-${paletteInput.value}`, `layout-${layoutInput.value}`, `motif-${motifInput.value}`);
    previewTitle.textContent = titleInput.value.trim() || 'JUDUL POSTER';
    previewDesc.textContent = descInput.value.trim() || 'Tuliskan pesan pendukung yang singkat dan mudah dipahami.';
    previewCta.textContent = ctaInput.value.trim() || 'TULISKAN AJAKAN';
    exportStatus.textContent = 'Pratinjau diperbarui. Periksa komposisi sebelum mengekspor.';
  }

  if (briefInput) briefInput.addEventListener('change', () => {
    const preset = briefPresets[briefInput.value];
    if (!preset) return;
    titleInput.value = preset.title;
    descInput.value = preset.desc;
    ctaInput.value = preset.cta;
    paletteInput.value = preset.palette;
    layoutInput.value = preset.layout;
    motifInput.value = preset.motif;
    updatePosterPreview();
    exportStatus.textContent = 'Tema contoh diterapkan. Kamu tetap bisa mengubah semua teks dan gaya desain.';
  });

  // Kartu gaya visual memberi titik awal berbeda tanpa mengunci pilihan siswa.
  $$('[data-style-preset]').forEach((button) => {
    button.addEventListener('click', () => {
      if (briefInput) briefInput.value = 'custom';
      paletteInput.value = button.dataset.palette;
      layoutInput.value = button.dataset.layout;
      motifInput.value = button.dataset.motif;
      $$('.style-preset-card').forEach((card) => card.classList.toggle('is-selected', card === button));
      updatePosterPreview();
      exportStatus.textContent = `Gaya ${button.querySelector('b')?.textContent || 'pilihan'} diterapkan. Silakan lanjutkan personalisasi desain.`;
    });
  });
  [titleInput, descInput, ctaInput, paletteInput, layoutInput, motifInput].forEach((control) => {
    if (control) control.addEventListener('input', updatePosterPreview);
    if (control) control.addEventListener('change', updatePosterPreview);
  });
  updatePosterPreview();

  function roundedRect(ctx, x, y, width, height, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 5) {
    const words = String(text).trim().split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(test).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    const visible = lines.slice(0, maxLines);
    if (lines.length > maxLines) visible[maxLines - 1] = `${visible[maxLines - 1].replace(/[.,;:]?$/, '')}…`;
    visible.forEach((lineText, index) => ctx.fillText(lineText, x, y + index * lineHeight));
    return visible.length;
  }

  function drawPoster() {
    const colors = paletteMap[paletteInput.value] || paletteMap.forest;
    const layout = layoutInput.value;
    const motif = motifInput.value;
    const title = titleInput.value.trim() || 'JUDUL POSTER';
    const desc = descInput.value.trim() || 'Tuliskan pesan pendukung yang singkat dan mudah dipahami.';
    const cta = ctaInput.value.trim() || 'TULISKAN AJAKAN';
    const canvas = document.createElement('canvas');
    canvas.width = 1240;
    canvas.height = 1754;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, W, H);

    // Motif visual dipilih sebagai latihan bidang, garis, ritme, dan ruang.
    if (motif === 'circles') {
      ctx.fillStyle = colors.soft; ctx.beginPath(); ctx.arc(1010, 390, 300, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors.second; ctx.beginPath(); ctx.arc(1010, 390, 205, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors.accent; ctx.beginPath(); ctx.arc(1010, 390, 105, 0, Math.PI * 2); ctx.fill();
    } else if (motif === 'lines') {
      ctx.save(); ctx.strokeStyle = colors.second; ctx.lineWidth = 16;
      for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.moveTo(740 + i * 48, 110); ctx.lineTo(1100 + i * 48, 600); ctx.stroke(); }
      ctx.restore(); ctx.fillStyle = colors.accent; ctx.fillRect(760, 650, 360, 24);
    } else if (motif === 'geometry') {
      ctx.fillStyle = colors.soft; ctx.beginPath(); ctx.moveTo(1240, 70); ctx.lineTo(1240, 880); ctx.lineTo(580, 880); ctx.closePath(); ctx.fill();
      ctx.fillStyle = colors.second; ctx.beginPath(); ctx.moveTo(930, 90); ctx.lineTo(1240, 90); ctx.lineTo(1240, 520); ctx.closePath(); ctx.fill();
      ctx.fillStyle = colors.accent; ctx.beginPath(); ctx.moveTo(785, 705); ctx.lineTo(1100, 705); ctx.lineTo(940, 970); ctx.closePath(); ctx.fill();
    } else if (motif === 'grid') {
      ctx.save(); ctx.strokeStyle = colors.soft; ctx.globalAlpha = .75; ctx.lineWidth = 3;
      for (let x = 690; x <= 1190; x += 62) { ctx.beginPath(); ctx.moveTo(x, 130); ctx.lineTo(x, 1320); ctx.stroke(); }
      for (let y = 150; y <= 1320; y += 62) { ctx.beginPath(); ctx.moveTo(660, y); ctx.lineTo(1190, y); ctx.stroke(); }
      ctx.restore(); ctx.fillStyle = colors.accent; ctx.fillRect(760, 230, 280, 280);
    } else if (motif === 'waves') {
      ctx.save(); ctx.lineWidth = 28; ctx.strokeStyle = colors.soft;
      for (let k = 0; k < 4; k++) { ctx.beginPath(); ctx.moveTo(600, 300 + k * 90); ctx.bezierCurveTo(760, 140 + k * 90, 920, 480 + k * 90, 1260, 250 + k * 90); ctx.stroke(); }
      ctx.strokeStyle = colors.accent; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(650, 660); ctx.bezierCurveTo(820, 500, 980, 850, 1260, 620); ctx.stroke(); ctx.restore();
    } else {
      ctx.fillStyle = colors.soft; ctx.fillRect(760, 160, 480, 480);
      ctx.fillStyle = colors.second; ctx.fillRect(880, 275, 360, 365);
      ctx.fillStyle = colors.accent; ctx.beginPath(); ctx.arc(900, 330, 180, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors.bg; ctx.fillRect(760, 560, 250, 220);
    }

    // Kerangka tiap pilihan layout dibuat berbeda agar siswa melihat variasi komposisi.
    let textX = 105, align = 'left', maxTextWidth = 930, titleY = 730;
    if (layout === 'center') { textX = 620; align = 'center'; maxTextWidth = 1010; titleY = 760; }
    if (layout === 'split') { textX = 100; align = 'left'; maxTextWidth = 690; titleY = 690; }
    if (layout === 'diagonal') { textX = 105; align = 'left'; maxTextWidth = 850; titleY = 745; ctx.save(); ctx.translate(0, 90); ctx.rotate(-.075); ctx.fillStyle = colors.accent; ctx.fillRect(55, 590, 1130, 24); ctx.restore(); }
    if (layout === 'swiss') {
      textX = 115; align = 'left'; maxTextWidth = 810; titleY = 610;
      ctx.fillStyle = colors.accent; ctx.fillRect(90, 190, 18, 400);
      ctx.fillStyle = colors.second; ctx.font = '900 200px Arial, sans-serif'; ctx.textAlign = 'right'; ctx.fillText('01', 1120, 450);
      ctx.strokeStyle = colors.paper; ctx.globalAlpha = .35; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(90, 510); ctx.lineTo(1145, 510); ctx.stroke(); ctx.globalAlpha = 1;
    }
    if (layout === 'frame') {
      textX = 620; align = 'center'; maxTextWidth = 900; titleY = 735;
      ctx.strokeStyle = colors.accent; ctx.lineWidth = 12; ctx.strokeRect(72, 72, W - 144, H - 144);
      ctx.strokeStyle = colors.second; ctx.lineWidth = 3; ctx.strokeRect(104, 104, W - 208, H - 208);
    }
    if (layout === 'collage') {
      textX = 100; align = 'left'; maxTextWidth = 825; titleY = 880;
      ctx.fillStyle = colors.accent; ctx.save(); ctx.translate(920, 430); ctx.rotate(-.22); ctx.fillRect(-190, -190, 380, 380); ctx.restore();
      ctx.fillStyle = colors.second; ctx.beginPath(); ctx.arc(970, 420, 145, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors.soft; ctx.fillRect(80, 690, 1080, 70);
    }
    if (layout === 'type') {
      textX = 95; align = 'left'; maxTextWidth = 1050; titleY = 650;
      ctx.fillStyle = colors.accent; ctx.fillRect(90, 260, 760, 22);
      ctx.fillStyle = colors.second; ctx.font = '900 38px Arial, sans-serif'; ctx.textAlign = 'left'; ctx.fillText('TYPE / IMAGE / MESSAGE', 95, 220);
    }

    // Header label.
    ctx.fillStyle = colors.accent; ctx.font = '700 28px Arial, sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('DKV STUDIO  /  VISUAL CAMPAIGN', 92, 110);
    ctx.textAlign = 'right'; ctx.fillStyle = colors.paper; ctx.fillText('DESIGN STUDY 01', 1148, 110);

    // Headline and supporting copy.
    ctx.textAlign = align;
    ctx.fillStyle = colors.second; ctx.font = '700 30px Arial, sans-serif';
    ctx.fillText('SMALL IDEA, MEANINGFUL IMPACT', textX, titleY - 78);
    ctx.fillStyle = colors.paper;
    const titleFont = layout === 'type' ? 112 : layout === 'swiss' ? 92 : 100;
    ctx.font = `900 ${titleFont}px Arial, sans-serif`;
    const titleLines = wrapCanvasText(ctx, title.toUpperCase(), textX, titleY + 40, maxTextWidth, titleFont * 1.12, 4);
    ctx.fillStyle = colors.paper; ctx.globalAlpha = .9; ctx.font = '400 38px Arial, sans-serif';
    const descY = titleY + 40 + titleLines * titleFont * 1.12 + 48;
    wrapCanvasText(ctx, desc, textX, descY, maxTextWidth, 54, 4);
    ctx.globalAlpha = 1;

    // Ajakan tindakan menjadi penutup poster.
    roundedRect(ctx, 92, 1500, 1056, 116, 22, colors.accent);
    ctx.fillStyle = colors.bg; ctx.textAlign = 'center'; ctx.font = '800 34px Arial, sans-serif';
    wrapCanvasText(ctx, cta.toUpperCase(), 620, 1570, 970, 42, 2);
    ctx.fillStyle = colors.paper; ctx.font = '600 22px Arial, sans-serif'; ctx.fillText('LMS DKV  ·  STUDENT DESIGN PROJECT', 620, 1680);
    return canvas;
  }

  const downloadButton = $('#poster-download');
  if (downloadButton) downloadButton.addEventListener('click', () => {
    try {
      const canvas = drawPoster();
      canvas.toBlob((blob) => {
        if (!blob) {
          exportStatus.textContent = 'Ekspor belum berhasil. Coba lagi.';
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'poster-kampanye-dkv.png';
        document.body.append(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        exportStatus.textContent = 'Poster berhasil diekspor sebagai PNG. Kamu dapat melanjutkan penyuntingan di aplikasi desain.';
      }, 'image/png');
    } catch (error) {
      console.error('Poster export failed:', error);
      exportStatus.textContent = 'Browser belum dapat mengekspor poster. Coba gunakan Chrome versi terbaru.';
    }
  });

  // Fallback klik untuk perangkat layar sentuh: pilih elemen, lalu ketuk slot.
  let selectedLayoutItem = null;
  $$('.wireframe-item').forEach((item) => {
    item.addEventListener('click', () => {
      if (item.draggable === false) return;
      selectedLayoutItem = item;
      $$('.wireframe-item').forEach((other) => other.classList.toggle('studio-item-selected', other === item));
      const feedback = $('#layout-feedback');
      if (feedback) feedback.textContent = `Dipilih: ${item.textContent.trim()}. Sekarang ketuk area poster yang sesuai.`;
    });
  });
  $$('.layout-slot').forEach((slot) => {
    slot.addEventListener('click', () => {
      if (!selectedLayoutItem || slot.dataset.terisi === '1') return;
      try {
        const transfer = new DataTransfer();
        transfer.setData('text/plain', selectedLayoutItem.dataset.layout);
        slot.dispatchEvent(new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: transfer }));
        selectedLayoutItem = null;
        $$('.wireframe-item').forEach((item) => item.classList.remove('studio-item-selected'));
      } catch (_) {
        const feedback = $('#layout-feedback');
        if (feedback) feedback.textContent = 'Gunakan drag-and-drop untuk menempatkan elemen pada browser ini.';
      }
    });
  });

  // Checklist kualitas proyek.
  const projectChecks = $$('.project-check-input');
  const projectFill = $('#project-progress-fill');
  const projectText = $('#project-progress-text');
  function updateProjectProgress() {
    const done = projectChecks.filter((check) => check.checked).length;
    const percent = projectChecks.length ? done / projectChecks.length * 100 : 0;
    if (projectFill) projectFill.style.width = `${percent}%`;
    if (projectText) projectText.textContent = `${done} dari ${projectChecks.length} pemeriksaan selesai.`;
  }
  projectChecks.forEach((check) => check.addEventListener('change', updateProjectProgress));
  updateProjectProgress();

  // Pratinjau portofolio hanya lokal; tidak mengunggah karya ke backend LMS.
  const portfolioInput = $('#portfolio-file');
  const portfolioWrap = $('#portfolio-preview-wrap');
  const imagePreview = $('#portfolio-image-preview');
  const pdfPreview = $('#portfolio-pdf-preview');
  const pdfName = $('#portfolio-pdf-name');
  const pdfOpen = $('#portfolio-pdf-open');
  const fileStatus = $('#portfolio-file-status');
  let previousObjectUrl = null;
  if (portfolioInput) portfolioInput.addEventListener('change', () => {
    const file = portfolioInput.files && portfolioInput.files[0];
    if (!file) return;
    if (previousObjectUrl) URL.revokeObjectURL(previousObjectUrl);
    previousObjectUrl = URL.createObjectURL(file);
    portfolioWrap.classList.remove('hidden');
    imagePreview.classList.add('hidden');
    pdfPreview.classList.add('hidden');
    if (file.type.startsWith('image/')) {
      imagePreview.src = previousObjectUrl;
      imagePreview.classList.remove('hidden');
      fileStatus.textContent = `${file.name} · ${(file.size / 1024).toFixed(1)} KB · pratinjau gambar siap.`;
    } else if (file.type === 'application/pdf') {
      pdfName.textContent = file.name;
      pdfOpen.href = previousObjectUrl;
      pdfPreview.classList.remove('hidden');
      fileStatus.textContent = `${file.name} · ${(file.size / 1024).toFixed(1)} KB · file PDF siap dibuka.`;
    } else {
      portfolioWrap.classList.add('hidden');
      fileStatus.textContent = 'Format file belum didukung. Pilih PNG, JPG, WEBP, atau PDF.';
    }
  });
})();

// Praktik pendamping Bab 4: simulator rekomendasi pengaturan pemindaian.
(() => {
  const $ = (selector) => document.querySelector(selector);
  const object = $('#scan-object');
  const mode = $('#scan-mode');
  const resolution = $('#scan-resolution');
  const advice = $('#scan-advice');
  if (!object || !mode || !resolution || !advice) return;

  function recommendScan() {
    const objectValue = object.value;
    const modeValue = mode.value;
    const dpi = Number(resolution.value);
    let expectedMode = objectValue === 'photo' ? 'color' : objectValue === 'sketch' ? 'grayscale' : 'grayscale';
    let expectedDpi = 300;
    let explanation = objectValue === 'photo'
      ? 'Foto memiliki informasi warna dan gradasi. Gunakan mode Color agar warna tetap terekam.'
      : objectValue === 'sketch'
        ? 'Sketsa garis perlu terlihat jelas. Grayscale cocok untuk mempertahankan perbedaan pensil dan bayangan; Black & White dapat dicoba bila hanya membutuhkan garis tegas.'
        : 'Dokumen teks dapat dipindai dalam Grayscale atau Black & White, bergantung pada kebutuhan keterbacaan dan ukuran file.';
    if (objectValue === 'text') expectedMode = 'grayscale';
    const modeIsGood = objectValue === 'sketch' ? ['grayscale', 'bw'].includes(modeValue) : modeValue === expectedMode;
    const dpiIsGood = dpi >= expectedDpi;
    const qualityNote = dpi < 300
      ? 'Resolusi 150 dpi lebih ringan, tetapi detail mungkin kurang memadai untuk kebutuhan cetak.'
      : dpi === 300
        ? '300 dpi merupakan titik awal yang baik untuk latihan dan kebutuhan cetak umum.'
        : '600 dpi menangkap detail lebih banyak, tetapi ukuran file biasanya lebih besar.';
    advice.innerHTML = `<b>${modeIsGood ? '✓ Mode sesuai' : '↗ Coba bandingkan mode lain'}</b><br>${explanation}<br><b>${dpiIsGood ? '✓ Resolusi memadai' : '↗ Pertimbangkan resolusi lebih tinggi'}</b><br>${qualityNote}`;
  }
  [object, mode, resolution].forEach((control) => control.addEventListener('change', recommendScan));
  recommendScan();
})();

// Praktik pendamping Bab 5: inventaris aset sederhana yang hanya tersimpan di tampilan sesi ini.
(() => {
  const $ = (selector) => document.querySelector(selector);
  const name = $('#asset-name');
  const source = $('#asset-source');
  const license = $('#asset-license');
  const add = $('#asset-add-btn');
  const list = $('#asset-list');
  const status = $('#asset-status');
  if (!name || !source || !license || !add || !list || !status) return;

  add.addEventListener('click', () => {
    const fileName = name.value.trim();
    const sourceName = source.value.trim();
    if (!fileName || !sourceName) {
      status.textContent = 'Isi nama file dan sumber terlebih dahulu.';
      status.classList.add('is-warning');
      return;
    }
    const empty = $('.asset-empty', list);
    if (empty) empty.remove();
    const row = document.createElement('li');
    const file = document.createElement('b');
    const origin = document.createElement('span');
    const rights = document.createElement('small');
    file.textContent = fileName;
    origin.textContent = sourceName;
    rights.textContent = `Lisensi: ${license.value}`;
    row.append(file, origin, rights);
    list.append(row);
    status.textContent = 'Aset berhasil dicatat pada daftar sementara ini.';
    status.classList.remove('is-warning');
    name.value = '';
    source.value = '';
  });
})();
