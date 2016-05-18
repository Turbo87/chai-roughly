var mocha = require('mocha');
var chai = require('chai');

var describe = mocha.describe;
var it = mocha.it;
var expect = chai.expect;

chai.use(require('.'));

describe('expect(...).to.roughly.deep.equal(...)', function() {
  it('passes for empty objects', function() {
    expect({}).to.roughly.deep.equal({});
  });

  it('passes for roughly similar values', function() {
    expect({ value: 12345 }).to.roughly.deep.equal({ value: 12345.01 });
  });

  it('fails for different values', function() {
    expect(function() {
      expect({ value: 12345 }).to.roughly.deep.equal({ value: 12345.1 });
    }).to.throw();
  });

  it('passes for multiple roughly similar values', function() {
    expect({
      value: 12345,
      other: 0.1234,
    }).to.roughly.deep.equal({
      other: 0.123400001,
      value: 12345.00001,
    });
  });

  it('passes for roughly similar nested values', function() {
    expect({
      sub: {
        value: 42,
      },
    }).to.roughly.deep.equal({
      sub: {
        value: 41.99999,
      },
    });
  });
});
