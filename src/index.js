/**
 * Imports
 */

import _cookie from 'component-cookie'

/**
 * Cookie middleware
 */

function cookieMiddleware (cookieMap) {
  const cookie = cookieMap
    ? map(cookieMap)
    : _cookie

  return ({dispatch, getState}) => next => effect =>
    effect.type === 'GET_COOKIE' || effect.type === 'SET_COOKIE'
      ? handle(cookie, effect)
      : next(effect)
}

/**
 * Handle a cookie effect
 */

function handle (cookie, effect) {
  switch (effect.type) {
    case 'SET_COOKIE':
      return cookie(effect.name, effect.value)
    case 'GET_COOKIE':
      return cookie(effect.name)
  }
}

/**
 * Use a plain object as the source of cookie data
 * (e.g. if we're on the server)
 */

function map (cookieMap) {
  return function (name, value) {
    if (arguments.length === 2) {
      cookieMap[name] = value
    }

    return cookieMap[name]
  }
}

/**
 * Exports
 */

export default cookieMiddleware
