var mocha = require('mocha');
var chai = require('chai');

var describe = mocha.describe;
var it = mocha.it;
var expect = chai.expect;

chai.use(require('./index'));

describe('expect(...).to.masOMenos.deep.equal(...)', function() {
  it('passes for empty objects', function() {
    expect({}).to.masOMenos.deep.equal({});
  });

  it('passes for mas o menos similar values', function() {
    expect({ value: 12345 }).to.masOMenos.deep.equal({ value: 12345.01 });
  });

  it('fails for different values', function() {
    expect(function() {
      expect({ value: 12345 }).to.masOMenos.deep.equal({ value: 12345.1 });
    }).to.throw();
  });

  it('passes for multiple mas o menos similar values', function() {
    expect({
      value: 12345,
      other: 0.1234,
    }).to.masOMenos.deep.equal({
      other: 0.123400001,
      value: 12345.00001,
    });
  });

  it('passes for mas o menos similar nested values', function() {
    expect({
      sub: {
        value: 42,
      },
    }).to.masOMenos.deep.equal({
      sub: {
        value: 41.99999,
      },
    });
  });
});
