(function() {
    'use strict';

    angular.module('klock', []).controller('controller', function($scope, $interval) {
        var vm = this;

        var interval = angular.noop();

        interval = $interval(function() {
            run();
        }, 10000);

        run();

        function run() {
            console.log('Klock: updated');

            // vm.newDate = new Date('June 23, 1992 00:00:13'); // Testing date

            vm.newDate = new Date();
            vm.day = vm.newDate.getDay();
            vm.hours = vm.newDate.getHours();
            vm.minutes = vm.newDate.getMinutes().toString();
            vm.seconds = vm.newDate.getSeconds().toString();

            if(vm.hours > 12 && vm.hours !== 0 && vm.hours !== 23) {
                vm.hours = vm.hours - 12;
            }

            if(vm.minutes < 10) {
                vm.minutes = 0 + vm.minutes;
            }

            if(vm.seconds < 10) {
                vm.seconds = 0 + vm.seconds;
            }

            vm.minsSecs = vm.minutes + vm.seconds;
            if(vm.minsSecs > 3230) {
                vm.hours++;
            }

            vm.hoursObj = {
                0: '#midnight',
                1: '#one',
                2: '#two',
                3: '#three',
                4: '#four',
                5: '#five-hr',
                6: '#six',
                7: '#seven',
                8: '#eight',
                9: '#nine',
                10: '#ten-hr',
                11: '#eleven',
                12: '#twelve',
                23: '#eleven',
                24: '#midnight'
            };

            updateHour(vm.hoursObj[vm.hours]);

            if((vm.minsSecs >= 5730 && vm.minsSecs < 6000) || (vm.minsSecs >= 0 && vm.minsSecs < 230)) {
                if(vm.hours !== 24 && vm.hours !== 0) {
                    updateDesc('#oclock');
                }
            }
            else if(vm.minsSecs >= 230 && vm.minsSecs < 730) {
                updateDesc(['#five', '#past']);
            }
            else if(vm.minsSecs >= 730 && vm.minsSecs < 1230) {
                updateDesc(['#ten', '#past']);
            }
            else if(vm.minsSecs >= 1230 && vm.minsSecs < 1730) {
                updateDesc(['#quarter', '#past']);
            }
            else if(vm.minsSecs >= 1730 && vm.minsSecs < 2230) {
                updateDesc(['#twenty', '#past']);
            }
            else if(vm.minsSecs >= 2230 && vm.minsSecs < 2730) {
                updateDesc(['#twenty', '#five', '#past']);
            }
            else if(vm.minsSecs >= 2730 && vm.minsSecs < 3230) {
                updateDesc(['#half', '#past']);
            }
            else if(vm.minsSecs >= 3230 && vm.minsSecs < 3730) {
                updateDesc(['#twenty', '#five', '#to']);
            }
            else if(vm.minsSecs >= 3730 && vm.minsSecs < 4230) {
                updateDesc(['#twenty', '#to']);
            }
            else if(vm.minsSecs >= 4230 && vm.minsSecs < 4730) {
                updateDesc(['#quarter', '#to']);
            }
            else if(vm.minsSecs >= 4730 && vm.minsSecs < 5230) {
                updateDesc(['#ten', '#to']);
            }
            else if(vm.minsSecs >= 5230 && vm.minsSecs < 5730) {
                updateDesc(['#five', '#to']);
            }
            else {
                // nothing
            }
        }

        function updateDesc(ids) {
            angular.element(".desc").removeClass("active");

            angular.forEach(ids, function (id) {
                angular.element(id).addClass("active");
            });
        }

        function updateHour(id) {
            angular.element(".hr").removeClass("active");
            angular.element(id).addClass("active");
        }

        $scope.$on('$destroy', function() {
            if(angular.isDefined(interval)) {
                $interval.cancel(interval);
                interval = undefined;
            }
        });
    });
})();
