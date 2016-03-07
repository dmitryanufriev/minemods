/// <reference path="../typings/main.d.ts" />
/// <reference path="../typings/app.d.ts" />

import electron = require('electron');

const browser = require('./lib/browser');
const settings = require('./lib/settings');
const minecraftMods = require('./lib/minecraft-mods');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow: Electron.BrowserWindow = null;

// Terminate process on Windows and Linux
// On OSX process stays active after closing main window
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Initialize and show main window
app.on('ready', function() {
    mainWindow = new BrowserWindow({
        minWidth: 800,
        minHeight: 600
    });
    mainWindow.setMenu(null);
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // Clean reference for GC
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
