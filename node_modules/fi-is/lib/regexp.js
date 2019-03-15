/**
 * @overview Regexp checks.
 * @module is
 */

module.exports = function(is, regexps) {
  /**
   * Creates the regexp check methods from the defined properties on the
   * `regexp` object.
   *
   * @param {String} name The regexp name to generate the check method for.
   * @private
   */
  function create(name) {
    is[name] = function(val) {
      return regexps[name].test(val);
    };
  }

  /* Create regexp checks methods from the 'regexps' object */
  Object.keys(regexps).forEach(function(reg) {
    if (regexps.hasOwnProperty(reg)) {
      create(reg);
    }
  });

  /**
   * Checks for a valid domain name.
   *
   * @function domain
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a valid domain name.
   * @see https://github.com/johnotander/domain-regex
   * @example
   * is.domain('example.com'); // true
   * is.domain('subdomain.example.com'); // true
   * is.domain('sub.domain.example.website'); // true
   * is.domain('not_a_domain'); // false
   * is.domain(1234); // false
   * is.domain(true); // false
   */

  /**
   * Checks for a valid URL.
   *
   * @function url
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is an URL.
   * @example
   * is.url('http://example.com'); // true
   * is.url('http://not url dot com'); // false
   * is.url(true); // false
   */

  /**
   * Checks for a valid email address.
   *
   * @function email
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is an email address.
   * @example
   * is.email('address@example.com'); // true
   * is.email('address@not email'); // false
   * is.email(true); // false
   */

  /**
   * Checks for a valid credit card number.
   *
   * @function creditCard
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a credit card number.
   * @example
   * is.creditCard(378282246310005); // true
   * is.creditCard(123); // false
   * is.creditCard(true); // false
   */

  /**
   * Checks for an alphanumeric string.
   *
   * @function alphaNumeric
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is an alphanumeric string.
   * @example
   * is.alphaNumeric('abc123'); // true
   * is.alphaNumeric('*?'); // false
   * is.alphaNumeric(true); // false
   */

  /**
   * Checks for a valid time string.
   *
   * @function timeString
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a time string.
   * @example
   * is.timeString('13:45:30'); // true
   * is.timeString('12:12:90'); // false
   * is.timeString(true); // false
   */

  /**
   * Checks for a valid date string.
   *
   * @function dateString
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a date string.
   * @example
   * is.dateString('11/11/2011'); // true
   * is.dateString('1/5'); // false
   * is.dateString(true); // false
   */

  /**
   * Checks for a valid US ZIP code.
   *
   * @function usZipCode
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a US ZIP code.
   * @example
   * is.usZipCode('02201-1020'); // true
   * is.usZipCode('1'); // false
   * is.usZipCode(true); // false
   */

  /**
   * Checks for a valid Canada postal code.
   *
   * @function caPostalCode
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a Canada postal code.
   * @example
   * is.caPostalCode('L8V3Y1'); // true
   * is.caPostalCode('L8V 3Y1'); // true
   * is.caPostalCode('1'); // false
   * is.caPostalCode(true); // false
   */

  /**
   * Checks for a valid UK post code.
   *
   * @function ukPostCode
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a UK post code.
   * @example
   * is.ukPostCode('B184BJ'); // true
   * is.ukPostCode('1'); // false
   * is.ukPostCode(true); // false
   */

  /**
   * Checks for a valid north american number plan formatted value.
   *
   * @function nanpPhone
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is in north american number
   * plan format.
   * @example
   * is.nanpPhone('609-555-0175'); // true
   * is.nanpPhone('1'); // false
   * is.nanpPhone(true); // false
   */

  /**
   * Checks for a valid extensible provisioning protocol formatted value.
   *
   * @function eppPhone
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is in extensible provisioning protocol
   * format.
   * @example
   * is.eppPhone('+90.2322456789'); // true
   * is.eppPhone('1'); // false
   * is.eppPhone(true); // false
   */

  /**
   * Checks for a valid social security number.
   *
   * @function socialSecurityNumber
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is a social security number.
   * @example
   * is.socialSecurityNumber('017-90-7890'); // true
   * is.socialSecurityNumber('1'); // false
   * is.socialSecurityNumber(true); // false
   */

  /**
   * Checks for an affirmative value (case-insensitive).
   *
   * @function affirmative
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value affirmative.
   * @example
   * is.affirmative('yes'); // true
   * is.affirmative('true'); // true
   * is.affirmative('y'); // true
   * is.affirmative('1'); // true
   * is.affirmative('ok'); // true
   * is.affirmative('okay'); // true
   * is.affirmative(1); // true
   * is.affirmative(true); // true
   * is.affirmative('no'); // false
   * is.affirmative('N'); // false
   * is.affirmative(0); // false
   * is.affirmative(false); // false
   * is.affirmative({}); // false
   * is.affirmative(null); // false
   */

  /**
   * Checks for a valid hexadecimal value.
   *
   * @function hexadecimal
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is hexadecimal.
   * @example
   * is.hexadecimal('ff'); // true
   * is.hexadecimal('ffFF'); // true
   * is.hexadecimal('fF0'); // true
   * is.hexadecimal(0.287); // false
   * is.hexadecimal(true); // false
   */

  /**
   * Checks for a valid hex color value.
   *
   * @function hexColor
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is hex color.
   * @example
   * is.hexColor('#333'); // true
   * is.hexColor('#444444'); // true
   * is.hexColor('#abc123'); // true
   * is.hexColor(0.287); // false
   * is.hexColor(true); // false
   */

  /**
   * Checks for a valid IPv4 or IPv6 address.
   *
   * @function ip
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is an IPv4 or IPv6 address.
   * @example
   * is.ip('2001:db8::ff00:42:8329'); // true
   * is.ip('127.0.0.1'); // true
   * is.ip('1.0.287.99'); // false
   * is.ip('2001::::42:8329'); // false
   * is.ip(true); // false
   */

  /**
   * Checks for a valid IPv4 address.
   *
   * @function ipv4
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is an IPv4 address.
   * @example
   * is.ipv4('127.0.0.1'); // true
   * is.ipv4('2001:db8::ff00:42:8329'); // false
   * is.ipv4('5555.555.5.5'); // false
   * is.ipv4(true); // false
   */

  /**
   * Checks for a valid IPv6 address.
   *
   * @function ipv6
   * @param {Mixed} val The value to check.
   * @return {Boolean} Whether the value is an IPv6 address.
   * @example
   * is.ipv6('2001:db8::ff00:42:8329'); // true
   * is.ipv6('127.0.0.1'); // false
   * is.ipv6('2001::::42:8329'); // false
   * is.ipv6(true); // false
   */
};
