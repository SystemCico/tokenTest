/**
 * @module is
 * @version 1.1.4
 * @author Santiago G. Marín <santiago@finaldevstudio.com>, Aras Atasaygin
 * @copyright Final Development Studio 2016
 * @license MIT
 **/

var root = this || global;
var previousIs = root.is;

/**
 * Regexps definition.
 *
 * Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook.
 * Scott Gonzalez: Email address validation.
 *
 * @type {Object}
 * @private
 */
var regexps = {
  domain: /\b((?=[a-z0-9-]{1,63}\.)(xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}\b/,
  url: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
  email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
  alphaNumeric: /^[A-Za-z0-9]+$/,
  /* Match hours, minutes, and seconds, 24-hour clock */
  timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
  /* Match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits
   * for the day and month, and two or four digits for the year */
  dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
  usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/,
  caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
  ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
  /* Match north american number plan format */
  nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  /* Match extensible provisioning protocol format */
  eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
  socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
  affirmative: /^(?:1|t(?:rue)?|y(?:es)?|o\.?k\.?(?:ay)?)$/i,
  hexadecimal: /^[0-9a-fA-F]+$/,
  hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
  ipv4: /^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$/,
  ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
  ip: /(^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$)/
};

/**
 * Define namespace.
 *
 * @type {Object}
 * @private
 */
var is = {};

/**
 * The library's current version.
 *
 * @type {string}
 * @readonly
 * @example is.VERSION; // '1.0.0'
 */
is.VERSION = '0.8.0';

/**
 * Interface to invert the predicate function's result.
 *
 * @example
 * is.not.string(1234); // true
 * is.not.number(1); // false
 * is.not.string('not number'); // false
 */
is.not = {};

/**
 * Interface to check if all the given values passes the predicate function's
 * check.
 *
 * @example
 * is.all.number(1, 2, 3, 4); // true
 * is.all.string(['a string', 1, 2, 3, 4]); // false
 * is.all.number([1, 2, 3, 4, 'not number']); // false
 */
is.all = {};

/**
 * Interface to check if any of the given values passes the the predicate
 * function's check.
 *
 * @example
 * is.any.number(1, 2, 3, 4, 'a string'); // true
 * is.any.string([1, 2, true, 4]); // false
 * is.any.truthy([null, false]); // false
 */
is.any = {};

/**
 * Helper function that inverts the boolean result of the given function.
 *
 * @private
 * @param {Function} func The function to call and invert its result.
 * @return {Boolean}
 */
function not(func) {
  return function() {
    return !func.apply(null, Array.prototype.slice.call(arguments));
  };
}

/**
 * Helper function that passes each argument or array element to the given
 * function and checks if all arguments pass the check.
 *
 * @private
 * @param {Function} func The function to test each argument with.
 * @return {Boolean}
 */
function all(func) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var len = args.length;

    if (len === 1 && is.array(args[0])) {
      args = args[0];
      len = args.length;
    }

    for (var i = 0; i < len; i++) {
      if (!func.call(null, args[i])) {
        return false;
      }
    }

    return true;
  };
}

/**
 * Helper function that passes each argument or array element to the given
 * function and checks if any of the arguments pass the check.
 *
 * @private
 * @param {Function} func The function to test each argument with.
 * @return {Boolean}
 */
function any(func) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    var len = args.length;

    if (len === 1 && is.array(args[0])) {
      args = args[0];
      len = args.length;
    }

    for (var i = 0; i < len; i++) {
      if (func.call(null, args[i])) {
        return true;
      }
    }

    return false;
  };
}

/* API methods -------------------------------------------------------------- */

/**
 * Type checks
 *
 * @see type.md
 */
require('./type')(is);
/* Presence checks */
require('./presence')(is);
/* Arithmetic checks */
require('./arithmetic')(is);
/* Regexp checks */
require('./regexp')(is, regexps);
/* String checks */
require('./string')(is);
/* Time checks */
require('./time')(is);
/* Environment checks */
require('./environment')(is);
/* Object checks */
require('./object')(is);
/* Array checks */
require('./array')(is);

/* Initialization ----------------------------------------------------------- */

/* Set interfaces per 'is' function based on their 'api' property */
for (var method in is) {
  if (is.hasOwnProperty(method) && is.function(is[method])) {
    var ifaces = is[method].api || ['not', 'all', 'any'];

    for (var i = 0, l = ifaces.length; i < l; i++) {
      if (ifaces[i] === 'not') {
        is.not[method] = not(is[method]);
      }

      if (ifaces[i] === 'all') {
        is.all[method] = all(is[method]);
      }

      if (ifaces[i] === 'any') {
        is.any[method] = any(is[method]);
      }
    }
  }
}

/* Configuration methods ---------------------------------------------------- */

/* IMPORTANT: Intentionally added after setting interfaces */

/**
 * Sets a custom regexp value for any existant regexp name.
 *
 * @param {RegExp} reg The regexp to use.
 * @param {String} key The regexp name to replace.
 */
is.setRegexp = function(reg, key) {
  for (var name in regexps) {
    if (regexps.hasOwnProperty(name) && key === name) {
      regexps[name] = reg;
    }
  }
};

/**
 * Changes the namespace of the library to prevent name collissions.
 *
 * @return {Object} The 'is' object instance.
 */
is.setNamespace = function() {
  root.is = previousIs;
  return this;
};

module.exports = is;
