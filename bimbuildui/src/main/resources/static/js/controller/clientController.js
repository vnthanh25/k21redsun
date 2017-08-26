
/**
 * Controller for Client
 **/

define(['require', 'angular'], function (require, angular) {
	app.aController(bimbuildui.prefix + 'clientController', function($q, $sce, $scope, $state, $rootScope, $mdDialog, $http, $log, $window, $location, $filter, $translate, $translatePartialLoader, clientService) {
		if(typeof(bimbuildui.translate.client) === 'undefined' || bimbuildui.translate.client.indexOf($translate.use()) < 0) {
			console.log(bimbuildui.translate.client);
			if(typeof(bimbuildui.translate.client) === 'undefined') {
				bimbuildui.translate.client = '';
			}
			bimbuildui.translate.client += $translate.use() + ';';
			$translatePartialLoader.addPart(bimbuildui.contextPath + '/js/common/message/client');
			$translate.refresh();
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
	    	console.log('bimbuildui_client_title');
		    $scope.title = $translate.instant('bimbuildui_client_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
	    $translate.onReady().then(function() {
	    	console.log('client onReady');
	    	$scope.title = $translate.instant('bimbuildui_client_title');
	    	$translate.refresh();
	    });
		
	    // Search.
	    $scope.search = {};
	    
		// Paging.
		$scope.page = {
			pageSize: 7,
			totalElements: 0,
			currentPage: 0
		}
		
		$scope.client = {};
	    
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
					$scope.client.id = id;
					if($scope.client.id > -1) {
						$scope.getById($scope.client.id);
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
		
		// Show a edit screen.
		$scope.showEdit = function(id) {
			$scope.initForm(id);
			$scope.showDialog();
		}

	    // Show edit view.
	    $scope.showDialog = function () {
	        var htmlUrlTemplate = bimbuildui.contextPath + '/view/client_form.html';
	        bimbuildui.showDialog($scope, $mdDialog, htmlUrlTemplate).then(function(evt) {
	        	console.log('closed');
	        }, function(evt) {
	        	console.log('not closed');
	        });
	    }

	    // Create new.
		$scope.createNew = function() {
			$scope.client = { id: -1 };
		}
		
		// Save.
		$scope.save = function() {
			if($scope.frmClient.$invalid) {
				$scope.frmClient.$dirty = true;
				$scope.frmDirty = true;
				return;
			}
			$scope.showMessage('Saving!', 'alert-success', false);
			var result;
			if($scope.client.id > -1) {
				result = clientService.update($scope.client.id, $scope.client);
			} else {
				result = clientService.create($scope.client);
			}
			result
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.Created || response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.client.id = data.id;
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
				clientService.delete(id)
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
			clientService.getById(id)
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var data = angular.fromJson(response.data);
					$scope.client = data;
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
			clientService.listWithCriteriasByPage($scope.getSearch(), pageNo - 1, $scope.page.pageSize, $scope.getSort())
			// success.
			.then(function(response) {
				if(response.status === bimbuildui.httpStatus.code.OK) {
					var result = angular.fromJson(response.data.content);
					$scope.clients = result;
					$scope.page.totalElements = 0;
					if(result.length > 0) {
						$scope.page.totalElements = response.data.totalElements;
					}
				} else if(response.status === bimbuildui.httpStatus.code.NoContent) {
					$scope.clients = [];
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
		    // clientcode.
		    if(typeof($scope.search.clientcode) !== 'undefined' && $scope.search.clientcode !== ''){
		    	result.push({ key: 'clientcode', operation: 'like', value: $scope.search.clientcode, logic: 'or' });
		    }
		    // idle.
		    if(typeof($scope.search.idle) !== 'undefined' && $scope.search.idle !== ''){
		    	result.push({ key: 'idle', operation: '=', value: $scope.search.idle, logic: 'or' });
		    }
		    // paymentdelay.
		    if(typeof($scope.search.paymentdelay) !== 'undefined' && $scope.search.paymentdelay !== ''){
		    	result.push({ key: 'paymentdelay', operation: '=', value: $scope.search.paymentdelay, logic: 'or' });
		    }
		    // tax.
		    if(typeof($scope.search.tax) !== 'undefined' && $scope.search.tax !== ''){
		    	result.push({ key: 'tax', operation: '=', value: $scope.search.tax, logic: 'or' });
		    }
		    // designation.
		    if(typeof($scope.search.designation) !== 'undefined' && $scope.search.designation !== ''){
		    	result.push({ key: 'designation', operation: 'like', value: $scope.search.designation, logic: 'or' });
		    }
		    // street.
		    if(typeof($scope.search.street) !== 'undefined' && $scope.search.street !== ''){
		    	result.push({ key: 'street', operation: 'like', value: $scope.search.street, logic: 'or' });
		    }
		    // complement.
		    if(typeof($scope.search.complement) !== 'undefined' && $scope.search.complement !== ''){
		    	result.push({ key: 'complement', operation: 'like', value: $scope.search.complement, logic: 'or' });
		    }
		    // zip.
		    if(typeof($scope.search.zip) !== 'undefined' && $scope.search.zip !== ''){
		    	result.push({ key: 'zip', operation: 'like', value: $scope.search.zip, logic: 'or' });
		    }
		    // city.
		    if(typeof($scope.search.city) !== 'undefined' && $scope.search.city !== ''){
		    	result.push({ key: 'city', operation: 'like', value: $scope.search.city, logic: 'or' });
		    }
		    // state.
		    if(typeof($scope.search.state) !== 'undefined' && $scope.search.state !== ''){
		    	result.push({ key: 'state', operation: 'like', value: $scope.search.state, logic: 'or' });
		    }
		    // country.
		    if(typeof($scope.search.country) !== 'undefined' && $scope.search.country !== ''){
		    	result.push({ key: 'country', operation: 'like', value: $scope.search.country, logic: 'or' });
		    }
		    // idclienttype.
		    if(typeof($scope.search.idclienttype) !== 'undefined' && $scope.search.idclienttype !== ''){
		    	result.push({ key: 'idclienttype', operation: '=', value: $scope.search.idclienttype, logic: 'or' });
		    }
		   
		    // paymentdelayendofmonth.
		    if(typeof($scope.search.paymentdelayendofmonth) !== 'undefined' && $scope.search.paymentdelayendofmonth !== ''){
		    	result.push({ key: 'paymentdelayendofmonth', operation: '=', value: $scope.search.paymentdelayendofmonth, logic: 'or' });
		    }
		    // numtax.
		    if(typeof($scope.search.numtax) !== 'undefined' && $scope.search.numtax !== ''){
		    	result.push({ key: 'numtax', operation: 'like', value: $scope.search.numtax, logic: 'or' });
		    }
		    // idpaymentdelay.
		    if(typeof($scope.search.idpaymentdelay) !== 'undefined' && $scope.search.idpaymentdelay !== ''){
		    	result.push({ key: 'idpaymentdelay', operation: '=', value: $scope.search.idpaymentdelay, logic: 'or' });
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
		
		// customer.
		$scope.customers = [];
		// Convert id to accesscode.
		$scope.getCustomerName = function(id) {
			var length = $scope.customers.length;
			for(var i = 0; i < length; i++) {
				if($scope.customers[i].id === id) {
					return $scope.customers[i].typecustomer;
				}
			}
			return '';
		}
		
		// paymentdelay.
		$scope.paymentdelays = [];
		// Convert id to accesscode.
		$scope.getPaymentdelayName = function(id) {
			var length = $scope.paymentdelays.length;
			for(var i = 0; i < length; i++) {
				if($scope.paymentdelays[i].id === id) {
					return $scope.paymentdelays[i].payment;
				}
			}
			return '';
		}

	    
		
		
		
		
		
		
		
		// //////////////////////////////////////
		// Auto complete: ctltype
		// //////////////////////////////////////
		$scope.ctlidclienttype = {};
		$scope.ctlidclienttype.items = []; // [{value: 'a', display: 'a'},
												// {value: 'aa', display: 'aa'},
												// {value: 'b', display: 'b'},
												// {value: 'bb', display:
												// 'bb'}];
		$scope.ctlidclienttype.isCallServer = false;
	    $scope.ctlidclienttype.isDisabled    = false;
	    // New.
	    $scope.ctlidclienttype.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlidclienttype.querySearch = function(query) {
	    	var results = query ? $scope.ctlidclienttype.items.filter( $scope.ctlidclienttype.createFilterFor(query) ) : $scope.ctlidclienttype.items;
	    	return results;
	    }
	    // Text change.
	    $scope.ctlidclienttype.searchTextChange = function(text) {
	      
	    }
	    // Item change.
	    $scope.ctlidclienttype.selectedItemChange = function(item) {
	    	$scope.client.idclienttype = item.id;
	    }
	    // Filter.
	    $scope.ctlidclienttype.createFilterFor = function(query) {
	    	var lowercaseQuery = angular.lowercase(query);

	    	return function filterFn(item) {
	    		return (angular.lowercase(item.typecustomer).indexOf(lowercaseQuery) >= 0);
	    	};
	    }
		
	    // //////////////////////////////////////
		// Auto complete: ctlpaymentdelay
		// //////////////////////////////////////
		$scope.ctlpaymentdelay = {};
		$scope.ctlpaymentdelay.items = []; // [{value: 'a', display: 'a'},
												// {value: 'aa', display: 'aa'},
												// {value: 'b', display: 'b'},
												// {value: 'bb', display:
												// 'bb'}];
		$scope.ctlpaymentdelay.isCallServer = false;
	    $scope.ctlpaymentdelay.isDisabled    = false;
	    // New.
	    $scope.ctlpaymentdelay.newState = function(item) {
	      alert("Sorry! You'll need to create a Constitution for " + item + " first!");
	    }
	    // Search in array.
	    $scope.ctlpaymentdelay.querySearch = function(query) {
	    	var results = query ? $scope.ctlpaymentdelay.items.filter( $scope.ctlpaymentdelay.createFilterFor(query) ) : $scope.ctlpaymentdelay.items;
	    	return results;
	    }
	    // Text change.
	    $scope.ctlpaymentdelay.searchTextChange = function(text) {
	      
	    }
	    // Item change.
	    $scope.ctlpaymentdelay.selectedItemChange = function(item) {
	    	$scope.client.paymentdelay = item.id;
	    }
	    // Filter.
	    $scope.ctlpaymentdelay.createFilterFor = function(query) {
	    	var lowercaseQuery = angular.lowercase(query);

	    	return function filterFn(item) {
	    		return (angular.lowercase(item.payment).indexOf(lowercaseQuery) >= 0);
	    	};
	    }
	    
	    ////////////////////////////////////////
		// Call service: list all for select.
		////////////////////////////////////////
		$scope.listAllForSelect = function() {
			var listAllSelectDeferred = $q.defer();
			// Type select.
			$scope.ctlidclienttype.items = [];
			$scope.ctlpaymentdelay.items = [];
			
			var listCustomerForSelectDeferred = clientService.listCustomerForSelect();
			var listPaymentdelayForSelectDeferred = clientService.listPaymentdelayForSelect();
			$q.all([listCustomerForSelectDeferred, listPaymentdelayForSelectDeferred]).then(
				// Successes.
				function(responses) {
					$scope.customers = responses[0].data;
					$scope.paymentdelays = responses[1].data;
				
					// Type select.
					$scope.ctlidclienttype.items = responses[0].data;
					$scope.ctlpaymentdelay.items = responses[1].data;
				
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
