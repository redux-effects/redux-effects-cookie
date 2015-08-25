/**
 * Imports
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentCookie = require('component-cookie');

var _componentCookie2 = _interopRequireDefault(_componentCookie);

/**
 * Cookie middleware
 */

function cookieMiddleware(cookieMap) {
  var cookie = cookieMap ? map(cookieMap) : _componentCookie2['default'];

  return function (_ref) {
    var dispatch = _ref.dispatch;
    var getState = _ref.getState;
    return function (next) {
      return function (effect) {
        return effect.type === 'GET_COOKIE' || effect.type === 'SET_COOKIE' ? handle(cookie, effect) : next(effect);
      };
    };
  };
}

/**
 * Handle a cookie effect
 */

function handle(cookie, effect) {
  switch (effect.type) {
    case 'SET_COOKIE':
      return cookie(effect.name, effect.value);
    case 'GET_COOKIE':
      return cookie(effect.name);
  }
}

/**
 * Use a plain object as the source of cookie data
 * (e.g. if we're on the server)
 */

function map(cookieMap) {
  return function (name, value) {
    if (arguments.length === 2) {
      cookieMap[name] = value;
    }

    return cookieMap[name];
  };
}

/**
 * Exports
 */

exports['default'] = cookieMiddleware;
module.exports = exports['default'];