/**
 * KREASI DKV — Portfolio submission endpoint
 * This is a SEPARATE Apps Script project/web app.
 * It does not replace or modify the existing quiz/SUS Apps Script.
 * Files are kept private in the owner's Drive folder by default.
 */
const PORTFOLIO_MAX_BYTES = 5 * 1024 * 1024;
const PORTFOLIO_ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];

function setupPortfolioStorage() {
  const props = PropertiesService.getScriptProperties();
  const folder = DriveApp.createFolder('KREASI DKV - Portofolio Siswa');
  const spreadsheet = SpreadsheetApp.create('KREASI DKV - Daftar Pengumpulan Portofolio');
  const sheet = spreadsheet.getSheets()[0];
  sheet.setName('Pengumpulan');
  sheet.appendRow(['Waktu Pengumpulan', 'Kode Siswa', 'Kelas', 'Judul Karya', 'Tema', 'Nama File', 'Tipe File', 'Ukuran (byte)', 'Catatan', 'Tautan File Drive']);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
  props.setProperties({ PORTFOLIO_FOLDER_ID: folder.getId(), PORTFOLIO_SHEET_ID: spreadsheet.getId() });
  Logger.log('Folder portofolio: ' + folder.getUrl());
  Logger.log('Spreadsheet pengumpulan: ' + spreadsheet.getUrl());
  return { folderUrl: folder.getUrl(), spreadsheetUrl: spreadsheet.getUrl() };
}

function doGet() {
  return HtmlService.createHtmlOutput('KREASI DKV portfolio endpoint is ready.');
}

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (p.action !== 'submitPortfolio') return resultPage(false, 'Permintaan tidak dikenali.');

    const studentCode = String(p.studentCode || '').trim().toUpperCase();
    const studentClass = String(p.studentClass || '').trim();
    const title = cleanText(p.projectTitle, 90);
    const theme = cleanText(p.projectTheme, 70);
    const note = cleanText(p.projectNote, 350);
    const fileName = cleanFileName(p.fileName || 'karya-siswa');
    const mimeType = String(p.mimeType || '').trim().toLowerCase();
    const base64 = String(p.fileData || '');

    if (!/^S\d{2,3}$/.test(studentCode)) return resultPage(false, 'Format kode siswa tidak valid.');
    if (!/^X DKV [1-3]$/.test(studentClass)) return resultPage(false, 'Kelas tidak valid.');
    if (!title) return resultPage(false, 'Judul karya wajib diisi.');
    if (PORTFOLIO_ALLOWED_TYPES.indexOf(mimeType) === -1) return resultPage(false, 'Format file tidak didukung.');
    if (!base64 || base64.length > Math.ceil(PORTFOLIO_MAX_BYTES * 4 / 3) + 16) return resultPage(false, 'File kosong atau melebihi batas 5 MB.');

    const bytes = Utilities.base64Decode(base64);
    if (bytes.length > PORTFOLIO_MAX_BYTES) return resultPage(false, 'File melebihi batas 5 MB.');

    const props = PropertiesService.getScriptProperties();
    const folderId = props.getProperty('PORTFOLIO_FOLDER_ID');
    const sheetId = props.getProperty('PORTFOLIO_SHEET_ID');
    if (!folderId || !sheetId) return resultPage(false, 'Penyimpanan belum disiapkan administrator.');

    const lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
      const blob = Utilities.newBlob(bytes, mimeType, fileName);
      const file = DriveApp.getFolderById(folderId).createFile(blob).setName(studentCode + '_' + stamp + '_' + fileName);
      const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Pengumpulan');
      sheet.appendRow([new Date(), studentCode, studentClass, title, theme, file.getName(), mimeType, bytes.length, note, file.getUrl()]);
    } finally {
      lock.releaseLock();
    }
    return resultPage(true, 'Karya berhasil diterima.');
  } catch (err) {
    console.error(err);
    return resultPage(false, 'Terjadi kesalahan pada server. Hubungi guru atau administrator.');
  }
}

function cleanText(value, maxLength) {
  return String(value || '').replace(/[<>]/g, '').trim().slice(0, maxLength);
}
function cleanFileName(value) {
  return String(value || 'karya-siswa').replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100);
}
function resultPage(ok, message) {
  const payload = JSON.stringify({ type: 'KREASI_PORTFOLIO_RESULT', ok: Boolean(ok), message: String(message || '') });
  const html = '<!doctype html><html><head><meta charset="utf-8"></head><body><script>window.parent.postMessage(' + payload + ', "*");</script>' + (ok ? 'Terkirim.' : 'Gagal.') + '</body></html>';
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
