# teaching-jxs-tp5
TP5 : PokeSyr

Le projet est composé de 3 fichiers important : 
 - /pokedex.html : contient le code html, utilisé en tant que directive. Divisé en deux divisions important : 
    - Une div contenant le html destiné à la saisi de recherche de pokemon
    - Une div contenant le html destiné à l'affichage des informations du pokemon
 - /index.html : Point d'entrer. utilise une directive pour utiliser le html de pokedex.html
 - /js/pokedex.html : contient le code js utilisant angular. Le code contient :
    - 2 controleurs, pokeCtrl pour récupérer les informations d'un pokemon / pokeInfo pour l'affichage des informatiosn du pokemon
    - 1 factory, pikApi, permettant de faire des requêtes sur l'api. la factory contient 3 variables, pokemon contenant le pokemon courant, pokedex contenant l'ensemble des pokemons de la première génération, description contenant la description du pokemon courant. La factory permet de chercher un pokemon par son identifiant, ou bien de récupérer tout les pokemons. 
