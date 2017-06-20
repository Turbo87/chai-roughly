var mocha = require('mocha');
var chai = require('chai');
var type = require('type-detect');

var describe = mocha.describe;
var it = mocha.it;
var expect = chai.expect;

var roughly = require('./index');
chai.use(roughly);

describe('expect(...).to.roughly.deep.equal(...)', function () {
  it('passes for empty objects', function () {
    expect({}).to.roughly.deep.equal({});
  });

  it('passes for roughly similar values', function () {
    expect({ value: 12345 }).to.roughly.deep.equal({ value: 12345.01 });
  });

  it('fails for different values', function () {
    expect(function () {
      expect({ value: 12345 }).to.roughly.deep.equal({ value: 12345.1 });
    }).to.throw();
  });

  it('passes for multiple roughly similar values', function () {
    expect({
      value: 12345,
      other: 0.1234,
    }).to.roughly.deep.equal({
      other: 0.123400001,
      value: 12345.00001,
    });
  });

  it('passes for roughly similar nested values', function () {
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

describe('expect(...).to.roughly(tolerance).deep.equal(...)', function () {
  it('passes for empty objects', function () {
    expect({}).to.roughly(1e-4).deep.equal({});
  });

  it('passes for roughly similar values', function () {
    expect({ value: 12345 }).to.roughly(1e-4).deep.equal({ value: 12345.1 });
  });

  it('fails for different values', function () {
    expect(function () {
      expect({ value: 12345 }).to.roughly(1e-4).deep.equal({ value: 12341 });
    }).to.throw();
  });

  it('passes for multiple roughly similar values', function () {
    expect({
      value: 12345,
      other: 0.1234,
    }).to.roughly(1e-4).deep.equal({
      other: 0.12341,
      value: 12345.1,
    });
  });

  it('passes for roughly similar nested values', function () {
    expect({
      sub: {
        value: 42,
      },
    }).to.roughly(1e-4).deep.equal({
      sub: {
        value: 41.999,
      },
    });
  });
});

describe('expect(...).to.roughly(comparator).deep.equal(...)', function () {

  var comparator = roughly.createAbsoluteComparator(0.01);

  it('passes for empty objects', function () {
    expect({}).to.roughly(comparator).deep.equal({});
  });

  it('passes for roughly similar values', function () {
    expect({ value: 12345 }).to.roughly(comparator).deep.equal({ value: 12345.009 });
  });

  it('fails for different values', function () {
    expect(function () {
      expect({ value: 12345 }).to.roughly(comparator).deep.equal({ value: 12345.02 });
    }).to.throw();
  });

  it('passes for multiple roughly similar values', function () {
    expect({
      value: 12345,
      other: 12.129,
    }).to.roughly(comparator).deep.equal({
      other: 12.123,
      value: 12345.002,
    });
  });

  it('passes for roughly similar nested values', function () {
    expect({
      sub: {
        value: 42,
      },
    }).to.roughly(comparator).deep.equal({
      sub: {
        value: 41.995,
      },
    });
  });
});
