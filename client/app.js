//client/app.js handles the client view.
//Define angular app as "app".
var app=angular.module('app', []);
//Define how information will be displayed.
//Define "IndexController", then include modules needed to communicate back and forth with server.
app.controller("IndexController", ['$scope', '$http', function($scope, $http) {
    //Define a single cats and the set of cats (used in conj with ng-repeat in index.html)
    $scope.cat = {};
    $scope.cats = [];
    //Create a function to retrieve cat information from server and redefine $scope.cats accordingly.
    var fetchCats = function() {
        //We defined the .get('/cats') functionality in the server-side index.js!
        return $http.get('/cats').then(function(response){
            if(response.status !== 200) {
                throw new Error('Failed to fetch cats from the API');
            }
            $scope.cat = {};
            $scope.cats = response.data;
            return response.data;
        });
    };
    //Post information to the server, which will then update the server and database.
    $scope.add = function(cat) {
        //Use .then to chain functionality - add, then fetch the new list with added cat.
        //we defined the post '/add' functionality in the server-side index.js!
        return $http.post('/add', cat).then(fetchCats);
    };
    //run right away, in case there aren't any kittehs in teh databasxorz.
    //fetchCats();
}]);