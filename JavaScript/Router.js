app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', 'login');
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
        //新增页面
        .state('home.articleDetail', {
            url: '/articleDetail',
            views: {
                "child": {
                    templateUrl: './html/articleDetail.html',
                    // controller: 'articleCtrl',
                }
            }
        })
        //职位列表
        .state('home.place', {
            url: '/place',
            views: {
                "child": {
                    templateUrl: './html/place.html',
                    // controller: 'articleCtrl',
                }
            }
        })
}])
app.controller('', ['$scope', function ($scope) {
    $scope.name = 'loginCtrl';
}])
app.controller('homeCtrl', ['$scope', function ($scope) {
    $scope.name = 'mainCtrl';
}])
app.controller('welcomeCtrl', ['$scope', function ($scope) {
    $scope.name = 'welcomeCtrl';
}])
app.controller('articleCtrl', ['$scope', function ($scope) {
    $scope.name = 'articleCtrl';
}])



































