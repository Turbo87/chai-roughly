
chai-roughly
==============================================================================

[![Build Status](https://travis-ci.org/Turbo87/chai-roughly.svg?branch=master)](https://travis-ci.org/Turbo87/chai-roughly)
[![Build status](https://ci.appveyor.com/api/projects/status/github/Turbo87/chai-roughly?svg=true)](https://ci.appveyor.com/project/Turbo87/chai-roughly/branch/master)
[![npm](https://img.shields.io/npm/v/chai-roughly.svg)](https://www.npmjs.com/package/chai-roughly)

deep equals assertions with tolerance for chai


Installation
------------------------------------------------------------------------------

```
npm install --save-dev chai-roughly
```

Usage
------------------------------------------------------------------------------

After importing `chai` add the following code to use `chai-roughly` assertions:

```js
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-roughly'));
```

Now you can use the `expect(...).to.roughly.deep.equal(...)` chain for deep
equals assertions with tolerance for numbers. 

```js
it('works', function() {
  expect({ value: 42 }).to.roughly.deep.equal({ value: 41.9999999 });
});
```

The default tolerance is `1e-6` and can be overwritten.  For example:

```js
it('works', function() {
  expect({ value: 42 }).to.roughly(0.001).deep.equal({ value: 41.9999999 });
});
```

The tolerance is a relative tolerance.

In addition a comparator function can be specified corresponding to the comparator which 
`deep-eql` accepts.  

```js

var comparator = roughly.createAbsoluteComparator(0.01);

it('works', function() {
  expect({ value: 42 }).to.roughly(comparator).deep.equal({ value: 41.9999999 });
});
```

There are several helper functions to create comparator functions which are exported in the roughly module:

```js
function createAbsoluteComparator(absoluteTolerance)
function createRelativeComparator(relativeTolerance)
function createAbsoluteOrRelativeComparator(absoluteTolerance, relativeTolerance)
```

License
------------------------------------------------------------------------------
chai-roughly is licensed under the [MIT License](LICENSE).
