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

  return ({dispatch, getState}) => next => action =>
    action.type === 'GET_COOKIE' || action.type === 'SET_COOKIE'
      ? Promise.resolve(handle(cookie, action))
      : next(action)
}

/**
 * Handle a cookie effect
 */

function handle (cookie, action) {
  const {name, value, opts} = action.payload

  switch (action.type) {
    case 'SET_COOKIE':
      return cookie(name, value, opts)
    case 'GET_COOKIE':
      return cookie(name)
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
