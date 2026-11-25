const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('wiscDesktop', {
  retry: () => ipcRenderer.send('retry'),
});
