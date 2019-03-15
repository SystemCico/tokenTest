/**
 * @overview Type checks.
 * @module is
 */

module.exports = function(is) {
  /**
   * Checks if the given value is of arguments type with a fallback check for
   * IE.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is of arguments type.
   * @example
   * is.arguments(arguments); // true
   * is.arguments('not arguments'); // false
   */
  is.arguments = function(val) {
    return (
      is.not.null(val) &&
      (Object.prototype.toString.call(val) === '[object Arguments]' || (typeof val === 'object' && 'callee' in val))
    );
  };

  /**
   * Checks if the given value is an array using native `Array.isArray` if
   * available.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is an array.
   * @example
   * is.array([]); // true
   * is.array('not array'); // false
   */
  is.array = function(val) {
    if (typeof Array.isArray === 'function') {
      return Array.isArray(val);
    }

    return Object.prototype.toString.call(val) === '[object Array]';
  };

  /**
   * Checks if the given value is a boolean.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a boolean.
   * @example
   * is.boolean(true); // true
   * is.boolean(false); // true
   * is.boolean('not boolean'); // false
   */
  is.boolean = function(val) {
    return val === true || val === false || Object.prototype.toString.call(val) === '[object Boolean]';
  };

  /**
   * Checks if the given value is a date object.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a date object.
   * @example
   * is.date(new Date()); // true
   * is.date('not date'); // false
   */
  is.date = function(val) {
    return Object.prototype.toString.call(val) === '[object Date]';
  };

  /**
   * Checks if the given value is an error object.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is an error object.
   * @example
   * is.error(new Error()); // true
   * is.error('not error'); // false
   */
  is.error = function(val) {
    return Object.prototype.toString.call(val) === '[object Error]';
  };

  /**
   * Checks if the given value is a function with a fallback check for IE.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a function.
   * @example
   * is.function(function () {}); // true
   * is.function('not function'); // false
   */
  is.function = function(val) {
    return (
      Object.prototype.toString.call(val) === '[object Function]' ||
      Object.prototype.toString.call(val) === '[object AsyncFunction]' ||
      typeof val === 'function'
    );
  };

  /**
   * Checks if the given value is NaN. The difference with the native `isNaN`
   * function is that this will not return true for strings or other types and
   * only for the NaN value, the only value that doesn't equals itself.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is NaN.
   * @example
   * is.function(NaN); // true
   * is.function('not NaN'); // false
   * is.function(null); // false
   */
  is.nan = function(val) {
    return val !== val;
  };

  /**
   * Checks if the given value is null.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is null.
   * @example
   * is.null(null); // true
   * is.null(undefined); // false
   * is.null('not null'); // false
   */
  is.null = function(val) {
    return val === null;
  };

  /**
   * Checks if the given value is a number.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a number.
   * @example
   * is.number(0); // true
   * is.number(3.5); // true
   * is.number('not number'); // false
   */
  is.number = function(val) {
    return is.not.nan(val) && Object.prototype.toString.call(val) === '[object Number]';
  };

  /**
   * Checks if the given value is an object.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is an object.
   * @example
   * is.object({}); // true
   * is.object(function () {}); // false
   * is.object('not object'); // false
   */
  is.object = function(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  };

  /**
   * Checks if the given value is a JSON string.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a JSON string.
   * @example
   * is.json('{ "some": "value" }'); // true
   * is.json({}); // false
   * is.json('not json'); // false
   */
  is.json = function(val) {
    if (is.string(val)) {
      try {
        JSON.parse(val);
        return true;
      } catch (e) {}
    }

    return false;
  };

  /**
   * Checks if the given value is a RegExp.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a RegExp.
   * @example
   * is.regexp(/regexp/gi); // true
   * is.regexp(new RegExp('regexp' ,'gi')); // true
   * is.regexp({}); // false
   * is.regexp('not regexp'); // false
   */
  is.regexp = function(val) {
    return Object.prototype.toString.call(val) === '[object RegExp]';
  };

  /**
   * Checks if the given values are of same type preventing NaN and Number same
   * type check. This method doesn't support the `all` or `any` interfaces.
   *
   * @param {Mixed} val1 The first value to check.
   * @param {Mixed} val2 The other value to check.
   * @return {Boolean} Whether the values are of same type.
   * @example
   * is.sameType(true, false); // true
   * is.sameType(1, 3); // true
   * is.sameType({}, []); // false
   * is.sameType('', null); // false
   */
  is.sameType = function(val1, val2) {
    if (is.nan(val1) || is.nan(val2)) {
      return is.nan(val1) && is.nan(val2);
    }

    return Object.prototype.toString.call(val1) === Object.prototype.toString.call(val2);
  };

  is.sameType.api = ['not'];

  /**
   * Checks if the given value is a string.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a string.
   * @example
   * is.string('foo'); // true
   * is.string(''); // true
   * is.string({}); // false
   * is.string([]); // false
   */
  is.string = function(value) {
    return Object.prototype.toString.call(value) === '[object String]';
  };

  /**
   * Checks if the given value is a single char.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a single char.
   * @example
   * is.char('a'); // true
   * is.char('foo'); // false
   * is.char(1); // false
   * is.char(null); // false
   */
  is.char = function(val) {
    return is.string(val) && val.length === 1;
  };

  /**
   * Checks if the given value is undefined.
   *
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is undefined.
   * @example
   * is.undefined(undefined); // true
   * is.undefined('not undefined'); // false
   */
  is.undefined = function(val) {
    return val === void 0;
  };
};
