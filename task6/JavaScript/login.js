app.controller('loginCtrl', ['$scope', '$state', '$http', function ($scope, $state, $http) {
    $scope.errorInfo = '';
    $scope.login = function () {
        var data = {
            name: $scope.name,
            pwd: $scope.pwd
        }
        var promise = $http({
            method: 'post',
            url: '/carrots-admin-ajax/a/login',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            transformRequest: function (data) {
                return $.param(data);
            },
            data: data
        })
        function codefans(){
            var error=document.getElementsByClassName("error");
            error.style.display="none";
        }
        setTimeout("codefans()",3000);//3秒
        promise.then(function (res) {
            if (res.data.code == 0) {
                $scope.errorInfo = '登录成功';
                $state.go('home.welcome');
            } else {
                $scope.errorInfo = res.data.message + '!';
            }
            console.log(res);
        }, function (res) {
            alert('请求失败')
            console.log(res);
        })
    }
}])

