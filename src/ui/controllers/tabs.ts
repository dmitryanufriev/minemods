module Controllers {

    interface Tab {
        name: string;
        title: string;
        isActive: boolean;
    }

    interface Scope extends ng.IScope {
        subview: string;
        tabs: Array<Tab>;
        controller: TabsCtrl;
    }

    export class TabsCtrl {

        $scope: Scope;

        constructor($scope: Scope) {
            this.$scope = $scope;
            this.$scope.controller = this;
            this.$scope.tabs = [
                { name: "shared", title: "Сервер", isActive: false },
                { name: "local", title: "Мой компьютер", isActive: false }
            ];
            this.setSelectedTab(this.$scope.tabs[0]);
        }

        setSelectedTab(tab: Tab): void {
            this.$scope.subview = tab.name;
            this.$scope.tabs.forEach((tab) => tab.isActive = false);
            tab.isActive = true;
        }
    }
}

App.Instance.controller('tabsCtrl', ['$scope', Controllers.TabsCtrl]);
