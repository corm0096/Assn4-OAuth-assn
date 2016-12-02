angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, $cordovaOauth, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function()
  {

//I have not had any success getting this to work, and even the author's test didn't work though I followed his instructions.
//It's commented out for now, just to show the logic I used.
	  
//	  $cordovaOauth.facebook("336777606701145", ["public_profile"],{redirect_uri:"http://localhost/callback"})
//	.then(function(result)
//	{
//		//Save data here, result.access_token.
//		fetchName(result.access_token);
//    },
//	function(error)
//	{
//    	alert("Error: " + error);
//    });
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
   
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
	  $rootScope.isLoggedIn=true;
		
	//Saving emulation here.
	  $rootScope.token=$scope.loginData;
	  window.localStorage.setItem("FB_key",$scope.loginData);
    }, 1000);
  };
	
//	$scope.fetchName=function(access_token)
//	{
//		//Connect to using https://graph.facebook.com/v2.8/me, pass access_token.
//		//$rootScope.username=name once you get it.
//	}
})

.controller('PlaylistsCtrl', function($scope, $rootScope, this_session) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

	
	$scope.terminate = function()
	{
		this_session.terminate();
	};
})

.controller('PlaylistCtrl', function($scope, $stateParams,this_session) {
	$scope.terminate = function()
	{
		this_session.terminate();
	};
})

.factory('this_session',function($rootScope)
{
	return{
		terminate: function()
		{
			if ($rootScope.isLoggedIn)
			{
				$rootScope.isLoggedIn=false;
				window.localStorage.removeItem("FB_key");
				location.href="";
			}
		}
	}
});
