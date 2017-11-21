var myFubles = angular.module("myFubles", [])

myFubles.controller("MatchesController", function($scope, $http) {
  $scope.title = "This is My Fubles!"

  var url = 'http://' + window.location.hostname + ':8000/?url=' +
    'http://it.fubles.com/matches/by/user/55576/near/0/0/50?sport-players=1-5'

  $http.get(url).success(function(data) {
    $scope.matches = data.near
      .filter(matchesFilter)
      .map(matchesMap)
  })
})

function matchesFilter(match) {
    var lAmicoCharlyOnlusUserId = 13955
    return match.missing_players > 0
      && !match.retracted
      && match.field.structure.id != lAmicoCharlyOnlusUserId
}

function matchesMap(match) {
  return {
    hour:       match.locale_start_time.split(':')[0],
    minute:     match.locale_start_time.split(':')[1],
    image:      match.owner.avatar_small,
    km:         kmFromStructure(match.field.structure),
    structure:  match.field.structure.name,
    price:      (match.price / 10).toFixed(2),
    free:       match.missing_players,
    date:       match.locale_start_day + " " + match.locale_start_month,
    weekday:    match.locale_start_week_day,
    id:         match.id,
    sport_type: match.sport_type_name_covering,
  }
}

function kmFromStructure(structure) {
  if(structure.distance)
    return structure.distance

  const distanceMap = {
    197: 1,
    164: 2,
    1370: 2.6,
    40: 3.1,
    916: 5.1,
    17: 5.4,
    1441: 5.4,
    14713: 6,
    987: 6.1,
    446: 6.2,
    33: 6.3,
    6492: 6.6,
    91: 7,
    72: 7.4,
    12497: 8.5,
    420: 9.7,
  }
  
  return distanceMap[structure.id]
}
