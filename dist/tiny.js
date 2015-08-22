(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Add or remove class
 *
 * @name classList
 * @memberof tiny
 * @param {HTMLElement} el A given HTMLElement.
 * @see Based on: <a href="http://youmightnotneedjquery.com/" target="_blank">http://youmightnotneedjquery.com/</a>
 *
 * @example
 * tiny.classList(document.body).add('ch-example');
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = classList;

function classList(el) {
    var isClassList = el.classList;

    return {
        'add': function add(className) {
            if (isClassList) {
                el.classList.add(className);
            } else {
                el.setAttribute('class', el.getAttribute('class') + ' ' + className);
            }
        },
        'remove': function remove(className) {
            if (isClassList) {
                el.classList.remove(className);
            } else {
                el.setAttribute('class', el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' '));
            }
        },
        'contains': function contains(className) {
            var exist;
            if (isClassList) {
                exist = el.classList.contains(className);
            } else {
                exist = new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
            }
            return exist;
        }
    };
}

module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = clone;

function clone(obj) {
    if (!obj || typeof obj !== 'object') {
        throw new Error('The "obj" parameter is required and must be an object.');
    }

    var copy = {},
        prop = undefined;

    for (prop in obj) {
        if (obj[prop] !== undefined) {
            copy[prop] = obj[prop];
        }
    }

    return copy;
}

module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

var _isPlainObject = require('./isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var defaults = {
    expires: '', // Empty string for session cookies
    path: '/',
    secure: false,
    domain: ''
};

var day = 60 * 60 * 24;

function get(key) {
    var collection = document.cookie.split('; '),
        value = null,
        l = collection.length;

    if (!l) {
        return value;
    }

    for (var i = 0; i < l; i++) {
        var parts = collection[i].split('='),
            _name = decodeURIComponent(parts.shift());

        if (key === _name) {
            value = decodeURIComponent(parts.join('='));
            break;
        }
    }

    return value;
}

// Then `key` contains an object with keys and values for cookies, `value` contains the options object.
function set(key, value, options) {
    options = typeof options === 'object' ? options : { expires: options };

    var expires = options.expires != null ? options.expires : defaults.expires;

    if (typeof expires === 'string' && expires !== '') {
        expires = new Date(expires);
    } else if (typeof expires === 'number') {
        expires = new Date(+new Date() + 1000 * day * expires);
    }

    if (expires && 'toGMTString' in expires) {
        expires = ';expires=' + expires.toGMTString();
    }

    var path = ';path=' + (options.path || defaults.path);

    var domain = options.domain || defaults.domain;
    domain = domain ? ';domain=' + domain : '';

    var secure = options.secure || defaults.secure ? ';secure' : '';

    if (typeof value == 'object') {
        if (Array.isArray(value) || (0, _isPlainObject2['default'])(value)) {
            value = JSON.stringify(value);
        } else {
            value = '';
        }
    }

    document.cookie = encodeCookie(key) + '=' + encodeCookie(value) + expires + path + domain + secure;
}

function remove(key) {
    set(key, '', -1);
}

function enabled() {
    if (navigator.cookieEnabled) {
        return true;
    }

    set('__', '_');
    var exist = get('__') === '_';
    remove('__');

    return exist;
}

var cookies = {
    get: get,
    set: set,
    remove: remove,
    enabled: enabled
};

exports.cookies = cookies;
/*
 * Escapes only characters that are not allowed in cookies
 */
function encodeCookie(value) {
    return String(value).replace(/[,;"\\=\s%]/g, function (character) {
        return encodeURIComponent(character);
    });
}

},{"./isPlainObject":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

/**
 * Inherits the prototype methods from one constructor into another.
 * The parent will be accessible through the obj.super_ property. Fully
 * compatible with standard node.js inherits.
 *
 * @memberof tiny
 * @param {Function} obj An object that will have the new members.
 * @param {Function} superConstructor The constructor Class.
 * @returns {Object}
 * @exampleDescription
 *
 * @example
 * tiny.inherits(obj, parent);
 */
exports['default'] = _events2['default'];
module.exports = exports['default'];

},{"events":10}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = extend;

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

