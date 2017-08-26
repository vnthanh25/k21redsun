

/**
 * Service for Activity
 **/

define(['require', 'angular'], function (require, angular) {
app.aService('activityService', function($http, $rootScope) {
	
	// Create.
	this.create = function(activity) {
		var serverUrl = bimbuildui.serverUrl + '/activity/create';
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: activity
				}
		return $http(request);
	}
	
	// Update.
	this.update = function(activityId, activity) {
		var serverUrl = bimbuildui.serverUrl + '/activity/update/' + activityId;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: activity
				}
		return $http(request);
	}
	
	// Delete.
	this.delete = function(activityId) {
		var serverUrl = bimbuildui.serverUrl + '/activity/delete/' + activityId;
		var request = {
				 method: 'DELETE',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Get by Id.
	this.getById = function(activityId) {
		var serverUrl = bimbuildui.serverUrl + '/activity/getById/' + activityId;
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List for page and filter.
	this.listWithCriteriasByPage = function(criterias, pageNo, pageSize, sorts) {
		var serverUrl = bimbuildui.serverUrl + '/activity/listWithCriteriasByPage?' + 'page=' + pageNo + '&size=' + pageSize;
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
	
	// List all for id and listPlanningmodeForSelect.
	this.listPlanningmodeForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/planningmode/listPlanningmodeForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List all for id and listActivitytypeForSelect.
	this.listActivitytypeForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/type/listActivitytypeForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List all for id and listProjectnameForSelect.
	this.listProjectnameForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/project/listProjectnameForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List all for id and listProjectnameForSelect.
	this.listContactnameForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/resource/listContactnameForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List all for id and listParentactivityForSelect.
	this.listParentactivityForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/activity/listParentactivityForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List all for id and listResponsiblenameForSelect.
	this.listResponsiblenameForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/resource/listResponsiblenameForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List all for id and listStatusForSelect.
	this.listStatusForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/status/listStatusForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}

});

});
