

/**
 * Service for Versioncomponent
 **/

define(['require', 'angular'], function (require, angular) {
app.aService('versioncomponentService', function($http, $rootScope) {
	
	// Create.
	this.create = function(version) {
		var serverUrl = bimbuildui.serverUrl + '/versioncomponent/create';
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: version
				}
		return $http(request);
	}
	
	// Update.
	this.update = function(versionId, version) {
		var serverUrl = bimbuildui.serverUrl + '/versioncomponent/update/' + versionId;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: version
				}
		return $http(request);
	}
	
	// Delete.
	this.delete = function(versionId) {
		var serverUrl = bimbuildui.serverUrl + '/versioncomponent/delete/' + versionId;
		var request = {
				 method: 'DELETE',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Get by Id.
	this.getById = function(versionId) {
		var serverUrl = bimbuildui.serverUrl + '/versioncomponent/getById/' + versionId;
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List for page and filter.
	this.listWithCriteriasByPage = function(criterias, pageNo, pageSize, sorts) {
		var serverUrl = bimbuildui.serverUrl + '/versioncomponent/listWithCriteriasByPage?' + 'page=' + pageNo + '&size=' + pageSize;
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
