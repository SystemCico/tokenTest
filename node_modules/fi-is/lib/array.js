/**
 * @overview Array checks.
 * @module is
 */

module.exports = function (is) {

  /**
   * Checks if the given value is in the given array. This method does not
   * support `all` and `any` interfaces.
   *
   * @param {Mixed} val The value to search for.
   * @param {Array} arr The array to search into.
   * @return {Boolean} Whether the value is in the array.
   * @example
   * is.inArray(1, [1, 2, 3]); // true
   * is.inArray('wer', [1, 2, 3]); // false
   */
  is.inArray = function (val, arr) {
    if (is.not.array(arr)) {
      return false;
    }

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        return true;
      }
    }

    return false;
  };

  is.inArray.api = ['not'];

  /**
   * Checks if the given array is sorted.
   *
   * @param {Array} arr The array to check.
   * @return {Boolean} Whether the array is sorted.
   * @example
   * is.sorted([1, 2, 3]); // true
   * is.sorted([2, 1, 5, 3]); // false
   */
  is.sorted = function (arr) {
    if (is.not.array(arr)) {
      return false;
    }

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }

    return true;
  };

};
