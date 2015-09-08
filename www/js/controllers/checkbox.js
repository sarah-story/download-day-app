app.controller('CheckboxCtrl', ["$scope", function($scope, $location) {
  console.log("Here I am");

  $scope.installsOne = {
    "github" : false,
    "slack" : false,
    "treehouse" : false,
    "codepen" : false
  };

  $scope.installsTwo = {

  };

  $scope.checkboxStatus = function(obj, path){

    if(obj.github && obj.slack && obj.treehouse && obj.codepen){
      location.assign(path);
    }else{
      console.log("Not yet");
    }

  }

}]);