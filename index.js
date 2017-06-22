var deepEql = require('deep-eql');
var type = require('type-detect');

var DEFAULT_TOLERANCE = 1e-6;

module.exports = function(chai, utils) {
  var Assertion = chai.Assertion;

  function assertEql(_super) {
    return function(obj, msg) {
      var comparator = utils.flag(this, 'comparator');
      if (comparator) {
        if (msg) flag(this, 'message', msg);
        this.assert(
          deepEql(obj, utils.flag(this, 'object'), { comparator: comparator })
          , 'expected #{this} to roughly deeply equal #{exp}'
          , 'expected #{this} to not roughly deeply equal #{exp}'
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

  function checkComparator(comparatorOrTolerance) {
    if ('number' === type(comparatorOrTolerance)) {
      return createRelativeComparator(comparatorOrTolerance);
    } else if ('function' === type(comparatorOrTolerance)) {
      return comparatorOrTolerance;
    } else {
      throw new Error('Roughly must be given a relative tolerance number or comparator function');
    }
  }

  function explicitRoughly(comparatorOrTolerance) {
    utils.flag(this, 'comparator', checkComparator(comparatorOrTolerance));
  }

  function defaultRoughly() {
    utils.flag(this, 'comparator', createRelativeComparator(DEFAULT_TOLERANCE));
  }

  Assertion.addChainableMethod('roughly', explicitRoughly, defaultRoughly);
};

// copied from deep-eql
function simpleEqual(a, b) {
  // Equal references (except for Numbers) can be returned early
  if (a === b) {
    // Handle +-0 cases
    return a !== 0 || 1 / a === 1 / b;
  }

  // handle NaN cases
  return (
    a !== a && // eslint-disable-line no-self-compare
    b !== b // eslint-disable-line no-self-compare
  );
}

// numberCompare is a function which takes two numbers as input
// and returns a boolean indicating whether they match or not.
// createComparator returns a function which takes two values (of any type)
// and returns null if either is not a number, otherwise a boolean
// indicating whether they match or not.

function createComparator(numberCompare) {

  return function(a, b) {
    if (simpleEqual(a, b)) {
      return true;
    } else if ('number' !== type(a) || 'number' !== type(b)) {
      return null;
    }

    return numberCompare(a, b);
  }
}

function absoluteTest(a, b, absoluteTolerance) {
    return Math.abs(a - b) < absoluteTolerance;
}

function relativeTest(a, b, relativeTolerance) {
    var base = Math.max(Math.abs(a), Math.abs(b));
    var acceptableDiff = relativeTolerance * base;
    return Math.abs(b - a) <= Math.abs(acceptableDiff);
}

function createAbsoluteComparator(absoluteTolerance) {
  return createComparator(function(a, b) {
    return absoluteTest(a, b, absoluteTolerance);
  });
}

function createRelativeComparator(relativeTolerance) {
  return createComparator(function(a, b) {
    return relativeTest(a, b, relativeTolerance);
  });
}

function createAbsoluteOrRelativeComparator(absoluteTolerance, relativeTolerance) {
  return createComparator(function(a, b) {
    return absoluteTest(a, b, absoluteTolerance) || relativeTest(a, b, relativeTolerance);
  });

}

module.exports.createComparator = createComparator;
module.exports.createAbsoluteComparator = createAbsoluteComparator;
module.exports.createRelativeComparator = createRelativeComparator;
module.exports.createAbsoluteOrRelativeComparator = createAbsoluteOrRelativeComparator;
