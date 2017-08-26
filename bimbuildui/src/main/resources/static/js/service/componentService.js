

/**
 * Service for component
 **/

define(['require', 'angular'], function (require, angular) {
app.aService('componentService', function($http, $rootScope) {
	
	// Create.
	this.create = function(component) {
		var serverUrl = bimbuildui.serverUrl + '/component/create';
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: component
				}
		return $http(request);
	}
	
	// Update.
	this.update = function(componentId, component) {
		var serverUrl = bimbuildui.serverUrl + '/component/update/' + componentId;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: component
				}
		return $http(request);
	}
	
	// Delete.
	this.delete = function(componentId) {
		var serverUrl = bimbuildui.serverUrl + '/component/delete/' + componentId;
		var request = {
				 method: 'DELETE',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Get by Id.
	this.getById = function(componentId) {
		var serverUrl = bimbuildui.serverUrl + '/component/getById/' + componentId;
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List for page and filter.
	this.listWithCriteriasByPage = function(criterias, pageNo, pageSize, sorts) {
		var serverUrl = bimbuildui.serverUrl + '/component/listWithCriteriasByPage?' + 'page=' + pageNo + '&size=' + pageSize;
		if(typeof(sorts) !== 'undefined' && sorts.length > 0) {
			angular.forEach(sorts, function(sort) {
				serverUrl += '&' + sort;
			});
		}
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: criterias
				}
		return $http(request);
	}

});

});
