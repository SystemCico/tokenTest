/**
 * @overview Presence checks.
 * @module is
 */

module.exports = function (is) {

  /**
   * Checks if the given object is empty. Treats null and undefined as such.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is empty.
   * @example
   * is.empty({}); // true
   * is.empty(''); // true
   * is.empty([]); // true
   * is.empty(new Date('invalid date')); // true
   * is.empty(null); // true
   * is.empty(undefined); // true
   * is.empty(0); // false
   * is.empty(-1); // false
   * is.empty(1); // false
   * is.empty(true); // false
   * is.empty(false); // false
   * is.empty(new Date()); // false
   * is.empty({ not: 'empty' }); // false
   * is.empty(['not', 'empty']); // false
   * is.empty('not empty'); // false
   */
  is.empty = function (val) {
    if (is.string(val) || is.array(val)) {
      return val.length === 0;
    }

    if (is.number(val) || is.boolean(val)) {
      return false;
    }

    if (is.nan(val)) {
      return true;
    }

    if (is.date(val)) {
      return is.nan(val.getTime());
    }

    if (is.not.existy(val)) {
      return true;
    }

    if (is.object(val)) {
      return Object.keys(val).length === 0;
    }

    return !val;
  };

  /**
   * Checks if the given object is not null or undefined.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is not null or undefined.
   * @memberof is
   * @example
   * is.existy(123); // true
   * is.existy(0); // true
   * is.existy(undefined); // false
   * is.existy(null); // false
   */
  is.existy = function (val) {
    return val !== null && val !== undefined;
  };

  /**
   * Checks if the given value is truthy.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is truthy.
   * @example
   * is.truthy(true); // true
   * is.truthy('a string'); // true
   * is.truthy(1); // true
   * is.truthy(0); // false
   * is.truthy(null); // false
   * is.truthy(undefined); // false
   * is.truthy(false); // false
   * is.truthy(NaN); // false
   */
  is.truthy = function (val) {
    return is.existy(val) && val !== false && is.not.nan(val) &&
      val !== '' && val !== 0;
  };

  /**
   * Checks if the given value is falsy.
   *
   * @param {Mixed} val The object to check.
   * @return {Boolean} Whether the value is falsy.
   * @example
   * is.falsy(0); // true
   * is.falsy(null); // true
   * is.falsy(undefined); // true
   * is.falsy(NaN); // true
   * is.falsy(false); // true
   * is.falsy(true); // false
   * is.falsy('a string'); // false
   * is.falsy(1); // false
   */
  is.falsy = function (val) {
    return is.not.truthy(val);
  };

  /**
   * Checks if the given value is a space character. Checks for
   * horizantal tab (9), line feed (10), vertical tab (11), form feed (12),
   * carriage return (13) and space (32).
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a space character.
   * @example
   * is.space(' '); // true
   * is.space('a'); // false
   * is.space(1); // false
   */
  is.space = function (val) {
    if (is.char(val)) {
      var code = val.charCodeAt(0);
      return (code > 8 && code < 14) || code === 32;
    }

    return false;
  };

};
