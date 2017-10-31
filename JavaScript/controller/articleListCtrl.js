app.controller('articleListCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.article = {
        ajaxData: [],
    };
    $scope.list = function () {
        var ask = $http.get('/carrots-admin-ajax/a/article/search');
        ask.then(function (res) {
            if (res.data.code === 0) {
                $scope.article.ajaxData = res.data.data.articleList;
                console.log(JSON.stringify($scope.article));
            } else {
                alert('服务器异常');
            }
        }, function (res) {
            alert('请求错误');
        })
    }
    $scope.list();
}])
app.filter('type',function () {
    return function (value) {
        if(value==0){
           value="首页Banner"
        }else if(value==1){
            value="找职位Banner"
        }else if(value==2){
            value="找精英Banner"
        }else if(value==3){
            value="行业大图"
        }
        return value
    }
})
app.filter('status',function () {
    return function (value) {
        if(value==1){
            value="草稿"
        }else if(value==2){
            value="上线"
        }
        return value
    }
})