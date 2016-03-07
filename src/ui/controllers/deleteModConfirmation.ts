module Controllers {

    import ngBootstrap = angular.ui.bootstrap;

    interface Scope extends ng.IScope {
        mod: Models.Minecraft.Mod;
        controller: DeleteModConfirmationCtrl;
    }

    export class DeleteModConfirmationCtrl {
        $scope: Scope;
        $uibModalInstance: ngBootstrap.IModalServiceInstance;
        constructor($scope: Scope, $uibModalInstance: ngBootstrap.IModalServiceInstance, mod: Models.Minecraft.Mod) {
            this.$scope = $scope;
            this.$uibModalInstance = $uibModalInstance;

            this.$scope.mod = mod;
            this.$scope.controller = this;
        }

        apply(): void {
            this.$uibModalInstance.close();
        }

        cancel(): void {
            this.$uibModalInstance.dismiss();
        }
    }
}

App.Instance.controller('deleteModConfirmationCtrl', ['$scope', '$uibModalInstance', 'mod', Controllers.DeleteModConfirmationCtrl]);
