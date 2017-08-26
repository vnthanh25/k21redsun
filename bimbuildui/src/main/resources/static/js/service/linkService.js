

/**
 * Service for Link
 **/

define(['require', 'angular'], function (require, angular) {
app.aService('linkService', function($http, $rootScope) {
	
	// Create.
	this.create = function(link) {
		var serverUrl = bimbuildui.serverUrl + '/link/create';
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: link
				}
		return $http(request);
	}
	
	// Update.
	this.update = function(linkId, link) {
		var serverUrl = bimbuildui.serverUrl + '/link/update/' + linkId;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: link
				}
		return $http(request);
	}
	
	// Delete.
	this.delete = function(linkId) {
		var serverUrl = bimbuildui.serverUrl + '/link/delete/' + linkId;
		var request = {
				 method: 'DELETE',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Get by Id.
	this.getById = function(linkId) {
		var serverUrl = bimbuildui.serverUrl + '/link/getById/' + linkId;
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List for page and filter.
	this.listWithCriteriasByPage = function(criterias, pageNo, pageSize, sorts) {
		var serverUrl = bimbuildui.serverUrl + '/link/listWithCriteriasByPage?' + 'page=' + pageNo + '&size=' + pageSize;
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
	
	// List all for id and listStatusForSelect.
	this.listLinknameForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/linkable/listLinknameForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}

});

});
