
/**
 * Controller for Activity
 **/

define(['require', 'angular'], function (require, angular) {
	app.aController(bimbuildui.prefix + 'activityController', function($q, $sce, $scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, activityService) {
		if(typeof(bimbuildui.translate.activity) === 'undefined' || bimbuildui.translate.activity.indexOf($translate.use()) < 0) {
			console.log(bimbuildui.translate.activity);
			if(typeof(bimbuildui.translate.activity) === 'undefined') {
				bimbuildui.translate.activity = '';
			}
			bimbuildui.translate.activity += $translate.use() + ';';
			$translatePartialLoader.addPart(bimbuildui.contextPath + '/js/common/message/activity');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
	    	console.log('bimbuildui_activity_title');
		    $scope.title = $translate.instant('bimbuildui_activity_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	console.log('activity onReady');
	    	$scope.title = $translate.instant('bimbuildui_activity_title');
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
		
		$scope.activity = {};
	    
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
		
		// Promise list for select.
		var listAllSelectPromise;
		
		// Init for list.
		$scope.initList = function() {
			
			if(typeof(listAllSelectPromise) === 'undefined') {
				var listAllSelectDefered = $q.defer();
				listAllSelectPromise = listAllSelectDefered.promise;
				listAllSelectDefered.resolve([]);
			}
			listAllSelectPromise.then(
				// Success.
				function(response) {

					$scope.listWithCriteriasByPage(1);

				},
				// Error.
				function(response) {
					
				}
			);
		}
		
		// Init for form.
		$scope.initForm = function(id) {
			if(typeof(listAllSelectPromise) === 'undefined') {
				var listAllSelectDefered = $q.defer();
				listAllSelectPromise = listAllSelectDefered.promise;
				listAllSelectDefered.resolve([]);
			}
			listAllSelectPromise.then(
				// Success.
				function(response) {
					
					// Clear all ckeditor instances.
					angular.forEach(CKEDITOR.instances, function(editor) {
						editor.destroy(true);
					});
					// Create new values.
					$scope.createNew();
					$scope.activity.id = id;
					if($scope.activity.id > -1) {
						$scope.getById($scope.activity.id);
					}
					$scope.frmDirty = false;
					
				},
				// Error.
				function(response) {
					
				}
			);
		}
		
		// Show a create form
		$scope.showCreate = function() {
			$scope.initForm(-1);
			$scope.showDialog();
		}
		
		// Show a form.
		$scope.showForm = function(id) {
			$scope.initForm(id);
			$scope.showDialog();
		}

	    // Show edit view Activity form.
	    $scope.showDialog = function () {
	        
	    	var htmlUrlTemplate = bimbuildui.contextPath + '/view/activity_form.html';
	        bimbuildui.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }
	    
	    // Show assignment form
	    $scope.showAssignment = function() {
	    	var htmlUrlTemplate = bimbuildui.contextPath + '/view/assignment_form.html';
	    	//var assignmentController = app.aController(bimbuildui.prefix + 'assignmentController');
	        bimbuildui.showDialogWithControllerName(bimbuildui.prefix + 'assignmentController', 'assignmentController', $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('assignmentController closed');
	        }, function(evt) {
	        	console.log('assignmentController not closed');
	        });
	    }
	    
	    // Show product list
	    $scope.showProduct = function() {
	    	var htmlUrlTemplate = bimbuildui.contextPath + '/view/product_list.html';
	    	//var productController = app.aController(bimbuildui.prefix + 'productController');
	        bimbuildui.showDialogWithControllerName(bimbuildui.prefix + 'productController', 'productController', $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('productController closed');
	        }, function(evt) {
	        	console.log('productController not closed');
	        });
	    }	
	    
	    // Show component list
	    $scope.showComponent = function() {
	    	var htmlUrlTemplate = bimbuildui.contextPath + '/view/component_list.html';
	    	//var componentController = app.aController(bimbuildui.prefix + 'componentController');
	        bimbuildui.showDialogWithControllerName(bimbuildui.prefix + 'componentController', 'componentController', $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('componentController closed');
	        }, function(evt) {
	        	console.log('componentController not closed');
	        });
	    }	
	    
	    // Show product version.
	    $scope.showProductversion = function() {
	    	var htmlUrlTemplate = bimbuildui.contextPath + '/view/version_list.html';
	    	//var versionController = app.aController(bimbuildui.prefix + 'versionController');
	        bimbuildui.showDialogWithControllerName(bimbuildui.prefix + 'versionController', 'versionController', $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('versionController closed');
	        }, function(evt) {
	        	console.log('versionController not closed');
	        });
	    }	
	    
	    // Show component version.
	    $scope.showComponentversion = function() {
	    	var htmlUrlTemplate = bimbuildui.contextPath + '/view/versioncomponent_list.html';
	    	//var versioncomponentController = app.aController(bimbuildui.prefix + 'versioncomponentController');
	        bimbuildui.showDialogWithControllerName(bimbuildui.prefix + 'versioncomponentController', 'versioncomponentController', $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('versioncomponentController closed');
	        }, function(evt) {
	        	console.log('versioncomponentController not closed');
	        });
	    }	
	    
	    // Show origin form.
	    $scope.showOrigin = function() {
	    	var htmlUrlTemplate = bimbuildui.contextPath + '/view/origin_form.html';
	    	//var originController = app.aController(bimbuildui.prefix + 'versioncomponentController');
	        bimbuildui.showDialogWithControllerName(bimbuildui.prefix + 'originController', 'originController', $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('originController closed');
	        }, function(evt) {
	        	console.log('originController not closed');
	        });
	    }	
	    
	    // Show note form.
	    $scope.showNote = function() {
	    	var htmlUrlTemplate = bimbuildui.contextPath + '/view/note_form.html';
	    	//var originController = app.aController(bimbuildui.prefix + 'versioncomponentController');
	        bimbuildui.showDialogWithControllerName(bimbuildui.prefix + 'noteController', 'noteController', $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('noteController closed');
	        }, function(evt) {
	        	console.log('noteController not closed');
	        });
	    }	
	    
	    // Show link form.
	    $scope.showLinked = function() {
	    	var htmlUrlTemplate = bimbuildui.contextPath + '/view/link_form.html';
	    	//var originController = app.aController(bimbuildui.prefix + 'versioncomponentController');
	        bimbuildui.showDialogWithControllerName(bimbuildui.prefix + 'linkController', 'linkController', $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('linkController closed');
	        }, function(evt) {
	        	console.log('linkController not closed');
	        });
	    }	
	    
	    // Close dialog.
	    $scope.closeDialog = function () {
            $mdDialog.hide();
        }
	    
	    
	    // Create new.
		$scope.createNew = function() {
			$scope.activity = { id: -1 };
		}
		
		// Save.
		$scope.save = function() {
			if($scope.frmActivity.$invalid) {
				$scope.frmActivity.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage('Saving!', 'alert-success', false);
			var result;
			if($scope.activity.id > -1) {
				result = activityService.update($scope.activity.id, $scope.activity);
			} else {
				result = activityService.create($scope.activity);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.Created || response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.activity.id = data.id;
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
				activityService.delete(id)
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
			activityService.getById(id)
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.activity = data;
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
			activityService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort())
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var result = angular.fromJson(response.data.content);
					$scope.activitys = result;
					$scope.page.totalElements = 0;
					if(result.length > 0) {
						$scope.page.totalElements = response.data.totalElements;
					}
				} else if(response.status === bimbuildui.httpStatus.code.NoContent) {
					$scope.activitys = [];
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
		    // idproject.
		    if(typeof($scope.search.idproject) !== 'undefined' && $scope.search.idproject !== ''){
		    	result.push({ key: 'idproject', operation: '=', value: $scope.search.idproject, logic: 'or' });
		    }
		    // idactivitytype.
		    if(typeof($scope.search.idactivitytype) !== 'undefined' && $scope.search.idactivitytype !== ''){
		    	result.push({ key: 'idactivitytype', operation: '=', value: $scope.search.idactivitytype, logic: 'or' });
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
		    // iduser.
		    if(typeof($scope.search.iduser) !== 'undefined' && $scope.search.iduser !== ''){
		    	result.push({ key: 'iduser', operation: '=', value: $scope.search.iduser, logic: 'or' });
		    }
		    // idstatus.
		    if(typeof($scope.search.idstatus) !== 'undefined' && $scope.search.idstatus !== ''){
		    	result.push({ key: 'idstatus', operation: '=', value: $scope.search.idstatus, logic: 'or' });
		    }
		    // idresource.
		    if(typeof($scope.search.idresource) !== 'undefined' && $scope.search.idresource !== ''){
		    	result.push({ key: 'idresource', operation: '=', value: $scope.search.idresource, logic: 'or' });
		    }
		    // result.
		    if(typeof($scope.search.result) !== 'undefined' && $scope.search.result !== ''){
		    	result.push({ key: 'result', operation: 'like', value: $scope.search.result, logic: 'or' });
		    }
		    // comment.
		    if(typeof($scope.search.comment) !== 'undefined' && $scope.search.comment !== ''){
		    	result.push({ key: 'comment', operation: 'like', value: $scope.search.comment, logic: 'or' });
		    }
		    // idle.
		    if(typeof($scope.search.idle) !== 'undefined' && $scope.search.idle !== ''){
		    	result.push({ key: 'idle', operation: '=', value: $scope.search.idle, logic: 'or' });
		    }
		    // idactivity.
		    if(typeof($scope.search.idactivity) !== 'undefined' && $scope.search.idactivity !== ''){
		    	result.push({ key: 'idactivity', operation: '=', value: $scope.search.idactivity, logic: 'or' });
		    }
		    // done.
		    if(typeof($scope.search.done) !== 'undefined' && $scope.search.done !== ''){
		    	result.push({ key: 'done', operation: '=', value: $scope.search.done, logic: 'or' });
		    }
		    // idledate.
		    if(typeof($scope.search.idledate) !== 'undefined' && $scope.search.idledate !== ''){
		    	result.push({ key: 'idledate', operation: '=', value: $scope.search.idledate, logic: 'or' });
		    }
		    // donedate.
		    if(typeof($scope.search.donedate) !== 'undefined' && $scope.search.donedate !== ''){
		    	result.push({ key: 'donedate', operation: '=', value: $scope.search.donedate, logic: 'or' });
		    }
		    // handled.
		    if(typeof($scope.search.handled) !== 'undefined' && $scope.search.handled !== ''){
		    	result.push({ key: 'handled', operation: '=', value: $scope.search.handled, logic: 'or' });
		    }
		    // handleddate.
		    if(typeof($scope.search.handleddate) !== 'undefined' && $scope.search.handleddate !== ''){
		    	result.push({ key: 'handleddate', operation: '=', value: $scope.search.handleddate, logic: 'or' });
		    }
		    // idversion.
		    if(typeof($scope.search.idversion) !== 'undefined' && $scope.search.idversion !== ''){
		    	result.push({ key: 'idversion', operation: '=', value: $scope.search.idversion, logic: 'or' });
		    }
		    // reference.
		    if(typeof($scope.search.reference) !== 'undefined' && $scope.search.reference !== ''){
		    	result.push({ key: 'reference', operation: 'like', value: $scope.search.reference, logic: 'or' });
		    }
		    // externalreference.
		    if(typeof($scope.search.externalreference) !== 'undefined' && $scope.search.externalreference !== ''){
		    	result.push({ key: 'externalreference', operation: 'like', value: $scope.search.externalreference, logic: 'or' });
		    }
		    // idcontact.
		    if(typeof($scope.search.idcontact) !== 'undefined' && $scope.search.idcontact !== ''){
		    	result.push({ key: 'idcontact', operation: '=', value: $scope.search.idcontact, logic: 'or' });
		    }
		    // cancelled.
		    if(typeof($scope.search.cancelled) !== 'undefined' && $scope.search.cancelled !== ''){
		    	result.push({ key: 'cancelled', operation: '=', value: $scope.search.cancelled, logic: 'or' });
		    }
		    // idcomponent.
		    if(typeof($scope.search.idcomponent) !== 'undefined' && $scope.search.idcomponent !== ''){
		    	result.push({ key: 'idcomponent', operation: '=', value: $scope.search.idcomponent, logic: 'or' });
		    }
		    // idproduct.
		    if(typeof($scope.search.idproduct) !== 'undefined' && $scope.search.idproduct !== ''){
		    	result.push({ key: 'idproduct', operation: '=', value: $scope.search.idproduct, logic: 'or' });
		    }
		    // isplanningactivity.
		    if(typeof($scope.search.isplanningactivity) !== 'undefined' && $scope.search.isplanningactivity !== ''){
		    	result.push({ key: 'isplanningactivity', operation: '=', value: $scope.search.isplanningactivity, logic: 'or' });
		    }
		    // lastupdatedatetime.
		    if(typeof($scope.search.lastupdatedatetime) !== 'undefined' && $scope.search.lastupdatedatetime !== ''){
		    	result.push({ key: 'lastupdatedatetime', operation: '=', value: $scope.search.lastupdatedatetime, logic: 'or' });
		    }
		    // idcomponentversion.
		    if(typeof($scope.search.idcomponentversion) !== 'undefined' && $scope.search.idcomponentversion !== ''){
		    	result.push({ key: 'idcomponentversion', operation: '=', value: $scope.search.idcomponentversion, logic: 'or' });
		    }
		    // planningmode
		    if(typeof($scope.search.planningmode) !== 'undefined' && $scope.search.planningmode !== ''){
		    	result.push({ key: 'planningmode', operation: '=', value: $scope.search.planningmode, logic: 'or' });
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
		
		// planningmodes
		$scope.planningmodes = [];
		// Convert id to planningmode.
		$scope.getPlanningmodeName = function(id) {
			var length = $scope.planningmodes.length;
			for(var i = 0; i < length; i++) {
				if($scope.planningmodes[i].id === id) {
					return $scope.planningmodes[i].planningname;
				}
			}
			return '';
		}
		
		// //////////////////////////////////////
		// Auto complete: ctlplanningmode
		// //////////////////////////////////////
		$scope.ctlplanningmode = {};
		$scope.ctlplanningmode.items = []; // [{value: 'a', display: 'a'},
												// {value: 'aa', display: 'aa'},
												// {value: 'b', display: 'b'},
												// {value: 'bb', display:
												// 'bb'}];
		$scope.ctlplanningmode.isCallServer = false;
	    $scope.ctlplanningmode.isDisabled    = false;
	    // New.
	    $scope.ctlplanningmode.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlplanningmode.querySearch = function(query) {
	    	var results = query ? $scope.ctlplanningmode.items.filter( $scope.ctlplanningmode.createFilterFor(query) ) : $scope.ctlplanningmode.items;
	    	return results;
	    }
	    // Text change.
	    $scope.ctlplanningmode.searchTextChange = function(text) {
	      
	    }
	    // Item change.
	    $scope.ctlplanningmode.selectedItemChange = function(item) {
	    	$scope.activity.planningmode = item.id;
	    }
	    // Filter.
	    $scope.ctlplanningmode.createFilterFor = function(query) {
	    	var lowercaseQuery = angular.lowercase(query);

	    	return function filterFn(item) {
	    		return (angular.lowercase(item.planningcode).indexOf(lowercaseQuery) >= 0);
	    	};
	    }
	    
	    // activitytypes
		$scope.activitytypes = [];
		// Convert id to planningmode.
		$scope.getTypeName = function(id) {
			var length = $scope.activitytypes.length;
			for(var i = 0; i < length; i++) {
				if($scope.activitytypes[i].id === id) {
					return $scope.activitytypes[i].activityname;
				}
			}
			return '';
		}
		
		// //////////////////////////////////////
		// Auto complete: ctlidactivitytype
		// //////////////////////////////////////
		$scope.ctlidactivitytype = {};
		$scope.ctlidactivitytype.items = []; // [{value: 'a', display: 'a'},
												// {value: 'aa', display: 'aa'},
												// {value: 'b', display: 'b'},
												// {value: 'bb', display:
												// 'bb'}];
		$scope.ctlidactivitytype.isCallServer = false;
	    $scope.ctlidactivitytype.isDisabled    = false;
	    // New.
	    $scope.ctlidactivitytype.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidactivitytype.querySearch = function(query) {
	    	var results = query ? $scope.ctlidactivitytype.items.filter( $scope.ctlidactivitytype.createFilterFor(query) ) : $scope.ctlidactivitytype.items;
	    	return results;
	    }
	    // Text change.
	    $scope.ctlidactivitytype.searchTextChange = function(text) {
	      
	    }
	    // Item change.
	    $scope.ctlidactivitytype.selectedItemChange = function(item) {
	    	$scope.activity.idactivitytype = item.id;
	    }
	    // Filter.
	    $scope.ctlidactivitytype.createFilterFor = function(query) {
	    	var lowercaseQuery = angular.lowercase(query);

	    	return function filterFn(item) {
	    		return (angular.lowercase(item.activityname).indexOf(lowercaseQuery) >= 0);
	    	};
	    }
	    
	    
	    // projectnames
		$scope.projectnames = [];
		// Convert id to projectnames.
		$scope.getProjectName = function(id) {
			var length = $scope.projectnames.length;
			for(var i = 0; i < length; i++) {
				if($scope.projectnames[i].id === id) {
					return $scope.projectnames[i].projectname;
				}
			}
			return '';
		}
		
		// //////////////////////////////////////
		// Auto complete: ctlidproject
		// //////////////////////////////////////
		$scope.ctlidproject = {};
		$scope.ctlidproject.items = []; // [{value: 'a', display: 'a'},
												// {value: 'aa', display: 'aa'},
												// {value: 'b', display: 'b'},
												// {value: 'bb', display:
												// 'bb'}];
		$scope.ctlidproject.isCallServer = false;
	    $scope.ctlidproject.isDisabled    = false;
	    // New.
	    $scope.ctlidproject.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidproject.querySearch = function(query) {
	    	var results = query ? $scope.ctlidproject.items.filter( $scope.ctlidproject.createFilterFor(query) ) : $scope.ctlidproject.items;
	    	return results;
	    }
	    // Text change.
	    $scope.ctlidproject.searchTextChange = function(text) {
	      
	    }
	    // Item change.
	    $scope.ctlidproject.selectedItemChange = function(item) {
	    	$scope.activity.idproject = item.id;
	    }
	    // Filter.
	    $scope.ctlidproject.createFilterFor = function(query) {
	    	var lowercaseQuery = angular.lowercase(query);

	    	return function filterFn(item) {
	    		return (angular.lowercase(item.projectname).indexOf(lowercaseQuery) >= 0);
	    	};
	    }
	    	
	    // requestors
		$scope.requestors = [];
		// Convert id to requestors.
		$scope.getResourceName = function(id) {
			var length = $scope.requestors.length;
			for(var i = 0; i < length; i++) {
				if($scope.requestors[i].id === id) {
					return $scope.requestors[i].requestor;
				}
			}
			return '';
		}
		
		// //////////////////////////////////////
		// Auto complete: ctlidcontact
		// //////////////////////////////////////
		$scope.ctlidcontact = {};
		$scope.ctlidcontact.items = []; // [{value: 'a', display: 'a'},
												// {value: 'aa', display: 'aa'},
												// {value: 'b', display: 'b'},
												// {value: 'bb', display:
												// 'bb'}];
		$scope.ctlidcontact.isCallServer = false;
	    $scope.ctlidcontact.isDisabled    = false;
	    // New.
	    $scope.ctlidcontact.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidcontact.querySearch = function(query) {
	    	var results = query ? $scope.ctlidcontact.items.filter( $scope.ctlidcontact.createFilterFor(query) ) : $scope.ctlidcontact.items;
	    	return results;
	    }
	    // Text change.
	    $scope.ctlidcontact.searchTextChange = function(text) {
	      
	    }
	    // Item change.
	    $scope.ctlidcontact.selectedItemChange = function(item) {
	    	$scope.activity.idcontact = item.id;
	    }
	    // Filter.
	    $scope.ctlidcontact.createFilterFor = function(query) {
	    	var lowercaseQuery = angular.lowercase(query);

	    	return function filterFn(item) {
	    		return (angular.lowercase(item.requestor).indexOf(lowercaseQuery) >= 0);
	    	};
	    }
	    
	    // parentactivitys
		$scope.parentactivitys = [];
		// Convert id to requestors.
		$scope.getParentName = function(id) {
			var length = $scope.parentactivitys.length;
			for(var i = 0; i < length; i++) {
				if($scope.parentactivitys[i].id === id) {
					return $scope.parentactivitys[i].parentactivity;
				}
			}
			return '';
		}
		
		// //////////////////////////////////////
		// Auto complete: ctlidactivity
		// //////////////////////////////////////
		$scope.ctlidactivity = {};
		$scope.ctlidactivity.items = []; // [{value: 'a', display: 'a'},
												// {value: 'aa', display: 'aa'},
												// {value: 'b', display: 'b'},
												// {value: 'bb', display:
												// 'bb'}];
		$scope.ctlidactivity.isCallServer = false;
	    $scope.ctlidactivity.isDisabled    = false;
	    // New.
	    $scope.ctlidactivity.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidactivity.querySearch = function(query) {
	    	var results = query ? $scope.ctlidactivity.items.filter( $scope.ctlidactivity.createFilterFor(query) ) : $scope.ctlidactivity.items;
	    	return results;
	    }
	    // Text change.
	    $scope.ctlidactivity.searchTextChange = function(text) {
	      
	    }
	    // Item change.
	    $scope.ctlidactivity.selectedItemChange = function(item) {
	    	$scope.activity.idactivity = item.id;
	    }
	    // Filter.
	    $scope.ctlidactivity.createFilterFor = function(query) {
	    	var lowercaseQuery = angular.lowercase(query);

	    	return function filterFn(item) {
	    		return (angular.lowercase(item.parentactivity).indexOf(lowercaseQuery) >= 0);
	    	};
	    }
	    	
	    // responsibles
		$scope.responsibles = [];
		// Convert id to responsibles.
		$scope.getResponsibleName = function(id) {
			var length = $scope.responsibles.length;
			for(var i = 0; i < length; i++) {
				if($scope.responsibles[i].id === id) {
					return $scope.responsibles[i].responsible;
				}
			}
			return '';
		}
		
		// //////////////////////////////////////
		// Auto complete: ctlidactivity
		// //////////////////////////////////////
		$scope.ctlidresource = {};
		$scope.ctlidresource.items = []; // [{value: 'a', display: 'a'},
												// {value: 'aa', display: 'aa'},
												// {value: 'b', display: 'b'},
												// {value: 'bb', display:
												// 'bb'}];
		$scope.ctlidresource.isCallServer = false;
	    $scope.ctlidresource.isDisabled    = false;
	    // New.
	    $scope.ctlidresource.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidresource.querySearch = function(query) {
	    	var results = query ? $scope.ctlidresource.items.filter( $scope.ctlidresource.createFilterFor(query) ) : $scope.ctlidresource.items;
	    	return results;
	    }
	    // Text change.
	    $scope.ctlidresource.searchTextChange = function(text) {
	      
	    }
	    // Item change.
	    $scope.ctlidresource.selectedItemChange = function(item) {
	    	$scope.activity.idresource = item.id;
	    }
	    // Filter.
	    $scope.ctlidresource.createFilterFor = function(query) {
	    	var lowercaseQuery = angular.lowercase(query);

	    	return function filterFn(item) {
	    		return (angular.lowercase(item.responsible).indexOf(lowercaseQuery) >= 0);
	    	};
	    }
	    
	    // statuss
		$scope.statuss = [];
		// Convert id to statuss.
		$scope.getStatusName = function(id) {
			var length = $scope.statuss.length;
			for(var i = 0; i < length; i++) {
				if($scope.statuss[i].id === id) {
					return $scope.statuss[i].status;
				}
			}
			return '';
		}
		
		// //////////////////////////////////////
		// Auto complete: ctlidstatus
		// //////////////////////////////////////
		$scope.ctlidstatus = {};
		$scope.ctlidstatus.items = []; // [{value: 'a', display: 'a'},
												// {value: 'aa', display: 'aa'},
												// {value: 'b', display: 'b'},
												// {value: 'bb', display:
												// 'bb'}];
		$scope.ctlidstatus.isCallServer = false;
	    $scope.ctlidstatus.isDisabled    = false;
	    // New.
	    $scope.ctlidstatus.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidstatus.querySearch = function(query) {
	    	var results = query ? $scope.ctlidstatus.items.filter( $scope.ctlidstatus.createFilterFor(query) ) : $scope.ctlidstatus.items;
	    	return results;
	    }
	    // Text change.
	    $scope.ctlidstatus.searchTextChange = function(text) {
	      
	    }
	    // Item change.
	    $scope.ctlidstatus.selectedItemChange = function(item) {
	    	$scope.activity.idstatus = item.id;
	    }
	    // Filter.
	    $scope.ctlidstatus.createFilterFor = function(query) {
	    	var lowercaseQuery = angular.lowercase(query);

	    	return function filterFn(item) {
	    		return (angular.lowercase(item.status).indexOf(lowercaseQuery) >= 0);
	    	};
	    }
	    
	    
	    ////////////////////////////////////////
		// Call service: 
		////////////////////////////////////////
		$scope.listAllForSelect = function() {
			var listAllSelectDeferred = $q.defer();
			// Type select.
			$scope.ctlplanningmode.items = [];
			$scope.ctlidactivitytype.items = [];
			$scope.ctlidproject.items = [];
			$scope.ctlidcontact.items = [];
			$scope.ctlidactivity.items = [];
			$scope.ctlidresource.items = [];
			$scope.ctlidstatus.items = [];
			
			var listPlanningmodeForSelectDeferred = activityService.listPlanningmodeForSelect();
			var listActivitytypeForSelectDeferred = activityService.listActivitytypeForSelect();
			var listProjectnameForSelectDeferred = activityService.listProjectnameForSelect();
			var listContactnameForSelectDeferred = activityService.listContactnameForSelect();
			var listParentactivityForSelectDeferred = activityService.listParentactivityForSelect();
			var listResponsiblenameForSelectDeferred = activityService.listResponsiblenameForSelect();
			var listStatusForSelectDeferred = activityService.listStatusForSelect();

			$q.all([listPlanningmodeForSelectDeferred, listActivitytypeForSelectDeferred, listProjectnameForSelectDeferred, listContactnameForSelectDeferred, listParentactivityForSelectDeferred, listResponsiblenameForSelectDeferred, listStatusForSelectDeferred]).then(
				// Successes.
				function(responses) {
					$scope.planningmodes = $.map(responses[0].data, function(item) {
						return {id: item.id, planningname: $translate.instant('bimbuildui_activity_' + item.planningname)}
					});
					$scope.activitytypes = responses[1].data;
					$scope.projectnames = responses[2].data;
					$scope.requestors = responses[3].data;
					$scope.parentactivitys = responses[4].data;
					$scope.responsibles = responses[5].data;
					$scope.statuss = responses[6].data;
					
					
					
					$scope.ctlplanningmode.items = $scope.planningmodes;
					$scope.ctlidactivitytype.items = responses[1].data;		
					$scope.ctlidproject.items = responses[2].data;
					$scope.ctlidcontact.items = responses[3].data;
					$scope.ctlidactivity.items = responses[4].data;
					$scope.ctlidresource.items = responses[5].data;
					$scope.ctlidstatus.items = responses[6].data;
					
					// Resolve promise.
					listAllSelectDeferred.resolve(responses);
				},
				// Errors.
				function(responses) {
					$scope.showMessage($translate.instant('bimbuildui_home_error'), 'alert-danger', true);
					// Reject promise.
					listAllSelectDeferred.reject(responses);
				}
				
								
			);
			return listAllSelectDeferred.promise;
		}
		// Call and return a promise.
		listAllSelectPromise = $scope.listAllForSelect();
		
		
		
    	////////////////////////////////////////
	    // Html tag.
		////////////////////////////////////////

		// Remove html tags.
		$scope.removeHtmlTags = function(text) {
			return text ? String(text).replace(/<[^>]+>/gm, '') : '';
		}
		// Raw html.
		$scope.rawHtml = function(text) {
			return $sce.trustAsHtml(text);
		}
		// Raw html with limit.
		$scope.rawHtmlWithLimit = function(text, limit) {
			// Remove html tag.
			//text = removeHtmlTags(text);
            var length = text.length;
            var suffix = ' ...';
            text = length > limit ? text.substr(0, limit - 1) + suffix : text;

            return $sce.trustAsHtml(text);
        }

		
		////////////////////////////////////////
	    // Date picker popup.
		////////////////////////////////////////
        $scope.dateFormat = "dd/MM/yyyy";
        // $scope.today = new Date();//
        $scope.status = {};
        
        
        // Set min and max date.
        var durationNumber = 10;
    	$scope.maxDate = new Date();
    	$scope.minDate = new Date();
    	$scope.maxDate.setFullYear($scope.maxDate.getFullYear() + durationNumber);
    	$scope.minDate.setFullYear($scope.minDate.getFullYear() - durationNumber);
        // Disable weekend selection
    	$scope.disabled = function (date, mode) {
    		return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        }
    	// Set date options.
    	$scope.dateOptions = {
	        formatYear: 'yyyy',
	        startingDay: 1
    	};

    	
	});

});
