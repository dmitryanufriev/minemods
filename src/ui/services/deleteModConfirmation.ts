module Services {
    import ngBootstrap = angular.ui.bootstrap;

    export class DeleteModConfirmation {

        private $q: ng.IQService;
        private $uibModal: ngBootstrap.IModalService;

        constructor($q: ng.IQService, $uibModal:ngBootstrap.IModalService) {
            this.$q = $q;
            this.$uibModal = $uibModal;
        }
        
        confirmDeleteMod(mod: Models.Minecraft.Mod): ng.IPromise<Models.Minecraft.Mod> {
            var self = this;
            var deferred = self.$q.defer();
            var modalInstance = self.$uibModal.open({
                animation: true,
                templateUrl: 'ui/templates/confirmDeleteMod.html',
                controller: "deleteModConfirmationCtrl",
                size: "lg",
                resolve: {
                    mod: function() {
                        return mod;
                    }
                }
            });
            modalInstance.result.then(() => deferred.resolve(mod));
            return deferred.promise;
        }
    }
}

App.Instance.service('deleteModConfirmation', ['$q', '$uibModal', Services.DeleteModConfirmation]);