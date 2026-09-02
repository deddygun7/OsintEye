const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(...args) {
      return ipcRenderer.on(...args);
    },
    once(...args) {
      return ipcRenderer.once(...args);
    },
    invoke(...args) {
      return ipcRenderer.invoke(...args);
    },
    send(...args) {
      return ipcRenderer.send(...args);
    },
  },
});