var _isPlainObject = require('./isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function extend() {
    var options = undefined,
        name = undefined,
        src = undefined,
        copy = undefined,
        copyIsArray = undefined,
        clone = undefined,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && ! typeof target === 'function') {
        target = {};
    }

    // Nothing to extend, return original object
    if (length <= i) {
        return target;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && ((0, _isPlainObject2['default'])(copy) || (copyIsArray = Array.isArray(copy)))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && (0, _isPlainObject2['default'])(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                        target[name] = copy;
                    }
            }
        }
    }

    // Return the modified object
    return target;
}

module.exports = exports['default'];

},{"./isPlainObject":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _inherits = require('inherits');

var _inherits2 = _interopRequireDefault(_inherits);

/**
 * Inherits the prototype methods from one constructor into another.
 * The parent will be accessible through the obj.super_ property. Fully
 * compatible with standard node.js inherits.
 *
 * @memberof tiny
 * @param {Function} obj An object that will have the new members.
 * @param {Function} superConstructor The constructor Class.
 * @returns {Object}
 * @exampleDescription
 *
 * @example
 * tiny.inherits(obj, parent);
 */
exports['default'] = _inherits2['default'];
module.exports = exports['default'];

},{"inherits":11}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = isPlainObject;

function isPlainObject(obj) {
    // Not plain objects:
    // - null
    // - undefined
    if (obj == null) {
        return false;
    }
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if (typeof obj !== 'object' || obj.nodeType || obj === obj.window) {
        return false;
    }

    if (obj.constructor && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
        return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
}

module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = request;

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

var _extend = require('./extend');

var _extend2 = _interopRequireDefault(_extend);

function request(url, settings) {
    var args = arguments;
    var opts = undefined;

    settings = args.length === 1 ? args[0] : args[1];

    var noop = function noop() {};

    var defaults = {
        url: args.length === 2 && typeof url === 'string' ? url : '.',
        cache: true,
        data: {},
        headers: {},
        context: null,
        dataType: 'text',
        method: 'GET',
        success: noop,
        error: noop,
        complete: noop
    };

    opts = (0, _extend2['default'])(defaults, settings || {});

    var mimeTypes = {
        'application/json': 'json',
        'text/html': 'html',
        'text/plain': 'text'
    };

    var dataTypes = {};
    for (var type in mimeTypes) {
        if (mimeTypes.hasOwnProperty(type)) {
            dataTypes[mimeTypes[type]] = type;
        }
    }

    if (!opts.cache) {
        opts.url = opts.url + (opts.url.indexOf('?') ? '&' : '?') + 'nc=' + Math.floor(Math.random() * 9e9);
    }

    var complete = function complete(status, xhr) {
        opts.complete.call(opts.context, xhr, status);
    };

    var success = function success(data, xhr) {
        var status = 'success';
        opts.success.call(opts.context, data, status, xhr);
        complete(status, xhr);
    };

    var error = function error(_error, status, xhr) {
        opts.error.call(opts.context, xhr, status, _error);
        complete(status, xhr);
    };

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var result = undefined;
            var _status = xhr.status === 1223 ? 204 : xhr.status;

            if (_status >= 200 && _status < 300 || _status === 304) {
                var mime = /([\/a-z]+)(;|\s|$)/.exec(xhr.getResponseHeader('content-type'));
                var dataType = mime && mimeTypes[mime[1]] ? mimeTypes[mime[1]].toLowerCase() : 'text';
                result = xhr.responseText;

                if (dataType === 'json') {
                    try {
                        result = JSON.parse(result);
                    } catch (e) {
                        result = xhr.responseText;
                    }
                }

                success(result, xhr, opts);
            } else {
                error(new Error(xhr.statusText), 'error', xhr, opts);
            }

            return;
        }
    };

    xhr.onerror = function () {
        error(new Error(xhr.statusText || 'Network request failed'), 'error', xhr, opts);
    };

    xhr.open(opts.method, opts.url);

    if (opts.dataType && dataTypes[opts.dataType.toLowerCase()]) {
        opts.headers.Accept = dataTypes[opts.dataType.toLowerCase()] + ', */*; q=0.01';
    }

    if (opts.method === 'POST') {
        opts.headers = (0, _extend2['default'])(opts.headers, {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-type': 'application/x-www-form-urlencoded'
        });
    }

    for (var key in opts.headers) {
        xhr.setRequestHeader(key, opts.headers[key]);
    }

    xhr.send(opts.data);

    return this;
}

