const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const iconPath = path.join(__dirname, 'icon.png');
  const win = new BrowserWindow({
    width: 1000, height: 700, minWidth: 360, minHeight: 500,
    title: 'BlackHole Player',
    backgroundColor: '#000000',
    ...(fs.existsSync(iconPath) ? { icon: iconPath } : {}),
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: false, contextIsolation: true, backgroundThrottling: true },
  });
  win.loadFile('index.html');
  // свернули / скрыли окно — останавливаем анимацию чёрной дыры, вернули — продолжаем
  const send = (name) => win.webContents.executeJavaScript(`window.dispatchEvent(new Event('${name}'))`).catch(() => {});
  win.on('minimize', () => send('bh-pause'));
  win.on('hide', () => send('bh-pause'));
  win.on('restore', () => send('bh-resume'));
  win.on('show', () => send('bh-resume'));
  Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
