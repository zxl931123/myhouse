//获取article数据列表
app.controller('articleListCtrl', ['$scope','$state', '$rootScope', '$http', function ($scope,$state, $rootScope, $http) {
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

    $scope.list = function () {
        //params可选的参数
        var ask = $http({
            url: '/carrots-admin-ajax/a/article/search',
            method: 'get',
            params: $scope.article.searchParams
            //不是data
        })

        ask.then(function (res) {
            if (res.data.code === 0) {
                $scope.article.ajaxData = res.data.data.articleList;
                //同步分页
                $scope.pagination.total = res.data.data.total;
                $scope.pagination.page = $scope.article.searchParams.page;
                $scope.pagination.perPageItems = $scope.article.searchParams.size;
            } else {
                alert('服务器异常');
            }

        }, function (res) {
            alert('请求错误');
        })

    }

    $scope.pagination = {
        page: 1,
        perPageItems: 10,
        total: 0,//ajax获取的
        changePage: function () {
            $scope.article.searchParams.page = this.page;
            //就在这个时候重新ajax数据
            $scope.list();
        }
    }

    $scope.search = function () {
        if ($scope.article.searchParams.startAt && !angular.isNumber($scope.article.searchParams.startAt)) {
            ($scope.article.searchParams.startAt = Date.parse($scope.article.searchParams.startAt));
        }
        if ($scope.article.searchParams.endAt && !angular.isNumber($scope.article.searchParams.endAt)) {
            ($scope.article.searchParams.endAt = Date.parse($scope.article.searchParams.endAt));
        }
        $scope.list();
    }

    $scope.clean = function () {
        $scope.article.searchParams = {
            startAt: '',
            endAt: '',
            type: '',
            status: '',
            size: 10,
            page: 1,
        }
        $scope.list();
    }

    //初次请求数据
    $scope.list();
    var $httpTools = {
        put: function (ajaxAds, data) {
            var ajaxPromise = $http({
                method: 'put',
                url: ajaxAds,
                //重要
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function (data) {
                    return $.param(data);
                },
                //重要
                data: data
            })
            return ajaxPromise;
        },
        delete: function (ajaxAds) {
            var ajaxPromise = $http({
                method: 'delete',
                url: ajaxAds,
            });
            return ajaxPromise;
        }
    }
    $scope.changeItemStatus = function (id, status) {
        var isConfrim = undefined,
            ajaxPromise = undefined;
        if (status === 1) {
            //现在是草稿，需要上线
            status = 2;
            isConfrim = $rootScope.modalConfrim('上线后该图片将在轮播banner中展示。', '是否执行上线操作？');
        } else if (status === 2) {
            //现在是上线，需要下线
            isConfrim = $rootScope.modalConfrim('下线后该图片将不会在轮播banner中展示', '是否执行下线操作？');
            status = 1;
        } else {
            return;
        }
        isConfrim.then(function () {
            //确认
            ajaxPromise = $httpTools.put('/carrots-admin-ajax/a/u/article/status', {id: id, status: status});
            ajaxPromise.then(function (res) {
                if (res.data.code == 0) {
                    $rootScope.modalAlert((status == 1 ? '下线' : '上线') + '成功');
                    $scope.list();
                }
            }, function (res) {
                $rootScope.modalAlert(res);
            })

        }, function () {
            //取消
            $rootScope.modalAlert('已取消');
        })
    }


    $scope.deleteItem = function (id) {
        var isConfrim = $rootScope.modalConfrim('是否确认删除');
        isConfrim.then(function () {
            //确认
            var ajaxPromise = $httpTools.delete('/carrots-admin-ajax/a/u/article/' + id);
            ajaxPromise.then(function (res) {
                if (res.data.code == 0) {
                    $rootScope.modalAlert('删除成功');
                    $scope.list();
                } else {
                    $rootScope.modalAlert('删除失败');
                }
            }, function (res) {
                $rootScope.modalAlert(res.data);
            })
        }, function () {
            //取消
            $rootScope.modalAlert('已取消');
        })


    }

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













