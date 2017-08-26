
/**
 * Controller for Accessprofile
 **/

define(['require', 'angular'], function (require, angular) {
	app.aController(bimbuildui.prefix + 'accessprofileController', function($q, $sce, $scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, accessprofileService) {
		if(typeof(bimbuildui.translate.accessprofile) === 'undefined' || bimbuildui.translate.accessprofile.indexOf($translate.use()) < 0) {
			console.log(bimbuildui.translate.accessprofile);
			if(typeof(bimbuildui.translate.accessprofile) === 'undefined') {
				bimbuildui.translate.accessprofile = '';
			}
			bimbuildui.translate.accessprofile += $translate.use() + ';';
			$translatePartialLoader.addPart(bimbuildui.contextPath + '/js/common/message/accessprofile');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
	    	console.log('bimbuildui_accessprofile_title');
		    $scope.title = $translate.instant('bimbuildui_accessprofile_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	console.log('accessprofile onReady');
	    	$scope.title = $translate.instant('bimbuildui_accessprofile_title');
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
		
		$scope.accessprofile = {};
	    
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
					$scope.accessprofile.id = id;
					if($scope.accessprofile.id > -1) {
						$scope.getById($scope.accessprofile.id);
					}
					$scope.frmDirty = false;
					
				},
				// Error.
				function(response) {
					
				}
			);
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
		
	    // Show form view.
	    $scope.showDialog = function () {
	        var htmlUrlTemplate = bimbuildui.contextPath + '/view/accessprofile_form.html';
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
			$scope.accessprofile = { id: -1 };
		}
		
		// Save.
		$scope.save = function() {
			if($scope.frmAccessprofile.$invalid) {
				$scope.frmAccessprofile.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage('Saving!', 'alert-success', false);
			var result;
			if($scope.accessprofile.id > -1) {
				result = accessprofileService.update($scope.accessprofile.id, $scope.accessprofile);
			} else {
				result = accessprofileService.create($scope.accessprofile);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.Created || response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.accessprofile.id = data.id;
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
				accessprofileService.delete(id)
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
			accessprofileService.getById(id)
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.accessprofile = data;
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
			accessprofileService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort())
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var result = angular.fromJson(response.data.content);
					$scope.accessprofiles = result;
					$scope.page.totalElements = 0;
					if(result.length > 0) {
						$scope.page.totalElements = response.data.totalElements;
					}
				} else if(response.status === bimbuildui.httpStatus.code.NoContent) {
					$scope.accessprofiles = [];
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
		    // name.
		    if(typeof($scope.search.name) !== 'undefined' && $scope.search.name !== ''){
		    	result.push({ key: 'name', operation: 'like', value: $scope.search.name, logic: 'or' });
		    }
		    // description.
		    if(typeof($scope.search.description) !== 'undefined' && $scope.search.description !== ''){
		    	result.push({ key: 'description', operation: 'like', value: $scope.search.description, logic: 'or' });
		    }
		    // idaccessscoperead.
		    if(typeof($scope.search.idaccessscoperead) !== 'undefined' && $scope.search.idaccessscoperead !== ''){
		    	result.push({ key: 'idaccessscoperead', operation: '=', value: $scope.search.idaccessscoperead, logic: 'or' });
		    }
		    // idaccessscopecreate.
		    if(typeof($scope.search.idaccessscopecreate) !== 'undefined' && $scope.search.idaccessscopecreate !== ''){
		    	result.push({ key: 'idaccessscopecreate', operation: '=', value: $scope.search.idaccessscopecreate, logic: 'or' });
		    }
		    // idaccessscopeupdate.
		    if(typeof($scope.search.idaccessscopeupdate) !== 'undefined' && $scope.search.idaccessscopeupdate !== ''){
		    	result.push({ key: 'idaccessscopeupdate', operation: '=', value: $scope.search.idaccessscopeupdate, logic: 'or' });
		    }
		    // idaccessscopedelete.
		    if(typeof($scope.search.idaccessscopedelete) !== 'undefined' && $scope.search.idaccessscopedelete !== ''){
		    	result.push({ key: 'idaccessscopedelete', operation: '=', value: $scope.search.idaccessscopedelete, logic: 'or' });
		    }
		    // sortorder.
		    if(typeof($scope.search.sortorder) !== 'undefined' && $scope.search.sortorder !== ''){
		    	result.push({ key: 'sortorder', operation: '=', value: $scope.search.sortorder, logic: 'or' });
		    }
		    // idle.
		    if(typeof($scope.search.idle) !== 'undefined' && $scope.search.idle !== ''){
		    	result.push({ key: 'idle', operation: '=', value: $scope.search.idle, logic: 'or' });
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
<<<<<<< .mine
		
		
		////////////////////////////////////////
		// Auto complete: idaccessscoperead.
		////////////////////////////////////////
		$scope.ctlidaccessscoperead = {};
		$scope.ctlidaccessscoperead.items = [{value: 'a', display: 'a'}, {value: 'aa', display: 'aa'}, {value: 'b', display: 'b'}, {value: 'bb', display: 'bb'}];
		$scope.ctlidaccessscoperead.isCallServer = false;
	    $scope.ctlidaccessscoperead.isDisabled    = false;
	    // New.
	    $scope.ctlidaccessscoperead.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidaccessscoperead.querySearch = function(query) {
	      var results = query ? $scope.ctlidaccessscoperead.items.filter( $scope.ctlidaccessscoperead.createFilterFor(query) ) : $scope.ctlidaccessscoperead.items,
	          deferred;
	      
	      if ($scope.ctlidaccessscoperead.isCallServer) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
	    }
	    // Filter.
	    $scope.ctlidaccessscoperead.createFilterFor = function(query) {
			 var lowercaseQuery = angular.lowercase(query);
			
			 return function filterFn(item) {
				 return (angular.lowercase(item.display).indexOf(lowercaseQuery) >= 0);
			 };
	    }
	    // Text change.
	    $scope.ctlidaccessscoperead.searchTextChange = function(text) {
	    	$log.info('Text changed to ' + text);
	    }
	    // Item change.
	    $scope.ctlidaccessscoperead.selectedItemChange = function(item) {
	    	if(frmAccessprofile.idaccessscoperead === undefined) {
	    		return;
	    	}
	    	$scope.accessprofile.idaccessscoperead = undefined;
	    	frmAccessprofile.idaccessscoperead.$invalid = true;
	    	if(item) {
	    		$scope.accessprofile.idaccessscoperead = item.id;
	    		frmAccessprofile.idaccessscoperead.$invalid = false;
	    	}
	    }
	    // Watch $scope.accessprofile.idaccessscoperead
	    $scope.$watch('accessprofile.idaccessscoperead', function(newVal, oldVal, scope) {
	    	$scope.ctlidaccessscoperead.selectedItem = undefined;
	    	if(newVal === undefined) {
	    		return;
	    	}
	    	var length = $scope.ctlidaccessscoperead.items.length;
	    	for(var i = 0; i < length; i++) {
	    		var item = $scope.ctlidaccessscoperead.items[i];
	    		if(item.id === newVal) {
	    			$scope.ctlidaccessscoperead.selectedItem = item;
	    			break;
	    		}
	    	}
	    });

		////////////////////////////////////////
		// Auto complete: idaccessscopecreate
		////////////////////////////////////////
		$scope.ctlidaccessscopecreate = {};
		$scope.ctlidaccessscopecreate.items = [{value: 'a', display: 'a'}, {value: 'aa', display: 'aa'}, {value: 'b', display: 'b'}, {value: 'bb', display: 'bb'}];
		$scope.ctlidaccessscopecreate.isCallServer = false;
	    $scope.ctlidaccessscopecreate.isDisabled    = false;
	    // New.
	    $scope.ctlidaccessscopecreate.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidaccessscopecreate.querySearch = function(query) {
	      var results = query ? $scope.ctlidaccessscopecreate.items.filter( $scope.ctlidaccessscopecreate.createFilterFor(query) ) : $scope.ctlidaccessscopecreate.items,
	          deferred;
	      
	      if ($scope.ctlidaccessscopecreate.isCallServer) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
	    }
	    // Filter.
	    $scope.ctlidaccessscopecreate.createFilterFor = function(query) {
			 var lowercaseQuery = angular.lowercase(query);
			
			 return function filterFn(item) {
				 return (angular.lowercase(item.display).indexOf(lowercaseQuery) >= 0);
			 };
	    }
	    // Text change.
	    $scope.ctlidaccessscopecreate.searchTextChange = function(text) {
	    	$log.info('Text changed to ' + text);
	    }
	    // Item change.
	    $scope.ctlidaccessscopecreate.selectedItemChange = function(item) {
	    	if(frmAccessprofile.idaccessscopecreate === undefined) {
	    		return;
	    	}
	    	$scope.accessprofile.idaccessscopecreate = undefined;
	    	frmAccessprofile.idaccessscopecreate.$invalid = true;
	    	if(item) {
	    		$scope.accessprofile.idaccessscopecreate = item.id;
	    		frmAccessprofile.idaccessscopecreate.$invalid = false;
	    	}
	    }
	    // Watch $scope.accessprofile.idaccessscopecreate
	    $scope.$watch('accessprofile.idaccessscopecreate', function(newVal, oldVal, scope) {
	    	$scope.ctlidaccessscopecreate.selectedItem = undefined;
	    	if(newVal === undefined) {
	    		return;
	    	}
	    	var length = $scope.ctlidaccessscopecreate.items.length;
	    	for(var i = 0; i < length; i++) {
	    		var item = $scope.ctlidaccessscopecreate.items[i];
	    		if(item.id === newVal) {
	    			$scope.ctlidaccessscopecreate.selectedItem = item;
	    			break;
	    		}
	    	}
	    });
		
		////////////////////////////////////////
		// Auto complete: idaccessscopeupdate.
		////////////////////////////////////////
		$scope.ctlidaccessscopeupdate = {};
		$scope.ctlidaccessscopeupdate.items = [{value: 'a', display: 'a'}, {value: 'aa', display: 'aa'}, {value: 'b', display: 'b'}, {value: 'bb', display: 'bb'}];
		$scope.ctlidaccessscopeupdate.isCallServer = false;
	    $scope.ctlidaccessscopeupdate.isDisabled    = false;
	    // New.
	    $scope.ctlidaccessscopeupdate.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidaccessscopeupdate.querySearch = function(query) {
	      var results = query ? $scope.ctlidaccessscopeupdate.items.filter( $scope.ctlidaccessscopeupdate.createFilterFor(query) ) : $scope.ctlidaccessscopeupdate.items,
	          deferred;
	      
	      if ($scope.ctlidaccessscopeupdate.isCallServer) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
	    }
	    // Filter.
	    $scope.ctlidaccessscopeupdate.createFilterFor = function(query) {
			 var lowercaseQuery = angular.lowercase(query);
			
			 return function filterFn(item) {
				 return (angular.lowercase(item.display).indexOf(lowercaseQuery) >= 0);
			 };
	    }
	    // Text change.
	    $scope.ctlidaccessscopeupdate.searchTextChange = function(text) {
	    	$log.info('Text changed to ' + text);
	    }
	    // Item change.
	    $scope.ctlidaccessscopeupdate.selectedItemChange = function(item) {
	    	if(frmAccessprofile.idaccessscopeupdate === undefined) {
	    		return;
	    	}
	    	$scope.accessprofile.idaccessscopeupdate = undefined;
	    	frmAccessprofile.idaccessscopeupdate.$invalid = true;
	    	if(item) {
	    		$scope.accessprofile.idaccessscopeupdate = item.id;
	    		frmAccessprofile.idaccessscopeupdate.$invalid = false;
	    	}
	    }
	    // Watch $scope.accessprofile.idaccessscopeupdate
	    $scope.$watch('accessprofile.idaccessscopeupdate', function(newVal, oldVal, scope) {
	    	$scope.ctlidaccessscopeupdate.selectedItem = undefined;
	    	if(newVal === undefined) {
	    		return;
	    	}
	    	var length = $scope.ctlidaccessscopeupdate.items.length;
	    	for(var i = 0; i < length; i++) {
	    		var item = $scope.ctlidaccessscopeupdate.items[i];
	    		if(item.id === newVal) {
	    			$scope.ctlidaccessscopeupdate.selectedItem = item;
	    			break;
	    		}
	    	}
	    });

		////////////////////////////////////////
		// Auto complete: idaccessscopedelete.
		////////////////////////////////////////
		$scope.ctlidaccessscopedelete = {};
		$scope.ctlidaccessscopedelete.items = [{value: 'a', display: 'a'}, {value: 'aa', display: 'aa'}, {value: 'b', display: 'b'}, {value: 'bb', display: 'bb'}];
		$scope.ctlidaccessscopedelete.isCallServer = false;
	    $scope.ctlidaccessscopedelete.isDisabled    = false;
	    // New.
	    $scope.ctlidaccessscopedelete.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidaccessscopedelete.querySearch = function(query) {
	      var results = query ? $scope.ctlidaccessscopedelete.items.filter( $scope.ctlidaccessscopedelete.createFilterFor(query) ) : $scope.ctlidaccessscopedelete.items,
	          deferred;
	      
	      if ($scope.ctlidaccessscopedelete.isCallServer) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
	    }
	    // Filter.
	    $scope.ctlidaccessscopedelete.createFilterFor = function(query) {
			 var lowercaseQuery = angular.lowercase(query);
			
			 return function filterFn(item) {
				 return (angular.lowercase(item.display).indexOf(lowercaseQuery) >= 0);
			 };
	    }
	    // Text change.
	    $scope.ctlidaccessscopedelete.searchTextChange = function(text) {
	    	$log.info('Text changed to ' + text);
	    }
	    // Item change.
	    $scope.ctlidaccessscopedelete.selectedItemChange = function(item) {
	    	if(frmAccessprofile.idaccessscopedelete === undefined) {
	    		return;
	    	}
	    	$scope.accessprofile.idaccessscopedelete = undefined;
	    	frmAccessprofile.idaccessscopedelete.$invalid = true;
	    	if(item) {
	    		$scope.accessprofile.idaccessscopedelete = item.id;
	    		frmAccessprofile.idaccessscopedelete.$invalid = false;
	    	}
	    }
	    // Watch $scope.accessprofile.idaccessscopedelete
	    $scope.$watch('accessprofile.idaccessscopedelete', function(newVal, oldVal, scope) {
	    	$scope.ctlidaccessscopedelete.selectedItem = undefined;
	    	if(newVal === undefined) {
	    		return;
	    	}
	    	var length = $scope.ctlidaccessscopedelete.items.length;
	    	for(var i = 0; i < length; i++) {
	    		var item = $scope.ctlidaccessscopedelete.items[i];
	    		if(item.id === newVal) {
	    			$scope.ctlidaccessscopedelete.selectedItem = item;
	    			break;
	    		}
	    	}
	    });
	    
	    
	    // accessscopes.
		$scope.accessscopes = [];
		// Convert id to accesscode.
		$scope.getAccessscopeName = function(id) {
			var length = $scope.accessscopes.length;
			for(var i = 0; i < length; i++) {
				if($scope.accessscopes[i].id === id) {
					return $scope.accessscopes[i].accesscode;
				}
			}
			return '';
		}

	    
		////////////////////////////////////////
		// Call service: list all for select.
		////////////////////////////////////////
		$scope.listAllForSelect = function() {
			var listAllSelectDeferred = $q.defer();
			// Accessscope select.
			$scope.ctlidaccessscoperead.items = [];
			$scope.ctlidaccessscopecreate.items = [];
			$scope.ctlidaccessscopeupdate.items = [];
			$scope.ctlidaccessscopedelete.items = [];
			var listAccessscopeForSelectDeferred = accessprofileService.listAccessscopeForSelect();
			// Accessprofile select.
			var listAccessprofileForSelectDeferred = accessprofileService.listAccessprofileForSelect();
			$q.all([listAccessscopeForSelectDeferred, listAccessprofileForSelectDeferred]).then(
				// Successes.
				function(responses) {
					$scope.accessscopes = responses[0].data;
					// Accessscope select.
					$scope.ctlidaccessscoperead.items = responses[0].data;
					$scope.ctlidaccessscopecreate.items = responses[0].data;
					$scope.ctlidaccessscopeupdate.items = responses[0].data;
					$scope.ctlidaccessscopedelete.items = responses[0].data;
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
	    // Angular ckeditor.
		////////////////////////////////////////
    	CKEDITOR.config.extraPlugins = 'base64image';
    	$scope.options = {
    	    allowedContent: true,
    	    entities: false,
    	    htmlEncodeOutput: false,
    	    enterMode: CKEDITOR.ENTER_BR,
    		shiftEnterMode: CKEDITOR.ENTER_P,
    		autoParagraph: false
    	};
||||||| .r90
=======
		
		
		////////////////////////////////////////
		// Auto complete: idaccessscoperead.
		////////////////////////////////////////
		$scope.ctlidaccessscoperead = {};
		$scope.ctlidaccessscoperead.items = [{value: 'a', display: 'a'}, {value: 'aa', display: 'aa'}, {value: 'b', display: 'b'}, {value: 'bb', display: 'bb'}];
		$scope.ctlidaccessscoperead.isCallServer = false;
	    $scope.ctlidaccessscoperead.isDisabled    = false;
	    // New.
	    $scope.ctlidaccessscoperead.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidaccessscoperead.querySearch = function(query) {
	      var results = query ? $scope.ctlidaccessscoperead.items.filter( $scope.ctlidaccessscoperead.createFilterFor(query) ) : $scope.ctlidaccessscoperead.items,
	          deferred;
	      
	      if ($scope.ctlidaccessscoperead.isCallServer) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
	    }
	    // Filter.
	    $scope.ctlidaccessscoperead.createFilterFor = function(query) {
			 var lowercaseQuery = angular.lowercase(query);
			
			 return function filterFn(item) {
				 return (angular.lowercase(item.display).indexOf(lowercaseQuery) >= 0);
			 };
	    }
	    // Text change.
	    $scope.ctlidaccessscoperead.searchTextChange = function(text) {
	    	$log.info('Text changed to ' + text);
	    }
	    // Item change.
	    $scope.ctlidaccessscoperead.selectedItemChange = function(item) {
	    	if(frmAccessprofile.idaccessscoperead === undefined) {
	    		return;
	    	}
	    	$scope.accessprofile.idaccessscoperead = undefined;
	    	frmAccessprofile.idaccessscoperead.$invalid = true;
	    	if(item) {
	    		$scope.accessprofile.idaccessscoperead = item.id;
	    		frmAccessprofile.idaccessscoperead.$invalid = false;
	    	}
	    }
	    // Watch $scope.accessprofile.idaccessscoperead
	    $scope.$watch('accessprofile.idaccessscoperead', function(newVal, oldVal, scope) {
	    	$scope.ctlidaccessscoperead.selectedItem = undefined;
	    	if(newVal === undefined) {
	    		return;
	    	}
	    	var length = $scope.ctlidaccessscoperead.items.length;
	    	for(var i = 0; i < length; i++) {
	    		var item = $scope.ctlidaccessscoperead.items[i];
	    		if(item.id === newVal) {
	    			$scope.ctlidaccessscoperead.selectedItem = item;
	    			break;
	    		}
	    	}
	    });

		////////////////////////////////////////
		// Auto complete: idaccessscopecreate
		////////////////////////////////////////
		$scope.ctlidaccessscopecreate = {};
		$scope.ctlidaccessscopecreate.items = [{value: 'a', display: 'a'}, {value: 'aa', display: 'aa'}, {value: 'b', display: 'b'}, {value: 'bb', display: 'bb'}];
		$scope.ctlidaccessscopecreate.isCallServer = false;
	    $scope.ctlidaccessscopecreate.isDisabled    = false;
	    // New.
	    $scope.ctlidaccessscopecreate.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidaccessscopecreate.querySearch = function(query) {
	      var results = query ? $scope.ctlidaccessscopecreate.items.filter( $scope.ctlidaccessscopecreate.createFilterFor(query) ) : $scope.ctlidaccessscopecreate.items,
	          deferred;
	      
	      if ($scope.ctlidaccessscopecreate.isCallServer) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
	    }
	    // Filter.
	    $scope.ctlidaccessscopecreate.createFilterFor = function(query) {
			 var lowercaseQuery = angular.lowercase(query);
			
			 return function filterFn(item) {
				 return (angular.lowercase(item.display).indexOf(lowercaseQuery) >= 0);
			 };
	    }
	    // Text change.
	    $scope.ctlidaccessscopecreate.searchTextChange = function(text) {
	    	$log.info('Text changed to ' + text);
	    }
	    // Item change.
	    $scope.ctlidaccessscopecreate.selectedItemChange = function(item) {
	    	if(frmAccessprofile.idaccessscopecreate === undefined) {
	    		return;
	    	}
	    	$scope.accessprofile.idaccessscopecreate = undefined;
	    	frmAccessprofile.idaccessscopecreate.$invalid = true;
	    	if(item) {
	    		$scope.accessprofile.idaccessscopecreate = item.id;
	    		frmAccessprofile.idaccessscopecreate.$invalid = false;
	    	}
	    }
	    // Watch $scope.accessprofile.idaccessscopecreate
	    $scope.$watch('accessprofile.idaccessscopecreate', function(newVal, oldVal, scope) {
	    	$scope.ctlidaccessscopecreate.selectedItem = undefined;
	    	if(newVal === undefined) {
	    		return;
	    	}
	    	var length = $scope.ctlidaccessscopecreate.items.length;
	    	for(var i = 0; i < length; i++) {
	    		var item = $scope.ctlidaccessscopecreate.items[i];
	    		if(item.id === newVal) {
	    			$scope.ctlidaccessscopecreate.selectedItem = item;
	    			break;
	    		}
	    	}
	    });
		
		////////////////////////////////////////
		// Auto complete: idaccessscopeupdate.
		////////////////////////////////////////
		$scope.ctlidaccessscopeupdate = {};
		$scope.ctlidaccessscopeupdate.items = [{value: 'a', display: 'a'}, {value: 'aa', display: 'aa'}, {value: 'b', display: 'b'}, {value: 'bb', display: 'bb'}];
		$scope.ctlidaccessscopeupdate.isCallServer = false;
	    $scope.ctlidaccessscopeupdate.isDisabled    = false;
	    // New.
	    $scope.ctlidaccessscopeupdate.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidaccessscopeupdate.querySearch = function(query) {
	      var results = query ? $scope.ctlidaccessscopeupdate.items.filter( $scope.ctlidaccessscopeupdate.createFilterFor(query) ) : $scope.ctlidaccessscopeupdate.items,
	          deferred;
	      
	      if ($scope.ctlidaccessscopeupdate.isCallServer) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
	    }
	    // Filter.
	    $scope.ctlidaccessscopeupdate.createFilterFor = function(query) {
			 var lowercaseQuery = angular.lowercase(query);
			
			 return function filterFn(item) {
				 return (angular.lowercase(item.display).indexOf(lowercaseQuery) >= 0);
			 };
	    }
	    // Text change.
	    $scope.ctlidaccessscopeupdate.searchTextChange = function(text) {
	    	$log.info('Text changed to ' + text);
	    }
	    // Item change.
	    $scope.ctlidaccessscopeupdate.selectedItemChange = function(item) {
	    	if(frmAccessprofile.idaccessscopeupdate === undefined) {
	    		return;
	    	}
	    	$scope.accessprofile.idaccessscopeupdate = undefined;
	    	frmAccessprofile.idaccessscopeupdate.$invalid = true;
	    	if(item) {
	    		$scope.accessprofile.idaccessscopeupdate = item.id;
	    		frmAccessprofile.idaccessscopeupdate.$invalid = false;
	    	}
	    }
	    // Watch $scope.accessprofile.idaccessscopeupdate
	    $scope.$watch('accessprofile.idaccessscopeupdate', function(newVal, oldVal, scope) {
	    	$scope.ctlidaccessscopeupdate.selectedItem = undefined;
	    	if(newVal === undefined) {
	    		return;
	    	}
	    	var length = $scope.ctlidaccessscopeupdate.items.length;
	    	for(var i = 0; i < length; i++) {
	    		var item = $scope.ctlidaccessscopeupdate.items[i];
	    		if(item.id === newVal) {
	    			$scope.ctlidaccessscopeupdate.selectedItem = item;
	    			break;
	    		}
	    	}
	    });

		////////////////////////////////////////
		// Auto complete: idaccessscopedelete.
		////////////////////////////////////////
		$scope.ctlidaccessscopedelete = {};
		$scope.ctlidaccessscopedelete.items = [{value: 'a', display: 'a'}, {value: 'aa', display: 'aa'}, {value: 'b', display: 'b'}, {value: 'bb', display: 'bb'}];
		$scope.ctlidaccessscopedelete.isCallServer = false;
	    $scope.ctlidaccessscopedelete.isDisabled    = false;
	    // New.
	    $scope.ctlidaccessscopedelete.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidaccessscopedelete.querySearch = function(query) {
	      var results = query ? $scope.ctlidaccessscopedelete.items.filter( $scope.ctlidaccessscopedelete.createFilterFor(query) ) : $scope.ctlidaccessscopedelete.items,
	          deferred;
	      
	      if ($scope.ctlidaccessscopedelete.isCallServer) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
	    }
	    // Filter.
	    $scope.ctlidaccessscopedelete.createFilterFor = function(query) {
			 var lowercaseQuery = angular.lowercase(query);
			
			 return function filterFn(item) {
				 return (angular.lowercase(item.display).indexOf(lowercaseQuery) >= 0);
			 };
	    }
	    // Text change.
	    $scope.ctlidaccessscopedelete.searchTextChange = function(text) {
	    	$log.info('Text changed to ' + text);
	    }
	    // Item change.
	    $scope.ctlidaccessscopedelete.selectedItemChange = function(item) {
	    	if(frmAccessprofile.idaccessscopedelete === undefined) {
	    		return;
	    	}
	    	$scope.accessprofile.idaccessscopedelete = undefined;
	    	frmAccessprofile.idaccessscopedelete.$invalid = true;
	    	if(item) {
	    		$scope.accessprofile.idaccessscopedelete = item.id;
	    		frmAccessprofile.idaccessscopedelete.$invalid = false;
	    	}
	    }
	    // Watch $scope.accessprofile.idaccessscopedelete
	    $scope.$watch('accessprofile.idaccessscopedelete', function(newVal, oldVal, scope) {
	    	$scope.ctlidaccessscopedelete.selectedItem = undefined;
	    	if(newVal === undefined) {
	    		return;
	    	}
	    	var length = $scope.ctlidaccessscopedelete.items.length;
	    	for(var i = 0; i < length; i++) {
	    		var item = $scope.ctlidaccessscopedelete.items[i];
	    		if(item.id === newVal) {
	    			$scope.ctlidaccessscopedelete.selectedItem = item;
	    			break;
	    		}
	    	}
	    });
	    
	    
	    // accessscopes.
		$scope.accessscopes = [];
		// Convert id to accesscode.
		$scope.getAccessscopeName = function(id) {
			var length = $scope.accessscopes.length;
			for(var i = 0; i < length; i++) {
				if($scope.accessscopes[i].id === id) {
					return $scope.accessscopes[i].accesscode;
				}
			}
			return '';
		}

	    
		////////////////////////////////////////
		// Call service: list all for select.
		////////////////////////////////////////
		$scope.listAllForSelect = function() {
			var listAllSelectDeferred = $q.defer();
			// Accessscope select.
			$scope.ctlidaccessscoperead.items = [];
			$scope.ctlidaccessscopecreate.items = [];
			$scope.ctlidaccessscopeupdate.items = [];
			$scope.ctlidaccessscopedelete.items = [];
			var listAccessscopeForSelectDeferred = accessprofileService.listAccessscopeForSelect();
			// Accessprofile select.
			var listAccessprofileForSelectDeferred = accessprofileService.listAccessprofileForSelect();
			var listAccessprofileJoinManyToOneDeferred = accessprofileService.listAccessprofileJoinManyToOne();
			
			$q.all([listAccessscopeForSelectDeferred, listAccessprofileForSelectDeferred, listAccessprofileJoinManyToOneDeferred]).then(
				// Successes.
				function(responses) {
					$scope.accessscopes = responses[0].data;
					// Accessscope select.
					$scope.ctlidaccessscoperead.items = responses[0].data;
					$scope.ctlidaccessscopecreate.items = responses[0].data;
					$scope.ctlidaccessscopeupdate.items = responses[0].data;
					$scope.ctlidaccessscopedelete.items = responses[0].data;
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
	    // Angular ckeditor.
		////////////////////////////////////////
    	CKEDITOR.config.extraPlugins = 'base64image';
    	$scope.options = {
    	    allowedContent: true,
    	    entities: false,
    	    htmlEncodeOutput: false,
    	    enterMode: CKEDITOR.ENTER_BR,
    		shiftEnterMode: CKEDITOR.ENTER_P,
    		autoParagraph: false
    	};
>>>>>>> .r105
	
    	
	});

});
