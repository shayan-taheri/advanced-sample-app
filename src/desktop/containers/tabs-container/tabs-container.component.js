module.exports = ngModule => {
  require('./tabs-container.component.css');

  ngModule.component('tabsContainer', {
    template: require('./tabs-container.component.html'),
    controller: tabsContainerCtrl,
    bindings: {
      // Inputs should use < and @ bindings.
      // Outputs should use & bindings.
    },
    transclude: true
  });

  function tabsContainerCtrl($state,
                             $scope,
                             productsFactory,
                             globalFiltersFactory,
                             SAMPLE_APP,
                             $mdSidenav) {
    const ctrl = this;

    ctrl.$onInit = $onInit;
    ctrl.goToPage = goToPage;
    ctrl.toggleSidenav = toggleSidenav;
    ctrl.onCategorySelect = onCategorySelect;
    ctrl.selectedTab = 'products';
    ctrl.categoryFilters = [];
    ctrl.categoryFilter = '';

    productsFactory.getProductCategories().then(categories => {
      // add our default category to the list of categories
      categories.unshift(SAMPLE_APP.DEFAULT_CATEGORY);
      ctrl.categoryFilters = categories;
      ctrl.categoryFilter = ctrl.categoryFilters[0];
    });

    function $onInit() {
      // Called on each controller after all the controllers have been constructed and had their bindings initialized
      // Use this for initialization code.
      // set a watch on the current state name so we can set the tabs properly
      $scope.state = $state;
      $scope.$watch('state.current.name', newValue => {
        ctrl.selectedTab = newValue;
      });
      ctrl.selectedTab = $state.current.name;
    }

    function toggleSidenav() {
      $mdSidenav('filters').toggle();
    }

    function goToPage(page) {
      $state.go(page);
    }

    function onCategorySelect() {
      // tabs-container will not listen for filter changes because
      // it is in charge of global filters. We don't want to promote shared state
      // and confusing ownership.
      // The only reason globalFiltersFactory exists is to pass information
      // to children around ui-router, which does not allow for one-way databinding
      // to views that consist of components
      globalFiltersFactory.setFilter(ctrl.categoryFilter);
      toggleSidenav();
    }
  }

  // inject dependencies here
  tabsContainerCtrl.$inject = ['$state', '$scope', 'productsFactory',
      'globalFiltersFactory', 'SAMPLE_APP', '$mdSidenav'];

  if (ON_TEST) {
    require('./tabs-container.component.spec.js')(ngModule);
  }
};
