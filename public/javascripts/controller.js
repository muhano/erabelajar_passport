var app = angular.module('app', ['ngRoute', 'ngResource']);

//service---
app.factory('Guru', ['$resource', function($resource){
          return $resource('/guru/:id', null, {
            'update': { method:'PUT' }
          });
}])

//controller---
app.controller('GuruController', ['$scope', 'Guru', function($scope, Guru){
	$scope.editing = [];
	$scope.guru = Guru.query();

	//fungsi save---
	$scope.save = function(){
		if(!$scope.newNama || $scope.newNama.length < 1) return;
		if(!$scope.newLokasi || $scope.newLokasi.length < 1) return;
		if(!$scope.newBiaya || $scope.newBiaya.length < 1) return;
		var guruBaru = new Guru({
			nama: $scope.newNama,
			lokasi: $scope.newLokasi,
			biaya: $scope.newBiaya
		});

		guruBaru.$save(function(){
			$scope.guru.push(guruBaru);
			$scope.newNama = '';
			$scope.newLokasi = '';
			$scope.newBiaya = '';
		})
	}

	//fungsi update, edit, & cancel ---
	$scope.update = function(index){
		var guruEdit = $scope.guru[index];
		Guru.update({id: guruEdit._id}, guruEdit);
		$scope.editing[index] = false;
	}
	$scope.edit = function(index){
		$scope.editing[index] = angular.copy($scope.guru[index]);
	}
	$scope.cancel = function(index){
		$scope.guru[index] = angular.copy($scope.editing[index]);
		$scope.editing[index] = false;
	}

	$scope.remove = function(index){
		var guruHapus = $scope.guru[index];
		Guru.remove({id: guruHapus._id}, function(){
			$scope.guru.splice(index, 1);
		});
	}

}]);

//route---
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl: '/guru.html',
		controller: 'GuruController'
	});
}]);