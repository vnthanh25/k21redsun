/**
 * Route for Activity
 **/

// import require shim.
define(['require'], function (require) {
	app.aStateProvider
	.state(bimbuildui.prefix + 'activity', {
		parent: bimbuildui.prefix + 'main',
		url: bimbuildui.contextPath + '/activity',
		resolve: {
            loadRequire: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                var deferred = $q.defer();
                require([
                	bimbuildui.contextPath + '/js/service/activityService.js', bimbuildui.contextPath + '/js/controller/activityController.js',
                	bimbuildui.contextPath + '/js/service/assignmentService.js', bimbuildui.contextPath + '/js/controller/assignmentController.js',
                	bimbuildui.contextPath + '/js/service/productService.js', bimbuildui.contextPath + '/js/controller/productController.js',
                	bimbuildui.contextPath + '/js/service/versionService.js', bimbuildui.contextPath + '/js/controller/versionController.js',
                	bimbuildui.contextPath + '/js/service/componentService.js', bimbuildui.contextPath + '/js/controller/componentController.js',
                	bimbuildui.contextPath + '/js/service/versioncomponentService.js', bimbuildui.contextPath + '/js/controller/versioncomponentController.js',
                	bimbuildui.contextPath + '/js/service/originService.js', bimbuildui.contextPath + '/js/controller/originController.js',
                	bimbuildui.contextPath + '/js/service/noteService.js', bimbuildui.contextPath + '/js/controller/noteController.js',
                	bimbuildui.contextPath + '/js/service/linkService.js', bimbuildui.contextPath + '/js/controller/linkController.js',
                	], function () {	
                	$ocLazyLoad.inject(bimbuildui.name);
                    deferred.resolve();
                });
                
                return deferred.promise;
            }]
        },
		views: {
			'container': {
				templateUrl: bimbuildui.contextPath + '/view/activity_list.html',
				controller: bimbuildui.prefix + 'activityController'
			}
		}
	});
	
});
