/**
 * @overview Object checks.
 * @module is
 */

module.exports = function (is) {

  /**
   * Checks if the given object has the given number of properties. This method
   * doesn't support the `all` or `any` interfaces.
   *
   * @param {Object} obj The object to check.
   * @param {Number} count The number of properties to expect.
   * @return {Boolean} Whether the object has the number of properties.
   * @example
   * is.propertyCount({wer: 'asd'}, 1); // true
   * is.propertyCount({}, 5); // false
   */
  is.propertyCount = function (obj, count) {
    if (!is.object(obj) || !is.number(count)) {
      return false;
    }

    if (Object.keys) {
      return Object.keys(obj).length === count;
    }

    var properties = [];
    var property;

    for (property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        properties.push(property);
      }
    }

    return properties.length === count;
  };

  is.propertyCount.api = ['not'];

  /**
   * Checks if the given object has the given property. This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @param {Object} obj The object to check.
   * @param {String} prop The name of the propery to search for.
   * @return {Boolean} Whether the object has the property.
   * @example
   * is.propertyDefined({wer: 'asd'}, 'wer'); // true
   * is.propertyDefined({}, 'wer'); // false
   */
  is.propertyDefined = function (obj, prop) {
    return is.object(obj) && is.string(prop) && prop in obj;
  };

  is.propertyDefined.api = ['not'];

  /**
   * Checks if the given object is the window object.
   *
   * @param {Object} obj The object to check.
   * @return {Boolean} Whether the object is the window object.
   * @example
   * is.windowObject(window); // true
   * is.windowObject({}); // false
   */
  is.windowObject = function (obj) {
    return typeof obj === 'object' && 'setInterval' in obj;
  };

  /**
   * Checks if the given object is a DOM node.
   *
   * @param {Object} obj The object to check.
   * @return {Boolean} Whether the object is a DOM node.
   * @example
   * is.domNode(document.body); // true
   * is.domNode(document); // false
   * is.domNode('not DOM node'); // false
   * is.domNode(0); // false
   */
  is.domNode = function (obj) {
    return typeof obj === 'object' && typeof obj.nodeType === 'number' &&
      obj.nodeType === 1;
  };

};
