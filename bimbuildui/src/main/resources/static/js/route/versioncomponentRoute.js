/**
 * Route for Version
 **/

// import require shim.
define(['require'], function (require) {
	app.aStateProvider
	.state(bimbuildui.prefix + 'versioncomponent', {
		parent: bimbuildui.prefix + 'main',
		url: bimbuildui.contextPath + '/versioncomponent',
		resolve: {
            loadRequire: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                var deferred = $q.defer();
                require([bimbuildui.contextPath + '/js/service/versioncomponentService.js', bimbuildui.contextPath + '/js/controller/versioncomponentController.js'], function () {
                    $ocLazyLoad.inject(bimbuildui.name);
                    deferred.resolve();
                });
                
                return deferred.promise;
            }]
        },
		views: {
			'container': {
				templateUrl: bimbuildui.contextPath + '/view/versioncomponent_list.html',
				controller: bimbuildui.prefix + 'versioncomponentController'
			}
		}
	});
	
});
