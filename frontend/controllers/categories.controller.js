var myApp = angular.module('myApp', ['ngRoute']);

var categoryId = 0;

myApp.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

myApp.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'CategoriesCtrl',
        })
        .when('/list', {
            templateUrl: 'views/list.html',
        })
        .when('/search', {
            templateUrl: 'views/search.html'
        }).otherwise({
            redirectTo: '/views/home.html',
            controller: 'CategoriesCtrl',

        });

}]);

myApp.controller('CategoriesCtrl', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
    //console.log("hello from controller");
    $location.path("/home");
    $scope.updateBtnShw = false;
    $scope.updateBtnHde = true;
    var refresh = function () {
        $http.get('/categoryList').then(doneCallbacks, failCallbacks);
        function doneCallbacks(res) {
            //console.log("Data received");
            $scope.categoryList = res.data;
            $scope.category = null;
        };

        function failCallbacks(err) {
            //console.log(err.message);
        };
    };

    refresh();

    //ADD CATEGORY

    $scope.addCategory = function () {
        //console.log($scope.category);
        if ($scope.category != null) {
            $http.post('/categoryList', $scope.category).then(doneCallbacks, failCallbacks);
            function doneCallbacks(response) {
                //console.log(response);
                refresh();
            };

            function failCallbacks(err) {
                //console.log(err.message);
            };
        }

    };

    //REMOVE CATEGORY    

    $scope.removeCategory = function (id) {
        //console.log(id);
        $http.delete('/categoryList/' + id).then(doneCallbacks, failCallbacks);

        function doneCallbacks(response) {
            //console.log(response);
            $scope.movieListContainer = false;
            refresh();
        };
        function failCallbacks(err) {
            //console.log(err.message);
        };
    };

    //CHANGE NAME OF CATEGORY  

    $scope.editCategory = function (id) {
        //console.log(id);
        $http.get('/categoryList/edit' + id).then(doneCallbacks, failCallbacks);

        function doneCallbacks(response) {
            //console.log(response);
            $scope.category = response.data;
        };
        function failCallbacks(err) {
            //console.log(err.message);
        };
        $scope.updateBtnShw = true;
        $scope.updateBtnHde = false;
    };

    $scope.updateCategory = function () {
        //console.log($scope.category._id);
        $http.put('/categoryList/' + $scope.category._id, $scope.category).then(doneCallbacks, failCallbacks);

        function doneCallbacks(response) {
            //console.log(response);
            refresh();
            $scope.category = '';
            $scope.currentCategory = response.data.name;//tutaj !!!
        };
        function failCallbacks(err) {
            //console.log(err.message);
        };

        $scope.updateBtnShw = false;
        $scope.updateBtnHde = true;
    };

    //GET OMDB API

    $scope.searchMovie = function (title) {

        const url = `http://www.omdbapi.com/?s=${title}&apikey=YOUR API KEY`;//ADD YOUR OMDB API KEY
        $scope.loader = true;
        $http.get(url).then(doneCallbacks, failCallbacks);//url no url2
        function doneCallbacks(res) {
            $scope.foundMovies = res.data.Search;
            $scope.loader = false;
        };

        function failCallbacks(err) {
            //console.log(err.message);
        };
    };


    //ADD MOVIE TO SELECTED CATEGORY && CHECK IF MOVIE ALREADY EXIST IN THIS CATEGORY

    $scope.addMovieToCategory = function (movie) {

        let exist = false;
        refresh();

        $scope.movieAddAlert = false;
        $scope.movieExist = false;

        if ($scope.movieList && $scope.movieList.length > 0) {

            for (let checkMovie of $scope.movieList) {

                if (checkMovie.imdbID === movie.imdbID) {
                    exist = true;
                }
            }
        }

        if (!exist) {
            $http.put('/categoryList/movies/add' + categoryId, movie).then(doneCallbacks, failCallbacks);
            function doneCallbacks(response) {
                //console.log(response);
                $scope.movieList = response.data.movie;
                $scope.movieAddAlert = true;
                $timeout(function () {
                    $scope.movieAddAlert = false;
                }, 1000);
            };
            function failCallbacks(err) {
                //console.log(err.message);
            };
        }
        else {
            $scope.movieExist = true;
            $timeout(function () {
                $scope.movieExist = false;
            }, 1000);
        }
    }

    //SHOW DATA FOR CLICKED CATEGORY
    $scope.selectCategory = function (name, id) {

        $scope.currentCategory = name;
        categoryId = id;
        $scope.loader = true;

        $http.get('/categoryList/movies/select' + categoryId).then(doneCallbacks, failCallbacks);
        function doneCallbacks(response) {
            $scope.movieListContainer = true;
            $scope.loader = false;
            $scope.movieList = response.data.movie;


        };
        function failCallbacks(err) {
            //console.log(err.message);
        };
    }

    //DELETE MOVIE FROM SELECTED CATEGORY

    $scope.movieDeleteAlert = false;

    $scope.deleteMovie = function (movie, id) {

        $http.put('/categoryList/movies/delete' + categoryId, movie).then(doneCallbacks, failCallbacks);

        function doneCallbacks(response) {

            $scope.movieList = response.data.movie;
            $scope.$parent.movieList = response.data.movie;
            $scope.movieDeleteAlert = true;
            $timeout(function () {
                $scope.movieDeleteAlert = false;
            }, 1000);

        };
        function failCallbacks(err) {
            //console.log(err.message);
        };
    };
}]);
