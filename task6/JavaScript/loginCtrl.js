app.controller('loginCtrl', ['$scope', '$state', '$http', function ($scope, $state, $http) {
    $scope.errorInfo = '';
    $scope.loginOut = function () {
        var promise = $http({
            method: 'post',
            url: '/carrots-admin-ajax/a/logout',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            },
            data: data
        })
        promise.then(function (res) {
            if (res.data.code == 0) {
                $scope.errorInfo = '退出成功';
                $state.go('home.welcome');
            }
            $scope.code = res.data.code;
            console.log(res.data.code);
            $scope.message = res.data.message;
            console.log(res.data.message);
            console.log(res);
        }, function (res) {
            alert('请求失败')
            console.log(res);
        })
    }
}])



