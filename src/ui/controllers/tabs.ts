module Controllers {
    interface TabsCtrlScope extends ng.IScope {
        subview: string;
        tabs: Array<Tab>;
        controller: TabsCtrl;
    }

    interface Tab {
        name: string;
        title: string;
        isActive: boolean;
    }

    export class TabsCtrl {
        $scope: TabsCtrlScope;
        constructor($scope: TabsCtrlScope) {
            this.$scope = $scope;
            this.$scope.controller = this;
            this.$scope.tabs = [
                { name: "shared", title: "Сервер", isActive: false },
                { name: "local", title: "Мой компьютер", isActive: false }
            ];
            this.setSelectedTab(this.$scope.tabs[0]);
        }

        setSelectedTab(tab: Tab): void {
            this.$scope.tabs.forEach(function(tab) {
                tab.isActive = false;
            });

            tab.isActive = true;
            this.$scope.subview = tab.name;
        }
    }
}

App.Instance.controller('tabsCtrl', ['$scope', Controllers.TabsCtrl]);
