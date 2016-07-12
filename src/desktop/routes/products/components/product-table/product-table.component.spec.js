module.exports = ngModule => {
  describe('component:productTable', () => {
    let scope;
    let $componentController;

    function createController(bindings = {}) {
      const $ctrl = $componentController('productTable', { $scope: scope }, bindings);
      if ($ctrl.$onInit) $ctrl.$onInit();
      return $ctrl;
    }

    beforeEach(() => {
      window.module('ui.router');
      window.module(ngModule.name);
    });

    beforeEach(inject(($rootScope, _$componentController_) => {
      scope = $rootScope.$new();
      $componentController = _$componentController_;
    }));

    it('should instantiate', () => {
      const $ctrl = createController({});
      expect($ctrl).to.not.equal(undefined);
    });
  });
};