module.exports = exports['default'];

},{"./extend":5}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var support = {
    /**
     * Verify that CSS Transitions are supported (or any of its browser-specific implementations).
     *
     * @static
     * @type {Boolean|Object}
     * @example
     * if (tiny.support.transition) {
         *     // Some code here!
         * }
     */
    transition: transitionEnd(),

    /**
     * Verify that CSS Animations are supported (or any of its browser-specific implementations).
     *
     * @static
     * @type {Boolean|Object}
     * @example
     * if (tiny.support.animation) {
         *     // Some code here!
         * }
     */
    animation: animationEnd(),

    /**
     * Checks is the User Agent supports touch events.
     * @type {Boolean}
     * @example
     * if (tiny.support.touch) {
         *     // Some code here!
         * }
     */
    touch: 'ontouchend' in document,

    /**
     * Checks is the User Agent supports custom events.
     * @type {Boolean}
     * @example
     * if (tiny.support.customEvent) {
         *     // Some code here!
         * }
     */
    customEvent: (function () {
        // TODO: find better solution for CustomEvent check
        try {
            // IE8 has no support for CustomEvent, in IE gte 9 it cannot be
            // instantiated but exist
            new CustomEvent(name, {
                detail: {}
            });
            return true;
        } catch (e) {
            return false;
        }
    })()
};

exports.support = support;
/**
 * Checks for the CSS Transitions support (http://www.modernizr.com/)
 *
 * @function
 * @private
 */
function transitionEnd() {
    var el = document.createElement('tiny');

    var transEndEventNames = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        transition: 'transitionend'
    };

    for (var _name in transEndEventNames) {
        if (transEndEventNames.hasOwnProperty(_name) && el.style[_name] !== undefined) {
            return {
                end: transEndEventNames[_name]
            };
        }
    }

    return false;
}

/**
 * Checks for the CSS Animations support
 *
 * @function
 * @private
 */
function animationEnd() {
    var el = document.createElement('tiny');

    var animEndEventNames = {
        WebkitAnimation: 'webkitAnimationEnd',
        MozAnimation: 'animationend',
        OAnimation: 'oAnimationEnd oanimationend',
        animation: 'animationend'
    };

    for (var _name2 in animEndEventNames) {
        if (animEndEventNames.hasOwnProperty(_name2) && el.style[_name2] !== undefined) {
            return {
                end: animEndEventNames[_name2]
            };
        }
    }

    return false;
}

},{}],10:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],11:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

var _modulesClone = require('./modules/clone');

var _modulesClone2 = _interopRequireDefault(_modulesClone);

var _modulesExtend = require('./modules/extend');

var _modulesExtend2 = _interopRequireDefault(_modulesExtend);

var _modulesInherits = require('./modules/inherits');

var _modulesInherits2 = _interopRequireDefault(_modulesInherits);

var _modulesEventEmitter = require('./modules/eventEmitter');

var _modulesEventEmitter2 = _interopRequireDefault(_modulesEventEmitter);

var _modulesRequest = require('./modules/request');

var _modulesRequest2 = _interopRequireDefault(_modulesRequest);

var _modulesIsPlainObject = require('./modules/isPlainObject');

var _modulesIsPlainObject2 = _interopRequireDefault(_modulesIsPlainObject);

var _modulesSupport = require('./modules/support');

var _modulesClassList = require('./modules/classList');

var _modulesClassList2 = _interopRequireDefault(_modulesClassList);

var _modulesCookies = require('./modules/cookies');

var tiny = {
    clone: _modulesClone2['default'],
    extend: _modulesExtend2['default'],
    inherits: _modulesInherits2['default'],
    EventEmitter: _modulesEventEmitter2['default'],
    request: _modulesRequest2['default'],
    isPlainObject: _modulesIsPlainObject2['default'],
    support: _modulesSupport.support,
    classList: _modulesClassList2['default'],
    cookies: _modulesCookies.cookies
};

if (typeof window !== 'undefined') {
    window.tiny = tiny;
}

exports['default'] = tiny;
module.exports = exports['default'];

},{"./modules/classList":1,"./modules/clone":2,"./modules/cookies":3,"./modules/eventEmitter":4,"./modules/extend":5,"./modules/inherits":6,"./modules/isPlainObject":7,"./modules/request":8,"./modules/support":9}]},{},[12]);
