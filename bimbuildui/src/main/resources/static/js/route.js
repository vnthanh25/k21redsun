

/**
 * Route.
 **/
// import require shim.
define(['require'], function (require) {
	
	// Require dependences.
	require([
		// test.
		'/bimbuildui/js/route/testRoute.js',
		
		'/bimbuildui/js/route/accessprofileRoute.js',
		'/bimbuildui/js/route/accessrightRoute.js',
		'/bimbuildui/js/route/accessscopeRoute.js',
		'/bimbuildui/js/route/actionRoute.js',
		'/bimbuildui/js/route/activityRoute.js',
		'/bimbuildui/js/route/activitypriceRoute.js',
		'/bimbuildui/js/route/affectationRoute.js',
		'/bimbuildui/js/route/alertRoute.js',
		'/bimbuildui/js/route/approverRoute.js',
		'/bimbuildui/js/route/assignmentRoute.js',
		'/bimbuildui/js/route/attachmentRoute.js',
		'/bimbuildui/js/route/auditRoute.js',
		'/bimbuildui/js/route/auditsummaryRoute.js',
		'/bimbuildui/js/route/baselineRoute.js',
		'/bimbuildui/js/route/billRoute.js',
		'/bimbuildui/js/route/billlineRoute.js',
		'/bimbuildui/js/route/budgetelementRoute.js',
		'/bimbuildui/js/route/calendarRoute.js',
		'/bimbuildui/js/route/calendardefinitionRoute.js',
		'/bimbuildui/js/route/callfortenderRoute.js',
		'/bimbuildui/js/route/catalogRoute.js',
		'/bimbuildui/js/route/categoryRoute.js',
		'/bimbuildui/js/route/checklistRoute.js',
		'/bimbuildui/js/route/checklistableRoute.js',
		'/bimbuildui/js/route/checklistdefinitionRoute.js',
		'/bimbuildui/js/route/checklistdefinitionlineRoute.js',
		'/bimbuildui/js/route/checklistlineRoute.js',
		'/bimbuildui/js/route/clientRoute.js',
		'/bimbuildui/js/route/collapsedRoute.js',
		'/bimbuildui/js/route/columnselectorRoute.js',
		'/bimbuildui/js/route/commandRoute.js',
		'/bimbuildui/js/route/contextRoute.js',
		'/bimbuildui/js/route/contexttypeRoute.js',
		'/bimbuildui/js/route/copyableRoute.js',
		'/bimbuildui/js/route/criticalityRoute.js',
		'/bimbuildui/js/route/cronexecutionRoute.js',
		'/bimbuildui/js/route/decisionRoute.js',
		'/bimbuildui/js/route/delayRoute.js',
		'/bimbuildui/js/route/delayunitRoute.js',
		'/bimbuildui/js/route/deliverableRoute.js',
		'/bimbuildui/js/route/deliverablestatusRoute.js',
		'/bimbuildui/js/route/deliverableweightRoute.js',
		'/bimbuildui/js/route/deliverymodeRoute.js',
		'/bimbuildui/js/route/dependableRoute.js',
		'/bimbuildui/js/route/dependencyRoute.js',
		'/bimbuildui/js/route/documentRoute.js',
		'/bimbuildui/js/route/documentdirectoryRoute.js',
		'/bimbuildui/js/route/documentversionRoute.js',
		'/bimbuildui/js/route/efficiencyRoute.js',
		'/bimbuildui/js/route/eventRoute.js',
		'/bimbuildui/js/route/expenseRoute.js',
		'/bimbuildui/js/route/expensedetailRoute.js',
		'/bimbuildui/js/route/expensedetailtypeRoute.js',
		'/bimbuildui/js/route/extrahiddenfieldRoute.js',
		'/bimbuildui/js/route/extrareadonlyfieldRoute.js',
		'/bimbuildui/js/route/extrarequiredfieldRoute.js',
		'/bimbuildui/js/route/favoriteRoute.js',
		'/bimbuildui/js/route/favoriteparameterRoute.js',
		'/bimbuildui/js/route/feasibilityRoute.js',
		'/bimbuildui/js/route/filterRoute.js',
		'/bimbuildui/js/route/filtercriteriaRoute.js',
		'/bimbuildui/js/route/habilitationRoute.js',
		'/bimbuildui/js/route/habilitationotherRoute.js',
		'/bimbuildui/js/route/habilitationreportRoute.js',
		'/bimbuildui/js/route/healthRoute.js',
		'/bimbuildui/js/route/historyRoute.js',
		'/bimbuildui/js/route/importableRoute.js',
		'/bimbuildui/js/route/importlogRoute.js',
		'/bimbuildui/js/route/indicatorRoute.js',
		'/bimbuildui/js/route/indicatorableRoute.js',
		'/bimbuildui/js/route/indicatorableindicatorRoute.js',
		'/bimbuildui/js/route/indicatordefinitionRoute.js',
		'/bimbuildui/js/route/indicatorvalueRoute.js',
		'/bimbuildui/js/route/issueRoute.js',
		'/bimbuildui/js/route/jobRoute.js',
		'/bimbuildui/js/route/jobdefinitionRoute.js',
		'/bimbuildui/js/route/joblistdefinitionRoute.js',
		'/bimbuildui/js/route/kpidefinitionRoute.js',
		'/bimbuildui/js/route/kpihistoryRoute.js',
		'/bimbuildui/js/route/kpithresholdRoute.js',
		'/bimbuildui/js/route/kpivalueRoute.js',
		'/bimbuildui/js/route/likelihoodRoute.js',
		'/bimbuildui/js/route/linkRoute.js',
		'/bimbuildui/js/route/linkableRoute.js',
		'/bimbuildui/js/route/listRoute.js',
		'/bimbuildui/js/route/mailRoute.js',
		'/bimbuildui/js/route/mailableRoute.js',
		'/bimbuildui/js/route/measureunitRoute.js',
		'/bimbuildui/js/route/meetingRoute.js',
		'/bimbuildui/js/route/menuRoute.js',
		'/bimbuildui/js/route/menucustomRoute.js',
		'/bimbuildui/js/route/menuselectorRoute.js',
		'/bimbuildui/js/route/messageRoute.js',
		'/bimbuildui/js/route/milestoneRoute.js',
		'/bimbuildui/js/route/mutexRoute.js',
		'/bimbuildui/js/route/noteRoute.js',
		'/bimbuildui/js/route/opportunityRoute.js',
		'/bimbuildui/js/route/organizationRoute.js',
		'/bimbuildui/js/route/originRoute.js',
		'/bimbuildui/js/route/originableRoute.js',
		'/bimbuildui/js/route/otherversionRoute.js',
		'/bimbuildui/js/route/overallprogressRoute.js',
		'/bimbuildui/js/route/parameterRoute.js',
		'/bimbuildui/js/route/paymentRoute.js',
		'/bimbuildui/js/route/paymentdelayRoute.js',
		'/bimbuildui/js/route/paymentmodeRoute.js',
		'/bimbuildui/js/route/periodicityRoute.js',
		'/bimbuildui/js/route/periodicmeetingRoute.js',
		'/bimbuildui/js/route/plannedworkRoute.js',
		'/bimbuildui/js/route/plannedworkbaselineRoute.js',
		'/bimbuildui/js/route/planningelementRoute.js',
		'/bimbuildui/js/route/planningelementbaselineRoute.js',
		'/bimbuildui/js/route/planningmodeRoute.js',
		'/bimbuildui/js/route/pluginRoute.js',
		'/bimbuildui/js/route/plugintriggeredeventRoute.js',
		'/bimbuildui/js/route/predefinedtextRoute.js',
		'/bimbuildui/js/route/priorityRoute.js',
		'/bimbuildui/js/route/privacyRoute.js',
		'/bimbuildui/js/route/productRoute.js',
		'/bimbuildui/js/route/productprojectRoute.js',
		'/bimbuildui/js/route/productstructureRoute.js',
		'/bimbuildui/js/route/productversionstructureRoute.js',
		'/bimbuildui/js/route/profileRoute.js',
		'/bimbuildui/js/route/projectRoute.js',
		'/bimbuildui/js/route/projecthistoryRoute.js',
		'/bimbuildui/js/route/providerRoute.js',
		'/bimbuildui/js/route/qualityRoute.js',
		'/bimbuildui/js/route/questionRoute.js',
		'/bimbuildui/js/route/quotationRoute.js',
		'/bimbuildui/js/route/recipientRoute.js',
		'/bimbuildui/js/route/referencableRoute.js',
		'/bimbuildui/js/route/reportRoute.js',
		'/bimbuildui/js/route/reportcategoryRoute.js',
		'/bimbuildui/js/route/reportparameterRoute.js',
		'/bimbuildui/js/route/requirementRoute.js',
		'/bimbuildui/js/route/resolutionRoute.js',
		'/bimbuildui/js/route/resourceRoute.js',
		'/bimbuildui/js/route/resourcecostRoute.js',
		'/bimbuildui/js/route/restricttypeRoute.js',
		'/bimbuildui/js/route/riskRoute.js',
		'/bimbuildui/js/route/risklevelRoute.js',
		'/bimbuildui/js/route/roleRoute.js',
		'/bimbuildui/js/route/runstatusRoute.js',
		'/bimbuildui/js/route/severityRoute.js',
		'/bimbuildui/js/route/slaRoute.js',
		'/bimbuildui/js/route/statusRoute.js',
		'/bimbuildui/js/route/statusmailRoute.js',
		'/bimbuildui/js/route/subscriptionRoute.js',
		'/bimbuildui/js/route/teamRoute.js',
		'/bimbuildui/js/route/tempupdateRoute.js',
		'/bimbuildui/js/route/tenderRoute.js',
		'/bimbuildui/js/route/tenderevaluationRoute.js',
		'/bimbuildui/js/route/tenderevaluationcriteriaRoute.js',
		'/bimbuildui/js/route/tenderstatusRoute.js',
		'/bimbuildui/js/route/termRoute.js',
		'/bimbuildui/js/route/testcaseRoute.js',
		'/bimbuildui/js/route/testcaserunRoute.js',
		'/bimbuildui/js/route/testsessionRoute.js',
		'/bimbuildui/js/route/textableRoute.js',
		'/bimbuildui/js/route/ticketRoute.js',
		'/bimbuildui/js/route/todayRoute.js',
		'/bimbuildui/js/route/todayparameterRoute.js',
		'/bimbuildui/js/route/trendRoute.js',
		'/bimbuildui/js/route/typeRoute.js',
		'/bimbuildui/js/route/urgencyRoute.js',
		'/bimbuildui/js/route/versionRoute.js',
		'/bimbuildui/js/route/versionprojectRoute.js',
		'/bimbuildui/js/route/visibilityscopeRoute.js',
		'/bimbuildui/js/route/workRoute.js',
		'/bimbuildui/js/route/workelementRoute.js',
		'/bimbuildui/js/route/workflowRoute.js',
		'/bimbuildui/js/route/workflowstatusRoute.js',
		'/bimbuildui/js/route/workperiodRoute.js',
		'/bimbuildui/js/route/componentRoute.js',
		'/bimbuildui/js/route/versioncomponentRoute.js'
		], function () {
    });

});
