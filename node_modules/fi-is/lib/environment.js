/**
 * @overview Environment checks.
 * @module is
 */

module.exports = function (is) {

  var browser = typeof window !== 'undefined';

  var userAgent = browser && 'navigator' in window &&
    'userAgent' in navigator && navigator.userAgent || '';

  var appVersion = browser && 'navigator' in window &&
    'appVersion' in navigator && navigator.appVersion || '';

  /**
   * Checks if the current browser is Chrome or Chromium. This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current browser is Chrome or Chromium.
   * @example is.chrome();
   */
  is.chrome = function () {
    return browser && /(Chrome|Chromium)\//.test(userAgent) && is.not.opera() &&
      is.not.vivaldi() && is.not.edge() && is.not.facebook() &&
      is.not.twitter();
  };

  is.chrome.api = ['not'];

  /**
   * Checks if the current browser is Firefox. This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current browser is Firefox.
   * @example is.firefox();
   */
  is.firefox = function () {
    return browser && /Firefox\//.test(userAgent);
  };

  is.firefox.api = ['not'];

  /**
   * Checks if the current browser is Edge. This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current browser is Edge.
   * @example is.firefox();
   */
  is.edge = function () {
    return browser && /Edge\//.test(userAgent);
  };

  is.edge.api = ['not'];

  /**
   * Checks if the current browser is Internet Explorer. This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @param {Number} ver The optional version number to check for.
   * @return {Boolean} Whether the current browser is Internet Explorer.
   * @example
   * is.ie();
   * is.ie(9);
   * is.ie(10);
   */
  is.ie = function (ver) {
    if (!ver) {
      return browser && (/MSIE/.test(userAgent) || 'ActiveXObject' in
        window);
    }

    if (ver >= 11) {
      return browser && 'ActiveXObject' in window;
    }

    return browser && new RegExp('MSIE ' + ver).test(userAgent);
  };

  is.ie.api = ['not'];

  /**
   * Checks if the current browser is Opera. This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current browser is Opera.
   * @example is.opera();
   */
  is.opera = function () {
    return browser && /(Opera|OPR)\//.test(userAgent);
  };

  is.opera.api = ['not'];

  /**
   * Checks if the current browser is Safari. This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current browser is Safari.
   * @example is.safari();
   */
  is.safari = function () {
    return browser && /Safari/.test(userAgent) && is.not.chrome() &&
      is.not.vivaldi() && is.not.opera() && is.not.edge() &&
      is.not.facebook() && is.not.twitter();
  };

  is.safari.api = ['not'];

  /**
   * Checks if the current browser is Vivaldi. This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current browser is Vivaldi.
   * @example is.vivaldi();
   */
  is.vivaldi = function () {
    return browser && /Vivaldi/.test(userAgent);
  };

  is.vivaldi.api = ['not'];

  /**
   * Checks if the current browser is Twitter's internal web view. This method
   * doesn't support the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current browser is Twitter's internal
   * webview.
   * @example is.twitter();
   */
  is.twitter = function () {
    return browser && /Twitter/.test(userAgent);
  };

  is.twitter.api = ['not'];

  /**
   * Checks if the current browser is Facebook's internal web view. This method
   * doesn't support the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current browser is Facebook's internal
   * webview.
   * @example is.facebook();
   */
  is.facebook = function () {
    return browser && /FB_IAB/.test(userAgent);
  };

  is.facebook.api = ['not'];

  /**
   * Checks if the current device is runnig iOS. This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is runnig iOS.
   * @example is.ios();
   */
  is.ios = function () {
    return browser && (is.iphone() || is.ipad() || is.ipod());
  };

  is.ios.api = ['not'];

  /**
   * Checks if the current device is an iPhone. This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is an iPhone.
   * @example is.iphone();
   */
  is.iphone = function () {
    return browser && /iphone/i.test(userAgent);
  };

  is.iphone.api = ['not'];

  /**
   * Checks if the current device is an iPad. This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is an iPad.
   * @example is.ipad();
   */
  is.ipad = function () {
    return browser && /ipad/i.test(userAgent);
  };

  is.ipad.api = ['not'];

  /**
   * Checks if the current device is an iPod. This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is an iPod.
   * @example is.ipod();
   */
  is.ipod = function () {
    return browser && /ipod/i.test(userAgent);
  };

  is.ipod.api = ['not'];

  /**
   * Checks if the current device is an Android device. This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is an Android device.
   * @example is.android();
   */
  is.android = function () {
    return browser && /android/i.test(userAgent);
  };

  is.android.api = ['not'];

  /**
   * Checks if the current device is an Android phone.This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is an Android phone.
   * @example is.androidPhone();
   */
  is.androidPhone = function () {
    return browser && /android/i.test(userAgent) && /mobile/i.test(
      userAgent);
  };

  is.androidPhone.api = ['not'];

  /**
   * Checks if the current device is an Android tablet.This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is an Android tablet.
   * @example is.androidTablet();
   */
  is.androidTablet = function () {
    return browser && /android/i.test(userAgent) && !/mobile/i.test(
      userAgent);
  };

  is.androidTablet.api = ['not'];

  /**
   * Checks if the current device is a Blackberry device. This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is a Blackberry device.
   * @example is.blackberry();
   */
  is.blackberry = function () {
    return browser && (/blackberry/i.test(userAgent) ||
      /BB10/i.test(userAgent));
  };

  is.blackberry.api = ['not'];

  /**
   * Checks if the current device is a desktop device.This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is a desktop device.
   * @example is.desktop();
   */
  is.desktop = function () {
    return browser && is.not.mobile() && is.not.tablet();
  };

  is.desktop.api = ['not'];

  /**
   * Checks if the current device running Linux (excluding Android). This method
   * doesn't support the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device running Linux.
   * @example is.linux();
   */
  is.linux = function () {
    return browser && /linux/i.test(appVersion) && is.not.android();
  };

  is.linux.api = ['not'];

  /**
   * Checks if the current device running OSX.This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device running OSX.
   * @example is.osx();
   */
  is.osx = function () {
    return browser && /mac/i.test(appVersion);
  };

  is.osx.api = ['not'];

  /**
   * Checks if the current device running OSX (Mac).This method doesn't support
   * the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device running OSX.
   * @example is.mac();
   */
  is.mac = function () {
    return is.osx();
  };

  is.mac.api = ['not'];

  /**
   * Checks if the current device running Windows.This method doesn't support
   * the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device running Windows.
   * @example is.windows();
   */
  is.windows = function () {
    return browser && /win/i.test(appVersion);
  };

  is.windows.api = ['not'];

  /**
   * Checks if the current device is a Windows phone.This method doesn't support
   * the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is a Windows phone.
   * @example is.windowsPhone();
   */
  is.windowsPhone = function () {
    return browser && is.windows() && /phone/i.test(userAgent);
  };

  is.windowsPhone.api = ['not'];

  /**
   * Checks if the current device is a Windows tablet.This method doesn't
   * support the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is a Windows tablet.
   * @example is.windowsTablet();
   */
  is.windowsTablet = function () {
    return browser && is.windows() && is.not.windowsPhone() && /touch/i.test(
      userAgent);
  };

  is.windowsTablet.api = ['not'];

  /**
   * Checks if the current device is a mobile device.This method doesn't support
   * the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is a mobile device.
   * @example is.mobile();
   */
  is.mobile = function () {
    return browser && (is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() ||
      is.windowsPhone());
  };

  is.mobile.api = ['not'];

  /**
   * Checks if the current device is a tablet.This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is a tablet.
   * @example is.tablet();
   */
  is.tablet = function () {
    return browser && (is.ipad() || is.androidTablet() || is.windowsTablet());
  };

  is.tablet.api = ['not'];

  /**
   * Checks if the current device is on-line.This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is on-line.
   * @example is.online();
   */
  is.online = function () {
    return browser && navigator && navigator.onLine;
  };

  is.online.api = ['not'];

  /**
   * Checks if the current device is off-line.This method doesn't support the
   * `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is off-line.
   * @example is.offline();
   */
  is.offline = function () {
    return is.not.online();
  };

  is.offline.api = ['not'];

  /**
   * Checks if the current device is touch capable.This method doesn't support
   * the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current device is touch capable.
   * @example is.touchDevice();
   */
  is.touchDevice = function () {
    return browser && ('ontouchstart' in window || 'DocumentTouch' in
      window && document instanceof DocumentTouch);
  };

  is.touchDevice.api = ['not'];

  /**
   * Checks if the current environment is Node.js.This method doesn't support
   * the `all` or `any` interfaces.
   *
   * @return {Boolean} Whether the current environment is Node.js.
   * @example is.nodejs();
   */
  is.nodejs = function () {
    return !browser && typeof process === 'object';
  };

};
