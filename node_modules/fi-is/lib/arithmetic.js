/**
 * @overview Arithmetic checks.
 * @module is
 */

module.exports = function (is) {

  /**
   * Checks if the given values are equal. This method doesn't support the `all`
   * or `any` interfaces.
   *
   * Important: Checking for object or array equality is a taxing proccess!
   *
   * @param {Mixed} a The first value.
   * @param {Mixed} b The other value.
   * @return {Boolean} Whether the values are equal.
   * @example
   * is.equal(1, 1); // true
   * is.equal([1, 2, 3], [1, 2, 3]); // true
   * is.equal([1, 2], ''); // false
   * is.equal(1, 2); // false
   */
  is.equal = function (a, b) {
    /* Check 0 and -0 equity with Infinity and -Infinity */
    if (is.all.number(a, b)) {
      return a === b && 1 / a === 1 / b;
    }

    /* Check regexps and strings equality */
    if (is.all.string(a, b) || is.all.regexp(a, b)) {
      return '' + a === '' + b;
    }

    /* Check booleans equality */
    if (is.all.boolean(a, b)) {
      return a === b;
    }

    /* Check arrays equality */
    if (is.all.array(a, b)) {
      if (a.length !== b.length) {
        return false;
      }

      for (var i = 0, l = a.length; i < l; i++) {
        if (is.not.equal(a[i], b[i])) {
          return false;
        }
      }

      return true;
    }

    /* Check objects equality */
    if (is.all.object(a, b)) {
      if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
      }

      for (var p in a) {
        if (a.hasOwnProperty(p) && b.hasOwnProperty(p)) {
          if (is.not.equal(a[p], b[p])) {
            return false;
          }
        } else {
          return false;
        }
      }

      return true;
    }

    return false;
  };

  is.equal.api = ['not'];

  /**
   * Checks if the given number is even.
   *
   * @param {Number} num The number to check.
   * @return {Boolean} Whether the number is even.
   * @example
   * is.even(2); // true
   * is.even(3); // false
   */
  is.even = function (num) {
    return is.number(num) && num % 2 === 0;
  };

  /**
   * Checks if the given number is odd.
   *
   * @param {Number} num The number to check.
   * @return {Boolean} Whether the number is odd.
   * @example
   * is.odd(3); // true
   * is.odd(2); // false
   */
  is.odd = function (num) {
    return is.number(num) && num % 2 === 1;
  };

  /**
   * Checks if the given number is positive.
   *
   * @param {Number} num The number to check.
   * @return {Boolean} Whether the number is positive.
   * @example
   * is.positive(2); // true
   * is.positive(-3); // false
   */
  is.positive = function (num) {
    return is.number(num) && num > 0;
  };

  /**
   * Checks if the given number is negative.
   *
   * @param {Number} num The number to check.
   * @return {Boolean} Whether the number is negative.
   * @example
   * is.negative(-3); // true
   * is.negative(2); // false
   */
  is.negative = function (num) {
    return is.number(num) && num < 0;
  };

  /**
   * Checks if the given number is greater than the given minimum. This method
   * doesn't support the `all` or `any` interfaces.
   *
   * @param {Number} num The number to check.
   * @param {Number} min The minimum value exclusive.
   * @return {Boolean} Whether the number is greater than the minimum.
   * @example
   * is.above(3, 2); // true
   * is.above(2, 3); // false
   * is.above(3, 3); // false
   */
  is.above = function (num, min) {
    return is.all.number(num, min) && num > min;
  };

  is.above.api = ['not'];

  /**
   * Checks if the given number is less than the given maximum. This method
   * doesn't support the `all` or `any` interfaces.
   *
   * @param {Number} num The number to check.
   * @param {Number} max The maximum value exclusive.
   * @return {Boolean} Whether the number is less than the maximum.
   * @example
   * is.under(3, 2); // true
   * is.under(2, 3); // false
   * is.under(3, 3); // false
   */
  is.under = function (num, max) {
    return is.all.number(num, max) && num < max;
  };

  is.under.api = ['not'];

  /**
   * Checks if the given number is within the given minimum and maximum. This
   * method doesn't support the `all` or `any` interfaces.
   *
   * @param {Number} num The number to check.
   * @param {Number} min The minimum value exclusive.
   * @param {Number} max The maximum value exclusive.
   * @return {Boolean} Whether the number is within the minimum and maximum.
   * @example
   * is.within(0, -2, 2); // true
   * is.within(1, -2, 2); // true
   * is.within(0, 1, 3); // false
   * is.within(1, 1, 2); // false
   */
  is.within = function (num, min, max) {
    return is.all.number(num, min, max) && num > min && num < max;
  };

  is.within.api = ['not'];

  /**
   * Checks if the given number is a decimal.
   *
   * @param {Number} num The number to check.
   * @return {Boolean} Whether the number is a decimal.
   * @example
   * is.decimal(13.45); // true
   * is.decimal(13); // false
   */
  is.decimal = function (num) {
    return is.number(num) && num % 1 !== 0;
  };

  /**
   * Checks if the given number is an integer.
   *
   * @param {Number} num The number to check.
   * @return {Boolean} Whether the number is an integer.
   * @example
   * is.integer(13); // true
   * is.integer(13.5); // false
   */
  is.integer = function (num) {
    return is.number(num) && num % 1 === 0;
  };

  /**
   * Checks if the given number is finite using native 'isFinite' first.
   *
   * @param {Number} num The number to check.
   * @return {Boolean} Whether the number is finite.
   * @example
   * is.finite(13); // true
   * is.finite(Infinity); // false
   */
  is.finite = function (num) {
    if (typeof isFinite === 'function') {
      return isFinite(num);
    }

    return num !== Infinity && num !== -Infinity && is.not.nan(num);
  };

  /**
   * Checks if the given number is infinite.
   *
   * @param {Number} num The number to check.
   * @return {Boolean} Whether the number is infinite.
   * @example
   * is.infinite(Infinity); // true
   * is.infinite(13); // false
   */
  is.infinite = function (num) {
    return is.not.finite(num);
  };

};
