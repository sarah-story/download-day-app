app.controller('CheckboxCtrl', ["$scope", function($scope, $location) {
  console.log("Here I am");

  $scope.installsOne = {
    "github" : false,
    "slack" : false,
    "treehouse" : false,
    "codepen" : false
  };

  $scope.installsTwo = {
    "chrome" : false,
    "cast" : false,
    "sublime" : false
  };

  $scope.winInstalls = {
    "powershell" : false,
    "chocolate" : false
  }

  $scope.checkboxStatus = function(obj, path){

    if(obj.github && obj.slack && obj.treehouse && obj.codepen){
      location.assign(path);
    }else{
      console.log("Not yet");
    }

    if(obj.chrome && obj.cast && obj.sublime){
      location.assign(path);
    }else{
      console.log("Not yet");
    }

    if(obj.powershell && obj.chocolate){
      location.assign(path);
    }else{
      console.log("Not yet");
    }

  }

}]);