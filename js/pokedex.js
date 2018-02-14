var pokeApp = angular.module('pokedex', ['ngResource']);

// With this you can inject POKEAPI url wherever you want
pokeApp.constant('POKEAPI', 'https://pokeapi.co');

pokeApp.config(['$resourceProvider', function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

pokeApp.controller('pokeCtrl', function ($scope, pikApi, $log, $resource, POKEAPI) {
    var pokemonApi = $resource(POKEAPI + "/api/v2/pokemon/?limit=151");
    pokemonApi.get().$promise.then(function (result) {
        pokedex = result.results;
        $scope.pokes = pokedex;
    });
    $scope.getPokemonByName = function (pokemonSelected) {
        pikApi.pikApiById(pokemonSelected);
    };
});

pokeApp.controller('pokeInfo', function ($scope, pikApi, $log) {
    $scope.$watch(function () {
        return pikApi.getPokemon()
    }, function (newPokemon, oldPokemon) {
        $log.warn("pokeInfo");
        $scope.pokemon = newPokemon;
    })
});


pokeApp.factory('pikApi', function ($log, $resource, POKEAPI) {
    var pokemon = {};
    var pokedex = {};
    var description = {};

    function pikApiById(id) {
        var pokemonApi = $resource(POKEAPI + "/api/v2/pokemon/:pokeId");
        pokemonApi.get({
            pokeId: id
        }).$promise.then(function (result) {
            pokemon = result;
            var pokemonApiDescription = $resource(pokemon.species.url);
            pokemonApiDescription.get().$promise.then(function(result){
                var description = result.flavor_text_entries.find(function(m){
                    return m.language.name === "fr";
                });
                pokemon.description = description.flavor_text;
            })
            return pokemon
        })
    };

    function pikApiAll() {
        var pokemonApi = $resource(POKEAPI + "/api/v2/pokemon/?limit=151");
        pokemonApi.get().$promise.then(function (result) {
            pokedex = result.results;
            $log.warn(pokedex);
            return pokedex;
        })
    };


    function getPokemon() {
        return pokemon;
    }

    function getPokedex() {
        return pokedex;
    }
    return {
        pikApiById: pikApiById,
        pikApiAll: pikApiAll,
        getPokemon: getPokemon,
        getPokedex: getPokedex
    }
});

pokeApp.factory('pikafo', function ($log, $resource, POKEAPI) {
    var pokemon = {};
    var pokedex = {};
    var description = {};


});