var deepEql = require('deep-eql');

var DEFAULT_TOLERANCE = 1e-6;

module.exports = function (chai, utils) {
  var Assertion = chai.Assertion;

  function assertEql(_super) {
    return function(obj, msg) {
      var tolerance = utils.flag(this, 'tolerance');
      if (tolerance) {
        if (msg) flag(this, 'message', msg);
        this.assert(
          deepEql(obj, utils.flag(this, 'object'), { tolerance: tolerance })
          , 'expected #{this} to mas o menos deeply equal #{exp}'
          , 'expected #{this} to not mas o menos deeply equal #{exp}'
          , obj
          , this._obj
          , true
        );

      } else {
        _super.apply(this, arguments);
      }
    };
  }

  Assertion.overwriteMethod('eql', assertEql);
  Assertion.overwriteMethod('eqls', assertEql);

  function explicitMasOMenos(tolerance) {
    utils.flag(this, 'tolerance', tolerance);
  }

  function defaultMasOMenos() {
    utils.flag(this, 'tolerance', DEFAULT_TOLERANCE);
  }

  Assertion.addChainableMethod('masOMenos', explicitMasOMenos, defaultMasOMenos);
};
