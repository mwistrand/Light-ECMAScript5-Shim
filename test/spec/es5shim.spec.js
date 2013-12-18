describe('ECMAScript 5 Shim', function() {
  'use strict';

  describe('Object.create', function() {
    var proto = {
        method: function() {}
      },
      instance;

    beforeEach(function() {
      instance = Object.create(proto);
    });

    it('creates a new instance from a prototype', function() {
      expect(proto.isPrototypeOf(instance)).toBe(true);
    });

    it('creates instances, not copies', function() {
      var test = false;

      // Inherited methods and properties should exist
      // on the prototype, not on the instance.
      for (var key in instance) {

        if (instance.hasOwnProperty(key)) {
          test = true;
        }
      }

      expect(test).toBe(false);
    });
  });

  describe('Array.prototype.forEach', function() {
    var arr = [1,2,3,4,5];

    it('iterates over an array and executes a callback for each item',
        function() {

      var count = 0;

      arr.forEach(function(item) {
        count += item;
      });

      expect(count).toEqual(15);
    });

    it('takes an object to bind to the callback', function() {
      var obj = {
        count: 0
      };

      arr.forEach(function(item) {
        this.count += item;
      }, obj);

      expect(obj.count).toEqual(15);
    });
  });

  describe('Array.prototype.every', function() {
    
    it('returns true when each item passes a test', function() {
      var passed = [1,2].every(function(item) {
        return (item > 0);
      });

      expect(passed).toBe(true);
    });

    it('returns false when any item fails a test', function() {
      var passed = [0,1].every(function(item) {
        return (item > 0);
      });

      expect(passed).toBe(false);
    });

    it('takes an object to bind to the callback', function() {
      var obj = {
        passed: false
      };

      [true].every(function(item) {
        this.passed = !!item;

        return !!item;
      }, obj);

      expect(obj.passed).toBe(true);
    });
  });

  describe('Array.prototype.some', function() {
    it('returns true when any item passes a test', function() {
      var passed = [0,1].some(function(item) {
        return (item > 0);
      });

      expect(passed).toBe(true);
    });

    it('returns false when no item passes a test', function() {
      var passed = [0].some(function(item) {
        return (item > 0);
      });

      expect(passed).toBe(false);
    });

    it('takes an object to bind to the callback', function() {
      var obj = {
        passed: false
      };

      [true].some(function(item) {
        this.passed = !!item;

        return !!item;
      }, obj);

      expect(obj.passed).toBe(true);
    });
  });

  describe('Array.prototype.map', function() {
    it('replaces each item in an array', function() {
      var arr = [1,2,3,4,5].map(function(item) {
        return item * item;
      });

      expect(arr.join(',')).toEqual('1,4,9,16,25');
    });

    it('takes an object to bind to the callback', function() {
      var obj = {
          on: true
        },
        arr = [1,2,3,4,5].map(function(item) {
          var mapped = this.on ? item * item : item;
          this.on = !this.on;
          return mapped;
        }, obj);

      expect(arr.join(',')).toEqual('1,2,9,4,25');
    });
  });

  describe('Array.prototype.filter', function() {
    it('returns only items that pass a test', function() {
      var arr = [1,2,3,4,5].filter(function(item) {
        return item % 2 === 0;
      });

      expect(arr.join(',')).toEqual('2,4');
    });

    it('takes an object to bind to the callback', function() {
      var obj = {
          on: false
        },
        arr = [1,2,3,4,5].filter(function(item) {
          this.on = !this.on;
          return this.on;
        }, obj);

      expect(arr.join(',')).toEqual('1,3,5');
    });
  });

  describe('Array.prototype.reduce', function() {
    var arr = [1,2,3,4,5];

    it('reduces an array to a single value', function() {
      var value = arr.reduce(function(memo, item) {
        memo += item;

        return memo;
      });

      expect(value).toEqual(15);
    });

    it('takes an initial value', function() {
      var value = arr.reduce(function(memo, item) {
        memo += item;

        return memo;
      }, 5);

      expect(value).toEqual(20);
    });
  });

  describe('Array.prototype.reduceRight', function() {
    var arr = [1,2,3,4,5];

    it('reduces an array to a single value', function() {
      var value = arr.reduceRight(function(memo, item) {
        memo += item;

        return memo;
      });

      expect(value).toEqual(15);
    });

    it('takes an initial value', function() {
      var value = arr.reduceRight(function(memo, item) {
        memo += item;

        return memo;
      }, 5);

      expect(value).toEqual(20);
    });

    it('starts at the last index and decreases to zero', function() {
      var indexes = [];

      arr.reduceRight(function(memo, item, index) {
        indexes.push(index);
      });

      expect(indexes.join(',')).toEqual('3,2,1,0');
    });
  });
});