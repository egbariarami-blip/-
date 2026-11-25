// WISC-IV HEB — Windows desktop shell for the online scoring system.
// The app opens the live system in its own window (no browser needed).
// Data stays in the system's cloud database, so every computer sees the same students.

const { app, BrowserWindow, Menu, shell, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const APP_URL = config.appUrl;
const APP_ORIGIN = new URL(APP_URL).origin;

let win;

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

function loadApp() {
  win.loadURL(APP_URL).catch(() => {});
}

function showOffline() {
  win.loadFile(path.join(__dirname, 'offline.html'));
}

function createWindow() {
  win = new BrowserWindow({
    width: 1366,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    title: 'WISC-IV HEB',
    icon: path.join(__dirname, 'build', 'icon.png'),
    backgroundColor: '#f8fafc',
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
    },
  });

  win.once('ready-to-show', () => {
    win.maximize();
    win.show();
  });

  // Network failure -> friendly offline page with a retry button.
  win.webContents.on('did-fail-load', (_e, code, _desc, url, isMainFrame) => {
    if (isMainFrame && code !== -3 /* aborted */ && !String(url).startsWith('file:')) {
      showOffline();
    }
  });

  // Links to other sites open in the regular browser.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(APP_ORIGIN)) return { action: 'allow' };
    if (/^https?:|^mailto:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (url.startsWith('file:') || url.startsWith(APP_ORIGIN)) return;
    // Allow Vercel login redirects if the deployment is protected.
    if (/vercel\.com/.test(url)) return;
    e.preventDefault();
    shell.openExternal(url);
  });

  // Word reports (.docx) and other downloads: ask where to save, then offer to open.
  win.webContents.session.on('will-download', (_e, item) => {
    const target = dialog.showSaveDialogSync(win, {
      defaultPath: path.join(app.getPath('documents'), item.getFilename()),
    });
    if (!target) return item.cancel();
    item.setSavePath(target);
    item.once('done', (_ev, state) => {
      if (state === 'completed') {
        const r = dialog.showMessageBoxSync(win, {
          type: 'info',
          buttons: ['פתח קובץ', 'פתח תיקייה', 'סגור'],
          defaultId: 0,
          title: 'ההורדה הושלמה',
          message: 'הקובץ נשמר:\n' + target,
        });
        if (r === 0) shell.openPath(target);
        else if (r === 1) shell.showItemInFolder(target);
      }
    });
  });

  loadApp();
}

ipcMain.on('retry', () => loadApp());

function buildMenu() {
  const template = [
    {
      label: 'קובץ',
      submenu: [
        { label: 'דף הבית', accelerator: 'Alt+Home', click: () => loadApp() },
        { label: 'הדפסה', accelerator: 'Ctrl+P', click: () => win.webContents.print() },
        { type: 'separator' },
        { label: 'יציאה', role: 'quit' },
      ],
    },
    {
      label: 'תצוגה',
      submenu: [
        { label: 'חזרה', accelerator: 'Alt+Left', click: () => win.webContents.navigationHistory.canGoBack() && win.webContents.navigationHistory.goBack() },
        { label: 'רענון', accelerator: 'F5', click: () => win.webContents.reload() },
        { type: 'separator' },
        { label: 'הגדלה', role: 'zoomIn', accelerator: 'Ctrl+=' },
        { label: 'הקטנה', role: 'zoomOut' },
        { label: 'גודל רגיל', role: 'resetZoom' },
        { label: 'מסך מלא', role: 'togglefullscreen' },
      ],
    },
    {
      label: 'עזרה',
      submenu: [
        { label: 'פתח בדפדפן', click: () => shell.openExternal(win.webContents.getURL().startsWith('http') ? win.webContents.getURL() : APP_URL) },
        { label: 'כלי מפתחים', accelerator: 'Ctrl+Shift+I', role: 'toggleDevTools' },
        { label: 'אודות', click: () => dialog.showMessageBox(win, { title: 'אודות', message: 'WISC-IV HEB ' + app.getVersion() + '\nמערכת אבחונים — ד"ר נזיה נאטור' }) },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();
});

app.on('window-all-closed', () => app.quit());
