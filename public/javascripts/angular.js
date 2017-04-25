var app = angular.module('app', ['ui.router','ngStorage']);
    app.factory("datafact",function($http,$cacheFactory){
            var cachedData;
            function getdata(callback){
                if(cachedData){
                    callback(cachedData)
                }
                else{
                    $http.get('user/getdata').success(function(data){
                        cachedData=data;
                       callback(cachedData);
                        
                    })
                }
            }
            cachedData.setOptions({
    maxAge: 3600000
});
        return{ 
            list:function(user,callback){
           $http({
                 method: 'POST',
                 url: 'user/login',
                 data:user
        }).success (callback) },
        register:function(user,callback){
             $http({
                 method: 'POST',
                 url: 'user/register',
                 data:user
        }).success (callback) }

        }
        })

app.config(function ($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: '/',
            views: {
                "view": {
                    templateUrl: 'login.html',
                    controller: function ($scope, $http, $location,$localStorage,datafact) {
                        $scope.user = {
                            username : '',
                            email : '',
                            pwd : ''
                        };
                        $scope.initial = false;
                        $scope.loginuser = function (user) {
                            datafact.list(user,function(response)
                             
                          {
                                 console.log(response);
                                if(response.msg == "successfully logged in"){
                                    // $localStorage.user=response.data.username;
                                    //console.log(response.data.user.username);
                                   $location.path('home');
                                }
                                else{
                                    alert("username or password is incorrect");
                                    return false;
                                }
                            }
                                )
                        }
                        $scope.newuser = function (user) {
                            $scope.initial = true;
                            
                            console.log(user);
                            if (!$scope.login.$valid) {
                                console.log(user);
                                console.log("invalid");
                                return false;
                            }
                            else {
                             datafact.register(user,function(response)
                              { 
                                  console.log(response);
                                    $scope.initial = false;
                              }
                                    
                                )
                               
                               
                            }

                           
                        }

                    }
                }
            }
        })
        .state('home', {

            url: '/home',
            abstract: true,
            views: {
                "view": { templateUrl: 'home.html' },
                 controller: function ($scope, $http, $location){
                   $scope.username="saroj";
                 }
            }
        })
        .state('home.topics', {
            url: '',
            views: {
                "viewB": { templateUrl: 'topics.html' }
            }
        })
        .state('home.posts', {
            //  Posts state. This state will contain nested views
            url: 'posts',
            views: {
                "viewB": {
                    template: '<div class="jumbotron text-center">    <h1>Posts page</h1>    <p>This page shows a list of posts and it is intended to show the use of Nested Views.</p>      <a ui-sref=".list" class="btn btn-primary">List</a>    <a ui-sref=".info" class="btn btn-info">Information</a> </div><div ui-view></div>'
                }
            }
        })
        .state('home.posts.list', {
            // Posts list state. This state is child of posts state
            url: '/list',
            template: '<ul>   <li ng-repeat="post in posts">       {{post.id}} - {{post.name}}   </li></ul>',
            controller: ['$scope', function ($scope) {
                $scope.posts = [
                    { id: 1, name: "WCG Post 1" },
                    { id: 2, name: "WCG Post 2" },
                    { id: 3, name: "WCG Post 3" },
                    { id: 4, name: "WCG Post 4" },
                    { id: 5, name: "WCG Post 5" },
                ]
            }]
        })

        .state('home.posts.info', {
            // Posts info state. This state is child of posts state
            url: '/info',
            template: 'Posts information. We are using directly a string template instead of a url linking to a template.'
        })
        .state('home.authors', {
            // Authors state. This state will contain multiple views
            url: 'authors',
            views: {
                // Main template. It will be placed in the ui-view of the index.html file when /authors url is visited (relatively named)
                'viewB': { template: '<div class="jumbotron text-center"><h1>Authors page</h1><p>This page shows a list of popular and recent authors and it is intended to show the use of Multiple Views.</p></div><div class="row">   <!-- Popular authors named view -->   <div class="col-sm-6">     <div ui-view="popular"></div>   </div>   <!-- Recent authors named view -->   <div class="col-sm-6">      <div ui-view="recent"></div>   </div></div>' },

                // popular child view. Absolutely named. It will be injected in the popular ui-view of authors state
                'popular@authors': {
                    template: '<ul><li ng-repeat="author in authors">{{author.name}} {{author.surname}}</li></ul>',
                    controller: ['$scope', function ($scope) {
                        $scope.authors = [
                            { name: 'John', surname: 'Benneth' },
                            { name: 'Anthony', surname: 'Horner' },
                            { name: 'James', surname: 'Blanch' },
                            { name: 'Harrison', surname: 'Williams' },
                        ];
                    }]
                },

                // recent child view. Absolutely named. It will be injected in the recent ui-view of authors state
                'recent@authors': { template: 'No recent authors since last month' }
            }
        })
        .state("home.readers", {
            url: '/readers',
            views: {
                'viewB': { templateUrl: "readers.html" }

            }

        })
    // app.controller('loginctrl',function($scope,$http,$state){
    // $scope.loginuser=function(user){
    //     consoloe.log(user);
    // $state.go('home');
    // }
    // })
});
