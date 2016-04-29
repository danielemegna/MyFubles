var myFubles = angular.module("myFubles", [])

myFubles.controller("MatchesController", function($scope, $http) {
  $scope.title = "This is My Fubles!"

  $http.get('matches.json').success(function(data) {
    $scope.matches = data.near.map(matchesMap)
    console.debug($scope.matches)
  })
})

function matchesMap(match, index) {
  return {
    hour:       match.locale_start_time.split(':')[0],
    minute:     match.locale_start_time.split(':')[1],
    image:      match.owner.avatar_small,
    km:         match.distance,
    structure:  match.field.structure.name,
    price:      (match.price / 10).toFixed(2),
    free:       match.missing_players,
  }
}
