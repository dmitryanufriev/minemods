module Controllers {

    import ngBootstrap = angular.ui.bootstrap;

    interface LocalModsCtrlScope extends ng.IScope {
        mods: Array<Models.Minecraft.Mod>;
        controller: LocalModsCtrl;
    }

    export class LocalModsCtrl {
        $scope: LocalModsCtrlScope;
        deleteModConfirmation: Services.DeleteModConfirmation;
        modsService: Services.Mods;

        constructor($scope: LocalModsCtrlScope, deleteModConfirmation: Services.DeleteModConfirmation, modsService: Services.Mods) {
            this.$scope = $scope;
            this.$scope.controller = this;
            this.deleteModConfirmation = deleteModConfirmation;
            this.modsService = modsService;

            this.loadMods();
        }

        private loadMods() {
            var z = 25;
            var self = this;
            self.modsService.getLocalMods().then((mods) => self.$scope.mods = mods);
        }

        private deleteMod(mod: Models.Minecraft.Mod) {
            var self = this;
            self.deleteModConfirmation.confirmDeleteMod(mod).then(function() {
                self.modsService.deleteLocalMod(mod).then(() => self.loadMods());
            });
        }
    }
}

App.Instance.controller('localModsCtrl', ['$scope', 'deleteModConfirmation', 'modsService', Controllers.LocalModsCtrl]);
