
/**
 * Controller for Link
 **/

define(['require', 'angular'], function (require, angular) {
	app.aController(bimbuildui.prefix + 'linkController', function($q, $sce, $scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, linkService) {
		if(typeof(bimbuildui.translate.link) === 'undefined' || bimbuildui.translate.link.indexOf($translate.use()) < 0) {
			console.log(bimbuildui.translate.link);
			if(typeof(bimbuildui.translate.link) === 'undefined') {
				bimbuildui.translate.link = '';
			}
			bimbuildui.translate.link += $translate.use() + ';';
			$translatePartialLoader.addPart(bimbuildui.contextPath + '/js/common/message/link');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
	    	console.log('bimbuildui_link_title');
		    $scope.title = $translate.instant('bimbuildui_link_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	console.log('link onReady');
	    	$scope.title = $translate.instant('bimbuildui_link_title');
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
		
		$scope.link = {};
	    
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
					$scope.link.id = id;
					if($scope.link.id > -1) {
						$scope.getById($scope.link.id);
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

	    // Show edit view.
	    $scope.showDialog = function () {
	        var htmlUrlTemplate = bimbuildui.contextPath + '/view/link_form.html';
	        bimbuildui.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Create new.
		$scope.createNew = function() {
			$scope.link = { id: -1 };
		}
		
		// Close dialog.
	    $scope.closeDialog = function () {
            $mdDialog.hide();
        }
		
		// Save.
		$scope.save = function() {
			if($scope.frmLink.$invalid) {
				$scope.frmLink.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage('Saving!', 'alert-success', false);
			var result;
			if($scope.link.id > -1) {
				result = linkService.update($scope.link.id, $scope.link);
			} else {
				result = linkService.create($scope.link);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.Created || response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.link.id = data.id;
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
				linkService.delete(id)
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
			linkService.getById(id)
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.link = data;
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
			linkService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort())
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var result = angular.fromJson(response.data.content);
					$scope.links = result;
					$scope.page.totalElements = 0;
					if(result.length > 0) {
						$scope.page.totalElements = response.data.totalElements;
					}
				} else if(response.status === bimbuildui.httpStatus.code.NoContent) {
					$scope.links = [];
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
		    // ref1type.
		    if(typeof($scope.search.ref1type) !== 'undefined' && $scope.search.ref1type !== ''){
		    	result.push({ key: 'ref1type', operation: 'like', value: $scope.search.ref1type, logic: 'or' });
		    }
		    // ref1id.
		    if(typeof($scope.search.ref1id) !== 'undefined' && $scope.search.ref1id !== ''){
		    	result.push({ key: 'ref1id', operation: '=', value: $scope.search.ref1id, logic: 'or' });
		    }
		    // ref2type.
		    if(typeof($scope.search.ref2type) !== 'undefined' && $scope.search.ref2type !== ''){
		    	result.push({ key: 'ref2type', operation: 'like', value: $scope.search.ref2type, logic: 'or' });
		    }
		    // ref2id.
		    if(typeof($scope.search.ref2id) !== 'undefined' && $scope.search.ref2id !== ''){
		    	result.push({ key: 'ref2id', operation: '=', value: $scope.search.ref2id, logic: 'or' });
		    }
		    // comment.
		    if(typeof($scope.search.comment) !== 'undefined' && $scope.search.comment !== ''){
		    	result.push({ key: 'comment', operation: 'like', value: $scope.search.comment, logic: 'or' });
		    }
		    // creationdate.
		    if(typeof($scope.search.creationdate) !== 'undefined' && $scope.search.creationdate !== ''){
		    	result.push({ key: 'creationdate', operation: '=', value: $scope.search.creationdate, logic: 'or' });
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
		
		// linknames
		$scope.linknames = [];
		// Convert id to linknames.
		$scope.getLinknameName = function(id) {
			var length = $scope.linknames.length;
			for(var i = 0; i < length; i++) {
				if($scope.linknames[i].id === id) {
					return $scope.linknames[i].linkname;
				}
			}
			return '';
		}
		
		// //////////////////////////////////////
		// Auto complete: ctlref2type
		// //////////////////////////////////////
		$scope.ctlref2type = {};
		$scope.ctlref2type.items = []; // [{value: 'a', display: 'a'},
												// {value: 'aa', display: 'aa'},
												// {value: 'b', display: 'b'},
												// {value: 'bb', display:
												// 'bb'}];
		$scope.ctlref2type.isCallServer = false;
	    $scope.ctlref2type.isDisabled    = false;
	    // New.
	    $scope.ctlref2type.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlref2type.querySearch = function(query) {
	    	var results = query ? $scope.ctlref2type.items.filter( $scope.ctlref2type.createFilterFor(query) ) : $scope.ctlref2type.items;
	    	return results;
	    }
	    // Text change.
	    $scope.ctlref2type.searchTextChange = function(text) {
	      
	    }
	    // Item change.
	    $scope.ctlref2type.selectedItemChange = function(item) {
	    	$scope.link.ref2type = item.id;
	    }
	    // Filter.
	    $scope.ctlref2type.createFilterFor = function(query) {
	    	var lowercaseQuery = angular.lowercase(query);

	    	return function filterFn(item) {
	    		return (angular.lowercase(item.linkname).indexOf(lowercaseQuery) >= 0);
	    	};
	    }
	    
	    ////////////////////////////////////////
		// Call service: 
		////////////////////////////////////////
		$scope.listAllForSelect = function() {
			var listAllSelectDeferred = $q.defer();
			// Type select.
			$scope.ctlref2type.items = [];
			
			
			var listLinknameForSelectDeferred = linkService.listLinknameForSelect();
			

			$q.all([listLinknameForSelectDeferred]).then(
				// Successes.
				function(responses) {
					
					$scope.linknames = responses[0].data;
					
					
					
					
					$scope.ctlref2type.items = responses[0].data;
					
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

	
	});

});
