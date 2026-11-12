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
    forest: { bg: '#09251B', paper: '#F4FFE9', accent: '#B9F34A', second: '#1FD1B5', soft: '#173F32' },
    ocean: { bg: '#082437', paper: '#F2FBFF', accent: '#22D8D0', second: '#FFC857', soft: '#16445A' },
    sunset: { bg: '#2A1631', paper: '#FFF5F1', accent: '#FF6B8A', second: '#FFC857', soft: '#51284B' }
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

  function updatePosterPreview() {
    if (!preview) return;
    preview.classList.remove('palette-forest', 'palette-ocean', 'palette-sunset', 'layout-center', 'layout-split', 'layout-diagonal', 'motif-circles', 'motif-lines', 'motif-geometry');
    preview.classList.add(`palette-${paletteInput.value}`, `layout-${layoutInput.value}`, `motif-${motifInput.value}`);
    previewTitle.textContent = titleInput.value.trim() || 'JUDUL POSTER';
    previewDesc.textContent = descInput.value.trim() || 'Tuliskan pesan pendukung yang singkat dan mudah dipahami.';
    previewCta.textContent = ctaInput.value.trim() || 'TULISKAN AJAKAN';
    exportStatus.textContent = 'Pratinjau diperbarui. Periksa komposisi sebelum mengekspor.';
  }
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

    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bentuk dekoratif berfungsi sebagai latihan bidang, garis, dan ruang.
    if (motif === 'circles') {
      ctx.fillStyle = colors.soft;
      ctx.beginPath(); ctx.arc(1010, 380, 290, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors.second;
      ctx.beginPath(); ctx.arc(1010, 380, 190, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors.accent;
      ctx.beginPath(); ctx.arc(1010, 380, 100, 0, Math.PI * 2); ctx.fill();
    } else if (motif === 'lines') {
      ctx.strokeStyle = colors.second;
      ctx.lineWidth = 16;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath(); ctx.moveTo(760 + i * 45, 120); ctx.lineTo(1120 + i * 45, 600); ctx.stroke();
      }
      ctx.fillStyle = colors.accent;
      ctx.fillRect(780, 650, 330, 24);
    } else {
      ctx.fillStyle = colors.soft;
      ctx.beginPath(); ctx.moveTo(1240, 100); ctx.lineTo(1240, 850); ctx.lineTo(620, 850); ctx.closePath(); ctx.fill();
      ctx.fillStyle = colors.second;
      ctx.beginPath(); ctx.moveTo(980, 100); ctx.lineTo(1240, 100); ctx.lineTo(1240, 480); ctx.closePath(); ctx.fill();
      ctx.fillStyle = colors.accent;
      ctx.beginPath(); ctx.moveTo(820, 700); ctx.lineTo(1100, 700); ctx.lineTo(960, 920); ctx.closePath(); ctx.fill();
    }

    // Penanda editorial di bagian atas.
    ctx.fillStyle = colors.accent;
    ctx.font = '700 28px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('GREEN ACTION  /  DKV STUDIO', 92, 110);
    ctx.textAlign = 'right';
    ctx.fillStyle = colors.paper;
    ctx.fillText('01 — CAMPAIGN', 1148, 110);

    const split = layout === 'split';
    const diagonal = layout === 'diagonal';
    const textX = layout === 'center' ? 620 : 105;
    const align = layout === 'center' ? 'center' : 'left';
    const maxTextWidth = layout === 'center' ? 1010 : 780;
    const titleY = layout === 'center' ? 800 : 760;

    if (diagonal) {
      ctx.save();
      ctx.translate(0, 100);
      ctx.rotate(-0.06);
      ctx.fillStyle = colors.accent;
      ctx.fillRect(70, 600, 1090, 18);
      ctx.restore();
    }
    if (split) {
      roundedRect(ctx, 760, 1020, 360, 290, 36, colors.soft);
      ctx.fillStyle = colors.second;
      ctx.beginPath(); ctx.arc(940, 1165, 105, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colors.accent;
      ctx.beginPath(); ctx.arc(940, 1165, 48, 0, Math.PI * 2); ctx.fill();
    }

    ctx.textAlign = align;
    ctx.fillStyle = colors.second;
    ctx.font = '700 30px Arial, sans-serif';
    ctx.fillText('SMALL ACTION, BIG IMPACT', textX, titleY - 78);
    ctx.fillStyle = colors.paper;
    ctx.font = '900 100px Arial, sans-serif';
    const titleLines = wrapCanvasText(ctx, title.toUpperCase(), textX, titleY + 40, maxTextWidth, 116, 4);

    ctx.fillStyle = colors.paper;
    ctx.globalAlpha = 0.9;
    ctx.font = '400 38px Arial, sans-serif';
    const descY = titleY + 40 + titleLines * 116 + 50;
    wrapCanvasText(ctx, desc, textX, descY, maxTextWidth - (split ? 350 : 0), 54, 4);
    ctx.globalAlpha = 1;

    // Pita ajakan menjadi penutup visual yang kuat.
    roundedRect(ctx, 92, 1500, 1056, 116, 24, colors.accent);
    ctx.fillStyle = colors.bg;
    ctx.textAlign = 'center';
    ctx.font = '800 34px Arial, sans-serif';
    wrapCanvasText(ctx, cta.toUpperCase(), 620, 1570, 970, 42, 2);
    ctx.fillStyle = colors.paper;
    ctx.font = '600 22px Arial, sans-serif';
    ctx.fillText('JAGA LINGKUNGAN SEKOLAH KITA', 620, 1680);

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
