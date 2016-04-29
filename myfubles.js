var myFubles = angular.module("myFubles", [])

myFubles.controller("MatchesController", function($scope, $http) {
  $scope.title = "This is My Fubles!"

  $http.get('matches.json').success(function(data) {
    $scope.matches = data.near
      .filter(matchesFilter)
      .map(matchesMap)
    console.debug($scope.matches)
  })
})

function matchesMap(match) {
  return {
    hour:       match.locale_start_time.split(':')[0],
    minute:     match.locale_start_time.split(':')[1],
    image:      match.owner.avatar_small,
    km:         match.distance,
    structure:  match.field.structure.name,
    price:      (match.price / 10).toFixed(2),
    free:       match.missing_players,
    date:       match.locale_start_day + " " + match.locale_start_month,
    weekday:    match.locale_start_week_day,
    id:         match.id,
  }
}

function matchesFilter(match) {
    return match.missing_players > 0
}
