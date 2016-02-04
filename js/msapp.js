/* global angular */
/* jshint unused: true */

//Movie Search App, namespace 'ms'
//Fully enscapulated app, keeps class and methods off global scope for ease of use and to avoid collisions
window.msApp = (function () {
    'use strict';

    //Angular app reference. Is public.
    var msApp = angular.module('msApp', ['ngAnimate']);     

    /**
     * Controller for main search functionality
     * $scope   - $scope object used by this controller
     * $http    - Adds Ajax http service
     */
    msApp.controller('msSearch', function ($scope, $http) {
        
        /**
         * Takes the search term and loads the movie data from the API
         * @returns {undefined}
         */
        $scope.loadMovies = function(){
            //Ajax in remote content
            $http({
                method      : 'GET',
                url         : 'http://api.themoviedb.org/3/search/movie?api_key=42b3e60b6636f50062f6d3579100d83f&query=' + encodeURIComponent($scope.searchTerm)
            }).then(function ($response) {
                //If no results found, show no results div
                if($response.data.total_results === 0){
                    $scope.noresults    = true;
                    $scope.movies       = {};
                //Otherwise output results
                } else {
                    $scope.noresults    = false;
                    $scope.movies       = $response.data.results;
                }
            });
        };
        
        /**
         * Checks is this movie has a poster. If so set it as an inline style.
         * If not do nothing which defaults to the no poster graphic set in the css
         * @param {type} value  - Will either be a string or null sent by the API
         * @returns {Boolean}   - Return false if value is null, otherwise return a string of the HTTP link to the image
         */
        $scope.getBG = function(value){
            //Check if poster value is undefined or null
            if(angular.isUndefined(value) || value === null ){
                return false;
            } else {
                return { 'background-image' : 'url(http://image.tmdb.org/t/p/w154' + value + ')'};
            }
        };//end $scope.getBG
        
    }).directive('movies', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '='
            },
            templateUrl: 'partials/movie-posters.html'
        };
    });//end msSearch

    //Make main app public, accessible to other scripts
    return msApp;
})();