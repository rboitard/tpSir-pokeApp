var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'https://pokeapi.co');

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('pokeCtrl', function ($scope, pikApi) {
    $scope.pokes = ["bulbizare", "carapuce", "salameche"];
    $scope.pokemonSelected;
    $scope.pokeSearch;
    pikApi.pikApiById(1);
});

pokeApp.controller('LogController', ['$scope', '$log', function ($scope, $log) {
    $scope.$log = $log;
}]);

pokeApp.controller('pokeInfo', function($scope, pikApi){
    $scope.pokemon = pikApi.getPokemon();
});


pokeApp.factory('pikApi', function ($log, $resource, POKEAPI) {
    var pokemon = {};
    var description = {};
    function pikApiById(id) {
        var pokemonApi = $resource(POKEAPI + "/api/v2/pokemon/:pokeId");
        pokemonApi.get({pokeId:id}).$promise.then(function(result){
            $log.warn(result);
            pokemon = result;
        })

    };

    function getPokemon(){
        return pokemon;
    }
    return {pikApiById: pikApiById, getPokemon: getPokemon}
});
