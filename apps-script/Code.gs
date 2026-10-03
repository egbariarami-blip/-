/**
 * ChatGPT 2026 — Google Sheet sync + sending email from the owner's Gmail.
 * Paste into the sheet: Extensions → Apps Script. Fill FEED's key and SECRET (kept out of this
 * repo on purpose), run setup() once, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone).
 */
const SHEET_ID = '1v4CXdyJeWYjPl2esZbkPPo6WVQT6un2TQnbgHyLmFi8';
const FEED = 'https://axskrlyafgcdbkquyfwe.supabase.co/functions/v1/chatgpt26-sheet?key=PUT_FEED_KEY_HERE';
const SECRET = 'PUT_SHARED_SECRET_HERE';
const SENDER_NAME = 'رامي اغبارية';

function setup() {
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  // Fallback refresh; the database also pings doPost right after every change.
  ScriptApp.newTrigger('syncSheet').timeBased().everyMinutes(10).create();
  syncSheet();
  Logger.log('Mail quota left today: ' + MailApp.getRemainingDailyQuota());
  GmailApp.getAliases();
}

function syncSheet() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return;
  try {
    const res = UrlFetchApp.fetch(FEED, { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) throw new Error('feed ' + res.getResponseCode());
    const rows = Utilities.parseCsv(res.getContentText('UTF-8'));
    if (!rows.length) return;
    const sh = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    sh.clear();
    sh.getRange(1, 1, rows.length, rows[0].length).setNumberFormat('@').setValues(rows);
    sh.setRightToLeft(true);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, rows[0].length).setFontWeight('bold').setBackground('#1b1f3b').setFontColor('#ffffff');
    sh.autoResizeColumns(1, rows[0].length);
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  let p;
  try { p = JSON.parse(e.postData.contents); } catch (err) { return out({ ok: false, error: 'bad_json' }); }
  if (!p || p.secret !== SECRET) return out({ ok: false, error: 'forbidden' });

  if (p.action === 'sync') { syncSheet(); return out({ ok: true }); }

  if (p.action === 'mail') {
    const sent = [], failed = [];
    (p.messages || []).forEach(function (m) {
      try {
        GmailApp.sendEmail(m.to, m.subject, m.body, { name: SENDER_NAME, htmlBody: toHtml(m.body) });
        sent.push(m.to);
      } catch (err) {
        failed.push({ to: m.to, error: String(err && err.message || err) });
      }
    });
    return out({ ok: true, sent: sent, failed: failed, quota: MailApp.getRemainingDailyQuota() });
  }
  return out({ ok: false, error: 'unknown_action' });
}

function toHtml(text) {
  const esc = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const linked = esc.replace(/https?:\/\/[^\s<]+/g, function (u) { return '<a href="' + u + '" dir="ltr">' + u + '</a>'; });
  return '<div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;line-height:1.8;text-align:right">' +
    linked.replace(/\n/g, '<br>') + '</div>';
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
