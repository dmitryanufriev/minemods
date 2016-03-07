module Controllers {

    import ngBootstrap = angular.ui.bootstrap;

    interface ViewModel extends Models.Minecraft.Mod {
        isInstalled: boolean;
    }

    interface Scope extends ng.IScope {
        controller: SharedModsCtrl;
        mods: Array<ViewModel>;
    }

    export class SharedModsCtrl {

        $scope: Scope;
        $uibModal: ngBootstrap.IModalService;
        modsService: Services.Mods;

        constructor($scope: Scope, $uibModal: ngBootstrap.IModalService, modsService: Services.Mods) {
            this.$scope = $scope;
            this.$scope.controller = this;
            this.$uibModal = $uibModal;
            this.modsService = modsService;

            this.reloadMods();
        }

        searchModInfo(mod: Models.Minecraft.Mod) {
            this.modsService.searchModInfo(mod);
        }

        installMod(mod: Models.Minecraft.Mod) {
            var self = this;
            self.modsService.installMod(mod).then(() => self.reloadMods());
        }

        deleteMod(mod: Models.Minecraft.Mod) {
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
                self.modsService.deleteLocalMod(mod).then(() => self.reloadMods());
            });
        }

        private reloadMods() {
            var self = this;
            self.modsService.getLocalMods().then(function(localMods) {
                self.modsService.getSharedMods().then(function(sharedMods) {
                    self.$scope.mods = sharedMods.map(function(sharedMod) {
                        var viewModel: ViewModel = {
                            name: sharedMod.name,
                            filename: sharedMod.filename,
                            isInstalled: localMods.some(function(localMod) {
                                return localMod.name === sharedMod.name;
                            })
                        };
                        return viewModel;
                    });
                });
            });
        }
    }
}

App.Instance.controller('sharedModsCtrl', ['$scope', '$uibModal', 'modsService', Controllers.SharedModsCtrl]);
