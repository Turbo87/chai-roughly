
chai-mas-o-menos
==============================================================================

[![Build Status](https://travis-ci.org/roryqueue/chai-mas-o-menos.svg?branch=master)](https://travis-ci.org/roryqueue/chai-mas-o-menos)
[![Build status](https://ci.appveyor.com/api/projects/status/github/roryqueue/chai-mas-o-menos?svg=true)](https://ci.appveyor.com/project/roryqueue/chai-mas-o-menos/branch/master)
[![npm](https://img.shields.io/npm/v/chai-mas-o-menos.svg)](https://www.npmjs.com/package/chai-mas-o-menos)

deep equals assertions with tolerance for chai


Installation
------------------------------------------------------------------------------

```
npm install --save-dev chai-mas-o-menos
```

Usage
------------------------------------------------------------------------------

After importing `chai` add the following code to use `chai-mas-o-menos` assertions:

```js
var chai = require('chai');
var expect = chai.expect;

chai.use(require('chai-mas-o-menos'));
```

Now you can use the `expect(...).to.masOMenos.deep.equal(...)` chain for deep
equals assertions with tolerance for numbers. The default tolerance is `1e-6`
and can be overwritten by using e.g.
`expect(...).to.masOMenos(0.001).deep.equal(...)`.

```js
it('works', function() {
  expect({ value: 42 }).to.masOMenos.deep.equal({ value: 41.9999999 });
});
```


License
------------------------------------------------------------------------------
chai-mas-o-menos is licensed under the [MIT License](LICENSE).
