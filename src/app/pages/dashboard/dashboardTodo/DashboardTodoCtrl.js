/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('admin.pages.dashboard')
        .controller('DashboardTodoCtrl', DashboardTodoCtrl);

    /** @ngInject */
    function DashboardTodoCtrl($scope, baConfig) {

        $scope.transparent = baConfig.theme.blur;
        var dashboardColors = baConfig.colors.dashboard;
        var colors = [];
        for (var key in dashboardColors) {
            colors.push(dashboardColors[key]);
        }

        function getRandomColor() {
            var i = Math.floor(Math.random() * (colors.length - 1));
            return colors[i];
        }

        $scope.todoList = [
            {text: 'Fix broken images in map'},
            {text: 'Wire up login / permissions'},
            {text: 'Implement Products Interface'},
            {text: 'Implement Features Interface'},
            {text: 'Implement Insights Interface'},
            {text: 'Implement Campaign Interface'},
            {text: 'Implement Support Interface'},
        ];

        $scope.todoList.forEach(function (item) {
            item.color = getRandomColor();
        });

        $scope.newTodoText = '';

        $scope.addToDoItem = function (event, clickPlus) {
            if (clickPlus || event.which === 13) {
                $scope.todoList.unshift({
                    text: $scope.newTodoText,
                    color: getRandomColor(),
                });
                $scope.newTodoText = '';
            }
        };
    }
})();