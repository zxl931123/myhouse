app.controller('articleEditCtrl', ['$scope', '$stateParams', '$rootScope', '$state', '$http', function ($scope, $stateParams, $rootScope, $state, $http) {

    var $httpTools = {
        put: function (ajaxAds, data) {
            var ajaxPromise = $http({
                method: 'put',
                url: ajaxAds,
                params: data
            })
            return ajaxPromise;
        },
        post: function (ajaxAds, data) {
            var ajaxPromise = $http({
                method: 'post',
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
        }
    }

    var id = $stateParams.id;
    //根据id判断 新增还是编辑
    var config = {};
    $scope.params = undefined;
    if (id) {
        config['ajaxAds'] = '/carrots-admin-ajax/a/u/article/' + id;
        config['getOneInfoById'] = '/carrots-admin-ajax/a/article/' + id;
        config['method'] = 'put';
        //编辑，先根据id获取参数
        $http.get(config.getOneInfoById).then(function (res) {
            if (res.data.code == 0) {
                $scope.params = res.data.data.article;
                console.log($scope.params)
            } else {
                alert(res.data);
            }
        }, function (res) {
            alert(res.data);
        });
    } else {
        //新增
        config['ajaxAds'] = '/carrots-admin-ajax/a/u/article/';
        config['method'] = 'post';
        $scope.params = {
            title: '',
            type: '',
            status: '',
            img: '',
            content: '',
            url: '',
            industry: ''
        }
    }

    $scope.addArticle = function (status) {
        if (status === 1) {
            $scope.params['status'] = 1;
        } else if (status === 2) {
            $scope.params['status'] = 2;
        }
        //新增还是编辑
        var isConfrim = undefined,
            ajaxPromise = undefined;
        if (status === 1) {
            isConfrim = $rootScope.modalConfrim('是否上线展示？？？');
        } else if (status === 2) {
            isConfrim = $rootScope.modalConfrim('是否保存为草稿？？？');
        } else {
            return;
        }

        isConfrim.then(function (res) {
            if (config.method === 'put') {
                //模态框确认
                var ajaxPromise = $httpTools.put(config.ajaxAds, $scope.params);
                ajaxPromise.then(function (res) {
                    if (res.data.code == 0) {
                        $state.go("home.article");
                    } else {
                        $rootScope.modalAlert('上线失败!');
                    }
                }, function (res) {
                    $rootScope.modalAlert(res.data);
                })
            } else if (config.method === 'post') {
                //模态框确认
                var ajaxPromise = $httpTools.post(config.ajaxAds, $scope.params);
                ajaxPromise.then(function (res) {
                    if (res.data.code == 0) {
                        $state.go("home.article");
                    } else {
                        $rootScope.modalAlert('上线失败!');
                    }
                }, function (res) {
                    $rootScope.modalAlert(res.data);
                })
            }
        }, function () {
            //模态框取消
            $rootScope.modalAlert('已取消');
        });
    }
}])