var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'imgUploadDirective']);

// run
app.run(function ($rootScope, $uibModal) {
    $rootScope.modalAlert = function (content) {
        var instance = $uibModal.open({
            keyboard: true,
            animation: true,
            backdrop: 'static',
            templateUrl: 'JavaScript/direvtive/alertModal/alert.html',
            controller: 'alertCtrl',
            size: 'md',
            resolve:
                {
                    params: {
                        content: content,
                    }
                    ,
                }
            ,
        })
        instance.result.then(function (resolved) {
            //$close()
        }, function (rejected) {
            //$dismiss()
        })
    };
    $rootScope.modalConfrim = function () {
        var content = [].slice.call(arguments);//传入的参数
        var instance = $uibModal.open({
            keyboard: true,
            animation: true,
            backdrop: 'static',
            templateUrl: 'JavaScript/direvtive/confrimModal/confrim.html',
            controller: 'confirmCtrl',
            size: 'md',
            resolve:
                {
                    params: {
                        content: content,
                    },
                },
        })
        //这是promise
        return instance.result;
    };
})
