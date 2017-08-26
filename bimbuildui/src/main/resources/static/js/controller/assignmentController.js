
/**
 * Controller for Assignment
 **/

define(['require', 'angular'], function (require, angular) {
	app.aController(bimbuildui.prefix + 'assignmentController', function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, assignmentService) {
		if(typeof(bimbuildui.translate.assignment) === 'undefined' || bimbuildui.translate.assignment.indexOf($translate.use()) < 0) {
			console.log(bimbuildui.translate.assignment);
			if(typeof(bimbuildui.translate.assignment) === 'undefined') {
				bimbuildui.translate.assignment = '';
			}
			bimbuildui.translate.assignment += $translate.use() + ';';
			$translatePartialLoader.addPart(bimbuildui.contextPath + '/js/common/message/assignment');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
	    	console.log('bimbuildui_assignment_title');
		    $scope.title = $translate.instant('bimbuildui_assignment_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	console.log('assignment onReady');
	    	$scope.title = $translate.instant('bimbuildui_assignment_title');
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
		
		$scope.assignment = {};
	    
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
			$scope.assignment.id = id;
			if($scope.assignment.id > -1) {
				$scope.getById($scope.assignment.id);
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
	        var htmlUrlTemplate = bimbuildui.contextPath + '/view/assignment_form.html';
	        bimbuildui.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    
	    // Close dialog.
	    $scope.closeDialog = function () {
            $mdDialog.hide();
        }
	    
	    // Create new.
		$scope.createNew = function() {
			$scope.assignment = { id: -1 };
		}
		
		// Save.
		$scope.save = function() {
			if($scope.frmAssignment.$invalid) {
				$scope.frmAssignment.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage('Saving!', 'alert-success', false);
			var result;
			if($scope.assignment.id > -1) {
				result = assignmentService.update($scope.assignment.id, $scope.assignment);
			} else {
				result = assignmentService.create($scope.assignment);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.Created || response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.assignment.id = data.id;
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
				assignmentService.delete(id)
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
			assignmentService.getById(id)
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.assignment = data;
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
			assignmentService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort())
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var result = angular.fromJson(response.data.content);
					$scope.assignments = result;
					$scope.page.totalElements = 0;
					if(result.length > 0) {
						$scope.page.totalElements = response.data.totalElements;
					}
				} else if(response.status === bimbuildui.httpStatus.code.NoContent) {
					$scope.assignments = [];
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
		    // idresource.
		    if(typeof($scope.search.idresource) !== 'undefined' && $scope.search.idresource !== ''){
		    	result.push({ key: 'idresource', operation: '=', value: $scope.search.idresource, logic: 'or' });
		    }
		    // idproject.
		    if(typeof($scope.search.idproject) !== 'undefined' && $scope.search.idproject !== ''){
		    	result.push({ key: 'idproject', operation: '=', value: $scope.search.idproject, logic: 'or' });
		    }
		    // reftype.
		    if(typeof($scope.search.reftype) !== 'undefined' && $scope.search.reftype !== ''){
		    	result.push({ key: 'reftype', operation: 'like', value: $scope.search.reftype, logic: 'or' });
		    }
		    // refid.
		    if(typeof($scope.search.refid) !== 'undefined' && $scope.search.refid !== ''){
		    	result.push({ key: 'refid', operation: '=', value: $scope.search.refid, logic: 'or' });
		    }
		    // rate.
		    if(typeof($scope.search.rate) !== 'undefined' && $scope.search.rate !== ''){
		    	result.push({ key: 'rate', operation: '=', value: $scope.search.rate, logic: 'or' });
		    }
		    // assignedwork.
		    if(typeof($scope.search.assignedwork) !== 'undefined' && $scope.search.assignedwork !== ''){
		    	result.push({ key: 'assignedwork', operation: '=', value: $scope.search.assignedwork, logic: 'or' });
		    }
		    // realwork.
		    if(typeof($scope.search.realwork) !== 'undefined' && $scope.search.realwork !== ''){
		    	result.push({ key: 'realwork', operation: '=', value: $scope.search.realwork, logic: 'or' });
		    }
		    // leftwork.
		    if(typeof($scope.search.leftwork) !== 'undefined' && $scope.search.leftwork !== ''){
		    	result.push({ key: 'leftwork', operation: '=', value: $scope.search.leftwork, logic: 'or' });
		    }
		    // plannedwork.
		    if(typeof($scope.search.plannedwork) !== 'undefined' && $scope.search.plannedwork !== ''){
		    	result.push({ key: 'plannedwork', operation: '=', value: $scope.search.plannedwork, logic: 'or' });
		    }
		    // idle.
		    if(typeof($scope.search.idle) !== 'undefined' && $scope.search.idle !== ''){
		    	result.push({ key: 'idle', operation: '=', value: $scope.search.idle, logic: 'or' });
		    }
		    // realstartdate.
		    if(typeof($scope.search.realstartdate) !== 'undefined' && $scope.search.realstartdate !== ''){
		    	result.push({ key: 'realstartdate', operation: '=', value: $scope.search.realstartdate, logic: 'or' });
		    }
		    // realenddate.
		    if(typeof($scope.search.realenddate) !== 'undefined' && $scope.search.realenddate !== ''){
		    	result.push({ key: 'realenddate', operation: '=', value: $scope.search.realenddate, logic: 'or' });
		    }
		    // comment.
		    if(typeof($scope.search.comment) !== 'undefined' && $scope.search.comment !== ''){
		    	result.push({ key: 'comment', operation: 'like', value: $scope.search.comment, logic: 'or' });
		    }
		    // plannedstartdate.
		    if(typeof($scope.search.plannedstartdate) !== 'undefined' && $scope.search.plannedstartdate !== ''){
		    	result.push({ key: 'plannedstartdate', operation: '=', value: $scope.search.plannedstartdate, logic: 'or' });
		    }
		    // plannedenddate.
		    if(typeof($scope.search.plannedenddate) !== 'undefined' && $scope.search.plannedenddate !== ''){
		    	result.push({ key: 'plannedenddate', operation: '=', value: $scope.search.plannedenddate, logic: 'or' });
		    }
		    // idrole.
		    if(typeof($scope.search.idrole) !== 'undefined' && $scope.search.idrole !== ''){
		    	result.push({ key: 'idrole', operation: '=', value: $scope.search.idrole, logic: 'or' });
		    }
		    // dailycost.
		    if(typeof($scope.search.dailycost) !== 'undefined' && $scope.search.dailycost !== ''){
		    	result.push({ key: 'dailycost', operation: '=', value: $scope.search.dailycost, logic: 'or' });
		    }
		    // newdailycost.
		    if(typeof($scope.search.newdailycost) !== 'undefined' && $scope.search.newdailycost !== ''){
		    	result.push({ key: 'newdailycost', operation: '=', value: $scope.search.newdailycost, logic: 'or' });
		    }
		    // assignedcost.
		    if(typeof($scope.search.assignedcost) !== 'undefined' && $scope.search.assignedcost !== ''){
		    	result.push({ key: 'assignedcost', operation: '=', value: $scope.search.assignedcost, logic: 'or' });
		    }
		    // realcost.
		    if(typeof($scope.search.realcost) !== 'undefined' && $scope.search.realcost !== ''){
		    	result.push({ key: 'realcost', operation: '=', value: $scope.search.realcost, logic: 'or' });
		    }
		    // leftcost.
		    if(typeof($scope.search.leftcost) !== 'undefined' && $scope.search.leftcost !== ''){
		    	result.push({ key: 'leftcost', operation: '=', value: $scope.search.leftcost, logic: 'or' });
		    }
		    // plannedcost.
		    if(typeof($scope.search.plannedcost) !== 'undefined' && $scope.search.plannedcost !== ''){
		    	result.push({ key: 'plannedcost', operation: '=', value: $scope.search.plannedcost, logic: 'or' });
		    }
		    // billedwork.
		    if(typeof($scope.search.billedwork) !== 'undefined' && $scope.search.billedwork !== ''){
		    	result.push({ key: 'billedwork', operation: '=', value: $scope.search.billedwork, logic: 'or' });
		    }
		    // notplannedwork.
		    if(typeof($scope.search.notplannedwork) !== 'undefined' && $scope.search.notplannedwork !== ''){
		    	result.push({ key: 'notplannedwork', operation: '=', value: $scope.search.notplannedwork, logic: 'or' });
		    }
		    // plannedstartfraction.
		    if(typeof($scope.search.plannedstartfraction) !== 'undefined' && $scope.search.plannedstartfraction !== ''){
		    	result.push({ key: 'plannedstartfraction', operation: '=', value: $scope.search.plannedstartfraction, logic: 'or' });
		    }
		    // plannedendfraction.
		    if(typeof($scope.search.plannedendfraction) !== 'undefined' && $scope.search.plannedendfraction !== ''){
		    	result.push({ key: 'plannedendfraction', operation: '=', value: $scope.search.plannedendfraction, logic: 'or' });
		    }
		    // isnotimputable.
		    if(typeof($scope.search.isnotimputable) !== 'undefined' && $scope.search.isnotimputable !== ''){
		    	result.push({ key: 'isnotimputable', operation: '=', value: $scope.search.isnotimputable, logic: 'or' });
		    }
		    // optional.
		    if(typeof($scope.search.optional) !== 'undefined' && $scope.search.optional !== ''){
		    	result.push({ key: 'optional', operation: '=', value: $scope.search.optional, logic: 'or' });
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
