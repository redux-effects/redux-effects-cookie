/**
 * Imports
 */

import _cookie from 'component-cookie'

/**
 * Action types
 */

const GET_COOKIE = 'EFFECT_GET_COOKIE'
const SET_COOKIE = 'EFFECT_SET_COOKIE'

/**
 * Cookie middleware
 */

function cookieMiddleware (cookieMap) {
  const cookie = cookieMap
    ? map(cookieMap)
    : _cookie

  return ({dispatch, getState}) => next => action =>
    action.type === GET_COOKIE || action.type === SET_COOKIE
      ? Promise.resolve(handle(cookie, action))
      : next(action)
}

/**
 * Handle a cookie effect
 */

function handle (cookie, action) {
  const {name, value, opts} = action.payload

  switch (action.type) {
    case SET_COOKIE:
      return cookie(name, value, opts)
    case GET_COOKIE:
      return name ? cookie(name) : cookie()
  }
}

/**
 * Use a plain object as the source of cookie data
 * (e.g. if we're on the server)
 */

function map (cookieMap) {
  return function (name, value) {
    if (arguments.length > 1) {
      cookieMap[name] = value
    }

    return cookieMap[name]
  }
}

/**
 * Action creator
 */

function cookie (name, value, opts={}) {
  return arguments.length > 1
    ? {type: SET_COOKIE, payload: {name, value, opts}}
    : {type: GET_COOKIE, payload: {name}}
}

/**
 * Exports
 */

export default cookieMiddleware
export {
  cookie
}
