/**
 * Imports
 */

import test from 'tape'
import cookie from '../src'

/**
 * Tests
 */

test('should work', ({equal, end}) => {
  const store = cookie({})({dispatch: () => {}})(() => {})

  store({type: 'SET_COOKIE', name: 'test', value: 'testing'})
  const result = store({type: 'GET_COOKIE', name: 'test'})
  equal(result, 'testing')
  end()
})
