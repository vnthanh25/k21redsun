/**
 * Route for Component
 **/

// import require shim.
define(['require'], function (require) {
	app.aStateProvider
	.state(bimbuildui.prefix + 'component', {
		parent: bimbuildui.prefix + 'main',
		url: bimbuildui.contextPath + '/component',
		resolve: {
            loadRequire: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                var deferred = $q.defer();
                require([bimbuildui.contextPath + '/js/service/componentService.js', bimbuildui.contextPath + '/js/controller/componentController.js'], function () {
                    $ocLazyLoad.inject(bimbuildui.name);
                    deferred.resolve();
                });
                
                return deferred.promise;
            }]
        },
		views: {
			'container': {
				templateUrl: bimbuildui.contextPath + '/view/component_list.html',
				controller: bimbuildui.prefix + 'componentController'
			}
		}
	});
	
});
