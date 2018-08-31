var myFubles = angular.module("myFubles", [])

myFubles.controller("MatchesController", function($scope, $http) {
  $scope.title = "This is My Fubles!"

  var url = 'https://api.fubles.com/api/matches?offset=0&page_size=20'

  $http.get(url, {
    headers: {
      withCredentials: true,
      'authorization': 'Bearer ZDcxNmEyNGM2ZDQ5NGFhMzg5MTUzMGI0OGU4ZmQzNzVmYjQyZmMxMWE0NGEwYjg5NThmYjA1YTkxMjdkMmE5ZA'
    }
  }).success(function(data) {
    $scope.matches = data.items
      .filter(matchesFilter)
      .map(matchesMap)
  }).error(function(err) {
    console.log('Error!')
    console.log(err)
  })
})

function matchesFilter(match) {
    var lAmicoCharlyOnlusUserId = 13955
    var lucaTabacco = 26742
    return match.missing_players > 0
      && match.status == 1
      && match.sport_name == 'Calcetto'
      && match.structure.id != lAmicoCharlyOnlusUserId
      && !(match.owner.id == lucaTabacco && match.missing_players == 10)
}

function matchesMap(match) {
  return {
    image:      match.owner.avatar,
    km:         match.me.distance,
    structure:  match.structure.name,
    price:      match.player_price.amount,
    free:       match.missing_players,
    date:       new Date(match.start_datetime),
    id:         match.id,
    sport_type: match.sport_name
  }
}
