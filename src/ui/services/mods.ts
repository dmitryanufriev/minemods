import electron = require('electron');

const ipc = electron.ipcRenderer;

module Services {

    export class Mods {
        $q: ng.IQService;
        constructor($q: ng.IQService) {
            this.$q = $q;
        }

        getLocalMods(): ng.IPromise<Array<Models.Minecraft.Mod>> {
            var self = this;
            var deferred = self.$q.defer<Array<Models.Minecraft.Mod>>();
            self.getSettings(self.$q).then(function(paths) {
                self.getMods(self.$q, paths.localModsPath).then(function(foundMods) {
                    deferred.resolve(foundMods);
                });
            });
            return deferred.promise;
        }

        getSharedMods(): ng.IPromise<Array<Models.Minecraft.Mod>> {
            var self = this;
            var deferred = self.$q.defer<Array<Models.Minecraft.Mod>>();
            self.getSettings(self.$q).then(function(paths) {
                self.getMods(self.$q, paths.sharedModsPath).then(function(foundMods) {
                    deferred.resolve(foundMods);
                });
            });
            return deferred.promise;
        }

        searchModInfo(mod: Models.Minecraft.Mod) {
            var url = 'https://www.google.com/search?q=' + mod.name;
            ipc.send('browser:open', url);
        }

        installMod(mod: Models.Minecraft.Mod): ng.IPromise<Models.Minecraft.Mod> {
            var deferred = this.$q.defer<Models.Minecraft.Mod>();
            ipc.once('mods:installed', function(event, mod: Models.Minecraft.Mod) {
                deferred.resolve(mod);
            });
            ipc.send('mods:install', mod);
            return deferred.promise;
        }

        deleteLocalMod(mod: Models.Minecraft.Mod): ng.IPromise<Models.Minecraft.Mod> {
            var deferred = this.$q.defer<Models.Minecraft.Mod>();
            ipc.once('mods:deleted', function(event, mod: Models.Minecraft.Mod) {
                deferred.resolve(mod);
            });
            ipc.send('mods:delete', mod);
            return deferred.promise;
        }

        private getSettings(q: ng.IQService): ng.IPromise<Models.Minecraft.Paths> {
            var deferred = q.defer<Models.Minecraft.Paths>();
            ipc.once('settings:loaded', function(event, modsPath: Models.Minecraft.Paths) {
                deferred.resolve(modsPath);
            });
            ipc.send('settings:load');
            return deferred.promise;
        }

        private getMods(q: ng.IQService, directory: string): ng.IPromise<Array<Models.Minecraft.Mod>> {
            var deferred = q.defer<Array<Models.Minecraft.Mod>>();
            ipc.once('mods:found', function(event, foundMods: Array<Models.Minecraft.Mod>) {
                deferred.resolve(foundMods);
            });
            ipc.send('mods:find', directory);
            return deferred.promise;
        }
    }
}

App.Instance.service('modsService', ['$q', Services.Mods]);
