/**
 * @overview String checks.
 * @module is
 */

module.exports = function (is) {

  /**
   * Checks if the given string includes or contains the given value. This
   * method doesn't support the `all` or `any` interfaces.
   *
   * @param {String} str The string to search into.
   * @param {Mixed} val The value to search for.
   * @return {Boolean} Whether the string contains the given value.
   * @example
   * is.include('foobar', 'foo'); // true
   * is.include('foobar', 'oob'); // true
   * is.include('foobar', 'bar'); // true
   * is.include('foobar', 'wer'); // false
   * is.include('foobar', {}); // false
   */
  is.include = function (str, val) {
    return is.string(str) && str.indexOf(val) > -1;
  };

  is.include.api = ['not'];

  /**
   * Checks if the given string is all in uppercase.
   *
   * @param {String} str The string to check.
   * @return {Boolean} Whether the string is all in uppercase.
   * @example
   * is.upperCase('FOOBAR'); // true
   * is.upperCase('FooBaR'); // false
   * is.upperCase('foobar'); // false
   */
  is.upperCase = function (str) {
    return is.string(str) && str === str.toUpperCase();
  };

  /**
   * Checks if the given string is all in lowercase.
   *
   * @param {String} str The string to check.
   * @return {Boolean} Whether the string is all in lowercase.
   * @example
   * is.lowerCase('foobar'); // true
   * is.lowerCase('FooBaR'); // false
   * is.lowerCase('FOOBAR'); // false
   */
  is.lowerCase = function (str) {
    return is.string(str) && str === str.toLowerCase();
  };

  /**
   * Checks if the given string starts with the given value. This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @param {String} str The string to check into.
   * @param {String} val The value to check for.
   * @return {Boolean} Whether the string starts with the given value.
   * @example
   * is.startWith('foobar', 'foo'); // true
   * is.startWith('foobar', 'oob'); // false
   * is.startWith('foobar', 'bar'); // false
   */
  is.startWith = function (str, val) {
    return is.string(str) && str.indexOf(val) === 0;
  };

  is.startWith.api = ['not'];

  /**
   * Checks if the given string ends with the given value. This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @param {String} str The string to check into.
   * @param {String} val The value to check for.
   * @return {Boolean} Whether the string ends with the given value.
   * @example
   * is.endWith('foobar', 'bar'); // true
   * is.endWith('foobar', 'oob'); // false
   * is.endWith('foobar', 'foo'); // false
   */
  is.endWith = function (str, val) {
    return is.string(str) && str.indexOf(val) > -1 &&
      str.indexOf(val) === str.length - val.length;
  };

  is.endWith.api = ['not'];

  /**
   * Checks if the given string is word-capitalized.
   *
   * @param {String} str The string to check.
   * @return {Boolean} Whether the string is word-capitalized.
   * @example
   * is.capitalized('Foo'); // true
   * is.capitalized('Foo Bar Baz'); // true
   * is.capitalized('Foo bar baz'); // false
   * is.capitalized('foo'); // false
   */
  is.capitalized = function (str) {
    if (is.not.string(str)) {
      return false;
    }

    var words = str.split(/\s+/);
    var capitalized = [];

    for (var i = 0; i < words.length; i++) {
      capitalized.push(words[i][0] === words[i][0].toUpperCase());
    }

    return is.all.truthy.apply(null, capitalized);
  };

  /**
   * Checks if the given string is a palindrome.
   *
   * @param {String} str The string to check.
   * @return {Boolean} Whether the string is a palindrome.
   * @example
   * is.palindrome('foobaraboof'); // true
   * is.palindrome('noon'); // true
   * is.palindrome('foobar'); // false
   * is.palindrome('bar'); // false
   */
  is.palindrome = function (str) {
    return is.string(str) && str === str.split('').reverse().join('');
  };

};
