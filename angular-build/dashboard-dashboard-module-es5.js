function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"], {
  /***/
  "./node_modules/base64-js/index.js":
  /*!*****************************************!*\
    !*** ./node_modules/base64-js/index.js ***!
    \*****************************************/

  /*! no static exports found */

  /***/
  function node_modulesBase64JsIndexJs(module, exports, __webpack_require__) {
    "use strict";

    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    } // Support decoding URL-safe base64 strings, as Node.js does.
    // See: https://en.wikipedia.org/wiki/Base64#URL_applications


    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;

    function getLens(b64) {
      var len = b64.length;

      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
      } // Trim off extra bytes after placeholder bytes are found
      // See: https://github.com/beatgammit/base64-js/issues/42


      var validLen = b64.indexOf('=');
      if (validLen === -1) validLen = len;
      var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    } // base64 is 4/3 + up to two characters of the original data


    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }

    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }

    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0; // if there are placeholders, only get up to the last complete 4 chars

      var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i;

      for (i = 0; i < len; i += 4) {
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
      }

      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
      }

      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
      }

      return arr;
    }

    function tripletToBase64(num) {
      return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
    }

    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];

      for (var i = start; i < end; i += 3) {
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
      }

      return output.join('');
    }

    function fromByteArray(uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes

      var parts = [];
      var maxChunkLength = 16383; // must be multiple of 3
      // go through the array every three bytes, we'll deal with trailing stuff later

      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
      } // pad the end with zeros, but make sure to not forget the extra bytes


      if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
      }

      return parts.join('');
    }
    /***/

  },

  /***/
  "./node_modules/buffer/index.js":
  /*!**************************************!*\
    !*** ./node_modules/buffer/index.js ***!
    \**************************************/

  /*! no static exports found */

  /***/
  function node_modulesBufferIndexJs(module, exports, __webpack_require__) {
    "use strict";
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <http://feross.org>
     * @license  MIT
     */

    /* eslint-disable no-proto */

    var base64 = __webpack_require__(
    /*! base64-js */
    "./node_modules/base64-js/index.js");

    var ieee754 = __webpack_require__(
    /*! ieee754 */
    "./node_modules/ieee754/index.js");

    var isArray = __webpack_require__(
    /*! isarray */
    "./node_modules/isarray/index.js");

    exports.Buffer = Buffer;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    /**
     * If `Buffer.TYPED_ARRAY_SUPPORT`:
     *   === true    Use Uint8Array implementation (fastest)
     *   === false   Use Object implementation (most compatible, even IE6)
     *
     * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
     * Opera 11.6+, iOS 4.2+.
     *
     * Due to various browser bugs, sometimes the Object implementation will be used even
     * when the browser supports typed arrays.
     *
     * Note:
     *
     *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
     *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
     *
     *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
     *
     *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
     *     incorrect length in some situations.
    
     * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
     * get the Object implementation, which is slower but behaves correctly.
     */

    Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
    /*
     * Export kMaxLength after typed array support is determined.
     */

    exports.kMaxLength = kMaxLength();

    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        arr.__proto__ = {
          __proto__: Uint8Array.prototype,
          foo: function foo() {
            return 42;
          }
        };
        return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
      } catch (e) {
        return false;
      }
    }

    function kMaxLength() {
      return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
    }

    function createBuffer(that, length) {
      if (kMaxLength() < length) {
        throw new RangeError('Invalid typed array length');
      }

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        // Return an augmented `Uint8Array` instance, for best performance
        that = new Uint8Array(length);
        that.__proto__ = Buffer.prototype;
      } else {
        // Fallback: Return an object instance of the Buffer class
        if (that === null) {
          that = new Buffer(length);
        }

        that.length = length;
      }

      return that;
    }
    /**
     * The Buffer constructor returns instances of `Uint8Array` that have their
     * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
     * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
     * and the `Uint8Array` methods. Square bracket notation works as expected -- it
     * returns a single octet.
     *
     * The `Uint8Array` prototype remains unmodified.
     */


    function Buffer(arg, encodingOrOffset, length) {
      if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
        return new Buffer(arg, encodingOrOffset, length);
      } // Common case.


      if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
          throw new Error('If encoding is specified then the first argument must be a string');
        }

        return allocUnsafe(this, arg);
      }

      return from(this, arg, encodingOrOffset, length);
    }

    Buffer.poolSize = 8192; // not used by this implementation
    // TODO: Legacy, not needed anymore. Remove in next major version.

    Buffer._augment = function (arr) {
      arr.__proto__ = Buffer.prototype;
      return arr;
    };

    function from(that, value, encodingOrOffset, length) {
      if (typeof value === 'number') {
        throw new TypeError('"value" argument must not be a number');
      }

      if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
        return fromArrayBuffer(that, value, encodingOrOffset, length);
      }

      if (typeof value === 'string') {
        return fromString(that, value, encodingOrOffset);
      }

      return fromObject(that, value);
    }
    /**
     * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
     * if value is a number.
     * Buffer.from(str[, encoding])
     * Buffer.from(array)
     * Buffer.from(buffer)
     * Buffer.from(arrayBuffer[, byteOffset[, length]])
     **/


    Buffer.from = function (value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      Buffer.prototype.__proto__ = Uint8Array.prototype;
      Buffer.__proto__ = Uint8Array;

      if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
        // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
        Object.defineProperty(Buffer, Symbol.species, {
          value: null,
          configurable: true
        });
      }
    }

    function assertSize(size) {
      if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be a number');
      } else if (size < 0) {
        throw new RangeError('"size" argument must not be negative');
      }
    }

    function alloc(that, size, fill, encoding) {
      assertSize(size);

      if (size <= 0) {
        return createBuffer(that, size);
      }

      if (fill !== undefined) {
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpretted as a start offset.
        return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
      }

      return createBuffer(that, size);
    }
    /**
     * Creates a new filled Buffer instance.
     * alloc(size[, fill[, encoding]])
     **/


    Buffer.alloc = function (size, fill, encoding) {
      return alloc(null, size, fill, encoding);
    };

    function allocUnsafe(that, size) {
      assertSize(size);
      that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

      if (!Buffer.TYPED_ARRAY_SUPPORT) {
        for (var i = 0; i < size; ++i) {
          that[i] = 0;
        }
      }

      return that;
    }
    /**
     * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
     * */


    Buffer.allocUnsafe = function (size) {
      return allocUnsafe(null, size);
    };
    /**
     * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
     */


    Buffer.allocUnsafeSlow = function (size) {
      return allocUnsafe(null, size);
    };

    function fromString(that, string, encoding) {
      if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8';
      }

      if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('"encoding" must be a valid string encoding');
      }

      var length = byteLength(string, encoding) | 0;
      that = createBuffer(that, length);
      var actual = that.write(string, encoding);

      if (actual !== length) {
        // Writing a hex string, for example, that contains invalid characters will
        // cause everything after the first invalid character to be ignored. (e.g.
        // 'abxxcd' will be treated as 'ab')
        that = that.slice(0, actual);
      }

      return that;
    }

    function fromArrayLike(that, array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      that = createBuffer(that, length);

      for (var i = 0; i < length; i += 1) {
        that[i] = array[i] & 255;
      }

      return that;
    }

    function fromArrayBuffer(that, array, byteOffset, length) {
      array.byteLength; // this throws if `array` is not a valid ArrayBuffer

      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('\'offset\' is out of bounds');
      }

      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('\'length\' is out of bounds');
      }

      if (byteOffset === undefined && length === undefined) {
        array = new Uint8Array(array);
      } else if (length === undefined) {
        array = new Uint8Array(array, byteOffset);
      } else {
        array = new Uint8Array(array, byteOffset, length);
      }

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        // Return an augmented `Uint8Array` instance, for best performance
        that = array;
        that.__proto__ = Buffer.prototype;
      } else {
        // Fallback: Return an object instance of the Buffer class
        that = fromArrayLike(that, array);
      }

      return that;
    }

    function fromObject(that, obj) {
      if (Buffer.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        that = createBuffer(that, len);

        if (that.length === 0) {
          return that;
        }

        obj.copy(that, 0, 0, len);
        return that;
      }

      if (obj) {
        if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
          if (typeof obj.length !== 'number' || isnan(obj.length)) {
            return createBuffer(that, 0);
          }

          return fromArrayLike(that, obj);
        }

        if (obj.type === 'Buffer' && isArray(obj.data)) {
          return fromArrayLike(that, obj.data);
        }
      }

      throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
    }

    function checked(length) {
      // Note: cannot use `length < kMaxLength()` here because that fails when
      // length is NaN (which is otherwise coerced to zero.)
      if (length >= kMaxLength()) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
      }

      return length | 0;
    }

    function SlowBuffer(length) {
      if (+length != length) {
        // eslint-disable-line eqeqeq
        length = 0;
      }

      return Buffer.alloc(+length);
    }

    Buffer.isBuffer = function isBuffer(b) {
      return !!(b != null && b._isBuffer);
    };

    Buffer.compare = function compare(a, b) {
      if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError('Arguments must be Buffers');
      }

      if (a === b) return 0;
      var x = a.length;
      var y = b.length;

      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }

      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };

    Buffer.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return true;

        default:
          return false;
      }
    };

    Buffer.concat = function concat(list, length) {
      if (!isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }

      if (list.length === 0) {
        return Buffer.alloc(0);
      }

      var i;

      if (length === undefined) {
        length = 0;

        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }

      var buffer = Buffer.allocUnsafe(length);
      var pos = 0;

      for (i = 0; i < list.length; ++i) {
        var buf = list[i];

        if (!Buffer.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }

        buf.copy(buffer, pos);
        pos += buf.length;
      }

      return buffer;
    };

    function byteLength(string, encoding) {
      if (Buffer.isBuffer(string)) {
        return string.length;
      }

      if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
        return string.byteLength;
      }

      if (typeof string !== 'string') {
        string = '' + string;
      }

      var len = string.length;
      if (len === 0) return 0; // Use a for loop to avoid recursion

      var loweredCase = false;

      for (;;) {
        switch (encoding) {
          case 'ascii':
          case 'latin1':
          case 'binary':
            return len;

          case 'utf8':
          case 'utf-8':
          case undefined:
            return utf8ToBytes(string).length;

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return len * 2;

          case 'hex':
            return len >>> 1;

          case 'base64':
            return base64ToBytes(string).length;

          default:
            if (loweredCase) return utf8ToBytes(string).length; // assume utf8

            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }

    Buffer.byteLength = byteLength;

    function slowToString(encoding, start, end) {
      var loweredCase = false; // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
      // property of a typed array.
      // This behaves neither like String nor Uint8Array in that we set start/end
      // to their upper/lower bounds if the value passed is out of range.
      // undefined is handled specially as per ECMA-262 6th Edition,
      // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.

      if (start === undefined || start < 0) {
        start = 0;
      } // Return early if start > this.length. Done here to prevent potential uint32
      // coercion fail below.


      if (start > this.length) {
        return '';
      }

      if (end === undefined || end > this.length) {
        end = this.length;
      }

      if (end <= 0) {
        return '';
      } // Force coersion to uint32. This will also coerce falsey/NaN values to 0.


      end >>>= 0;
      start >>>= 0;

      if (end <= start) {
        return '';
      }

      if (!encoding) encoding = 'utf8';

      while (true) {
        switch (encoding) {
          case 'hex':
            return hexSlice(this, start, end);

          case 'utf8':
          case 'utf-8':
            return utf8Slice(this, start, end);

          case 'ascii':
            return asciiSlice(this, start, end);

          case 'latin1':
          case 'binary':
            return latin1Slice(this, start, end);

          case 'base64':
            return base64Slice(this, start, end);

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return utf16leSlice(this, start, end);

          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
            encoding = (encoding + '').toLowerCase();
            loweredCase = true;
        }
      }
    } // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
    // Buffer instances.


    Buffer.prototype._isBuffer = true;

    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }

    Buffer.prototype.swap16 = function swap16() {
      var len = this.length;

      if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits');
      }

      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }

      return this;
    };

    Buffer.prototype.swap32 = function swap32() {
      var len = this.length;

      if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits');
      }

      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }

      return this;
    };

    Buffer.prototype.swap64 = function swap64() {
      var len = this.length;

      if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits');
      }

      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }

      return this;
    };

    Buffer.prototype.toString = function toString() {
      var length = this.length | 0;
      if (length === 0) return '';
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };

    Buffer.prototype.equals = function equals(b) {
      if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
      if (this === b) return true;
      return Buffer.compare(this, b) === 0;
    };

    Buffer.prototype.inspect = function inspect() {
      var str = '';
      var max = exports.INSPECT_MAX_BYTES;

      if (this.length > 0) {
        str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
        if (this.length > max) str += ' ... ';
      }

      return '<Buffer ' + str + '>';
    };

    Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (!Buffer.isBuffer(target)) {
        throw new TypeError('Argument must be a Buffer');
      }

      if (start === undefined) {
        start = 0;
      }

      if (end === undefined) {
        end = target ? target.length : 0;
      }

      if (thisStart === undefined) {
        thisStart = 0;
      }

      if (thisEnd === undefined) {
        thisEnd = this.length;
      }

      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index');
      }

      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }

      if (thisStart >= thisEnd) {
        return -1;
      }

      if (start >= end) {
        return 1;
      }

      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);

      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }

      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    }; // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
    // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
    //
    // Arguments:
    // - buffer - a Buffer to search
    // - val - a string, Buffer, or number
    // - byteOffset - an index into `buffer`; will be clamped to an int32
    // - encoding - an optional encoding, relevant is val is a string
    // - dir - true for indexOf, false for lastIndexOf


    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      // Empty buffer means no match
      if (buffer.length === 0) return -1; // Normalize byteOffset

      if (typeof byteOffset === 'string') {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
      } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
      }

      byteOffset = +byteOffset; // Coerce to Number.

      if (isNaN(byteOffset)) {
        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
        byteOffset = dir ? 0 : buffer.length - 1;
      } // Normalize byteOffset: negative offsets start from the end of the buffer


      if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

      if (byteOffset >= buffer.length) {
        if (dir) return -1;else byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;else return -1;
      } // Normalize val


      if (typeof val === 'string') {
        val = Buffer.from(val, encoding);
      } // Finally, search either indexOf (if dir is true) or lastIndexOf


      if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) {
          return -1;
        }

        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === 'number') {
        val = val & 0xFF; // Search for a byte value [0-255]

        if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }

        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }

      throw new TypeError('val must be string, number or Buffer');
    }

    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;

      if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();

        if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }

          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }

      function read(buf, i) {
        if (indexSize === 1) {
          return buf[i];
        } else {
          return buf.readUInt16BE(i * indexSize);
        }
      }

      var i;

      if (dir) {
        var foundIndex = -1;

        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;

        for (i = byteOffset; i >= 0; i--) {
          var found = true;

          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }

          if (found) return i;
        }
      }

      return -1;
    }

    Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };

    Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };

    Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };

    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;

      if (!length) {
        length = remaining;
      } else {
        length = Number(length);

        if (length > remaining) {
          length = remaining;
        }
      } // must be an even number of digits


      var strLen = string.length;
      if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

      if (length > strLen / 2) {
        length = strLen / 2;
      }

      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (isNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }

      return i;
    }

    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }

    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }

    function latin1Write(buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length);
    }

    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }

    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }

    Buffer.prototype.write = function write(string, offset, length, encoding) {
      // Buffer#write(string)
      if (offset === undefined) {
        encoding = 'utf8';
        length = this.length;
        offset = 0; // Buffer#write(string, encoding)
      } else if (length === undefined && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0; // Buffer#write(string, offset[, length][, encoding])
      } else if (isFinite(offset)) {
        offset = offset | 0;

        if (isFinite(length)) {
          length = length | 0;
          if (encoding === undefined) encoding = 'utf8';
        } else {
          encoding = length;
          length = undefined;
        } // legacy write(string, encoding, offset, length) - remove in v0.13

      } else {
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
      }

      var remaining = this.length - offset;
      if (length === undefined || length > remaining) length = remaining;

      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds');
      }

      if (!encoding) encoding = 'utf8';
      var loweredCase = false;

      for (;;) {
        switch (encoding) {
          case 'hex':
            return hexWrite(this, string, offset, length);

          case 'utf8':
          case 'utf-8':
            return utf8Write(this, string, offset, length);

          case 'ascii':
            return asciiWrite(this, string, offset, length);

          case 'latin1':
          case 'binary':
            return latin1Write(this, string, offset, length);

          case 'base64':
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length);

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return ucs2Write(this, string, offset, length);

          default:
            if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
            encoding = ('' + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };

    Buffer.prototype.toJSON = function toJSON() {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };

    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }

    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;

      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;

          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 0x80) {
                codePoint = firstByte;
              }

              break;

            case 2:
              secondByte = buf[i + 1];

              if ((secondByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

                if (tempCodePoint > 0x7F) {
                  codePoint = tempCodePoint;
                }
              }

              break;

            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];

              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

                if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                  codePoint = tempCodePoint;
                }
              }

              break;

            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];

              if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

                if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                  codePoint = tempCodePoint;
                }
              }

          }
        }

        if (codePoint === null) {
          // we did not generate a valid codePoint so insert a
          // replacement char (U+FFFD) and advance only 1 byte
          codePoint = 0xFFFD;
          bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
          // encode to utf16 (surrogate pair dance)
          codePoint -= 0x10000;
          res.push(codePoint >>> 10 & 0x3FF | 0xD800);
          codePoint = 0xDC00 | codePoint & 0x3FF;
        }

        res.push(codePoint);
        i += bytesPerSequence;
      }

      return decodeCodePointsArray(res);
    } // Based on http://stackoverflow.com/a/22747272/680742, the browser with
    // the lowest limit is Chrome, with 0x10000 args.
    // We go 1 magnitude less, for safety


    var MAX_ARGUMENTS_LENGTH = 0x1000;

    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;

      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
      } // Decode in chunks to avoid "call stack size exceeded".


      var res = '';
      var i = 0;

      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }

      return res;
    }

    function asciiSlice(buf, start, end) {
      var ret = '';
      end = Math.min(buf.length, end);

      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 0x7F);
      }

      return ret;
    }

    function latin1Slice(buf, start, end) {
      var ret = '';
      end = Math.min(buf.length, end);

      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }

      return ret;
    }

    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      var out = '';

      for (var i = start; i < end; ++i) {
        out += toHex(buf[i]);
      }

      return out;
    }

    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = '';

      for (var i = 0; i < bytes.length; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }

      return res;
    }

    Buffer.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === undefined ? len : ~~end;

      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }

      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }

      if (end < start) end = start;
      var newBuf;

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer(sliceLen, undefined);

        for (var i = 0; i < sliceLen; ++i) {
          newBuf[i] = this[i + start];
        }
      }

      return newBuf;
    };
    /*
     * Need to make sure that buffer isn't trying to write out of bounds.
     */


    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
      if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
    }

    Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;

      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
      }

      return val;
    };

    Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;

      if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
      }

      var val = this[offset + --byteLength];
      var mul = 1;

      while (byteLength > 0 && (mul *= 0x100)) {
        val += this[offset + --byteLength] * mul;
      }

      return val;
    };

    Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };

    Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };

    Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };

    Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
    };

    Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };

    Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;

      while (++i < byteLength && (mul *= 0x100)) {
        val += this[offset + i] * mul;
      }

      mul *= 0x80;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength);
      return val;
    };

    Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
      offset = offset | 0;
      byteLength = byteLength | 0;
      if (!noAssert) checkOffset(offset, byteLength, this.length);
      var i = byteLength;
      var mul = 1;
      var val = this[offset + --i];

      while (i > 0 && (mul *= 0x100)) {
        val += this[offset + --i] * mul;
      }

      mul *= 0x80;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength);
      return val;
    };

    Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 0x80)) return this[offset];
      return (0xff - this[offset] + 1) * -1;
    };

    Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 0x8000 ? val | 0xFFFF0000 : val;
    };

    Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 0x8000 ? val | 0xFFFF0000 : val;
    };

    Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };

    Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };

    Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };

    Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };

    Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };

    Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };

    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError('Index out of range');
    }

    Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength = byteLength | 0;

      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
      }

      var mul = 1;
      var i = 0;
      this[offset] = value & 0xFF;

      while (++i < byteLength && (mul *= 0x100)) {
        this[offset + i] = value / mul & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength = byteLength | 0;

      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
      }

      var i = byteLength - 1;
      var mul = 1;
      this[offset + i] = value & 0xFF;

      while (--i >= 0 && (mul *= 0x100)) {
        this[offset + i] = value / mul & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
      if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      this[offset] = value & 0xff;
      return offset + 1;
    };

    function objectWriteUInt16(buf, value, offset, littleEndian) {
      if (value < 0) value = 0xffff + value + 1;

      for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
        buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
      }
    }

    Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 0xff;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }

      return offset + 2;
    };

    Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 0xff;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }

      return offset + 2;
    };

    function objectWriteUInt32(buf, value, offset, littleEndian) {
      if (value < 0) value = 0xffffffff + value + 1;

      for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
        buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
      }
    }

    Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 0xff;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }

      return offset + 4;
    };

    Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 0xff;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }

      return offset + 4;
    };

    Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;

      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }

      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 0xFF;

      while (++i < byteLength && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }

        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
      value = +value;
      offset = offset | 0;

      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
      }

      var i = byteLength - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 0xFF;

      while (--i >= 0 && (mul *= 0x100)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }

        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
      }

      return offset + byteLength;
    };

    Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
      if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
      if (value < 0) value = 0xff + value + 1;
      this[offset] = value & 0xff;
      return offset + 1;
    };

    Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 0xff;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }

      return offset + 2;
    };

    Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 0xff;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }

      return offset + 2;
    };

    Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 0xff;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }

      return offset + 4;
    };

    Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
      if (value < 0) value = 0xffffffff + value + 1;

      if (Buffer.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 0xff;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }

      return offset + 4;
    };

    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length) throw new RangeError('Index out of range');
      if (offset < 0) throw new RangeError('Index out of range');
    }

    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
      }

      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }

    Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };

    Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };

    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
      }

      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }

    Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };

    Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    }; // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)


    Buffer.prototype.copy = function copy(target, targetStart, start, end) {
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

      if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds');
      }

      if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
      if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

      if (end > this.length) end = this.length;

      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }

      var len = end - start;
      var i;

      if (this === target && start < targetStart && targetStart < end) {
        // descending copy from end
        for (i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
        // ascending copy from start
        for (i = 0; i < len; ++i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
      }

      return len;
    }; // Usage:
    //    buffer.fill(number[, offset[, end]])
    //    buffer.fill(buffer[, offset[, end]])
    //    buffer.fill(string[, offset[, end]][, encoding])


    Buffer.prototype.fill = function fill(val, start, end, encoding) {
      // Handle string cases:
      if (typeof val === 'string') {
        if (typeof start === 'string') {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === 'string') {
          encoding = end;
          end = this.length;
        }

        if (val.length === 1) {
          var code = val.charCodeAt(0);

          if (code < 256) {
            val = code;
          }
        }

        if (encoding !== undefined && typeof encoding !== 'string') {
          throw new TypeError('encoding must be a string');
        }

        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
          throw new TypeError('Unknown encoding: ' + encoding);
        }
      } else if (typeof val === 'number') {
        val = val & 255;
      } // Invalid ranges are not set to a default, so can range check early.


      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index');
      }

      if (end <= start) {
        return this;
      }

      start = start >>> 0;
      end = end === undefined ? this.length : end >>> 0;
      if (!val) val = 0;
      var i;

      if (typeof val === 'number') {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
        var len = bytes.length;

        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }

      return this;
    }; // HELPER FUNCTIONS
    // ================


    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

    function base64clean(str) {
      // Node strips out invalid characters like \n and \t from the string, base64-js does not
      str = stringtrim(str).replace(INVALID_BASE64_RE, ''); // Node converts strings with length < 2 to ''

      if (str.length < 2) return ''; // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not

      while (str.length % 4 !== 0) {
        str = str + '=';
      }

      return str;
    }

    function stringtrim(str) {
      if (str.trim) return str.trim();
      return str.replace(/^\s+|\s+$/g, '');
    }

    function toHex(n) {
      if (n < 16) return '0' + n.toString(16);
      return n.toString(16);
    }

    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];

      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i); // is surrogate component

        if (codePoint > 0xD7FF && codePoint < 0xE000) {
          // last char was a lead
          if (!leadSurrogate) {
            // no lead yet
            if (codePoint > 0xDBFF) {
              // unexpected trail
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue;
            } else if (i + 1 === length) {
              // unpaired lead
              if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              continue;
            } // valid lead


            leadSurrogate = codePoint;
            continue;
          } // 2 leads in a row


          if (codePoint < 0xDC00) {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            leadSurrogate = codePoint;
            continue;
          } // valid surrogate pair


          codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) {
          // valid bmp char, but last char was a lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }

        leadSurrogate = null; // encode utf8

        if (codePoint < 0x80) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 0x800) {
          if ((units -= 2) < 0) break;
          bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
          if ((units -= 3) < 0) break;
          bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
          if ((units -= 4) < 0) break;
          bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else {
          throw new Error('Invalid code point');
        }
      }

      return bytes;
    }

    function asciiToBytes(str) {
      var byteArray = [];

      for (var i = 0; i < str.length; ++i) {
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xFF);
      }

      return byteArray;
    }

    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];

      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }

      return byteArray;
    }

    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }

    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }

      return i;
    }

    function isnan(val) {
      return val !== val; // eslint-disable-line no-self-compare
    }
    /***/

  },

  /***/
  "./node_modules/emitter-component/index.js":
  /*!*************************************************!*\
    !*** ./node_modules/emitter-component/index.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function node_modulesEmitterComponentIndexJs(module, exports) {
    /**
     * Expose `Emitter`.
     */
    module.exports = Emitter;
    /**
     * Initialize a new `Emitter`.
     *
     * @api public
     */

    function Emitter(obj) {
      if (obj) return mixin(obj);
    }

    ;
    /**
     * Mixin the emitter properties.
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */

    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }

      return obj;
    }
    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks[event] = this._callbacks[event] || []).push(fn);
      return this;
    };
    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.once = function (event, fn) {
      var self = this;
      this._callbacks = this._callbacks || {};

      function on() {
        self.off(event, on);
        fn.apply(this, arguments);
      }

      on.fn = fn;
      this.on(event, on);
      return this;
    };
    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
      this._callbacks = this._callbacks || {}; // all

      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      } // specific event


      var callbacks = this._callbacks[event];
      if (!callbacks) return this; // remove all handlers

      if (1 == arguments.length) {
        delete this._callbacks[event];
        return this;
      } // remove specific handler


      var cb;

      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];

        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }

      return this;
    };
    /**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */


    Emitter.prototype.emit = function (event) {
      this._callbacks = this._callbacks || {};
      var args = [].slice.call(arguments, 1),
          callbacks = this._callbacks[event];

      if (callbacks) {
        callbacks = callbacks.slice(0);

        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }

      return this;
    };
    /**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */


    Emitter.prototype.listeners = function (event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks[event] || [];
    };
    /**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */


    Emitter.prototype.hasListeners = function (event) {
      return !!this.listeners(event).length;
    };
    /***/

  },

  /***/
  "./node_modules/events/events.js":
  /*!***************************************!*\
    !*** ./node_modules/events/events.js ***!
    \***************************************/

  /*! no static exports found */

  /***/
  function node_modulesEventsEventsJs(module, exports, __webpack_require__) {
    "use strict"; // Copyright Joyent, Inc. and other Node contributors.
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

    var R = typeof Reflect === 'object' ? Reflect : null;
    var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;

    if (R && typeof R.ownKeys === 'function') {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target);
      };
    }

    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }

    var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
      return value !== value;
    };

    function EventEmitter() {
      EventEmitter.init.call(this);
    }

    module.exports = EventEmitter; // Backwards-compat with node 0.10.x

    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = undefined;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
    // added to it. This is a useful default which helps finding memory leaks.

    var defaultMaxListeners = 10;

    function checkListener(listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }

    Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
      enumerable: true,
      get: function get() {
        return defaultMaxListeners;
      },
      set: function set(arg) {
        if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
        }

        defaultMaxListeners = arg;
      }
    });

    EventEmitter.init = function () {
      if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      }

      this._maxListeners = this._maxListeners || undefined;
    }; // Obviously not all Emitters should be limited to 10. This function allows
    // that to be increased. Set to zero for unlimited.


    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
      }

      this._maxListeners = n;
      return this;
    };

    function _getMaxListeners(that) {
      if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }

    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };

    EventEmitter.prototype.emit = function emit(type) {
      var args = [];

      for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      var doError = type === 'error';
      var events = this._events;
      if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

      if (doError) {
        var er;
        if (args.length > 0) er = args[0];

        if (er instanceof Error) {
          // Note: The comments on the `throw` lines are intentional, they show
          // up in Node's output if this results in an unhandled exception.
          throw er; // Unhandled 'error' event
        } // At least give some kind of context to the user


        var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
      }

      var handler = events[type];
      if (handler === undefined) return false;

      if (typeof handler === 'function') {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);

        for (var i = 0; i < len; ++i) {
          ReflectApply(listeners[i], this, args);
        }
      }

      return true;
    };

    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;

      if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
      } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
          target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
          // this._events to be assigned to a new object

          events = target._events;
        }

        existing = events[type];
      }

      if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === 'function') {
          // Adding the second element, need to change to array.
          existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        } // Check for listener leak


        m = _getMaxListeners(target);

        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true; // No error code for this since it is a Warning
          // eslint-disable-next-line no-restricted-syntax

          var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }

      return target;
    }

    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };

    EventEmitter.prototype.on = EventEmitter.prototype.addListener;

    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }

    function _onceWrap(target, type, listener) {
      var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
      };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }

    EventEmitter.prototype.once = function once(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };

    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    }; // Emits a 'removeListener' event if and only if the listener was removed.


    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === undefined) return this;
      list = events[type];
      if (list === undefined) return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = Object.create(null);else {
          delete events[type];
          if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0) return this;
        if (position === 0) list.shift();else {
          spliceOne(list, position);
        }
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === undefined) return this; // not listening for removeListener, no need to emit

      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
        }

        return this;
      } // emit removeListener for all listeners on all events


      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;

        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }

        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === undefined) return [];
      var evlistener = events[type];
      if (evlistener === undefined) return [];
      if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }

    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };

    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };

    EventEmitter.listenerCount = function (emitter, type) {
      if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };

    EventEmitter.prototype.listenerCount = listenerCount;

    function listenerCount(type) {
      var events = this._events;

      if (events !== undefined) {
        var evlistener = events[type];

        if (typeof evlistener === 'function') {
          return 1;
        } else if (evlistener !== undefined) {
          return evlistener.length;
        }
      }

      return 0;
    }

    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };

    function arrayClone(arr, n) {
      var copy = new Array(n);

      for (var i = 0; i < n; ++i) {
        copy[i] = arr[i];
      }

      return copy;
    }

    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++) {
        list[index] = list[index + 1];
      }

      list.pop();
    }

    function unwrapListeners(arr) {
      var ret = new Array(arr.length);

      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }

      return ret;
    }
    /***/

  },

  /***/
  "./node_modules/ieee754/index.js":
  /*!***************************************!*\
    !*** ./node_modules/ieee754/index.js ***!
    \***************************************/

  /*! no static exports found */

  /***/
  function node_modulesIeee754IndexJs(module, exports) {
    exports.read = function (buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;

      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;

      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }

      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };

    exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);

      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);

        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }

        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }

        if (value * c >= 2) {
          e++;
          c /= 2;
        }

        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }

      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

      e = e << mLen | m;
      eLen += mLen;

      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

      buffer[offset + i - d] |= s * 128;
    };
    /***/

  },

  /***/
  "./node_modules/isarray/index.js":
  /*!***************************************!*\
    !*** ./node_modules/isarray/index.js ***!
    \***************************************/

  /*! no static exports found */

  /***/
  function node_modulesIsarrayIndexJs(module, exports) {
    var toString = {}.toString;

    module.exports = Array.isArray || function (arr) {
      return toString.call(arr) == '[object Array]';
    };
    /***/

  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/accountsummary/accountsummary.component.html":
  /*!**************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/accountsummary/accountsummary.component.html ***!
    \**************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDashboardAccountsummaryAccountsummaryComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<!--<H1>ACCOUNT SUMMARY OF 'XXX1234'</H1>\r\n<div style=\"display: flex\">\r\n    <div>\r\n        <div>SPENDING LIMIT</div>\r\n        <H5>$30000</H5>\r\n    </div>\r\n    <div>\r\n        <div>DISCOUNTER BALANCE</div>\r\n        <H5>$10000</H5>\r\n    </div>\r\n    <div>\r\n        <div>PENDING ACCOUNTS</div>\r\n        <H5>$500</H5>\r\n    </div>\r\n    <div>\r\n        <div>SPENDING AVAILABILITY</div>\r\n        <H5>$19000</H5>\r\n    </div>\r\n    <div>\r\n        <div>DAILY SPEND LIMIT</div>\r\n        <H5>$10000</H5>\r\n    </div>\r\n</div>-->\r\n<section id=\"ac_summery\">\r\n    <div class=\"container card p-4\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\" id=\"summaryheading\">\r\n                    <h5>ACCOUNT SUMMARY OF 'XXX1234'</h5>\r\n                </div>\r\n            </div>\r\n            <div class=\"row pt-3\">\r\n                <div class=\"col-md-12 d-flex align-items-center justify-content-between\">\r\n                    <div class=\"text-center\">\r\n                        <div class=\"spending-l-imit\">SPENDING LIMIT</div>\r\n                        <H5 style=\"color:#3FC0EF\">$30000</H5>\r\n                    </div>\r\n                    <div>-</div>\r\n                    <div class=\"text-center\">\r\n                        <div class=\"spending-l-imit\">DISCOUNTER BALANCE</div>\r\n                        <H5 style=\"color:#CFAC1F\">$10000</H5>\r\n                    </div>\r\n                    <div>-</div>\r\n                    <div class=\"text-center\">\r\n                        <div class=\"spending-l-imit\">PENDING ACCOUNTS</div>\r\n                        <H5 style=\"color:#542D87\">$500</H5>\r\n                    </div>\r\n                    <div>=</div>\r\n                    <div class=\"text-center\">\r\n                        <div class=\"spending-l-imit\">SPENDING AVAILABILITY</div>\r\n                        <H5 style=\"color:#D56926\">$19500</H5>\r\n                    </div>\r\n                    <div  class=\"text-center lead\"> \r\n                        <div class=\"spending-l-imit\">DAILY SPEND LIMIT</div>\r\n                        <H5 style=\"color:#E5298A\">$10000</H5>\r\n                    </div>\r\n               \r\n                </div>\r\n            </div>\r\n        \r\n    </div>\r\n</section>\r\n\r\n";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.component.html":
  /*!******************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.component.html ***!
    \******************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDashboardDashboardComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div id=\"background\"></div>\r\n<app-header></app-header>\r\n<app-shortcuts></app-shortcuts>\r\n<app-accountsummary></app-accountsummary>\r\n<app-ministatement></app-ministatement>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/ministatement/ministatement.component.html":
  /*!************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/ministatement/ministatement.component.html ***!
    \************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDashboardMinistatementMinistatementComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<div id=\"Div3\" class=\"row\">\r\n    <div id=\"Div4\" class=\"panel-grid panel-has-style\" style=\"width:100%\">\r\n        <div class=\"hexagonbg bottom panel-row-style panel-row-style-for-11-2\">\r\n            <div id=\"Div15\" class=\"panel-grid-cell panel-grid-cell-empty\"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id=\"Div1\" class=\"row\">\r\n    &nbsp;\r\n</div>\r\n<div>\r\n    <div class=\"container card p-4\">\r\n        <div class=\"row\">\r\n            <div class=\"col-sm-2 col-md-2 col-lg-2\">\r\n            </div>\r\n            <div class=\"col-sm-12 col-md-12 col-lg-12\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-12\" id=\"summaryheading\">\r\n                        <h5>Mini Statement</h5>\r\n                    </div>\r\n                </div>\r\n                <div class=\"\">\r\n                    \r\n                    <div class=\"table-responsive\">\r\n                        <!--<table class=\"table table-hover table-outline table-vcenter text-nowrap card-table\"  width=\"100%\">-->\r\n                        <table class=\"table table-hover table-vcenter\" width=\"100%\">\r\n                            <thead>\r\n                                <tr>\r\n                                    <th class=\"w-1p textwidget custom-html-widget\">\r\n                                        Date\r\n                                    </th>\r\n                                    <th class=\"textwidget custom-html-widget\">\r\n                                        Decription\r\n                                    </th>\r\n                                    <th style=\"text-align: center\" class=\"textwidget custom-html-widget\">\r\n                                        UPI TRANSACTION ID\r\n                                    </th>\r\n                                    <th style=\"text-align: center\" class=\"textwidget custom-html-widget\">\r\n                                        Amount\r\n                                    </th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngFor=\"let transaction of ministatement\">\r\n                                    <td style=\"padding: 10px;\" class=\"textwidget custom-html-widget\">\r\n                                        <span class=\"text-muted\">{{transaction.SUBMITDATE|date}}</span>\r\n                                    </td>\r\n                                    <td style=\"padding: 10px;\" class=\"textwidget custom-html-widget\">{{transaction.LENAME}}\r\n                                    </td>\r\n                                    <td style=\"text-align: center; padding: 10px;\" class=\"textwidget custom-html-widget\">{{transaction.PCBFAPPID}}\r\n                                    </td>\r\n                                    <td style=\"text-align: center; padding: 10px;\" class=\"textwidget custom-html-widget\">{{transaction.EXTAPPID[0]|currency}}\r\n                                    </td>\r\n                                    <td style=\"padding: 10px;\" class=\"textwidget custom-html-widget\">\r\n                                        &nbsp;\r\n                                    </td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/shortcuts/shortcuts.component.html":
  /*!****************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/shortcuts/shortcuts.component.html ***!
    \****************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppDashboardShortcutsShortcutsComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<!--<div style=\"display: flex\" class=\"container\">\r\n    <div>Account Overview</div>\r\n    <div>Request limit Increase</div>\r\n    <div>Request Cash Draw</div>\r\n    <div>Payment Calendar</div>\r\n    <div>Transaction History</div>\r\n    <div>Rewards</div>\r\n</div>-->\r\n<section id=\"short_cut\" class=\"py-4\">\r\n    <div class=\"container\">\r\n        <nav class=\"nav flex-column\">\r\n            <ul class=\"nav nav-pills nav-justified\">\r\n                <li class=\"nav-item\">\r\n                  <a class=\"nav-link active\" href=\"#\">Account Overview</a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                  <a class=\"nav-link\" href=\"#\">Request limit Increase</a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                  <a class=\"nav-link\" href=\"#\">Request Cash Draw</a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                  <a class=\"nav-link\" href=\"#\" >Payment Calendar</a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" href=\"#\" >Transaction History</a>\r\n                </li>\r\n                <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" href=\"#\" >Rewards</a>\r\n                </li>\r\n              </ul>\r\n          </nav>\r\n    </div>\r\n</section>\r\n";
    /***/
  },

  /***/
  "./node_modules/safe-buffer/index.js":
  /*!*******************************************!*\
    !*** ./node_modules/safe-buffer/index.js ***!
    \*******************************************/

  /*! no static exports found */

  /***/
  function node_modulesSafeBufferIndexJs(module, exports, __webpack_require__) {
    /* eslint-disable node/no-deprecated-api */
    var buffer = __webpack_require__(
    /*! buffer */
    "./node_modules/buffer/index.js");

    var Buffer = buffer.Buffer; // alternative to using Object.keys for old browsers

    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }

    if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      // Copy properties from require('buffer')
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }

    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer(arg, encodingOrOffset, length);
    } // Copy static methods from Buffer


    copyProps(Buffer, SafeBuffer);

    SafeBuffer.from = function (arg, encodingOrOffset, length) {
      if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
      }

      return Buffer(arg, encodingOrOffset, length);
    };

    SafeBuffer.alloc = function (size, fill, encoding) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
      }

      var buf = Buffer(size);

      if (fill !== undefined) {
        if (typeof encoding === 'string') {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }

      return buf;
    };

    SafeBuffer.allocUnsafe = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
      }

      return Buffer(size);
    };

    SafeBuffer.allocUnsafeSlow = function (size) {
      if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
      }

      return buffer.SlowBuffer(size);
    };
    /***/

  },

  /***/
  "./node_modules/stream/index.js":
  /*!**************************************!*\
    !*** ./node_modules/stream/index.js ***!
    \**************************************/

  /*! no static exports found */

  /***/
  function node_modulesStreamIndexJs(module, exports, __webpack_require__) {
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
    var Emitter = __webpack_require__(
    /*! emitter */
    "./node_modules/emitter-component/index.js");

    function Stream() {
      Emitter.call(this);
    }

    Stream.prototype = new Emitter();
    module.exports = Stream; // Backwards-compat with node 0.4.x

    Stream.Stream = Stream;

    Stream.prototype.pipe = function (dest, options) {
      var source = this;

      function ondata(chunk) {
        if (dest.writable) {
          if (false === dest.write(chunk) && source.pause) {
            source.pause();
          }
        }
      }

      source.on('data', ondata);

      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }

      dest.on('drain', ondrain); // If the 'end' option is not supplied, dest.end() will be called when
      // source gets the 'end' or 'close' events.  Only dest.end() once.

      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on('end', onend);
        source.on('close', onclose);
      }

      var didOnEnd = false;

      function onend() {
        if (didOnEnd) return;
        didOnEnd = true;
        dest.end();
      }

      function onclose() {
        if (didOnEnd) return;
        didOnEnd = true;
        if (typeof dest.destroy === 'function') dest.destroy();
      } // don't leave dangling pipes when there are errors.


      function onerror(er) {
        cleanup();

        if (!this.hasListeners('error')) {
          throw er; // Unhandled stream error in pipe.
        }
      }

      source.on('error', onerror);
      dest.on('error', onerror); // remove all the event listeners that were added.

      function cleanup() {
        source.off('data', ondata);
        dest.off('drain', ondrain);
        source.off('end', onend);
        source.off('close', onclose);
        source.off('error', onerror);
        dest.off('error', onerror);
        source.off('end', cleanup);
        source.off('close', cleanup);
        dest.off('end', cleanup);
        dest.off('close', cleanup);
      }

      source.on('end', cleanup);
      source.on('close', cleanup);
      dest.on('end', cleanup);
      dest.on('close', cleanup);
      dest.emit('pipe', source); // Allow for unix-like usage: A.pipe(B).pipe(C)

      return dest;
    };
    /***/

  },

  /***/
  "./node_modules/string_decoder/lib/string_decoder.js":
  /*!***********************************************************!*\
    !*** ./node_modules/string_decoder/lib/string_decoder.js ***!
    \***********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesString_decoderLibString_decoderJs(module, exports, __webpack_require__) {
    "use strict"; // Copyright Joyent, Inc. and other Node contributors.
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

    /*<replacement>*/

    var Buffer = __webpack_require__(
    /*! safe-buffer */
    "./node_modules/safe-buffer/index.js").Buffer;
    /*</replacement>*/


    var isEncoding = Buffer.isEncoding || function (encoding) {
      encoding = '' + encoding;

      switch (encoding && encoding.toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
          return true;

        default:
          return false;
      }
    };

    function _normalizeEncoding(enc) {
      if (!enc) return 'utf8';
      var retried;

      while (true) {
        switch (enc) {
          case 'utf8':
          case 'utf-8':
            return 'utf8';

          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return 'utf16le';

          case 'latin1':
          case 'binary':
            return 'latin1';

          case 'base64':
          case 'ascii':
          case 'hex':
            return enc;

          default:
            if (retried) return; // undefined

            enc = ('' + enc).toLowerCase();
            retried = true;
        }
      }
    }

    ; // Do not cache `Buffer.isEncoding` when checking encoding names as some
    // modules monkey-patch it to support additional encodings

    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);

      if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
      return nenc || enc;
    } // StringDecoder provides an interface for efficiently splitting a series of
    // buffers into a series of JS strings without breaking apart multi-byte
    // characters.


    exports.StringDecoder = StringDecoder;

    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;

      switch (this.encoding) {
        case 'utf16le':
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;

        case 'utf8':
          this.fillLast = utf8FillLast;
          nb = 4;
          break;

        case 'base64':
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;

        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }

      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer.allocUnsafe(nb);
    }

    StringDecoder.prototype.write = function (buf) {
      if (buf.length === 0) return '';
      var r;
      var i;

      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return '';
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }

      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || '';
    };

    StringDecoder.prototype.end = utf8End; // Returns only complete characters in a Buffer

    StringDecoder.prototype.text = utf8Text; // Attempts to complete a partial non-UTF-8 character using bytes from a Buffer

    StringDecoder.prototype.fillLast = function (buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }

      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    }; // Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
    // continuation byte. If an invalid byte is detected, -2 is returned.


    function utf8CheckByte(byte) {
      if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
      return byte >> 6 === 0x02 ? -1 : -2;
    } // Checks at most 3 bytes at the end of a Buffer in order to detect an
    // incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
    // needed to complete the UTF-8 character (if applicable) are returned.


    function utf8CheckIncomplete(self, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);

      if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
      }

      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);

      if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
      }

      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);

      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
        }

        return nb;
      }

      return 0;
    } // Validates as many continuation bytes for a multi-byte UTF-8 character as
    // needed or are available. If we see a non-continuation byte where we expect
    // one, we "replace" the validated continuation bytes we've seen so far with
    // a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
    // behavior. The continuation byte check is included three times in the case
    // where all of the continuation bytes for a character exist in the same buffer.
    // It is also done this way as a slight performance increase instead of using a
    // loop.


    function utf8CheckExtraBytes(self, buf, p) {
      if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return "\uFFFD";
      }

      if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
          self.lastNeed = 1;
          return "\uFFFD";
        }

        if (self.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 0xC0) !== 0x80) {
            self.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    } // Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.


    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== undefined) return r;

      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }

      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    } // Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
    // partial character, the character's bytes are buffered until the required
    // number of bytes are available.


    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString('utf8', i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString('utf8', i, end);
    } // For UTF-8, a replacement character is added when ending on a partial
    // character.


    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) return r + "\uFFFD";
      return r;
    } // UTF-16LE typically needs two bytes per character, but even if we have an even
    // number of bytes available, we need to check if we end on a leading/high
    // surrogate. In that case, we need to wait for the next two bytes in order to
    // decode the last character properly.


    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);

        if (r) {
          var c = r.charCodeAt(r.length - 1);

          if (c >= 0xD800 && c <= 0xDBFF) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }

        return r;
      }

      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString('utf16le', i, buf.length - 1);
    } // For UTF-16LE we do not explicitly append special replacement characters if we
    // end on a partial character, we simply let v8 handle that.


    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';

      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
      }

      return r;
    }

    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0) return buf.toString('base64', i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;

      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }

      return buf.toString('base64', i, buf.length - n);
    }

    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : '';
      if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
      return r;
    } // Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)


    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }

    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : '';
    }
    /***/

  },

  /***/
  "./node_modules/timers/index.js":
  /*!**************************************!*\
    !*** ./node_modules/timers/index.js ***!
    \**************************************/

  /*! no static exports found */

  /***/
  function node_modulesTimersIndexJs(module, exports) {
    exports.every = function (str) {
      return new Every(str);
    };
    /*
      Time map
    */


    var time = {
      millisecond: 1,
      second: 1000,
      minute: 60000,
      hour: 3600000,
      day: 86400000
    };

    for (var key in time) {
      if (key === 'millisecond') {
        time.ms = time[key];
      } else {
        time[key.charAt(0)] = time[key];
      }

      time[key + 's'] = time[key];
    }
    /*
      Every constructor
    */


    function Every(str) {
      this.count = 0;
      var m = parse(str);

      if (m) {
        this.time = Number(m[0]) * time[m[1]];
        this.type = m[1];
      }
    }

    Every.prototype.do = function (cb) {
      if (this.time) {
        this.interval = setInterval(callback, this.time);
      }

      var that = this;

      function callback() {
        that.count++;
        cb.call(that);
      }

      return this;
    };

    Every.prototype.stop = function () {
      if (this.interval) {
        clearInterval(this.interval);
        delete this.interval;
      }

      return this;
    };
    /*
      Convert string to milliseconds
    
        ms, millisecond(s)?
        s, second(s)?
        m, minute(s)?
        h, hour(s)?
        d, day(s)?
    */


    var reg = /^\s*(\d+(?:\.\d+)?)\s*([a-z]+)\s*$/;

    function parse(str) {
      var m = str.match(reg);

      if (m && time[m[2]]) {
        return m.slice(1);
      }

      return null;
    }
    /***/

  },

  /***/
  "./node_modules/xml2js/lib/bom.js":
  /*!****************************************!*\
    !*** ./node_modules/xml2js/lib/bom.js ***!
    \****************************************/

  /*! no static exports found */

  /***/
  function node_modulesXml2jsLibBomJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      "use strict";

      exports.stripBOM = function (str) {
        if (str[0] === "\uFEFF") {
          return str.substring(1);
        } else {
          return str;
        }
      };
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xml2js/lib/builder.js":
  /*!********************************************!*\
    !*** ./node_modules/xml2js/lib/builder.js ***!
    \********************************************/

  /*! no static exports found */

  /***/
  function node_modulesXml2jsLibBuilderJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      "use strict";

      var builder,
          defaults,
          escapeCDATA,
          requiresCDATA,
          wrapCDATA,
          hasProp = {}.hasOwnProperty;
      builder = __webpack_require__(
      /*! xmlbuilder */
      "./node_modules/xmlbuilder/lib/index.js");
      defaults = __webpack_require__(
      /*! ./defaults */
      "./node_modules/xml2js/lib/defaults.js").defaults;

      requiresCDATA = function requiresCDATA(entry) {
        return typeof entry === "string" && (entry.indexOf('&') >= 0 || entry.indexOf('>') >= 0 || entry.indexOf('<') >= 0);
      };

      wrapCDATA = function wrapCDATA(entry) {
        return "<![CDATA[" + escapeCDATA(entry) + "]]>";
      };

      escapeCDATA = function escapeCDATA(entry) {
        return entry.replace(']]>', ']]]]><![CDATA[>');
      };

      exports.Builder = function () {
        function Builder(opts) {
          var key, ref, value;
          this.options = {};
          ref = defaults["0.2"];

          for (key in ref) {
            if (!hasProp.call(ref, key)) continue;
            value = ref[key];
            this.options[key] = value;
          }

          for (key in opts) {
            if (!hasProp.call(opts, key)) continue;
            value = opts[key];
            this.options[key] = value;
          }
        }

        Builder.prototype.buildObject = function (rootObj) {
          var attrkey, charkey, render, rootElement, rootName;
          attrkey = this.options.attrkey;
          charkey = this.options.charkey;

          if (Object.keys(rootObj).length === 1 && this.options.rootName === defaults['0.2'].rootName) {
            rootName = Object.keys(rootObj)[0];
            rootObj = rootObj[rootName];
          } else {
            rootName = this.options.rootName;
          }

          render = function (_this) {
            return function (element, obj) {
              var attr, child, entry, index, key, value;

              if (typeof obj !== 'object') {
                if (_this.options.cdata && requiresCDATA(obj)) {
                  element.raw(wrapCDATA(obj));
                } else {
                  element.txt(obj);
                }
              } else if (Array.isArray(obj)) {
                for (index in obj) {
                  if (!hasProp.call(obj, index)) continue;
                  child = obj[index];

                  for (key in child) {
                    entry = child[key];
                    element = render(element.ele(key), entry).up();
                  }
                }
              } else {
                for (key in obj) {
                  if (!hasProp.call(obj, key)) continue;
                  child = obj[key];

                  if (key === attrkey) {
                    if (typeof child === "object") {
                      for (attr in child) {
                        value = child[attr];
                        element = element.att(attr, value);
                      }
                    }
                  } else if (key === charkey) {
                    if (_this.options.cdata && requiresCDATA(child)) {
                      element = element.raw(wrapCDATA(child));
                    } else {
                      element = element.txt(child);
                    }
                  } else if (Array.isArray(child)) {
                    for (index in child) {
                      if (!hasProp.call(child, index)) continue;
                      entry = child[index];

                      if (typeof entry === 'string') {
                        if (_this.options.cdata && requiresCDATA(entry)) {
                          element = element.ele(key).raw(wrapCDATA(entry)).up();
                        } else {
                          element = element.ele(key, entry).up();
                        }
                      } else {
                        element = render(element.ele(key), entry).up();
                      }
                    }
                  } else if (typeof child === "object") {
                    element = render(element.ele(key), child).up();
                  } else {
                    if (typeof child === 'string' && _this.options.cdata && requiresCDATA(child)) {
                      element = element.ele(key).raw(wrapCDATA(child)).up();
                    } else {
                      if (child == null) {
                        child = '';
                      }

                      element = element.ele(key, child.toString()).up();
                    }
                  }
                }
              }

              return element;
            };
          }(this);

          rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
            headless: this.options.headless,
            allowSurrogateChars: this.options.allowSurrogateChars
          });
          return render(rootElement, rootObj).end(this.options.renderOpts);
        };

        return Builder;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xml2js/lib/defaults.js":
  /*!*********************************************!*\
    !*** ./node_modules/xml2js/lib/defaults.js ***!
    \*********************************************/

  /*! no static exports found */

  /***/
  function node_modulesXml2jsLibDefaultsJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      exports.defaults = {
        "0.1": {
          explicitCharkey: false,
          trim: true,
          normalize: true,
          normalizeTags: false,
          attrkey: "@",
          charkey: "#",
          explicitArray: false,
          ignoreAttrs: false,
          mergeAttrs: false,
          explicitRoot: false,
          validator: null,
          xmlns: false,
          explicitChildren: false,
          childkey: '@@',
          charsAsChildren: false,
          includeWhiteChars: false,
          async: false,
          strict: true,
          attrNameProcessors: null,
          attrValueProcessors: null,
          tagNameProcessors: null,
          valueProcessors: null,
          emptyTag: ''
        },
        "0.2": {
          explicitCharkey: false,
          trim: false,
          normalize: false,
          normalizeTags: false,
          attrkey: "$",
          charkey: "_",
          explicitArray: true,
          ignoreAttrs: false,
          mergeAttrs: false,
          explicitRoot: true,
          validator: null,
          xmlns: false,
          explicitChildren: false,
          preserveChildrenOrder: false,
          childkey: '$$',
          charsAsChildren: false,
          includeWhiteChars: false,
          async: false,
          strict: true,
          attrNameProcessors: null,
          attrValueProcessors: null,
          tagNameProcessors: null,
          valueProcessors: null,
          rootName: 'root',
          xmldec: {
            'version': '1.0',
            'encoding': 'UTF-8',
            'standalone': true
          },
          doctype: null,
          renderOpts: {
            'pretty': true,
            'indent': '  ',
            'newline': '\n'
          },
          headless: false,
          chunkSize: 10000,
          emptyTag: '',
          cdata: false
        }
      };
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xml2js/lib/parser.js":
  /*!*******************************************!*\
    !*** ./node_modules/xml2js/lib/parser.js ***!
    \*******************************************/

  /*! no static exports found */

  /***/
  function node_modulesXml2jsLibParserJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      "use strict";

      var bom,
          defaults,
          events,
          isEmpty,
          processItem,
          processors,
          sax,
          setImmediate,
          bind = function bind(fn, me) {
        return function () {
          return fn.apply(me, arguments);
        };
      },
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      sax = __webpack_require__(
      /*! sax */
      "./node_modules/xml2js/node_modules/sax/lib/sax.js");
      events = __webpack_require__(
      /*! events */
      "./node_modules/events/events.js");
      bom = __webpack_require__(
      /*! ./bom */
      "./node_modules/xml2js/lib/bom.js");
      processors = __webpack_require__(
      /*! ./processors */
      "./node_modules/xml2js/lib/processors.js");
      setImmediate = __webpack_require__(
      /*! timers */
      "./node_modules/timers/index.js").setImmediate;
      defaults = __webpack_require__(
      /*! ./defaults */
      "./node_modules/xml2js/lib/defaults.js").defaults;

      isEmpty = function isEmpty(thing) {
        return typeof thing === "object" && thing != null && Object.keys(thing).length === 0;
      };

      processItem = function processItem(processors, item, key) {
        var i, len, process;

        for (i = 0, len = processors.length; i < len; i++) {
          process = processors[i];
          item = process(item, key);
        }

        return item;
      };

      exports.Parser = function (superClass) {
        extend(Parser, superClass);

        function Parser(opts) {
          this.parseStringPromise = bind(this.parseStringPromise, this);
          this.parseString = bind(this.parseString, this);
          this.reset = bind(this.reset, this);
          this.assignOrPush = bind(this.assignOrPush, this);
          this.processAsync = bind(this.processAsync, this);
          var key, ref, value;

          if (!(this instanceof exports.Parser)) {
            return new exports.Parser(opts);
          }

          this.options = {};
          ref = defaults["0.2"];

          for (key in ref) {
            if (!hasProp.call(ref, key)) continue;
            value = ref[key];
            this.options[key] = value;
          }

          for (key in opts) {
            if (!hasProp.call(opts, key)) continue;
            value = opts[key];
            this.options[key] = value;
          }

          if (this.options.xmlns) {
            this.options.xmlnskey = this.options.attrkey + "ns";
          }

          if (this.options.normalizeTags) {
            if (!this.options.tagNameProcessors) {
              this.options.tagNameProcessors = [];
            }

            this.options.tagNameProcessors.unshift(processors.normalize);
          }

          this.reset();
        }

        Parser.prototype.processAsync = function () {
          var chunk, err;

          try {
            if (this.remaining.length <= this.options.chunkSize) {
              chunk = this.remaining;
              this.remaining = '';
              this.saxParser = this.saxParser.write(chunk);
              return this.saxParser.close();
            } else {
              chunk = this.remaining.substr(0, this.options.chunkSize);
              this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
              this.saxParser = this.saxParser.write(chunk);
              return setImmediate(this.processAsync);
            }
          } catch (error1) {
            err = error1;

            if (!this.saxParser.errThrown) {
              this.saxParser.errThrown = true;
              return this.emit(err);
            }
          }
        };

        Parser.prototype.assignOrPush = function (obj, key, newValue) {
          if (!(key in obj)) {
            if (!this.options.explicitArray) {
              return obj[key] = newValue;
            } else {
              return obj[key] = [newValue];
            }
          } else {
            if (!(obj[key] instanceof Array)) {
              obj[key] = [obj[key]];
            }

            return obj[key].push(newValue);
          }
        };

        Parser.prototype.reset = function () {
          var attrkey, charkey, ontext, stack;
          this.removeAllListeners();
          this.saxParser = sax.parser(this.options.strict, {
            trim: false,
            normalize: false,
            xmlns: this.options.xmlns
          });
          this.saxParser.errThrown = false;

          this.saxParser.onerror = function (_this) {
            return function (error) {
              _this.saxParser.resume();

              if (!_this.saxParser.errThrown) {
                _this.saxParser.errThrown = true;
                return _this.emit("error", error);
              }
            };
          }(this);

          this.saxParser.onend = function (_this) {
            return function () {
              if (!_this.saxParser.ended) {
                _this.saxParser.ended = true;
                return _this.emit("end", _this.resultObject);
              }
            };
          }(this);

          this.saxParser.ended = false;
          this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
          this.resultObject = null;
          stack = [];
          attrkey = this.options.attrkey;
          charkey = this.options.charkey;

          this.saxParser.onopentag = function (_this) {
            return function (node) {
              var key, newValue, obj, processedKey, ref;
              obj = {};
              obj[charkey] = "";

              if (!_this.options.ignoreAttrs) {
                ref = node.attributes;

                for (key in ref) {
                  if (!hasProp.call(ref, key)) continue;

                  if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                    obj[attrkey] = {};
                  }

                  newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
                  processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;

                  if (_this.options.mergeAttrs) {
                    _this.assignOrPush(obj, processedKey, newValue);
                  } else {
                    obj[attrkey][processedKey] = newValue;
                  }
                }
              }

              obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;

              if (_this.options.xmlns) {
                obj[_this.options.xmlnskey] = {
                  uri: node.uri,
                  local: node.local
                };
              }

              return stack.push(obj);
            };
          }(this);

          this.saxParser.onclosetag = function (_this) {
            return function () {
              var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
              obj = stack.pop();
              nodeName = obj["#name"];

              if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
                delete obj["#name"];
              }

              if (obj.cdata === true) {
                cdata = obj.cdata;
                delete obj.cdata;
              }

              s = stack[stack.length - 1];

              if (obj[charkey].match(/^\s*$/) && !cdata) {
                emptyStr = obj[charkey];
                delete obj[charkey];
              } else {
                if (_this.options.trim) {
                  obj[charkey] = obj[charkey].trim();
                }

                if (_this.options.normalize) {
                  obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
                }

                obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];

                if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                  obj = obj[charkey];
                }
              }

              if (isEmpty(obj)) {
                obj = _this.options.emptyTag !== '' ? _this.options.emptyTag : emptyStr;
              }

              if (_this.options.validator != null) {
                xpath = "/" + function () {
                  var i, len, results;
                  results = [];

                  for (i = 0, len = stack.length; i < len; i++) {
                    node = stack[i];
                    results.push(node["#name"]);
                  }

                  return results;
                }().concat(nodeName).join("/");

                (function () {
                  var err;

                  try {
                    return obj = _this.options.validator(xpath, s && s[nodeName], obj);
                  } catch (error1) {
                    err = error1;
                    return _this.emit("error", err);
                  }
                })();
              }

              if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
                if (!_this.options.preserveChildrenOrder) {
                  node = {};

                  if (_this.options.attrkey in obj) {
                    node[_this.options.attrkey] = obj[_this.options.attrkey];
                    delete obj[_this.options.attrkey];
                  }

                  if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                    node[_this.options.charkey] = obj[_this.options.charkey];
                    delete obj[_this.options.charkey];
                  }

                  if (Object.getOwnPropertyNames(obj).length > 0) {
                    node[_this.options.childkey] = obj;
                  }

                  obj = node;
                } else if (s) {
                  s[_this.options.childkey] = s[_this.options.childkey] || [];
                  objClone = {};

                  for (key in obj) {
                    if (!hasProp.call(obj, key)) continue;
                    objClone[key] = obj[key];
                  }

                  s[_this.options.childkey].push(objClone);

                  delete obj["#name"];

                  if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                    obj = obj[charkey];
                  }
                }
              }

              if (stack.length > 0) {
                return _this.assignOrPush(s, nodeName, obj);
              } else {
                if (_this.options.explicitRoot) {
                  old = obj;
                  obj = {};
                  obj[nodeName] = old;
                }

                _this.resultObject = obj;
                _this.saxParser.ended = true;
                return _this.emit("end", _this.resultObject);
              }
            };
          }(this);

          ontext = function (_this) {
            return function (text) {
              var charChild, s;
              s = stack[stack.length - 1];

              if (s) {
                s[charkey] += text;

                if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, '').trim() !== '')) {
                  s[_this.options.childkey] = s[_this.options.childkey] || [];
                  charChild = {
                    '#name': '__text__'
                  };
                  charChild[charkey] = text;

                  if (_this.options.normalize) {
                    charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
                  }

                  s[_this.options.childkey].push(charChild);
                }

                return s;
              }
            };
          }(this);

          this.saxParser.ontext = ontext;
          return this.saxParser.oncdata = function (_this) {
            return function (text) {
              var s;
              s = ontext(text);

              if (s) {
                return s.cdata = true;
              }
            };
          }(this);
        };

        Parser.prototype.parseString = function (str, cb) {
          var err;

          if (cb != null && typeof cb === "function") {
            this.on("end", function (result) {
              this.reset();
              return cb(null, result);
            });
            this.on("error", function (err) {
              this.reset();
              return cb(err);
            });
          }

          try {
            str = str.toString();

            if (str.trim() === '') {
              this.emit("end", null);
              return true;
            }

            str = bom.stripBOM(str);

            if (this.options.async) {
              this.remaining = str;
              setImmediate(this.processAsync);
              return this.saxParser;
            }

            return this.saxParser.write(str).close();
          } catch (error1) {
            err = error1;

            if (!(this.saxParser.errThrown || this.saxParser.ended)) {
              this.emit('error', err);
              return this.saxParser.errThrown = true;
            } else if (this.saxParser.ended) {
              throw err;
            }
          }
        };

        Parser.prototype.parseStringPromise = function (str) {
          return new Promise(function (_this) {
            return function (resolve, reject) {
              return _this.parseString(str, function (err, value) {
                if (err) {
                  return reject(err);
                } else {
                  return resolve(value);
                }
              });
            };
          }(this));
        };

        return Parser;
      }(events);

      exports.parseString = function (str, a, b) {
        var cb, options, parser;

        if (b != null) {
          if (typeof b === 'function') {
            cb = b;
          }

          if (typeof a === 'object') {
            options = a;
          }
        } else {
          if (typeof a === 'function') {
            cb = a;
          }

          options = {};
        }

        parser = new exports.Parser(options);
        return parser.parseString(str, cb);
      };

      exports.parseStringPromise = function (str, a) {
        var options, parser;

        if (typeof a === 'object') {
          options = a;
        }

        parser = new exports.Parser(options);
        return parser.parseStringPromise(str);
      };
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xml2js/lib/processors.js":
  /*!***********************************************!*\
    !*** ./node_modules/xml2js/lib/processors.js ***!
    \***********************************************/

  /*! no static exports found */

  /***/
  function node_modulesXml2jsLibProcessorsJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      "use strict";

      var prefixMatch;
      prefixMatch = new RegExp(/(?!xmlns)^.*:/);

      exports.normalize = function (str) {
        return str.toLowerCase();
      };

      exports.firstCharLowerCase = function (str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
      };

      exports.stripPrefix = function (str) {
        return str.replace(prefixMatch, '');
      };

      exports.parseNumbers = function (str) {
        if (!isNaN(str)) {
          str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
        }

        return str;
      };

      exports.parseBooleans = function (str) {
        if (/^(?:true|false)$/i.test(str)) {
          str = str.toLowerCase() === 'true';
        }

        return str;
      };
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xml2js/lib/xml2js.js":
  /*!*******************************************!*\
    !*** ./node_modules/xml2js/lib/xml2js.js ***!
    \*******************************************/

  /*! no static exports found */

  /***/
  function node_modulesXml2jsLibXml2jsJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      "use strict";

      var builder,
          defaults,
          parser,
          processors,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      defaults = __webpack_require__(
      /*! ./defaults */
      "./node_modules/xml2js/lib/defaults.js");
      builder = __webpack_require__(
      /*! ./builder */
      "./node_modules/xml2js/lib/builder.js");
      parser = __webpack_require__(
      /*! ./parser */
      "./node_modules/xml2js/lib/parser.js");
      processors = __webpack_require__(
      /*! ./processors */
      "./node_modules/xml2js/lib/processors.js");
      exports.defaults = defaults.defaults;
      exports.processors = processors;

      exports.ValidationError = function (superClass) {
        extend(ValidationError, superClass);

        function ValidationError(message) {
          this.message = message;
        }

        return ValidationError;
      }(Error);

      exports.Builder = builder.Builder;
      exports.Parser = parser.Parser;
      exports.parseString = parser.parseString;
      exports.parseStringPromise = parser.parseStringPromise;
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xml2js/node_modules/sax/lib/sax.js":
  /*!*********************************************************!*\
    !*** ./node_modules/xml2js/node_modules/sax/lib/sax.js ***!
    \*********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXml2jsNode_modulesSaxLibSaxJs(module, exports, __webpack_require__) {
    ;

    (function (sax) {
      // wrapper for non-node envs
      sax.parser = function (strict, opt) {
        return new SAXParser(strict, opt);
      };

      sax.SAXParser = SAXParser;
      sax.SAXStream = SAXStream;
      sax.createStream = createStream; // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
      // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
      // since that's the earliest that a buffer overrun could occur.  This way, checks are
      // as rare as required, but as often as necessary to ensure never crossing this bound.
      // Furthermore, buffers are only tested at most once per write(), so passing a very
      // large string into write() might have undesirable effects, but this is manageable by
      // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
      // edge case, result in creating at most one complete copy of the string passed in.
      // Set to Infinity to have unlimited buffers.

      sax.MAX_BUFFER_LENGTH = 64 * 1024;
      var buffers = ['comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype', 'procInstName', 'procInstBody', 'entity', 'attribName', 'attribValue', 'cdata', 'script'];
      sax.EVENTS = ['text', 'processinginstruction', 'sgmldeclaration', 'doctype', 'comment', 'opentagstart', 'attribute', 'opentag', 'closetag', 'opencdata', 'cdata', 'closecdata', 'error', 'end', 'ready', 'script', 'opennamespace', 'closenamespace'];

      function SAXParser(strict, opt) {
        if (!(this instanceof SAXParser)) {
          return new SAXParser(strict, opt);
        }

        var parser = this;
        clearBuffers(parser);
        parser.q = parser.c = '';
        parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
        parser.opt = opt || {};
        parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
        parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase';
        parser.tags = [];
        parser.closed = parser.closedRoot = parser.sawRoot = false;
        parser.tag = parser.error = null;
        parser.strict = !!strict;
        parser.noscript = !!(strict || parser.opt.noscript);
        parser.state = S.BEGIN;
        parser.strictEntities = parser.opt.strictEntities;
        parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
        parser.attribList = []; // namespaces form a prototype chain.
        // it always points at the current tag,
        // which protos to its parent tag.

        if (parser.opt.xmlns) {
          parser.ns = Object.create(rootNS);
        } // mostly just for error reporting


        parser.trackPosition = parser.opt.position !== false;

        if (parser.trackPosition) {
          parser.position = parser.line = parser.column = 0;
        }

        emit(parser, 'onready');
      }

      if (!Object.create) {
        Object.create = function (o) {
          function F() {}

          F.prototype = o;
          var newf = new F();
          return newf;
        };
      }

      if (!Object.keys) {
        Object.keys = function (o) {
          var a = [];

          for (var i in o) {
            if (o.hasOwnProperty(i)) a.push(i);
          }

          return a;
        };
      }

      function checkBufferLength(parser) {
        var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
        var maxActual = 0;

        for (var i = 0, l = buffers.length; i < l; i++) {
          var len = parser[buffers[i]].length;

          if (len > maxAllowed) {
            // Text/cdata nodes can get big, and since they're buffered,
            // we can get here under normal conditions.
            // Avoid issues by emitting the text node now,
            // so at least it won't get any bigger.
            switch (buffers[i]) {
              case 'textNode':
                closeText(parser);
                break;

              case 'cdata':
                emitNode(parser, 'oncdata', parser.cdata);
                parser.cdata = '';
                break;

              case 'script':
                emitNode(parser, 'onscript', parser.script);
                parser.script = '';
                break;

              default:
                error(parser, 'Max buffer length exceeded: ' + buffers[i]);
            }
          }

          maxActual = Math.max(maxActual, len);
        } // schedule the next check for the earliest possible buffer overrun.


        var m = sax.MAX_BUFFER_LENGTH - maxActual;
        parser.bufferCheckPosition = m + parser.position;
      }

      function clearBuffers(parser) {
        for (var i = 0, l = buffers.length; i < l; i++) {
          parser[buffers[i]] = '';
        }
      }

      function flushBuffers(parser) {
        closeText(parser);

        if (parser.cdata !== '') {
          emitNode(parser, 'oncdata', parser.cdata);
          parser.cdata = '';
        }

        if (parser.script !== '') {
          emitNode(parser, 'onscript', parser.script);
          parser.script = '';
        }
      }

      SAXParser.prototype = {
        end: function end() {
          _end(this);
        },
        write: write,
        resume: function resume() {
          this.error = null;
          return this;
        },
        close: function close() {
          return this.write(null);
        },
        flush: function flush() {
          flushBuffers(this);
        }
      };
      var Stream;

      try {
        Stream = __webpack_require__(
        /*! stream */
        "./node_modules/stream/index.js").Stream;
      } catch (ex) {
        Stream = function Stream() {};
      }

      var streamWraps = sax.EVENTS.filter(function (ev) {
        return ev !== 'error' && ev !== 'end';
      });

      function createStream(strict, opt) {
        return new SAXStream(strict, opt);
      }

      function SAXStream(strict, opt) {
        if (!(this instanceof SAXStream)) {
          return new SAXStream(strict, opt);
        }

        Stream.apply(this);
        this._parser = new SAXParser(strict, opt);
        this.writable = true;
        this.readable = true;
        var me = this;

        this._parser.onend = function () {
          me.emit('end');
        };

        this._parser.onerror = function (er) {
          me.emit('error', er); // if didn't throw, then means error was handled.
          // go ahead and clear error, so we can write again.

          me._parser.error = null;
        };

        this._decoder = null;
        streamWraps.forEach(function (ev) {
          Object.defineProperty(me, 'on' + ev, {
            get: function get() {
              return me._parser['on' + ev];
            },
            set: function set(h) {
              if (!h) {
                me.removeAllListeners(ev);
                me._parser['on' + ev] = h;
                return h;
              }

              me.on(ev, h);
            },
            enumerable: true,
            configurable: false
          });
        });
      }

      SAXStream.prototype = Object.create(Stream.prototype, {
        constructor: {
          value: SAXStream
        }
      });

      SAXStream.prototype.write = function (data) {
        if (typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function' && Buffer.isBuffer(data)) {
          if (!this._decoder) {
            var SD = __webpack_require__(
            /*! string_decoder */
            "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder;

            this._decoder = new SD('utf8');
          }

          data = this._decoder.write(data);
        }

        this._parser.write(data.toString());

        this.emit('data', data);
        return true;
      };

      SAXStream.prototype.end = function (chunk) {
        if (chunk && chunk.length) {
          this.write(chunk);
        }

        this._parser.end();

        return true;
      };

      SAXStream.prototype.on = function (ev, handler) {
        var me = this;

        if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
          me._parser['on' + ev] = function () {
            var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
            args.splice(0, 0, ev);
            me.emit.apply(me, args);
          };
        }

        return Stream.prototype.on.call(me, ev, handler);
      }; // this really needs to be replaced with character classes.
      // XML allows all manner of ridiculous numbers and digits.


      var CDATA = '[CDATA[';
      var DOCTYPE = 'DOCTYPE';
      var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
      var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/';
      var rootNS = {
        xml: XML_NAMESPACE,
        xmlns: XMLNS_NAMESPACE
      }; // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
      // This implementation works on strings, a single character at a time
      // as such, it cannot ever support astral-plane characters (10000-EFFFF)
      // without a significant breaking change to either this  parser, or the
      // JavaScript language.  Implementation of an emoji-capable xml parser
      // is left as an exercise for the reader.

      var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;

      function isWhitespace(c) {
        return c === ' ' || c === '\n' || c === '\r' || c === '\t';
      }

      function isQuote(c) {
        return c === '"' || c === '\'';
      }

      function isAttribEnd(c) {
        return c === '>' || isWhitespace(c);
      }

      function isMatch(regex, c) {
        return regex.test(c);
      }

      function notMatch(regex, c) {
        return !isMatch(regex, c);
      }

      var S = 0;
      sax.STATE = {
        BEGIN: S++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: S++,
        // leading whitespace
        TEXT: S++,
        // general stuff
        TEXT_ENTITY: S++,
        // &amp and such.
        OPEN_WAKA: S++,
        // <
        SGML_DECL: S++,
        // <!BLARG
        SGML_DECL_QUOTED: S++,
        // <!BLARG foo "bar
        DOCTYPE: S++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: S++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: S++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: S++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: S++,
        // <!-
        COMMENT: S++,
        // <!--
        COMMENT_ENDING: S++,
        // <!-- blah -
        COMMENT_ENDED: S++,
        // <!-- blah --
        CDATA: S++,
        // <![CDATA[ something
        CDATA_ENDING: S++,
        // ]
        CDATA_ENDING_2: S++,
        // ]]
        PROC_INST: S++,
        // <?hi
        PROC_INST_BODY: S++,
        // <?hi there
        PROC_INST_ENDING: S++,
        // <?hi "there" ?
        OPEN_TAG: S++,
        // <strong
        OPEN_TAG_SLASH: S++,
        // <strong /
        ATTRIB: S++,
        // <a
        ATTRIB_NAME: S++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: S++,
        // <a foo _
        ATTRIB_VALUE: S++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: S++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: S++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: S++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: S++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: S++,
        // <foo bar=&quot
        CLOSE_TAG: S++,
        // </a
        CLOSE_TAG_SAW_WHITE: S++,
        // </a   >
        SCRIPT: S++,
        // <script> ...
        SCRIPT_ENDING: S++ // <script> ... <

      };
      sax.XML_ENTITIES = {
        'amp': '&',
        'gt': '>',
        'lt': '<',
        'quot': '"',
        'apos': "'"
      };
      sax.ENTITIES = {
        'amp': '&',
        'gt': '>',
        'lt': '<',
        'quot': '"',
        'apos': "'",
        'AElig': 198,
        'Aacute': 193,
        'Acirc': 194,
        'Agrave': 192,
        'Aring': 197,
        'Atilde': 195,
        'Auml': 196,
        'Ccedil': 199,
        'ETH': 208,
        'Eacute': 201,
        'Ecirc': 202,
        'Egrave': 200,
        'Euml': 203,
        'Iacute': 205,
        'Icirc': 206,
        'Igrave': 204,
        'Iuml': 207,
        'Ntilde': 209,
        'Oacute': 211,
        'Ocirc': 212,
        'Ograve': 210,
        'Oslash': 216,
        'Otilde': 213,
        'Ouml': 214,
        'THORN': 222,
        'Uacute': 218,
        'Ucirc': 219,
        'Ugrave': 217,
        'Uuml': 220,
        'Yacute': 221,
        'aacute': 225,
        'acirc': 226,
        'aelig': 230,
        'agrave': 224,
        'aring': 229,
        'atilde': 227,
        'auml': 228,
        'ccedil': 231,
        'eacute': 233,
        'ecirc': 234,
        'egrave': 232,
        'eth': 240,
        'euml': 235,
        'iacute': 237,
        'icirc': 238,
        'igrave': 236,
        'iuml': 239,
        'ntilde': 241,
        'oacute': 243,
        'ocirc': 244,
        'ograve': 242,
        'oslash': 248,
        'otilde': 245,
        'ouml': 246,
        'szlig': 223,
        'thorn': 254,
        'uacute': 250,
        'ucirc': 251,
        'ugrave': 249,
        'uuml': 252,
        'yacute': 253,
        'yuml': 255,
        'copy': 169,
        'reg': 174,
        'nbsp': 160,
        'iexcl': 161,
        'cent': 162,
        'pound': 163,
        'curren': 164,
        'yen': 165,
        'brvbar': 166,
        'sect': 167,
        'uml': 168,
        'ordf': 170,
        'laquo': 171,
        'not': 172,
        'shy': 173,
        'macr': 175,
        'deg': 176,
        'plusmn': 177,
        'sup1': 185,
        'sup2': 178,
        'sup3': 179,
        'acute': 180,
        'micro': 181,
        'para': 182,
        'middot': 183,
        'cedil': 184,
        'ordm': 186,
        'raquo': 187,
        'frac14': 188,
        'frac12': 189,
        'frac34': 190,
        'iquest': 191,
        'times': 215,
        'divide': 247,
        'OElig': 338,
        'oelig': 339,
        'Scaron': 352,
        'scaron': 353,
        'Yuml': 376,
        'fnof': 402,
        'circ': 710,
        'tilde': 732,
        'Alpha': 913,
        'Beta': 914,
        'Gamma': 915,
        'Delta': 916,
        'Epsilon': 917,
        'Zeta': 918,
        'Eta': 919,
        'Theta': 920,
        'Iota': 921,
        'Kappa': 922,
        'Lambda': 923,
        'Mu': 924,
        'Nu': 925,
        'Xi': 926,
        'Omicron': 927,
        'Pi': 928,
        'Rho': 929,
        'Sigma': 931,
        'Tau': 932,
        'Upsilon': 933,
        'Phi': 934,
        'Chi': 935,
        'Psi': 936,
        'Omega': 937,
        'alpha': 945,
        'beta': 946,
        'gamma': 947,
        'delta': 948,
        'epsilon': 949,
        'zeta': 950,
        'eta': 951,
        'theta': 952,
        'iota': 953,
        'kappa': 954,
        'lambda': 955,
        'mu': 956,
        'nu': 957,
        'xi': 958,
        'omicron': 959,
        'pi': 960,
        'rho': 961,
        'sigmaf': 962,
        'sigma': 963,
        'tau': 964,
        'upsilon': 965,
        'phi': 966,
        'chi': 967,
        'psi': 968,
        'omega': 969,
        'thetasym': 977,
        'upsih': 978,
        'piv': 982,
        'ensp': 8194,
        'emsp': 8195,
        'thinsp': 8201,
        'zwnj': 8204,
        'zwj': 8205,
        'lrm': 8206,
        'rlm': 8207,
        'ndash': 8211,
        'mdash': 8212,
        'lsquo': 8216,
        'rsquo': 8217,
        'sbquo': 8218,
        'ldquo': 8220,
        'rdquo': 8221,
        'bdquo': 8222,
        'dagger': 8224,
        'Dagger': 8225,
        'bull': 8226,
        'hellip': 8230,
        'permil': 8240,
        'prime': 8242,
        'Prime': 8243,
        'lsaquo': 8249,
        'rsaquo': 8250,
        'oline': 8254,
        'frasl': 8260,
        'euro': 8364,
        'image': 8465,
        'weierp': 8472,
        'real': 8476,
        'trade': 8482,
        'alefsym': 8501,
        'larr': 8592,
        'uarr': 8593,
        'rarr': 8594,
        'darr': 8595,
        'harr': 8596,
        'crarr': 8629,
        'lArr': 8656,
        'uArr': 8657,
        'rArr': 8658,
        'dArr': 8659,
        'hArr': 8660,
        'forall': 8704,
        'part': 8706,
        'exist': 8707,
        'empty': 8709,
        'nabla': 8711,
        'isin': 8712,
        'notin': 8713,
        'ni': 8715,
        'prod': 8719,
        'sum': 8721,
        'minus': 8722,
        'lowast': 8727,
        'radic': 8730,
        'prop': 8733,
        'infin': 8734,
        'ang': 8736,
        'and': 8743,
        'or': 8744,
        'cap': 8745,
        'cup': 8746,
        'int': 8747,
        'there4': 8756,
        'sim': 8764,
        'cong': 8773,
        'asymp': 8776,
        'ne': 8800,
        'equiv': 8801,
        'le': 8804,
        'ge': 8805,
        'sub': 8834,
        'sup': 8835,
        'nsub': 8836,
        'sube': 8838,
        'supe': 8839,
        'oplus': 8853,
        'otimes': 8855,
        'perp': 8869,
        'sdot': 8901,
        'lceil': 8968,
        'rceil': 8969,
        'lfloor': 8970,
        'rfloor': 8971,
        'lang': 9001,
        'rang': 9002,
        'loz': 9674,
        'spades': 9824,
        'clubs': 9827,
        'hearts': 9829,
        'diams': 9830
      };
      Object.keys(sax.ENTITIES).forEach(function (key) {
        var e = sax.ENTITIES[key];
        var s = typeof e === 'number' ? String.fromCharCode(e) : e;
        sax.ENTITIES[key] = s;
      });

      for (var s in sax.STATE) {
        sax.STATE[sax.STATE[s]] = s;
      } // shorthand


      S = sax.STATE;

      function emit(parser, event, data) {
        parser[event] && parser[event](data);
      }

      function emitNode(parser, nodeType, data) {
        if (parser.textNode) closeText(parser);
        emit(parser, nodeType, data);
      }

      function closeText(parser) {
        parser.textNode = textopts(parser.opt, parser.textNode);
        if (parser.textNode) emit(parser, 'ontext', parser.textNode);
        parser.textNode = '';
      }

      function textopts(opt, text) {
        if (opt.trim) text = text.trim();
        if (opt.normalize) text = text.replace(/\s+/g, ' ');
        return text;
      }

      function error(parser, er) {
        closeText(parser);

        if (parser.trackPosition) {
          er += '\nLine: ' + parser.line + '\nColumn: ' + parser.column + '\nChar: ' + parser.c;
        }

        er = new Error(er);
        parser.error = er;
        emit(parser, 'onerror', er);
        return parser;
      }

      function _end(parser) {
        if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag');

        if (parser.state !== S.BEGIN && parser.state !== S.BEGIN_WHITESPACE && parser.state !== S.TEXT) {
          error(parser, 'Unexpected end');
        }

        closeText(parser);
        parser.c = '';
        parser.closed = true;
        emit(parser, 'onend');
        SAXParser.call(parser, parser.strict, parser.opt);
        return parser;
      }

      function strictFail(parser, message) {
        if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
          throw new Error('bad call to strictFail');
        }

        if (parser.strict) {
          error(parser, message);
        }
      }

      function newTag(parser) {
        if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
        var parent = parser.tags[parser.tags.length - 1] || parser;
        var tag = parser.tag = {
          name: parser.tagName,
          attributes: {}
        }; // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"

        if (parser.opt.xmlns) {
          tag.ns = parent.ns;
        }

        parser.attribList.length = 0;
        emitNode(parser, 'onopentagstart', tag);
      }

      function qname(name, attribute) {
        var i = name.indexOf(':');
        var qualName = i < 0 ? ['', name] : name.split(':');
        var prefix = qualName[0];
        var local = qualName[1]; // <x "xmlns"="http://foo">

        if (attribute && name === 'xmlns') {
          prefix = 'xmlns';
          local = '';
        }

        return {
          prefix: prefix,
          local: local
        };
      }

      function attrib(parser) {
        if (!parser.strict) {
          parser.attribName = parser.attribName[parser.looseCase]();
        }

        if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
          parser.attribName = parser.attribValue = '';
          return;
        }

        if (parser.opt.xmlns) {
          var qn = qname(parser.attribName, true);
          var prefix = qn.prefix;
          var local = qn.local;

          if (prefix === 'xmlns') {
            // namespace binding attribute. push the binding into scope
            if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
              strictFail(parser, 'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' + 'Actual: ' + parser.attribValue);
            } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
              strictFail(parser, 'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' + 'Actual: ' + parser.attribValue);
            } else {
              var tag = parser.tag;
              var parent = parser.tags[parser.tags.length - 1] || parser;

              if (tag.ns === parent.ns) {
                tag.ns = Object.create(parent.ns);
              }

              tag.ns[local] = parser.attribValue;
            }
          } // defer onattribute events until all attributes have been seen
          // so any new bindings can take effect. preserve attribute order
          // so deferred events can be emitted in document order


          parser.attribList.push([parser.attribName, parser.attribValue]);
        } else {
          // in non-xmlns mode, we can emit the event right away
          parser.tag.attributes[parser.attribName] = parser.attribValue;
          emitNode(parser, 'onattribute', {
            name: parser.attribName,
            value: parser.attribValue
          });
        }

        parser.attribName = parser.attribValue = '';
      }

      function openTag(parser, selfClosing) {
        if (parser.opt.xmlns) {
          // emit namespace binding events
          var tag = parser.tag; // add namespace info to tag

          var qn = qname(parser.tagName);
          tag.prefix = qn.prefix;
          tag.local = qn.local;
          tag.uri = tag.ns[qn.prefix] || '';

          if (tag.prefix && !tag.uri) {
            strictFail(parser, 'Unbound namespace prefix: ' + JSON.stringify(parser.tagName));
            tag.uri = qn.prefix;
          }

          var parent = parser.tags[parser.tags.length - 1] || parser;

          if (tag.ns && parent.ns !== tag.ns) {
            Object.keys(tag.ns).forEach(function (p) {
              emitNode(parser, 'onopennamespace', {
                prefix: p,
                uri: tag.ns[p]
              });
            });
          } // handle deferred onattribute events
          // Note: do not apply default ns to attributes:
          //   http://www.w3.org/TR/REC-xml-names/#defaulting


          for (var i = 0, l = parser.attribList.length; i < l; i++) {
            var nv = parser.attribList[i];
            var name = nv[0];
            var value = nv[1];
            var qualName = qname(name, true);
            var prefix = qualName.prefix;
            var local = qualName.local;
            var uri = prefix === '' ? '' : tag.ns[prefix] || '';
            var a = {
              name: name,
              value: value,
              prefix: prefix,
              local: local,
              uri: uri
            }; // if there's any attributes with an undefined namespace,
            // then fail on them now.

            if (prefix && prefix !== 'xmlns' && !uri) {
              strictFail(parser, 'Unbound namespace prefix: ' + JSON.stringify(prefix));
              a.uri = prefix;
            }

            parser.tag.attributes[name] = a;
            emitNode(parser, 'onattribute', a);
          }

          parser.attribList.length = 0;
        }

        parser.tag.isSelfClosing = !!selfClosing; // process the tag

        parser.sawRoot = true;
        parser.tags.push(parser.tag);
        emitNode(parser, 'onopentag', parser.tag);

        if (!selfClosing) {
          // special case for <script> in non-strict mode.
          if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
            parser.state = S.SCRIPT;
          } else {
            parser.state = S.TEXT;
          }

          parser.tag = null;
          parser.tagName = '';
        }

        parser.attribName = parser.attribValue = '';
        parser.attribList.length = 0;
      }

      function closeTag(parser) {
        if (!parser.tagName) {
          strictFail(parser, 'Weird empty close tag.');
          parser.textNode += '</>';
          parser.state = S.TEXT;
          return;
        }

        if (parser.script) {
          if (parser.tagName !== 'script') {
            parser.script += '</' + parser.tagName + '>';
            parser.tagName = '';
            parser.state = S.SCRIPT;
            return;
          }

          emitNode(parser, 'onscript', parser.script);
          parser.script = '';
        } // first make sure that the closing tag actually exists.
        // <a><b></c></b></a> will close everything, otherwise.


        var t = parser.tags.length;
        var tagName = parser.tagName;

        if (!parser.strict) {
          tagName = tagName[parser.looseCase]();
        }

        var closeTo = tagName;

        while (t--) {
          var close = parser.tags[t];

          if (close.name !== closeTo) {
            // fail the first time in strict mode
            strictFail(parser, 'Unexpected close tag');
          } else {
            break;
          }
        } // didn't find it.  we already failed for strict, so just abort.


        if (t < 0) {
          strictFail(parser, 'Unmatched closing tag: ' + parser.tagName);
          parser.textNode += '</' + parser.tagName + '>';
          parser.state = S.TEXT;
          return;
        }

        parser.tagName = tagName;
        var s = parser.tags.length;

        while (s-- > t) {
          var tag = parser.tag = parser.tags.pop();
          parser.tagName = parser.tag.name;
          emitNode(parser, 'onclosetag', parser.tagName);
          var x = {};

          for (var i in tag.ns) {
            x[i] = tag.ns[i];
          }

          var parent = parser.tags[parser.tags.length - 1] || parser;

          if (parser.opt.xmlns && tag.ns !== parent.ns) {
            // remove namespace bindings introduced by tag
            Object.keys(tag.ns).forEach(function (p) {
              var n = tag.ns[p];
              emitNode(parser, 'onclosenamespace', {
                prefix: p,
                uri: n
              });
            });
          }
        }

        if (t === 0) parser.closedRoot = true;
        parser.tagName = parser.attribValue = parser.attribName = '';
        parser.attribList.length = 0;
        parser.state = S.TEXT;
      }

      function parseEntity(parser) {
        var entity = parser.entity;
        var entityLC = entity.toLowerCase();
        var num;
        var numStr = '';

        if (parser.ENTITIES[entity]) {
          return parser.ENTITIES[entity];
        }

        if (parser.ENTITIES[entityLC]) {
          return parser.ENTITIES[entityLC];
        }

        entity = entityLC;

        if (entity.charAt(0) === '#') {
          if (entity.charAt(1) === 'x') {
            entity = entity.slice(2);
            num = parseInt(entity, 16);
            numStr = num.toString(16);
          } else {
            entity = entity.slice(1);
            num = parseInt(entity, 10);
            numStr = num.toString(10);
          }
        }

        entity = entity.replace(/^0+/, '');

        if (isNaN(num) || numStr.toLowerCase() !== entity) {
          strictFail(parser, 'Invalid character entity');
          return '&' + parser.entity + ';';
        }

        return String.fromCodePoint(num);
      }

      function beginWhiteSpace(parser, c) {
        if (c === '<') {
          parser.state = S.OPEN_WAKA;
          parser.startTagPosition = parser.position;
        } else if (!isWhitespace(c)) {
          // have to process this as a text node.
          // weird, but happens.
          strictFail(parser, 'Non-whitespace before first tag.');
          parser.textNode = c;
          parser.state = S.TEXT;
        }
      }

      function charAt(chunk, i) {
        var result = '';

        if (i < chunk.length) {
          result = chunk.charAt(i);
        }

        return result;
      }

      function write(chunk) {
        var parser = this;

        if (this.error) {
          throw this.error;
        }

        if (parser.closed) {
          return error(parser, 'Cannot write after close. Assign an onready handler.');
        }

        if (chunk === null) {
          return _end(parser);
        }

        if (typeof chunk === 'object') {
          chunk = chunk.toString();
        }

        var i = 0;
        var c = '';

        while (true) {
          c = charAt(chunk, i++);
          parser.c = c;

          if (!c) {
            break;
          }

          if (parser.trackPosition) {
            parser.position++;

            if (c === '\n') {
              parser.line++;
              parser.column = 0;
            } else {
              parser.column++;
            }
          }

          switch (parser.state) {
            case S.BEGIN:
              parser.state = S.BEGIN_WHITESPACE;

              if (c === "\uFEFF") {
                continue;
              }

              beginWhiteSpace(parser, c);
              continue;

            case S.BEGIN_WHITESPACE:
              beginWhiteSpace(parser, c);
              continue;

            case S.TEXT:
              if (parser.sawRoot && !parser.closedRoot) {
                var starti = i - 1;

                while (c && c !== '<' && c !== '&') {
                  c = charAt(chunk, i++);

                  if (c && parser.trackPosition) {
                    parser.position++;

                    if (c === '\n') {
                      parser.line++;
                      parser.column = 0;
                    } else {
                      parser.column++;
                    }
                  }
                }

                parser.textNode += chunk.substring(starti, i - 1);
              }

              if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
                parser.state = S.OPEN_WAKA;
                parser.startTagPosition = parser.position;
              } else {
                if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
                  strictFail(parser, 'Text data outside of root node.');
                }

                if (c === '&') {
                  parser.state = S.TEXT_ENTITY;
                } else {
                  parser.textNode += c;
                }
              }

              continue;

            case S.SCRIPT:
              // only non-strict
              if (c === '<') {
                parser.state = S.SCRIPT_ENDING;
              } else {
                parser.script += c;
              }

              continue;

            case S.SCRIPT_ENDING:
              if (c === '/') {
                parser.state = S.CLOSE_TAG;
              } else {
                parser.script += '<' + c;
                parser.state = S.SCRIPT;
              }

              continue;

            case S.OPEN_WAKA:
              // either a /, ?, !, or text is coming next.
              if (c === '!') {
                parser.state = S.SGML_DECL;
                parser.sgmlDecl = '';
              } else if (isWhitespace(c)) {// wait for it...
              } else if (isMatch(nameStart, c)) {
                parser.state = S.OPEN_TAG;
                parser.tagName = c;
              } else if (c === '/') {
                parser.state = S.CLOSE_TAG;
                parser.tagName = '';
              } else if (c === '?') {
                parser.state = S.PROC_INST;
                parser.procInstName = parser.procInstBody = '';
              } else {
                strictFail(parser, 'Unencoded <'); // if there was some whitespace, then add that in.

                if (parser.startTagPosition + 1 < parser.position) {
                  var pad = parser.position - parser.startTagPosition;
                  c = new Array(pad).join(' ') + c;
                }

                parser.textNode += '<' + c;
                parser.state = S.TEXT;
              }

              continue;

            case S.SGML_DECL:
              if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
                emitNode(parser, 'onopencdata');
                parser.state = S.CDATA;
                parser.sgmlDecl = '';
                parser.cdata = '';
              } else if (parser.sgmlDecl + c === '--') {
                parser.state = S.COMMENT;
                parser.comment = '';
                parser.sgmlDecl = '';
              } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
                parser.state = S.DOCTYPE;

                if (parser.doctype || parser.sawRoot) {
                  strictFail(parser, 'Inappropriately located doctype declaration');
                }

                parser.doctype = '';
                parser.sgmlDecl = '';
              } else if (c === '>') {
                emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl);
                parser.sgmlDecl = '';
                parser.state = S.TEXT;
              } else if (isQuote(c)) {
                parser.state = S.SGML_DECL_QUOTED;
                parser.sgmlDecl += c;
              } else {
                parser.sgmlDecl += c;
              }

              continue;

            case S.SGML_DECL_QUOTED:
              if (c === parser.q) {
                parser.state = S.SGML_DECL;
                parser.q = '';
              }

              parser.sgmlDecl += c;
              continue;

            case S.DOCTYPE:
              if (c === '>') {
                parser.state = S.TEXT;
                emitNode(parser, 'ondoctype', parser.doctype);
                parser.doctype = true; // just remember that we saw it.
              } else {
                parser.doctype += c;

                if (c === '[') {
                  parser.state = S.DOCTYPE_DTD;
                } else if (isQuote(c)) {
                  parser.state = S.DOCTYPE_QUOTED;
                  parser.q = c;
                }
              }

              continue;

            case S.DOCTYPE_QUOTED:
              parser.doctype += c;

              if (c === parser.q) {
                parser.q = '';
                parser.state = S.DOCTYPE;
              }

              continue;

            case S.DOCTYPE_DTD:
              parser.doctype += c;

              if (c === ']') {
                parser.state = S.DOCTYPE;
              } else if (isQuote(c)) {
                parser.state = S.DOCTYPE_DTD_QUOTED;
                parser.q = c;
              }

              continue;

            case S.DOCTYPE_DTD_QUOTED:
              parser.doctype += c;

              if (c === parser.q) {
                parser.state = S.DOCTYPE_DTD;
                parser.q = '';
              }

              continue;

            case S.COMMENT:
              if (c === '-') {
                parser.state = S.COMMENT_ENDING;
              } else {
                parser.comment += c;
              }

              continue;

            case S.COMMENT_ENDING:
              if (c === '-') {
                parser.state = S.COMMENT_ENDED;
                parser.comment = textopts(parser.opt, parser.comment);

                if (parser.comment) {
                  emitNode(parser, 'oncomment', parser.comment);
                }

                parser.comment = '';
              } else {
                parser.comment += '-' + c;
                parser.state = S.COMMENT;
              }

              continue;

            case S.COMMENT_ENDED:
              if (c !== '>') {
                strictFail(parser, 'Malformed comment'); // allow <!-- blah -- bloo --> in non-strict mode,
                // which is a comment of " blah -- bloo "

                parser.comment += '--' + c;
                parser.state = S.COMMENT;
              } else {
                parser.state = S.TEXT;
              }

              continue;

            case S.CDATA:
              if (c === ']') {
                parser.state = S.CDATA_ENDING;
              } else {
                parser.cdata += c;
              }

              continue;

            case S.CDATA_ENDING:
              if (c === ']') {
                parser.state = S.CDATA_ENDING_2;
              } else {
                parser.cdata += ']' + c;
                parser.state = S.CDATA;
              }

              continue;

            case S.CDATA_ENDING_2:
              if (c === '>') {
                if (parser.cdata) {
                  emitNode(parser, 'oncdata', parser.cdata);
                }

                emitNode(parser, 'onclosecdata');
                parser.cdata = '';
                parser.state = S.TEXT;
              } else if (c === ']') {
                parser.cdata += ']';
              } else {
                parser.cdata += ']]' + c;
                parser.state = S.CDATA;
              }

              continue;

            case S.PROC_INST:
              if (c === '?') {
                parser.state = S.PROC_INST_ENDING;
              } else if (isWhitespace(c)) {
                parser.state = S.PROC_INST_BODY;
              } else {
                parser.procInstName += c;
              }

              continue;

            case S.PROC_INST_BODY:
              if (!parser.procInstBody && isWhitespace(c)) {
                continue;
              } else if (c === '?') {
                parser.state = S.PROC_INST_ENDING;
              } else {
                parser.procInstBody += c;
              }

              continue;

            case S.PROC_INST_ENDING:
              if (c === '>') {
                emitNode(parser, 'onprocessinginstruction', {
                  name: parser.procInstName,
                  body: parser.procInstBody
                });
                parser.procInstName = parser.procInstBody = '';
                parser.state = S.TEXT;
              } else {
                parser.procInstBody += '?' + c;
                parser.state = S.PROC_INST_BODY;
              }

              continue;

            case S.OPEN_TAG:
              if (isMatch(nameBody, c)) {
                parser.tagName += c;
              } else {
                newTag(parser);

                if (c === '>') {
                  openTag(parser);
                } else if (c === '/') {
                  parser.state = S.OPEN_TAG_SLASH;
                } else {
                  if (!isWhitespace(c)) {
                    strictFail(parser, 'Invalid character in tag name');
                  }

                  parser.state = S.ATTRIB;
                }
              }

              continue;

            case S.OPEN_TAG_SLASH:
              if (c === '>') {
                openTag(parser, true);
                closeTag(parser);
              } else {
                strictFail(parser, 'Forward-slash in opening tag not followed by >');
                parser.state = S.ATTRIB;
              }

              continue;

            case S.ATTRIB:
              // haven't read the attribute name yet.
              if (isWhitespace(c)) {
                continue;
              } else if (c === '>') {
                openTag(parser);
              } else if (c === '/') {
                parser.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c)) {
                parser.attribName = c;
                parser.attribValue = '';
                parser.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser, 'Invalid attribute name');
              }

              continue;

            case S.ATTRIB_NAME:
              if (c === '=') {
                parser.state = S.ATTRIB_VALUE;
              } else if (c === '>') {
                strictFail(parser, 'Attribute without value');
                parser.attribValue = parser.attribName;
                attrib(parser);
                openTag(parser);
              } else if (isWhitespace(c)) {
                parser.state = S.ATTRIB_NAME_SAW_WHITE;
              } else if (isMatch(nameBody, c)) {
                parser.attribName += c;
              } else {
                strictFail(parser, 'Invalid attribute name');
              }

              continue;

            case S.ATTRIB_NAME_SAW_WHITE:
              if (c === '=') {
                parser.state = S.ATTRIB_VALUE;
              } else if (isWhitespace(c)) {
                continue;
              } else {
                strictFail(parser, 'Attribute without value');
                parser.tag.attributes[parser.attribName] = '';
                parser.attribValue = '';
                emitNode(parser, 'onattribute', {
                  name: parser.attribName,
                  value: ''
                });
                parser.attribName = '';

                if (c === '>') {
                  openTag(parser);
                } else if (isMatch(nameStart, c)) {
                  parser.attribName = c;
                  parser.state = S.ATTRIB_NAME;
                } else {
                  strictFail(parser, 'Invalid attribute name');
                  parser.state = S.ATTRIB;
                }
              }

              continue;

            case S.ATTRIB_VALUE:
              if (isWhitespace(c)) {
                continue;
              } else if (isQuote(c)) {
                parser.q = c;
                parser.state = S.ATTRIB_VALUE_QUOTED;
              } else {
                strictFail(parser, 'Unquoted attribute value');
                parser.state = S.ATTRIB_VALUE_UNQUOTED;
                parser.attribValue = c;
              }

              continue;

            case S.ATTRIB_VALUE_QUOTED:
              if (c !== parser.q) {
                if (c === '&') {
                  parser.state = S.ATTRIB_VALUE_ENTITY_Q;
                } else {
                  parser.attribValue += c;
                }

                continue;
              }

              attrib(parser);
              parser.q = '';
              parser.state = S.ATTRIB_VALUE_CLOSED;
              continue;

            case S.ATTRIB_VALUE_CLOSED:
              if (isWhitespace(c)) {
                parser.state = S.ATTRIB;
              } else if (c === '>') {
                openTag(parser);
              } else if (c === '/') {
                parser.state = S.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c)) {
                strictFail(parser, 'No whitespace between attributes');
                parser.attribName = c;
                parser.attribValue = '';
                parser.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser, 'Invalid attribute name');
              }

              continue;

            case S.ATTRIB_VALUE_UNQUOTED:
              if (!isAttribEnd(c)) {
                if (c === '&') {
                  parser.state = S.ATTRIB_VALUE_ENTITY_U;
                } else {
                  parser.attribValue += c;
                }

                continue;
              }

              attrib(parser);

              if (c === '>') {
                openTag(parser);
              } else {
                parser.state = S.ATTRIB;
              }

              continue;

            case S.CLOSE_TAG:
              if (!parser.tagName) {
                if (isWhitespace(c)) {
                  continue;
                } else if (notMatch(nameStart, c)) {
                  if (parser.script) {
                    parser.script += '</' + c;
                    parser.state = S.SCRIPT;
                  } else {
                    strictFail(parser, 'Invalid tagname in closing tag.');
                  }
                } else {
                  parser.tagName = c;
                }
              } else if (c === '>') {
                closeTag(parser);
              } else if (isMatch(nameBody, c)) {
                parser.tagName += c;
              } else if (parser.script) {
                parser.script += '</' + parser.tagName;
                parser.tagName = '';
                parser.state = S.SCRIPT;
              } else {
                if (!isWhitespace(c)) {
                  strictFail(parser, 'Invalid tagname in closing tag');
                }

                parser.state = S.CLOSE_TAG_SAW_WHITE;
              }

              continue;

            case S.CLOSE_TAG_SAW_WHITE:
              if (isWhitespace(c)) {
                continue;
              }

              if (c === '>') {
                closeTag(parser);
              } else {
                strictFail(parser, 'Invalid characters in closing tag');
              }

              continue;

            case S.TEXT_ENTITY:
            case S.ATTRIB_VALUE_ENTITY_Q:
            case S.ATTRIB_VALUE_ENTITY_U:
              var returnState;
              var buffer;

              switch (parser.state) {
                case S.TEXT_ENTITY:
                  returnState = S.TEXT;
                  buffer = 'textNode';
                  break;

                case S.ATTRIB_VALUE_ENTITY_Q:
                  returnState = S.ATTRIB_VALUE_QUOTED;
                  buffer = 'attribValue';
                  break;

                case S.ATTRIB_VALUE_ENTITY_U:
                  returnState = S.ATTRIB_VALUE_UNQUOTED;
                  buffer = 'attribValue';
                  break;
              }

              if (c === ';') {
                parser[buffer] += parseEntity(parser);
                parser.entity = '';
                parser.state = returnState;
              } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
                parser.entity += c;
              } else {
                strictFail(parser, 'Invalid character in entity name');
                parser[buffer] += '&' + parser.entity + c;
                parser.entity = '';
                parser.state = returnState;
              }

              continue;

            default:
              throw new Error(parser, 'Unknown state: ' + parser.state);
          }
        } // while


        if (parser.position >= parser.bufferCheckPosition) {
          checkBufferLength(parser);
        }

        return parser;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */

      /* istanbul ignore next */


      if (!String.fromCodePoint) {
        (function () {
          var stringFromCharCode = String.fromCharCode;
          var floor = Math.floor;

          var fromCodePoint = function fromCodePoint() {
            var MAX_SIZE = 0x4000;
            var codeUnits = [];
            var highSurrogate;
            var lowSurrogate;
            var index = -1;
            var length = arguments.length;

            if (!length) {
              return '';
            }

            var result = '';

            while (++index < length) {
              var codePoint = Number(arguments[index]);

              if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
              codePoint < 0 || // not a valid Unicode code point
              codePoint > 0x10FFFF || // not a valid Unicode code point
              floor(codePoint) !== codePoint // not an integer
              ) {
                  throw RangeError('Invalid code point: ' + codePoint);
                }

              if (codePoint <= 0xFFFF) {
                // BMP code point
                codeUnits.push(codePoint);
              } else {
                // Astral code point; split in surrogate halves
                // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                codePoint -= 0x10000;
                highSurrogate = (codePoint >> 10) + 0xD800;
                lowSurrogate = codePoint % 0x400 + 0xDC00;
                codeUnits.push(highSurrogate, lowSurrogate);
              }

              if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += stringFromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
              }
            }

            return result;
          };
          /* istanbul ignore next */


          if (Object.defineProperty) {
            Object.defineProperty(String, 'fromCodePoint', {
              value: fromCodePoint,
              configurable: true,
              writable: true
            });
          } else {
            String.fromCodePoint = fromCodePoint;
          }
        })();
      }
    })(false ? undefined : exports);
    /***/

  },

  /***/
  "./node_modules/xmlbuilder/lib/DocumentPosition.js":
  /*!*********************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/DocumentPosition.js ***!
    \*********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibDocumentPositionJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      module.exports = {
        Disconnected: 1,
        Preceding: 2,
        Following: 4,
        Contains: 8,
        ContainedBy: 16,
        ImplementationSpecific: 32
      };
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/NodeType.js":
  /*!*************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/NodeType.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibNodeTypeJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      module.exports = {
        Element: 1,
        Attribute: 2,
        Text: 3,
        CData: 4,
        EntityReference: 5,
        EntityDeclaration: 6,
        ProcessingInstruction: 7,
        Comment: 8,
        Document: 9,
        DocType: 10,
        DocumentFragment: 11,
        NotationDeclaration: 12,
        Declaration: 201,
        Raw: 202,
        AttributeDeclaration: 203,
        ElementDeclaration: 204,
        Dummy: 205
      };
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/Utility.js":
  /*!************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/Utility.js ***!
    \************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibUtilityJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var assign,
          getValue,
          isArray,
          isEmpty,
          isFunction,
          isObject,
          isPlainObject,
          slice = [].slice,
          hasProp = {}.hasOwnProperty;

      assign = function assign() {
        var i, key, len, source, sources, target;
        target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];

        if (isFunction(Object.assign)) {
          Object.assign.apply(null, arguments);
        } else {
          for (i = 0, len = sources.length; i < len; i++) {
            source = sources[i];

            if (source != null) {
              for (key in source) {
                if (!hasProp.call(source, key)) continue;
                target[key] = source[key];
              }
            }
          }
        }

        return target;
      };

      isFunction = function isFunction(val) {
        return !!val && Object.prototype.toString.call(val) === '[object Function]';
      };

      isObject = function isObject(val) {
        var ref;
        return !!val && ((ref = typeof val) === 'function' || ref === 'object');
      };

      isArray = function isArray(val) {
        if (isFunction(Array.isArray)) {
          return Array.isArray(val);
        } else {
          return Object.prototype.toString.call(val) === '[object Array]';
        }
      };

      isEmpty = function isEmpty(val) {
        var key;

        if (isArray(val)) {
          return !val.length;
        } else {
          for (key in val) {
            if (!hasProp.call(val, key)) continue;
            return false;
          }

          return true;
        }
      };

      isPlainObject = function isPlainObject(val) {
        var ctor, proto;
        return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && typeof ctor === 'function' && ctor instanceof ctor && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object);
      };

      getValue = function getValue(obj) {
        if (isFunction(obj.valueOf)) {
          return obj.valueOf();
        } else {
          return obj;
        }
      };

      module.exports.assign = assign;
      module.exports.isFunction = isFunction;
      module.exports.isObject = isObject;
      module.exports.isArray = isArray;
      module.exports.isEmpty = isEmpty;
      module.exports.isPlainObject = isPlainObject;
      module.exports.getValue = getValue;
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/WriterState.js":
  /*!****************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/WriterState.js ***!
    \****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibWriterStateJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      module.exports = {
        None: 0,
        OpenTag: 1,
        InsideTag: 2,
        CloseTag: 3
      };
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLAttribute.js":
  /*!*****************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLAttribute.js ***!
    \*****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLAttributeJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType, XMLAttribute, XMLNode;
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");

      module.exports = XMLAttribute = function () {
        function XMLAttribute(parent, name, value) {
          this.parent = parent;

          if (this.parent) {
            this.options = this.parent.options;
            this.stringify = this.parent.stringify;
          }

          if (name == null) {
            throw new Error("Missing attribute name. " + this.debugInfo(name));
          }

          this.name = this.stringify.name(name);
          this.value = this.stringify.attValue(value);
          this.type = NodeType.Attribute;
          this.isId = false;
          this.schemaTypeInfo = null;
        }

        Object.defineProperty(XMLAttribute.prototype, 'nodeType', {
          get: function get() {
            return this.type;
          }
        });
        Object.defineProperty(XMLAttribute.prototype, 'ownerElement', {
          get: function get() {
            return this.parent;
          }
        });
        Object.defineProperty(XMLAttribute.prototype, 'textContent', {
          get: function get() {
            return this.value;
          },
          set: function set(value) {
            return this.value = value || '';
          }
        });
        Object.defineProperty(XMLAttribute.prototype, 'namespaceURI', {
          get: function get() {
            return '';
          }
        });
        Object.defineProperty(XMLAttribute.prototype, 'prefix', {
          get: function get() {
            return '';
          }
        });
        Object.defineProperty(XMLAttribute.prototype, 'localName', {
          get: function get() {
            return this.name;
          }
        });
        Object.defineProperty(XMLAttribute.prototype, 'specified', {
          get: function get() {
            return true;
          }
        });

        XMLAttribute.prototype.clone = function () {
          return Object.create(this);
        };

        XMLAttribute.prototype.toString = function (options) {
          return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
        };

        XMLAttribute.prototype.debugInfo = function (name) {
          name = name || this.name;

          if (name == null) {
            return "parent: <" + this.parent.name + ">";
          } else {
            return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
          }
        };

        XMLAttribute.prototype.isEqualNode = function (node) {
          if (node.namespaceURI !== this.namespaceURI) {
            return false;
          }

          if (node.prefix !== this.prefix) {
            return false;
          }

          if (node.localName !== this.localName) {
            return false;
          }

          if (node.value !== this.value) {
            return false;
          }

          return true;
        };

        return XMLAttribute;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLCData.js":
  /*!*************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLCData.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLCDataJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLCData,
          XMLCharacterData,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLCharacterData = __webpack_require__(
      /*! ./XMLCharacterData */
      "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

      module.exports = XMLCData = function (superClass) {
        extend(XMLCData, superClass);

        function XMLCData(parent, text) {
          XMLCData.__super__.constructor.call(this, parent);

          if (text == null) {
            throw new Error("Missing CDATA text. " + this.debugInfo());
          }

          this.name = "#cdata-section";
          this.type = NodeType.CData;
          this.value = this.stringify.cdata(text);
        }

        XMLCData.prototype.clone = function () {
          return Object.create(this);
        };

        XMLCData.prototype.toString = function (options) {
          return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
        };

        return XMLCData;
      }(XMLCharacterData);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLCharacterData.js":
  /*!*********************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLCharacterData.js ***!
    \*********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLCharacterDataJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var XMLCharacterData,
          XMLNode,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");

      module.exports = XMLCharacterData = function (superClass) {
        extend(XMLCharacterData, superClass);

        function XMLCharacterData(parent) {
          XMLCharacterData.__super__.constructor.call(this, parent);

          this.value = '';
        }

        Object.defineProperty(XMLCharacterData.prototype, 'data', {
          get: function get() {
            return this.value;
          },
          set: function set(value) {
            return this.value = value || '';
          }
        });
        Object.defineProperty(XMLCharacterData.prototype, 'length', {
          get: function get() {
            return this.value.length;
          }
        });
        Object.defineProperty(XMLCharacterData.prototype, 'textContent', {
          get: function get() {
            return this.value;
          },
          set: function set(value) {
            return this.value = value || '';
          }
        });

        XMLCharacterData.prototype.clone = function () {
          return Object.create(this);
        };

        XMLCharacterData.prototype.substringData = function (offset, count) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLCharacterData.prototype.appendData = function (arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLCharacterData.prototype.insertData = function (offset, arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLCharacterData.prototype.deleteData = function (offset, count) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLCharacterData.prototype.replaceData = function (offset, count, arg) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLCharacterData.prototype.isEqualNode = function (node) {
          if (!XMLCharacterData.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }

          if (node.data !== this.data) {
            return false;
          }

          return true;
        };

        return XMLCharacterData;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLComment.js":
  /*!***************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLComment.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLCommentJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLCharacterData,
          XMLComment,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLCharacterData = __webpack_require__(
      /*! ./XMLCharacterData */
      "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

      module.exports = XMLComment = function (superClass) {
        extend(XMLComment, superClass);

        function XMLComment(parent, text) {
          XMLComment.__super__.constructor.call(this, parent);

          if (text == null) {
            throw new Error("Missing comment text. " + this.debugInfo());
          }

          this.name = "#comment";
          this.type = NodeType.Comment;
          this.value = this.stringify.comment(text);
        }

        XMLComment.prototype.clone = function () {
          return Object.create(this);
        };

        XMLComment.prototype.toString = function (options) {
          return this.options.writer.comment(this, this.options.writer.filterOptions(options));
        };

        return XMLComment;
      }(XMLCharacterData);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDOMConfiguration.js":
  /*!************************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDOMConfiguration.js ***!
    \************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDOMConfigurationJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var XMLDOMConfiguration, XMLDOMErrorHandler, XMLDOMStringList;
      XMLDOMErrorHandler = __webpack_require__(
      /*! ./XMLDOMErrorHandler */
      "./node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js");
      XMLDOMStringList = __webpack_require__(
      /*! ./XMLDOMStringList */
      "./node_modules/xmlbuilder/lib/XMLDOMStringList.js");

      module.exports = XMLDOMConfiguration = function () {
        function XMLDOMConfiguration() {
          var clonedSelf;
          this.defaultParams = {
            "canonical-form": false,
            "cdata-sections": false,
            "comments": false,
            "datatype-normalization": false,
            "element-content-whitespace": true,
            "entities": true,
            "error-handler": new XMLDOMErrorHandler(),
            "infoset": true,
            "validate-if-schema": false,
            "namespaces": true,
            "namespace-declarations": true,
            "normalize-characters": false,
            "schema-location": '',
            "schema-type": '',
            "split-cdata-sections": true,
            "validate": false,
            "well-formed": true
          };
          this.params = clonedSelf = Object.create(this.defaultParams);
        }

        Object.defineProperty(XMLDOMConfiguration.prototype, 'parameterNames', {
          get: function get() {
            return new XMLDOMStringList(Object.keys(this.defaultParams));
          }
        });

        XMLDOMConfiguration.prototype.getParameter = function (name) {
          if (this.params.hasOwnProperty(name)) {
            return this.params[name];
          } else {
            return null;
          }
        };

        XMLDOMConfiguration.prototype.canSetParameter = function (name, value) {
          return true;
        };

        XMLDOMConfiguration.prototype.setParameter = function (name, value) {
          if (value != null) {
            return this.params[name] = value;
          } else {
            return delete this.params[name];
          }
        };

        return XMLDOMConfiguration;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js":
  /*!***********************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js ***!
    \***********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDOMErrorHandlerJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var XMLDOMErrorHandler;

      module.exports = XMLDOMErrorHandler = function () {
        function XMLDOMErrorHandler() {}

        XMLDOMErrorHandler.prototype.handleError = function (error) {
          throw new Error(error);
        };

        return XMLDOMErrorHandler;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDOMImplementation.js":
  /*!*************************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDOMImplementation.js ***!
    \*************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDOMImplementationJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var XMLDOMImplementation;

      module.exports = XMLDOMImplementation = function () {
        function XMLDOMImplementation() {}

        XMLDOMImplementation.prototype.hasFeature = function (feature, version) {
          return true;
        };

        XMLDOMImplementation.prototype.createDocumentType = function (qualifiedName, publicId, systemId) {
          throw new Error("This DOM method is not implemented.");
        };

        XMLDOMImplementation.prototype.createDocument = function (namespaceURI, qualifiedName, doctype) {
          throw new Error("This DOM method is not implemented.");
        };

        XMLDOMImplementation.prototype.createHTMLDocument = function (title) {
          throw new Error("This DOM method is not implemented.");
        };

        XMLDOMImplementation.prototype.getFeature = function (feature, version) {
          throw new Error("This DOM method is not implemented.");
        };

        return XMLDOMImplementation;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDOMStringList.js":
  /*!*********************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDOMStringList.js ***!
    \*********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDOMStringListJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var XMLDOMStringList;

      module.exports = XMLDOMStringList = function () {
        function XMLDOMStringList(arr) {
          this.arr = arr || [];
        }

        Object.defineProperty(XMLDOMStringList.prototype, 'length', {
          get: function get() {
            return this.arr.length;
          }
        });

        XMLDOMStringList.prototype.item = function (index) {
          return this.arr[index] || null;
        };

        XMLDOMStringList.prototype.contains = function (str) {
          return this.arr.indexOf(str) !== -1;
        };

        return XMLDOMStringList;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDTDAttList.js":
  /*!******************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDTDAttList.js ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDTDAttListJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLDTDAttList,
          XMLNode,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");

      module.exports = XMLDTDAttList = function (superClass) {
        extend(XMLDTDAttList, superClass);

        function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          XMLDTDAttList.__super__.constructor.call(this, parent);

          if (elementName == null) {
            throw new Error("Missing DTD element name. " + this.debugInfo());
          }

          if (attributeName == null) {
            throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
          }

          if (!attributeType) {
            throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
          }

          if (!defaultValueType) {
            throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
          }

          if (defaultValueType.indexOf('#') !== 0) {
            defaultValueType = '#' + defaultValueType;
          }

          if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
            throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
          }

          if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
            throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
          }

          this.elementName = this.stringify.name(elementName);
          this.type = NodeType.AttributeDeclaration;
          this.attributeName = this.stringify.name(attributeName);
          this.attributeType = this.stringify.dtdAttType(attributeType);

          if (defaultValue) {
            this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
          }

          this.defaultValueType = defaultValueType;
        }

        XMLDTDAttList.prototype.toString = function (options) {
          return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
        };

        return XMLDTDAttList;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDTDElement.js":
  /*!******************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDTDElement.js ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDTDElementJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLDTDElement,
          XMLNode,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");

      module.exports = XMLDTDElement = function (superClass) {
        extend(XMLDTDElement, superClass);

        function XMLDTDElement(parent, name, value) {
          XMLDTDElement.__super__.constructor.call(this, parent);

          if (name == null) {
            throw new Error("Missing DTD element name. " + this.debugInfo());
          }

          if (!value) {
            value = '(#PCDATA)';
          }

          if (Array.isArray(value)) {
            value = '(' + value.join(',') + ')';
          }

          this.name = this.stringify.name(name);
          this.type = NodeType.ElementDeclaration;
          this.value = this.stringify.dtdElementValue(value);
        }

        XMLDTDElement.prototype.toString = function (options) {
          return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
        };

        return XMLDTDElement;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDTDEntity.js":
  /*!*****************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDTDEntity.js ***!
    \*****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDTDEntityJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLDTDEntity,
          XMLNode,
          isObject,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      isObject = __webpack_require__(
      /*! ./Utility */
      "./node_modules/xmlbuilder/lib/Utility.js").isObject;
      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");

      module.exports = XMLDTDEntity = function (superClass) {
        extend(XMLDTDEntity, superClass);

        function XMLDTDEntity(parent, pe, name, value) {
          XMLDTDEntity.__super__.constructor.call(this, parent);

          if (name == null) {
            throw new Error("Missing DTD entity name. " + this.debugInfo(name));
          }

          if (value == null) {
            throw new Error("Missing DTD entity value. " + this.debugInfo(name));
          }

          this.pe = !!pe;
          this.name = this.stringify.name(name);
          this.type = NodeType.EntityDeclaration;

          if (!isObject(value)) {
            this.value = this.stringify.dtdEntityValue(value);
            this.internal = true;
          } else {
            if (!value.pubID && !value.sysID) {
              throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
            }

            if (value.pubID && !value.sysID) {
              throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
            }

            this.internal = false;

            if (value.pubID != null) {
              this.pubID = this.stringify.dtdPubID(value.pubID);
            }

            if (value.sysID != null) {
              this.sysID = this.stringify.dtdSysID(value.sysID);
            }

            if (value.nData != null) {
              this.nData = this.stringify.dtdNData(value.nData);
            }

            if (this.pe && this.nData) {
              throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
            }
          }
        }

        Object.defineProperty(XMLDTDEntity.prototype, 'publicId', {
          get: function get() {
            return this.pubID;
          }
        });
        Object.defineProperty(XMLDTDEntity.prototype, 'systemId', {
          get: function get() {
            return this.sysID;
          }
        });
        Object.defineProperty(XMLDTDEntity.prototype, 'notationName', {
          get: function get() {
            return this.nData || null;
          }
        });
        Object.defineProperty(XMLDTDEntity.prototype, 'inputEncoding', {
          get: function get() {
            return null;
          }
        });
        Object.defineProperty(XMLDTDEntity.prototype, 'xmlEncoding', {
          get: function get() {
            return null;
          }
        });
        Object.defineProperty(XMLDTDEntity.prototype, 'xmlVersion', {
          get: function get() {
            return null;
          }
        });

        XMLDTDEntity.prototype.toString = function (options) {
          return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
        };

        return XMLDTDEntity;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDTDNotation.js":
  /*!*******************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDTDNotation.js ***!
    \*******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDTDNotationJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLDTDNotation,
          XMLNode,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");

      module.exports = XMLDTDNotation = function (superClass) {
        extend(XMLDTDNotation, superClass);

        function XMLDTDNotation(parent, name, value) {
          XMLDTDNotation.__super__.constructor.call(this, parent);

          if (name == null) {
            throw new Error("Missing DTD notation name. " + this.debugInfo(name));
          }

          if (!value.pubID && !value.sysID) {
            throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
          }

          this.name = this.stringify.name(name);
          this.type = NodeType.NotationDeclaration;

          if (value.pubID != null) {
            this.pubID = this.stringify.dtdPubID(value.pubID);
          }

          if (value.sysID != null) {
            this.sysID = this.stringify.dtdSysID(value.sysID);
          }
        }

        Object.defineProperty(XMLDTDNotation.prototype, 'publicId', {
          get: function get() {
            return this.pubID;
          }
        });
        Object.defineProperty(XMLDTDNotation.prototype, 'systemId', {
          get: function get() {
            return this.sysID;
          }
        });

        XMLDTDNotation.prototype.toString = function (options) {
          return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
        };

        return XMLDTDNotation;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDeclaration.js":
  /*!*******************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDeclaration.js ***!
    \*******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDeclarationJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLDeclaration,
          XMLNode,
          isObject,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      isObject = __webpack_require__(
      /*! ./Utility */
      "./node_modules/xmlbuilder/lib/Utility.js").isObject;
      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");

      module.exports = XMLDeclaration = function (superClass) {
        extend(XMLDeclaration, superClass);

        function XMLDeclaration(parent, version, encoding, standalone) {
          var ref;

          XMLDeclaration.__super__.constructor.call(this, parent);

          if (isObject(version)) {
            ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
          }

          if (!version) {
            version = '1.0';
          }

          this.type = NodeType.Declaration;
          this.version = this.stringify.xmlVersion(version);

          if (encoding != null) {
            this.encoding = this.stringify.xmlEncoding(encoding);
          }

          if (standalone != null) {
            this.standalone = this.stringify.xmlStandalone(standalone);
          }
        }

        XMLDeclaration.prototype.toString = function (options) {
          return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
        };

        return XMLDeclaration;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDocType.js":
  /*!***************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDocType.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDocTypeJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLDTDAttList,
          XMLDTDElement,
          XMLDTDEntity,
          XMLDTDNotation,
          XMLDocType,
          XMLNamedNodeMap,
          XMLNode,
          isObject,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      isObject = __webpack_require__(
      /*! ./Utility */
      "./node_modules/xmlbuilder/lib/Utility.js").isObject;
      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLDTDAttList = __webpack_require__(
      /*! ./XMLDTDAttList */
      "./node_modules/xmlbuilder/lib/XMLDTDAttList.js");
      XMLDTDEntity = __webpack_require__(
      /*! ./XMLDTDEntity */
      "./node_modules/xmlbuilder/lib/XMLDTDEntity.js");
      XMLDTDElement = __webpack_require__(
      /*! ./XMLDTDElement */
      "./node_modules/xmlbuilder/lib/XMLDTDElement.js");
      XMLDTDNotation = __webpack_require__(
      /*! ./XMLDTDNotation */
      "./node_modules/xmlbuilder/lib/XMLDTDNotation.js");
      XMLNamedNodeMap = __webpack_require__(
      /*! ./XMLNamedNodeMap */
      "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js");

      module.exports = XMLDocType = function (superClass) {
        extend(XMLDocType, superClass);

        function XMLDocType(parent, pubID, sysID) {
          var child, i, len, ref, ref1, ref2;

          XMLDocType.__super__.constructor.call(this, parent);

          this.type = NodeType.DocType;

          if (parent.children) {
            ref = parent.children;

            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];

              if (child.type === NodeType.Element) {
                this.name = child.name;
                break;
              }
            }
          }

          this.documentObject = parent;

          if (isObject(pubID)) {
            ref1 = pubID, pubID = ref1.pubID, sysID = ref1.sysID;
          }

          if (sysID == null) {
            ref2 = [pubID, sysID], sysID = ref2[0], pubID = ref2[1];
          }

          if (pubID != null) {
            this.pubID = this.stringify.dtdPubID(pubID);
          }

          if (sysID != null) {
            this.sysID = this.stringify.dtdSysID(sysID);
          }
        }

        Object.defineProperty(XMLDocType.prototype, 'entities', {
          get: function get() {
            var child, i, len, nodes, ref;
            nodes = {};
            ref = this.children;

            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];

              if (child.type === NodeType.EntityDeclaration && !child.pe) {
                nodes[child.name] = child;
              }
            }

            return new XMLNamedNodeMap(nodes);
          }
        });
        Object.defineProperty(XMLDocType.prototype, 'notations', {
          get: function get() {
            var child, i, len, nodes, ref;
            nodes = {};
            ref = this.children;

            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];

              if (child.type === NodeType.NotationDeclaration) {
                nodes[child.name] = child;
              }
            }

            return new XMLNamedNodeMap(nodes);
          }
        });
        Object.defineProperty(XMLDocType.prototype, 'publicId', {
          get: function get() {
            return this.pubID;
          }
        });
        Object.defineProperty(XMLDocType.prototype, 'systemId', {
          get: function get() {
            return this.sysID;
          }
        });
        Object.defineProperty(XMLDocType.prototype, 'internalSubset', {
          get: function get() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });

        XMLDocType.prototype.element = function (name, value) {
          var child;
          child = new XMLDTDElement(this, name, value);
          this.children.push(child);
          return this;
        };

        XMLDocType.prototype.attList = function (elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          var child;
          child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
          this.children.push(child);
          return this;
        };

        XMLDocType.prototype.entity = function (name, value) {
          var child;
          child = new XMLDTDEntity(this, false, name, value);
          this.children.push(child);
          return this;
        };

        XMLDocType.prototype.pEntity = function (name, value) {
          var child;
          child = new XMLDTDEntity(this, true, name, value);
          this.children.push(child);
          return this;
        };

        XMLDocType.prototype.notation = function (name, value) {
          var child;
          child = new XMLDTDNotation(this, name, value);
          this.children.push(child);
          return this;
        };

        XMLDocType.prototype.toString = function (options) {
          return this.options.writer.docType(this, this.options.writer.filterOptions(options));
        };

        XMLDocType.prototype.ele = function (name, value) {
          return this.element(name, value);
        };

        XMLDocType.prototype.att = function (elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
        };

        XMLDocType.prototype.ent = function (name, value) {
          return this.entity(name, value);
        };

        XMLDocType.prototype.pent = function (name, value) {
          return this.pEntity(name, value);
        };

        XMLDocType.prototype.not = function (name, value) {
          return this.notation(name, value);
        };

        XMLDocType.prototype.up = function () {
          return this.root() || this.documentObject;
        };

        XMLDocType.prototype.isEqualNode = function (node) {
          if (!XMLDocType.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }

          if (node.name !== this.name) {
            return false;
          }

          if (node.publicId !== this.publicId) {
            return false;
          }

          if (node.systemId !== this.systemId) {
            return false;
          }

          return true;
        };

        return XMLDocType;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDocument.js":
  /*!****************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDocument.js ***!
    \****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDocumentJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLDOMConfiguration,
          XMLDOMImplementation,
          XMLDocument,
          XMLNode,
          XMLStringWriter,
          XMLStringifier,
          isPlainObject,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      isPlainObject = __webpack_require__(
      /*! ./Utility */
      "./node_modules/xmlbuilder/lib/Utility.js").isPlainObject;
      XMLDOMImplementation = __webpack_require__(
      /*! ./XMLDOMImplementation */
      "./node_modules/xmlbuilder/lib/XMLDOMImplementation.js");
      XMLDOMConfiguration = __webpack_require__(
      /*! ./XMLDOMConfiguration */
      "./node_modules/xmlbuilder/lib/XMLDOMConfiguration.js");
      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLStringifier = __webpack_require__(
      /*! ./XMLStringifier */
      "./node_modules/xmlbuilder/lib/XMLStringifier.js");
      XMLStringWriter = __webpack_require__(
      /*! ./XMLStringWriter */
      "./node_modules/xmlbuilder/lib/XMLStringWriter.js");

      module.exports = XMLDocument = function (superClass) {
        extend(XMLDocument, superClass);

        function XMLDocument(options) {
          XMLDocument.__super__.constructor.call(this, null);

          this.name = "#document";
          this.type = NodeType.Document;
          this.documentURI = null;
          this.domConfig = new XMLDOMConfiguration();
          options || (options = {});

          if (!options.writer) {
            options.writer = new XMLStringWriter();
          }

          this.options = options;
          this.stringify = new XMLStringifier(options);
        }

        Object.defineProperty(XMLDocument.prototype, 'implementation', {
          value: new XMLDOMImplementation()
        });
        Object.defineProperty(XMLDocument.prototype, 'doctype', {
          get: function get() {
            var child, i, len, ref;
            ref = this.children;

            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];

              if (child.type === NodeType.DocType) {
                return child;
              }
            }

            return null;
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'documentElement', {
          get: function get() {
            return this.rootObject || null;
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'inputEncoding', {
          get: function get() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'strictErrorChecking', {
          get: function get() {
            return false;
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'xmlEncoding', {
          get: function get() {
            if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
              return this.children[0].encoding;
            } else {
              return null;
            }
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'xmlStandalone', {
          get: function get() {
            if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
              return this.children[0].standalone === 'yes';
            } else {
              return false;
            }
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'xmlVersion', {
          get: function get() {
            if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
              return this.children[0].version;
            } else {
              return "1.0";
            }
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'URL', {
          get: function get() {
            return this.documentURI;
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'origin', {
          get: function get() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'compatMode', {
          get: function get() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'characterSet', {
          get: function get() {
            return null;
          }
        });
        Object.defineProperty(XMLDocument.prototype, 'contentType', {
          get: function get() {
            return null;
          }
        });

        XMLDocument.prototype.end = function (writer) {
          var writerOptions;
          writerOptions = {};

          if (!writer) {
            writer = this.options.writer;
          } else if (isPlainObject(writer)) {
            writerOptions = writer;
            writer = this.options.writer;
          }

          return writer.document(this, writer.filterOptions(writerOptions));
        };

        XMLDocument.prototype.toString = function (options) {
          return this.options.writer.document(this, this.options.writer.filterOptions(options));
        };

        XMLDocument.prototype.createElement = function (tagName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createDocumentFragment = function () {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createTextNode = function (data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createComment = function (data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createCDATASection = function (data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createProcessingInstruction = function (target, data) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createAttribute = function (name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createEntityReference = function (name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.getElementsByTagName = function (tagname) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.importNode = function (importedNode, deep) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createElementNS = function (namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createAttributeNS = function (namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.getElementsByTagNameNS = function (namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.getElementById = function (elementId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.adoptNode = function (source) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.normalizeDocument = function () {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.renameNode = function (node, namespaceURI, qualifiedName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.getElementsByClassName = function (classNames) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createEvent = function (eventInterface) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createRange = function () {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createNodeIterator = function (root, whatToShow, filter) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLDocument.prototype.createTreeWalker = function (root, whatToShow, filter) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        return XMLDocument;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDocumentCB.js":
  /*!******************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDocumentCB.js ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDocumentCBJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          WriterState,
          XMLAttribute,
          XMLCData,
          XMLComment,
          XMLDTDAttList,
          XMLDTDElement,
          XMLDTDEntity,
          XMLDTDNotation,
          XMLDeclaration,
          XMLDocType,
          XMLDocument,
          XMLDocumentCB,
          XMLElement,
          XMLProcessingInstruction,
          XMLRaw,
          XMLStringWriter,
          XMLStringifier,
          XMLText,
          getValue,
          isFunction,
          isObject,
          isPlainObject,
          ref,
          hasProp = {}.hasOwnProperty;
      ref = __webpack_require__(
      /*! ./Utility */
      "./node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLDocument = __webpack_require__(
      /*! ./XMLDocument */
      "./node_modules/xmlbuilder/lib/XMLDocument.js");
      XMLElement = __webpack_require__(
      /*! ./XMLElement */
      "./node_modules/xmlbuilder/lib/XMLElement.js");
      XMLCData = __webpack_require__(
      /*! ./XMLCData */
      "./node_modules/xmlbuilder/lib/XMLCData.js");
      XMLComment = __webpack_require__(
      /*! ./XMLComment */
      "./node_modules/xmlbuilder/lib/XMLComment.js");
      XMLRaw = __webpack_require__(
      /*! ./XMLRaw */
      "./node_modules/xmlbuilder/lib/XMLRaw.js");
      XMLText = __webpack_require__(
      /*! ./XMLText */
      "./node_modules/xmlbuilder/lib/XMLText.js");
      XMLProcessingInstruction = __webpack_require__(
      /*! ./XMLProcessingInstruction */
      "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");
      XMLDeclaration = __webpack_require__(
      /*! ./XMLDeclaration */
      "./node_modules/xmlbuilder/lib/XMLDeclaration.js");
      XMLDocType = __webpack_require__(
      /*! ./XMLDocType */
      "./node_modules/xmlbuilder/lib/XMLDocType.js");
      XMLDTDAttList = __webpack_require__(
      /*! ./XMLDTDAttList */
      "./node_modules/xmlbuilder/lib/XMLDTDAttList.js");
      XMLDTDEntity = __webpack_require__(
      /*! ./XMLDTDEntity */
      "./node_modules/xmlbuilder/lib/XMLDTDEntity.js");
      XMLDTDElement = __webpack_require__(
      /*! ./XMLDTDElement */
      "./node_modules/xmlbuilder/lib/XMLDTDElement.js");
      XMLDTDNotation = __webpack_require__(
      /*! ./XMLDTDNotation */
      "./node_modules/xmlbuilder/lib/XMLDTDNotation.js");
      XMLAttribute = __webpack_require__(
      /*! ./XMLAttribute */
      "./node_modules/xmlbuilder/lib/XMLAttribute.js");
      XMLStringifier = __webpack_require__(
      /*! ./XMLStringifier */
      "./node_modules/xmlbuilder/lib/XMLStringifier.js");
      XMLStringWriter = __webpack_require__(
      /*! ./XMLStringWriter */
      "./node_modules/xmlbuilder/lib/XMLStringWriter.js");
      WriterState = __webpack_require__(
      /*! ./WriterState */
      "./node_modules/xmlbuilder/lib/WriterState.js");

      module.exports = XMLDocumentCB = function () {
        function XMLDocumentCB(options, onData, onEnd) {
          var writerOptions;
          this.name = "?xml";
          this.type = NodeType.Document;
          options || (options = {});
          writerOptions = {};

          if (!options.writer) {
            options.writer = new XMLStringWriter();
          } else if (isPlainObject(options.writer)) {
            writerOptions = options.writer;
            options.writer = new XMLStringWriter();
          }

          this.options = options;
          this.writer = options.writer;
          this.writerOptions = this.writer.filterOptions(writerOptions);
          this.stringify = new XMLStringifier(options);

          this.onDataCallback = onData || function () {};

          this.onEndCallback = onEnd || function () {};

          this.currentNode = null;
          this.currentLevel = -1;
          this.openTags = {};
          this.documentStarted = false;
          this.documentCompleted = false;
          this.root = null;
        }

        XMLDocumentCB.prototype.createChildNode = function (node) {
          var att, attName, attributes, child, i, len, ref1, ref2;

          switch (node.type) {
            case NodeType.CData:
              this.cdata(node.value);
              break;

            case NodeType.Comment:
              this.comment(node.value);
              break;

            case NodeType.Element:
              attributes = {};
              ref1 = node.attribs;

              for (attName in ref1) {
                if (!hasProp.call(ref1, attName)) continue;
                att = ref1[attName];
                attributes[attName] = att.value;
              }

              this.node(node.name, attributes);
              break;

            case NodeType.Dummy:
              this.dummy();
              break;

            case NodeType.Raw:
              this.raw(node.value);
              break;

            case NodeType.Text:
              this.text(node.value);
              break;

            case NodeType.ProcessingInstruction:
              this.instruction(node.target, node.value);
              break;

            default:
              throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
          }

          ref2 = node.children;

          for (i = 0, len = ref2.length; i < len; i++) {
            child = ref2[i];
            this.createChildNode(child);

            if (child.type === NodeType.Element) {
              this.up();
            }
          }

          return this;
        };

        XMLDocumentCB.prototype.dummy = function () {
          return this;
        };

        XMLDocumentCB.prototype.node = function (name, attributes, text) {
          var ref1;

          if (name == null) {
            throw new Error("Missing node name.");
          }

          if (this.root && this.currentLevel === -1) {
            throw new Error("Document can only have one root node. " + this.debugInfo(name));
          }

          this.openCurrent();
          name = getValue(name);

          if (attributes == null) {
            attributes = {};
          }

          attributes = getValue(attributes);

          if (!isObject(attributes)) {
            ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
          }

          this.currentNode = new XMLElement(this, name, attributes);
          this.currentNode.children = false;
          this.currentLevel++;
          this.openTags[this.currentLevel] = this.currentNode;

          if (text != null) {
            this.text(text);
          }

          return this;
        };

        XMLDocumentCB.prototype.element = function (name, attributes, text) {
          var child, i, len, oldValidationFlag, ref1, root;

          if (this.currentNode && this.currentNode.type === NodeType.DocType) {
            this.dtdElement.apply(this, arguments);
          } else {
            if (Array.isArray(name) || isObject(name) || isFunction(name)) {
              oldValidationFlag = this.options.noValidation;
              this.options.noValidation = true;
              root = new XMLDocument(this.options).element('TEMP_ROOT');
              root.element(name);
              this.options.noValidation = oldValidationFlag;
              ref1 = root.children;

              for (i = 0, len = ref1.length; i < len; i++) {
                child = ref1[i];
                this.createChildNode(child);

                if (child.type === NodeType.Element) {
                  this.up();
                }
              }
            } else {
              this.node(name, attributes, text);
            }
          }

          return this;
        };

        XMLDocumentCB.prototype.attribute = function (name, value) {
          var attName, attValue;

          if (!this.currentNode || this.currentNode.children) {
            throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
          }

          if (name != null) {
            name = getValue(name);
          }

          if (isObject(name)) {
            for (attName in name) {
              if (!hasProp.call(name, attName)) continue;
              attValue = name[attName];
              this.attribute(attName, attValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }

            if (this.options.keepNullAttributes && value == null) {
              this.currentNode.attribs[name] = new XMLAttribute(this, name, "");
            } else if (value != null) {
              this.currentNode.attribs[name] = new XMLAttribute(this, name, value);
            }
          }

          return this;
        };

        XMLDocumentCB.prototype.text = function (value) {
          var node;
          this.openCurrent();
          node = new XMLText(this, value);
          this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };

        XMLDocumentCB.prototype.cdata = function (value) {
          var node;
          this.openCurrent();
          node = new XMLCData(this, value);
          this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };

        XMLDocumentCB.prototype.comment = function (value) {
          var node;
          this.openCurrent();
          node = new XMLComment(this, value);
          this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };

        XMLDocumentCB.prototype.raw = function (value) {
          var node;
          this.openCurrent();
          node = new XMLRaw(this, value);
          this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };

        XMLDocumentCB.prototype.instruction = function (target, value) {
          var i, insTarget, insValue, len, node;
          this.openCurrent();

          if (target != null) {
            target = getValue(target);
          }

          if (value != null) {
            value = getValue(value);
          }

          if (Array.isArray(target)) {
            for (i = 0, len = target.length; i < len; i++) {
              insTarget = target[i];
              this.instruction(insTarget);
            }
          } else if (isObject(target)) {
            for (insTarget in target) {
              if (!hasProp.call(target, insTarget)) continue;
              insValue = target[insTarget];
              this.instruction(insTarget, insValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }

            node = new XMLProcessingInstruction(this, target, value);
            this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          }

          return this;
        };

        XMLDocumentCB.prototype.declaration = function (version, encoding, standalone) {
          var node;
          this.openCurrent();

          if (this.documentStarted) {
            throw new Error("declaration() must be the first node.");
          }

          node = new XMLDeclaration(this, version, encoding, standalone);
          this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };

        XMLDocumentCB.prototype.doctype = function (root, pubID, sysID) {
          this.openCurrent();

          if (root == null) {
            throw new Error("Missing root node name.");
          }

          if (this.root) {
            throw new Error("dtd() must come before the root node.");
          }

          this.currentNode = new XMLDocType(this, pubID, sysID);
          this.currentNode.rootNodeName = root;
          this.currentNode.children = false;
          this.currentLevel++;
          this.openTags[this.currentLevel] = this.currentNode;
          return this;
        };

        XMLDocumentCB.prototype.dtdElement = function (name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDElement(this, name, value);
          this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };

        XMLDocumentCB.prototype.attList = function (elementName, attributeName, attributeType, defaultValueType, defaultValue) {
          var node;
          this.openCurrent();
          node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
          this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };

        XMLDocumentCB.prototype.entity = function (name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDEntity(this, false, name, value);
          this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };

        XMLDocumentCB.prototype.pEntity = function (name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDEntity(this, true, name, value);
          this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };

        XMLDocumentCB.prototype.notation = function (name, value) {
          var node;
          this.openCurrent();
          node = new XMLDTDNotation(this, name, value);
          this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
          return this;
        };

        XMLDocumentCB.prototype.up = function () {
          if (this.currentLevel < 0) {
            throw new Error("The document node has no parent.");
          }

          if (this.currentNode) {
            if (this.currentNode.children) {
              this.closeNode(this.currentNode);
            } else {
              this.openNode(this.currentNode);
            }

            this.currentNode = null;
          } else {
            this.closeNode(this.openTags[this.currentLevel]);
          }

          delete this.openTags[this.currentLevel];
          this.currentLevel--;
          return this;
        };

        XMLDocumentCB.prototype.end = function () {
          while (this.currentLevel >= 0) {
            this.up();
          }

          return this.onEnd();
        };

        XMLDocumentCB.prototype.openCurrent = function () {
          if (this.currentNode) {
            this.currentNode.children = true;
            return this.openNode(this.currentNode);
          }
        };

        XMLDocumentCB.prototype.openNode = function (node) {
          var att, chunk, name, ref1;

          if (!node.isOpen) {
            if (!this.root && this.currentLevel === 0 && node.type === NodeType.Element) {
              this.root = node;
            }

            chunk = '';

            if (node.type === NodeType.Element) {
              this.writerOptions.state = WriterState.OpenTag;
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '<' + node.name;
              ref1 = node.attribs;

              for (name in ref1) {
                if (!hasProp.call(ref1, name)) continue;
                att = ref1[name];
                chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
              }

              chunk += (node.children ? '>' : '/>') + this.writer.endline(node, this.writerOptions, this.currentLevel);
              this.writerOptions.state = WriterState.InsideTag;
            } else {
              this.writerOptions.state = WriterState.OpenTag;
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '<!DOCTYPE ' + node.rootNodeName;

              if (node.pubID && node.sysID) {
                chunk += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
              } else if (node.sysID) {
                chunk += ' SYSTEM "' + node.sysID + '"';
              }

              if (node.children) {
                chunk += ' [';
                this.writerOptions.state = WriterState.InsideTag;
              } else {
                this.writerOptions.state = WriterState.CloseTag;
                chunk += '>';
              }

              chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
            }

            this.onData(chunk, this.currentLevel);
            return node.isOpen = true;
          }
        };

        XMLDocumentCB.prototype.closeNode = function (node) {
          var chunk;

          if (!node.isClosed) {
            chunk = '';
            this.writerOptions.state = WriterState.CloseTag;

            if (node.type === NodeType.Element) {
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '</' + node.name + '>' + this.writer.endline(node, this.writerOptions, this.currentLevel);
            } else {
              chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + ']>' + this.writer.endline(node, this.writerOptions, this.currentLevel);
            }

            this.writerOptions.state = WriterState.None;
            this.onData(chunk, this.currentLevel);
            return node.isClosed = true;
          }
        };

        XMLDocumentCB.prototype.onData = function (chunk, level) {
          this.documentStarted = true;
          return this.onDataCallback(chunk, level + 1);
        };

        XMLDocumentCB.prototype.onEnd = function () {
          this.documentCompleted = true;
          return this.onEndCallback();
        };

        XMLDocumentCB.prototype.debugInfo = function (name) {
          if (name == null) {
            return "";
          } else {
            return "node: <" + name + ">";
          }
        };

        XMLDocumentCB.prototype.ele = function () {
          return this.element.apply(this, arguments);
        };

        XMLDocumentCB.prototype.nod = function (name, attributes, text) {
          return this.node(name, attributes, text);
        };

        XMLDocumentCB.prototype.txt = function (value) {
          return this.text(value);
        };

        XMLDocumentCB.prototype.dat = function (value) {
          return this.cdata(value);
        };

        XMLDocumentCB.prototype.com = function (value) {
          return this.comment(value);
        };

        XMLDocumentCB.prototype.ins = function (target, value) {
          return this.instruction(target, value);
        };

        XMLDocumentCB.prototype.dec = function (version, encoding, standalone) {
          return this.declaration(version, encoding, standalone);
        };

        XMLDocumentCB.prototype.dtd = function (root, pubID, sysID) {
          return this.doctype(root, pubID, sysID);
        };

        XMLDocumentCB.prototype.e = function (name, attributes, text) {
          return this.element(name, attributes, text);
        };

        XMLDocumentCB.prototype.n = function (name, attributes, text) {
          return this.node(name, attributes, text);
        };

        XMLDocumentCB.prototype.t = function (value) {
          return this.text(value);
        };

        XMLDocumentCB.prototype.d = function (value) {
          return this.cdata(value);
        };

        XMLDocumentCB.prototype.c = function (value) {
          return this.comment(value);
        };

        XMLDocumentCB.prototype.r = function (value) {
          return this.raw(value);
        };

        XMLDocumentCB.prototype.i = function (target, value) {
          return this.instruction(target, value);
        };

        XMLDocumentCB.prototype.att = function () {
          if (this.currentNode && this.currentNode.type === NodeType.DocType) {
            return this.attList.apply(this, arguments);
          } else {
            return this.attribute.apply(this, arguments);
          }
        };

        XMLDocumentCB.prototype.a = function () {
          if (this.currentNode && this.currentNode.type === NodeType.DocType) {
            return this.attList.apply(this, arguments);
          } else {
            return this.attribute.apply(this, arguments);
          }
        };

        XMLDocumentCB.prototype.ent = function (name, value) {
          return this.entity(name, value);
        };

        XMLDocumentCB.prototype.pent = function (name, value) {
          return this.pEntity(name, value);
        };

        XMLDocumentCB.prototype.not = function (name, value) {
          return this.notation(name, value);
        };

        return XMLDocumentCB;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLDummy.js":
  /*!*************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLDummy.js ***!
    \*************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLDummyJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLDummy,
          XMLNode,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");

      module.exports = XMLDummy = function (superClass) {
        extend(XMLDummy, superClass);

        function XMLDummy(parent) {
          XMLDummy.__super__.constructor.call(this, parent);

          this.type = NodeType.Dummy;
        }

        XMLDummy.prototype.clone = function () {
          return Object.create(this);
        };

        XMLDummy.prototype.toString = function (options) {
          return '';
        };

        return XMLDummy;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLElement.js":
  /*!***************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLElement.js ***!
    \***************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLElementJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLAttribute,
          XMLElement,
          XMLNamedNodeMap,
          XMLNode,
          getValue,
          isFunction,
          isObject,
          ref,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      ref = __webpack_require__(
      /*! ./Utility */
      "./node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;
      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLAttribute = __webpack_require__(
      /*! ./XMLAttribute */
      "./node_modules/xmlbuilder/lib/XMLAttribute.js");
      XMLNamedNodeMap = __webpack_require__(
      /*! ./XMLNamedNodeMap */
      "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js");

      module.exports = XMLElement = function (superClass) {
        extend(XMLElement, superClass);

        function XMLElement(parent, name, attributes) {
          var child, j, len, ref1;

          XMLElement.__super__.constructor.call(this, parent);

          if (name == null) {
            throw new Error("Missing element name. " + this.debugInfo());
          }

          this.name = this.stringify.name(name);
          this.type = NodeType.Element;
          this.attribs = {};
          this.schemaTypeInfo = null;

          if (attributes != null) {
            this.attribute(attributes);
          }

          if (parent.type === NodeType.Document) {
            this.isRoot = true;
            this.documentObject = parent;
            parent.rootObject = this;

            if (parent.children) {
              ref1 = parent.children;

              for (j = 0, len = ref1.length; j < len; j++) {
                child = ref1[j];

                if (child.type === NodeType.DocType) {
                  child.name = this.name;
                  break;
                }
              }
            }
          }
        }

        Object.defineProperty(XMLElement.prototype, 'tagName', {
          get: function get() {
            return this.name;
          }
        });
        Object.defineProperty(XMLElement.prototype, 'namespaceURI', {
          get: function get() {
            return '';
          }
        });
        Object.defineProperty(XMLElement.prototype, 'prefix', {
          get: function get() {
            return '';
          }
        });
        Object.defineProperty(XMLElement.prototype, 'localName', {
          get: function get() {
            return this.name;
          }
        });
        Object.defineProperty(XMLElement.prototype, 'id', {
          get: function get() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLElement.prototype, 'className', {
          get: function get() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLElement.prototype, 'classList', {
          get: function get() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLElement.prototype, 'attributes', {
          get: function get() {
            if (!this.attributeMap || !this.attributeMap.nodes) {
              this.attributeMap = new XMLNamedNodeMap(this.attribs);
            }

            return this.attributeMap;
          }
        });

        XMLElement.prototype.clone = function () {
          var att, attName, clonedSelf, ref1;
          clonedSelf = Object.create(this);

          if (clonedSelf.isRoot) {
            clonedSelf.documentObject = null;
          }

          clonedSelf.attribs = {};
          ref1 = this.attribs;

          for (attName in ref1) {
            if (!hasProp.call(ref1, attName)) continue;
            att = ref1[attName];
            clonedSelf.attribs[attName] = att.clone();
          }

          clonedSelf.children = [];
          this.children.forEach(function (child) {
            var clonedChild;
            clonedChild = child.clone();
            clonedChild.parent = clonedSelf;
            return clonedSelf.children.push(clonedChild);
          });
          return clonedSelf;
        };

        XMLElement.prototype.attribute = function (name, value) {
          var attName, attValue;

          if (name != null) {
            name = getValue(name);
          }

          if (isObject(name)) {
            for (attName in name) {
              if (!hasProp.call(name, attName)) continue;
              attValue = name[attName];
              this.attribute(attName, attValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }

            if (this.options.keepNullAttributes && value == null) {
              this.attribs[name] = new XMLAttribute(this, name, "");
            } else if (value != null) {
              this.attribs[name] = new XMLAttribute(this, name, value);
            }
          }

          return this;
        };

        XMLElement.prototype.removeAttribute = function (name) {
          var attName, j, len;

          if (name == null) {
            throw new Error("Missing attribute name. " + this.debugInfo());
          }

          name = getValue(name);

          if (Array.isArray(name)) {
            for (j = 0, len = name.length; j < len; j++) {
              attName = name[j];
              delete this.attribs[attName];
            }
          } else {
            delete this.attribs[name];
          }

          return this;
        };

        XMLElement.prototype.toString = function (options) {
          return this.options.writer.element(this, this.options.writer.filterOptions(options));
        };

        XMLElement.prototype.att = function (name, value) {
          return this.attribute(name, value);
        };

        XMLElement.prototype.a = function (name, value) {
          return this.attribute(name, value);
        };

        XMLElement.prototype.getAttribute = function (name) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name].value;
          } else {
            return null;
          }
        };

        XMLElement.prototype.setAttribute = function (name, value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.getAttributeNode = function (name) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name];
          } else {
            return null;
          }
        };

        XMLElement.prototype.setAttributeNode = function (newAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.removeAttributeNode = function (oldAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.getElementsByTagName = function (name) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.getAttributeNS = function (namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.setAttributeNS = function (namespaceURI, qualifiedName, value) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.removeAttributeNS = function (namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.getAttributeNodeNS = function (namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.setAttributeNodeNS = function (newAttr) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.getElementsByTagNameNS = function (namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.hasAttribute = function (name) {
          return this.attribs.hasOwnProperty(name);
        };

        XMLElement.prototype.hasAttributeNS = function (namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.setIdAttribute = function (name, isId) {
          if (this.attribs.hasOwnProperty(name)) {
            return this.attribs[name].isId;
          } else {
            return isId;
          }
        };

        XMLElement.prototype.setIdAttributeNS = function (namespaceURI, localName, isId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.setIdAttributeNode = function (idAttr, isId) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.getElementsByTagName = function (tagname) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.getElementsByTagNameNS = function (namespaceURI, localName) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.getElementsByClassName = function (classNames) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLElement.prototype.isEqualNode = function (node) {
          var i, j, ref1;

          if (!XMLElement.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }

          if (node.namespaceURI !== this.namespaceURI) {
            return false;
          }

          if (node.prefix !== this.prefix) {
            return false;
          }

          if (node.localName !== this.localName) {
            return false;
          }

          if (node.attribs.length !== this.attribs.length) {
            return false;
          }

          for (i = j = 0, ref1 = this.attribs.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
            if (!this.attribs[i].isEqualNode(node.attribs[i])) {
              return false;
            }
          }

          return true;
        };

        return XMLElement;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js":
  /*!********************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js ***!
    \********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLNamedNodeMapJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var XMLNamedNodeMap;

      module.exports = XMLNamedNodeMap = function () {
        function XMLNamedNodeMap(nodes) {
          this.nodes = nodes;
        }

        Object.defineProperty(XMLNamedNodeMap.prototype, 'length', {
          get: function get() {
            return Object.keys(this.nodes).length || 0;
          }
        });

        XMLNamedNodeMap.prototype.clone = function () {
          return this.nodes = null;
        };

        XMLNamedNodeMap.prototype.getNamedItem = function (name) {
          return this.nodes[name];
        };

        XMLNamedNodeMap.prototype.setNamedItem = function (node) {
          var oldNode;
          oldNode = this.nodes[node.nodeName];
          this.nodes[node.nodeName] = node;
          return oldNode || null;
        };

        XMLNamedNodeMap.prototype.removeNamedItem = function (name) {
          var oldNode;
          oldNode = this.nodes[name];
          delete this.nodes[name];
          return oldNode || null;
        };

        XMLNamedNodeMap.prototype.item = function (index) {
          return this.nodes[Object.keys(this.nodes)[index]] || null;
        };

        XMLNamedNodeMap.prototype.getNamedItemNS = function (namespaceURI, localName) {
          throw new Error("This DOM method is not implemented.");
        };

        XMLNamedNodeMap.prototype.setNamedItemNS = function (node) {
          throw new Error("This DOM method is not implemented.");
        };

        XMLNamedNodeMap.prototype.removeNamedItemNS = function (namespaceURI, localName) {
          throw new Error("This DOM method is not implemented.");
        };

        return XMLNamedNodeMap;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLNode.js":
  /*!************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLNode.js ***!
    \************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLNodeJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var DocumentPosition,
          NodeType,
          XMLCData,
          XMLComment,
          XMLDeclaration,
          XMLDocType,
          XMLDummy,
          XMLElement,
          XMLNamedNodeMap,
          XMLNode,
          XMLNodeList,
          XMLProcessingInstruction,
          XMLRaw,
          XMLText,
          getValue,
          isEmpty,
          isFunction,
          isObject,
          ref1,
          hasProp = {}.hasOwnProperty;
      ref1 = __webpack_require__(
      /*! ./Utility */
      "./node_modules/xmlbuilder/lib/Utility.js"), isObject = ref1.isObject, isFunction = ref1.isFunction, isEmpty = ref1.isEmpty, getValue = ref1.getValue;
      XMLElement = null;
      XMLCData = null;
      XMLComment = null;
      XMLDeclaration = null;
      XMLDocType = null;
      XMLRaw = null;
      XMLText = null;
      XMLProcessingInstruction = null;
      XMLDummy = null;
      NodeType = null;
      XMLNodeList = null;
      XMLNamedNodeMap = null;
      DocumentPosition = null;

      module.exports = XMLNode = function () {
        function XMLNode(parent1) {
          this.parent = parent1;

          if (this.parent) {
            this.options = this.parent.options;
            this.stringify = this.parent.stringify;
          }

          this.value = null;
          this.children = [];
          this.baseURI = null;

          if (!XMLElement) {
            XMLElement = __webpack_require__(
            /*! ./XMLElement */
            "./node_modules/xmlbuilder/lib/XMLElement.js");
            XMLCData = __webpack_require__(
            /*! ./XMLCData */
            "./node_modules/xmlbuilder/lib/XMLCData.js");
            XMLComment = __webpack_require__(
            /*! ./XMLComment */
            "./node_modules/xmlbuilder/lib/XMLComment.js");
            XMLDeclaration = __webpack_require__(
            /*! ./XMLDeclaration */
            "./node_modules/xmlbuilder/lib/XMLDeclaration.js");
            XMLDocType = __webpack_require__(
            /*! ./XMLDocType */
            "./node_modules/xmlbuilder/lib/XMLDocType.js");
            XMLRaw = __webpack_require__(
            /*! ./XMLRaw */
            "./node_modules/xmlbuilder/lib/XMLRaw.js");
            XMLText = __webpack_require__(
            /*! ./XMLText */
            "./node_modules/xmlbuilder/lib/XMLText.js");
            XMLProcessingInstruction = __webpack_require__(
            /*! ./XMLProcessingInstruction */
            "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");
            XMLDummy = __webpack_require__(
            /*! ./XMLDummy */
            "./node_modules/xmlbuilder/lib/XMLDummy.js");
            NodeType = __webpack_require__(
            /*! ./NodeType */
            "./node_modules/xmlbuilder/lib/NodeType.js");
            XMLNodeList = __webpack_require__(
            /*! ./XMLNodeList */
            "./node_modules/xmlbuilder/lib/XMLNodeList.js");
            XMLNamedNodeMap = __webpack_require__(
            /*! ./XMLNamedNodeMap */
            "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js");
            DocumentPosition = __webpack_require__(
            /*! ./DocumentPosition */
            "./node_modules/xmlbuilder/lib/DocumentPosition.js");
          }
        }

        Object.defineProperty(XMLNode.prototype, 'nodeName', {
          get: function get() {
            return this.name;
          }
        });
        Object.defineProperty(XMLNode.prototype, 'nodeType', {
          get: function get() {
            return this.type;
          }
        });
        Object.defineProperty(XMLNode.prototype, 'nodeValue', {
          get: function get() {
            return this.value;
          }
        });
        Object.defineProperty(XMLNode.prototype, 'parentNode', {
          get: function get() {
            return this.parent;
          }
        });
        Object.defineProperty(XMLNode.prototype, 'childNodes', {
          get: function get() {
            if (!this.childNodeList || !this.childNodeList.nodes) {
              this.childNodeList = new XMLNodeList(this.children);
            }

            return this.childNodeList;
          }
        });
        Object.defineProperty(XMLNode.prototype, 'firstChild', {
          get: function get() {
            return this.children[0] || null;
          }
        });
        Object.defineProperty(XMLNode.prototype, 'lastChild', {
          get: function get() {
            return this.children[this.children.length - 1] || null;
          }
        });
        Object.defineProperty(XMLNode.prototype, 'previousSibling', {
          get: function get() {
            var i;
            i = this.parent.children.indexOf(this);
            return this.parent.children[i - 1] || null;
          }
        });
        Object.defineProperty(XMLNode.prototype, 'nextSibling', {
          get: function get() {
            var i;
            i = this.parent.children.indexOf(this);
            return this.parent.children[i + 1] || null;
          }
        });
        Object.defineProperty(XMLNode.prototype, 'ownerDocument', {
          get: function get() {
            return this.document() || null;
          }
        });
        Object.defineProperty(XMLNode.prototype, 'textContent', {
          get: function get() {
            var child, j, len, ref2, str;

            if (this.nodeType === NodeType.Element || this.nodeType === NodeType.DocumentFragment) {
              str = '';
              ref2 = this.children;

              for (j = 0, len = ref2.length; j < len; j++) {
                child = ref2[j];

                if (child.textContent) {
                  str += child.textContent;
                }
              }

              return str;
            } else {
              return null;
            }
          },
          set: function set(value) {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });

        XMLNode.prototype.setParent = function (parent) {
          var child, j, len, ref2, results;
          this.parent = parent;

          if (parent) {
            this.options = parent.options;
            this.stringify = parent.stringify;
          }

          ref2 = this.children;
          results = [];

          for (j = 0, len = ref2.length; j < len; j++) {
            child = ref2[j];
            results.push(child.setParent(this));
          }

          return results;
        };

        XMLNode.prototype.element = function (name, attributes, text) {
          var childNode, item, j, k, key, lastChild, len, len1, ref2, ref3, val;
          lastChild = null;

          if (attributes === null && text == null) {
            ref2 = [{}, null], attributes = ref2[0], text = ref2[1];
          }

          if (attributes == null) {
            attributes = {};
          }

          attributes = getValue(attributes);

          if (!isObject(attributes)) {
            ref3 = [attributes, text], text = ref3[0], attributes = ref3[1];
          }

          if (name != null) {
            name = getValue(name);
          }

          if (Array.isArray(name)) {
            for (j = 0, len = name.length; j < len; j++) {
              item = name[j];
              lastChild = this.element(item);
            }
          } else if (isFunction(name)) {
            lastChild = this.element(name.apply());
          } else if (isObject(name)) {
            for (key in name) {
              if (!hasProp.call(name, key)) continue;
              val = name[key];

              if (isFunction(val)) {
                val = val.apply();
              }

              if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
                lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
              } else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) {
                lastChild = this.dummy();
              } else if (isObject(val) && isEmpty(val)) {
                lastChild = this.element(key);
              } else if (!this.options.keepNullNodes && val == null) {
                lastChild = this.dummy();
              } else if (!this.options.separateArrayItems && Array.isArray(val)) {
                for (k = 0, len1 = val.length; k < len1; k++) {
                  item = val[k];
                  childNode = {};
                  childNode[key] = item;
                  lastChild = this.element(childNode);
                }
              } else if (isObject(val)) {
                if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) {
                  lastChild = this.element(val);
                } else {
                  lastChild = this.element(key);
                  lastChild.element(val);
                }
              } else {
                lastChild = this.element(key, val);
              }
            }
          } else if (!this.options.keepNullNodes && text === null) {
            lastChild = this.dummy();
          } else {
            if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
              lastChild = this.text(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
              lastChild = this.cdata(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
              lastChild = this.comment(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
              lastChild = this.raw(text);
            } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
              lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
            } else {
              lastChild = this.node(name, attributes, text);
            }
          }

          if (lastChild == null) {
            throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
          }

          return lastChild;
        };

        XMLNode.prototype.insertBefore = function (name, attributes, text) {
          var child, i, newChild, refChild, removed;

          if (name != null ? name.type : void 0) {
            newChild = name;
            refChild = attributes;
            newChild.setParent(this);

            if (refChild) {
              i = children.indexOf(refChild);
              removed = children.splice(i);
              children.push(newChild);
              Array.prototype.push.apply(children, removed);
            } else {
              children.push(newChild);
            }

            return newChild;
          } else {
            if (this.isRoot) {
              throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
            }

            i = this.parent.children.indexOf(this);
            removed = this.parent.children.splice(i);
            child = this.parent.element(name, attributes, text);
            Array.prototype.push.apply(this.parent.children, removed);
            return child;
          }
        };

        XMLNode.prototype.insertAfter = function (name, attributes, text) {
          var child, i, removed;

          if (this.isRoot) {
            throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
          }

          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i + 1);
          child = this.parent.element(name, attributes, text);
          Array.prototype.push.apply(this.parent.children, removed);
          return child;
        };

        XMLNode.prototype.remove = function () {
          var i, ref2;

          if (this.isRoot) {
            throw new Error("Cannot remove the root element. " + this.debugInfo());
          }

          i = this.parent.children.indexOf(this);
          [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref2 = [])), ref2;
          return this.parent;
        };

        XMLNode.prototype.node = function (name, attributes, text) {
          var child, ref2;

          if (name != null) {
            name = getValue(name);
          }

          attributes || (attributes = {});
          attributes = getValue(attributes);

          if (!isObject(attributes)) {
            ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
          }

          child = new XMLElement(this, name, attributes);

          if (text != null) {
            child.text(text);
          }

          this.children.push(child);
          return child;
        };

        XMLNode.prototype.text = function (value) {
          var child;

          if (isObject(value)) {
            this.element(value);
          }

          child = new XMLText(this, value);
          this.children.push(child);
          return this;
        };

        XMLNode.prototype.cdata = function (value) {
          var child;
          child = new XMLCData(this, value);
          this.children.push(child);
          return this;
        };

        XMLNode.prototype.comment = function (value) {
          var child;
          child = new XMLComment(this, value);
          this.children.push(child);
          return this;
        };

        XMLNode.prototype.commentBefore = function (value) {
          var child, i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i);
          child = this.parent.comment(value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };

        XMLNode.prototype.commentAfter = function (value) {
          var child, i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i + 1);
          child = this.parent.comment(value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };

        XMLNode.prototype.raw = function (value) {
          var child;
          child = new XMLRaw(this, value);
          this.children.push(child);
          return this;
        };

        XMLNode.prototype.dummy = function () {
          var child;
          child = new XMLDummy(this);
          return child;
        };

        XMLNode.prototype.instruction = function (target, value) {
          var insTarget, insValue, instruction, j, len;

          if (target != null) {
            target = getValue(target);
          }

          if (value != null) {
            value = getValue(value);
          }

          if (Array.isArray(target)) {
            for (j = 0, len = target.length; j < len; j++) {
              insTarget = target[j];
              this.instruction(insTarget);
            }
          } else if (isObject(target)) {
            for (insTarget in target) {
              if (!hasProp.call(target, insTarget)) continue;
              insValue = target[insTarget];
              this.instruction(insTarget, insValue);
            }
          } else {
            if (isFunction(value)) {
              value = value.apply();
            }

            instruction = new XMLProcessingInstruction(this, target, value);
            this.children.push(instruction);
          }

          return this;
        };

        XMLNode.prototype.instructionBefore = function (target, value) {
          var child, i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i);
          child = this.parent.instruction(target, value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };

        XMLNode.prototype.instructionAfter = function (target, value) {
          var child, i, removed;
          i = this.parent.children.indexOf(this);
          removed = this.parent.children.splice(i + 1);
          child = this.parent.instruction(target, value);
          Array.prototype.push.apply(this.parent.children, removed);
          return this;
        };

        XMLNode.prototype.declaration = function (version, encoding, standalone) {
          var doc, xmldec;
          doc = this.document();
          xmldec = new XMLDeclaration(doc, version, encoding, standalone);

          if (doc.children.length === 0) {
            doc.children.unshift(xmldec);
          } else if (doc.children[0].type === NodeType.Declaration) {
            doc.children[0] = xmldec;
          } else {
            doc.children.unshift(xmldec);
          }

          return doc.root() || doc;
        };

        XMLNode.prototype.dtd = function (pubID, sysID) {
          var child, doc, doctype, i, j, k, len, len1, ref2, ref3;
          doc = this.document();
          doctype = new XMLDocType(doc, pubID, sysID);
          ref2 = doc.children;

          for (i = j = 0, len = ref2.length; j < len; i = ++j) {
            child = ref2[i];

            if (child.type === NodeType.DocType) {
              doc.children[i] = doctype;
              return doctype;
            }
          }

          ref3 = doc.children;

          for (i = k = 0, len1 = ref3.length; k < len1; i = ++k) {
            child = ref3[i];

            if (child.isRoot) {
              doc.children.splice(i, 0, doctype);
              return doctype;
            }
          }

          doc.children.push(doctype);
          return doctype;
        };

        XMLNode.prototype.up = function () {
          if (this.isRoot) {
            throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
          }

          return this.parent;
        };

        XMLNode.prototype.root = function () {
          var node;
          node = this;

          while (node) {
            if (node.type === NodeType.Document) {
              return node.rootObject;
            } else if (node.isRoot) {
              return node;
            } else {
              node = node.parent;
            }
          }
        };

        XMLNode.prototype.document = function () {
          var node;
          node = this;

          while (node) {
            if (node.type === NodeType.Document) {
              return node;
            } else {
              node = node.parent;
            }
          }
        };

        XMLNode.prototype.end = function (options) {
          return this.document().end(options);
        };

        XMLNode.prototype.prev = function () {
          var i;
          i = this.parent.children.indexOf(this);

          if (i < 1) {
            throw new Error("Already at the first node. " + this.debugInfo());
          }

          return this.parent.children[i - 1];
        };

        XMLNode.prototype.next = function () {
          var i;
          i = this.parent.children.indexOf(this);

          if (i === -1 || i === this.parent.children.length - 1) {
            throw new Error("Already at the last node. " + this.debugInfo());
          }

          return this.parent.children[i + 1];
        };

        XMLNode.prototype.importDocument = function (doc) {
          var clonedRoot;
          clonedRoot = doc.root().clone();
          clonedRoot.parent = this;
          clonedRoot.isRoot = false;
          this.children.push(clonedRoot);
          return this;
        };

        XMLNode.prototype.debugInfo = function (name) {
          var ref2, ref3;
          name = name || this.name;

          if (name == null && !((ref2 = this.parent) != null ? ref2.name : void 0)) {
            return "";
          } else if (name == null) {
            return "parent: <" + this.parent.name + ">";
          } else if (!((ref3 = this.parent) != null ? ref3.name : void 0)) {
            return "node: <" + name + ">";
          } else {
            return "node: <" + name + ">, parent: <" + this.parent.name + ">";
          }
        };

        XMLNode.prototype.ele = function (name, attributes, text) {
          return this.element(name, attributes, text);
        };

        XMLNode.prototype.nod = function (name, attributes, text) {
          return this.node(name, attributes, text);
        };

        XMLNode.prototype.txt = function (value) {
          return this.text(value);
        };

        XMLNode.prototype.dat = function (value) {
          return this.cdata(value);
        };

        XMLNode.prototype.com = function (value) {
          return this.comment(value);
        };

        XMLNode.prototype.ins = function (target, value) {
          return this.instruction(target, value);
        };

        XMLNode.prototype.doc = function () {
          return this.document();
        };

        XMLNode.prototype.dec = function (version, encoding, standalone) {
          return this.declaration(version, encoding, standalone);
        };

        XMLNode.prototype.e = function (name, attributes, text) {
          return this.element(name, attributes, text);
        };

        XMLNode.prototype.n = function (name, attributes, text) {
          return this.node(name, attributes, text);
        };

        XMLNode.prototype.t = function (value) {
          return this.text(value);
        };

        XMLNode.prototype.d = function (value) {
          return this.cdata(value);
        };

        XMLNode.prototype.c = function (value) {
          return this.comment(value);
        };

        XMLNode.prototype.r = function (value) {
          return this.raw(value);
        };

        XMLNode.prototype.i = function (target, value) {
          return this.instruction(target, value);
        };

        XMLNode.prototype.u = function () {
          return this.up();
        };

        XMLNode.prototype.importXMLBuilder = function (doc) {
          return this.importDocument(doc);
        };

        XMLNode.prototype.replaceChild = function (newChild, oldChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.removeChild = function (oldChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.appendChild = function (newChild) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.hasChildNodes = function () {
          return this.children.length !== 0;
        };

        XMLNode.prototype.cloneNode = function (deep) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.normalize = function () {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.isSupported = function (feature, version) {
          return true;
        };

        XMLNode.prototype.hasAttributes = function () {
          return this.attribs.length !== 0;
        };

        XMLNode.prototype.compareDocumentPosition = function (other) {
          var ref, res;
          ref = this;

          if (ref === other) {
            return 0;
          } else if (this.document() !== other.document()) {
            res = DocumentPosition.Disconnected | DocumentPosition.ImplementationSpecific;

            if (Math.random() < 0.5) {
              res |= DocumentPosition.Preceding;
            } else {
              res |= DocumentPosition.Following;
            }

            return res;
          } else if (ref.isAncestor(other)) {
            return DocumentPosition.Contains | DocumentPosition.Preceding;
          } else if (ref.isDescendant(other)) {
            return DocumentPosition.Contains | DocumentPosition.Following;
          } else if (ref.isPreceding(other)) {
            return DocumentPosition.Preceding;
          } else {
            return DocumentPosition.Following;
          }
        };

        XMLNode.prototype.isSameNode = function (other) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.lookupPrefix = function (namespaceURI) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.isDefaultNamespace = function (namespaceURI) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.lookupNamespaceURI = function (prefix) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.isEqualNode = function (node) {
          var i, j, ref2;

          if (node.nodeType !== this.nodeType) {
            return false;
          }

          if (node.children.length !== this.children.length) {
            return false;
          }

          for (i = j = 0, ref2 = this.children.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
            if (!this.children[i].isEqualNode(node.children[i])) {
              return false;
            }
          }

          return true;
        };

        XMLNode.prototype.getFeature = function (feature, version) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.setUserData = function (key, data, handler) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.getUserData = function (key) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLNode.prototype.contains = function (other) {
          if (!other) {
            return false;
          }

          return other === this || this.isDescendant(other);
        };

        XMLNode.prototype.isDescendant = function (node) {
          var child, isDescendantChild, j, len, ref2;
          ref2 = this.children;

          for (j = 0, len = ref2.length; j < len; j++) {
            child = ref2[j];

            if (node === child) {
              return true;
            }

            isDescendantChild = child.isDescendant(node);

            if (isDescendantChild) {
              return true;
            }
          }

          return false;
        };

        XMLNode.prototype.isAncestor = function (node) {
          return node.isDescendant(this);
        };

        XMLNode.prototype.isPreceding = function (node) {
          var nodePos, thisPos;
          nodePos = this.treePosition(node);
          thisPos = this.treePosition(this);

          if (nodePos === -1 || thisPos === -1) {
            return false;
          } else {
            return nodePos < thisPos;
          }
        };

        XMLNode.prototype.isFollowing = function (node) {
          var nodePos, thisPos;
          nodePos = this.treePosition(node);
          thisPos = this.treePosition(this);

          if (nodePos === -1 || thisPos === -1) {
            return false;
          } else {
            return nodePos > thisPos;
          }
        };

        XMLNode.prototype.treePosition = function (node) {
          var found, pos;
          pos = 0;
          found = false;
          this.foreachTreeNode(this.document(), function (childNode) {
            pos++;

            if (!found && childNode === node) {
              return found = true;
            }
          });

          if (found) {
            return pos;
          } else {
            return -1;
          }
        };

        XMLNode.prototype.foreachTreeNode = function (node, func) {
          var child, j, len, ref2, res;
          node || (node = this.document());
          ref2 = node.children;

          for (j = 0, len = ref2.length; j < len; j++) {
            child = ref2[j];

            if (res = func(child)) {
              return res;
            } else {
              res = this.foreachTreeNode(child, func);

              if (res) {
                return res;
              }
            }
          }
        };

        return XMLNode;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLNodeList.js":
  /*!****************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLNodeList.js ***!
    \****************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLNodeListJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var XMLNodeList;

      module.exports = XMLNodeList = function () {
        function XMLNodeList(nodes) {
          this.nodes = nodes;
        }

        Object.defineProperty(XMLNodeList.prototype, 'length', {
          get: function get() {
            return this.nodes.length || 0;
          }
        });

        XMLNodeList.prototype.clone = function () {
          return this.nodes = null;
        };

        XMLNodeList.prototype.item = function (index) {
          return this.nodes[index] || null;
        };

        return XMLNodeList;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js ***!
    \*****************************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLProcessingInstructionJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLCharacterData,
          XMLProcessingInstruction,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLCharacterData = __webpack_require__(
      /*! ./XMLCharacterData */
      "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

      module.exports = XMLProcessingInstruction = function (superClass) {
        extend(XMLProcessingInstruction, superClass);

        function XMLProcessingInstruction(parent, target, value) {
          XMLProcessingInstruction.__super__.constructor.call(this, parent);

          if (target == null) {
            throw new Error("Missing instruction target. " + this.debugInfo());
          }

          this.type = NodeType.ProcessingInstruction;
          this.target = this.stringify.insTarget(target);
          this.name = this.target;

          if (value) {
            this.value = this.stringify.insValue(value);
          }
        }

        XMLProcessingInstruction.prototype.clone = function () {
          return Object.create(this);
        };

        XMLProcessingInstruction.prototype.toString = function (options) {
          return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
        };

        XMLProcessingInstruction.prototype.isEqualNode = function (node) {
          if (!XMLProcessingInstruction.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
            return false;
          }

          if (node.target !== this.target) {
            return false;
          }

          return true;
        };

        return XMLProcessingInstruction;
      }(XMLCharacterData);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLRaw.js":
  /*!***********************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLRaw.js ***!
    \***********************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLRawJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLNode,
          XMLRaw,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLNode = __webpack_require__(
      /*! ./XMLNode */
      "./node_modules/xmlbuilder/lib/XMLNode.js");

      module.exports = XMLRaw = function (superClass) {
        extend(XMLRaw, superClass);

        function XMLRaw(parent, text) {
          XMLRaw.__super__.constructor.call(this, parent);

          if (text == null) {
            throw new Error("Missing raw text. " + this.debugInfo());
          }

          this.type = NodeType.Raw;
          this.value = this.stringify.raw(text);
        }

        XMLRaw.prototype.clone = function () {
          return Object.create(this);
        };

        XMLRaw.prototype.toString = function (options) {
          return this.options.writer.raw(this, this.options.writer.filterOptions(options));
        };

        return XMLRaw;
      }(XMLNode);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLStreamWriter.js":
  /*!********************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLStreamWriter.js ***!
    \********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLStreamWriterJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          WriterState,
          XMLStreamWriter,
          XMLWriterBase,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLWriterBase = __webpack_require__(
      /*! ./XMLWriterBase */
      "./node_modules/xmlbuilder/lib/XMLWriterBase.js");
      WriterState = __webpack_require__(
      /*! ./WriterState */
      "./node_modules/xmlbuilder/lib/WriterState.js");

      module.exports = XMLStreamWriter = function (superClass) {
        extend(XMLStreamWriter, superClass);

        function XMLStreamWriter(stream, options) {
          this.stream = stream;

          XMLStreamWriter.__super__.constructor.call(this, options);
        }

        XMLStreamWriter.prototype.endline = function (node, options, level) {
          if (node.isLastRootNode && options.state === WriterState.CloseTag) {
            return '';
          } else {
            return XMLStreamWriter.__super__.endline.call(this, node, options, level);
          }
        };

        XMLStreamWriter.prototype.document = function (doc, options) {
          var child, i, j, k, len, len1, ref, ref1, results;
          ref = doc.children;

          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            child = ref[i];
            child.isLastRootNode = i === doc.children.length - 1;
          }

          options = this.filterOptions(options);
          ref1 = doc.children;
          results = [];

          for (k = 0, len1 = ref1.length; k < len1; k++) {
            child = ref1[k];
            results.push(this.writeChildNode(child, options, 0));
          }

          return results;
        };

        XMLStreamWriter.prototype.attribute = function (att, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.attribute.call(this, att, options, level));
        };

        XMLStreamWriter.prototype.cdata = function (node, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.cdata.call(this, node, options, level));
        };

        XMLStreamWriter.prototype.comment = function (node, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.comment.call(this, node, options, level));
        };

        XMLStreamWriter.prototype.declaration = function (node, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.declaration.call(this, node, options, level));
        };

        XMLStreamWriter.prototype.docType = function (node, options, level) {
          var child, j, len, ref;
          level || (level = 0);
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          this.stream.write(this.indent(node, options, level));
          this.stream.write('<!DOCTYPE ' + node.root().name);

          if (node.pubID && node.sysID) {
            this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
          } else if (node.sysID) {
            this.stream.write(' SYSTEM "' + node.sysID + '"');
          }

          if (node.children.length > 0) {
            this.stream.write(' [');
            this.stream.write(this.endline(node, options, level));
            options.state = WriterState.InsideTag;
            ref = node.children;

            for (j = 0, len = ref.length; j < len; j++) {
              child = ref[j];
              this.writeChildNode(child, options, level + 1);
            }

            options.state = WriterState.CloseTag;
            this.stream.write(']');
          }

          options.state = WriterState.CloseTag;
          this.stream.write(options.spaceBeforeSlash + '>');
          this.stream.write(this.endline(node, options, level));
          options.state = WriterState.None;
          return this.closeNode(node, options, level);
        };

        XMLStreamWriter.prototype.element = function (node, options, level) {
          var att, child, childNodeCount, firstChildNode, j, len, name, prettySuppressed, ref, ref1;
          level || (level = 0);
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          this.stream.write(this.indent(node, options, level) + '<' + node.name);
          ref = node.attribs;

          for (name in ref) {
            if (!hasProp.call(ref, name)) continue;
            att = ref[name];
            this.attribute(att, options, level);
          }

          childNodeCount = node.children.length;
          firstChildNode = childNodeCount === 0 ? null : node.children[0];

          if (childNodeCount === 0 || node.children.every(function (e) {
            return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === '';
          })) {
            if (options.allowEmpty) {
              this.stream.write('>');
              options.state = WriterState.CloseTag;
              this.stream.write('</' + node.name + '>');
            } else {
              options.state = WriterState.CloseTag;
              this.stream.write(options.spaceBeforeSlash + '/>');
            }
          } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && firstChildNode.value != null) {
            this.stream.write('>');
            options.state = WriterState.InsideTag;
            options.suppressPrettyCount++;
            prettySuppressed = true;
            this.writeChildNode(firstChildNode, options, level + 1);
            options.suppressPrettyCount--;
            prettySuppressed = false;
            options.state = WriterState.CloseTag;
            this.stream.write('</' + node.name + '>');
          } else {
            this.stream.write('>' + this.endline(node, options, level));
            options.state = WriterState.InsideTag;
            ref1 = node.children;

            for (j = 0, len = ref1.length; j < len; j++) {
              child = ref1[j];
              this.writeChildNode(child, options, level + 1);
            }

            options.state = WriterState.CloseTag;
            this.stream.write(this.indent(node, options, level) + '</' + node.name + '>');
          }

          this.stream.write(this.endline(node, options, level));
          options.state = WriterState.None;
          return this.closeNode(node, options, level);
        };

        XMLStreamWriter.prototype.processingInstruction = function (node, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.processingInstruction.call(this, node, options, level));
        };

        XMLStreamWriter.prototype.raw = function (node, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.raw.call(this, node, options, level));
        };

        XMLStreamWriter.prototype.text = function (node, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.text.call(this, node, options, level));
        };

        XMLStreamWriter.prototype.dtdAttList = function (node, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.dtdAttList.call(this, node, options, level));
        };

        XMLStreamWriter.prototype.dtdElement = function (node, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.dtdElement.call(this, node, options, level));
        };

        XMLStreamWriter.prototype.dtdEntity = function (node, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.dtdEntity.call(this, node, options, level));
        };

        XMLStreamWriter.prototype.dtdNotation = function (node, options, level) {
          return this.stream.write(XMLStreamWriter.__super__.dtdNotation.call(this, node, options, level));
        };

        return XMLStreamWriter;
      }(XMLWriterBase);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLStringWriter.js":
  /*!********************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLStringWriter.js ***!
    \********************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLStringWriterJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var XMLStringWriter,
          XMLWriterBase,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      XMLWriterBase = __webpack_require__(
      /*! ./XMLWriterBase */
      "./node_modules/xmlbuilder/lib/XMLWriterBase.js");

      module.exports = XMLStringWriter = function (superClass) {
        extend(XMLStringWriter, superClass);

        function XMLStringWriter(options) {
          XMLStringWriter.__super__.constructor.call(this, options);
        }

        XMLStringWriter.prototype.document = function (doc, options) {
          var child, i, len, r, ref;
          options = this.filterOptions(options);
          r = '';
          ref = doc.children;

          for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            r += this.writeChildNode(child, options, 0);
          }

          if (options.pretty && r.slice(-options.newline.length) === options.newline) {
            r = r.slice(0, -options.newline.length);
          }

          return r;
        };

        return XMLStringWriter;
      }(XMLWriterBase);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLStringifier.js":
  /*!*******************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLStringifier.js ***!
    \*******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLStringifierJs(module, exports) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var XMLStringifier,
          bind = function bind(fn, me) {
        return function () {
          return fn.apply(me, arguments);
        };
      },
          hasProp = {}.hasOwnProperty;

      module.exports = XMLStringifier = function () {
        function XMLStringifier(options) {
          this.assertLegalName = bind(this.assertLegalName, this);
          this.assertLegalChar = bind(this.assertLegalChar, this);
          var key, ref, value;
          options || (options = {});
          this.options = options;

          if (!this.options.version) {
            this.options.version = '1.0';
          }

          ref = options.stringify || {};

          for (key in ref) {
            if (!hasProp.call(ref, key)) continue;
            value = ref[key];
            this[key] = value;
          }
        }

        XMLStringifier.prototype.name = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalName('' + val || '');
        };

        XMLStringifier.prototype.text = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalChar(this.textEscape('' + val || ''));
        };

        XMLStringifier.prototype.cdata = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          val = '' + val || '';
          val = val.replace(']]>', ']]]]><![CDATA[>');
          return this.assertLegalChar(val);
        };

        XMLStringifier.prototype.comment = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          val = '' + val || '';

          if (val.match(/--/)) {
            throw new Error("Comment text cannot contain double-hypen: " + val);
          }

          return this.assertLegalChar(val);
        };

        XMLStringifier.prototype.raw = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return '' + val || '';
        };

        XMLStringifier.prototype.attValue = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalChar(this.attEscape(val = '' + val || ''));
        };

        XMLStringifier.prototype.insTarget = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalChar('' + val || '');
        };

        XMLStringifier.prototype.insValue = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          val = '' + val || '';

          if (val.match(/\?>/)) {
            throw new Error("Invalid processing instruction value: " + val);
          }

          return this.assertLegalChar(val);
        };

        XMLStringifier.prototype.xmlVersion = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          val = '' + val || '';

          if (!val.match(/1\.[0-9]+/)) {
            throw new Error("Invalid version number: " + val);
          }

          return val;
        };

        XMLStringifier.prototype.xmlEncoding = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          val = '' + val || '';

          if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
            throw new Error("Invalid encoding: " + val);
          }

          return this.assertLegalChar(val);
        };

        XMLStringifier.prototype.xmlStandalone = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          if (val) {
            return "yes";
          } else {
            return "no";
          }
        };

        XMLStringifier.prototype.dtdPubID = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalChar('' + val || '');
        };

        XMLStringifier.prototype.dtdSysID = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalChar('' + val || '');
        };

        XMLStringifier.prototype.dtdElementValue = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalChar('' + val || '');
        };

        XMLStringifier.prototype.dtdAttType = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalChar('' + val || '');
        };

        XMLStringifier.prototype.dtdAttDefault = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalChar('' + val || '');
        };

        XMLStringifier.prototype.dtdEntityValue = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalChar('' + val || '');
        };

        XMLStringifier.prototype.dtdNData = function (val) {
          if (this.options.noValidation) {
            return val;
          }

          return this.assertLegalChar('' + val || '');
        };

        XMLStringifier.prototype.convertAttKey = '@';
        XMLStringifier.prototype.convertPIKey = '?';
        XMLStringifier.prototype.convertTextKey = '#text';
        XMLStringifier.prototype.convertCDataKey = '#cdata';
        XMLStringifier.prototype.convertCommentKey = '#comment';
        XMLStringifier.prototype.convertRawKey = '#raw';

        XMLStringifier.prototype.assertLegalChar = function (str) {
          var regex, res;

          if (this.options.noValidation) {
            return str;
          }

          regex = '';

          if (this.options.version === '1.0') {
            regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

            if (res = str.match(regex)) {
              throw new Error("Invalid character in string: " + str + " at index " + res.index);
            }
          } else if (this.options.version === '1.1') {
            regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

            if (res = str.match(regex)) {
              throw new Error("Invalid character in string: " + str + " at index " + res.index);
            }
          }

          return str;
        };

        XMLStringifier.prototype.assertLegalName = function (str) {
          var regex;

          if (this.options.noValidation) {
            return str;
          }

          this.assertLegalChar(str);
          regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;

          if (!str.match(regex)) {
            throw new Error("Invalid character in name");
          }

          return str;
        };

        XMLStringifier.prototype.textEscape = function (str) {
          var ampregex;

          if (this.options.noValidation) {
            return str;
          }

          ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
          return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
        };

        XMLStringifier.prototype.attEscape = function (str) {
          var ampregex;

          if (this.options.noValidation) {
            return str;
          }

          ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
          return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
        };

        return XMLStringifier;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLText.js":
  /*!************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLText.js ***!
    \************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLTextJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          XMLCharacterData,
          XMLText,
          extend = function extend(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
          this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
          hasProp = {}.hasOwnProperty;

      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLCharacterData = __webpack_require__(
      /*! ./XMLCharacterData */
      "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

      module.exports = XMLText = function (superClass) {
        extend(XMLText, superClass);

        function XMLText(parent, text) {
          XMLText.__super__.constructor.call(this, parent);

          if (text == null) {
            throw new Error("Missing element text. " + this.debugInfo());
          }

          this.name = "#text";
          this.type = NodeType.Text;
          this.value = this.stringify.text(text);
        }

        Object.defineProperty(XMLText.prototype, 'isElementContentWhitespace', {
          get: function get() {
            throw new Error("This DOM method is not implemented." + this.debugInfo());
          }
        });
        Object.defineProperty(XMLText.prototype, 'wholeText', {
          get: function get() {
            var next, prev, str;
            str = '';
            prev = this.previousSibling;

            while (prev) {
              str = prev.data + str;
              prev = prev.previousSibling;
            }

            str += this.data;
            next = this.nextSibling;

            while (next) {
              str = str + next.data;
              next = next.nextSibling;
            }

            return str;
          }
        });

        XMLText.prototype.clone = function () {
          return Object.create(this);
        };

        XMLText.prototype.toString = function (options) {
          return this.options.writer.text(this, this.options.writer.filterOptions(options));
        };

        XMLText.prototype.splitText = function (offset) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        XMLText.prototype.replaceWholeText = function (content) {
          throw new Error("This DOM method is not implemented." + this.debugInfo());
        };

        return XMLText;
      }(XMLCharacterData);
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/XMLWriterBase.js":
  /*!******************************************************!*\
    !*** ./node_modules/xmlbuilder/lib/XMLWriterBase.js ***!
    \******************************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibXMLWriterBaseJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType,
          WriterState,
          XMLCData,
          XMLComment,
          XMLDTDAttList,
          XMLDTDElement,
          XMLDTDEntity,
          XMLDTDNotation,
          XMLDeclaration,
          XMLDocType,
          XMLDummy,
          XMLElement,
          XMLProcessingInstruction,
          XMLRaw,
          XMLText,
          XMLWriterBase,
          assign,
          hasProp = {}.hasOwnProperty;
      assign = __webpack_require__(
      /*! ./Utility */
      "./node_modules/xmlbuilder/lib/Utility.js").assign;
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      XMLDeclaration = __webpack_require__(
      /*! ./XMLDeclaration */
      "./node_modules/xmlbuilder/lib/XMLDeclaration.js");
      XMLDocType = __webpack_require__(
      /*! ./XMLDocType */
      "./node_modules/xmlbuilder/lib/XMLDocType.js");
      XMLCData = __webpack_require__(
      /*! ./XMLCData */
      "./node_modules/xmlbuilder/lib/XMLCData.js");
      XMLComment = __webpack_require__(
      /*! ./XMLComment */
      "./node_modules/xmlbuilder/lib/XMLComment.js");
      XMLElement = __webpack_require__(
      /*! ./XMLElement */
      "./node_modules/xmlbuilder/lib/XMLElement.js");
      XMLRaw = __webpack_require__(
      /*! ./XMLRaw */
      "./node_modules/xmlbuilder/lib/XMLRaw.js");
      XMLText = __webpack_require__(
      /*! ./XMLText */
      "./node_modules/xmlbuilder/lib/XMLText.js");
      XMLProcessingInstruction = __webpack_require__(
      /*! ./XMLProcessingInstruction */
      "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");
      XMLDummy = __webpack_require__(
      /*! ./XMLDummy */
      "./node_modules/xmlbuilder/lib/XMLDummy.js");
      XMLDTDAttList = __webpack_require__(
      /*! ./XMLDTDAttList */
      "./node_modules/xmlbuilder/lib/XMLDTDAttList.js");
      XMLDTDElement = __webpack_require__(
      /*! ./XMLDTDElement */
      "./node_modules/xmlbuilder/lib/XMLDTDElement.js");
      XMLDTDEntity = __webpack_require__(
      /*! ./XMLDTDEntity */
      "./node_modules/xmlbuilder/lib/XMLDTDEntity.js");
      XMLDTDNotation = __webpack_require__(
      /*! ./XMLDTDNotation */
      "./node_modules/xmlbuilder/lib/XMLDTDNotation.js");
      WriterState = __webpack_require__(
      /*! ./WriterState */
      "./node_modules/xmlbuilder/lib/WriterState.js");

      module.exports = XMLWriterBase = function () {
        function XMLWriterBase(options) {
          var key, ref, value;
          options || (options = {});
          this.options = options;
          ref = options.writer || {};

          for (key in ref) {
            if (!hasProp.call(ref, key)) continue;
            value = ref[key];
            this["_" + key] = this[key];
            this[key] = value;
          }
        }

        XMLWriterBase.prototype.filterOptions = function (options) {
          var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6;
          options || (options = {});
          options = assign({}, this.options, options);
          filteredOptions = {
            writer: this
          };
          filteredOptions.pretty = options.pretty || false;
          filteredOptions.allowEmpty = options.allowEmpty || false;
          filteredOptions.indent = (ref = options.indent) != null ? ref : '  ';
          filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : '\n';
          filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
          filteredOptions.dontPrettyTextNodes = (ref3 = (ref4 = options.dontPrettyTextNodes) != null ? ref4 : options.dontprettytextnodes) != null ? ref3 : 0;
          filteredOptions.spaceBeforeSlash = (ref5 = (ref6 = options.spaceBeforeSlash) != null ? ref6 : options.spacebeforeslash) != null ? ref5 : '';

          if (filteredOptions.spaceBeforeSlash === true) {
            filteredOptions.spaceBeforeSlash = ' ';
          }

          filteredOptions.suppressPrettyCount = 0;
          filteredOptions.user = {};
          filteredOptions.state = WriterState.None;
          return filteredOptions;
        };

        XMLWriterBase.prototype.indent = function (node, options, level) {
          var indentLevel;

          if (!options.pretty || options.suppressPrettyCount) {
            return '';
          } else if (options.pretty) {
            indentLevel = (level || 0) + options.offset + 1;

            if (indentLevel > 0) {
              return new Array(indentLevel).join(options.indent);
            }
          }

          return '';
        };

        XMLWriterBase.prototype.endline = function (node, options, level) {
          if (!options.pretty || options.suppressPrettyCount) {
            return '';
          } else {
            return options.newline;
          }
        };

        XMLWriterBase.prototype.attribute = function (att, options, level) {
          var r;
          this.openAttribute(att, options, level);
          r = ' ' + att.name + '="' + att.value + '"';
          this.closeAttribute(att, options, level);
          return r;
        };

        XMLWriterBase.prototype.cdata = function (node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + '<![CDATA[';
          options.state = WriterState.InsideTag;
          r += node.value;
          options.state = WriterState.CloseTag;
          r += ']]>' + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.comment = function (node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + '<!-- ';
          options.state = WriterState.InsideTag;
          r += node.value;
          options.state = WriterState.CloseTag;
          r += ' -->' + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.declaration = function (node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + '<?xml';
          options.state = WriterState.InsideTag;
          r += ' version="' + node.version + '"';

          if (node.encoding != null) {
            r += ' encoding="' + node.encoding + '"';
          }

          if (node.standalone != null) {
            r += ' standalone="' + node.standalone + '"';
          }

          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + '?>';
          r += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.docType = function (node, options, level) {
          var child, i, len, r, ref;
          level || (level = 0);
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level);
          r += '<!DOCTYPE ' + node.root().name;

          if (node.pubID && node.sysID) {
            r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.sysID) {
            r += ' SYSTEM "' + node.sysID + '"';
          }

          if (node.children.length > 0) {
            r += ' [';
            r += this.endline(node, options, level);
            options.state = WriterState.InsideTag;
            ref = node.children;

            for (i = 0, len = ref.length; i < len; i++) {
              child = ref[i];
              r += this.writeChildNode(child, options, level + 1);
            }

            options.state = WriterState.CloseTag;
            r += ']';
          }

          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + '>';
          r += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.element = function (node, options, level) {
          var att, child, childNodeCount, firstChildNode, i, j, len, len1, name, prettySuppressed, r, ref, ref1, ref2;
          level || (level = 0);
          prettySuppressed = false;
          r = '';
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r += this.indent(node, options, level) + '<' + node.name;
          ref = node.attribs;

          for (name in ref) {
            if (!hasProp.call(ref, name)) continue;
            att = ref[name];
            r += this.attribute(att, options, level);
          }

          childNodeCount = node.children.length;
          firstChildNode = childNodeCount === 0 ? null : node.children[0];

          if (childNodeCount === 0 || node.children.every(function (e) {
            return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === '';
          })) {
            if (options.allowEmpty) {
              r += '>';
              options.state = WriterState.CloseTag;
              r += '</' + node.name + '>' + this.endline(node, options, level);
            } else {
              options.state = WriterState.CloseTag;
              r += options.spaceBeforeSlash + '/>' + this.endline(node, options, level);
            }
          } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && firstChildNode.value != null) {
            r += '>';
            options.state = WriterState.InsideTag;
            options.suppressPrettyCount++;
            prettySuppressed = true;
            r += this.writeChildNode(firstChildNode, options, level + 1);
            options.suppressPrettyCount--;
            prettySuppressed = false;
            options.state = WriterState.CloseTag;
            r += '</' + node.name + '>' + this.endline(node, options, level);
          } else {
            if (options.dontPrettyTextNodes) {
              ref1 = node.children;

              for (i = 0, len = ref1.length; i < len; i++) {
                child = ref1[i];

                if ((child.type === NodeType.Text || child.type === NodeType.Raw) && child.value != null) {
                  options.suppressPrettyCount++;
                  prettySuppressed = true;
                  break;
                }
              }
            }

            r += '>' + this.endline(node, options, level);
            options.state = WriterState.InsideTag;
            ref2 = node.children;

            for (j = 0, len1 = ref2.length; j < len1; j++) {
              child = ref2[j];
              r += this.writeChildNode(child, options, level + 1);
            }

            options.state = WriterState.CloseTag;
            r += this.indent(node, options, level) + '</' + node.name + '>';

            if (prettySuppressed) {
              options.suppressPrettyCount--;
            }

            r += this.endline(node, options, level);
            options.state = WriterState.None;
          }

          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.writeChildNode = function (node, options, level) {
          switch (node.type) {
            case NodeType.CData:
              return this.cdata(node, options, level);

            case NodeType.Comment:
              return this.comment(node, options, level);

            case NodeType.Element:
              return this.element(node, options, level);

            case NodeType.Raw:
              return this.raw(node, options, level);

            case NodeType.Text:
              return this.text(node, options, level);

            case NodeType.ProcessingInstruction:
              return this.processingInstruction(node, options, level);

            case NodeType.Dummy:
              return '';

            case NodeType.Declaration:
              return this.declaration(node, options, level);

            case NodeType.DocType:
              return this.docType(node, options, level);

            case NodeType.AttributeDeclaration:
              return this.dtdAttList(node, options, level);

            case NodeType.ElementDeclaration:
              return this.dtdElement(node, options, level);

            case NodeType.EntityDeclaration:
              return this.dtdEntity(node, options, level);

            case NodeType.NotationDeclaration:
              return this.dtdNotation(node, options, level);

            default:
              throw new Error("Unknown XML node type: " + node.constructor.name);
          }
        };

        XMLWriterBase.prototype.processingInstruction = function (node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + '<?';
          options.state = WriterState.InsideTag;
          r += node.target;

          if (node.value) {
            r += ' ' + node.value;
          }

          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + '?>';
          r += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.raw = function (node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level);
          options.state = WriterState.InsideTag;
          r += node.value;
          options.state = WriterState.CloseTag;
          r += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.text = function (node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level);
          options.state = WriterState.InsideTag;
          r += node.value;
          options.state = WriterState.CloseTag;
          r += this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.dtdAttList = function (node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + '<!ATTLIST';
          options.state = WriterState.InsideTag;
          r += ' ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;

          if (node.defaultValueType !== '#DEFAULT') {
            r += ' ' + node.defaultValueType;
          }

          if (node.defaultValue) {
            r += ' "' + node.defaultValue + '"';
          }

          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.dtdElement = function (node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + '<!ELEMENT';
          options.state = WriterState.InsideTag;
          r += ' ' + node.name + ' ' + node.value;
          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.dtdEntity = function (node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + '<!ENTITY';
          options.state = WriterState.InsideTag;

          if (node.pe) {
            r += ' %';
          }

          r += ' ' + node.name;

          if (node.value) {
            r += ' "' + node.value + '"';
          } else {
            if (node.pubID && node.sysID) {
              r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
            } else if (node.sysID) {
              r += ' SYSTEM "' + node.sysID + '"';
            }

            if (node.nData) {
              r += ' NDATA ' + node.nData;
            }
          }

          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.dtdNotation = function (node, options, level) {
          var r;
          this.openNode(node, options, level);
          options.state = WriterState.OpenTag;
          r = this.indent(node, options, level) + '<!NOTATION';
          options.state = WriterState.InsideTag;
          r += ' ' + node.name;

          if (node.pubID && node.sysID) {
            r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.pubID) {
            r += ' PUBLIC "' + node.pubID + '"';
          } else if (node.sysID) {
            r += ' SYSTEM "' + node.sysID + '"';
          }

          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
          options.state = WriterState.None;
          this.closeNode(node, options, level);
          return r;
        };

        XMLWriterBase.prototype.openNode = function (node, options, level) {};

        XMLWriterBase.prototype.closeNode = function (node, options, level) {};

        XMLWriterBase.prototype.openAttribute = function (att, options, level) {};

        XMLWriterBase.prototype.closeAttribute = function (att, options, level) {};

        return XMLWriterBase;
      }();
    }).call(this);
    /***/
  },

  /***/
  "./node_modules/xmlbuilder/lib/index.js":
  /*!**********************************************!*\
    !*** ./node_modules/xmlbuilder/lib/index.js ***!
    \**********************************************/

  /*! no static exports found */

  /***/
  function node_modulesXmlbuilderLibIndexJs(module, exports, __webpack_require__) {
    // Generated by CoffeeScript 1.12.7
    (function () {
      var NodeType, WriterState, XMLDOMImplementation, XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;
      ref = __webpack_require__(
      /*! ./Utility */
      "./node_modules/xmlbuilder/lib/Utility.js"), assign = ref.assign, isFunction = ref.isFunction;
      XMLDOMImplementation = __webpack_require__(
      /*! ./XMLDOMImplementation */
      "./node_modules/xmlbuilder/lib/XMLDOMImplementation.js");
      XMLDocument = __webpack_require__(
      /*! ./XMLDocument */
      "./node_modules/xmlbuilder/lib/XMLDocument.js");
      XMLDocumentCB = __webpack_require__(
      /*! ./XMLDocumentCB */
      "./node_modules/xmlbuilder/lib/XMLDocumentCB.js");
      XMLStringWriter = __webpack_require__(
      /*! ./XMLStringWriter */
      "./node_modules/xmlbuilder/lib/XMLStringWriter.js");
      XMLStreamWriter = __webpack_require__(
      /*! ./XMLStreamWriter */
      "./node_modules/xmlbuilder/lib/XMLStreamWriter.js");
      NodeType = __webpack_require__(
      /*! ./NodeType */
      "./node_modules/xmlbuilder/lib/NodeType.js");
      WriterState = __webpack_require__(
      /*! ./WriterState */
      "./node_modules/xmlbuilder/lib/WriterState.js");

      module.exports.create = function (name, xmldec, doctype, options) {
        var doc, root;

        if (name == null) {
          throw new Error("Root element needs a name.");
        }

        options = assign({}, xmldec, doctype, options);
        doc = new XMLDocument(options);
        root = doc.element(name);

        if (!options.headless) {
          doc.declaration(options);

          if (options.pubID != null || options.sysID != null) {
            doc.dtd(options);
          }
        }

        return root;
      };

      module.exports.begin = function (options, onData, onEnd) {
        var ref1;

        if (isFunction(options)) {
          ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
          options = {};
        }

        if (onData) {
          return new XMLDocumentCB(options, onData, onEnd);
        } else {
          return new XMLDocument(options);
        }
      };

      module.exports.stringWriter = function (options) {
        return new XMLStringWriter(options);
      };

      module.exports.streamWriter = function (stream, options) {
        return new XMLStreamWriter(stream, options);
      };

      module.exports.implementation = new XMLDOMImplementation();
      module.exports.nodeType = NodeType;
      module.exports.writerState = WriterState;
    }).call(this);
    /***/
  },

  /***/
  "./src/app/dashboard/accountsummary/accountsummary.component.css":
  /*!***********************************************************************!*\
    !*** ./src/app/dashboard/accountsummary/accountsummary.component.css ***!
    \***********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDashboardAccountsummaryAccountsummaryComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\r\n*{\r\n    font-family: Lato;\r\n    font-weight:bold;\r\n}\r\n#summaryheading h5{\r\n        height: 19px;\r\n        color: #1F74B1;\r\n        font-family: Lato;\r\n        font-size: 16px;\r\n        font-weight: bold;\r\n        letter-spacing: 0;\r\n        line-height: 19px;\r\n}\r\n.spending-l-imit {\r\n    width: 95px;\r\n    color: #90A2B1;\r\n    font-family: Lato;\r\n    font-size: 12px;\r\n    font-weight: bold;\r\n  }\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL2FjY291bnRzdW1tYXJ5L2FjY291bnRzdW1tYXJ5LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksaUJBQWlCO0lBQ2pCLGdCQUFnQjtBQUNwQjtBQUNBO1FBQ1EsWUFBWTtRQUNaLGNBQWM7UUFDZCxpQkFBaUI7UUFDakIsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixpQkFBaUI7UUFDakIsaUJBQWlCO0FBQ3pCO0FBQ0E7SUFDSSxXQUFXO0lBQ1gsY0FBYztJQUNkLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsaUJBQWlCO0VBQ25CIiwiZmlsZSI6InNyYy9hcHAvZGFzaGJvYXJkL2FjY291bnRzdW1tYXJ5L2FjY291bnRzdW1tYXJ5LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuKntcclxuICAgIGZvbnQtZmFtaWx5OiBMYXRvO1xyXG4gICAgZm9udC13ZWlnaHQ6Ym9sZDtcclxufVxyXG4jc3VtbWFyeWhlYWRpbmcgaDV7XHJcbiAgICAgICAgaGVpZ2h0OiAxOXB4O1xyXG4gICAgICAgIGNvbG9yOiAjMUY3NEIxO1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiBMYXRvO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICBsZXR0ZXItc3BhY2luZzogMDtcclxuICAgICAgICBsaW5lLWhlaWdodDogMTlweDtcclxufVxyXG4uc3BlbmRpbmctbC1pbWl0IHtcclxuICAgIHdpZHRoOiA5NXB4O1xyXG4gICAgY29sb3I6ICM5MEEyQjE7XHJcbiAgICBmb250LWZhbWlseTogTGF0bztcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIH0iXX0= */";
    /***/
  },

  /***/
  "./src/app/dashboard/accountsummary/accountsummary.component.ts":
  /*!**********************************************************************!*\
    !*** ./src/app/dashboard/accountsummary/accountsummary.component.ts ***!
    \**********************************************************************/

  /*! exports provided: AccountsummaryComponent */

  /***/
  function srcAppDashboardAccountsummaryAccountsummaryComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AccountsummaryComponent", function () {
      return AccountsummaryComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var AccountsummaryComponent =
    /*#__PURE__*/
    function () {
      function AccountsummaryComponent() {
        _classCallCheck(this, AccountsummaryComponent);
      }

      _createClass(AccountsummaryComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return AccountsummaryComponent;
    }();

    AccountsummaryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-accountsummary',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./accountsummary.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/accountsummary/accountsummary.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./accountsummary.component.css */
      "./src/app/dashboard/accountsummary/accountsummary.component.css")).default]
    })], AccountsummaryComponent);
    /***/
  },

  /***/
  "./src/app/dashboard/dashboard-routing.module.ts":
  /*!*******************************************************!*\
    !*** ./src/app/dashboard/dashboard-routing.module.ts ***!
    \*******************************************************/

  /*! exports provided: DashboardRoutingModule */

  /***/
  function srcAppDashboardDashboardRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function () {
      return DashboardRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./dashboard.component */
    "./src/app/dashboard/dashboard.component.ts");

    var routes = [{
      path: '',
      component: _dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"]
    }];

    var DashboardRoutingModule = function DashboardRoutingModule() {
      _classCallCheck(this, DashboardRoutingModule);
    };

    DashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], DashboardRoutingModule);
    /***/
  },

  /***/
  "./src/app/dashboard/dashboard.component.css":
  /*!***************************************************!*\
    !*** ./src/app/dashboard/dashboard.component.css ***!
    \***************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDashboardDashboardComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\r\n#background{\r\n    width:100%;\r\n    height:20%;\r\n    background-color: rgb(62, 62, 105);\r\n    position: absolute;\r\n    top:0px;\r\n    left:0px;\r\n    z-index:-1;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUNJLFVBQVU7SUFDVixVQUFVO0lBQ1Ysa0NBQWtDO0lBQ2xDLGtCQUFrQjtJQUNsQixPQUFPO0lBQ1AsUUFBUTtJQUNSLFVBQVU7QUFDZCIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4jYmFja2dyb3VuZHtcclxuICAgIHdpZHRoOjEwMCU7XHJcbiAgICBoZWlnaHQ6MjAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDYyLCA2MiwgMTA1KTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDowcHg7XHJcbiAgICBsZWZ0OjBweDtcclxuICAgIHotaW5kZXg6LTE7XHJcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/dashboard/dashboard.component.ts":
  /*!**************************************************!*\
    !*** ./src/app/dashboard/dashboard.component.ts ***!
    \**************************************************/

  /*! exports provided: DashboardComponent */

  /***/
  function srcAppDashboardDashboardComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DashboardComponent", function () {
      return DashboardComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _core_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../core/authentication.service */
    "./src/app/core/authentication.service.ts");

    var DashboardComponent =
    /*#__PURE__*/
    function () {
      function DashboardComponent(authService) {
        _classCallCheck(this, DashboardComponent);

        this.authService = authService;
      }

      _createClass(DashboardComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.authService.loggedIn();
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.authService.loggedOut();
        }
      }]);

      return DashboardComponent;
    }();

    DashboardComponent.ctorParameters = function () {
      return [{
        type: _core_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]
      }];
    };

    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-dashboard',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./dashboard.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/dashboard.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./dashboard.component.css */
      "./src/app/dashboard/dashboard.component.css")).default]
    })], DashboardComponent);
    /***/
  },

  /***/
  "./src/app/dashboard/dashboard.module.ts":
  /*!***********************************************!*\
    !*** ./src/app/dashboard/dashboard.module.ts ***!
    \***********************************************/

  /*! exports provided: DashboardModule */

  /***/
  function srcAppDashboardDashboardModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "DashboardModule", function () {
      return DashboardModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./dashboard-routing.module */
    "./src/app/dashboard/dashboard-routing.module.ts");
    /* harmony import */


    var _dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./dashboard.component */
    "./src/app/dashboard/dashboard.component.ts");
    /* harmony import */


    var _shortcuts_shortcuts_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./shortcuts/shortcuts.component */
    "./src/app/dashboard/shortcuts/shortcuts.component.ts");
    /* harmony import */


    var _accountsummary_accountsummary_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./accountsummary/accountsummary.component */
    "./src/app/dashboard/accountsummary/accountsummary.component.ts");
    /* harmony import */


    var _ministatement_ministatement_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./ministatement/ministatement.component */
    "./src/app/dashboard/ministatement/ministatement.component.ts");
    /* harmony import */


    var _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ../shared/shared.module */
    "./src/app/shared/shared.module.ts");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");

    var DashboardModule = function DashboardModule() {
      _classCallCheck(this, DashboardModule);
    };

    DashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DashboardComponent"], _shortcuts_shortcuts_component__WEBPACK_IMPORTED_MODULE_5__["ShortcutsComponent"], _accountsummary_accountsummary_component__WEBPACK_IMPORTED_MODULE_6__["AccountsummaryComponent"], _ministatement_ministatement_component__WEBPACK_IMPORTED_MODULE_7__["MinistatementComponent"]],
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_3__["DashboardRoutingModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"]]
    })], DashboardModule);
    /***/
  },

  /***/
  "./src/app/dashboard/ministatement/ministatement.component.css":
  /*!*********************************************************************!*\
    !*** ./src/app/dashboard/ministatement/ministatement.component.css ***!
    \*********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDashboardMinistatementMinistatementComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = ".textwidget.custom-html-widget{\r\n    color:#7c7b7b;\r\n}\r\n*{\r\n    font-family: Lato;\r\n}\r\n#summaryheading h5{\r\n    color: #1F74B1;\r\n    font-family: Lato;\r\n    font-size: 16px;\r\n    font-weight: bold;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL21pbmlzdGF0ZW1lbnQvbWluaXN0YXRlbWVudC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtBQUNqQjtBQUNBO0lBQ0ksaUJBQWlCO0FBQ3JCO0FBQ0E7SUFDSSxjQUFjO0lBQ2QsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixpQkFBaUI7QUFDckIiLCJmaWxlIjoic3JjL2FwcC9kYXNoYm9hcmQvbWluaXN0YXRlbWVudC9taW5pc3RhdGVtZW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGV4dHdpZGdldC5jdXN0b20taHRtbC13aWRnZXR7XHJcbiAgICBjb2xvcjojN2M3YjdiO1xyXG59XHJcbip7XHJcbiAgICBmb250LWZhbWlseTogTGF0bztcclxufVxyXG4jc3VtbWFyeWhlYWRpbmcgaDV7XHJcbiAgICBjb2xvcjogIzFGNzRCMTtcclxuICAgIGZvbnQtZmFtaWx5OiBMYXRvO1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn0iXX0= */";
    /***/
  },

  /***/
  "./src/app/dashboard/ministatement/ministatement.component.ts":
  /*!********************************************************************!*\
    !*** ./src/app/dashboard/ministatement/ministatement.component.ts ***!
    \********************************************************************/

  /*! exports provided: MinistatementComponent */

  /***/
  function srcAppDashboardMinistatementMinistatementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MinistatementComponent", function () {
      return MinistatementComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common/http */
    "./node_modules/@angular/common/fesm2015/http.js");
    /* harmony import */


    var xml2js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! xml2js */
    "./node_modules/xml2js/lib/xml2js.js");
    /* harmony import */


    var xml2js__WEBPACK_IMPORTED_MODULE_3___default =
    /*#__PURE__*/
    __webpack_require__.n(xml2js__WEBPACK_IMPORTED_MODULE_3__);

    var MinistatementComponent =
    /*#__PURE__*/
    function () {
      function MinistatementComponent(http) {
        _classCallCheck(this, MinistatementComponent);

        this.http = http;
      }

      _createClass(MinistatementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this2 = this;

          this.http.get("http://localhost:4200/assets/statement.xml", {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-Type', 'text/xml').append('Access-Control-Allow-Methods', 'GET').append('Access-Control-Allow-Origin', '*').append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
            responseType: 'text'
          }).subscribe(function (res) {
            var parser = new xml2js__WEBPACK_IMPORTED_MODULE_3__["Parser"]({
              strict: false,
              trim: true
            });
            parser.parseString(res, function (err, result) {
              _this2.ministatement = result['SOAP:ENVELOPE']['SOAP:BODY'][0]['PCBFGATEWAYGETAPPSTATUSRESPONSE'][0]['PCBFAPPSTATUS'];
              console.log(_this2.ministatement);
            });
          });
        }
      }]);

      return MinistatementComponent;
    }();

    MinistatementComponent.ctorParameters = function () {
      return [{
        type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
      }];
    };

    MinistatementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-ministatement',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./ministatement.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/ministatement/ministatement.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./ministatement.component.css */
      "./src/app/dashboard/ministatement/ministatement.component.css")).default]
    })], MinistatementComponent);
    /***/
  },

  /***/
  "./src/app/dashboard/shortcuts/shortcuts.component.css":
  /*!*************************************************************!*\
    !*** ./src/app/dashboard/shortcuts/shortcuts.component.css ***!
    \*************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppDashboardShortcutsShortcutsComponentCss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "#short_cut{\r\n    background-color: #0074b6ff;\r\n    \r\n}\r\n/*#short_cut:after{\r\n    background: \r\n                linear-gradient(-45deg, transparent 20px, #0074b6ff 0), \r\n                linear-gradient(45deg, transparent 20px, #0074b6ff  0);\r\n    background-repeat: repeat-x;\r\n    background-position: left bottom;\r\n    background-size: 30px 20px;\r\n    content: \"\";\r\n    display: block;\r\n\r\n    width: 100%;\r\n    height: 32px;\r\n\r\n     position: relative;\r\n    top:47%;\r\n    left:0px;\r\n    border:none;\r\n  \r\n}\r\n*/\r\n#short_cut nav{\r\n    flex-wrap:nowrap;\r\n}\r\n#short_cut .nav-pills .nav-link{\r\n    color:white;\r\n    font-size:1rem;\r\n}\r\n#short_cut .nav-pills .nav-link.active{\r\n    color:white;\r\n    font-weight:500;\r\n    background-color: rgb(255, 255, 255, 0.3);\r\n   border-top-left-radius: 20px;\r\n   border-bottom-left-radius: 20px;\r\n   border-top-right-radius: 20px;\r\n   border-bottom-right-radius: 20px;\r\n}\r\n#short_cut .nav-pills .nav-link:hover{\r\n    color:white;\r\n    background-color: rgb(255, 255, 255, 0.3);\r\n   border-top-left-radius: 20px;\r\n   border-bottom-left-radius: 20px;\r\n   border-top-right-radius: 20px;\r\n   border-bottom-right-radius: 20px;\r\n}\r\n#short_cut .nav-link{\r\n    padding:0.5rem 0.5rem;\r\n}\r\n*{\r\n    font-family: Lato;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL3Nob3J0Y3V0cy9zaG9ydGN1dHMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDJCQUEyQjs7QUFFL0I7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW1CQztBQUNEO0lBQ0ksZ0JBQWdCO0FBQ3BCO0FBQ0E7SUFDSSxXQUFXO0lBQ1gsY0FBYztBQUNsQjtBQUNBO0lBQ0ksV0FBVztJQUNYLGVBQWU7SUFDZix5Q0FBeUM7R0FDMUMsNEJBQTRCO0dBQzVCLCtCQUErQjtHQUMvQiw2QkFBNkI7R0FDN0IsZ0NBQWdDO0FBQ25DO0FBQ0E7SUFDSSxXQUFXO0lBQ1gseUNBQXlDO0dBQzFDLDRCQUE0QjtHQUM1QiwrQkFBK0I7R0FDL0IsNkJBQTZCO0dBQzdCLGdDQUFnQztBQUNuQztBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxpQkFBaUI7QUFDckIiLCJmaWxlIjoic3JjL2FwcC9kYXNoYm9hcmQvc2hvcnRjdXRzL3Nob3J0Y3V0cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI3Nob3J0X2N1dHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDc0YjZmZjtcclxuICAgIFxyXG59XHJcbi8qI3Nob3J0X2N1dDphZnRlcntcclxuICAgIGJhY2tncm91bmQ6IFxyXG4gICAgICAgICAgICAgICAgbGluZWFyLWdyYWRpZW50KC00NWRlZywgdHJhbnNwYXJlbnQgMjBweCwgIzAwNzRiNmZmIDApLCBcclxuICAgICAgICAgICAgICAgIGxpbmVhci1ncmFkaWVudCg0NWRlZywgdHJhbnNwYXJlbnQgMjBweCwgIzAwNzRiNmZmICAwKTtcclxuICAgIGJhY2tncm91bmQtcmVwZWF0OiByZXBlYXQteDtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgYm90dG9tO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAzMHB4IDIwcHg7XHJcbiAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcblxyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDMycHg7XHJcblxyXG4gICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHRvcDo0NyU7XHJcbiAgICBsZWZ0OjBweDtcclxuICAgIGJvcmRlcjpub25lO1xyXG4gIFxyXG59XHJcbiovXHJcbiNzaG9ydF9jdXQgbmF2e1xyXG4gICAgZmxleC13cmFwOm5vd3JhcDtcclxufVxyXG4jc2hvcnRfY3V0IC5uYXYtcGlsbHMgLm5hdi1saW5re1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbiAgICBmb250LXNpemU6MXJlbTtcclxufVxyXG4jc2hvcnRfY3V0IC5uYXYtcGlsbHMgLm5hdi1saW5rLmFjdGl2ZXtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6NTAwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUsIDAuMyk7XHJcbiAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDIwcHg7XHJcbiAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDIwcHg7XHJcbiAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAyMHB4O1xyXG4gICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMjBweDtcclxufVxyXG4jc2hvcnRfY3V0IC5uYXYtcGlsbHMgLm5hdi1saW5rOmhvdmVye1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSwgMC4zKTtcclxuICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMjBweDtcclxuICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMjBweDtcclxuICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDIwcHg7XHJcbiAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAyMHB4O1xyXG59XHJcbiNzaG9ydF9jdXQgLm5hdi1saW5re1xyXG4gICAgcGFkZGluZzowLjVyZW0gMC41cmVtO1xyXG59XHJcbip7XHJcbiAgICBmb250LWZhbWlseTogTGF0bztcclxufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/dashboard/shortcuts/shortcuts.component.ts":
  /*!************************************************************!*\
    !*** ./src/app/dashboard/shortcuts/shortcuts.component.ts ***!
    \************************************************************/

  /*! exports provided: ShortcutsComponent */

  /***/
  function srcAppDashboardShortcutsShortcutsComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ShortcutsComponent", function () {
      return ShortcutsComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var ShortcutsComponent =
    /*#__PURE__*/
    function () {
      function ShortcutsComponent() {
        _classCallCheck(this, ShortcutsComponent);
      }

      _createClass(ShortcutsComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return ShortcutsComponent;
    }();

    ShortcutsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-shortcuts',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./shortcuts.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/dashboard/shortcuts/shortcuts.component.html")).default,
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./shortcuts.component.css */
      "./src/app/dashboard/shortcuts/shortcuts.component.css")).default]
    })], ShortcutsComponent);
    /***/
  }
}]);
//# sourceMappingURL=dashboard-dashboard-module-es5.js.map