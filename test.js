var mocha = require('mocha');
var chai = require('chai');

var describe = mocha.describe;
var it = mocha.it;
var expect = chai.expect;

chai.use(require('./index'));

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
  
  it('should modify array equality checks to allow default tolerance for numbers', function () {
      var exp = ['pastor',  3 ];
      var good = ['pastor',  2.9999999 ];
      var bad = [ 'pastor',  3.1 ];

      expect(good).to.roughly.deep.equal(exp);
      expect(bad).to.not.roughly.deep.equal(exp);
    })

    it('should modify deep-deep equality checks on arrays with objects objects with default tolerance', function () {
      var exp = [{ taco: 'pastor', quantity: 3 },
                 { taco: 'pastor', quantity: [{a:2,b:1}], ref:[3,4] }];
      var good = [{ taco: 'pastor', quantity: 2.9999999 },
                  { taco: 'pastor', quantity: [{ a:1.9999999,b:0.9999999 }, ref:[2.9999999, 3.0000001]];
      var bad1 = [{ taco: 'pastor', quantity: 3 },
                  { taco: 'pastor', quantity: [{a:2.1,b:1}] }, ref[3,4]];
      var bad2 = [{ taco: 'pastor', quantity: 3 },
                  { taco: 'pastor', quantity: [{a:2,b:1}] }, ref[3.1,4]];

      expect(good).to.roughly.deep.equal(exp);
      expect(bad1).to.not.roughly.deep.equal(exp);
      expect(bad2).to.not.roughly.deep.equal(exp);
  })

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
