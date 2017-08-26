

/**
 * Service for Accessprofile
 **/

define(['require', 'angular'], function (require, angular) {
app.aService('accessprofileService', function($http, $rootScope) {
	
	// Create.
	this.create = function(accessprofile) {
		var serverUrl = bimbuildui.serverUrl + '/accessprofile/create';
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: accessprofile
				}
		return $http(request);
	}
	
	// Update.
	this.update = function(accessprofileId, accessprofile) {
		var serverUrl = bimbuildui.serverUrl + '/accessprofile/update/' + accessprofileId;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: accessprofile
				}
		return $http(request);
	}
	
	// Delete.
	this.delete = function(accessprofileId) {
		var serverUrl = bimbuildui.serverUrl + '/accessprofile/delete/' + accessprofileId;
		var request = {
				 method: 'DELETE',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Get by Id.
	this.getById = function(accessprofileId) {
		var serverUrl = bimbuildui.serverUrl + '/accessprofile/getById/' + accessprofileId;
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List for page and filter.
	this.listWithCriteriasByPage = function(criterias, pageNo, pageSize, sorts) {
		var serverUrl = bimbuildui.serverUrl + '/accessprofile/listWithCriteriasByPage?' + 'page=' + pageNo + '&size=' + pageSize;
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
<<<<<<< .mine
	
	// List of accessprofile for select.
	this.listAccessprofileForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/accessprofile/listAccessprofileForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List of accessscope for select.
	this.listAccessscopeForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/accessscope/listAccessscopeForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
||||||| .r90
=======
	
	// List of accessprofile for select.
	this.listAccessprofileForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/accessprofile/listAccessprofileForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List of accessprofile join many to one.
	this.listAccessprofileJoinManyToOne = function() {
		var serverUrl = bimbuildui.serverUrl + '/accessprofile/listAccessprofileJoinManyToOne';
		var request = {
				method: 'GET',
				url: serverUrl
		};
		return $http(request);
	}
	
	// List of accessscope for select.
	this.listAccessscopeForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/accessscope/listAccessscopeForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
>>>>>>> .r105

});

});
