(function() {
'use strict';

var name,
  methods = 'every,some,map,filter,reduce,reduceRight,forEach'.split(','),
  i = methods.length - 1,
  fnMap = {
    forEach: function(fn, bind) {
      var i = 0,
        l = this.length;

      while (i < l) {
        fn.call((bind || null), this[i], i, this);

        i += 1;
      }
    },

    every: function(fn, bind) {
      var i = this.length - 1;

      while (i >= 0) {
        if (!fn.call((bind || null), this[i], i, this)) {
          return false;
        }

        i -= 1;
      }

      return true;
    },

    some: function(fn, bind) {
      var i = this.length - 1;

      while (i >= 0) {
        if (fn.call((bind || null), this[i], i, this)) {
          return true;
        }

        i -= 1;
      }

      return false;
    },

    map: function(fn, bind) {
      var arr = [];

      this.forEach(function(item, i, items) {
        arr.push(fn.call(this, item, i, items));
      }, bind);

      return arr;
    },

    filter: function(fn, bind) {
      var arr = [];

      this.forEach(function(item, i, items) {
        if (fn.call(this, item, i, items)) {
          arr.push(item);
        }
      }, bind);

      return arr;
    },

    reduce: function(fn, start) {
      var memo = start || this[0],
        i = (typeof start !== 'undefined') ? 0 : 1,
        l = this.length;

      while (i < l) {
        memo = fn(memo, this[i], i, this);

        i += 1;
      }

      return memo;
    },

    reduceRight: function(fn, start) {
      var l = this.length,
        i = (typeof start !== 'undefined') ? l - 1 : l - 2,
        memo = start || this[l - 1];

      while (i >= 0) {
        memo = fn(memo, this[i], i, this);

        i -= 1;
      }

      return memo;
    }
  };

function setMethod(name) {
  if (!Array.prototype[name]) {
    Array.prototype[name] = function(fn) {
      if ({}.toString.call(fn) !== '[object Function]') {
        throw new TypeError('Array.prototype.' + name +
            ': you must provide a callback function.');
      }

      return fnMap[name].apply(this, arguments);
    };
  }
}

while (i >= 0) {
  setMethod(methods[i]);

  i -= 1;
}

if (!Object.create) {
  Object.create = (function() {
    function F() {}

    return function(o) {
      F.prototype = o;

      return new F();
    };
  })();
}

})();