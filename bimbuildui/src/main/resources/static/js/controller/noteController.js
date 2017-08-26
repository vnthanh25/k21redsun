
/**
 * Controller for Note
 **/

define(['require', 'angular'], function (require, angular) {
	app.aController(bimbuildui.prefix + 'noteController', function($scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, noteService) {
		if(typeof(bimbuildui.translate.note) === 'undefined' || bimbuildui.translate.note.indexOf($translate.use()) < 0) {
			console.log(bimbuildui.translate.note);
			if(typeof(bimbuildui.translate.note) === 'undefined') {
				bimbuildui.translate.note = '';
			}
			bimbuildui.translate.note += $translate.use() + ';';
			$translatePartialLoader.addPart(bimbuildui.contextPath + '/js/common/message/note');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
	    	console.log('bimbuildui_note_title');
		    $scope.title = $translate.instant('bimbuildui_note_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	console.log('note onReady');
	    	$scope.title = $translate.instant('bimbuildui_note_title');
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
		
		$scope.note = {};
	    
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
			$scope.note.id = id;
			if($scope.note.id > -1) {
				$scope.getById($scope.note.id);
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
	        var htmlUrlTemplate = bimbuildui.contextPath + '/view/note_form.html';
	        bimbuildui.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Create new.
		$scope.createNew = function() {
			$scope.note = { id: -1 };
		}
		
		// Close dialog.
	    $scope.closeDialog = function () {
            $mdDialog.hide();
        }
	    
		// Save.
		$scope.save = function() {
			if($scope.frmNote.$invalid) {
				$scope.frmNote.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage('Saving!', 'alert-success', false);
			var result;
			if($scope.note.id > -1) {
				result = noteService.update($scope.note.id, $scope.note);
			} else {
				result = noteService.create($scope.note);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.Created || response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.note.id = data.id;
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
				noteService.delete(id)
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
			noteService.getById(id)
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.note = data;
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
			noteService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort())
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var result = angular.fromJson(response.data.content);
					$scope.notes = result;
					$scope.page.totalElements = 0;
					if(result.length > 0) {
						$scope.page.totalElements = response.data.totalElements;
					}
				} else if(response.status === bimbuildui.httpStatus.code.NoContent) {
					$scope.notes = [];
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
		    // reftype.
		    if(typeof($scope.search.reftype) !== 'undefined' && $scope.search.reftype !== ''){
		    	result.push({ key: 'reftype', operation: 'like', value: $scope.search.reftype, logic: 'or' });
		    }
		    // refid.
		    if(typeof($scope.search.refid) !== 'undefined' && $scope.search.refid !== ''){
		    	result.push({ key: 'refid', operation: '=', value: $scope.search.refid, logic: 'or' });
		    }
		    // iduser.
		    if(typeof($scope.search.iduser) !== 'undefined' && $scope.search.iduser !== ''){
		    	result.push({ key: 'iduser', operation: '=', value: $scope.search.iduser, logic: 'or' });
		    }
		    // creationdate.
		    if(typeof($scope.search.creationdate) !== 'undefined' && $scope.search.creationdate !== ''){
		    	result.push({ key: 'creationdate', operation: '=', value: $scope.search.creationdate, logic: 'or' });
		    }
		    // updatedate.
		    if(typeof($scope.search.updatedate) !== 'undefined' && $scope.search.updatedate !== ''){
		    	result.push({ key: 'updatedate', operation: '=', value: $scope.search.updatedate, logic: 'or' });
		    }
		    // note.
		    if(typeof($scope.search.note) !== 'undefined' && $scope.search.note !== ''){
		    	result.push({ key: 'note', operation: 'like', value: $scope.search.note, logic: 'or' });
		    }
		    // idprivacy.
		    if(typeof($scope.search.idprivacy) !== 'undefined' && $scope.search.idprivacy !== ''){
		    	result.push({ key: 'idprivacy', operation: '=', value: $scope.search.idprivacy, logic: 'or' });
		    }
		    // idteam.
		    if(typeof($scope.search.idteam) !== 'undefined' && $scope.search.idteam !== ''){
		    	result.push({ key: 'idteam', operation: '=', value: $scope.search.idteam, logic: 'or' });
		    }
		    // fromemail.
		    if(typeof($scope.search.fromemail) !== 'undefined' && $scope.search.fromemail !== ''){
		    	result.push({ key: 'fromemail', operation: '=', value: $scope.search.fromemail, logic: 'or' });
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
