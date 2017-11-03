//获取article数据列表
app.controller('articleListCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.article = {
        ajaxData: [],
        searchParams: {
            startAt: '',
            endAt: '',
            type: '',
            status: '',
            size: 10,
            page: 1,
        }
    };
    //日历
    $scope.myPicker = {
        config: {
            "maxDate": new Date(),
        }
    }
    $scope.list = function (params) {
        //params可选的参数
        var ask = $http.get('/carrots-admin-ajax/a/article/search');
        var ask = $http({
            url: '/carrots-admin-ajax/a/article/search',
            method: 'get',
            params: params
            //不是data
        })
        ask.then(function (res) {
            if (res.data.code === 0) {
                $scope.article.ajaxData = res.data.data.articleList;
                // console.log(JSON.stringify($scope.article));
                $scope.pagination.total = res.data.data.total;
                console.log(res)
            } else {
                alert('服务器异常');
            }
        }, function (res) {
            alert('请求错误');
        })
    }
    $scope.pagination = {
        page:1,
        total: 0,//ajax获取的
        changePage: function () {
            //就在这个时候重新ajax数据
            $scope.list($scope.article.searchParams);
        }
    }

    $scope.search = function () {
        $scope.article.searchParams.startAt = $scope.article.searchParams.startAt && Date.parse($scope.article.searchParams.startAt);
        $scope.article.searchParams.endAt = $scope.article.searchParams.startAt && Date.parse($scope.article.searchParams.endAt);
        $scope.list($scope.article.searchParams);

    }
    //初次加载
    $scope.list();
}])

app.filter('type', function () {
    return function (value) {
        if (value == 0) {
            value = "首页Banner"
        } else if (value == 1) {
            value = "找职位Banner"
        } else if (value == 2) {
            value = "找精英Banner"
        } else if (value == 3) {
            value = "行业大图"
        }
        return value
    }
})
app.filter('status', function () {
    return function (value) {
        if (value == 1) {
            value = "草稿"
        } else if (value == 2) {
            value = "上线"
        }
        return value
    }
})


























