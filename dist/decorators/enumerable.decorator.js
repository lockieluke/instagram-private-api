'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Enumerable = Enumerable;
function Enumerable(value) {
  return (target, key) => {
    Object.defineProperty(target, key, {
      get: function() {
        return undefined;
      },
      set: function(val) {
        Object.defineProperty(this, key, {
          value: val,
          writable: true,
          enumerable: value,
          configurable: true,
        });
      },
      enumerable: false,
    });
  };
}
//# sourceMappingURL=enumerable.decorator.js.map
