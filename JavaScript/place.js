// app.controller('articleListCtrl', ['$scope', '$http', function ($scope, $http) {
//     $scope.article = {
//         ajaxData: []
//     };
//     $scope.list = function () {
//         var ask = $http.put('/carrots-admin-ajax/a/u/article/status');
//         ask.then(function (res) {
//             if (res.data.code === 0) {
//                 $scope.article.ajaxData = res.data.data.articleList;
//                 console.log(JSON.stringify($scope.article));
//             } else {
//                 alert('服务器异常');
//             }
//         }, function (res) {
//             alert('请求错误');
//         })
//     }
//     $scope.list();
// }]
// app.filter('positionCategoryFilter', function () {
//     return function (status) {
//         switch (status) {
//             case 1:
//                 return "产品";
//             case 2:
//                 return "UI";
//             case 3:
//                 return "QA";
//             case 4:
//                 return "Android";
//             case 5:
//                 return "IOS";
//             case 6:
//                 return "WEB";
//             case 7:
//                 return "OP";
//             case 8:
//                 return "Java";
//             case 9:
//                 return "NLP";
//             case 10:
//                 return "DM";
//             case 11:
//                 return "DL";
//         }
//     }
// })
// //学历要求
//     app.filter('positionEducationFilter', function () {
//         return function (status) {
//             switch (status) {
//                 case 0:
//                     return "大专";
//                 case 1:
//                     return "本科";
//                 case 2:
//                     return "硕士";
//                 case 3:
//                     return "博士";
//             }
//         }
//     })
//     //工作经验
//     app.filter('positionExperienceFilter', function () {
//         return function (status) {
//             switch (status) {
//                 case 0:
//                     return "应届";
//                 case 1:
//                     return "1~2年";
//                 case 2:
//                     return "3~5年";
//                 case 3:
//                     return "6～9年";
//                 case 4:
//                     return "4-10年及以上";
//             }
//         }
//     })
//     //工资
//     app.filter('positionCompensationFilter', function () {
//         return function (status) {
//             switch (status) {
//                 case 0:
//                     return "8K以下";
//                 case 1:
//                     return "8~15K";
//                 case 2:
//                     return "16~25K ";
//                 case 3:
//                     return "26K及以上";
//             }
//         }
//     })