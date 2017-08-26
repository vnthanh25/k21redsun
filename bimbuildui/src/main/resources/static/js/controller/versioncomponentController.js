
/**
 * Controller for Version
 **/

define(['require', 'angular'], function (require, angular) {
	app.aController(bimbuildui.prefix + 'versioncomponentController', function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, versioncomponentService) {
		if(typeof(bimbuildui.translate.versioncomponent) === 'undefined' || bimbuildui.translate.versioncomponent.indexOf($translate.use()) < 0) {
			console.log(bimbuildui.translate.versioncomponent);
			if(typeof(bimbuildui.translate.versioncomponent) === 'undefined') {
				bimbuildui.translate.versioncomponent = '';
			}
			bimbuildui.translate.versioncomponent += $translate.use() + ';';
			$translatePartialLoader.addPart(bimbuildui.contextPath + '/js/common/message/versioncomponent');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
	    	console.log('bimbuildui_versioncomponent_title');
		    $scope.title = $translate.instant('bimbuildui_versioncomponent_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	console.log('version onReady');
	    	$scope.title = $translate.instant('bimbuildui_versioncomponent_title');
	    	$translate.refresh();
	    });
		
	    // Search.
	    $scope.search = {};
	    
		// Paging.
		$scope.page = {
			pageSize: 3,
			totalElements: 0,
			currentPage: 0
		}
		
		$scope.versioncomponent = {};
	    
		$scope.show = function() {
			alert($scope.title);
		}
		$scope.goto = function(state) {
			$state.go(bimbuildui.prefix + state);
		}
	
		$scope.changeLanguage = function(language) {
			$translate.refresh();
			$translate.use(language);
			$translate.refresh();
			$translate.use(language);
			$translate.refresh();
		} 
		
		// Init for list.
		$scope.initList = function() {
			$scope.listWithCriteriasByPage(1);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			$scope.createNew();
			$scope.versioncomponent.id = id;
			if($scope.versioncomponent.id > -1) {
				$scope.getById($scope.versioncomponent.id);
			}
			$scope.frmDirty = false;
		}
		
		// Show a create screen.
		$scope.showCreate = function() {
			$scope.initForm(-1);
			$scope.showDialog();
		}
		
		// Show a form screen.
		$scope.showForm = function(id) {
			$scope.initForm(id);
			$scope.showDialog();
		}

	    // Show edit view.
	    $scope.showDialog = function () {
	        var htmlUrlTemplate = bimbuildui.contextPath + '/view/versioncomponent_form.html';
	        bimbuildui.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Create new.
		$scope.createNew = function() {
			$scope.versioncomponent = { id: -1 };
		}
		
		// Save.
		$scope.save = function() {
			if($scope.frmVersioncomponent.$invalid) {
				$scope.frmVersioncomponent.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage('Saving!', 'alert-success', false);
			var result;
			if($scope.versioncomponent.id > -1) {
				result = versioncomponentService.update($scope.versioncomponent.id, $scope.versioncomponent);
			} else {
				result = versioncomponentService.create($scope.versioncomponent);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.Created || response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.versioncomponent.id = data.id;
					$scope.showMessage($translate.instant('bimbuildui_home_saved'), 'alert-success', true);
					$scope.listWithCriteriasByPage(1);
				} else {
					$scope.showMessage($translate.instant('bimbuildui_home_fail'), 'alert-danger', true);
				}
			},
			// error.
			function(response) {
				$scope.showMessage($translate.instant('bimbuildui_home_error'), 'alert-danger', true);
			});
		}
		
		// Delete.
		$scope.delete = function(id){
			if($window.confirm('Are you sure to delete?')) {
				versioncomponentService.delete(id)
				// success.
				.then(function(response) {
					if(response.status === bimbuildui.httpStatus.code.NoContent) {
						$scope.showMessage('Deleted!', 'alert-success', true);
						$scope.listWithCriteriasByPage(1);
					} else {
						$scope.showMessage($translate.instant('bimbuildui_home_fail'), 'alert-danger', true);
					}
				},
				// error.
				function(response) {
					$scope.showMessage($translate.instant('bimbuildui_home_error'), 'alert-danger', true);
				});
			}
		} 
		
		// Get by Id.
		$scope.getById = function(id) {
			versioncomponentService.getById(id)
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.versioncomponent = data;
				} else {
					$scope.showMessage($translate.instant('bimbuildui_home_fail'), 'alert-danger', true);
				}
			},
			// error.
			function(response) {
				$scope.showMessage($translate.instant('bimbuildui_home_error'), 'alert-danger', true);
			});
		}
		
		// List for page and filter.
		$scope.listWithCriteriasByPage = function(pageNo) {
			$scope.page.currentPage = pageNo;
			versioncomponentService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort())
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var result = angular.fromJson(response.data.content);
					$scope.versioncomponents = result;
					$scope.page.totalElements = 0;
					if(result.length > 0) {
						$scope.page.totalElements = response.data.totalElements;
					}
				} else if(response.status === bimbuildui.httpStatus.code.NoContent) {
					$scope.versioncomponents = [];
					$scope.page.totalElements = 0;
				} else {
					$scope.showMessage($translate.instant('bimbuildui_home_fail'), 'alert-danger', true);
				}
			},
			// error.
			function(response) {
				$scope.showMessage($translate.instant('bimbuildui_home_error'), 'alert-danger', true);
			});
		}
		
		// Clear filter.
		$scope.clearFilter = function() {
			$scope.search = {};
		}

		/*Extend functions*/
		
		// Sort by.
		$scope.sortBy = function(keyName){
			$scope.sortKey = keyName;
			$scope.reverse = !$scope.reverse;
		}
		
		// Get sort object.
		$scope.getSort = function() {
			var result = [];
			// name.
		    if(typeof($scope.sortKey) !== 'undefined' && $scope.sortKey !== ''){
		    	result.push('sort=' + $scope.sortKey + ',' + $scope.reverse);
		    }
			// return.
			return result;
		}
		
		// Get search object.
		$scope.getSearch = function() {
		    var result = [];
		    // id.
		    if(typeof($scope.search.id) !== 'undefined' && $scope.search.id !== ''){
		    	result.push({ key: 'id', operation: '=', value: $scope.search.id, logic: 'or' });
		    }
		    // idproduct.
		    if(typeof($scope.search.idproduct) !== 'undefined' && $scope.search.idproduct !== ''){
		    	result.push({ key: 'idproduct', operation: '=', value: $scope.search.idproduct, logic: 'or' });
		    }
		    // idcontact.
		    if(typeof($scope.search.idcontact) !== 'undefined' && $scope.search.idcontact !== ''){
		    	result.push({ key: 'idcontact', operation: '=', value: $scope.search.idcontact, logic: 'or' });
		    }
		    // idresource.
		    if(typeof($scope.search.idresource) !== 'undefined' && $scope.search.idresource !== ''){
		    	result.push({ key: 'idresource', operation: '=', value: $scope.search.idresource, logic: 'or' });
		    }
		    // name.
		    if(typeof($scope.search.name) !== 'undefined' && $scope.search.name !== ''){
		    	result.push({ key: 'name', operation: 'like', value: $scope.search.name, logic: 'or' });
		    }
		    // description.
		    if(typeof($scope.search.description) !== 'undefined' && $scope.search.description !== ''){
		    	result.push({ key: 'description', operation: 'like', value: $scope.search.description, logic: 'or' });
		    }
		    // creationdate.
		    if(typeof($scope.search.creationdate) !== 'undefined' && $scope.search.creationdate !== ''){
		    	result.push({ key: 'creationdate', operation: '=', value: $scope.search.creationdate, logic: 'or' });
		    }
		    // idle.
		    if(typeof($scope.search.idle) !== 'undefined' && $scope.search.idle !== ''){
		    	result.push({ key: 'idle', operation: '=', value: $scope.search.idle, logic: 'or' });
		    }
		    // initialeisdate.
		    if(typeof($scope.search.initialeisdate) !== 'undefined' && $scope.search.initialeisdate !== ''){
		    	result.push({ key: 'initialeisdate', operation: '=', value: $scope.search.initialeisdate, logic: 'or' });
		    }
		    // plannedeisdate.
		    if(typeof($scope.search.plannedeisdate) !== 'undefined' && $scope.search.plannedeisdate !== ''){
		    	result.push({ key: 'plannedeisdate', operation: '=', value: $scope.search.plannedeisdate, logic: 'or' });
		    }
		    // realeisdate.
		    if(typeof($scope.search.realeisdate) !== 'undefined' && $scope.search.realeisdate !== ''){
		    	result.push({ key: 'realeisdate', operation: '=', value: $scope.search.realeisdate, logic: 'or' });
		    }
		    // initialenddate.
		    if(typeof($scope.search.initialenddate) !== 'undefined' && $scope.search.initialenddate !== ''){
		    	result.push({ key: 'initialenddate', operation: '=', value: $scope.search.initialenddate, logic: 'or' });
		    }
		    // plannedenddate.
		    if(typeof($scope.search.plannedenddate) !== 'undefined' && $scope.search.plannedenddate !== ''){
		    	result.push({ key: 'plannedenddate', operation: '=', value: $scope.search.plannedenddate, logic: 'or' });
		    }
		    // realenddate.
		    if(typeof($scope.search.realenddate) !== 'undefined' && $scope.search.realenddate !== ''){
		    	result.push({ key: 'realenddate', operation: '=', value: $scope.search.realenddate, logic: 'or' });
		    }
		    // iseis.
		    if(typeof($scope.search.iseis) !== 'undefined' && $scope.search.iseis !== ''){
		    	result.push({ key: 'iseis', operation: '=', value: $scope.search.iseis, logic: 'or' });
		    }
		    // scope.
		    if(typeof($scope.search.scope) !== 'undefined' && $scope.search.scope !== ''){
		    	result.push({ key: 'scope', operation: 'like', value: $scope.search.scope, logic: 'or' });
		    }
		    // versionnumber.
		    if(typeof($scope.search.versionnumber) !== 'undefined' && $scope.search.versionnumber !== ''){
		    	result.push({ key: 'versionnumber', operation: 'like', value: $scope.search.versionnumber, logic: 'or' });
		    }
		    // iduser.
		    if(typeof($scope.search.iduser) !== 'undefined' && $scope.search.iduser !== ''){
		    	result.push({ key: 'iduser', operation: '=', value: $scope.search.iduser, logic: 'or' });
		    }
		    // idversiontype.
		    if(typeof($scope.search.idversiontype) !== 'undefined' && $scope.search.idversiontype !== ''){
		    	result.push({ key: 'idversiontype', operation: '=', value: $scope.search.idversiontype, logic: 'or' });
		    }
		    // return.
		    return result;
		}
			
		// Show message.
		$scope.showMessage = function(message, cssName, autoHide) {
			$scope.alertMessage = message;
			$('#alertMessage').addClass(cssName);
			$('#alertMessage').slideDown(500, function() {
				if(autoHide) {
					$window.setTimeout(function() {
						$('#alertMessage').slideUp(500, function() {
							$('#alertMessage').removeClass(cssName);
		            	});
					}, 1000);
				}
			});
		}
	
	});

});
