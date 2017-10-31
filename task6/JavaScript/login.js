app.controller('loginCtrl', ['$scope','$state', '$http', function ($scope,$state,$http) {
    $scope.login = function () {
        var data = {
            name: $scope.name,
            pwd: $scope.pwd
        }
        var loginError = $('#loginError');
        var promise = $http({
            method: 'post',
            url: '/carrots-admin-ajax/a/login',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            },
            data: data
        })
        promise.then(function (res) {
            if(res.data.code==0){
                loginError.html('登录成功')
                $state.go('home.welcome');
        }else{
                loginError.html(res.data.message + '!')
            }
            console.log(res);
        }, function (res) {
            alert('请求失败')
            console.log(res);
        })
    }
}])

