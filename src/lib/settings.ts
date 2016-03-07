import models = require('./models');
import Minecraft = models.Minecraft;

import Q = require('q');
import electron = require('electron');

import path = require('path');
import fs = require('fs');

const ipc = electron.ipcMain;

/**
 * Manage settings stored in a file
 */
module Settings {
    const test = "test";
    const SETTINGS_PATH: string = path.join('.', 'settings.json');
    const DEFAULT_SETTINGS: Minecraft.Paths = {
        localModsPath: path.join(process.env.APPDATA, '.minecraft', 'mods'),
        sharedModsPath: ''
    };


    /*-------- PROTOCOL --------*/

    ipc.on('settings:load', function(event) {
        load().then(function(paths: Minecraft.Paths) {
            event.sender.send('settings:loaded', paths);
        });
    });

    ipc.on('settings:save', function(event, paths: Minecraft.Paths) {
        save(paths).then(function(savedPaths: Minecraft.Paths) {
            event.sender.send('settings:saved', savedPaths);
        });
    });


    /*-------- IMPLEMENTATION --------*/

    /**
     * Load settings from a file. if settings file doesn't exist
     * it will be created with default values.
     */
    export function load(): Q.Promise<Minecraft.Paths> {
        var deferred = Q.defer<Minecraft.Paths>();
        fs.readFile(SETTINGS_PATH, 'utf8', function(err, content: string) {
            if (err) {
                save(DEFAULT_SETTINGS).then(function(savedPaths: Minecraft.Paths) {
                    deferred.resolve(savedPaths);
                });
            } else {
                deferred.resolve(JSON.parse(content));
            }
        });
        return deferred.promise;
    }

    function save(paths: Minecraft.Paths): Q.Promise<Minecraft.Paths> {
        var deferred = Q.defer<Minecraft.Paths>();
        fs.writeFile(SETTINGS_PATH, JSON.stringify(paths), function(err) {
            deferred.resolve(paths);
        });
        return deferred.promise;
    }
}

export = Settings;
