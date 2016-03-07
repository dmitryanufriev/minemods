import electron = require('electron');

const ipc = electron.ipcMain;
const shell = electron.shell;

module Browser {
    ipc.on('browser:open', function(event, uri: string) {
        shell.openExternal(uri);
    });
}

export = Browser;