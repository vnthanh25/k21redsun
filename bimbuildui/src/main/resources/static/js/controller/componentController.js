
/**
 * Controller for component
 **/

define(['require', 'angular'], function (require, angular) {
	app.aController(bimbuildui.prefix + 'componentController', function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, componentService) {
		if(typeof(bimbuildui.translate.component) === 'undefined' || bimbuildui.translate.component.indexOf($translate.use()) < 0) {
			console.log(bimbuildui.translate.component);
			if(typeof(bimbuildui.translate.component) === 'undefined') {
				bimbuildui.translate.component = '';
			}
			bimbuildui.translate.component += $translate.use() + ';';
			$translatePartialLoader.addPart(bimbuildui.contextPath + '/js/common/message/component');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
	    	console.log('bimbuildui_component_title');
		    $scope.title = $translate.instant('bimbuildui_component_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	console.log('component onReady');
	    	$scope.title = $translate.instant('bimbuildui_component_title');
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
		
		$scope.component = {};
	    
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
			$scope.component.id = id;
			if($scope.component.id > -1) {
				$scope.getById($scope.component.id);
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
	        var htmlUrlTemplate = bimbuildui.contextPath + '/view/component_form.html';
	        bimbuildui.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Create new.
		$scope.createNew = function() {
			$scope.component = { id: -1 };
		}
		
		// Close dialog.
	    $scope.closeDialog = function () {
            $mdDialog.hide();
        }
		
		// Save.
		$scope.save = function() {
			if($scope.frmComponent.$invalid) {
				$scope.frmComponent.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage('Saving!', 'alert-success', false);
			var result;
			if($scope.component.id > -1) {
				result = componentService.update($scope.component.id, $scope.component);
			} else {
				result = componentService.create($scope.component);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.Created || response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.component.id = data.id;
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
				componentService.delete(id)
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
			componentService.getById(id)
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.component = data;
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
			componentService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort())
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var result = angular.fromJson(response.data.content);
					$scope.components = result;
					$scope.page.totalElements = 0;
					if(result.length > 0) {
						$scope.page.totalElements = response.data.totalElements;
					}
				} else if(response.status === bimbuildui.httpStatus.code.NoContent) {
					$scope.components = [];
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
		    	result.push({ key: 'id', operation: 'like', value: $scope.search.id, logic: 'or' });
		    }
		    // name.
		    if(typeof($scope.search.name) !== 'undefined' && $scope.search.name !== ''){
		    	result.push({ key: 'name', operation: 'like', value: $scope.search.name, logic: 'or' });
		    }
		    // idclient.
		    if(typeof($scope.search.idclient) !== 'undefined' && $scope.search.idclient !== ''){
		    	result.push({ key: 'idclient', operation: '=', value: $scope.search.idclient, logic: 'or' });
		    }
		    // idcontact.
		    if(typeof($scope.search.idcontact) !== 'undefined' && $scope.search.idcontact !== ''){
		    	result.push({ key: 'idcontact', operation: '=', value: $scope.search.idcontact, logic: 'or' });
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
		    // idcomponent.
		    if(typeof($scope.search.idproduct) !== 'undefined' && $scope.search.idproduct !== ''){
		    	result.push({ key: 'idproduct', operation: '=', value: $scope.search.idproduct, logic: 'or' });
		    }
		    // designation.
		    if(typeof($scope.search.designation) !== 'undefined' && $scope.search.designation !== ''){
		    	result.push({ key: 'designation', operation: 'like', value: $scope.search.designation, logic: 'or' });
		    }
		    // scope.
		    if(typeof($scope.search.scope) !== 'undefined' && $scope.search.scope !== ''){
		    	result.push({ key: 'scope', operation: 'like', value: $scope.search.scope, logic: 'or' });
		    }
		    // idcomponenttype.
		    if(typeof($scope.search.idcomponenttype) !== 'undefined' && $scope.search.idproducttype !== ''){
		    	result.push({ key: 'idproducttype', operation: '=', value: $scope.search.idproducttype, logic: 'or' });
		    }
		    // idcomponenttype.
		    if(typeof($scope.search.idcomponenttype) !== 'undefined' && $scope.search.idcomponenttype !== ''){
		    	result.push({ key: 'idcomponenttype', operation: '=', value: $scope.search.idcomponenttype, logic: 'or' });
		    }
		    // idresource.
		    if(typeof($scope.search.idresource) !== 'undefined' && $scope.search.idresource !== ''){
		    	result.push({ key: 'idresource', operation: '=', value: $scope.search.idresource, logic: 'or' });
		    }
		    // iduser.
		    if(typeof($scope.search.iduser) !== 'undefined' && $scope.search.iduser !== ''){
		    	result.push({ key: 'iduser', operation: '=', value: $scope.search.iduser, logic: 'or' });
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
