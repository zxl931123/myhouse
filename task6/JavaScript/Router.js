app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    //登录
        .state('login', {
            url: '/login',
            views: {
                "parent": {
                    templateUrl: './html/login.html',
                    controller: 'loginCtrl',
                }
            }
        })
        //首页
        .state('home', {
            url: '/home',
            views: {
                "parent": {
                    templateUrl: './html/homePage.html',
                    controller: 'homeCtrl',
                }
            }
        })
        .state('home.welcome', {
            url: '/welcome',
            views: {
                "child": {
                    templateUrl: './html/welcome.html',
                    controller: 'welcomeCtrl',
                }
            }
        })
        //article列表
        .state('home.article', {
            url: '/article',
            views: {
                "child": {
                    templateUrl: './html/Article.html',
                    controller: 'articleListCtrl',
                }
            }
        })
        //新增页面,编辑页面
        .state('home.articleDetail', {
            // url传参
            url: '/articleDetail?id',
            views: {
                "child": {
                    templateUrl: './html/articleDetail.html',
                    controller: 'articleEditCtrl'
                }
            },
        })
        .state('home.place', {
            url: '/place',
            views: {
                "child": {
                    templateUrl: './html/place.html',
                }
            },
        })
}])
app.controller('homeCtrl', ['$scope', function ($scope) {
    $scope.name = 'mainCtrl';
}])
app.controller('welcomeCtrl', ['$scope', function ($scope) {
    $scope.name = 'welcomeCtrl';
}])


































