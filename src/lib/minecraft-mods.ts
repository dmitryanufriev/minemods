import models = require('./models');
import Minecraft = models.Minecraft;
import settings = require('./settings');

import electron = require('electron');
import Q = require('q');
import fse = require('fs-extra');

import fs = require('fs');
import path = require('path');

const ipc = electron.ipcMain;

module MinecraftMods {

    /*-------- PROTOCOL --------*/

    ipc.on("mods:find", function(event: Electron.IPCMainEvent, directory: string) {
        findMods(directory).then(function(mods) {
            event.sender.send("mods:found", mods);
        });
    });

    ipc.on("mods:install", function(event: Electron.IPCMainEvent, mod: Minecraft.Mod) {
        installMod(mod).then(function(mod) {
            event.sender.send("mods:installed", mod);
        });
    });

    ipc.on("mods:delete", function(event: Electron.IPCMainEvent, mod: Minecraft.Mod) {
        deleteMod(mod).then(function(mod) {
            event.sender.send("mods:deleted", mod);
        });
    });


    /*-------- IMPLEMENTATION --------*/

    function findMods(directory: string): Q.Promise<Array<Minecraft.Mod>> {
        var deferred = Q.defer<Array<Minecraft.Mod>>();
        fs.readdir(directory, function(err, files) {
            var foundJars = files.filter(function(filename: string) {
                return path.extname(filename) === '.jar';
            });

            var foundMods: Array<Minecraft.Mod> = foundJars.map(function(filename) {
                var name: string = path.basename(filename, '.jar');
                var mod: Minecraft.Mod = { name: name, filename: filename };
                return mod;
            });

            deferred.resolve(foundMods);
        });
        return deferred.promise;
    }

    function installMod(mod: Minecraft.Mod): Q.Promise<Minecraft.Mod> {
        var deferred = Q.defer<Minecraft.Mod>();
        settings.load().then(function(modsPath) {
            var src = path.join(modsPath.sharedModsPath, mod.name + '.jar');
            var dst = path.join(modsPath.localModsPath, path.basename(src));
            fse.copy(src, dst, function(err) {
                deferred.resolve(mod);
            });
        });
        return deferred.promise;
    }

    function deleteMod(mod: Minecraft.Mod): Q.Promise<Minecraft.Mod> {
        var deferred = Q.defer<Minecraft.Mod>();
        settings.load().then(function(modsPath) {
            var modPath = path.join(modsPath.localModsPath, mod.name + '.jar');
            fs.unlink(modPath, function(err) {
                deferred.resolve(mod);
            });
        });
        return deferred.promise;
    }
}

export = MinecraftMods;
