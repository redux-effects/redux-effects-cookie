
# redux-effects-cookie

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Access and manipulate cookies in redux-effects middleware in an isomoprhic way.

## Installation

    $ npm install redux-effects-cookie

## Usage

Installation (client-side):

```javascript
import cookie from 'redux-effects-cookie'
import {applyMiddleware, createStore} from 'redux'

applyMiddleware(cookie())(createStore)
```

Installation (server-side):

```javascript
import cookie from 'redux-effects-cookie'
import {applyMiddleware, createStore} from 'redux'

function storeMiddleware (req, res, next) {
  req.store = applyMiddleware(cookie(req.cookies))(createStore)
  next()
}
```

## Example

```javascript
import {bind} from 'redux-effects'
import {cookie} from 'redux-effects-cookie'
import {createAction} from 'redux-actions'

const setAuthToken = createAction('SET_AUTH_TOKEN')

function initializeAuth () {
  return bind(cookie('authToken'), setAuthToken)
}
```

This will pass the value of the auth token cookie as the payload of the `SET_AUTH_TOKEN` action.


## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
