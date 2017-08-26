

/**
 * Service for Client
 **/

define(['require', 'angular'], function (require, angular) {
app.aService('clientService', function($http, $rootScope) {
	
	// Create.
	this.create = function(client) {
		var serverUrl = bimbuildui.serverUrl + '/client/create';
		var request = {
				 method: 'POST',
				 url: serverUrl,
				 data: client
				}
		return $http(request);
	}
	
	// Update.
	this.update = function(clientId, client) {
		var serverUrl = bimbuildui.serverUrl + '/client/update/' + clientId;
		var request = {
				 method: 'PUT',
				 url: serverUrl,
				 data: client
				}
		return $http(request);
	}
	
	// Delete.
	this.delete = function(clientId) {
		var serverUrl = bimbuildui.serverUrl + '/client/delete/' + clientId;
		var request = {
				 method: 'DELETE',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// Get by Id.
	this.getById = function(clientId) {
		var serverUrl = bimbuildui.serverUrl + '/client/getById/' + clientId;
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List for page and filter.
	this.listWithCriteriasByPage = function(criterias, pageNo, pageSize, sorts) {
		var serverUrl = bimbuildui.serverUrl + '/client/listWithCriteriasByPage?' + 'page=' + pageNo + '&size=' + pageSize;
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
	
	
	
	// List all for id and code.
	this.listPaymentdelayForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/paymentdelay/listPaymentdelayForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}
	
	// List all for id and code.
	this.listCustomerForSelect = function() {
		var serverUrl = bimbuildui.serverUrl + '/type/listCustomerForSelect';
		var request = {
				 method: 'GET',
				 url: serverUrl
				}
		return $http(request);
	}

});

});
