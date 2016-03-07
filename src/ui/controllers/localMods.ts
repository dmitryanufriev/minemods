module Controllers {

    import ngBootstrap = angular.ui.bootstrap;

    interface LocalModsCtrlScope extends ng.IScope {
        mods: Array<Models.Minecraft.Mod>;
        controller: LocalModsCtrl;
    }

    export class LocalModsCtrl {
        $scope: LocalModsCtrlScope;
        $uibModal: ngBootstrap.IModalService;
        mods: Services.Mods;
        constructor($scope: LocalModsCtrlScope, $uibModal: ngBootstrap.IModalService, mods: Services.Mods) {
            this.$scope = $scope;
            this.$scope.controller = this;
            this.$uibModal = $uibModal;
            this.mods = mods;

            this.loadMods();
        }

        private loadMods() {
            var z = 25;
            var self = this;
            self.mods.getLocalMods().then((mods) => self.$scope.mods = mods);
        }

        private deleteMod(mod: Models.Minecraft.Mod) {
            var self = this;
            var modalInstance = self.$uibModal.open({
                animation: true,
                templateUrl: 'confirm.html',
                controller: "deleteModConfirmationCtrl",
                size: "lg",
                resolve: {
                    mod: function() {
                        return mod;
                    }
                }
            });

            modalInstance.result.then(function() {
                self.mods.deleteLocalMod(mod).then(() => self.loadMods());
            });
        }
    }
}

App.Instance.controller('localModsCtrl', ['$scope', '$uibModal', 'modsService', Controllers.LocalModsCtrl]);
