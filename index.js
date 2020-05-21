"use strict";

var _idArr = [];

var AdUnit = function AdUnit(_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? '' : _ref$id;

  _idArr.push(id);

  for (var i = 0; i < _adUnits.length; i++) {
    if (_adUnits[i].id === id) {
      useGptSlot({
        path: _adUnits[i].unit,
        size: _adUnits[i].sizes,
        id: id
      });
      break;
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    id: id,
    style: {
      width: 'auto',
      height: 'auto'
    }
  });
};
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var PREBID_TIMEOUT = 1500;
var A9_TIMEOUT = 1500;
var _config = {};
var _user = {};
var _adUnits = [];
var _loaded = {};

var init = function init(adUnits, config) {
  var user = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  _config = config;
  _user = user;
  _adUnits = adUnits;
  window.__reactgamloaded = {};

  _addScript();

  if (_config.A9_ENABLED) {
    _addScriptA9();

    window.apstag.init({
      pubID: _config.A9_PUBID,
      adServer: 'googletag'
    });

    _fetchBidsA9();
  }

  if (_config.PBJS_ENABLED) {
    _addScriptPbjs();

    _fetchBidsPbjs();
  }
};

var _fetchBidsA9 = function _fetchBidsA9() {
  var adUnits = [];

  for (var i = 0; i < _adUnits.length; i++) {
    adUnits.push({
      slotID: _adUnits[i].id,
      slotName: _adUnits[i].unit,
      sizes: _adUnits[i].sizes
    });
  }

  window.apstag.fetchBids({
    slots: adUnits,
    timeout: A9_TIMEOUT
  }, initA9);
};

var initA9 = function initA9() {
  _log("bids returned a9");

  _loaded.a9 = true;
  googletag.cmd.push(function () {
    apstag.setDisplayBids();
  });

  if (_loaded.a9 && _loaded.pbjs) {
    displayAds();
  }
};

var initPbjs = function initPbjs() {
  if (pbjs.initAdserverSet) return;
  pbjs.initAdserverSet = true;

  _log("bids returned pbjs");

  _loaded.pbjs = true;
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  googletag.cmd.push(function () {
    pbjs.que.push(function () {
      pbjs.setTargetingForGPTAsync();
    });
  });

  if (_loaded.a9 && _loaded.pbjs) {
    displayAds();
  }
};

var _fetchBidsPbjs = function _fetchBidsPbjs() {
  var adUnits = [];

  for (var i = 0; i < _adUnits.length; i++) {
    var bidders = _generateBidders(_adUnits[i].sizes);

    adUnits.push({
      code: _adUnits[i].unit,
      bids: bidders,
      sizes: _adUnits[i].sizes,
      mediaTypes: {
        banner: {
          sizes: _adUnits[i].sizes
        }
      }
    });
  }

  pbjs.que = pbjs.que || [];
  pbjs.que.push(function () {
    pbjs.addAdUnits(adUnits);
    pbjs.requestBids({
      bidsBackHandler: initPbjs,
      timeout: PREBID_TIMEOUT
    });
  });
  setTimeout(initPbjs, PREBID_TIMEOUT);
};

var displayAds = function displayAds() {
  window.googletag.cmd.push(function () {
    window.googletag.pubads().refresh();

    _log('display ads!');

    _log(_config);

    _log(_user);

    _log(_adUnits);
  });
};

var _default = {
  init: init,
  AdUnit: AdUnit,
  displayAds: displayAds
};
exports["default"] = _default;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* prebid.js v3.20.0
Updated : 2020-05-20 */
!function (u) {
  var s = window.pbjsChunk;

  window.pbjsChunk = function (e, t, n) {
    for (var r, o, i, a = 0, c = []; a < e.length; a++) {
      o = e[a], d[o] && c.push(d[o][0]), d[o] = 0;
    }

    for (r in t) {
      Object.prototype.hasOwnProperty.call(t, r) && (u[r] = t[r]);
    }

    for (s && s(e, t, n); c.length;) {
      c.shift()();
    }

    if (n) for (a = 0; a < n.length; a++) {
      i = f(f.s = n[a]);
    }
    return i;
  };

  var n = {},
      d = {
    300: 0
  };

  function f(e) {
    if (n[e]) return n[e].exports;
    var t = n[e] = {
      i: e,
      l: !1,
      exports: {}
    };
    return u[e].call(t.exports, t, t.exports, f), t.l = !0, t.exports;
  }

  f.m = u, f.c = n, f.d = function (e, t, n) {
    f.o(e, t) || Object.defineProperty(e, t, {
      configurable: !1,
      enumerable: !0,
      get: n
    });
  }, f.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e["default"];
    } : function () {
      return e;
    };
    return f.d(t, "a", t), t;
  }, f.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, f.p = "", f.oe = function (e) {
    throw console.error(e), e;
  }, f(f.s = 802);
}([function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  }), n.d(t, "internal", function () {
    return R;
  }), n.d(t, "bind", function () {
    return k;
  }), t.getUniqueIdentifierStr = N, t.generateUUID = function e(t) {
    return t ? (t ^ M() >> t / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e);
  }, t.getBidIdParameter = function (e, t) {
    if (t && t[e]) return t[e];
    return "";
  }, t.tryAppendQueryString = function (e, t, n) {
    if (n) return e + t + "=" + encodeURIComponent(n) + "&";
    return e;
  }, t.parseQueryStringParameters = function (e) {
    var t = "";

    for (var n in e) {
      e.hasOwnProperty(n) && (t += n + "=" + encodeURIComponent(e[n]) + "&");
    }

    return t = t.replace(/&$/, "");
  }, t.transformAdServerTargetingObj = function (t) {
    return t && 0 < Object.getOwnPropertyNames(t).length ? le(t).map(function (e) {
      return "".concat(e, "=").concat(encodeURIComponent(pe(t, e)));
    }).join("&") : "";
  }, t.getAdUnitSizes = function (e) {
    if (!e) return;
    var t = [];

    if (e.mediaTypes && e.mediaTypes.banner && Array.isArray(e.mediaTypes.banner.sizes)) {
      var n = e.mediaTypes.banner.sizes;
      Array.isArray(n[0]) ? t = n : t.push(n);
    } else Array.isArray(e.sizes) && (Array.isArray(e.sizes[0]) ? t = e.sizes : t.push(e.sizes));

    return t;
  }, t.parseSizesInput = function (e) {
    var t = [];

    if ("string" == typeof e) {
      var n = e.split(","),
          r = /^(\d)+x(\d)+$/i;
      if (n) for (var o in n) {
        oe(n, o) && n[o].match(r) && t.push(n[o]);
      }
    } else if ("object" === h(e)) {
      var i = e.length;
      if (0 < i) if (2 === i && "number" == typeof e[0] && "number" == typeof e[1]) t.push(q(e));else for (var a = 0; a < i; a++) {
        t.push(q(e[a]));
      }
    }

    return t;
  }, t.parseGPTSingleSizeArray = q, t.parseGPTSingleSizeArrayToRtbSize = function (e) {
    if (G(e)) return {
      w: e[0],
      h: e[1]
    };
  }, t.getWindowTop = F, t.getWindowSelf = W, t.getWindowLocation = L, t.logMessage = z, t.logInfo = V, t.logWarn = H, t.logError = K, t.hasConsoleLogger = function () {
    return x;
  }, t.debugTurnedOn = Y, t.createInvisibleIframe = function () {
    var e = document.createElement("iframe");
    return e.id = N(), e.height = 0, e.width = 0, e.border = "0px", e.hspace = "0", e.vspace = "0", e.marginWidth = "0", e.marginHeight = "0", e.style.border = "0", e.scrolling = "no", e.frameBorder = "0", e.src = "about:blank", e.style.display = "none", e;
  }, t.getParameterByName = function (e) {
    return Te(L().search)[e] || "";
  }, t.isA = $, t.isFn = Q, t.isStr = X, t.isArray = Z, t.isNumber = ee, t.isPlainObject = te, t.isBoolean = function (e) {
    return $(e, j);
  }, t.isEmpty = ne, t.isEmptyStr = function (e) {
    return X(e) && (!e || 0 === e.length);
  }, t._each = re, t.contains = function (e, t) {
    if (ne(e)) return !1;
    if (Q(e.indexOf)) return -1 !== e.indexOf(t);
    var n = e.length;

    for (; n--;) {
      if (e[n] === t) return !0;
    }

    return !1;
  }, t._map = function (n, r) {
    if (ne(n)) return [];
    if (Q(n.map)) return n.map(r);
    var o = [];
    return re(n, function (e, t) {
      o.push(r(e, t, n));
    }), o;
  }, t.hasOwn = oe, t.insertElement = ie, t.triggerPixel = ae, t.callBurl = function (e) {
    var t = e.source,
        n = e.burl;
    t === S.S2S.SRC && n && R.triggerPixel(n);
  }, t.insertHtmlIntoIframe = function (e) {
    if (!e) return;
    var t = document.createElement("iframe");
    t.id = N(), t.width = 0, t.height = 0, t.hspace = "0", t.vspace = "0", t.marginWidth = "0", t.marginHeight = "0", t.style.display = "none", t.style.height = "0px", t.style.width = "0px", t.scrolling = "no", t.frameBorder = "0", t.allowtransparency = "true", R.insertElement(t, document, "body"), t.contentWindow.document.open(), t.contentWindow.document.write(e), t.contentWindow.document.close();
  }, t.insertUserSyncIframe = ce, t.createTrackPixelHtml = function (e) {
    if (!e) return "";
    var t = encodeURI(e),
        n = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
    return n += '<img src="' + t + '"></div>';
  }, t.createTrackPixelIframeHtml = ue, t.getValueString = se, t.uniques = de, t.flatten = fe, t.getBidRequest = function (n, e) {
    return n ? (e.some(function (e) {
      var t = s()(e.bids, function (t) {
        return ["bidId", "adId", "bid_id"].some(function (e) {
          return t[e] === n;
        });
      });
      return t && (r = t), t;
    }), r) : void 0;
    var r;
  }, t.getKeys = le, t.getValue = pe, t.getKeyByValue = function (e, t) {
    for (var n in e) {
      if (e.hasOwnProperty(n) && e[n] === t) return n;
    }
  }, t.getBidderCodes = function () {
    return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : pbjs.adUnits).map(function (e) {
      return e.bids.map(function (e) {
        return e.bidder;
      }).reduce(fe, []);
    }).reduce(fe).filter(de);
  }, t.isGptPubadsDefined = ge, n.d(t, "getHighestCpm", function () {
    return ye;
  }), n.d(t, "getOldestHighestCpmBid", function () {
    return be;
  }), n.d(t, "getLatestHighestCpmBid", function () {
    return ve;
  }), t.shuffle = function (e) {
    var t = e.length;

    for (; 0 < t;) {
      var n = Math.floor(Math.random() * t),
          r = e[--t];
      e[t] = e[n], e[n] = r;
    }

    return e;
  }, t.adUnitsFilter = function (e, t) {
    return f()(e, t && t.adUnitCode);
  }, t.deepClone = me, t.inIframe = function () {
    try {
      return R.getWindowSelf() !== R.getWindowTop();
    } catch (e) {
      return !0;
    }
  }, t.isSafariBrowser = function () {
    return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
  }, t.replaceAuctionPrice = function (e, t) {
    if (!e) return;
    return e.replace(/\$\{AUCTION_PRICE\}/g, t);
  }, t.timestamp = function () {
    return new Date().getTime();
  }, t.hasDeviceAccess = function () {
    return !1 !== r.b.getConfig("deviceAccess");
  }, t.checkCookieSupport = Se, t.delayExecution = function (e, t) {
    if (t < 1) throw new Error("numRequiredCalls must be a positive number. Got ".concat(t));
    var n = 0;
    return function () {
      ++n === t && e.apply(this, arguments);
    };
  }, t.groupBy = function (e, n) {
    return e.reduce(function (e, t) {
      return (e[t[n]] = e[t[n]] || []).push(t), e;
    }, {});
  }, t.getDefinedParams = function (n, e) {
    return e.filter(function (e) {
      return n[e];
    }).reduce(function (e, t) {
      return v(e, b({}, t, n[t]));
    }, {});
  }, t.isValidMediaTypes = function (e) {
    var t = ["banner", "native", "video"];
    if (!Object.keys(e).every(function (e) {
      return f()(t, e);
    })) return !1;
    if (e.video && e.video.context) return f()(["instream", "outstream", "adpod"], e.video.context);
    return !0;
  }, t.getBidderRequest = function (e, t, n) {
    return s()(e, function (e) {
      return 0 < e.bids.filter(function (e) {
        return e.bidder === t && e.adUnitCode === n;
      }).length;
    }) || {
      start: null,
      auctionId: null
    };
  }, t.getUserConfiguredParams = function (e, t, n) {
    return e.filter(function (e) {
      return e.code === t;
    }).map(function (e) {
      return e.bids;
    }).reduce(fe, []).filter(function (e) {
      return e.bidder === n;
    }).map(function (e) {
      return e.params || {};
    });
  }, t.getOrigin = function () {
    return window.location.origin ? window.location.origin : window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
  }, t.getDNT = function () {
    return "1" === navigator.doNotTrack || "1" === window.doNotTrack || "1" === navigator.msDoNotTrack || "yes" === navigator.doNotTrack;
  }, t.isAdUnitCodeMatchingSlot = function (t) {
    return function (e) {
      return Ae(t, e);
    };
  }, t.isSlotMatchingAdUnitCode = Ee, t.getGptSlotInfoForAdUnitCode = function (e) {
    var t;
    ge() && (t = s()(window.googletag.pubads().getSlots(), Ee(e)));
    if (t) return {
      gptSlot: t.getAdUnitPath(),
      divId: t.getSlotElementId()
    };
    return {};
  }, t.unsupportedBidderMessage = function (e, t) {
    var n = Object.keys(e.mediaTypes || {
      banner: "banner"
    }).join(", ");
    return "\n    ".concat(e.code, " is a ").concat(n, " ad unit\n    containing bidders that don't support ").concat(n, ": ").concat(t, ".\n    This bidder won't fetch demand.\n  ");
  }, t.isInteger = Oe, t.convertCamelToUnderscore = function (e) {
    return e.replace(/(?:^|\.?)([A-Z])/g, function (e, t) {
      return "_" + t.toLowerCase();
    }).replace(/^_/, "");
  }, t.cleanObj = function (n) {
    return Object.keys(n).reduce(function (e, t) {
      return void 0 !== n[t] && (e[t] = n[t]), e;
    }, {});
  }, t.pick = function (a, c) {
    return "object" === h(a) ? c.reduce(function (e, t, n) {
      if ("function" == typeof t) return e;
      var r = t,
          o = t.match(/^(.+?)\sas\s(.+?)$/i);
      o && (t = o[1], r = o[2]);
      var i = a[t];
      return "function" == typeof c[n + 1] && (i = c[n + 1](i, e)), void 0 !== i && (e[r] = i), e;
    }, {}) : {};
  }, t.transformBidderParamKeywords = function (e) {
    var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "keywords",
        o = [];
    return re(e, function (e, t) {
      if (Z(e)) {
        var n = [];
        re(e, function (e) {
          !(e = se(r + "." + t, e)) && "" !== e || n.push(e);
        }), e = n;
      } else {
        if (!X(e = se(r + "." + t, e))) return;
        e = [e];
      }

      o.push({
        key: t,
        value: e
      });
    }), o;
  }, t.convertTypes = function (r, o) {
    return Object.keys(r).forEach(function (e) {
      var t, n;
      o[e] && (Q(r[e]) ? o[e] = r[e](o[e]) : o[e] = (t = r[e], n = o[e], "string" === t ? n && n.toString() : "number" === t ? Number(n) : n), isNaN(o[e]) && delete o.key);
    }), o;
  }, t.isArrayOfNums = function (e, t) {
    return Z(e) && (!t || e.length === t) && e.every(function (e) {
      return Oe(e);
    });
  }, t.fill = function (e, t) {
    for (var n = [], r = 0; r < t; r++) {
      var o = te(e) ? me(e) : e;
      n.push(o);
    }

    return n;
  }, t.chunk = function (e, t) {
    for (var n = [], r = 0; r < Math.ceil(e.length / t); r++) {
      var o = r * t,
          i = o + t;
      n.push(e.slice(o, i));
    }

    return n;
  }, t.getMinValueFromArray = function (e) {
    return Math.min.apply(Math, y(e));
  }, t.getMaxValueFromArray = function (e) {
    return Math.max.apply(Math, y(e));
  }, t.compareOn = function (n) {
    return function (e, t) {
      return e[n] < t[n] ? 1 : e[n] > t[n] ? -1 : 0;
    };
  }, t.parseQS = Te, t.formatQS = Ie, t.parseUrl = function (e, t) {
    var n = document.createElement("a");
    t && "noDecodeWholeURL" in t && t.noDecodeWholeURL ? n.href = e : n.href = decodeURIComponent(e);
    var r = t && "decodeSearchAsString" in t && t.decodeSearchAsString;
    return {
      href: n.href,
      protocol: (n.protocol || "").replace(/:$/, ""),
      hostname: n.hostname,
      port: +n.port,
      pathname: n.pathname.replace(/^(?!\/)/, "/"),
      search: r ? n.search : R.parseQS(n.search || ""),
      hash: (n.hash || "").replace(/^#/, ""),
      host: n.host || window.location.host
    };
  }, t.buildUrl = function (e) {
    return (e.protocol || "http") + "://" + (e.host || e.hostname + (e.port ? ":".concat(e.port) : "")) + (e.pathname || "") + (e.search ? "?".concat(R.formatQS(e.search || "")) : "") + (e.hash ? "#".concat(e.hash) : "");
  }, t.deepEqual = je, t.mergeDeep = function e(t) {
    for (var n = arguments.length, r = new Array(1 < n ? n - 1 : 0), o = 1; o < n; o++) {
      r[o - 1] = arguments[o];
    }

    if (!r.length) return t;
    var i = r.shift();
    if (te(t) && te(i)) for (var a in i) {
      te(i[a]) ? (t[a] || v(t, b({}, a, {})), e(t[a], i[a])) : Z(i[a]) && t[a] ? Z(t[a]) && (t[a] = t[a].concat(i[a])) : v(t, b({}, a, i[a]));
    }
    return e.apply(void 0, [t].concat(r));
  };
  var r = n(3),
      o = n(164),
      i = n.n(o),
      a = n(165),
      c = n.n(a),
      u = n(12),
      s = n.n(u),
      d = n(11),
      f = n.n(d),
      l = n(179);
  n.d(t, "deepAccess", function () {
    return l.a;
  });
  var p = n(180);

  function g(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
      var n = [],
          r = !0,
          o = !1,
          i = void 0;

      try {
        for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0) {
          ;
        }
      } catch (e) {
        o = !0, i = e;
      } finally {
        try {
          r || null == c["return"] || c["return"]();
        } finally {
          if (o) throw i;
        }
      }

      return n;
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  }

  function y(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = new Array(e.length); t < e.length; t++) {
          n[t] = e[t];
        }

        return n;
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  function b(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  function v() {
    return (v = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  function h(e) {
    return (h = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(e);
  }

  n.d(t, "deepSetValue", function () {
    return p.a;
  });

  var m,
      S = n(5),
      A = "Array",
      E = "String",
      O = "Function",
      T = "Number",
      I = "Object",
      j = "Boolean",
      w = Object.prototype.toString,
      C = Boolean(window.console),
      x = Boolean(C && window.console.log),
      _ = Boolean(C && window.console.info),
      U = Boolean(C && window.console.warn),
      B = Boolean(C && window.console.error),
      R = {
    checkCookieSupport: Se,
    createTrackPixelIframeHtml: ue,
    getWindowSelf: W,
    getWindowTop: F,
    getWindowLocation: L,
    insertUserSyncIframe: ce,
    insertElement: ie,
    isFn: Q,
    triggerPixel: ae,
    logError: K,
    logWarn: H,
    logMessage: z,
    logInfo: V,
    parseQS: Te,
    formatQS: Ie,
    deepEqual: je
  },
      P = {},
      k = function (e, t) {
    return t;
  }.bind(null, 1, P)() === P ? Function.prototype.bind : function (e) {
    var t = this,
        n = Array.prototype.slice.call(arguments, 1);
    return function () {
      return t.apply(e, n.concat(Array.prototype.slice.call(arguments)));
    };
  },
      D = (m = 0, function () {
    return ++m;
  });

  function N() {
    return D() + Math.random().toString(16).substr(2);
  }

  function M() {
    return window && window.crypto && window.crypto.getRandomValues ? crypto.getRandomValues(new Uint8Array(1))[0] % 16 : 16 * Math.random();
  }

  function q(e) {
    if (G(e)) return e[0] + "x" + e[1];
  }

  function G(e) {
    return Z(e) && 2 === e.length && !isNaN(e[0]) && !isNaN(e[1]);
  }

  function F() {
    return window.top;
  }

  function W() {
    return window.self;
  }

  function L() {
    return window.location;
  }

  function z() {
    Y() && x && console.log.apply(console, J(arguments, "MESSAGE:"));
  }

  function V() {
    Y() && _ && console.info.apply(console, J(arguments, "INFO:"));
  }

  function H() {
    Y() && U && console.warn.apply(console, J(arguments, "WARNING:"));
  }

  function K() {
    Y() && B && console.error.apply(console, J(arguments, "ERROR:"));
  }

  function J(e, t) {
    return e = [].slice.call(e), t && e.unshift(t), e.unshift("display: inline-block; color: #fff; background: #3b88c3; padding: 1px 4px; border-radius: 3px;"), e.unshift("%cPrebid"), e;
  }

  function Y() {
    return !!r.b.getConfig("debug");
  }

  function $(e, t) {
    return w.call(e) === "[object " + t + "]";
  }

  function Q(e) {
    return $(e, O);
  }

  function X(e) {
    return $(e, E);
  }

  function Z(e) {
    return $(e, A);
  }

  function ee(e) {
    return $(e, T);
  }

  function te(e) {
    return $(e, I);
  }

  function ne(e) {
    if (!e) return !0;
    if (Z(e) || X(e)) return !(0 < e.length);

    for (var t in e) {
      if (hasOwnProperty.call(e, t)) return !1;
    }

    return !0;
  }

  function re(e, t) {
    if (!ne(e)) {
      if (Q(e.forEach)) return e.forEach(t, this);
      var n = 0,
          r = e.length;
      if (0 < r) for (; n < r; n++) {
        t(e[n], n, e);
      } else for (n in e) {
        hasOwnProperty.call(e, n) && t.call(this, e[n], n);
      }
    }
  }

  function oe(e, t) {
    return e.hasOwnProperty ? e.hasOwnProperty(t) : void 0 !== e[t] && e.constructor.prototype[t] !== e[t];
  }

  function ie(e, t, n, r) {
    var o;
    t = t || document, o = n ? t.getElementsByTagName(n) : t.getElementsByTagName("head");

    try {
      if ((o = o.length ? o : t.getElementsByTagName("body")).length) {
        o = o[0];
        var i = r ? null : o.firstChild;
        return o.insertBefore(e, i);
      }
    } catch (e) {}
  }

  function ae(e, t) {
    var n = new Image();
    t && R.isFn(t) && (n.addEventListener("load", t), n.addEventListener("error", t)), n.src = e;
  }

  function ce(e, t) {
    var n = R.createTrackPixelIframeHtml(e, !1, "allow-scripts allow-same-origin"),
        r = document.createElement("div");
    r.innerHTML = n;
    var o = r.firstChild;
    t && R.isFn(t) && (o.addEventListener("load", t), o.addEventListener("error", t)), R.insertElement(o, document, "html", !0);
  }

  function ue(e) {
    var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "";
    return e ? ((!(1 < arguments.length && void 0 !== arguments[1]) || arguments[1]) && (e = encodeURI(e)), t = t && 'sandbox="'.concat(t, '"'), "<iframe ".concat(t, ' id="').concat(N(), '"\n      frameborder="0"\n      allowtransparency="true"\n      marginheight="0" marginwidth="0"\n      width="0" hspace="0" vspace="0" height="0"\n      style="height:0px;width:0px;display:none;"\n      scrolling="no"\n      src="').concat(e, '">\n    </iframe>')) : "";
  }

  function se(e, t, n) {
    return null == t ? n : X(t) ? t : ee(t) ? t.toString() : void R.logWarn("Unsuported type for param: " + e + " required type: String");
  }

  function de(e, t, n) {
    return n.indexOf(e) === t;
  }

  function fe(e, t) {
    return e.concat(t);
  }

  function le(e) {
    return Object.keys(e);
  }

  function pe(e, t) {
    return e[t];
  }

  function ge() {
    if (window.googletag && Q(window.googletag.pubads) && Q(window.googletag.pubads().getSlots)) return !0;
  }

  var ye = he("timeToRespond", function (e, t) {
    return t < e;
  }),
      be = he("responseTimestamp", function (e, t) {
    return t < e;
  }),
      ve = he("responseTimestamp", function (e, t) {
    return e < t;
  });

  function he(n, r) {
    return function (e, t) {
      return e.cpm === t.cpm ? r(e[n], t[n]) ? t : e : e.cpm < t.cpm ? t : e;
    };
  }

  function me(e) {
    return i()(e);
  }

  function Se() {
    if (window.navigator.cookieEnabled || document.cookie.length) return !0;
  }

  var Ae = function Ae(e, t) {
    return e.getAdUnitPath() === t || e.getSlotElementId() === t;
  };

  function Ee(t) {
    return function (e) {
      return Ae(e, t);
    };
  }

  function Oe(e) {
    return Number.isInteger ? Number.isInteger(e) : "number" == typeof e && isFinite(e) && Math.floor(e) === e;
  }

  function Te(e) {
    return e ? e.replace(/^\?/, "").split("&").reduce(function (e, t) {
      var n = g(t.split("="), 2),
          r = n[0],
          o = n[1];
      return /\[\]$/.test(r) ? (e[r = r.replace("[]", "")] = e[r] || [], e[r].push(o)) : e[r] = o || "", e;
    }, {}) : {};
  }

  function Ie(e) {
    return Object.keys(e).map(function (t) {
      return Array.isArray(e[t]) ? e[t].map(function (e) {
        return "".concat(t, "[]=").concat(e);
      }).join("&") : "".concat(t, "=").concat(e[t]);
    }).join("&");
  }

  function je(e, t) {
    return c()(e, t);
  }
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  }), n.d(t, "storage", function () {
    return T;
  }), t.registerBidder = function (t) {
    var n = Array.isArray(t.supportedMediaTypes) ? {
      supportedMediaTypes: t.supportedMediaTypes
    } : void 0;

    function r(e) {
      var t = w(e);
      c["default"].registerBidAdapter(t, e.code, n);
    }

    r(t), Array.isArray(t.aliases) && t.aliases.forEach(function (e) {
      c["default"].aliasRegistry[e] = t.code, r(O({}, t, {
        code: e
      }));
    });
  }, t.newBidder = w, n.d(t, "registerSyncInner", function () {
    return C;
  }), t.preloadBidderMappingFile = x, t.getIabSubCategory = function (t, e) {
    var n = c["default"].getBidAdapter(t);

    if (n.getSpec().getMappingFileInfo) {
      var r = n.getSpec().getMappingFileInfo(),
          o = r.localStorageKey ? r.localStorageKey : n.getBidderCode(),
          i = T.getDataFromLocalStorage(o);

      if (i) {
        try {
          i = JSON.parse(i);
        } catch (e) {
          Object(m.logError)("Failed to parse ".concat(t, " mapping data stored in local storage"));
        }

        return i.mapping[e] ? i.mapping[e] : null;
      }
    }
  }, t.isValid = _;
  var r = n(97),
      c = n(7),
      u = n(3),
      b = n(31),
      s = n(42),
      i = n(35),
      a = n(43),
      o = n(5),
      v = n.n(o),
      d = n(8),
      h = n.n(d),
      f = n(11),
      l = n.n(f),
      p = n(4),
      m = n(0),
      g = n(2),
      y = n(13),
      S = n(9);

  function A(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
      var n = [],
          r = !0,
          o = !1,
          i = void 0;

      try {
        for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0) {
          ;
        }
      } catch (e) {
        o = !0, i = e;
      } finally {
        try {
          r || null == c["return"] || c["return"]();
        } finally {
          if (o) throw i;
        }
      }

      return n;
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  }

  function E(e) {
    return (E = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(e);
  }

  function O() {
    return (O = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  var T = Object(S.a)("bidderFactory"),
      I = ["requestId", "cpm", "ttl", "creativeId", "netRevenue", "currency"],
      j = 1;

  function w(p) {
    return O(new r.a(p.code), {
      getSpec: function getSpec() {
        return Object.freeze(p);
      },
      registerSyncs: g,
      callBids: function callBids(i, a, e, n, c, r) {
        if (Array.isArray(i.bids)) {
          var u = {},
              s = [],
              t = i.bids.filter(y);

          if (0 !== t.length) {
            var d = {};
            t.forEach(function (e) {
              (d[e.bidId] = e).adUnitCode || (e.adUnitCode = e.placementCode);
            });
            var o = p.buildRequests(t, i);

            if (o && 0 !== o.length) {
              Array.isArray(o) || (o = [o]);
              var f = Object(m.delayExecution)(r(l), o.length);
              o.forEach(function (o) {
                switch (o.method) {
                  case "GET":
                    n("".concat(o.url).concat(function (e) {
                      if (e) return "?".concat("object" === E(e) ? Object(m.parseQueryStringParameters)(e) : e);
                      return "";
                    }(o.data)), {
                      success: r(e),
                      error: t
                    }, void 0, O({
                      method: "GET",
                      withCredentials: !0
                    }, o.options));
                    break;

                  case "POST":
                    n(o.url, {
                      success: r(e),
                      error: t
                    }, "string" == typeof o.data ? o.data : JSON.stringify(o.data), O({
                      method: "POST",
                      contentType: "text/plain",
                      withCredentials: !0
                    }, o.options));
                    break;

                  default:
                    Object(m.logWarn)("Skipping invalid request from ".concat(p.code, ". Request type ").concat(o.type, " must be GET or POST")), f();
                }

                function e(e, t) {
                  c(p.code);

                  try {
                    e = JSON.parse(e);
                  } catch (e) {}

                  var n;
                  e = {
                    body: e,
                    headers: {
                      get: t.getResponseHeader.bind(t)
                    }
                  }, s.push(e);

                  try {
                    n = p.interpretResponse(e, o);
                  } catch (e) {
                    return Object(m.logError)("Bidder ".concat(p.code, " failed to interpret the server's response. Continuing without bids"), null, e), void f();
                  }

                  function r(e) {
                    var t,
                        n,
                        r = d[e.requestId];

                    if (r) {
                      e.originalCpm = e.cpm, e.originalCurrency = e.currency;
                      var o = O(Object(b.a)(v.a.STATUS.GOOD, r), e);
                      t = r.adUnitCode, n = o, u[t] = !0, _(t, n, [i]) && a(t, n);
                    } else Object(m.logWarn)("Bidder ".concat(p.code, " made bid for unknown request ID: ").concat(e.requestId, ". Ignoring."));
                  }

                  n && (Object(m.isArray)(n) ? n.forEach(r) : r(n)), f(n);
                }

                function t(e) {
                  c(p.code), Object(m.logError)("Server call for ".concat(p.code, " failed: ").concat(e, ". Continuing without bids.")), f();
                }
              });
            } else l();
          } else l();
        }

        function l() {
          e(), h.a.emit(v.a.EVENTS.BIDDER_DONE, i), g(s, i.gdprConsent, i.uspConsent);
        }
      }
    });

    function g(e, t, n) {
      C(p, e, t, n);
    }

    function y(e) {
      return !!p.isBidRequestValid(e) || (Object(m.logWarn)("Invalid bid sent to bidder ".concat(p.code, ": ").concat(JSON.stringify(e))), !1);
    }
  }

  var C = Object(y.b)("async", function (t, e, n, r) {
    var o = u.b.getConfig("userSync.aliasSyncEnabled");

    if (t.getUserSyncs && (o || !c["default"].aliasRegistry[t.code])) {
      var i = u.b.getConfig("userSync.filterSettings"),
          a = t.getUserSyncs({
        iframeEnabled: !(!i || !i.iframe && !i.all),
        pixelEnabled: !(!i || !i.image && !i.all)
      }, e, n, r);
      a && (Array.isArray(a) || (a = [a]), a.forEach(function (e) {
        s.a.registerSync(e.type, t.code, e.url);
      }));
    }
  }, "registerSyncs");

  function x(e, t) {
    if (!u.b.getConfig("adpod.brandCategoryExclusion")) return e.call(this, t);
    t.filter(function (e) {
      return Object(m.deepAccess)(e, "mediaTypes.video.context") === g.a;
    }).map(function (e) {
      return e.bids.map(function (e) {
        return e.bidder;
      });
    }).reduce(m.flatten, []).filter(m.uniques).forEach(function (n) {
      var e = c["default"].getBidAdapter(n);

      if (e.getSpec().getMappingFileInfo) {
        var t = e.getSpec().getMappingFileInfo(),
            r = t.refreshInDays ? t.refreshInDays : j,
            o = t.localStorageKey ? t.localStorageKey : e.getSpec().code,
            i = T.getDataFromLocalStorage(o);
        (!i || Object(m.timestamp)() < i.lastUpdated + 24 * r * 60 * 60 * 1e3) && Object(p.a)(t.url, {
          success: function success(e) {
            try {
              e = JSON.parse(e);
              var t = {
                lastUpdated: Object(m.timestamp)(),
                mapping: e.mapping
              };
              T.setDataInLocalStorage(o, JSON.stringify(t));
            } catch (e) {
              Object(m.logError)("Failed to parse ".concat(n, " bidder translation mapping file"));
            }
          },
          error: function error() {
            Object(m.logError)("Failed to load ".concat(n, " bidder translation file"));
          }
        });
      }
    }), e.call(this, t);
  }

  function _(e, t, n) {
    function r(e) {
      return "Invalid bid from ".concat(t.bidderCode, ". Ignoring bid: ").concat(e);
    }

    return e ? t ? (o = Object.keys(t), I.every(function (e) {
      return l()(o, e) && !l()([void 0, null], t[e]);
    }) ? "native" !== t.mediaType || Object(i.f)(t, n) ? "video" !== t.mediaType || Object(a.d)(t, n) ? !("banner" === t.mediaType && !function (e, t, n) {
      if ((t.width || 0 === parseInt(t.width, 10)) && (t.height || 0 === parseInt(t.height, 10))) return t.width = parseInt(t.width, 10), t.height = parseInt(t.height, 10), 1;
      var r = Object(m.getBidderRequest)(n, t.bidderCode, e),
          o = r && r.bids && r.bids[0] && r.bids[0].sizes,
          i = Object(m.parseSizesInput)(o);

      if (1 === i.length) {
        var a = A(i[0].split("x"), 2),
            c = a[0],
            u = a[1];
        return t.width = parseInt(c, 10), t.height = parseInt(u, 10), 1;
      }
    }(e, t, n)) || (Object(m.logError)(r("Banner bids require a width and height")), !1) : (Object(m.logError)(r("Video bid does not have required vastUrl or renderer property")), !1) : (Object(m.logError)(r("Native bid missing some required properties.")), !1) : (Object(m.logError)(r("Bidder ".concat(t.bidderCode, " is missing required params. Check http://prebid.org/dev-docs/bidder-adapter-1.html for list of params."))), !1)) : (Object(m.logWarn)("Some adapter tried to add an undefined bid for ".concat(e, ".")), !1) : (Object(m.logWarn)("No adUnitCode was supplied to addBidResponse."), !1);
    var o;
  }

  Object(y.a)("checkAdUnitSetup").before(x);
}, function (e, t, n) {
  "use strict";

  n.d(t, "c", function () {
    return r;
  }), n.d(t, "d", function () {
    return o;
  }), n.d(t, "b", function () {
    return i;
  }), n.d(t, "a", function () {
    return a;
  });
  var r = "native",
      o = "video",
      i = "banner",
      a = "adpod";
}, function (e, t, n) {
  "use strict";

  n.d(t, "a", function () {
    return v;
  }), n.d(t, "b", function () {
    return j;
  });
  var r = n(44),
      o = n(12),
      a = n.n(o),
      i = n(11),
      c = n.n(i),
      u = n(80),
      s = n.n(u),
      d = n(0);

  function f() {
    return (f = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  var l = n(92),
      p = n(0),
      g = n(5),
      y = "TRUE" === p.getParameterByName(g.DEBUG_MODE).toUpperCase(),
      b = window.location.origin,
      v = "random",
      h = {};
  h[v] = !0, h.fixed = !0;
  var m = v,
      S = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
    AUTO: "auto",
    DENSE: "dense",
    CUSTOM: "custom"
  };
  var A,
      E,
      O,
      T,
      I,
      j = (T = [], I = null, w(), {
    getCurrentBidder: function getCurrentBidder() {
      return I;
    },
    getConfig: function getConfig() {
      if (arguments.length <= 1 && "function" != typeof (arguments.length <= 0 ? void 0 : arguments[0])) {
        var e = arguments.length <= 0 ? void 0 : arguments[0];
        return e ? p.deepAccess(C(), e) : C();
      }

      return function (e, t) {
        var n = t;

        if ("string" != typeof e && (n = e, e = "*"), "function" == typeof n) {
          var r = {
            topic: e,
            callback: n
          };
          return T.push(r), function () {
            T.splice(T.indexOf(r), 1);
          };
        }

        p.logError("listener must be a function");
      }.apply(void 0, arguments);
    },
    setConfig: function setConfig(n) {
      if (p.isPlainObject(n)) {
        var e = Object.keys(n),
            r = {};
        e.forEach(function (e) {
          var t = n[e];
          p.isPlainObject(A[e]) && p.isPlainObject(t) && (t = f({}, A[e], t)), r[e] = E[e] = t;
        }), x(r);
      } else p.logError("setConfig options must be an object");
    },
    setDefaults: function setDefaults(e) {
      p.isPlainObject(A) ? (f(A, e), f(E, e)) : p.logError("defaults must be an object");
    },
    resetConfig: w,
    runWithBidder: _,
    callbackWithBidder: function callbackWithBidder(i) {
      return function (o) {
        return function () {
          if ("function" == typeof o) {
            for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) {
              n[r] = arguments[r];
            }

            return _(i, (e = p.bind).call.apply(e, [o, this].concat(n)));
          }

          p.logWarn("config.callbackWithBidder callback is not a function");
        };
      };
    },
    setBidderConfig: function setBidderConfig(r) {
      try {
        !function (e) {
          if (!p.isPlainObject(e)) throw "setBidderConfig bidder options must be an object";
          if (!Array.isArray(e.bidders) || !e.bidders.length) throw "setBidderConfig bidder options must contain a bidders list with at least 1 bidder";
          if (!p.isPlainObject(e.config)) throw "setBidderConfig bidder options must contain a config object";
        }(r), r.bidders.forEach(function (n) {
          O[n] || (O[n] = {}), Object.keys(r.config).forEach(function (e) {
            var t = r.config[e];
            p.isPlainObject(t) ? O[n][e] = f({}, O[n][e] || {}, t) : O[n][e] = t;
          });
        });
      } catch (e) {
        p.logError(e);
      }
    },
    getBidderConfig: function getBidderConfig() {
      return O;
    }
  });

  function w() {
    A = {};
    var n = {
      _debug: y,

      get debug() {
        return this._debug;
      },

      set debug(e) {
        this._debug = e;
      },

      _bidderTimeout: 3e3,

      get bidderTimeout() {
        return this._bidderTimeout;
      },

      set bidderTimeout(e) {
        this._bidderTimeout = e;
      },

      _publisherDomain: b,

      get publisherDomain() {
        return this._publisherDomain;
      },

      set publisherDomain(e) {
        this._publisherDomain = e;
      },

      _priceGranularity: S.MEDIUM,

      set priceGranularity(e) {
        i(e) && ("string" == typeof e ? this._priceGranularity = o(e) ? e : S.MEDIUM : p.isPlainObject(e) && (this._customPriceBucket = e, this._priceGranularity = S.CUSTOM, p.logMessage("Using custom price granularity")));
      },

      get priceGranularity() {
        return this._priceGranularity;
      },

      _customPriceBucket: {},

      get customPriceBucket() {
        return this._customPriceBucket;
      },

      _mediaTypePriceGranularity: {},

      get mediaTypePriceGranularity() {
        return this._mediaTypePriceGranularity;
      },

      set mediaTypePriceGranularity(n) {
        var r = this;
        this._mediaTypePriceGranularity = Object.keys(n).reduce(function (e, t) {
          return i(n[t]) ? "string" == typeof n ? e[t] = o(n[t]) ? n[t] : r._priceGranularity : p.isPlainObject(n) && (e[t] = n[t], p.logMessage("Using custom price granularity for ".concat(t))) : p.logWarn("Invalid price granularity for media type: ".concat(t)), e;
        }, {});
      },

      _sendAllBids: !0,

      get enableSendAllBids() {
        return this._sendAllBids;
      },

      set enableSendAllBids(e) {
        this._sendAllBids = e;
      },

      _useBidCache: !1,

      get useBidCache() {
        return this._useBidCache;
      },

      set useBidCache(e) {
        this._useBidCache = e;
      },

      _deviceAccess: !0,

      get deviceAccess() {
        return this._deviceAccess;
      },

      set deviceAccess(e) {
        this._deviceAccess = e;
      },

      _bidderSequence: m,

      get bidderSequence() {
        return this._bidderSequence;
      },

      set bidderSequence(e) {
        h[e] ? this._bidderSequence = e : p.logWarn("Invalid order: ".concat(e, ". Bidder Sequence was not set."));
      },

      _timeoutBuffer: 400,

      get timeoutBuffer() {
        return this._timeoutBuffer;
      },

      set timeoutBuffer(e) {
        this._timeoutBuffer = e;
      },

      _disableAjaxTimeout: !1,

      get disableAjaxTimeout() {
        return this._disableAjaxTimeout;
      },

      set disableAjaxTimeout(e) {
        this._disableAjaxTimeout = e;
      }

    };

    function o(t) {
      return a()(Object.keys(S), function (e) {
        return t === S[e];
      });
    }

    function i(e) {
      if (e) {
        if ("string" == typeof e) o(e) || p.logWarn("Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default.");else if (p.isPlainObject(e) && !Object(r.b)(e)) return void p.logError("Invalid custom price value passed to `setPriceGranularity()`");
        return 1;
      }

      p.logError("Prebid Error: no value passed to `setPriceGranularity()`");
    }

    E && x(Object.keys(E).reduce(function (e, t) {
      return E[t] !== n[t] && (e[t] = n[t] || {}), e;
    }, {})), E = n, O = {};
  }

  function C() {
    if (I && O && p.isPlainObject(O[I])) {
      var n = O[I],
          e = new s.a(Object.keys(E).concat(Object.keys(n)));
      return l(e).reduce(function (e, t) {
        return void 0 === n[t] ? e[t] = E[t] : void 0 !== E[t] && p.isPlainObject(n[t]) ? e[t] = Object(d.mergeDeep)({}, E[t], n[t]) : e[t] = n[t], e;
      }, {});
    }

    return f({}, E);
  }

  function x(o) {
    var t = Object.keys(o);
    T.filter(function (e) {
      return c()(t, e.topic);
    }).forEach(function (e) {
      var t, n, r;
      e.callback((t = {}, n = e.topic, r = o[e.topic], n in t ? Object.defineProperty(t, n, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[n] = r, t));
    }), T.filter(function (e) {
      return "*" === e.topic;
    }).forEach(function (e) {
      return e.callback(o);
    });
  }

  function _(e, t) {
    I = e;

    try {
      return t();
    } finally {
      I = null;
    }
  }
}, function (e, t, n) {
  "use strict";

  n.d(t, "a", function () {
    return r;
  }), t.b = o;
  var l = n(3);

  function p() {
    return (p = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  function g(e) {
    return (g = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(e);
  }

  var y = n(0),
      b = 4,
      r = o();

  function o() {
    var s = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 3e3,
        e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
        d = e.request,
        f = e.done;
    return function (e, t, n) {
      var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {};

      try {
        var o,
            i = r.method || (n ? "POST" : "GET"),
            a = document.createElement("a");
        a.href = e;
        var c = "object" === g(t) && null !== t ? t : {
          success: function success() {
            y.logMessage("xhr success");
          },
          error: function error(e) {
            y.logError("xhr error", null, e);
          }
        };

        if ("function" == typeof t && (c.success = t), (o = new window.XMLHttpRequest()).onreadystatechange = function () {
          if (o.readyState === b) {
            "function" == typeof f && f(a.origin);
            var e = o.status;
            200 <= e && e < 300 || 304 === e ? c.success(o.responseText, o) : c.error(o.statusText, o);
          }
        }, l.b.getConfig("disableAjaxTimeout") || (o.ontimeout = function () {
          y.logError("  xhr timeout after ", o.timeout, "ms");
        }), "GET" === i && n) {
          var u = y.parseUrl(e, r);
          p(u.search, n), e = y.buildUrl(u);
        }

        o.open(i, e, !0), l.b.getConfig("disableAjaxTimeout") || (o.timeout = s), r.withCredentials && (o.withCredentials = !0), y._each(r.customHeaders, function (e, t) {
          o.setRequestHeader(t, e);
        }), r.preflight && o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), o.setRequestHeader("Content-Type", r.contentType || "text/plain"), "function" == typeof d && d(a.origin), "POST" === i && n ? o.send(n) : o.send();
      } catch (e) {
        y.logError("xhr construction", e);
      }
    };
  }
}, function (e, t) {
  e.exports = {
    JSON_MAPPING: {
      PL_CODE: "code",
      PL_SIZE: "sizes",
      PL_BIDS: "bids",
      BD_BIDDER: "bidder",
      BD_ID: "paramsd",
      BD_PL_ID: "placementId",
      ADSERVER_TARGETING: "adserverTargeting",
      BD_SETTING_STANDARD: "standard"
    },
    DEBUG_MODE: "pbjs_debug",
    STATUS: {
      GOOD: 1,
      NO_BID: 2
    },
    CB: {
      TYPE: {
        ALL_BIDS_BACK: "allRequestedBidsBack",
        AD_UNIT_BIDS_BACK: "adUnitBidsBack",
        BID_WON: "bidWon",
        REQUEST_BIDS: "requestBids"
      }
    },
    EVENTS: {
      AUCTION_INIT: "auctionInit",
      AUCTION_END: "auctionEnd",
      BID_ADJUSTMENT: "bidAdjustment",
      BID_TIMEOUT: "bidTimeout",
      BID_REQUESTED: "bidRequested",
      BID_RESPONSE: "bidResponse",
      NO_BID: "noBid",
      BID_WON: "bidWon",
      BIDDER_DONE: "bidderDone",
      SET_TARGETING: "setTargeting",
      BEFORE_REQUEST_BIDS: "beforeRequestBids",
      REQUEST_BIDS: "requestBids",
      ADD_AD_UNITS: "addAdUnits",
      AD_RENDER_FAILED: "adRenderFailed"
    },
    AD_RENDER_FAILED_REASON: {
      PREVENT_WRITING_ON_MAIN_DOCUMENT: "preventWritingOnMainDocuemnt",
      NO_AD: "noAd",
      EXCEPTION: "exception",
      CANNOT_FIND_AD: "cannotFindAd",
      MISSING_DOC_OR_ADID: "missingDocOrAdid"
    },
    EVENT_ID_PATHS: {
      bidWon: "adUnitCode"
    },
    GRANULARITY_OPTIONS: {
      LOW: "low",
      MEDIUM: "medium",
      HIGH: "high",
      AUTO: "auto",
      DENSE: "dense",
      CUSTOM: "custom"
    },
    TARGETING_KEYS: {
      BIDDER: "hb_bidder",
      AD_ID: "hb_adid",
      PRICE_BUCKET: "hb_pb",
      SIZE: "hb_size",
      DEAL: "hb_deal",
      SOURCE: "hb_source",
      FORMAT: "hb_format",
      UUID: "hb_uuid",
      CACHE_ID: "hb_cache_id",
      CACHE_HOST: "hb_cache_host"
    },
    NATIVE_KEYS: {
      title: "hb_native_title",
      body: "hb_native_body",
      body2: "hb_native_body2",
      privacyLink: "hb_native_privacy",
      privacyIcon: "hb_native_privicon",
      sponsoredBy: "hb_native_brand",
      image: "hb_native_image",
      icon: "hb_native_icon",
      clickUrl: "hb_native_linkurl",
      displayUrl: "hb_native_displayurl",
      cta: "hb_native_cta",
      rating: "hb_native_rating",
      address: "hb_native_address",
      downloads: "hb_native_downloads",
      likes: "hb_native_likes",
      phone: "hb_native_phone",
      price: "hb_native_price",
      salePrice: "hb_native_saleprice"
    },
    S2S: {
      SRC: "s2s",
      DEFAULT_ENDPOINT: "https://prebid.adnxs.com/pbs/v1/openrtb2/auction",
      SYNCED_BIDDERS_KEY: "pbjsSyncs"
    },
    BID_STATUS: {
      BID_TARGETING_SET: "targetingSet",
      RENDERED: "rendered",
      BID_REJECTED: "bidRejected"
    },
    SUBMODULES_THAT_ALWAYS_REFRESH_ID: {
      parrableId: !0
    }
  };
},, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  }), n.d(t, "gdprDataHandler", function () {
    return R;
  }), n.d(t, "uspDataHandler", function () {
    return P;
  }), t.setS2STestingModule = function (e) {
    j = e;
  };
  var A = n(0),
      p = n(98),
      g = n(35),
      d = n(1),
      h = n(4),
      E = n(3),
      r = n(13),
      o = n(11),
      O = n.n(o),
      i = n(12),
      T = n.n(i),
      y = n(68),
      I = n(30);

  function m(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
      var n = [],
          r = !0,
          o = !1,
          i = void 0;

      try {
        for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0) {
          ;
        }
      } catch (e) {
        o = !0, i = e;
      } finally {
        try {
          r || null == c["return"] || c["return"]();
        } finally {
          if (o) throw i;
        }
      }

      return n;
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  }

  function b() {
    return (b = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  var j,
      w = n(0),
      C = n(5),
      x = n(8),
      f = {},
      _ = f.bidderRegistry = {},
      l = f.aliasRegistry = {},
      U = {};

  E.b.getConfig("s2sConfig", function (e) {
    U = e.s2sConfig;
  });
  var a = {};
  var B = Object(r.b)("sync", function (e) {
    var o = e.bidderCode,
        s = e.auctionId,
        d = e.bidderRequestId,
        t = e.adUnits,
        f = e.labels,
        l = e.src;
    return t.reduce(function (e, c) {
      var t = Object(p.b)(Object(p.a)(c, f), c.mediaTypes, c.sizes),
          n = t.active,
          u = t.mediaTypes,
          r = t.filterResults;
      return n ? r && w.logInfo('Size mapping filtered adUnit "'.concat(c.code, '" banner sizes from '), r.before, "to ", r.after) : w.logInfo('Size mapping disabled adUnit "'.concat(c.code, '"')), n && e.push(c.bids.filter(function (e) {
        return e.bidder === o;
      }).reduce(function (e, t) {
        var n = c.nativeParams || w.deepAccess(c, "mediaTypes.native");
        n && (t = b({}, t, {
          nativeParams: Object(g.g)(n)
        })), t = b({}, t, Object(A.getDefinedParams)(c, ["fpd", "mediaType", "renderer", "storedAuctionResponse"]));
        var r = Object(p.b)(Object(p.a)(t, f), u),
            o = r.active,
            i = r.mediaTypes,
            a = r.filterResults;
        return o ? a && w.logInfo('Size mapping filtered adUnit "'.concat(c.code, '" bidder "').concat(t.bidder, '" banner sizes from '), a.before, "to ", a.after) : w.logInfo('Size mapping deactivated adUnit "'.concat(c.code, '" bidder "').concat(t.bidder, '"')), w.isValidMediaTypes(i) ? t = b({}, t, {
          mediaTypes: i
        }) : w.logError("mediaTypes is not correctly configured for adunit ".concat(c.code)), o && e.push(b({}, t, {
          adUnitCode: c.code,
          transactionId: c.transactionId,
          sizes: w.deepAccess(i, "banner.sizes") || w.deepAccess(i, "video.playerSize") || [],
          bidId: t.bid_id || w.getUniqueIdentifierStr(),
          bidderRequestId: d,
          auctionId: s,
          src: l,
          bidRequestsCount: y.a.getRequestsCounter(c.code),
          bidderRequestsCount: y.a.getBidderRequestsCounter(c.code, t.bidder),
          bidderWinsCount: y.a.getBidderWinsCounter(c.code, t.bidder)
        })), e;
      }, [])), e;
    }, []).reduce(A.flatten, []).filter(function (e) {
      return "" !== e;
    });
  }, "getBids");
  var R = {
    consentData: null,
    setConsentData: function setConsentData(e) {
      R.consentData = e;
    },
    getConsentData: function getConsentData() {
      return R.consentData;
    }
  },
      P = {
    consentData: null,
    setConsentData: function setConsentData(e) {
      P.consentData = e;
    },
    getConsentData: function getConsentData() {
      return P.consentData;
    }
  };

  function k() {
    return U && U.enabled && U.testing && j;
  }

  function c(t, n, e) {
    try {
      var r = _[t].getSpec();

      r && r[n] && "function" == typeof r[n] && (w.logInfo("Invoking ".concat(t, ".").concat(n)), E.b.runWithBidder(t, A.bind.call(r[n], r, e)));
    } catch (e) {
      w.logWarn("Error calling ".concat(n, " of ").concat(t));
    }
  }

  f.makeBidRequests = Object(r.b)("sync", function (e, o, i, a, c) {
    x.emit(C.EVENTS.BEFORE_REQUEST_BIDS, e);
    var u = [],
        t = Object(A.getBidderCodes)(e);
    E.b.getConfig("bidderSequence") === E.a && (t = Object(A.shuffle)(t));
    var n,
        r,
        s,
        d,
        f = Object(I.b)(),
        l = t,
        p = [];

    if (U.enabled) {
      if (k()) {
        var g = j.getSourceBidderMap(e);
        p = g[j.CLIENT];
      }

      var y = U.bidders;
      l = t.filter(function (e) {
        return !O()(y, e) || O()(p, e);
      });
      Boolean(k() && U.testServerOnly) && (d = e, Boolean(T()(d, function (e) {
        return T()(e.bids, function (e) {
          return (e.bidSource || U.bidderControl && U.bidderControl[e.bidder]) && e.finalSource === j.SERVER;
        });
      }))) && (l.length = 0);
      var b = (n = e, r = U.bidders, (s = w.deepClone(n)).forEach(function (e) {
        e.bids = e.bids.filter(function (e) {
          return O()(r, e.bidder) && (!k() || e.finalSource !== j.CLIENT);
        }).map(function (e) {
          return e.bid_id = w.getUniqueIdentifierStr(), e;
        });
      }), s = s.filter(function (e) {
        return 0 !== e.bids.length;
      })),
          v = w.generateUUID();
      y.forEach(function (e) {
        var t = w.getUniqueIdentifierStr(),
            n = {
          bidderCode: e,
          auctionId: i,
          bidderRequestId: t,
          tid: v,
          bids: B({
            bidderCode: e,
            auctionId: i,
            bidderRequestId: t,
            adUnits: w.deepClone(b),
            labels: c,
            src: C.S2S.SRC
          }),
          auctionStart: o,
          timeout: U.timeout,
          src: C.S2S.SRC,
          refererInfo: f
        };
        0 !== n.bids.length && u.push(n);
      }), b.forEach(function (e) {
        var t = e.bids.filter(function (t) {
          return T()(u, function (e) {
            return T()(e.bids, function (e) {
              return e.bidId === t.bid_id;
            });
          });
        });
        e.bids = t;
      }), u.forEach(function (e) {
        e.adUnitsS2SCopy = b.filter(function (e) {
          return 0 < e.bids.length;
        });
      });
    }

    var h,
        m,
        S = (h = e, (m = w.deepClone(h)).forEach(function (e) {
      e.bids = e.bids.filter(function (e) {
        return !k() || e.finalSource !== j.SERVER;
      });
    }), m = m.filter(function (e) {
      return 0 !== e.bids.length;
    }));
    return l.forEach(function (e) {
      var t = w.getUniqueIdentifierStr(),
          n = {
        bidderCode: e,
        auctionId: i,
        bidderRequestId: t,
        bids: B({
          bidderCode: e,
          auctionId: i,
          bidderRequestId: t,
          adUnits: w.deepClone(S),
          labels: c,
          src: "client"
        }),
        auctionStart: o,
        timeout: a,
        refererInfo: f
      },
          r = _[e];
      r || w.logError("Trying to make a request for bidder that does not exist: ".concat(e)), r && n.bids && 0 !== n.bids.length && u.push(n);
    }), R.getConsentData() && u.forEach(function (e) {
      e.gdprConsent = R.getConsentData();
    }), P.getConsentData() && u.forEach(function (e) {
      e.uspConsent = P.getConsentData();
    }), u;
  }, "makeBidRequests"), f.callBids = function (e, t, o, i, a, c, u) {
    if (t.length) {
      var n = m(t.reduce(function (e, t) {
        return e[Number(void 0 !== t.src && t.src === C.S2S.SRC)].push(t), e;
      }, [[], []]), 2),
          r = n[0],
          s = n[1];

      if (s.length) {
        var d = Object(h.b)(c, a ? {
          request: a.request.bind(null, "s2s"),
          done: a.done
        } : void 0),
            f = U.bidders,
            l = _[U.adapter],
            p = s[0].tid,
            g = s[0].adUnitsS2SCopy;

        if (l) {
          var y = {
            tid: p,
            ad_units: g
          };

          if (y.ad_units.length) {
            var b = s.map(function (e) {
              return e.start = Object(A.timestamp)(), i.bind(e);
            }),
                v = y.ad_units.reduce(function (e, t) {
              return e.concat((t.bids || []).reduce(function (e, t) {
                return e.concat(t.bidder);
              }, []));
            }, []);
            w.logMessage("CALLING S2S HEADER BIDDERS ==== ".concat(f.filter(function (e) {
              return O()(v, e);
            }).join(","))), s.forEach(function (e) {
              x.emit(C.EVENTS.BID_REQUESTED, e);
            }), l.callBids(y, s, function (e, t) {
              var n = Object(A.getBidderRequest)(s, t.bidderCode, e);
              n && o.call(n, e, t);
            }, function () {
              return b.forEach(function (e) {
                return e();
              });
            }, d);
          }
        } else w.logError("missing " + U.adapter);
      }

      r.forEach(function (t) {
        t.start = Object(A.timestamp)();
        var e = _[t.bidderCode];
        w.logMessage("CALLING BIDDER ======= ".concat(t.bidderCode)), x.emit(C.EVENTS.BID_REQUESTED, t);
        var n = Object(h.b)(c, a ? {
          request: a.request.bind(null, t.bidderCode),
          done: a.done
        } : void 0),
            r = i.bind(t);

        try {
          E.b.runWithBidder(t.bidderCode, A.bind.call(e.callBids, e, t, o.bind(t), r, n, u, E.b.callbackWithBidder(t.bidderCode)));
        } catch (e) {
          w.logError("".concat(t.bidderCode, " Bid Adapter emitted an uncaught error when parsing their bidRequest"), {
            e: e,
            bidRequest: t
          }), r();
        }
      });
    } else w.logWarn("callBids executed with no bidRequests.  Were they filtered by labels or sizing?");
  }, f.videoAdapters = [], f.registerBidAdapter = function (e, t) {
    var n = (2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}).supportedMediaTypes,
        r = void 0 === n ? [] : n;
    e && t ? "function" == typeof e.callBids ? (_[t] = e, O()(r, "video") && f.videoAdapters.push(t), O()(r, "native") && g.e.push(t)) : w.logError("Bidder adaptor error for bidder code: " + t + "bidder must implement a callBids() function") : w.logError("bidAdaptor or bidderCode not specified");
  }, f.aliasBidAdapter = function (t, e) {
    var n, r;

    if (void 0 === _[e]) {
      var o = _[t];

      if (void 0 === o) {
        var i = E.b.getConfig("s2sConfig"),
            a = i && i.bidders;
        a && O()(a, e) ? l[e] = t : w.logError('bidderCode "' + t + '" is not an existing bidder.', "adapterManager.aliasBidAdapter");
      } else try {
        var c,
            u = (n = t, r = [], O()(f.videoAdapters, n) && r.push("video"), O()(g.e, n) && r.push("native"), r);
        if (o.constructor.prototype != Object.prototype) (c = new o.constructor()).setBidderCode(e);else {
          var s = o.getSpec();
          c = Object(d.newBidder)(b({}, s, {
            code: e
          })), l[e] = t;
        }
        f.registerBidAdapter(c, e, {
          supportedMediaTypes: u
        });
      } catch (e) {
        w.logError(t + " bidder does not currently support aliasing.", "adapterManager.aliasBidAdapter");
      }
    } else w.logMessage('alias name "' + e + '" has been already specified.');
  }, f.registerAnalyticsAdapter = function (e) {
    var t = e.adapter,
        n = e.code;
    t && n ? "function" == typeof t.enableAnalytics ? (t.code = n, a[n] = t) : w.logError('Prebid Error: Analytics adaptor error for analytics "'.concat(n, '"\n        analytics adapter must implement an enableAnalytics() function')) : w.logError("Prebid Error: analyticsAdapter or analyticsCode not specified");
  }, f.enableAnalytics = function (e) {
    w.isArray(e) || (e = [e]), w._each(e, function (e) {
      var t = a[e.provider];
      t ? t.enableAnalytics(e) : w.logError("Prebid Error: no analytics adapter found in registry for\n        ".concat(e.provider, "."));
    });
  }, f.getBidAdapter = function (e) {
    return _[e];
  }, f.callTimedOutBidders = function (t, n, r) {
    n = n.map(function (e) {
      return e.params = w.getUserConfiguredParams(t, e.adUnitCode, e.bidder), e.timeout = r, e;
    }), n = w.groupBy(n, "bidder"), Object.keys(n).forEach(function (e) {
      c(e, "onTimeout", n[e]);
    });
  }, f.callBidWonBidder = function (e, t, n) {
    t.params = w.getUserConfiguredParams(n, t.adUnitCode, t.bidder), y.a.incrementBidderWinsCounter(t.adUnitCode, t.bidder), c(e, "onBidWon", t);
  }, f.callSetTargetingBidder = function (e, t) {
    c(e, "onSetTargeting", t);
  }, t["default"] = f;
}, function (e, t, n) {
  function r() {
    return (r = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  var c,
      o,
      u = n(0),
      i = n(5),
      a = Array.prototype.slice,
      s = Array.prototype.push,
      d = u._map(i.EVENTS, function (e) {
    return e;
  }),
      f = i.EVENT_ID_PATHS,
      l = [];

  e.exports = (c = {}, (o = {}).on = function (e, t, n) {
    if (o = e, u.contains(d, o)) {
      var r = c[e] || {
        que: []
      };
      n ? (r[n] = r[n] || {
        que: []
      }, r[n].que.push(t)) : r.que.push(t), c[e] = r;
    } else u.logError("Wrong event name : " + e + " Valid event names :" + d);

    var o;
  }, o.emit = function (e) {
    !function (e, t) {
      u.logMessage("Emitting event for: " + e);

      var n = t[0] || {},
          r = n[f[e]],
          o = c[e] || {
        que: []
      },
          i = u._map(o, function (e, t) {
        return t;
      }),
          a = [];

      l.push({
        eventType: e,
        args: n,
        id: r
      }), r && u.contains(i, r) && s.apply(a, o[r].que), s.apply(a, o.que), u._each(a, function (e) {
        if (e) try {
          e.apply(null, t);
        } catch (e) {
          u.logError("Error executing handler:", "events.js", e);
        }
      });
    }(e, a.call(arguments, 1));
  }, o.off = function (e, n, r) {
    var o = c[e];
    u.isEmpty(o) || u.isEmpty(o.que) && u.isEmpty(o[r]) || r && (u.isEmpty(o[r]) || u.isEmpty(o[r].que)) || (r ? u._each(o[r].que, function (e) {
      var t = o[r].que;
      e === n && t.splice(t.indexOf(e), 1);
    }) : u._each(o.que, function (e) {
      var t = o.que;
      e === n && t.splice(t.indexOf(e), 1);
    }), c[e] = o);
  }, o.get = function () {
    return c;
  }, o.getEvents = function () {
    var n = [];
    return u._each(l, function (e) {
      var t = r({}, e);
      n.push(t);
    }), n;
  }, o);
}, function (e, t, n) {
  "use strict";

  n.d(t, "c", function () {
    return f;
  }), n.d(t, "d", function () {
    return l;
  }), t.a = function (e) {
    return i({
      moduleName: e,
      moduleType: "core"
    });
  }, t.b = function (e, t) {
    return i({
      gvlid: e,
      moduleName: t
    });
  };
  var r = n(13),
      c = n(0),
      o = n(11),
      u = n.n(o),
      d = ["core", "prebid-module"],
      f = [];

  function i(e) {
    var t = 0 < arguments.length && void 0 !== e ? e : {},
        o = t.gvlid,
        i = t.moduleName,
        a = t.moduleType;

    function s(n) {
      if (u()(d, a)) {
        return n({
          valid: !0
        });
      }

      var r;
      return l(o, i, {
        hasEnforcementHook: !1
      }, function (e) {
        if (e && e.hasEnforcementHook) r = n(e);else {
          var t = {
            hasEnforcementHook: !1,
            valid: c.hasDeviceAccess()
          };
          r = n(t);
        }
      }), r;
    }

    return {
      setCookie: function setCookie(o, i, a, c, u, t) {
        function n(e) {
          if (e && e.valid) {
            var t = u && "" !== u ? " ;domain=".concat(encodeURIComponent(u)) : "",
                n = a && "" !== a ? " ;expires=".concat(a) : "",
                r = null != c && "none" == c.toLowerCase() ? "; Secure" : "";
            document.cookie = "".concat(o, "=").concat(encodeURIComponent(i)).concat(n, "; path=/").concat(t).concat(c ? "; SameSite=".concat(c) : "").concat(r);
          }
        }

        if (!t || "function" != typeof t) return s(n);
        f.push(function () {
          var e = s(n);
          t(e);
        });
      },
      getCookie: function getCookie(n, t) {
        function r(e) {
          if (e && e.valid) {
            var t = window.document.cookie.match("(^|;)\\s*" + n + "\\s*=\\s*([^;]*)\\s*(;|$)");
            return t ? decodeURIComponent(t[2]) : null;
          }

          return null;
        }

        if (!t || "function" != typeof t) return s(r);
        f.push(function () {
          var e = s(r);
          t(e);
        });
      },
      localStorageIsEnabled: function localStorageIsEnabled(t) {
        function n(e) {
          if (e && e.valid) try {
            return localStorage.setItem("prebid.cookieTest", "1"), "1" === localStorage.getItem("prebid.cookieTest");
          } catch (e) {}
          return !1;
        }

        if (!t || "function" != typeof t) return s(n);
        f.push(function () {
          var e = s(n);
          t(e);
        });
      },
      cookiesAreEnabled: function cookiesAreEnabled(t) {
        function n(e) {
          return !(!e || !e.valid) && (!!c.checkCookieSupport() || (window.document.cookie = "prebid.cookieTest", -1 !== window.document.cookie.indexOf("prebid.cookieTest")));
        }

        if (!t || "function" != typeof t) return s(n);
        f.push(function () {
          var e = s(n);
          t(e);
        });
      },
      setDataInLocalStorage: function setDataInLocalStorage(t, n, r) {
        function o(e) {
          e && e.valid && window.localStorage.setItem(t, n);
        }

        if (!r || "function" != typeof r) return s(o);
        f.push(function () {
          var e = s(o);
          r(e);
        });
      },
      getDataFromLocalStorage: function getDataFromLocalStorage(t, n) {
        function r(e) {
          return e && e.valid ? window.localStorage.getItem(t) : null;
        }

        if (!n || "function" != typeof n) return s(r);
        f.push(function () {
          var e = s(r);
          n(e);
        });
      },
      removeDataFromLocalStorage: function removeDataFromLocalStorage(t, n) {
        function r(e) {
          e && e.valid && window.localStorage.removeItem(t);
        }

        if (!n || "function" != typeof n) return s(r);
        f.push(function () {
          var e = s(r);
          n(e);
        });
      },
      hasLocalStorage: function hasLocalStorage(t) {
        function n(e) {
          if (e && e.valid) try {
            return !!window.localStorage;
          } catch (e) {
            c.logError("Local storage api disabled");
          }
          return !1;
        }

        if (!t || "function" != typeof t) return s(n);
        f.push(function () {
          var e = s(n);
          t(e);
        });
      },
      findSimilarCookies: function findSimilarCookies(i, t) {
        function n(e) {
          if (e && e.valid) {
            var t = [];
            if (c.hasDeviceAccess()) for (var n = document.cookie.split(";"); n.length;) {
              var r = n.pop(),
                  o = r.indexOf("=");
              o = o < 0 ? r.length : o, 0 <= decodeURIComponent(r.slice(0, o).replace(/^\s+/, "")).indexOf(i) && t.push(decodeURIComponent(r.slice(o + 1)));
            }
            return t;
          }
        }

        if (!t || "function" != typeof t) return s(n);
        f.push(function () {
          var e = s(n);
          t(e);
        });
      }
    };
  }

  var l = Object(r.b)("async", function (e, t, n, r) {
    r(n);
  }, "validateStorageEnforcement");
}, function (e, t, n) {
  "use strict";

  t.a = o, t.c = function (e) {
    return !(!e || !e.url);
  }, t.b = function (e, t) {
    e.render(t);
  };
  var f = n(38),
      l = n(0),
      r = n(12),
      p = n.n(r),
      g = "outstream";

  function o(e) {
    var t,
        n,
        r,
        o = this,
        i = e.url,
        a = e.config,
        c = e.id,
        u = e.callback,
        s = e.loaded,
        d = e.adUnitCode;
    this.url = i, this.config = a, this.handlers = {}, this.id = c, this.loaded = s, this.cmd = [], this.push = function (e) {
      "function" == typeof e ? o.loaded ? e.call() : o.cmd.push(e) : l.logError("Commands given to Renderer.push must be wrapped in a function");
    }, this.callback = u || function () {
      o.loaded = !0, o.process();
    }, t = d, n = pbjs.adUnits, (r = p()(n, function (e) {
      return e.code === t;
    })) && r.renderer && r.renderer.url && r.renderer.render ? l.logWarn("External Js not loaded by Renderer since renderer url and callback is already defined on adUnit ".concat(d)) : Object(f.a)(i, g, this.callback);
  }

  o.install = function (e) {
    return new o({
      url: e.url,
      config: e.config,
      id: e.id,
      callback: e.callback,
      loaded: e.loaded,
      adUnitCode: e.adUnitCode
    });
  }, o.prototype.getConfig = function () {
    return this.config;
  }, o.prototype.setRender = function (e) {
    this.render = e;
  }, o.prototype.setEventHandlers = function (e) {
    this.handlers = e;
  }, o.prototype.handleVideoEvent = function (e) {
    var t = e.id,
        n = e.eventName;
    "function" == typeof this.handlers[n] && this.handlers[n](), l.logMessage("Prebid Renderer event for id ".concat(t, " type ").concat(n));
  }, o.prototype.process = function () {
    for (; 0 < this.cmd.length;) {
      try {
        this.cmd.shift().call();
      } catch (e) {
        l.logError("Error processing Renderer command: ", e);
      }
    }
  };
}, function (e, t, n) {
  var r = n(111);
  e.exports = r;
}, function (e, t, n) {
  var r = n(102);
  e.exports = r;
}, function (e, t, n) {
  "use strict";

  n.d(t, "b", function () {
    return i;
  }), n.d(t, "a", function () {
    return a;
  }), t.d = function (e, t) {
    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 15;
    0 === e.getHooks({
      hook: t
    }).length && e.before(t, n);
  }, t.c = function (e, n) {
    i("async", function (e) {
      e.forEach(function (e) {
        return n.apply(void 0, function (e) {
          if (Array.isArray(e)) {
            for (var t = 0, n = new Array(e.length); t < e.length; t++) {
              n[t] = e[t];
            }

            return n;
          }
        }(t = e) || function (e) {
          if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
        }(t) || function () {
          throw new TypeError("Invalid attempt to spread non-iterable instance");
        }());
        var t;
      });
    }, e)([]);
  }, t.e = function (e) {
    for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) {
      n[r - 1] = arguments[r];
    }

    a(e).before(function (e, t) {
      t.push(n), e(t);
    });
  };
  var r = n(181),
      o = n.n(r);
  var i = o()({
    ready: o.a.SYNC | o.a.ASYNC | o.a.QUEUE
  }),
      a = i.get;
}, function (e, t, n) {
  "use strict";

  function v(r) {
    function e(e, t, n) {
      if (this instanceof r) {
        switch (arguments.length) {
          case 0:
            return new r();

          case 1:
            return new r(e);

          case 2:
            return new r(e, t);
        }

        return new r(e, t, n);
      }

      return r.apply(this, arguments);
    }

    return e.prototype = r.prototype, e;
  }

  var h = n(22),
      m = n(104).f,
      S = n(106),
      A = n(41),
      E = n(21),
      O = n(28),
      T = n(24);

  e.exports = function (e, t) {
    var n,
        r,
        o,
        i,
        a,
        c,
        u,
        s,
        d = e.target,
        f = e.global,
        l = e.stat,
        p = e.proto,
        g = f ? h : l ? h[d] : (h[d] || {}).prototype,
        y = f ? A : A[d] || (A[d] = {}),
        b = y.prototype;

    for (o in t) {
      n = !S(f ? o : d + (l ? "." : "#") + o, e.forced) && g && T(g, o), a = y[o], n && (c = e.noTargetGet ? (s = m(g, o)) && s.value : g[o]), i = n && c ? c : t[o], n && _typeof(a) == _typeof(i) || (u = e.bind && n ? E(i, h) : e.wrap && n ? v(i) : p && "function" == typeof i ? E(Function.call, i) : i, (e.sham || i && i.sham || a && a.sham) && O(u, "sham", !0), y[o] = u, p && (T(A, r = d + "Prototype") || O(A, r, {}), A[r][o] = i, e.real && b && !b[o] && O(b, o, i)));
    }
  };
}, function (e, t, n) {
  var r = n(23);

  e.exports = function (e) {
    if (!r(e)) throw TypeError(String(e) + " is not an object");
    return e;
  };
}, function (e, t) {
  e.exports = !0;
}, function (e, t, n) {
  function p(e, t) {
    this.stopped = e, this.result = t;
  }

  var g = n(15),
      y = n(82),
      b = n(49),
      v = n(21),
      h = n(60),
      m = n(83);

  (e.exports = function (e, t, n, r, o) {
    var i,
        a,
        c,
        u,
        s,
        d,
        f,
        l = v(t, n, r ? 2 : 1);
    if (o) i = e;else {
      if ("function" != typeof (a = h(e))) throw TypeError("Target is not iterable");

      if (y(a)) {
        for (c = 0, u = b(e.length); c < u; c++) {
          if ((s = r ? l(g(f = e[c])[0], f[1]) : l(e[c])) && s instanceof p) return s;
        }

        return new p(!1);
      }

      i = a.call(e);
    }

    for (d = i.next; !(f = d.call(i)).done;) {
      if ("object" == _typeof(s = m(i, l, f.value, r)) && s && s instanceof p) return s;
    }

    return new p(!1);
  }).stop = function (e) {
    return new p(!0, e);
  };
}, function (e, t) {
  e.exports = function (e) {
    if ("function" != typeof e) throw TypeError(String(e) + " is not a function");
    return e;
  };
}, function (e, t, n) {
  var r = n(22),
      o = n(76),
      i = n(24),
      a = n(58),
      c = n(78),
      u = n(110),
      s = o("wks"),
      d = r.Symbol,
      f = u ? d : d && d.withoutSetter || a;

  e.exports = function (e) {
    return i(s, e) || (c && i(d, e) ? s[e] = d[e] : s[e] = f("Symbol." + e)), s[e];
  };
}, function (e, t, n) {
  "use strict";

  t.a = function () {
    return window.pbjs;
  }, window.pbjs = window.pbjs || {}, window.pbjs.cmd = window.pbjs.cmd || [], window.pbjs.que = window.pbjs.que || [], window._pbjsGlobals = window._pbjsGlobals || [], window._pbjsGlobals.push("pbjs");
}, function (e, t, n) {
  var i = n(18);

  e.exports = function (r, o, e) {
    if (i(r), void 0 === o) return r;

    switch (e) {
      case 0:
        return function () {
          return r.call(o);
        };

      case 1:
        return function (e) {
          return r.call(o, e);
        };

      case 2:
        return function (e, t) {
          return r.call(o, e, t);
        };

      case 3:
        return function (e, t, n) {
          return r.call(o, e, t, n);
        };
    }

    return function () {
      return r.apply(o, arguments);
    };
  };
}, function (n, e, t) {
  (function (e) {
    function t(e) {
      return e && e.Math == Math && e;
    }

    n.exports = t("object" == (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) && globalThis) || t("object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window) || t("object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self) || t("object" == _typeof(e) && e) || Function("return this")();
  }).call(e, t(33));
}, function (e, t) {
  e.exports = function (e) {
    return "object" == _typeof(e) ? null !== e : "function" == typeof e;
  };
}, function (e, t) {
  var n = {}.hasOwnProperty;

  e.exports = function (e, t) {
    return n.call(e, t);
  };
}, function (e, t, n) {
  function r(e) {
    return "function" == typeof e ? e : void 0;
  }

  var o = n(41),
      i = n(22);

  e.exports = function (e, t) {
    return arguments.length < 2 ? r(o[e]) || r(i[e]) : o[e] && o[e][t] || i[e] && i[e][t];
  };
}, function (e, t, n) {
  var r = n(27);
  e.exports = !r(function () {
    return 7 != Object.defineProperty({}, 1, {
      get: function get() {
        return 7;
      }
    })[1];
  });
}, function (e, t) {
  e.exports = function (e) {
    try {
      return !!e();
    } catch (e) {
      return !0;
    }
  };
}, function (e, t, n) {
  var r = n(26),
      o = n(29),
      i = n(45);
  e.exports = r ? function (e, t, n) {
    return o.f(e, t, i(1, n));
  } : function (e, t, n) {
    return e[t] = n, e;
  };
}, function (e, t, n) {
  var r = n(26),
      o = n(74),
      i = n(15),
      a = n(54),
      c = Object.defineProperty;
  t.f = r ? c : function (e, t, n) {
    if (i(e), t = a(t, !0), i(n), o) try {
      return c(e, t, n);
    } catch (e) {}
    if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
    return "value" in n && (e[t] = n.value), e;
  };
}, function (e, t, n) {
  "use strict";

  t.a = r, n.d(t, "b", function () {
    return o;
  });
  var c = n(0);

  function u() {
    return (u = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  function r(o) {
    function i() {
      var e = function () {
        var t,
            n = [];

        do {
          try {
            t = t ? t.parent : o;

            try {
              var e = t == o.top,
                  r = {
                referrer: t.document.referrer || null,
                location: t.location.href || null,
                isTop: e
              };
              e && (r = u(r, {
                canonicalUrl: a(t.document)
              })), n.push(r);
            } catch (e) {
              n.push({
                referrer: null,
                location: null,
                isTop: t == o.top
              }), Object(c.logWarn)("Trying to access cross domain iframe. Continuing without referrer and location");
            }
          } catch (e) {
            return n.push({
              referrer: null,
              location: null,
              isTop: !1
            }), n;
          }
        } while (t != o.top);

        return n;
      }(),
          t = function () {
        try {
          if (!o.location.ancestorOrigins) return;
          return o.location.ancestorOrigins;
        } catch (e) {}
      }();

      if (t) for (var n = 0, r = t.length; n < r; n++) {
        e[n].ancestor = t[n];
      }
      return e;
    }

    function a(e) {
      try {
        var t = e.querySelector("link[rel='canonical']");
        if (null !== t) return t.href;
      } catch (e) {}

      return null;
    }

    return function () {
      try {
        var e,
            t = i(),
            n = t.length - 1,
            r = null !== t[n].location || 0 < n && null !== t[n - 1].referrer,
            o = function (e) {
          var t,
              n = [],
              r = null,
              o = null,
              i = null,
              a = null,
              c = null;

          for (t = e.length - 1; 0 <= t; t--) {
            try {
              r = e[t].location;
            } catch (e) {}

            if (r) n.push(r), c = c || r;else if (0 !== t) {
              o = e[t - 1];

              try {
                i = o.referrer, a = o.ancestor;
              } catch (e) {}

              i ? (n.push(i), c = c || i) : a ? (n.push(a), c = c || a) : n.push(null);
            } else n.push(null);
          }

          return {
            stack: n,
            detectedRefererUrl: c
          };
        }(t);

        return t[t.length - 1].canonicalUrl && (e = t[t.length - 1].canonicalUrl), {
          referer: o.detectedRefererUrl,
          reachedTop: r,
          numIframes: n,
          stack: o.stack,
          canonicalUrl: e
        };
      } catch (e) {}
    };
  }

  var o = r(window);
}, function (e, t, n) {
  "use strict";

  t.a = function (e, t) {
    return new r(e, t);
  };

  var o = n(0);

  function r(e, t) {
    var n = t && t.src || "client",
        r = e || 0;
    this.bidderCode = t && t.bidder || "", this.width = 0, this.height = 0, this.statusMessage = function () {
      switch (r) {
        case 0:
          return "Pending";

        case 1:
          return "Bid available";

        case 2:
          return "Bid returned empty or error response";

        case 3:
          return "Bid timed out";
      }
    }(), this.adId = o.getUniqueIdentifierStr(), this.requestId = t && t.bidId, this.mediaType = "banner", this.source = n, this.getStatusCode = function () {
      return r;
    }, this.getSize = function () {
      return this.width + "x" + this.height;
    };
  }
}, function (e, t, n) {
  "use strict";

  n.d(t, "a", function () {
    return u;
  });
  var r = n(0),
      s = n(39),
      o = n(12),
      i = n.n(o),
      a = n(5);
  var d,
      c,
      u = (d = [], (c = {}).addWinningBid = function (t) {
    var e = i()(d, function (e) {
      return e.getAuctionId() === t.auctionId;
    });
    e ? (t.status = a.BID_STATUS.RENDERED, e.addWinningBid(t)) : Object(r.logWarn)("Auction not found when adding winning bid");
  }, c.getAllWinningBids = function () {
    return d.map(function (e) {
      return e.getWinningBids();
    }).reduce(r.flatten, []);
  }, c.getBidsRequested = function () {
    return d.map(function (e) {
      return e.getBidRequests();
    }).reduce(r.flatten, []);
  }, c.getNoBids = function () {
    return d.map(function (e) {
      return e.getNoBids();
    }).reduce(r.flatten, []);
  }, c.getBidsReceived = function () {
    return d.map(function (e) {
      if (e.getAuctionStatus() === s.a) return e.getBidsReceived();
    }).reduce(r.flatten, []).filter(function (e) {
      return e;
    });
  }, c.getAdUnits = function () {
    return d.map(function (e) {
      return e.getAdUnits();
    }).reduce(r.flatten, []);
  }, c.getAdUnitCodes = function () {
    return d.map(function (e) {
      return e.getAdUnitCodes();
    }).reduce(r.flatten, []).filter(r.uniques);
  }, c.createAuction = function (e) {
    var t,
        n = e.adUnits,
        r = e.adUnitCodes,
        o = e.callback,
        i = e.cbTimeout,
        a = e.labels,
        c = e.auctionId,
        u = Object(s.k)({
      adUnits: n,
      adUnitCodes: r,
      callback: o,
      cbTimeout: i,
      labels: a,
      auctionId: c
    });
    return t = u, d.push(t), u;
  }, c.findBidByAdId = function (t) {
    return i()(d.map(function (e) {
      return e.getBidsReceived();
    }).reduce(r.flatten, []), function (e) {
      return e.adId === t;
    });
  }, c.getStandardBidderAdServerTargeting = function () {
    return Object(s.j)()[a.JSON_MAPPING.ADSERVER_TARGETING];
  }, c.setStatusForBids = function (e, t) {
    var n = c.findBidByAdId(e);

    if (n && (n.status = t), n && t === a.BID_STATUS.BID_TARGETING_SET) {
      var r = i()(d, function (e) {
        return e.getAuctionId() === n.auctionId;
      });
      r && r.setBidTargeting(n);
    }
  }, c.getLastAuctionId = function () {
    return d.length && d[d.length - 1].getAuctionId();
  }, c);
}, function (wA, xA) {
  var yA;

  yA = function () {
    return this;
  }();

  try {
    yA = yA || Function("return this")() || eval("this");
  } catch (e) {
    "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (yA = window);
  }

  wA.exports = yA;
}, function (e, t, n) {
  var r = n(16),
      o = n(91);
  e.exports = r ? o : function (e) {
    return Set.prototype.values.call(e);
  };
}, function (e, t, n) {
  "use strict";

  n.d(t, "e", function () {
    return i;
  }), n.d(t, "a", function () {
    return s;
  }), t.g = function (e) {
    if (e && e.type && function (e) {
      return e && c()(Object.keys(d), e) || (Object(a.logError)("".concat(e, " nativeParam is not supported")), !1);
    }(e.type)) return d[e.type];
    return e;
  }, t.f = function (t, e) {
    var n = Object(a.getBidRequest)(t.requestId, e);
    if (!n) return !1;
    if (!Object(a.deepAccess)(t, "native.clickUrl")) return !1;
    if (Object(a.deepAccess)(t, "native.image") && (!Object(a.deepAccess)(t, "native.image.height") || !Object(a.deepAccess)(t, "native.image.width"))) return !1;
    if (Object(a.deepAccess)(t, "native.icon") && (!Object(a.deepAccess)(t, "native.icon.height") || !Object(a.deepAccess)(t, "native.icon.width"))) return !1;
    var r = n.nativeParams;
    if (!r) return !0;
    var o = Object.keys(r).filter(function (e) {
      return r[e].required;
    }),
        i = Object.keys(t["native"]).filter(function (e) {
      return t["native"][e];
    });
    return o.every(function (e) {
      return c()(i, e);
    });
  }, t.b = function (e, t) {
    var n;
    "click" === e.action ? n = t["native"] && t["native"].clickTrackers : (n = t["native"] && t["native"].impressionTrackers, t["native"] && t["native"].javascriptTrackers && Object(a.insertHtmlIntoIframe)(t["native"].javascriptTrackers));
    return (n || []).forEach(a.triggerPixel), e.action;
  }, t.d = function (r, o) {
    var i = {};
    return Object.keys(r["native"]).forEach(function (e) {
      var t = u.NATIVE_KEYS[e],
          n = f(r["native"][e]);
      Object(a.deepAccess)(o, "mediaTypes.native.".concat(e, ".sendId")) && (n = "".concat(t, ":").concat(r.adId));
      t && n && (i[t] = n);
    }), i;
  }, t.c = function (e, r) {
    var o = {
      message: "assetResponse",
      adId: e.adId,
      assets: []
    };
    return e.assets.forEach(function (e) {
      var t = Object(a.getKeyByValue)(u.NATIVE_KEYS, e),
          n = f(r["native"][t]);
      o.assets.push({
        key: t,
        value: n
      });
    }), o;
  };
  var a = n(0),
      r = n(11),
      c = n.n(r);

  function o(e) {
    return (o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(e);
  }

  var u = n(5),
      i = [],
      s = Object.keys(u.NATIVE_KEYS).map(function (e) {
    return u.NATIVE_KEYS[e];
  }),
      d = {
    image: {
      image: {
        required: !0
      },
      title: {
        required: !0
      },
      sponsoredBy: {
        required: !0
      },
      clickUrl: {
        required: !0
      },
      body: {
        required: !1
      },
      icon: {
        required: !1
      }
    }
  };

  function f(e) {
    return "object" === o(e) && e.url ? e.url : e;
  }
}, function (e, t) {
  e.exports = {};
}, function (e, t, n) {
  var o = n(15),
      i = n(18),
      a = n(19)("species");

  e.exports = function (e, t) {
    var n,
        r = o(e).constructor;
    return void 0 === r || null == (n = o(r)[a]) ? t : i(n);
  };
}, function (e, t, n) {
  "use strict";

  t.a = function (r, e, t) {
    if (!e || !r) return void i.logError("cannot load external script without url and moduleCode");
    if (!o()(c, e)) return void i.logError("".concat(e, " not whitelisted for loading external JavaScript"));
    if (a[r]) return t && "function" == typeof t && (a[r].loaded ? t() : a[r].callbacks.push(t)), a[r].tag;
    a[r] = {
      loaded: !1,
      tag: null,
      callbacks: []
    }, t && "function" == typeof t && a[r].callbacks.push(t);
    return i.logWarn("module ".concat(e, " is loading external JavaScript")), function (e, t) {
      var n = document.createElement("script");
      n.type = "text/javascript", n.async = !0, (a[r].tag = n).readyState ? n.onreadystatechange = function () {
        "loaded" !== n.readyState && "complete" !== n.readyState || (n.onreadystatechange = null, t());
      } : n.onload = function () {
        t();
      };
      return n.src = e, i.insertElement(n), n;
    }(r, function () {
      a[r].loaded = !0;

      try {
        for (var e = 0; e < a[r].callbacks.length; e++) {
          a[r].callbacks[e]();
        }
      } catch (e) {
        i.logError("Error executing callback", "adloader.js:loadExternalScript", e);
      }
    });
  };

  var r = n(11),
      o = n.n(r),
      i = n(0),
      a = {},
      c = ["criteo", "outstream", "adagio", "browsi"];
}, function (e, t, n) {
  "use strict";

  n.d(t, "b", function () {
    return F;
  }), n.d(t, "a", function () {
    return W;
  }), t.k = function (e) {
    var t,
        n,
        y,
        b,
        i = e.adUnits,
        r = e.adUnitCodes,
        o = e.callback,
        a = e.cbTimeout,
        c = e.labels,
        u = e.auctionId,
        v = i,
        s = c,
        d = r,
        h = [],
        f = [],
        l = [],
        p = u || D.generateUUID(),
        g = o,
        m = a,
        S = [],
        A = new Set();

    function E() {
      return {
        auctionId: p,
        timestamp: t,
        auctionEnd: n,
        auctionStatus: y,
        adUnits: v,
        adUnitCodes: d,
        labels: s,
        bidderRequests: h,
        noBids: l,
        bidsReceived: f,
        winningBids: S,
        timeout: m
      };
    }

    function O(r, e) {
      if (e && clearTimeout(b), void 0 === n) {
        var o = [];
        r && (D.logMessage("Auction ".concat(p, " timedOut")), t = A, (o = h.map(function (e) {
          return (e.bids || []).filter(function (e) {
            return !t.has(e.bidder);
          });
        }).reduce(w.flatten, []).map(function (e) {
          return {
            bidId: e.bidId,
            bidder: e.bidder,
            adUnitCode: e.adUnitCode,
            auctionId: e.auctionId
          };
        })).length && M.emit(q.EVENTS.BID_TIMEOUT, o)), y = W, n = Date.now(), M.emit(q.EVENTS.AUCTION_END, E()), Y(v, function () {
          try {
            if (null != g) {
              var e = d,
                  t = f.filter(D.bind.call(w.adUnitsFilter, this, e)).reduce(Z, {});
              g.apply(pbjs, [t, r, p]), g = null;
            }
          } catch (e) {
            D.logError("Error executing bidsBackHandler", null, e);
          } finally {
            o.length && N.callTimedOutBidders(i, o, m);
            var n = _.b.getConfig("userSync") || {};
            n.enableOverride || k(n.syncDelay);
          }
        });
      }

      var t;
    }

    function T() {
      D.logInfo("Bids Received for Auction with id: ".concat(p), f), y = W, O(!1, !0);
    }

    function I(e) {
      A.add(e);
    }

    function j(d) {
      var f = this;
      d.forEach(function (e) {
        var t;
        t = e, h = h.concat(t);
      });
      var l = {},
          e = {
        bidRequests: d,
        run: function run() {
          var e, t;
          e = O.bind(null, !0), t = setTimeout(e, m), b = t, y = F, M.emit(q.EVENTS.AUCTION_INIT, E());
          var n,
              r,
              o,
              i,
              a,
              c,
              u = (n = T, r = f, o = 0, i = !1, a = new Set(), c = {}, {
            addBidResponse: function addBidResponse(e, t) {
              c[t.requestId] = !0, o++;

              var n = function (e) {
                var t = e.adUnitCode,
                    n = e.bid,
                    r = e.bidderRequest,
                    o = e.auctionId,
                    i = r.start,
                    a = P({}, n, {
                  auctionId: o,
                  responseTimestamp: Object(w.timestamp)(),
                  requestTimestamp: i,
                  cpm: parseFloat(n.cpm) || 0,
                  bidder: n.bidderCode,
                  adUnitCode: t
                });
                a.timeToRespond = a.responseTimestamp - a.requestTimestamp, M.emit(q.EVENTS.BID_ADJUSTMENT, a);
                var c = r.bids && U()(r.bids, function (e) {
                  return e.adUnitCode == t;
                }),
                    u = c && c.renderer;
                u && u.url && (a.renderer = x.a.install({
                  url: u.url
                }), a.renderer.setRender(u.render));
                var s = X(n.mediaType, c, _.b.getConfig("mediaTypePriceGranularity")),
                    d = Object(C.a)(a.cpm, "object" === R(s) ? s : _.b.getConfig("customPriceBucket"), _.b.getConfig("currency.granularityMultiplier"));
                return a.pbLg = d.low, a.pbMg = d.med, a.pbHg = d.high, a.pbAg = d.auto, a.pbDg = d.dense, a.pbCg = d.custom, a;
              }({
                adUnitCode: e,
                bid: t,
                bidderRequest: this,
                auctionId: r.getAuctionId()
              });

              "video" === n.mediaType ? function (e, t, n, r) {
                var o = !0,
                    i = Object(w.getBidRequest)(t.requestId, [n]),
                    a = i && Object(w.deepAccess)(i, "mediaTypes.video"),
                    c = a && Object(w.deepAccess)(a, "context");
                _.b.getConfig("cache.url") && c !== B.b && (t.videoCacheKey ? t.vastUrl || (D.logError("videoCacheKey specified but not required vastUrl for video bid"), o = !1) : (o = !1, Q(e, t, r, i))), o && ($(e, t), r());
              }(r, n, this, s) : ($(r, n), s());
            },
            adapterDone: function adapterDone() {
              a.add(this), i = r.getBidRequests().every(function (e) {
                return a.has(e);
              }), this.bids.forEach(function (e) {
                c[e.bidId] || (r.addNoBid(e), M.emit(q.EVENTS.NO_BID, e));
              }), i && 0 === o && n();
            }
          });

          function s() {
            o--, i && 0 === o && n();
          }

          N.callBids(v, d, function () {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
              t[n] = arguments[n];
            }

            K.apply({
              dispatch: u.addBidResponse,
              bidderRequest: this
            }, t);
          }, u.adapterDone, {
            request: function request(e, t) {
              g(z, t), g(l, e), V[e] || (V[e] = {
                SRA: !0,
                origin: t
              }), 1 < l[e] && (V[e].SRA = !1);
            },
            done: function done(e) {
              z[e]--, H[0] && p(H[0]) && H.shift();
            }
          }, m, I);
        }
      };

      function p(e) {
        var r = !0,
            o = _.b.getConfig("maxRequestsPerOrigin") || L;
        return e.bidRequests.some(function (e) {
          var t = 1,
              n = void 0 !== e.src && e.src === q.S2S.SRC ? "s2s" : e.bidderCode;
          return V[n] && (!1 === V[n].SRA && (t = Math.min(e.bids.length, o)), z[V[n].origin] + t > o && (r = !1)), !r;
        }), r && e.run(), r;
      }

      function g(e, t) {
        void 0 === e[t] ? e[t] = 1 : e[t]++;
      }

      p(e) || (D.logWarn("queueing auction due to limited endpoint capacity"), H.push(e));
    }

    return {
      addBidReceived: function addBidReceived(e) {
        f = f.concat(e);
      },
      addNoBid: function addNoBid(e) {
        l = l.concat(e);
      },
      executeCallback: O,
      callBids: function callBids() {
        y = G, t = Date.now();
        var e = N.makeBidRequests(v, t, p, m, s);
        D.logInfo("Bids Requested for Auction with id: ".concat(p), e), e.length < 1 ? (D.logWarn("No valid bid requests returned for auction"), T()) : J.call({
          dispatch: j,
          context: this
        }, e);
      },
      addWinningBid: function addWinningBid(e) {
        S = S.concat(e), N.callBidWonBidder(e.bidder, e, i);
      },
      setBidTargeting: function setBidTargeting(e) {
        N.callSetTargetingBidder(e.bidder, e);
      },
      getWinningBids: function getWinningBids() {
        return S;
      },
      getTimeout: function getTimeout() {
        return m;
      },
      getAuctionId: function getAuctionId() {
        return p;
      },
      getAuctionStatus: function getAuctionStatus() {
        return y;
      },
      getAdUnits: function getAdUnits() {
        return v;
      },
      getAdUnitCodes: function getAdUnitCodes() {
        return d;
      },
      getBidRequests: function getBidRequests() {
        return h;
      },
      getBidsReceived: function getBidsReceived() {
        return f;
      },
      getNoBids: function getNoBids() {
        return l;
      }
    };
  }, n.d(t, "c", function () {
    return K;
  }), n.d(t, "e", function () {
    return J;
  }), t.g = s, t.d = $, n.d(t, "f", function () {
    return Q;
  }), n.d(t, "i", function () {
    return d;
  }), n.d(t, "h", function () {
    return f;
  }), t.j = l;

  var w = n(0),
      C = n(44),
      a = n(35),
      i = n(99),
      x = n(10),
      _ = n(3),
      r = n(42),
      o = n(13),
      c = n(12),
      U = n.n(c),
      B = n(43),
      u = n(2);

  function R(e) {
    return (R = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(e);
  }

  function P() {
    return (P = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  var k = r.a.syncUsers,
      D = n(0),
      N = n(7)["default"],
      M = n(8),
      q = n(5),
      G = "started",
      F = "inProgress",
      W = "completed";
  M.on(q.EVENTS.BID_ADJUSTMENT, function (e) {
    !function (e) {
      var t,
          n = e.bidderCode,
          r = e.cpm;
      if (pbjs.bidderSettings && (n && pbjs.bidderSettings[n] && "function" == typeof pbjs.bidderSettings[n].bidCpmAdjustment ? t = pbjs.bidderSettings[n].bidCpmAdjustment : pbjs.bidderSettings[q.JSON_MAPPING.BD_SETTING_STANDARD] && "function" == typeof pbjs.bidderSettings[q.JSON_MAPPING.BD_SETTING_STANDARD].bidCpmAdjustment && (t = pbjs.bidderSettings[q.JSON_MAPPING.BD_SETTING_STANDARD].bidCpmAdjustment), t)) try {
        r = t(e.cpm, P({}, e));
      } catch (e) {
        D.logError("Error during bid adjustment", "bidmanager.js", e);
      }
      0 <= r && (e.cpm = r);
    }(e);
  });
  var L = 4,
      z = {},
      V = {},
      H = [];
  var K = Object(o.b)("async", function (e, t) {
    this.dispatch.call(this.bidderRequest, e, t);
  }, "addBidResponse"),
      J = Object(o.b)("sync", function (e) {
    this.dispatch.call(this.context, e);
  }, "addBidderRequests"),
      Y = Object(o.b)("async", function (e, t) {
    t && t();
  }, "bidsBackCallback");

  function s(e, t) {
    t.timeToRespond > e.getTimeout() + _.b.getConfig("timeoutBuffer") && e.executeCallback(!0);
  }

  function $(e, t) {
    var n = e.getBidRequests(),
        r = U()(n, function (e) {
      return e.bidderCode === t.bidderCode;
    });
    !function (t, e) {
      var n;

      if (t.bidderCode && (0 < t.cpm || t.dealId)) {
        var r = U()(e.bids, function (e) {
          return e.adUnitCode === t.adUnitCode;
        });

        n = function (e, t, n) {
          if (!t) return {};
          var r = {},
              o = pbjs.bidderSettings;

          if (o) {
            var i = l(t.mediaType, e, n);
            p(r, i, t), e && o[e] && o[e][q.JSON_MAPPING.ADSERVER_TARGETING] && (p(r, o[e], t), t.sendStandardTargeting = o[e].sendStandardTargeting);
          }

          t["native"] && (r = P({}, r, Object(a.d)(t, n)));
          return r;
        }(t.bidderCode, t, r);
      }

      t.adserverTargeting = P(t.adserverTargeting || {}, n);
    }(t, r), M.emit(q.EVENTS.BID_RESPONSE, t), e.addBidReceived(t), s(e, t);
  }

  var Q = Object(o.b)("async", function (n, r, o, e) {
    Object(i.b)([r], function (e, t) {
      e ? (D.logWarn("Failed to save to the video cache: ".concat(e, ". Video bid must be discarded.")), s(n, r)) : "" === t[0].uuid ? (D.logWarn("Supplied video cache key was already in use by Prebid Cache; caching attempt was rejected. Video bid must be discarded."), s(n, r)) : (r.videoCacheKey = t[0].uuid, r.vastUrl || (r.vastUrl = Object(i.a)(r.videoCacheKey)), $(n, r), o());
    });
  }, "callPrebidCache");

  function X(e, t, n) {
    if (e && n) {
      if (e === u.d) {
        var r = Object(w.deepAccess)(t, "mediaTypes.".concat(u.d, ".context"), "instream");
        if (n["".concat(u.d, "-").concat(r)]) return n["".concat(u.d, "-").concat(r)];
      }

      return n[e];
    }
  }

  var d = function d(e, t) {
    var n = X(e, t, _.b.getConfig("mediaTypePriceGranularity"));
    return "string" == typeof e && n ? "string" == typeof n ? n : "custom" : _.b.getConfig("priceGranularity");
  },
      f = function f(t) {
    return function (e) {
      return t === q.GRANULARITY_OPTIONS.AUTO ? e.pbAg : t === q.GRANULARITY_OPTIONS.DENSE ? e.pbDg : t === q.GRANULARITY_OPTIONS.LOW ? e.pbLg : t === q.GRANULARITY_OPTIONS.MEDIUM ? e.pbMg : t === q.GRANULARITY_OPTIONS.HIGH ? e.pbHg : t === q.GRANULARITY_OPTIONS.CUSTOM ? e.pbCg : void 0;
    };
  };

  function l(e, t, n) {
    function r(e, t) {
      return {
        key: e,
        val: "function" == typeof t ? function (e) {
          return t(e);
        } : function (e) {
          return Object(w.getValue)(e, t);
        }
      };
    }

    var o = q.TARGETING_KEYS,
        i = d(e, n),
        a = pbjs.bidderSettings;

    if (a[q.JSON_MAPPING.BD_SETTING_STANDARD] || (a[q.JSON_MAPPING.BD_SETTING_STANDARD] = {}), a[q.JSON_MAPPING.BD_SETTING_STANDARD][q.JSON_MAPPING.ADSERVER_TARGETING] || (a[q.JSON_MAPPING.BD_SETTING_STANDARD][q.JSON_MAPPING.ADSERVER_TARGETING] = [r(o.BIDDER, "bidderCode"), r(o.AD_ID, "adId"), r(o.PRICE_BUCKET, f(i)), r(o.SIZE, "size"), r(o.DEAL, "dealId"), r(o.SOURCE, "source"), r(o.FORMAT, "mediaType")]), "video" === e) {
      var c = a[q.JSON_MAPPING.BD_SETTING_STANDARD][q.JSON_MAPPING.ADSERVER_TARGETING];

      if ([o.UUID, o.CACHE_ID].forEach(function (t) {
        void 0 === U()(c, function (e) {
          return e.key === t;
        }) && c.push(r(t, "videoCacheKey"));
      }), _.b.getConfig("cache.url") && (!t || !1 !== D.deepAccess(a, "".concat(t, ".sendStandardTargeting")))) {
        var u = Object(w.parseUrl)(_.b.getConfig("cache.url"));
        void 0 === U()(c, function (e) {
          return e.key === o.CACHE_HOST;
        }) && c.push(r(o.CACHE_HOST, function (e) {
          return D.deepAccess(e, "adserverTargeting.".concat(o.CACHE_HOST)) ? e.adserverTargeting[o.CACHE_HOST] : u.hostname;
        }));
      }
    }

    return a[q.JSON_MAPPING.BD_SETTING_STANDARD];
  }

  function p(r, o, i) {
    var e = o[q.JSON_MAPPING.ADSERVER_TARGETING];
    return i.size = i.getSize(), D._each(e, function (e) {
      var t = e.key,
          n = e.val;
      if (r[t] && D.logWarn("The key: " + t + " is getting ovewritten"), D.isFn(n)) try {
        n = n(i);
      } catch (e) {
        D.logError("bidmanager", "ERROR", e);
      }
      (void 0 === o.suppressEmptyKeys || !0 !== o.suppressEmptyKeys) && t !== q.TARGETING_KEYS.DEAL || !D.isEmptyStr(n) && null != n ? r[t] = n : D.logInfo("suppressing empty key '" + t + "' from adserver targeting");
    }), r;
  }

  function Z(e, t) {
    return e[t.adUnitCode] || (e[t.adUnitCode] = {
      bids: []
    }), e[t.adUnitCode].bids.push(t), e;
  }
}, function (e, t, n) {
  "use strict";

  n.d(t, "a", function () {
    return l;
  });
  var v = n(0),
      h = n(3),
      m = n(35),
      r = n(32),
      o = n(98),
      i = n(2),
      a = n(11),
      S = n.n(a);

  function A() {
    return (A = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  function E(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  function O(e) {
    return function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = new Array(e.length); t < e.length; t++) {
          n[t] = e[t];
        }

        return n;
      }
    }(e) || function (e) {
      if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  var c = n(0),
      T = n(5),
      I = [],
      j = Object.keys(T.TARGETING_KEYS).map(function (e) {
    return T.TARGETING_KEYS[e];
  }),
      u = function u(e) {
    return e.responseTimestamp + 1e3 * e.ttl + 1e3 > Object(v.timestamp)();
  },
      s = function s(e) {
    return e && (e.status && !S()([T.BID_STATUS.RENDERED], e.status) || !e.status);
  };

  function w(e, r, t) {
    var o = 2 < arguments.length && void 0 !== t ? t : 0,
        i = [],
        a = h.b.getConfig("sendBidsControl.dealPrioritization"),
        c = Object(v.groupBy)(e, "adUnitCode");
    return Object.keys(c).forEach(function (e) {
      var t = [],
          n = Object(v.groupBy)(c[e], "bidderCode");
      Object.keys(n).forEach(function (e) {
        return t.push(n[e].reduce(r));
      }), 0 < o ? (t = a ? t(C(!0)) : t.sort(function (e, t) {
        return t.cpm - e.cpm;
      }), i.push.apply(i, O(t.slice(0, o)))) : i.push.apply(i, O(t));
    }), i;
  }

  function C(e) {
    var n = 0 < arguments.length && void 0 !== e && e;
    return function (e, t) {
      return void 0 !== e.adUnitTargeting.hb_deal && void 0 === t.adUnitTargeting.hb_deal ? -1 : void 0 === e.adUnitTargeting.hb_deal && void 0 !== t.adUnitTargeting.hb_deal ? 1 : n ? t.cpm - e.cpm : t.adUnitTargeting.hb_pb - e.adUnitTargeting.hb_pb;
    };
  }

  var d,
      x,
      f,
      l = (d = r.a, f = {}, (x = {}).setLatestAuctionForAdUnit = function (e, t) {
    f[e] = t;
  }, x.resetPresetTargeting = function (e, t) {
    if (Object(v.isGptPubadsDefined)()) {
      var n = U(e),
          o = d.getAdUnits().filter(function (e) {
        return S()(n, e.code);
      });
      window.googletag.pubads().getSlots().forEach(function (n) {
        var r = c.isFn(t) && t(n);
        I.forEach(function (t) {
          o.forEach(function (e) {
            (e.code === n.getAdUnitPath() || e.code === n.getSlotElementId() || c.isFn(r) && r(e.code)) && n.setTargeting(t, null);
          });
        });
      });
    }
  }, x.resetPresetTargetingAST = function (e) {
    U(e).forEach(function (e) {
      var t = window.apntag.getTag(e);

      if (t && t.keywords) {
        var n = Object.keys(t.keywords),
            r = {};
        n.forEach(function (e) {
          S()(I, e.toLowerCase()) || (r[e] = t.keywords[e]);
        }), window.apntag.modifyTag(e, {
          keywords: r
        });
      }
    });
  }, x.getAllTargeting = function (e) {
    var n,
        t,
        r,
        o,
        i,
        a,
        c,
        u,
        s,
        d = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : B(),
        f = U(e),
        l = (a = f, c = d, u = x.getWinningBids(a, c), s = R(), (u = u.map(function (i) {
      return E({}, i.adUnitCode, Object.keys(i.adserverTargeting).filter(function (e) {
        return void 0 === i.sendStandardTargeting || i.sendStandardTargeting || -1 === s.indexOf(e);
      }).reduce(function (e, t) {
        var n = [i.adserverTargeting[t]],
            r = E({}, t.substring(0, 20), n);
        if (t !== T.TARGETING_KEYS.DEAL) return [].concat(O(e), [r]);
        var o = E({}, "".concat(t, "_").concat(i.bidderCode).substring(0, 20), n);
        return [].concat(O(e), [r, o]);
      }, []));
    })).concat((i = f, d.filter(function (e) {
      return S()(i, e.adUnitCode);
    }).map(function (e) {
      return A({}, e);
    }).reduce(P, []).map(k).filter(function (e) {
      return e;
    }))).concat(h.b.getConfig("enableSendAllBids") ? (n = f, t = d, r = j.concat(m.a), o = h.b.getConfig("sendBidsControl.bidLimit"), w(t, v.getHighestCpm, o).map(function (t) {
      if (_(t, n)) return E({}, t.adUnitCode, D(t, r.filter(function (e) {
        return void 0 !== t.adserverTargeting[e];
      })));
    }).filter(function (e) {
      return e;
    })) : function (e, t) {
      if (!0 !== h.b.getConfig("targetingControls.alwaysIncludeDeals")) return [];
      var n = j.concat(m.a);
      return w(t, v.getHighestCpm).map(function (t) {
        if (t.dealId && _(t, e)) return E({}, t.adUnitCode, D(t, n.filter(function (e) {
          return void 0 !== t.adserverTargeting[e];
        })));
      }).filter(function (e) {
        return e;
      });
    }(f, d)));
    l.map(function (t) {
      Object.keys(t).map(function (e) {
        t[e].map(function (e) {
          -1 === I.indexOf(Object.keys(e)[0]) && (I = Object.keys(e).concat(I));
        });
      });
    }), l = l.map(function (e) {
      return E({}, Object.keys(e)[0], e[Object.keys(e)[0]].map(function (e) {
        return E({}, Object.keys(e)[0], e[Object.keys(e)[0]].join(", "));
      }).reduce(function (e, t) {
        return A(t, e);
      }, {}));
    }).reduce(function (e, t) {
      var n = Object.keys(t)[0];
      return e[n] = A({}, e[n], t[n]), e;
    }, {});
    var p,
        g,
        y,
        b = h.b.getConfig("targetingControls.auctionKeyMaxChars");
    return b && (Object(v.logInfo)("Detected 'targetingControls.auctionKeyMaxChars' was active for this auction; set with a limit of ".concat(b, " characters.  Running checks on auction keys...")), p = l, g = b, y = Object(v.deepClone)(p), l = Object.keys(y).map(function (e) {
      return {
        adUnitCode: e,
        adUnitTargeting: y[e]
      };
    }).sort(C()).reduce(function (e, t, n, r) {
      var o,
          i = (o = t.adUnitTargeting, Object.keys(o).reduce(function (e, t) {
        return e + "".concat(t, "%3d").concat(encodeURIComponent(o[t]), "%26");
      }, ""));
      n + 1 === r.length && (i = i.slice(0, -3));
      var a = t.adUnitCode,
          c = i.length;
      return c <= g ? (g -= c, Object(v.logInfo)("AdUnit '".concat(a, "' auction keys comprised of ").concat(c, " characters.  Deducted from running threshold; new limit is ").concat(g), y[a]), e[a] = y[a]) : Object(v.logWarn)("The following keys for adUnitCode '".concat(a, "' exceeded the current limit of the 'auctionKeyMaxChars' setting.\nThe key-set size was ").concat(c, ", the current allotted amount was ").concat(g, ".\n"), y[a]), n + 1 === r.length && 0 === Object.keys(e).length && Object(v.logError)("No auction targeting keys were permitted due to the setting in setConfig(targetingControls.auctionKeyMaxChars).  Please review setup and consider adjusting."), e;
    }, {})), f.forEach(function (e) {
      l[e] || (l[e] = {});
    }), l;
  }, x.setTargetingForGPT = function (o, e) {
    window.googletag.pubads().getSlots().forEach(function (r) {
      Object.keys(o).filter((e || Object(v.isAdUnitCodeMatchingSlot))(r)).forEach(function (n) {
        return Object.keys(o[n]).forEach(function (t) {
          var e = o[n][t].split(",");
          (e = 1 < e.length ? [e] : e).map(function (e) {
            return c.logMessage("Attempting to set key value for slot: ".concat(r.getSlotElementId(), " key: ").concat(t, " value: ").concat(e)), e;
          }).forEach(function (e) {
            r.setTargeting(t, e);
          });
        });
      });
    });
  }, x.getWinningBids = function (e) {
    var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : B(),
        t = U(e);
    return n.filter(function (e) {
      return S()(t, e.adUnitCode);
    }).filter(function (e) {
      return 0 < e.cpm;
    }).map(function (e) {
      return e.adUnitCode;
    }).filter(v.uniques).map(function (t) {
      return n.filter(function (e) {
        return e.adUnitCode === t ? e : null;
      }).reduce(v.getHighestCpm);
    });
  }, x.setTargetingForAst = function (e) {
    var r = x.getAllTargeting(e);

    try {
      x.resetPresetTargetingAST(e);
    } catch (e) {
      c.logError("unable to reset targeting for AST" + e);
    }

    Object.keys(r).forEach(function (n) {
      return Object.keys(r[n]).forEach(function (e) {
        if (c.logMessage("Attempting to set targeting for targetId: ".concat(n, " key: ").concat(e, " value: ").concat(r[n][e])), c.isStr(r[n][e]) || c.isArray(r[n][e])) {
          var t = {};
          e.search(/pt[0-9]/) < 0 ? t[e.toUpperCase()] = r[n][e] : t[e] = r[n][e], window.apntag.setKeywords(n, t, {
            overrideKeyValue: !0
          });
        }
      });
    });
  }, x.isApntagDefined = function () {
    if (window.apntag && c.isFn(window.apntag.setKeywords)) return !0;
  }, x);

  function _(e, t) {
    return e.adserverTargeting && t && (c.isArray(t) && S()(t, e.adUnitCode) || "string" == typeof t && e.adUnitCode === t);
  }

  function U(e) {
    return "string" == typeof e ? [e] : c.isArray(e) ? e : d.getAdUnitCodes() || [];
  }

  function B() {
    var e = d.getBidsReceived();
    return h.b.getConfig("useBidCache") || (e = e.filter(function (e) {
      return f[e.adUnitCode] === e.auctionId;
    })), w(e = e.filter(function (e) {
      return Object(v.deepAccess)(e, "video.context") !== i.a;
    }).filter(function (e) {
      return "banner" !== e.mediaType || Object(o.c)([e.width, e.height]);
    }).filter(s).filter(u), v.getOldestHighestCpmBid);
  }

  function R() {
    return d.getStandardBidderAdServerTargeting().map(function (e) {
      return e.key;
    }).concat(j).filter(v.uniques);
  }

  function P(r, o, e, t) {
    return Object.keys(o.adserverTargeting).filter(p()).forEach(function (e) {
      var t, n;
      r.length && r.filter((n = e, function (e) {
        return e.adUnitCode === o.adUnitCode && e.adserverTargeting[n];
      })).forEach((t = e, function (e) {
        c.isArray(e.adserverTargeting[t]) || (e.adserverTargeting[t] = [e.adserverTargeting[t]]), e.adserverTargeting[t] = e.adserverTargeting[t].concat(o.adserverTargeting[t]).filter(v.uniques), delete o.adserverTargeting[t];
      }));
    }), r.push(o), r;
  }

  function p() {
    var t = R().concat(m.a);
    return function (e) {
      return -1 === t.indexOf(e);
    };
  }

  function k(t) {
    return E({}, t.adUnitCode, Object.keys(t.adserverTargeting).filter(p()).map(function (e) {
      return E({}, e.substring(0, 20), [t.adserverTargeting[e]]);
    }));
  }

  function D(t, e) {
    return e.map(function (e) {
      return E({}, "".concat(e, "_").concat(t.bidderCode).substring(0, 20), [t.adserverTargeting[e]]);
    });
  }
}, function (e, t) {
  e.exports = {};
}, function (e, t, n) {
  "use strict";

  n.d(t, "a", function () {
    return m;
  });
  var a = n(0),
      r = n(3),
      o = n(11),
      i = n.n(o),
      c = n(9);

  function u(e, t) {
    return function (e) {
      if (Array.isArray(e)) return e;
    }(e) || function (e, t) {
      if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
      var n = [],
          r = !0,
          o = !1,
          i = void 0;

      try {
        for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0) {
          ;
        }
      } catch (e) {
        o = !0, i = e;
      } finally {
        try {
          r || null == c["return"] || c["return"]();
        } finally {
          if (o) throw i;
        }
      }

      return n;
    }(e, t) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }();
  }

  function s() {
    return (s = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  r.b.setDefaults({
    userSync: a.deepClone({
      syncEnabled: !0,
      filterSettings: {
        image: {
          bidders: "*",
          filter: "include"
        }
      },
      syncsPerBidder: 5,
      syncDelay: 3e3,
      auctionDelay: 0
    })
  });
  var d = Object(c.a)("usersync");
  var f,
      l,
      p,
      g,
      y,
      b,
      v,
      h = !a.isSafariBrowser() && d.cookiesAreEnabled(),
      m = (f = {
    config: r.b.getConfig("userSync"),
    browserSupportsCookies: h
  }, l = {}, p = S(), g = new Set(), b = {
    image: !0,
    iframe: !(y = {})
  }, v = f.config, r.b.getConfig("userSync", function (e) {
    if (e.userSync) {
      var t = e.userSync.filterSettings;
      a.isPlainObject(t) && (t.image || t.all || (e.userSync.filterSettings.image = {
        bidders: "*",
        filter: "include"
      }));
    }

    v = s(v, e.userSync);
  }), l.registerSync = function (e, t, n) {
    return g.has(t) ? a.logMessage('already fired syncs for "'.concat(t, '", ignoring registerSync call')) : v.syncEnabled && a.isArray(p[e]) ? t ? 0 !== v.syncsPerBidder && Number(y[t]) >= v.syncsPerBidder ? a.logWarn('Number of user syncs exceeded for "'.concat(t, '"')) : l.canBidderRegisterSync(e, t) ? (p[e].push([t, n]), (r = y)[o = t] ? r[o] += 1 : r[o] = 1, void (y = r)) : a.logWarn('Bidder "'.concat(t, '" not permitted to register their "').concat(e, '" userSync pixels.')) : a.logWarn("Bidder is required for registering sync") : a.logWarn('User sync type "'.concat(e, '" not supported'));
    var r, o;
  }, l.syncUsers = function () {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
    if (e) return setTimeout(A, Number(e));
    A();
  }, l.triggerUserSyncs = function () {
    v.enableOverride && l.syncUsers();
  }, l.canBidderRegisterSync = function (e, t) {
    return !v.filterSettings || !O(e, t);
  }, l);

  function S() {
    return {
      image: [],
      iframe: []
    };
  }

  function A() {
    if (v.syncEnabled && f.browserSupportsCookies) {
      try {
        !function () {
          if (!b.image) return;
          E(p.image, function (e) {
            var t = u(e, 2),
                n = t[0],
                r = t[1];
            a.logMessage("Invoking image pixel user sync for bidder: ".concat(n)), a.triggerPixel(r);
          });
        }(), function () {
          if (!b.iframe) return;
          E(p.iframe, function (e) {
            var t = u(e, 2),
                n = t[0],
                r = t[1];
            a.logMessage("Invoking iframe user sync for bidder: ".concat(n)), a.insertUserSyncIframe(r);
          });
        }();
      } catch (e) {
        return a.logError("Error firing user syncs", e);
      }

      p = S();
    }
  }

  function E(e, t) {
    a.shuffle(e).forEach(function (e) {
      t(e), g.add(e[0]);
    });
  }

  function O(e, t) {
    var n = v.filterSettings;

    if (function (e, t) {
      if (e.all && e[t]) return void a.logWarn('Detected presence of the "filterSettings.all" and "filterSettings.'.concat(t, '" in userSync config.  You cannot mix "all" with "iframe/image" configs; they are mutually exclusive.'));
      var n = e.all ? e.all : e[t],
          r = e.all ? "all" : t;
      if (!n) return;
      var o = n.filter,
          i = n.bidders;
      if (o && "include" !== o && "exclude" !== o) return void a.logWarn('UserSync "filterSettings.'.concat(r, ".filter\" setting '").concat(o, "' is not a valid option; use either 'include' or 'exclude'."));
      return "*" === i || Array.isArray(i) && 0 < i.length && i.every(function (e) {
        return a.isStr(e) && "*" !== e;
      }) || (a.logWarn('Detected an invalid setup in userSync "filterSettings.'.concat(r, ".bidders\"; use either '*' (to represent all bidders) or an array of bidders.")), !1);
    }(n, e)) {
      b[e] = !0;
      var r = n.all ? n.all : n[e],
          o = "*" === r.bidders ? [t] : r.bidders;
      return {
        include: function include(e, t) {
          return !i()(e, t);
        },
        exclude: function exclude(e, t) {
          return i()(e, t);
        }
      }[r.filter || "include"](o, t);
    }
  }
}, function (e, t, n) {
  "use strict";

  n.d(t, "b", function () {
    return c;
  }), n.d(t, "a", function () {
    return u;
  }), t.d = function (e, t) {
    var n = Object(i.getBidRequest)(e.requestId, t),
        r = n && Object(i.deepAccess)(n, "mediaTypes.video"),
        o = r && Object(i.deepAccess)(r, "context");
    return s(e, n, r, o);
  }, n.d(t, "c", function () {
    return s;
  });
  n(7);
  var i = n(0),
      o = n(3),
      r = n(11),
      a = (n.n(r), n(13)),
      c = "outstream",
      u = "instream";
  var s = Object(a.b)("sync", function (e, t, n, r) {
    return !t || n && r !== c ? o.b.getConfig("cache.url") || !e.vastXml || e.vastUrl ? !(!e.vastUrl && !e.vastXml) : (Object(i.logError)('\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling prebid cache with pbjs.setConfig({ cache: {url: "..."} });\n      '), !1) : r !== c || !(!e.renderer && !t.renderer);
  }, "checkVideoBidSetup");
}, function (e, t, n) {
  "use strict";

  n.d(t, "a", function () {
    return d;
  }), n.d(t, "b", function () {
    return h;
  });
  var r = n(12),
      b = n.n(r),
      o = n(0),
      v = 2,
      i = {
    buckets: [{
      max: 5,
      increment: .5
    }]
  },
      a = {
    buckets: [{
      max: 20,
      increment: .1
    }]
  },
      c = {
    buckets: [{
      max: 20,
      increment: .01
    }]
  },
      u = {
    buckets: [{
      max: 3,
      increment: .01
    }, {
      max: 8,
      increment: .05
    }, {
      max: 20,
      increment: .5
    }]
  },
      s = {
    buckets: [{
      max: 5,
      increment: .05
    }, {
      max: 10,
      increment: .1
    }, {
      max: 20,
      increment: .5
    }]
  };

  function d(e, t) {
    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 1,
        r = parseFloat(e);
    return isNaN(r) && (r = ""), {
      low: "" === r ? "" : f(e, i, n),
      med: "" === r ? "" : f(e, a, n),
      high: "" === r ? "" : f(e, c, n),
      auto: "" === r ? "" : f(e, s, n),
      dense: "" === r ? "" : f(e, u, n),
      custom: "" === r ? "" : f(e, t, n)
    };
  }

  function f(n, e, r) {
    var o = "";
    if (!h(e)) return o;
    var t,
        i,
        a,
        c,
        u,
        s,
        d,
        f,
        l,
        p = e.buckets.reduce(function (e, t) {
      return e.max > t.max ? e : t;
    }, {
      max: 0
    }),
        g = 0,
        y = b()(e.buckets, function (e) {
      if (n > p.max * r) {
        var t = e.precision;
        void 0 === t && (t = v), o = (e.max * r).toFixed(t);
      } else {
        if (n <= e.max * r && g * r <= n) return e.min = g, e;
        g = e.max;
      }
    });
    return y && (t = n, a = r, c = void 0 !== (i = y).precision ? i.precision : v, u = i.increment * a, s = i.min * a, d = Math.pow(10, c + 2), f = (t * d - s * d) / (u * d), l = Math.floor(f) * u + s, o = (l = Number(l.toFixed(10))).toFixed(c)), o;
  }

  function h(e) {
    if (o.isEmpty(e) || !e.buckets || !Array.isArray(e.buckets)) return !1;
    var t = !0;
    return e.buckets.forEach(function (e) {
      e.max && e.increment || (t = !1);
    }), t;
  }
}, function (e, t) {
  e.exports = function (e, t) {
    return {
      enumerable: !(1 & e),
      configurable: !(2 & e),
      writable: !(4 & e),
      value: t
    };
  };
}, function (e, t, n) {
  var r = n(73),
      o = n(48);

  e.exports = function (e) {
    return r(o(e));
  };
}, function (e, t) {
  var n = {}.toString;

  e.exports = function (e) {
    return n.call(e).slice(8, -1);
  };
}, function (e, t) {
  e.exports = function (e) {
    if (null == e) throw TypeError("Can't call method on " + e);
    return e;
  };
}, function (e, t, n) {
  var r = n(57),
      o = Math.min;

  e.exports = function (e) {
    return 0 < e ? o(r(e), 9007199254740991) : 0;
  };
}, function (e, t) {
  e.exports = function () {};
}, function (e, t, n) {
  var r = n(25);
  e.exports = r;
}, function (e, t) {
  e.exports = {};
}, function (e, t, n) {
  var r,
      o,
      i,
      a = n(119),
      c = n(22),
      u = n(23),
      s = n(28),
      d = n(24),
      f = n(64),
      l = n(52),
      p = c.WeakMap;

  if (a) {
    var g = new p(),
        y = g.get,
        b = g.has,
        v = g.set;
    r = function r(e, t) {
      return v.call(g, e, t), t;
    }, o = function o(e) {
      return y.call(g, e) || {};
    }, i = function i(e) {
      return b.call(g, e);
    };
  } else {
    var h = f("state");
    l[h] = !0, r = function r(e, t) {
      return s(e, h, t), t;
    }, o = function o(e) {
      return d(e, h) ? e[h] : {};
    }, i = function i(e) {
      return d(e, h);
    };
  }

  e.exports = {
    set: r,
    get: o,
    has: i,
    enforce: function enforce(e) {
      return i(e) ? o(e) : r(e, {});
    },
    getterFor: function getterFor(n) {
      return function (e) {
        var t;
        if (!u(e) || (t = o(e)).type !== n) throw TypeError("Incompatible receiver, " + n + " required");
        return t;
      };
    }
  };
}, function (e, t, n) {
  var o = n(23);

  e.exports = function (e, t) {
    if (!o(e)) return e;
    var n, r;
    if (t && "function" == typeof (n = e.toString) && !o(r = n.call(e))) return r;
    if ("function" == typeof (n = e.valueOf) && !o(r = n.call(e))) return r;
    if (!t && "function" == typeof (n = e.toString) && !o(r = n.call(e))) return r;
    throw TypeError("Can't convert object to primitive value");
  };
}, function (e, t, n) {
  function r(p) {
    var g = 1 == p,
        y = 2 == p,
        b = 3 == p,
        v = 4 == p,
        h = 6 == p,
        m = 5 == p || h;
    return function (e, t, n, r) {
      for (var o, i, a = E(e), c = A(a), u = S(t, n, 3), s = O(c.length), d = 0, f = r || T, l = g ? f(e, s) : y ? f(e, 0) : void 0; d < s; d++) {
        if ((m || d in c) && (i = u(o = c[d], d, a), p)) if (g) l[d] = i;else if (i) switch (p) {
          case 3:
            return !0;

          case 5:
            return o;

          case 6:
            return d;

          case 2:
            I.call(l, o);
        } else if (v) return !1;
      }

      return h ? -1 : b || v ? v : l;
    };
  }

  var S = n(21),
      A = n(73),
      E = n(56),
      O = n(49),
      T = n(107),
      I = [].push;
  e.exports = {
    forEach: r(0),
    map: r(1),
    filter: r(2),
    some: r(3),
    every: r(4),
    find: r(5),
    findIndex: r(6)
  };
}, function (e, t, n) {
  var r = n(48);

  e.exports = function (e) {
    return Object(r(e));
  };
}, function (e, t) {
  var n = Math.ceil,
      r = Math.floor;

  e.exports = function (e) {
    return isNaN(e = +e) ? 0 : (0 < e ? r : n)(e);
  };
}, function (e, t) {
  var n = 0,
      r = Math.random();

  e.exports = function (e) {
    return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++n + r).toString(36);
  };
}, function (e, t, n) {
  function a(e) {
    throw e;
  }

  var c = n(26),
      u = n(27),
      s = n(24),
      d = Object.defineProperty,
      f = {};

  e.exports = function (e, t) {
    if (s(f, e)) return f[e];
    var n = [][e],
        r = !!s(t = t || {}, "ACCESSORS") && t.ACCESSORS,
        o = s(t, 0) ? t[0] : a,
        i = s(t, 1) ? t[1] : void 0;
    return f[e] = !!n && !u(function () {
      if (r && !c) return !0;
      var e = {
        length: -1
      };
      r ? d(e, 1, {
        enumerable: !0,
        get: a
      }) : e[1] = 1, n.call(e, o, i);
    });
  };
}, function (e, t, n) {
  var r = n(61),
      o = n(36),
      i = n(19)("iterator");

  e.exports = function (e) {
    if (null != e) return e[i] || e["@@iterator"] || o[r(e)];
  };
}, function (e, t, n) {
  var r = n(62),
      o = n(47),
      i = n(19)("toStringTag"),
      a = "Arguments" == o(function () {
    return arguments;
  }());
  e.exports = r ? o : function (e) {
    var t, n, r;
    return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {
      try {
        return e[t];
      } catch (e) {}
    }(t = Object(e), i)) ? n : a ? o(t) : "Object" == (r = o(t)) && "function" == typeof t.callee ? "Arguments" : r;
  };
}, function (e, t, n) {
  var r = {};
  r[n(19)("toStringTag")] = "z", e.exports = "[object z]" === String(r);
}, function (e, t, n) {
  var i = n(62),
      a = n(29).f,
      c = n(28),
      u = n(24),
      s = n(118),
      d = n(19)("toStringTag");

  e.exports = function (e, t, n, r) {
    if (e) {
      var o = n ? e : e.prototype;
      u(o, d) || a(o, d, {
        configurable: !0,
        value: t
      }), r && !i && c(o, "toString", s);
    }
  };
}, function (e, t, n) {
  var r = n(76),
      o = n(58),
      i = r("keys");

  e.exports = function (e) {
    return i[e] || (i[e] = o(e));
  };
}, function (e, t, n) {
  "use strict";

  function v() {
    return this;
  }

  var h = n(14),
      m = n(127),
      S = n(89),
      A = n(129),
      E = n(63),
      O = n(28),
      T = n(87),
      r = n(19),
      I = n(16),
      j = n(36),
      o = n(88),
      w = o.IteratorPrototype,
      C = o.BUGGY_SAFARI_ITERATORS,
      x = r("iterator"),
      _ = "values",
      U = "entries";

  e.exports = function (e, t, n, r, o, i, a) {
    m(n, t, r);

    function c(e) {
      if (e === o && y) return y;
      if (!C && e in p) return p[e];

      switch (e) {
        case "keys":
        case _:
        case U:
          return function () {
            return new n(this, e);
          };
      }

      return function () {
        return new n(this);
      };
    }

    var u,
        s,
        d,
        f = t + " Iterator",
        l = !1,
        p = e.prototype,
        g = p[x] || p["@@iterator"] || o && p[o],
        y = !C && g || c(o),
        b = "Array" == t && p.entries || g;
    if (b && (u = S(b.call(new e())), w !== Object.prototype && u.next && (I || S(u) === w || (A ? A(u, w) : "function" != typeof u[x] && O(u, x, v)), E(u, f, !0, !0), I && (j[f] = v))), o == _ && g && g.name !== _ && (l = !0, y = function y() {
      return g.call(this);
    }), I && !a || p[x] === y || O(p, x, y), j[t] = y, o) if (s = {
      values: c(_),
      keys: i ? y : c("keys"),
      entries: c(U)
    }, a) for (d in s) {
      !C && !l && d in p || T(p, d, s[d]);
    } else h({
      target: t,
      proto: !0,
      forced: C || l
    }, s);
    return s;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(171);
  e.exports = Function.prototype.bind || r;
}, function (e, t, n) {
  "use strict";

  function i(e, t, n, r) {
    var o;
    t in e && ("function" != typeof (o = r) || "[object Function]" !== u.call(o) || !r()) || (f ? d(e, t, {
      configurable: !0,
      enumerable: !1,
      value: n,
      writable: !0
    }) : e[t] = n);
  }

  function r(e, t) {
    var n = 2 < arguments.length ? arguments[2] : {},
        r = a(t);
    c && (r = s.call(r, Object.getOwnPropertySymbols(t)));

    for (var o = 0; o < r.length; o += 1) {
      i(e, r[o], t[r[o]], n[r[o]]);
    }
  }

  var a = n(93),
      c = "function" == typeof Symbol && "symbol" == _typeof(Symbol("foo")),
      u = Object.prototype.toString,
      s = Array.prototype.concat,
      d = Object.defineProperty,
      f = d && function () {
    var e = {};

    try {
      for (var t in d(e, "x", {
        enumerable: !1,
        value: e
      }), e) {
        return !1;
      }

      return e.x === e;
    } catch (e) {
      return !1;
    }
  }();

  r.supportsDescriptors = !!f, e.exports = r;
}, function (e, t, n) {
  "use strict";

  n.d(t, "a", function () {
    return i;
  });
  var r = n(0),
      c = {};

  function o(e, t, n) {
    var r,
        o,
        i,
        a = (o = n, i = c[r = e] = c[r] || {
      bidders: {}
    }, o ? i.bidders[o] = i.bidders[o] || {} : i);
    return a[t] = (a[t] || 0) + 1, a[t];
  }

  var i = {
    incrementRequestsCounter: function incrementRequestsCounter(e) {
      return o(e, "requestsCounter");
    },
    incrementBidderRequestsCounter: function incrementBidderRequestsCounter(e, t) {
      return o(e, "requestsCounter", t);
    },
    incrementBidderWinsCounter: function incrementBidderWinsCounter(e, t) {
      return o(e, "winsCounter", t);
    },
    getRequestsCounter: function getRequestsCounter(e) {
      return Object(r.deepAccess)(c, "".concat(e, ".requestsCounter")) || 0;
    },
    getBidderRequestsCounter: function getBidderRequestsCounter(e, t) {
      return Object(r.deepAccess)(c, "".concat(e, ".bidders.").concat(t, ".requestsCounter")) || 0;
    },
    getBidderWinsCounter: function getBidderWinsCounter(e, t) {
      return Object(r.deepAccess)(c, "".concat(e, ".bidders.").concat(t, ".winsCounter")) || 0;
    }
  };
}, function (e, t, n) {
  var r = n(233);
  e.exports = r;
}, function (e, t, n) {
  "use strict";

  Object.defineProperty(t, "__esModule", {
    value: !0
  }), n.d(t, "adUnitSetupChecks", function () {
    return z;
  }), n.d(t, "checkAdUnitSetup", function () {
    return V;
  }), t.executeStorageCallbacks = J;
  var r = n(20),
      o = n(0),
      i = n(239),
      a = n(42),
      d = n(3),
      v = n(32),
      f = n(40),
      c = n(13),
      u = n(240),
      s = n(11),
      l = n.n(s),
      p = n(68),
      h = n(10),
      g = n(31),
      y = n(9);

  function b(e) {
    return (b = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(e);
  }

  function m() {
    return (m = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];

        for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }

      return e;
    }).apply(this, arguments);
  }

  var S = Object(r.a)(),
      A = n(5),
      E = n(0),
      O = n(7)["default"],
      T = n(8),
      I = a.a.triggerUserSyncs,
      j = A.EVENTS,
      w = j.ADD_AD_UNITS,
      C = j.BID_WON,
      x = j.REQUEST_BIDS,
      _ = j.SET_TARGETING,
      U = j.AD_RENDER_FAILED,
      B = A.AD_RENDER_FAILED_REASON,
      R = B.PREVENT_WRITING_ON_MAIN_DOCUMENT,
      P = B.NO_AD,
      k = B.EXCEPTION,
      D = B.CANNOT_FIND_AD,
      N = B.MISSING_DOC_OR_ADID,
      M = {
    bidWon: function bidWon(e) {
      var t = v.a.getBidsRequested().map(function (e) {
        return e.bids.map(function (e) {
          return e.adUnitCode;
        });
      }).reduce(o.flatten).filter(o.uniques);
      return !!E.contains(t, e) || void E.logError('The "' + e + '" placement is not defined.');
    }
  };

  function q(e, t, n) {
    e.defaultView && e.defaultView.frameElement && (e.defaultView.frameElement.width = t, e.defaultView.frameElement.height = n);
  }

  function G(e, t) {
    var n = [];
    return E.isArray(e) && (t ? e.length === t : 0 < e.length) && (e.every(function (e) {
      return Object(o.isArrayOfNums)(e, 2);
    }) ? n = e : Object(o.isArrayOfNums)(e, 2) && n.push(e)), n;
  }

  function F(e) {
    var t = e.mediaTypes.banner,
        n = G(t.sizes);
    0 < n.length ? (t.sizes = n, e.sizes = n) : (E.logError("Detected a mediaTypes.banner object without a proper sizes field.  Please ensure the sizes are listed like: [[300, 250], ...].  Removing invalid mediaTypes.banner object from request."), delete e.mediaTypes.banner);
  }

  function W(e) {
    var t = e.mediaTypes.video,
        n = "number" == typeof t.playerSize[0] ? 2 : 1,
        r = G(t.playerSize, n);
    0 < r.length ? (2 == n && E.logInfo("Transforming video.playerSize from [640,480] to [[640,480]] so it's in the proper format."), t.playerSize = r, e.sizes = r) : (E.logError("Detected incorrect configuration of mediaTypes.video.playerSize.  Please specify only one set of dimensions in a format like: [[640, 480]]. Removing invalid mediaTypes.video.playerSize property from request."), delete e.mediaTypes.video.playerSize);
  }

  function L(e) {
    var t = e.mediaTypes["native"];
    t.image && t.image.sizes && !Array.isArray(t.image.sizes) && (E.logError("Please use an array of sizes for native.image.sizes field.  Removing invalid mediaTypes.native.image.sizes property from request."), delete e.mediaTypes["native"].image.sizes), t.image && t.image.aspect_ratios && !Array.isArray(t.image.aspect_ratios) && (E.logError("Please use an array of sizes for native.image.aspect_ratios field.  Removing invalid mediaTypes.native.image.aspect_ratios property from request."), delete e.mediaTypes["native"].image.aspect_ratios), t.icon && t.icon.sizes && !Array.isArray(t.icon.sizes) && (E.logError("Please use an array of sizes for native.icon.sizes field.  Removing invalid mediaTypes.native.icon.sizes property from request."), delete e.mediaTypes["native"].icon.sizes);
  }

  Object(u.a)(), S.bidderSettings = S.bidderSettings || {}, S.libLoaded = !0, S.version = "v3.20.0", E.logInfo("Prebid.js v3.20.0 loaded"), S.adUnits = S.adUnits || [], S.triggerUserSyncs = I;
  var z = {
    validateBannerMediaType: F,
    validateVideoMediaType: W,
    validateNativeMediaType: L,
    validateSizes: G
  },
      V = Object(c.b)("sync", function (e) {
    return e.filter(function (e) {
      var t = e.mediaTypes;
      if (!t || 0 === Object.keys(t).length) return E.logError("Detected adUnit.code '".concat(e.code, "' did not have a 'mediaTypes' object defined.  This is a required field for the auction, so this adUnit has been removed.")), !1;
      t.banner && F(e), !t.video || t.video.playerSize && W(e);
      return t["native"] && L(e), !0;
    });
  }, "checkAdUnitSetup");

  function H(e) {
    var n = v.a[e]().filter(E.bind.call(o.adUnitsFilter, this, v.a.getAdUnitCodes())),
        r = v.a.getLastAuctionId();
    return n.map(function (e) {
      return e.adUnitCode;
    }).filter(o.uniques).map(function (t) {
      return n.filter(function (e) {
        return e.auctionId === r && e.adUnitCode === t;
      });
    }).filter(function (e) {
      return e && e[0] && e[0].adUnitCode;
    }).map(function (e) {
      return t = {}, n = e[0].adUnitCode, r = {
        bids: e
      }, n in t ? Object.defineProperty(t, n, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[n] = r, t;
      var t, n, r;
    }).reduce(function (e, t) {
      return m(e, t);
    }, {});
  }

  function K(e) {
    var t = e.reason,
        n = e.message,
        r = e.bid,
        o = e.id,
        i = {
      reason: t,
      message: n
    };
    r && (i.bid = r), o && (i.adId = o), E.logError(n), T.emit(U, i);
  }

  function J(e, t) {
    !function (e) {
      var t;

      for (; t = e.shift();) {
        t();
      }
    }(y.c), e.call(this, t);
  }

  function Y(e) {
    e.forEach(function (e) {
      if (void 0 === e.called) try {
        e.call(), e.called = !0;
      } catch (e) {
        E.logError("Error processing command :", "prebid.js", e);
      }
    });
  }

  S.getAdserverTargetingForAdUnitCodeStr = function (e) {
    if (E.logInfo("Invoking pbjs.getAdserverTargetingForAdUnitCodeStr", arguments), e) {
      var t = S.getAdserverTargetingForAdUnitCode(e);
      return E.transformAdServerTargetingObj(t);
    }

    E.logMessage("Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode");
  }, S.getAdserverTargetingForAdUnitCode = function (e) {
    return S.getAdserverTargeting(e)[e];
  }, S.getAdserverTargeting = function (e) {
    return E.logInfo("Invoking pbjs.getAdserverTargeting", arguments), f.a.getAllTargeting(e);
  }, S.getNoBids = function () {
    return E.logInfo("Invoking pbjs.getNoBids", arguments), H("getNoBids");
  }, S.getBidResponses = function () {
    return E.logInfo("Invoking pbjs.getBidResponses", arguments), H("getBidsReceived");
  }, S.getBidResponsesForAdUnitCode = function (t) {
    return {
      bids: v.a.getBidsReceived().filter(function (e) {
        return e.adUnitCode === t;
      })
    };
  }, S.setTargetingForGPTAsync = function (e, t) {
    if (E.logInfo("Invoking pbjs.setTargetingForGPTAsync", arguments), Object(o.isGptPubadsDefined)()) {
      var n = f.a.getAllTargeting(e);
      f.a.resetPresetTargeting(e, t), f.a.setTargetingForGPT(n, t), Object.keys(n).forEach(function (t) {
        Object.keys(n[t]).forEach(function (e) {
          "hb_adid" === e && v.a.setStatusForBids(n[t][e], A.BID_STATUS.BID_TARGETING_SET);
        });
      }), T.emit(_, n);
    } else E.logError("window.googletag is not defined on the page");
  }, S.setTargetingForAst = function (e) {
    E.logInfo("Invoking pbjs.setTargetingForAn", arguments), f.a.isApntagDefined() ? (f.a.setTargetingForAst(e), T.emit(_, f.a.getAllTargeting())) : E.logError("window.apntag is not defined on the page");
  }, S.renderAd = function (e, t) {
    if (E.logInfo("Invoking pbjs.renderAd", arguments), E.logMessage("Calling renderAd with adId :" + t), e && t) try {
      var n = v.a.findBidByAdId(t);

      if (n) {
        n.ad = E.replaceAuctionPrice(n.ad, n.cpm), n.adUrl = E.replaceAuctionPrice(n.adUrl, n.cpm), v.a.addWinningBid(n), T.emit(C, n);
        var r = n.height,
            o = n.width,
            i = n.ad,
            a = n.mediaType,
            c = n.adUrl,
            u = n.renderer,
            s = document.createComment("Creative ".concat(n.creativeId, " served by ").concat(n.bidder, " Prebid.js Header Bidding"));
        if (E.insertElement(s, e, "body"), Object(h.c)(u)) Object(h.b)(u, n);else if (e === document && !E.inIframe() || "video" === a) {
          var d = "Error trying to write ad. Ad render call ad id ".concat(t, " was prevented from writing to the main document.");
          K({
            reason: R,
            message: d,
            bid: n,
            id: t
          });
        } else if (i) {
          if (navigator.userAgent && -1 < navigator.userAgent.toLowerCase().indexOf("firefox/")) {
            var f = navigator.userAgent.toLowerCase().match(/firefox\/([\d\.]+)/)[1];
            f && parseInt(f, 10) < 67 && e.open("text/html", "replace");
          }

          e.write(i), e.close(), q(e, o, r), E.callBurl(n);
        } else if (c) {
          var l = E.createInvisibleIframe();
          l.height = r, l.width = o, l.style.display = "inline", l.style.overflow = "hidden", l.src = c, E.insertElement(l, e, "body"), q(e, o, r), E.callBurl(n);
        } else {
          var p = "Error trying to write ad. No ad for bid response id: ".concat(t);
          K({
            reason: P,
            message: p,
            bid: n,
            id: t
          });
        }
      } else {
        var g = "Error trying to write ad. Cannot find ad by given id : ".concat(t);
        K({
          reason: D,
          message: g,
          id: t
        });
      }
    } catch (e) {
      var y = "Error trying to write ad Id :".concat(t, " to the page:").concat(e.message);
      K({
        reason: k,
        message: y,
        id: t
      });
    } else {
      var b = "Error trying to write ad Id :".concat(t, " to the page. Missing document or adId");
      K({
        reason: N,
        message: b,
        id: t
      });
    }
  }, S.removeAdUnit = function (e) {
    (E.logInfo("Invoking pbjs.removeAdUnit", arguments), e) ? (E.isArray(e) ? e : [e]).forEach(function (e) {
      for (var t = S.adUnits.length - 1; 0 <= t; t--) {
        S.adUnits[t].code === e && S.adUnits.splice(t, 1);
      }
    }) : S.adUnits = [];
  }, S.requestBids = Object(c.b)("async", function () {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.bidsBackHandler,
        n = e.timeout,
        r = e.adUnits,
        o = e.adUnitCodes,
        i = e.labels,
        a = e.auctionId;
    T.emit(x);
    var c = n || d.b.getConfig("bidderTimeout");

    if (r = r || S.adUnits, E.logInfo("Invoking pbjs.requestBids", arguments), o && o.length ? r = r.filter(function (e) {
      return l()(o, e.code);
    }) : o = r && r.map(function (e) {
      return e.code;
    }), (r = V(r)).forEach(function (o) {
      var i = Object.keys(o.mediaTypes || {
        banner: "banner"
      }),
          e = o.bids.map(function (e) {
        return e.bidder;
      }),
          a = O.bidderRegistry,
          t = d.b.getConfig("s2sConfig"),
          n = t && t.bidders,
          r = n ? e.filter(function (e) {
        return !l()(n, e);
      }) : e;
      o.transactionId = E.generateUUID(), r.forEach(function (t) {
        var e = a[t],
            n = e && e.getSpec && e.getSpec(),
            r = n && n.supportedMediaTypes || ["banner"];
        i.some(function (e) {
          return l()(r, e);
        }) ? p.a.incrementBidderRequestsCounter(o.code, t) : (E.logWarn(E.unsupportedBidderMessage(o, t)), o.bids = o.bids.filter(function (e) {
          return e.bidder !== t;
        }));
      }), p.a.incrementRequestsCounter(o.code);
    }), r && 0 !== r.length) {
      var u = v.a.createAuction({
        adUnits: r,
        adUnitCodes: o,
        callback: t,
        cbTimeout: c,
        labels: i,
        auctionId: a
      }),
          s = r.length;
      15 < s && E.logInfo("Current auction ".concat(u.getAuctionId(), " contains ").concat(s, " adUnits."), r), o.forEach(function (e) {
        return f.a.setLatestAuctionForAdUnit(e, u.getAuctionId());
      }), u.callBids();
    } else if (E.logMessage("No adUnits configured. No bids requested."), "function" == typeof t) try {
      t();
    } catch (e) {
      E.logError("Error executing bidsBackHandler", null, e);
    }
  }), S.requestBids.before(J, 49), S.addAdUnits = function (e) {
    E.logInfo("Invoking pbjs.addAdUnits", arguments), E.isArray(e) ? S.adUnits.push.apply(S.adUnits, e) : "object" === b(e) && S.adUnits.push(e), T.emit(w);
  }, S.onEvent = function (e, t, n) {
    E.logInfo("Invoking pbjs.onEvent", arguments), E.isFn(t) ? !n || M[e].call(null, n) ? T.on(e, t, n) : E.logError('The id provided is not valid for event "' + e + '" and no handler was set.') : E.logError('The event handler provided is not a function and was not set on event "' + e + '".');
  }, S.offEvent = function (e, t, n) {
    E.logInfo("Invoking pbjs.offEvent", arguments), n && !M[e].call(null, n) || T.off(e, t, n);
  }, S.registerBidAdapter = function (e, t) {
    E.logInfo("Invoking pbjs.registerBidAdapter", arguments);

    try {
      O.registerBidAdapter(e(), t);
    } catch (e) {
      E.logError("Error registering bidder adapter : " + e.message);
    }
  }, S.registerAnalyticsAdapter = function (e) {
    E.logInfo("Invoking pbjs.registerAnalyticsAdapter", arguments);

    try {
      O.registerAnalyticsAdapter(e);
    } catch (e) {
      E.logError("Error registering analytics adapter : " + e.message);
    }
  }, S.createBid = function (e) {
    return E.logInfo("Invoking pbjs.createBid", arguments), Object(g.a)(e);
  }, S.enableAnalytics = function (e) {
    e && !E.isEmpty(e) ? (E.logInfo("Invoking pbjs.enableAnalytics for: ", e), O.enableAnalytics(e)) : E.logError("pbjs.enableAnalytics should be called with option {}");
  }, S.aliasBidder = function (e, t) {
    E.logInfo("Invoking pbjs.aliasBidder", arguments), e && t ? O.aliasBidAdapter(e, t) : E.logError("bidderCode and alias must be passed as arguments", "pbjs.aliasBidder");
  }, S.getAllWinningBids = function () {
    return v.a.getAllWinningBids();
  }, S.getAllPrebidWinningBids = function () {
    return v.a.getBidsReceived().filter(function (e) {
      return e.status === A.BID_STATUS.BID_TARGETING_SET;
    });
  }, S.getHighestCpmBids = function (e) {
    return f.a.getWinningBids(e);
  }, S.markWinningBidAsUsed = function (t) {
    var e = [];
    t.adUnitCode && t.adId ? e = v.a.getBidsReceived().filter(function (e) {
      return e.adId === t.adId && e.adUnitCode === t.adUnitCode;
    }) : t.adUnitCode ? e = f.a.getWinningBids(t.adUnitCode) : t.adId ? e = v.a.getBidsReceived().filter(function (e) {
      return e.adId === t.adId;
    }) : E.logWarn("Inproper usage of markWinningBidAsUsed. It'll need an adUnitCode and/or adId to function."), 0 < e.length && (e[0].status = A.BID_STATUS.RENDERED);
  }, S.getConfig = d.b.getConfig, S.setConfig = d.b.setConfig, S.setBidderConfig = d.b.setBidderConfig, S.que.push(function () {
    return Object(i.a)();
  }), S.cmd.push = function (e) {
    if ("function" == typeof e) try {
      e.call();
    } catch (e) {
      E.logError("Error processing command :", e.message, e.stack);
    } else E.logError("Commands written into pbjs.cmd.push must be wrapped in a function");
  }, S.que.push = S.cmd.push, S.processQueue = function () {
    c.b.ready(), Y(S.que), Y(S.cmd);
  }, t["default"] = S;
},, function (e, t, n) {
  "use strict";

  t.a = function (t, n) {
    i.adServers = i.adServers || {}, i.adServers[t] = i.adServers[t] || {}, Object.keys(n).forEach(function (e) {
      i.adServers[t][e] ? Object(o.logWarn)("Attempting to add an already registered function property ".concat(e, " for AdServer ").concat(t, ".")) : i.adServers[t][e] = n[e];
    });
  };

  var r = n(20),
      o = n(0),
      i = Object(r.a)();
}, function (e, t, n) {
  var r = n(27),
      o = n(47),
      i = "".split;
  e.exports = r(function () {
    return !Object("z").propertyIsEnumerable(0);
  }) ? function (e) {
    return "String" == o(e) ? i.call(e, "") : Object(e);
  } : Object;
}, function (e, t, n) {
  var r = n(26),
      o = n(27),
      i = n(75);
  e.exports = !r && !o(function () {
    return 7 != Object.defineProperty(i("div"), "a", {
      get: function get() {
        return 7;
      }
    }).a;
  });
}, function (e, t, n) {
  var r = n(22),
      o = n(23),
      i = r.document,
      a = o(i) && o(i.createElement);

  e.exports = function (e) {
    return a ? i.createElement(e) : {};
  };
}, function (e, t, n) {
  var r = n(16),
      o = n(77);
  (e.exports = function (e, t) {
    return o[e] || (o[e] = void 0 !== t ? t : {});
  })("versions", []).push({
    version: "3.6.4",
    mode: r ? "pure" : "global",
    copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
  });
}, function (e, t, n) {
  var r = n(22),
      o = n(109),
      i = "__core-js_shared__",
      a = r[i] || o(i, {});
  e.exports = a;
}, function (e, t, n) {
  var r = n(27);
  e.exports = !!Object.getOwnPropertySymbols && !r(function () {
    return !String(Symbol());
  });
}, function (e, t, n) {
  function r(c) {
    return function (e, t, n) {
      var r,
          o = u(e),
          i = s(o.length),
          a = d(n, i);

      if (c && t != t) {
        for (; a < i;) {
          if ((r = o[a++]) != r) return !0;
        }
      } else for (; a < i; a++) {
        if ((c || a in o) && o[a] === t) return c || a || 0;
      }

      return !c && -1;
    };
  }

  var u = n(46),
      s = n(49),
      d = n(113);
  e.exports = {
    includes: r(!0),
    indexOf: r(!1)
  };
}, function (e, t, n) {
  var r = n(114);
  n(137), n(139), n(141), n(143), n(145), n(146), n(147), n(148), n(149), n(150), n(151), n(152), n(153), n(154), n(155), n(156), n(157), n(158), e.exports = r;
}, function (e, t, n) {
  function r(e) {
    c(e, d, {
      value: {
        objectID: "O" + ++f,
        weakData: {}
      }
    });
  }

  var o = n(52),
      i = n(23),
      a = n(24),
      c = n(29).f,
      u = n(58),
      s = n(117),
      d = u("meta"),
      f = 0,
      l = Object.isExtensible || function () {
    return !0;
  },
      p = e.exports = {
    REQUIRED: !1,
    fastKey: function fastKey(e, t) {
      if (!i(e)) return "symbol" == _typeof(e) ? e : ("string" == typeof e ? "S" : "P") + e;

      if (!a(e, d)) {
        if (!l(e)) return "F";
        if (!t) return "E";
        r(e);
      }

      return e[d].objectID;
    },
    getWeakData: function getWeakData(e, t) {
      if (!a(e, d)) {
        if (!l(e)) return !0;
        if (!t) return !1;
        r(e);
      }

      return e[d].weakData;
    },
    onFreeze: function onFreeze(e) {
      return s && p.REQUIRED && l(e) && !a(e, d) && r(e), e;
    }
  };

  o[d] = !0;
}, function (e, t, n) {
  var r = n(19),
      o = n(36),
      i = r("iterator"),
      a = Array.prototype;

  e.exports = function (e) {
    return void 0 !== e && (o.Array === e || a[i] === e);
  };
}, function (e, t, n) {
  var i = n(15);

  e.exports = function (t, e, n, r) {
    try {
      return r ? e(i(n)[0], n[1]) : e(n);
    } catch (e) {
      var o = t["return"];
      throw void 0 !== o && i(o.call(t)), e;
    }
  };
}, function (e, t) {
  e.exports = function (e, t, n) {
    if (!(e instanceof t)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");
    return e;
  };
}, function (e, t, n) {
  function r() {}

  function o(e) {
    return "<script>" + e + "</" + g + ">";
  }

  var i,
      a = n(15),
      c = n(122),
      u = n(86),
      s = n(52),
      d = n(125),
      f = n(75),
      l = n(64),
      p = "prototype",
      g = "script",
      y = l("IE_PROTO"),
      _b = function b() {
    try {
      i = document.domain && new ActiveXObject("htmlfile");
    } catch (e) {}

    var e, t;
    _b = i ? function (e) {
      e.write(o("")), e.close();
      var t = e.parentWindow.Object;
      return e = null, t;
    }(i) : ((t = f("iframe")).style.display = "none", d.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(o("document.F=Object")), e.close(), e.F);

    for (var n = u.length; n--;) {
      delete _b[p][u[n]];
    }

    return _b();
  };

  s[y] = !0, e.exports = Object.create || function (e, t) {
    var n;
    return null !== e ? (r[p] = a(e), n = new r(), r[p] = null, n[y] = e) : n = _b(), void 0 === t ? n : c(n, t);
  };
}, function (e, t) {
  e.exports = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
}, function (e, t, n) {
  var o = n(28);

  e.exports = function (e, t, n, r) {
    r && r.enumerable ? e[t] = n : o(e, t, n);
  };
}, function (e, t, n) {
  "use strict";

  var r,
      o,
      i,
      a = n(89),
      c = n(28),
      u = n(24),
      s = n(19),
      d = n(16),
      f = s("iterator"),
      l = !1;
  [].keys && ("next" in (i = [].keys()) ? (o = a(a(i))) !== Object.prototype && (r = o) : l = !0), null == r && (r = {}), d || u(r, f) || c(r, f, function () {
    return this;
  }), e.exports = {
    IteratorPrototype: r,
    BUGGY_SAFARI_ITERATORS: l
  };
}, function (e, t, n) {
  var r = n(24),
      o = n(56),
      i = n(64),
      a = n(128),
      c = i("IE_PROTO"),
      u = Object.prototype;
  e.exports = a ? Object.getPrototypeOf : function (e) {
    return e = o(e), r(e, c) ? e[c] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? u : null;
  };
}, function (e, t, n) {
  "use strict";

  var o = n(133).charAt,
      r = n(53),
      i = n(65),
      a = "String Iterator",
      c = r.set,
      u = r.getterFor(a);
  i(String, "String", function (e) {
    c(this, {
      type: a,
      string: String(e),
      index: 0
    });
  }, function () {
    var e,
        t = u(this),
        n = t.string,
        r = t.index;
    return r >= n.length ? {
      value: void 0,
      done: !0
    } : (e = o(n, r), t.index += e.length, {
      value: e,
      done: !1
    });
  });
}, function (e, t, n) {
  var r = n(15),
      o = n(60);

  e.exports = function (e) {
    var t = o(e);
    if ("function" != typeof t) throw TypeError(String(e) + " is not iterable");
    return r(t.call(e));
  };
}, function (e, t, n) {
  var r = n(159);
  e.exports = r;
}, function (e, t, n) {
  "use strict";

  var r = Array.prototype.slice,
      o = n(94),
      i = Object.keys,
      a = i ? function (e) {
    return i(e);
  } : n(166),
      c = Object.keys;
  a.shim = function () {
    Object.keys ? function () {
      var e = Object.keys(arguments);
      return e && e.length === arguments.length;
    }(1, 2) || (Object.keys = function (e) {
      return o(e) ? c(r.call(e)) : c(e);
    }) : Object.keys = a;
    return Object.keys || a;
  }, e.exports = a;
}, function (e, t, n) {
  "use strict";

  var r = Object.prototype.toString;

  e.exports = function (e) {
    var t = r.call(e),
        n = "[object Arguments]" === t;
    return n = n || "[object Array]" !== t && null !== e && "object" == _typeof(e) && "number" == typeof e.length && 0 <= e.length && "[object Function]" === r.call(e.callee);
  };
}, function (e, t, n) {
  "use strict";

  var r = Object,
      o = TypeError;

  e.exports = function () {
    if (null != this && this !== r(this)) throw new o("RegExp.prototype.flags getter called on non-object");
    var e = "";
    return this.global && (e += "g"), this.ignoreCase && (e += "i"), this.multiline && (e += "m"), this.dotAll && (e += "s"), this.unicode && (e += "u"), this.sticky && (e += "y"), e;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(95),
      o = n(67).supportsDescriptors,
      i = Object.getOwnPropertyDescriptor,
      a = TypeError;

  e.exports = function () {
    if (!o) throw new a("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");

    if ("gim" === /a/gim.flags) {
      var e = i(RegExp.prototype, "flags");
      if (e && "function" == typeof e.get && "boolean" == typeof /a/.dotAll) return e.get;
    }

    return r;
  };
}, function (e, t, n) {
  "use strict";

  t.a = function (e) {
    var t = e;
    return {
      callBids: function callBids() {},
      setBidderCode: function setBidderCode(e) {
        t = e;
      },
      getBidderCode: function getBidderCode() {
        return t;
      }
    };
  };
}, function (e, t, n) {
  "use strict";

  t.a = function (e, t) {
    if (e.labelAll) return {
      labelAll: !0,
      labels: e.labelAll,
      activeLabels: t
    };
    return {
      labelAll: !1,
      labels: e.labelAny,
      activeLabels: t
    };
  }, t.c = function (e) {
    var t = b(1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : y);
    return !t.shouldFilter || !!t.sizesSupported[e];
  }, t.b = function () {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.labels,
        n = void 0 === t ? [] : t,
        r = e.labelAll,
        o = void 0 !== r && r,
        i = e.activeLabels,
        a = void 0 === i ? [] : i,
        c = 1 < arguments.length ? arguments[1] : void 0,
        u = 2 < arguments.length ? arguments[2] : void 0,
        s = b(3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : y);
    c = Object(p.isPlainObject)(c) ? Object(p.deepClone)(c) : u ? {
      banner: {
        sizes: u
      }
    } : {};
    var d = Object(p.deepAccess)(c, "banner.sizes");
    s.shouldFilter && d && (c.banner.sizes = d.filter(function (e) {
      return s.sizesSupported[e];
    }));
    var f = Object.keys(c),
        l = {
      active: f.every(function (e) {
        return "banner" !== e;
      }) || f.some(function (e) {
        return "banner" === e;
      }) && 0 < Object(p.deepAccess)(c, "banner.sizes.length") && (0 === n.length || !o && (n.some(function (e) {
        return s.labels[e];
      }) || n.some(function (e) {
        return g()(a, e);
      })) || o && n.reduce(function (e, t) {
        return e ? s.labels[t] || g()(a, t) : e;
      }, !0)),
      mediaTypes: c
    };
    d && d.length !== c.banner.sizes.length && (l.filterResults = {
      before: d,
      after: c.banner.sizes
    });
    return l;
  };
  var r = n(3),
      p = n(0),
      o = n(11),
      g = n.n(o);

  function i(e) {
    return (i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(e);
  }

  var y = [];

  function b(e) {
    return e.reduce(function (n, r) {
      if ("object" === i(r) && "string" == typeof r.mediaQuery) {
        var t = !1;
        if ("" === r.mediaQuery) t = !0;else try {
          t = Object(p.getWindowTop)().matchMedia(r.mediaQuery).matches;
        } catch (e) {
          Object(p.logWarn)("Unfriendly iFrame blocks sizeConfig from being correctly evaluated"), t = matchMedia(r.mediaQuery).matches;
        }
        t && (Array.isArray(r.sizesSupported) && (n.shouldFilter = !0), ["labels", "sizesSupported"].forEach(function (t) {
          return (r[t] || []).forEach(function (e) {
            return n[t][e] = !0;
          });
        }));
      } else Object(p.logWarn)('sizeConfig rule missing required property "mediaQuery"');

      return n;
    }, {
      labels: {},
      sizesSupported: {},
      shouldFilter: !1
    });
  }

  r.b.getConfig("sizeConfig", function (e) {
    return t = e.sizeConfig, void (y = t);
    var t;
  });
}, function (e, t, n) {
  "use strict";

  t.b = function (e, t) {
    var n = {
      puts: e.map(o)
    };
    Object(r.a)(i.b.getConfig("cache.url"), function (n) {
      return {
        success: function success(e) {
          var t;

          try {
            t = JSON.parse(e).responses;
          } catch (e) {
            return void n(e, []);
          }

          t ? n(null, t) : n(new Error("The cache server didn't respond with a responses property."), []);
        },
        error: function error(e, t) {
          n(new Error("Error storing video ad in the cache: ".concat(e, ": ").concat(JSON.stringify(t))), []);
        }
      };
    }(t), JSON.stringify(n), {
      contentType: "text/plain",
      withCredentials: !0
    });
  }, t.a = function (e) {
    return "".concat(i.b.getConfig("cache.url"), "?uuid=").concat(e);
  };
  var r = n(4),
      i = n(3);

  function o(e) {
    var t,
        n,
        r,
        o = {
      type: "xml",
      value: e.vastXml ? e.vastXml : (t = e.vastUrl, n = e.vastImpUrl, r = n ? "<![CDATA[".concat(n, "]]>") : "", '<VAST version="3.0">\n    <Ad>\n      <Wrapper>\n        <AdSystem>prebid.org wrapper</AdSystem>\n        <VASTAdTagURI><![CDATA['.concat(t, "]]></VASTAdTagURI>\n        <Impression>").concat(r, "</Impression>\n        <Creatives></Creatives>\n      </Wrapper>\n    </Ad>\n  </VAST>")),
      ttlseconds: Number(e.ttl)
    };
    return i.b.getConfig("cache.vasttrack") && (o.bidder = e.bidder, o.bidid = e.requestId), "string" == typeof e.customCacheKey && "" !== e.customCacheKey && (o.key = e.customCacheKey), o;
  }
},,, function (e, t, n) {
  n(103);
  var r = n(51);
  e.exports = r("Array", "find");
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(55).find,
      i = n(50),
      a = n(59),
      c = "find",
      u = !0,
      s = a(c);
  c in [] && Array(1)[c](function () {
    u = !1;
  }), r({
    target: "Array",
    proto: !0,
    forced: u || !s
  }, {
    find: function find(e, t) {
      return o(this, e, 1 < arguments.length ? t : void 0);
    }
  }), i(c);
}, function (e, t, n) {
  var r = n(26),
      o = n(105),
      i = n(45),
      a = n(46),
      c = n(54),
      u = n(24),
      s = n(74),
      d = Object.getOwnPropertyDescriptor;
  t.f = r ? d : function (e, t) {
    if (e = a(e), t = c(t, !0), s) try {
      return d(e, t);
    } catch (e) {}
    if (u(e, t)) return i(!o.f.call(e, t), e[t]);
  };
}, function (e, t, n) {
  "use strict";

  var r = {}.propertyIsEnumerable,
      o = Object.getOwnPropertyDescriptor,
      i = o && !r.call({
    1: 2
  }, 1);
  t.f = i ? function (e) {
    var t = o(this, e);
    return !!t && t.enumerable;
  } : r;
}, function (e, t, n) {
  function r(e, t) {
    var n = c[a(e)];
    return n == s || n != u && ("function" == typeof t ? o(t) : !!t);
  }

  var o = n(27),
      i = /#|\.prototype\./,
      a = r.normalize = function (e) {
    return String(e).replace(i, ".").toLowerCase();
  },
      c = r.data = {},
      u = r.NATIVE = "N",
      s = r.POLYFILL = "P";

  e.exports = r;
}, function (e, t, n) {
  var r = n(23),
      o = n(108),
      i = n(19)("species");

  e.exports = function (e, t) {
    var n;
    return o(e) && ("function" == typeof (n = e.constructor) && (n === Array || o(n.prototype)) || r(n) && null === (n = n[i])) && (n = void 0), new (void 0 === n ? Array : n)(0 === t ? 0 : t);
  };
}, function (e, t, n) {
  var r = n(47);

  e.exports = Array.isArray || function (e) {
    return "Array" == r(e);
  };
}, function (e, t, n) {
  var r = n(22),
      o = n(28);

  e.exports = function (t, n) {
    try {
      o(r, t, n);
    } catch (e) {
      r[t] = n;
    }

    return n;
  };
}, function (e, t, n) {
  var r = n(78);
  e.exports = r && !Symbol.sham && "symbol" == _typeof(Symbol.iterator);
}, function (e, t, n) {
  n(112);
  var r = n(51);
  e.exports = r("Array", "includes");
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(79).includes,
      i = n(50);
  r({
    target: "Array",
    proto: !0,
    forced: !n(59)("indexOf", {
      ACCESSORS: !0,
      1: 0
    })
  }, {
    includes: function includes(e, t) {
      return o(this, e, 1 < arguments.length ? t : void 0);
    }
  }), i("includes");
}, function (e, t, n) {
  var r = n(57),
      o = Math.max,
      i = Math.min;

  e.exports = function (e, t) {
    var n = r(e);
    return n < 0 ? o(n + t, 0) : i(n, t);
  };
}, function (e, t, n) {
  n(115), n(132), n(90), n(134);
  var r = n(41);
  e.exports = r.Set;
}, function (e, t, n) {
  "use strict";

  var r = n(116),
      o = n(121);
  e.exports = r("Set", function (t) {
    return function (e) {
      return t(this, arguments.length ? e : void 0);
    };
  }, o);
}, function (e, t, n) {
  "use strict";

  var f = n(14),
      l = n(22),
      p = n(81),
      g = n(27),
      y = n(28),
      b = n(17),
      v = n(84),
      h = n(23),
      m = n(63),
      S = n(29).f,
      A = n(55).forEach,
      E = n(26),
      r = n(53),
      O = r.set,
      T = r.getterFor;

  e.exports = function (n, e, t) {
    var r,
        o = -1 !== n.indexOf("Map"),
        a = -1 !== n.indexOf("Weak"),
        i = o ? "set" : "add",
        c = l[n],
        u = c && c.prototype,
        s = {};

    if (E && "function" == typeof c && (a || u.forEach && !g(function () {
      new c().entries().next();
    }))) {
      r = e(function (e, t) {
        O(v(e, r, n), {
          type: n,
          collection: new c()
        }), null != t && b(t, e[i], e, o);
      });
      var d = T(n);
      A(["add", "clear", "delete", "forEach", "get", "has", "set", "keys", "values", "entries"], function (o) {
        var i = "add" == o || "set" == o;
        o in u && (!a || "clear" != o) && y(r.prototype, o, function (e, t) {
          var n = d(this).collection;
          if (!i && a && !h(e)) return "get" == o && void 0;
          var r = n[o](0 === e ? 0 : e, t);
          return i ? this : r;
        });
      }), a || S(r.prototype, "size", {
        configurable: !0,
        get: function get() {
          return d(this).collection.size;
        }
      });
    } else r = t.getConstructor(e, n, o, i), p.REQUIRED = !0;

    return m(r, n, !1, !0), s[n] = r, f({
      global: !0,
      forced: !0
    }, s), a || t.setStrong(r, n, o), r;
  };
}, function (e, t, n) {
  var r = n(27);
  e.exports = !r(function () {
    return Object.isExtensible(Object.preventExtensions({}));
  });
}, function (e, t, n) {
  "use strict";

  var r = n(62),
      o = n(61);
  e.exports = r ? {}.toString : function () {
    return "[object " + o(this) + "]";
  };
}, function (e, t, n) {
  var r = n(22),
      o = n(120),
      i = r.WeakMap;
  e.exports = "function" == typeof i && /native code/.test(o(i));
}, function (e, t, n) {
  var r = n(77),
      o = Function.toString;
  "function" != typeof r.inspectSource && (r.inspectSource = function (e) {
    return o.call(e);
  }), e.exports = r.inspectSource;
}, function (e, t, n) {
  "use strict";

  var s = n(29).f,
      d = n(85),
      f = n(126),
      l = n(21),
      p = n(84),
      g = n(17),
      a = n(65),
      c = n(131),
      y = n(26),
      b = n(81).fastKey,
      r = n(53),
      v = r.set,
      h = r.getterFor;
  e.exports = {
    getConstructor: function getConstructor(e, n, r, o) {
      function i(e, t, n) {
        var r,
            o,
            i = c(e),
            a = u(e, t);
        return a ? a.value = n : (i.last = a = {
          index: o = b(t, !0),
          key: t,
          value: n,
          previous: r = i.last,
          next: void 0,
          removed: !1
        }, i.first || (i.first = a), r && (r.next = a), y ? i.size++ : e.size++, "F" !== o && (i.index[o] = a)), e;
      }

      var a = e(function (e, t) {
        p(e, a, n), v(e, {
          type: n,
          index: d(null),
          first: void 0,
          last: void 0,
          size: 0
        }), y || (e.size = 0), null != t && g(t, e[o], e, r);
      }),
          c = h(n),
          u = function u(e, t) {
        var n,
            r = c(e),
            o = b(t);
        if ("F" !== o) return r.index[o];

        for (n = r.first; n; n = n.next) {
          if (n.key == t) return n;
        }
      };

      return f(a.prototype, {
        clear: function clear() {
          for (var e = c(this), t = e.index, n = e.first; n;) {
            n.removed = !0, n.previous && (n.previous = n.previous.next = void 0), delete t[n.index], n = n.next;
          }

          e.first = e.last = void 0, y ? e.size = 0 : this.size = 0;
        },
        "delete": function _delete(e) {
          var t = c(this),
              n = u(this, e);

          if (n) {
            var r = n.next,
                o = n.previous;
            delete t.index[n.index], n.removed = !0, o && (o.next = r), r && (r.previous = o), t.first == n && (t.first = r), t.last == n && (t.last = o), y ? t.size-- : this.size--;
          }

          return !!n;
        },
        forEach: function forEach(e, t) {
          for (var n, r = c(this), o = l(e, 1 < arguments.length ? t : void 0, 3); n = n ? n.next : r.first;) {
            for (o(n.value, n.key, this); n && n.removed;) {
              n = n.previous;
            }
          }
        },
        has: function has(e) {
          return !!u(this, e);
        }
      }), f(a.prototype, r ? {
        get: function get(e) {
          var t = u(this, e);
          return t && t.value;
        },
        set: function set(e, t) {
          return i(this, 0 === e ? 0 : e, t);
        }
      } : {
        add: function add(e) {
          return i(this, e = 0 === e ? 0 : e, e);
        }
      }), y && s(a.prototype, "size", {
        get: function get() {
          return c(this).size;
        }
      }), a;
    },
    setStrong: function setStrong(e, t, n) {
      var r = t + " Iterator",
          o = h(t),
          i = h(r);
      a(e, t, function (e, t) {
        v(this, {
          type: r,
          target: e,
          state: o(e),
          kind: t,
          last: void 0
        });
      }, function () {
        for (var e = i(this), t = e.kind, n = e.last; n && n.removed;) {
          n = n.previous;
        }

        return e.target && (e.last = n = n ? n.next : e.state.first) ? "keys" == t ? {
          value: n.key,
          done: !1
        } : "values" == t ? {
          value: n.value,
          done: !1
        } : {
          value: [n.key, n.value],
          done: !1
        } : {
          value: e.target = void 0,
          done: !0
        };
      }, n ? "entries" : "values", !n, !0), c(t);
    }
  };
}, function (e, t, n) {
  var r = n(26),
      a = n(29),
      c = n(15),
      u = n(123);
  e.exports = r ? Object.defineProperties : function (e, t) {
    c(e);

    for (var n, r = u(t), o = r.length, i = 0; i < o;) {
      a.f(e, n = r[i++], t[n]);
    }

    return e;
  };
}, function (e, t, n) {
  var r = n(124),
      o = n(86);

  e.exports = Object.keys || function (e) {
    return r(e, o);
  };
}, function (e, t, n) {
  var a = n(24),
      c = n(46),
      u = n(79).indexOf,
      s = n(52);

  e.exports = function (e, t) {
    var n,
        r = c(e),
        o = 0,
        i = [];

    for (n in r) {
      !a(s, n) && a(r, n) && i.push(n);
    }

    for (; t.length > o;) {
      a(r, n = t[o++]) && (~u(i, n) || i.push(n));
    }

    return i;
  };
}, function (e, t, n) {
  var r = n(25);
  e.exports = r("document", "documentElement");
}, function (e, t, n) {
  var o = n(87);

  e.exports = function (e, t, n) {
    for (var r in t) {
      n && n.unsafe && e[r] ? e[r] = t[r] : o(e, r, t[r], n);
    }

    return e;
  };
}, function (e, t, n) {
  "use strict";

  function o() {
    return this;
  }

  var i = n(88).IteratorPrototype,
      a = n(85),
      c = n(45),
      u = n(63),
      s = n(36);

  e.exports = function (e, t, n) {
    var r = t + " Iterator";
    return e.prototype = a(i, {
      next: c(1, n)
    }), u(e, r, !1, !0), s[r] = o, e;
  };
}, function (e, t, n) {
  var r = n(27);
  e.exports = !r(function () {
    function e() {}

    return e.prototype.constructor = null, Object.getPrototypeOf(new e()) !== e.prototype;
  });
}, function (e, t, n) {
  var o = n(15),
      i = n(130);
  e.exports = Object.setPrototypeOf || ("__proto__" in {} ? function () {
    var n,
        r = !1,
        e = {};

    try {
      (n = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(e, []), r = e instanceof Array;
    } catch (e) {}

    return function (e, t) {
      return o(e), i(t), r ? n.call(e, t) : e.__proto__ = t, e;
    };
  }() : void 0);
}, function (e, t, n) {
  var r = n(23);

  e.exports = function (e) {
    if (!r(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype");
    return e;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(25),
      o = n(29),
      i = n(19),
      a = n(26),
      c = i("species");

  e.exports = function (e) {
    var t = r(e),
        n = o.f;
    a && t && !t[c] && n(t, c, {
      configurable: !0,
      get: function get() {
        return this;
      }
    });
  };
}, function (e, t) {}, function (e, t, n) {
  function r(c) {
    return function (e, t) {
      var n,
          r,
          o = String(s(e)),
          i = u(t),
          a = o.length;
      return i < 0 || a <= i ? c ? "" : void 0 : (n = o.charCodeAt(i)) < 55296 || 56319 < n || i + 1 === a || (r = o.charCodeAt(i + 1)) < 56320 || 57343 < r ? c ? o.charAt(i) : n : c ? o.slice(i, i + 2) : r - 56320 + (n - 55296 << 10) + 65536;
    };
  }

  var u = n(57),
      s = n(48);
  e.exports = {
    codeAt: r(!1),
    charAt: r(!0)
  };
}, function (e, t, n) {
  n(135);
  var r = n(136),
      o = n(22),
      i = n(61),
      a = n(28),
      c = n(36),
      u = n(19)("toStringTag");

  for (var s in r) {
    var d = o[s],
        f = d && d.prototype;
    f && i(f) !== u && a(f, u, s), c[s] = c.Array;
  }
}, function (e, t, n) {
  "use strict";

  var r = n(46),
      o = n(50),
      i = n(36),
      a = n(53),
      c = n(65),
      u = "Array Iterator",
      s = a.set,
      d = a.getterFor(u);
  e.exports = c(Array, "Array", function (e, t) {
    s(this, {
      type: u,
      target: r(e),
      index: 0,
      kind: t
    });
  }, function () {
    var e = d(this),
        t = e.target,
        n = e.kind,
        r = e.index++;
    return !t || r >= t.length ? {
      value: e.target = void 0,
      done: !0
    } : "keys" == n ? {
      value: r,
      done: !1
    } : "values" == n ? {
      value: t[r],
      done: !1
    } : {
      value: [r, t[r]],
      done: !1
    };
  }, "values"), i.Arguments = i.Array, o("keys"), o("values"), o("entries");
}, function (e, t) {
  e.exports = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };
}, function (e, t, n) {
  n(14)({
    target: "Set",
    stat: !0
  }, {
    from: n(138)
  });
}, function (e, t, n) {
  "use strict";

  var s = n(18),
      d = n(21),
      f = n(17);

  e.exports = function (e, t, n) {
    var r,
        o,
        i,
        a,
        c = arguments.length,
        u = 1 < c ? t : void 0;
    return s(this), (r = void 0 !== u) && s(u), null == e ? new this() : (o = [], r ? (i = 0, a = d(u, 2 < c ? n : void 0, 2), f(e, function (e) {
      o.push(a(e, i++));
    })) : f(e, o.push, o), new this(o));
  };
}, function (e, t, n) {
  n(14)({
    target: "Set",
    stat: !0
  }, {
    of: n(140)
  });
}, function (e, t, n) {
  "use strict";

  e.exports = function () {
    for (var e = arguments.length, t = new Array(e); e--;) {
      t[e] = arguments[e];
    }

    return new this(t);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(142);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    addAll: function addAll() {
      return i.apply(this, arguments);
    }
  });
}, function (e, t, n) {
  "use strict";

  var o = n(15),
      i = n(18);

  e.exports = function () {
    for (var e = o(this), t = i(e.add), n = 0, r = arguments.length; n < r; n++) {
      t.call(e, arguments[n]);
    }

    return e;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(144);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    deleteAll: function deleteAll() {
      return i.apply(this, arguments);
    }
  });
}, function (e, t, n) {
  "use strict";

  var a = n(15),
      c = n(18);

  e.exports = function () {
    for (var e, t = a(this), n = c(t["delete"]), r = !0, o = 0, i = arguments.length; o < i; o++) {
      e = n.call(t, arguments[o]), r = r && e;
    }

    return !!r;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(15),
      a = n(21),
      c = n(34),
      u = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    every: function every(e, t) {
      var n = i(this),
          r = c(n),
          o = a(e, 1 < arguments.length ? t : void 0, 3);
      return !u(r, function (e) {
        if (!o(e, e, n)) return u.stop();
      }, void 0, !1, !0).stopped;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(25),
      a = n(15),
      c = n(18),
      u = n(37),
      s = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    difference: function difference(e) {
      var t = a(this),
          n = new (u(t, i("Set")))(t),
          r = c(n["delete"]);
      return s(e, function (e) {
        r.call(n, e);
      }), n;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      c = n(25),
      u = n(15),
      s = n(18),
      d = n(21),
      f = n(37),
      l = n(34),
      p = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    filter: function filter(e, t) {
      var n = u(this),
          r = l(n),
          o = d(e, 1 < arguments.length ? t : void 0, 3),
          i = new (f(n, c("Set")))(),
          a = s(i.add);
      return p(r, function (e) {
        o(e, e, n) && a.call(i, e);
      }, void 0, !1, !0), i;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(15),
      a = n(21),
      c = n(34),
      u = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    find: function find(e, t) {
      var n = i(this),
          r = c(n),
          o = a(e, 1 < arguments.length ? t : void 0, 3);
      return u(r, function (e) {
        if (o(e, e, n)) return u.stop(e);
      }, void 0, !1, !0).result;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(25),
      a = n(15),
      c = n(18),
      u = n(37),
      s = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    intersection: function intersection(e) {
      var t = a(this),
          n = new (u(t, i("Set")))(),
          r = c(t.has),
          o = c(n.add);
      return s(e, function (e) {
        r.call(t, e) && o.call(n, e);
      }), n;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(15),
      a = n(18),
      c = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    isDisjointFrom: function isDisjointFrom(e) {
      var t = i(this),
          n = a(t.has);
      return !c(e, function (e) {
        if (!0 === n.call(t, e)) return c.stop();
      }).stopped;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(25),
      a = n(15),
      c = n(18),
      u = n(91),
      s = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    isSubsetOf: function isSubsetOf(e) {
      var t = u(this),
          n = a(e),
          r = n.has;
      return "function" != typeof r && (n = new (i("Set"))(e), r = c(n.has)), !s(t, function (e) {
        if (!1 === r.call(n, e)) return s.stop();
      }, void 0, !1, !0).stopped;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(15),
      a = n(18),
      c = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    isSupersetOf: function isSupersetOf(e) {
      var t = i(this),
          n = a(t.has);
      return !c(e, function (e) {
        if (!1 === n.call(t, e)) return c.stop();
      }).stopped;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(15),
      a = n(34),
      c = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    join: function join(e) {
      var t = i(this),
          n = a(t),
          r = void 0 === e ? "," : String(e),
          o = [];
      return c(n, o.push, o, !1, !0), o.join(r);
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      c = n(25),
      u = n(15),
      s = n(18),
      d = n(21),
      f = n(37),
      l = n(34),
      p = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    map: function map(e, t) {
      var n = u(this),
          r = l(n),
          o = d(e, 1 < arguments.length ? t : void 0, 3),
          i = new (f(n, c("Set")))(),
          a = s(i.add);
      return p(r, function (e) {
        a.call(i, o(e, e, n));
      }, void 0, !1, !0), i;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      a = n(15),
      c = n(18),
      u = n(34),
      s = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    reduce: function reduce(t, e) {
      var n = a(this),
          r = u(n),
          o = arguments.length < 2,
          i = o ? void 0 : e;
      if (c(t), s(r, function (e) {
        i = o ? (o = !1, e) : t(i, e, e, n);
      }, void 0, !1, !0), o) throw TypeError("Reduce of empty set with no initial value");
      return i;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(15),
      a = n(21),
      c = n(34),
      u = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    some: function some(e, t) {
      var n = i(this),
          r = c(n),
          o = a(e, 1 < arguments.length ? t : void 0, 3);
      return u(r, function (e) {
        if (o(e, e, n)) return u.stop();
      }, void 0, !1, !0).stopped;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(25),
      a = n(15),
      c = n(18),
      u = n(37),
      s = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    symmetricDifference: function symmetricDifference(e) {
      var t = a(this),
          n = new (u(t, i("Set")))(t),
          r = c(n["delete"]),
          o = c(n.add);
      return s(e, function (e) {
        r.call(n, e) || o.call(n, e);
      }), n;
    }
  });
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(16),
      i = n(25),
      a = n(15),
      c = n(18),
      u = n(37),
      s = n(17);
  r({
    target: "Set",
    proto: !0,
    real: !0,
    forced: o
  }, {
    union: function union(e) {
      var t = a(this),
          n = new (u(t, i("Set")))(t);
      return s(e, c(n.add), n), n;
    }
  });
}, function (e, t, n) {
  n(90), n(160);
  var r = n(41);
  e.exports = r.Array.from;
}, function (e, t, n) {
  var r = n(14),
      o = n(161);
  r({
    target: "Array",
    stat: !0,
    forced: !n(163)(function (e) {
      Array.from(e);
    })
  }, {
    from: o
  });
}, function (e, t, n) {
  "use strict";

  var b = n(21),
      v = n(56),
      h = n(83),
      m = n(82),
      S = n(49),
      A = n(162),
      E = n(60);

  e.exports = function (e, t, n) {
    var r,
        o,
        i,
        a,
        c,
        u,
        s = v(e),
        d = "function" == typeof this ? this : Array,
        f = arguments.length,
        l = 1 < f ? t : void 0,
        p = void 0 !== l,
        g = E(s),
        y = 0;
    if (p && (l = b(l, 2 < f ? n : void 0, 2)), null == g || d == Array && m(g)) for (o = new d(r = S(s.length)); y < r; y++) {
      u = p ? l(s[y], y) : s[y], A(o, y, u);
    } else for (c = (a = g.call(s)).next, o = new d(); !(i = c.call(a)).done; y++) {
      u = p ? h(a, l, [i.value, y], !0) : i.value, A(o, y, u);
    }
    return o.length = y, o;
  };
}, function (e, t, n) {
  "use strict";

  var o = n(54),
      i = n(29),
      a = n(45);

  e.exports = function (e, t, n) {
    var r = o(t);
    r in e ? i.f(e, r, a(0, n)) : e[r] = n;
  };
}, function (e, t, n) {
  var o = n(19)("iterator"),
      i = !1;

  try {
    var r = 0,
        a = {
      next: function next() {
        return {
          done: !!r++
        };
      },
      "return": function _return() {
        i = !0;
      }
    };
    a[o] = function () {
      return this;
    }, Array.from(a, function () {
      throw 2;
    });
  } catch (e) {}

  e.exports = function (e, t) {
    if (!t && !i) return !1;
    var n = !1;

    try {
      var r = {};
      r[o] = function () {
        return {
          next: function next() {
            return {
              done: n = !0
            };
          }
        };
      }, e(r);
    } catch (e) {}

    return n;
  };
}, function (e, t) {
  e.exports = function e(t) {
    var n = Array.isArray(t) ? [] : {};

    for (var r in t) {
      var o = t[r];
      n[r] = o && "object" == _typeof(o) ? e(o) : o;
    }

    return n;
  };
}, function (e, t, n) {
  var f = n(93),
      l = n(167),
      o = n(168),
      p = n(169),
      g = n(172),
      y = n(178),
      b = Date.prototype.getTime;

  function v(e, t, n) {
    var r = n || {};
    return !(r.strict ? !o(e, t) : e !== t) || (!e || !t || "object" != _typeof(e) && "object" != _typeof(t) ? r.strict ? o(e, t) : e == t : function (e, t, n) {
      var r, o;
      if (_typeof(e) != _typeof(t)) return !1;
      if (h(e) || h(t)) return !1;
      if (e.prototype !== t.prototype) return !1;
      if (l(e) !== l(t)) return !1;
      var i = p(e),
          a = p(t);
      if (i !== a) return !1;
      if (i || a) return e.source === t.source && g(e) === g(t);
      if (y(e) && y(t)) return b.call(e) === b.call(t);
      var c = m(e),
          u = m(t);
      if (c !== u) return !1;

      if (c || u) {
        if (e.length !== t.length) return !1;

        for (r = 0; r < e.length; r++) {
          if (e[r] !== t[r]) return !1;
        }

        return !0;
      }

      if (_typeof(e) != _typeof(t)) return !1;

      try {
        var s = f(e),
            d = f(t);
      } catch (e) {
        return !1;
      }

      if (s.length !== d.length) return !1;

      for (s.sort(), d.sort(), r = s.length - 1; 0 <= r; r--) {
        if (s[r] != d[r]) return !1;
      }

      for (r = s.length - 1; 0 <= r; r--) {
        if (o = s[r], !v(e[o], t[o], n)) return !1;
      }

      return !0;
    }(e, t, r));
  }

  function h(e) {
    return null == e;
  }

  function m(e) {
    return !(!e || "object" != _typeof(e) || "number" != typeof e.length) && "function" == typeof e.copy && "function" == typeof e.slice && !(0 < e.length && "number" != typeof e[0]);
  }

  e.exports = v;
}, function (e, t, n) {
  "use strict";

  var r;

  if (!Object.keys) {
    var l = Object.prototype.hasOwnProperty,
        p = Object.prototype.toString,
        g = n(94),
        o = Object.prototype.propertyIsEnumerable,
        y = !o.call({
      toString: null
    }, "toString"),
        b = o.call(function () {}, "prototype"),
        v = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
        h = function h(e) {
      var t = e.constructor;
      return t && t.prototype === e;
    },
        i = {
      $applicationCache: !0,
      $console: !0,
      $external: !0,
      $frame: !0,
      $frameElement: !0,
      $frames: !0,
      $innerHeight: !0,
      $innerWidth: !0,
      $onmozfullscreenchange: !0,
      $onmozfullscreenerror: !0,
      $outerHeight: !0,
      $outerWidth: !0,
      $pageXOffset: !0,
      $pageYOffset: !0,
      $parent: !0,
      $scrollLeft: !0,
      $scrollTop: !0,
      $scrollX: !0,
      $scrollY: !0,
      $self: !0,
      $webkitIndexedDB: !0,
      $webkitStorageInfo: !0,
      $window: !0
    },
        m = function () {
      if ("undefined" == typeof window) return !1;

      for (var e in window) {
        try {
          if (!i["$" + e] && l.call(window, e) && null !== window[e] && "object" == _typeof(window[e])) try {
            h(window[e]);
          } catch (e) {
            return !0;
          }
        } catch (e) {
          return !0;
        }
      }

      return !1;
    }();

    r = function r(e) {
      var t = null !== e && "object" == _typeof(e),
          n = "[object Function]" === p.call(e),
          r = g(e),
          o = t && "[object String]" === p.call(e),
          i = [];

      if (!t && !n && !r) throw new TypeError("Object.keys called on a non-object");
      var a = b && n;
      if (o && 0 < e.length && !l.call(e, 0)) for (var c = 0; c < e.length; ++c) {
        i.push(String(c));
      }
      if (r && 0 < e.length) for (var u = 0; u < e.length; ++u) {
        i.push(String(u));
      } else for (var s in e) {
        a && "prototype" === s || !l.call(e, s) || i.push(String(s));
      }
      if (y) for (var d = function (e) {
        if ("undefined" == typeof window || !m) return h(e);

        try {
          return h(e);
        } catch (e) {
          return !1;
        }
      }(e), f = 0; f < v.length; ++f) {
        d && "constructor" === v[f] || !l.call(e, v[f]) || i.push(v[f]);
      }
      return i;
    };
  }

  e.exports = r;
}, function (e, t, n) {
  "use strict";

  function r(e) {
    return !(i && e && "object" == _typeof(e) && Symbol.toStringTag in e) && "[object Arguments]" === a.call(e);
  }

  function o(e) {
    return !!r(e) || null !== e && "object" == _typeof(e) && "number" == typeof e.length && 0 <= e.length && "[object Array]" !== a.call(e) && "[object Function]" === a.call(e.callee);
  }

  var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.toStringTag),
      a = Object.prototype.toString,
      c = function () {
    return r(arguments);
  }();

  r.isLegacyArguments = o, e.exports = c ? r : o;
}, function (e, t, n) {
  "use strict";

  function r(e) {
    return e != e;
  }

  e.exports = function (e, t) {
    return 0 === e && 0 === t ? 1 / e == 1 / t : e === t || !(!r(e) || !r(t));
  };
}, function (e, t, n) {
  "use strict";

  var r = n(170),
      o = RegExp.prototype.exec,
      i = Object.getOwnPropertyDescriptor,
      a = Object.prototype.toString,
      c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.toStringTag);

  e.exports = function (e) {
    if (!e || "object" != _typeof(e)) return !1;
    if (!c) return "[object RegExp]" === a.call(e);
    var t = i(e, "lastIndex");
    return !(!t || !r(t, "value")) && function (e) {
      try {
        var t = e.lastIndex;
        return e.lastIndex = 0, o.call(e), !0;
      } catch (e) {
        return !1;
      } finally {
        e.lastIndex = t;
      }
    }(e);
  };
}, function (e, t, n) {
  "use strict";

  var r = n(66);
  e.exports = r.call(Function.call, Object.prototype.hasOwnProperty);
}, function (e, t, n) {
  "use strict";

  var u = Array.prototype.slice,
      s = Object.prototype.toString;

  e.exports = function (t) {
    var n = this;
    if ("function" != typeof n || "[object Function]" !== s.call(n)) throw new TypeError("Function.prototype.bind called on incompatible " + n);

    for (var r, o = u.call(arguments, 1), e = Math.max(0, n.length - o.length), i = [], a = 0; a < e; a++) {
      i.push("$" + a);
    }

    if (r = Function("binder", "return function (" + i.join(",") + "){ return binder.apply(this,arguments); }")(function () {
      if (this instanceof r) {
        var e = n.apply(this, o.concat(u.call(arguments)));
        return Object(e) === e ? e : this;
      }

      return n.apply(t, o.concat(u.call(arguments)));
    }), n.prototype) {
      var c = function c() {};

      c.prototype = n.prototype, r.prototype = new c(), c.prototype = null;
    }

    return r;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(67),
      o = n(173),
      i = n(95),
      a = n(96),
      c = n(177),
      u = o(i);
  r(u, {
    getPolyfill: a,
    implementation: i,
    shim: c
  }), e.exports = u;
}, function (e, t, n) {
  "use strict";

  var r = n(66),
      o = n(174)("%Function%"),
      i = o.apply,
      a = o.call;
  e.exports = function () {
    return r.apply(a, arguments);
  }, e.exports.apply = function () {
    return r.apply(i, arguments);
  };
}, function (e, t, n) {
  "use strict";

  var r,
      c = TypeError,
      u = Object.getOwnPropertyDescriptor;
  if (u) try {
    u({}, "");
  } catch (e) {
    u = null;
  }

  function o() {
    throw new c();
  }

  var i = u ? function () {
    try {
      return o;
    } catch (e) {
      try {
        return u(arguments, "callee").get;
      } catch (e) {
        return o;
      }
    }
  }() : o,
      a = n(175)(),
      s = Object.getPrototypeOf || function (e) {
    return e.__proto__;
  },
      d = r,
      f = "undefined" == typeof Uint8Array ? r : s(Uint8Array),
      l = {
    "%Array%": Array,
    "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? r : ArrayBuffer,
    "%ArrayBufferPrototype%": "undefined" == typeof ArrayBuffer ? r : ArrayBuffer.prototype,
    "%ArrayIteratorPrototype%": a ? s([][Symbol.iterator]()) : r,
    "%ArrayPrototype%": Array.prototype,
    "%ArrayProto_entries%": Array.prototype.entries,
    "%ArrayProto_forEach%": Array.prototype.forEach,
    "%ArrayProto_keys%": Array.prototype.keys,
    "%ArrayProto_values%": Array.prototype.values,
    "%AsyncFromSyncIteratorPrototype%": r,
    "%AsyncFunction%": void 0,
    "%AsyncFunctionPrototype%": r,
    "%AsyncGenerator%": r,
    "%AsyncGeneratorFunction%": void 0,
    "%AsyncGeneratorPrototype%": r,
    "%AsyncIteratorPrototype%": d && a && Symbol.asyncIterator ? d[Symbol.asyncIterator]() : r,
    "%Atomics%": "undefined" == typeof Atomics ? r : Atomics,
    "%Boolean%": Boolean,
    "%BooleanPrototype%": Boolean.prototype,
    "%DataView%": "undefined" == typeof DataView ? r : DataView,
    "%DataViewPrototype%": "undefined" == typeof DataView ? r : DataView.prototype,
    "%Date%": Date,
    "%DatePrototype%": Date.prototype,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Error,
    "%ErrorPrototype%": Error.prototype,
    "%eval%": eval,
    "%EvalError%": EvalError,
    "%EvalErrorPrototype%": EvalError.prototype,
    "%Float32Array%": "undefined" == typeof Float32Array ? r : Float32Array,
    "%Float32ArrayPrototype%": "undefined" == typeof Float32Array ? r : Float32Array.prototype,
    "%Float64Array%": "undefined" == typeof Float64Array ? r : Float64Array,
    "%Float64ArrayPrototype%": "undefined" == typeof Float64Array ? r : Float64Array.prototype,
    "%Function%": Function,
    "%FunctionPrototype%": Function.prototype,
    "%Generator%": r,
    "%GeneratorFunction%": void 0,
    "%GeneratorPrototype%": r,
    "%Int8Array%": "undefined" == typeof Int8Array ? r : Int8Array,
    "%Int8ArrayPrototype%": "undefined" == typeof Int8Array ? r : Int8Array.prototype,
    "%Int16Array%": "undefined" == typeof Int16Array ? r : Int16Array,
    "%Int16ArrayPrototype%": "undefined" == typeof Int16Array ? r : Int8Array.prototype,
    "%Int32Array%": "undefined" == typeof Int32Array ? r : Int32Array,
    "%Int32ArrayPrototype%": "undefined" == typeof Int32Array ? r : Int32Array.prototype,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": a ? s(s([][Symbol.iterator]())) : r,
    "%JSON%": "object" == (typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) ? JSON : r,
    "%JSONParse%": "object" == (typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) ? JSON.parse : r,
    "%Map%": "undefined" == typeof Map ? r : Map,
    "%MapIteratorPrototype%": "undefined" != typeof Map && a ? s(new Map()[Symbol.iterator]()) : r,
    "%MapPrototype%": "undefined" == typeof Map ? r : Map.prototype,
    "%Math%": Math,
    "%Number%": Number,
    "%NumberPrototype%": Number.prototype,
    "%Object%": Object,
    "%ObjectPrototype%": Object.prototype,
    "%ObjProto_toString%": Object.prototype.toString,
    "%ObjProto_valueOf%": Object.prototype.valueOf,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": "undefined" == typeof Promise ? r : Promise,
    "%PromisePrototype%": "undefined" == typeof Promise ? r : Promise.prototype,
    "%PromiseProto_then%": "undefined" == typeof Promise ? r : Promise.prototype.then,
    "%Promise_all%": "undefined" == typeof Promise ? r : Promise.all,
    "%Promise_reject%": "undefined" == typeof Promise ? r : Promise.reject,
    "%Promise_resolve%": "undefined" == typeof Promise ? r : Promise.resolve,
    "%Proxy%": "undefined" == typeof Proxy ? r : Proxy,
    "%RangeError%": RangeError,
    "%RangeErrorPrototype%": RangeError.prototype,
    "%ReferenceError%": ReferenceError,
    "%ReferenceErrorPrototype%": ReferenceError.prototype,
    "%Reflect%": "undefined" == typeof Reflect ? r : Reflect,
    "%RegExp%": RegExp,
    "%RegExpPrototype%": RegExp.prototype,
    "%Set%": "undefined" == typeof Set ? r : Set,
    "%SetIteratorPrototype%": "undefined" != typeof Set && a ? s(new Set()[Symbol.iterator]()) : r,
    "%SetPrototype%": "undefined" == typeof Set ? r : Set.prototype,
    "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? r : SharedArrayBuffer,
    "%SharedArrayBufferPrototype%": "undefined" == typeof SharedArrayBuffer ? r : SharedArrayBuffer.prototype,
    "%String%": String,
    "%StringIteratorPrototype%": a ? s(""[Symbol.iterator]()) : r,
    "%StringPrototype%": String.prototype,
    "%Symbol%": a ? Symbol : r,
    "%SymbolPrototype%": a ? Symbol.prototype : r,
    "%SyntaxError%": SyntaxError,
    "%SyntaxErrorPrototype%": SyntaxError.prototype,
    "%ThrowTypeError%": i,
    "%TypedArray%": f,
    "%TypedArrayPrototype%": f ? f.prototype : r,
    "%TypeError%": c,
    "%TypeErrorPrototype%": c.prototype,
    "%Uint8Array%": "undefined" == typeof Uint8Array ? r : Uint8Array,
    "%Uint8ArrayPrototype%": "undefined" == typeof Uint8Array ? r : Uint8Array.prototype,
    "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? r : Uint8ClampedArray,
    "%Uint8ClampedArrayPrototype%": "undefined" == typeof Uint8ClampedArray ? r : Uint8ClampedArray.prototype,
    "%Uint16Array%": "undefined" == typeof Uint16Array ? r : Uint16Array,
    "%Uint16ArrayPrototype%": "undefined" == typeof Uint16Array ? r : Uint16Array.prototype,
    "%Uint32Array%": "undefined" == typeof Uint32Array ? r : Uint32Array,
    "%Uint32ArrayPrototype%": "undefined" == typeof Uint32Array ? r : Uint32Array.prototype,
    "%URIError%": URIError,
    "%URIErrorPrototype%": URIError.prototype,
    "%WeakMap%": "undefined" == typeof WeakMap ? r : WeakMap,
    "%WeakMapPrototype%": "undefined" == typeof WeakMap ? r : WeakMap.prototype,
    "%WeakSet%": "undefined" == typeof WeakSet ? r : WeakSet,
    "%WeakSetPrototype%": "undefined" == typeof WeakSet ? r : WeakSet.prototype
  },
      p = n(66).call(Function.call, String.prototype.replace),
      g = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
      y = /\\(\\)?/g;

  e.exports = function (e, t) {
    if ("string" != typeof e || 0 === e.length) throw new TypeError("intrinsic name must be a non-empty string");
    if (1 < arguments.length && "boolean" != typeof t) throw new TypeError('"allowMissing" argument must be a boolean');

    for (var o, n = (o = [], p(e, g, function (e, t, n, r) {
      o[o.length] = n ? p(r, y, "$1") : t || e;
    }), o), r = function (e, t) {
      if (!(e in l)) throw new SyntaxError("intrinsic " + e + " does not exist!");
      if (void 0 === l[e] && !t) throw new c("intrinsic " + e + " exists, but is not available. Please file an issue!");
      return l[e];
    }("%" + (0 < n.length ? n[0] : "") + "%", t), i = 1; i < n.length; i += 1) {
      if (null != r) if (u && i + 1 >= n.length) {
        var a = u(r, n[i]);
        if (!(t || n[i] in r)) throw new c("base intrinsic for " + e + " exists, but the property is not available.");
        r = a ? a.get || a.value : r[n[i]];
      } else r = r[n[i]];
    }

    return r;
  };
}, function (r, e, o) {
  "use strict";

  (function (e) {
    var t = e.Symbol,
        n = o(176);

    r.exports = function () {
      return "function" == typeof t && "function" == typeof Symbol && "symbol" == _typeof(t("foo")) && "symbol" == _typeof(Symbol("bar")) && n();
    };
  }).call(e, o(33));
}, function (e, t, n) {
  "use strict";

  e.exports = function () {
    if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return !1;
    if ("symbol" == _typeof(Symbol.iterator)) return !0;
    var e = {},
        t = Symbol("test"),
        n = Object(t);
    if ("string" == typeof t) return !1;
    if ("[object Symbol]" !== Object.prototype.toString.call(t)) return !1;
    if ("[object Symbol]" !== Object.prototype.toString.call(n)) return !1;

    for (t in e[t] = 42, e) {
      return !1;
    }

    if ("function" == typeof Object.keys && 0 !== Object.keys(e).length) return !1;
    if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length) return !1;
    var r = Object.getOwnPropertySymbols(e);
    if (1 !== r.length || r[0] !== t) return !1;
    if (!Object.prototype.propertyIsEnumerable.call(e, t)) return !1;

    if ("function" == typeof Object.getOwnPropertyDescriptor) {
      var o = Object.getOwnPropertyDescriptor(e, t);
      if (42 !== o.value || !0 !== o.enumerable) return !1;
    }

    return !0;
  };
}, function (e, t, n) {
  "use strict";

  var r = n(67).supportsDescriptors,
      o = n(96),
      i = Object.getOwnPropertyDescriptor,
      a = Object.defineProperty,
      c = TypeError,
      u = Object.getPrototypeOf,
      s = /a/;

  e.exports = function () {
    if (!r || !u) throw new c("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
    var e = o(),
        t = u(s),
        n = i(t, "flags");
    return n && n.get === e || a(t, "flags", {
      configurable: !0,
      enumerable: !1,
      get: e
    }), e;
  };
}, function (e, t, n) {
  "use strict";

  var r = Date.prototype.getDay,
      o = Object.prototype.toString,
      i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.toStringTag);

  e.exports = function (e) {
    return "object" == _typeof(e) && null !== e && (i ? function (e) {
      try {
        return r.call(e), !0;
      } catch (e) {
        return !1;
      }
    }(e) : "[object Date]" === o.call(e));
  };
}, function (e, t, n) {
  "use strict";

  t.a = function (e, t, n, r, o) {
    for (t = t.split ? t.split(".") : t, r = 0; r < t.length; r++) {
      e = e ? e[t[r]] : o;
    }

    return e === o ? n : e;
  };
}, function (e, t, n) {
  "use strict";

  t.a = function (e, t, n) {
    t.split && (t = t.split("."));

    for (var r, o = 0, i = t.length, a = e; o < i; ++o) {
      r = a[t[o]], a = a[t[o]] = o === i - 1 ? n : null != r ? r : !~t[o + 1].indexOf(".") && -1 < +t[o + 1] ? [] : {};
    }
  };
}, function (e, t) {
  h.SYNC = 1, h.ASYNC = 2, h.QUEUE = 4;
  var g = "fun-hooks";
  var n = Object.freeze({
    useProxy: !0,
    ready: 0
  }),
      y = new WeakMap(),
      r = "2,1,0" === [1].reduce(function (e, t, n) {
    return [e, t, n];
  }, 2).toString() ? Array.prototype.reduce : function (e, t) {
    var n,
        r = Object(this),
        o = r.length >>> 0,
        i = 0;
    if (t) n = t;else {
      for (; i < o && !(i in r);) {
        i++;
      }

      n = r[i++];
    }

    for (; i < o;) {
      i in r && (n = e(n, r[i], i, r)), i++;
    }

    return n;
  };

  function b(e, t) {
    return Array.prototype.slice.call(e, t);
  }

  var v = Object.assign || function (e) {
    return r.call(b(arguments, 1), function (t, n) {
      return n && Object.keys(n).forEach(function (e) {
        t[e] = n[e];
      }), t;
    }, e);
  };

  function h(u) {
    var s,
        e = {},
        d = [];

    function t(e, t) {
      return "function" == typeof e ? f.call(null, "sync", e, t) : "string" == typeof e && "function" == typeof t ? f.apply(null, arguments) : "object" == _typeof(e) ? function (i, e, a) {
        var t = !0;
        void 0 === e && (e = Object.getOwnPropertyNames(i), t = !1);
        var c = {},
            n = ["constructor"];

        for (; (e = e.filter(function (e) {
          return !("function" != typeof i[e] || -1 !== n.indexOf(e) || e.match(/^_/));
        })).forEach(function (e) {
          var t = e.split(":"),
              n = t[0],
              r = t[1] || "sync";

          if (!c[n]) {
            var o = i[n];
            c[n] = i[n] = f(r, o, a ? [a, n] : void 0);
          }
        }), i = Object.getPrototypeOf(i), t && i;) {
          ;
        }

        return c;
      }.apply(null, arguments) : void 0;
    }

    function l(i) {
      var a = Array.isArray(i) ? i : i.split(".");
      return r.call(a, function (t, n, e) {
        var r = t[n],
            o = !1;
        return r || (e === a.length - 1 ? (s || d.push(function () {
          o || console.warn(g + ": referenced '" + i + "' but it was never created");
        }), t[n] = p(function (e) {
          t[n] = e, o = !0;
        })) : t[n] = {});
      }, e);
    }

    function p(r) {
      var i = [],
          a = [],
          c = function c() {},
          e = {
        before: function before(e, t) {
          return n.call(this, i, "before", e, t);
        },
        after: function after(e, t) {
          return n.call(this, a, "after", e, t);
        },
        getHooks: function getHooks(n) {
          var e = i.concat(a);
          return "object" == _typeof(n) && (e = e.filter(function (t) {
            return Object.keys(n).every(function (e) {
              return t[e] === n[e];
            });
          })), v(e, {
            remove: function remove() {
              return e.forEach(function (e) {
                e.remove();
              }), this;
            }
          });
        },
        removeAll: function removeAll() {
          return this.getHooks().remove();
        }
      },
          t = {
        install: function install(e, t, n) {
          this.type = e, (c = n)(i, a), r && r(t);
        }
      };

      return y.set(e.after, t), e;

      function n(t, e, n, r) {
        var o = {
          hook: n,
          type: e,
          priority: r || 10,
          remove: function remove() {
            var e = t.indexOf(o);
            -1 !== e && (t.splice(e, 1), c(i, a));
          }
        };
        return t.push(o), t.sort(function (e, t) {
          return t.priority - e.priority;
        }), c(i, a), this;
      }
    }

    function f(f, e, t) {
      var n = e.after && y.get(e.after);

      if (n) {
        if (n.type !== f) throw g + ": recreated hookable with different type";
        return e;
      }

      var r,
          o,
          i = t ? l(t) : p(),
          a = {
        get: function get(e, t) {
          return i[t] || Reflect.get.apply(Reflect, arguments);
        }
      };
      return s || d.push(c), u.useProxy && "function" == typeof Proxy && Proxy.revocable ? o = new Proxy(e, a) : v(o = function o() {
        return a.apply ? a.apply(e, this, b(arguments)) : e.apply(this, arguments);
      }, i), y.get(o.after).install(f, o, function (e, t) {
        var s,
            d = [];
        r = e.length || t.length ? (e.forEach(n), s = d.push(void 0) - 1, t.forEach(n), function (n, r, e) {
          var o,
              i = 0,
              a = "async" === f && "function" == typeof e[e.length - 1] && e.pop();

          function c(e) {
            "sync" === f ? o = e : a && a.apply(null, arguments);
          }

          function u(e) {
            if (d[i]) {
              var t = b(arguments);
              return u.bail = c, t.unshift(u), d[i++].apply(r, t);
            }

            "sync" === f ? o = e : a && a.apply(null, arguments);
          }

          return d[s] = function () {
            var e = b(arguments, 1);
            "async" === f && a && (delete u.bail, e.push(u));
            var t = n.apply(r, e);
            "sync" === f && u(t);
          }, u.apply(null, e), o;
        }) : void 0;

        function n(e) {
          d.push(e.hook);
        }

        c();
      }), o;

      function c() {
        !s && ("sync" !== f || u.ready & h.SYNC) && ("async" !== f || u.ready & h.ASYNC) ? "sync" !== f && u.ready & h.QUEUE ? a.apply = function () {
          var e = arguments;
          d.push(function () {
            o.apply(e[1], e[2]);
          });
        } : a.apply = function () {
          throw g + ": hooked function not ready";
        } : a.apply = r;
      }
    }

    return (u = v({}, n, u)).ready ? t.ready = function () {
      s = !0, function (e) {
        for (var t; t = e.shift();) {
          t();
        }
      }(d);
    } : s = !0, t.get = l, t;
  }

  e.exports = h;
},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, function (e, t, n) {
  n(234);
  var r = n(51);
  e.exports = r("Array", "findIndex");
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(55).findIndex,
      i = n(50),
      a = n(59),
      c = "findIndex",
      u = !0,
      s = a(c);
  c in [] && Array(1)[c](function () {
    u = !1;
  }), r({
    target: "Array",
    proto: !0,
    forced: u || !s
  }, {
    findIndex: function findIndex(e, t) {
      return o(this, e, 1 < arguments.length ? t : void 0);
    }
  }), i(c);
},,,,, function (e, t, n) {
  "use strict";

  t.a = function () {
    window.addEventListener("message", c, !1);
  };

  var r = n(8),
      y = n.n(r),
      b = n(35),
      o = n(5),
      v = (n.n(o), n(0)),
      h = n(32),
      i = n(12),
      m = n.n(i),
      S = n(10),
      a = n(11),
      A = n.n(a),
      E = o.EVENTS.BID_WON;

  function c(e) {
    var t,
        n,
        r,
        o,
        i,
        a,
        c,
        u,
        s,
        d,
        f = e.message ? "message" : "data",
        l = {};

    try {
      l = JSON.parse(e[f]);
    } catch (e) {
      return;
    }

    if (l && l.adId) {
      var p = m()(h.a.getBidsReceived(), function (e) {
        return e.adId === l.adId;
      });

      if (p && "Prebid Request" === l.message && (t = p, n = l.adServerDomain, r = e.source, o = t.adId, i = t.ad, a = t.adUrl, c = t.width, u = t.height, s = t.renderer, d = t.cpm, Object(S.c)(s) ? Object(S.b)(s, t) : o && (function (e) {
        var i = e.adId,
            a = e.adUnitCode,
            r = e.width,
            o = e.height;

        function c(e) {
          var t,
              n,
              r = (t = i, n = a, window.googletag ? function (n) {
            return m()(window.googletag.pubads().getSlots(), function (t) {
              return m()(t.getTargetingKeys(), function (e) {
                return A()(t.getTargeting(e), n);
              });
            }).getSlotElementId();
          }(t) : window.apntag ? function (e) {
            var t = window.apntag.getTag(e);
            return t && t.targetId;
          }(n) : n),
              o = document.getElementById(r);
          return o && o.querySelector(e);
        }

        ["div", "iframe"].forEach(function (e) {
          var t = c(e + ':not([style*="display: none"])');

          if (t) {
            var n = t.style;
            n.width = r + "px", n.height = o + "px";
          } else Object(v.logWarn)("Unable to locate matching page element for adUnitCode ".concat(a, ".  Can't resize it to ad's dimensions.  Please review setup."));
        });
      }(t), r.postMessage(JSON.stringify({
        message: "Prebid Response",
        ad: Object(v.replaceAuctionPrice)(i, d),
        adUrl: Object(v.replaceAuctionPrice)(a, d),
        adId: o,
        width: c,
        height: u
      }), n)), h.a.addWinningBid(p), y.a.emit(E, p)), p && "Prebid Native" === l.message) {
        if ("assetRequest" === l.action) {
          var g = Object(b.c)(l, p);
          return void e.source.postMessage(JSON.stringify(g), e.origin);
        }

        if ("click" === Object(b.b)(l, p)) return;
        h.a.addWinningBid(p), y.a.emit(E, p);
      }
    }
  }
}, function (e, t, n) {
  "use strict";

  t.a = function (e) {
    var t;

    try {
      e = e || window.sessionStorage, t = JSON.parse(e.getItem(u));
    } catch (e) {}

    t && p(t, !0);
  };

  var r,
      o,
      i = n(3),
      a = n(0),
      c = n(39),
      u = "pbjs:debugging";

  function s(e) {
    Object(a.logMessage)("DEBUG: " + e);
  }

  function d(e) {
    Object(a.logWarn)("DEBUG: " + e);
  }

  function f(e) {
    r = function (e, t, n) {
      if (y(this.bidders, n.bidderCode)) return void d("bidder '".concat(n.bidderCode, "' excluded from auction by bidder overrides"));
      Array.isArray(this.bids) && this.bids.forEach(function (e) {
        g(e, n.bidderCode, t) || b(e, n, "bidder");
      });
      e(t, n);
    }.bind(e), c.c.before(r, 5), o = function (e, t) {
      var r = this,
          n = t.filter(function (e) {
        return !y(r.bidders, e.bidderCode) || (d("bidRequest '".concat(e.bidderCode, "' excluded from auction by bidder overrides")), !1);
      });
      Array.isArray(r.bidRequests) && n.forEach(function (n) {
        r.bidRequests.forEach(function (t) {
          n.bids.forEach(function (e) {
            g(t, n.bidderCode, e.adUnitCode) || b(t, e, "bidRequest");
          });
        });
      });
      e(n);
    }.bind(e), c.e.before(o, 5);
  }

  function l() {
    c.c.getHooks({
      hook: r
    }).remove(), c.e.getHooks({
      hook: o
    }).remove();
  }

  function p(e, t) {
    var n = 1 < arguments.length && void 0 !== t && t;
    i.b.setConfig({
      debug: !0
    }), l(), f(e), s("bidder overrides enabled".concat(n ? " from session" : ""));
  }

  function g(e, t, n) {
    return e.bidder && e.bidder !== t || !(!e.adUnitCode || e.adUnitCode === n);
  }

  function y(e, t) {
    return Array.isArray(e) && -1 === e.indexOf(t);
  }

  function b(n, e, r) {
    return Object.keys(n).filter(function (e) {
      return -1 === ["adUnitCode", "bidder"].indexOf(e);
    }).reduce(function (e, t) {
      return s("bidder overrides changed '".concat(e.adUnitCode, "/").concat(e.bidderCode, "' ").concat(r, ".").concat(t, " from '").concat(e[t], ".js' to '").concat(n[t], "'")), e[t] = n[t], e;
    }, e);
  }

  function v(e) {
    if (e.enabled) {
      try {
        window.sessionStorage.setItem(u, JSON.stringify(e));
      } catch (e) {}

      p(e);
    } else {
      l(), s("bidder overrides disabled");

      try {
        window.sessionStorage.removeItem(u);
      } catch (e) {}
    }
  }

  i.b.getConfig("debugging", function (e) {
    return v(e.debugging);
  });
},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, function (e, t, n) {
  var r = n(348);
  e.exports = r;
}, function (e, t, n) {
  n(349);
  var r = n(51);
  e.exports = r("String", "includes");
}, function (e, t, n) {
  "use strict";

  var r = n(14),
      o = n(350),
      i = n(48);
  r({
    target: "String",
    proto: !0,
    forced: !n(352)("includes")
  }, {
    includes: function includes(e, t) {
      return !!~String(i(this)).indexOf(o(e), 1 < arguments.length ? t : void 0);
    }
  });
}, function (e, t, n) {
  var r = n(351);

  e.exports = function (e) {
    if (r(e)) throw TypeError("The method doesn't accept regular expressions");
    return e;
  };
}, function (e, t, n) {
  var r = n(23),
      o = n(47),
      i = n(19)("match");

  e.exports = function (e) {
    var t;
    return r(e) && (void 0 !== (t = e[i]) ? !!t : "RegExp" == o(e));
  };
}, function (e, t, n) {
  var r = n(19)("match");

  e.exports = function (t) {
    var n = /./;

    try {
      "/./"[t](n);
    } catch (e) {
      try {
        return n[r] = !1, "/./"[t](n);
      } catch (e) {}
    }

    return !1;
  };
},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, function (e, t, n) {
  var r = n(463);
  e.exports = r;
}, function (e, t, n) {
  n(464);
  var r = n(41);
  e.exports = r.Number.isInteger;
}, function (e, t, n) {
  n(14)({
    target: "Number",
    stat: !0
  }, {
    isInteger: n(465)
  });
}, function (e, t, n) {
  var r = n(23),
      o = Math.floor;

  e.exports = function (e) {
    return !r(e) && isFinite(e) && o(e) === e;
  };
},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, function (e, t, n) {
  e.exports = n(70);
}]);
pbjsChunk([264], {
  269: function _(e, r, t) {
    e.exports = t(270);
  },
  270: function _(e, r, t) {
    "use strict";

    Object.defineProperty(r, "__esModule", {
      value: !0
    }), t.d(r, "spec", function () {
      return x;
    });
    var s = t(0),
        n = t(1),
        i = t(2);

    function o() {
      return (o = Object.assign || function (e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = arguments[r];

          for (var n in t) {
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          }
        }

        return e;
      }).apply(this, arguments);
    }

    function a() {
      var e = u(["dcn=", "&pos=", "&cmd=bid", ""]);
      return a = function a() {
        return e;
      }, e;
    }

    function c() {
      var e = u(["", "/bidRequest?"]);
      return c = function c() {
        return e;
      }, e;
    }

    function d() {
      var e = u(["", "/pubapi/3.0/", "/", "/", "/", "/ADTECH;v=2;cmd=bid;cors=yes;alias=", ";misc=", ";", ""]);
      return d = function d() {
        return e;
      }, e;
    }

    function u(e, r) {
      return r = r || e.slice(0), Object.freeze(Object.defineProperties(e, {
        raw: {
          value: Object.freeze(r)
        }
      }));
    }

    var p = {
      AOL: "aol",
      ONEMOBILE: "onemobile",
      ONEDISPLAY: "onedisplay"
    },
        l = {
      GET: "display-get"
    },
        m = {
      GET: "mobile-get",
      POST: "mobile-post"
    },
        f = {
      TAG: "iframe",
      TYPE: "iframe"
    },
        b = {
      TAG: "img",
      TYPE: "image"
    },
        v = P(d(), "host", "network", "placement", "pageid", "sizeid", "alias", "misc", "dynamicParams"),
        h = P(c(), "host"),
        g = P(a(), "dcn", "pos", "dynamicParams"),
        O = {
      us: "adserver-us.adtech.advertising.com",
      eu: "adserver-eu.adtech.advertising.com",
      as: "adserver-as.adtech.advertising.com"
    },
        y = "https",
        E = 1;

    function P(o) {
      for (var e = arguments.length, t = new Array(1 < e ? e - 1 : 0), r = 1; r < e; r++) {
        t[r - 1] = arguments[r];
      }

      return function () {
        for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) {
          n[r] = arguments[r];
        }

        var i = n[n.length - 1] || {},
            a = [o[0]];
        return t.forEach(function (e, r) {
          var t = s.isInteger(e) ? n[e] : i[e];
          a.push(t, o[r + 1]);
        }), a.join("");
      };
    }

    function I(e) {
      return e === p.AOL || e === p.ONEMOBILE;
    }

    function T(e) {
      if (I(e.bidder) && e.params.id && e.params.imp && e.params.imp[0]) {
        var r = e.params.imp[0];
        return r.id && r.tagid && (r.banner && r.banner.w && r.banner.h || r.video && r.video.mimes && r.video.minduration && r.video.maxduration);
      }
    }

    function S(e) {
      return I(e.bidder) && e.params.dcn && e.params.pos;
    }

    function C(e) {
      return ((r = e.bidder) === p.AOL || r === p.ONEDISPLAY) && e.params.placement && e.params.network;
      var r;
    }

    var x = {
      code: p.AOL,
      gvlid: 25,
      aliases: [p.ONEMOBILE, p.ONEDISPLAY],
      supportedMediaTypes: [i.b],
      isBidRequestValid: function isBidRequestValid(e) {
        return C(e) || S(r = e) || T(r);
        var r;
      },
      buildRequests: function buildRequests(e, r) {
        var n = this,
            i = {};
        return r && (i.gdpr = r.gdprConsent, i.uspConsent = r.uspConsent), e.map(function (e) {
          var r,
              t = S(r = e) ? m.GET : T(r) ? m.POST : C(r) ? l.GET : void 0;
          if (t) return n.formatBidRequest(t, e, i);
        });
      },
      interpretResponse: function interpretResponse(e, r) {
        var t = e.body;

        if (t) {
          var n = this._parseBidResponse(t, r);

          if (n) return n;
        } else s.logError("Empty bid response", r.bidderCode, t);
      },
      getUserSyncs: function getUserSyncs(e, r) {
        var t = !s.isEmpty(r) && r[0].body;
        return t && t.ext && t.ext.pixels ? this.parsePixelItems(t.ext.pixels) : [];
      },
      formatBidRequest: function formatBidRequest(e, r, t) {
        var n;

        switch (e) {
          case l.GET:
            n = {
              url: this.buildMarketplaceUrl(r, t),
              method: "GET",
              ttl: 60
            };
            break;

          case m.GET:
            n = {
              url: this.buildOneMobileGetUrl(r, t),
              method: "GET",
              ttl: 3600
            };
            break;

          case m.POST:
            n = {
              url: this.buildOneMobileBaseUrl(r),
              method: "POST",
              ttl: 3600,
              data: this.buildOpenRtbRequestData(r, t),
              options: {
                contentType: "application/json",
                customHeaders: {
                  "x-openrtb-version": "2.2"
                }
              }
            };
        }

        return n.bidderCode = r.bidder, n.bidId = r.bidId, n.userSyncOn = r.params.userSyncOn, n;
      },
      buildMarketplaceUrl: function buildMarketplaceUrl(e, r) {
        var t,
            n = e.params,
            i = n.server,
            a = n.region || "us";
        return O.hasOwnProperty(a) || (s.logWarn("Unknown region '".concat(a, "' for AOL bidder.")), a = "us"), t = i || O[a], n.region = a, this.applyProtocol(v({
          host: t,
          network: n.network,
          placement: parseInt(n.placement),
          pageid: n.pageId || 0,
          sizeid: n.sizeId || 0,
          alias: n.alias || s.getUniqueIdentifierStr(),
          misc: new Date().getTime(),
          dynamicParams: this.formatMarketplaceDynamicParams(n, r)
        }));
      },
      buildOneMobileGetUrl: function buildOneMobileGetUrl(e, r) {
        var t = e.params,
            n = t.dcn,
            i = t.pos,
            a = t.ext,
            o = this.buildOneMobileBaseUrl(e);

        if (n && i) {
          var s = this.formatOneMobileDynamicParams(a, r);
          o += g({
            dcn: n,
            pos: i,
            dynamicParams: s
          });
        }

        return o;
      },
      buildOneMobileBaseUrl: function buildOneMobileBaseUrl(e) {
        return this.applyProtocol(h({
          host: e.params.host || "c2shb.ssp.yahoo.com"
        }));
      },
      applyProtocol: function applyProtocol(e) {
        return /^https?:\/\//i.test(e) ? e : 0 === e.indexOf("//") ? "".concat(y, ":").concat(e) : "".concat(y, "://").concat(e);
      },
      formatMarketplaceDynamicParams: function formatMarketplaceDynamicParams(e, r) {
        var t = 0 < arguments.length && void 0 !== e ? e : {},
            n = 1 < arguments.length && void 0 !== r ? r : {},
            i = {};
        t.bidFloor && (i.bidfloor = t.bidFloor), o(i, this.formatKeyValues(t.keyValues)), o(i, this.formatConsentData(n));
        var a = "";
        return s._each(i, function (e, r) {
          a += "".concat(r, "=").concat(encodeURIComponent(e), ";");
        }), a;
      },
      formatOneMobileDynamicParams: function formatOneMobileDynamicParams(e, r) {
        var t = 0 < arguments.length && void 0 !== e ? e : {},
            n = 1 < arguments.length && void 0 !== r ? r : {};
        this.isSecureProtocol() && (t.secure = E), o(t, this.formatConsentData(n));
        var i = "";
        return s._each(t, function (e, r) {
          i += "&".concat(r, "=").concat(encodeURIComponent(e));
        }), i;
      },
      buildOpenRtbRequestData: function buildOpenRtbRequestData(e, r) {
        var t = 1 < arguments.length && void 0 !== r ? r : {},
            n = {
          id: e.params.id,
          imp: e.params.imp
        };
        return this.isEUConsentRequired(t) && (s.deepSetValue(n, "regs.ext.gdpr", E), t.gdpr.consentString && s.deepSetValue(n, "user.ext.consent", t.gdpr.consentString)), t.uspConsent && s.deepSetValue(n, "regs.ext.us_privacy", t.uspConsent), n;
      },
      isEUConsentRequired: function isEUConsentRequired(e) {
        return !!(e && e.gdpr && e.gdpr.gdprApplies);
      },
      formatKeyValues: function formatKeyValues(e) {
        var t = {};
        return s._each(e, function (e, r) {
          t["kv".concat(r)] = e;
        }), t;
      },
      formatConsentData: function formatConsentData(e) {
        var r = {};
        return this.isEUConsentRequired(e) && (r.gdpr = E, e.gdpr.consentString && (r.euconsent = e.gdpr.consentString)), e.uspConsent && (r.us_privacy = e.uspConsent), r;
      },
      parsePixelItems: function parsePixelItems(e) {
        var n = /\w*(?=\s)/,
            i = /src=("|')(.*?)\1/,
            a = [];

        if (e) {
          var r = e.match(/(img|iframe)[\s\S]*?src\s*=\s*("|')(.*?)\2/gi);
          r && r.forEach(function (e) {
            var r = e.match(n)[0],
                t = e.match(i)[2];
            r && r && a.push({
              type: r === b.TAG ? b.TYPE : f.TYPE,
              url: t
            });
          });
        }

        return a;
      },
      _parseBidResponse: function _parseBidResponse(e, r) {
        var t, n;

        try {
          t = e.seatbid[0].bid[0];
        } catch (e) {
          return;
        }

        if (t.ext && t.ext.encp) n = t.ext.encp;else if (null === (n = t.price) || isNaN(n)) return void s.logError("Invalid price in bid response", p.AOL, t);
        return {
          bidderCode: r.bidderCode,
          requestId: r.bidId,
          ad: t.adm,
          cpm: n,
          width: t.w,
          height: t.h,
          creativeId: t.crid || 0,
          pubapiId: e.id,
          currency: e.cur || "USD",
          dealId: t.dealid,
          netRevenue: !0,
          ttl: r.ttl
        };
      },
      isOneMobileBidder: I,
      isSecureProtocol: function isSecureProtocol() {
        return "https:" === document.location.protocol;
      }
    };
    Object(n.registerBidder)(x);
  }
}, [269]);
pbjsChunk([262], {
  277: function _(e, r, t) {
    e.exports = t(278);
  },
  278: function _(e, r, t) {
    "use strict";

    Object.defineProperty(r, "__esModule", {
      value: !0
    }), t.d(r, "spec", function () {
      return h;
    });

    var f = t(10),
        _ = t(0),
        k = t(3),
        v = t(1),
        g = t(2),
        p = t(32),
        a = t(12),
        I = t.n(a),
        n = t(11),
        x = t.n(n),
        y = t(43),
        i = t(9);

    function s(e) {
      return (s = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(e);
    }

    function b() {
      return (b = Object.assign || function (e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = arguments[r];

          for (var a in t) {
            Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
          }
        }

        return e;
      }).apply(this, arguments);
    }

    function C(e) {
      return function (e) {
        if (Array.isArray(e)) {
          for (var r = 0, t = new Array(e.length); r < e.length; r++) {
            t[r] = e[r];
          }

          return t;
        }
      }(e) || function (e) {
        if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
      }(e) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }();
    }

    var o = "appnexus",
        A = "https://ib.adnxs.com/ut/v3/prebid",
        c = ["id", "mimes", "minduration", "maxduration", "startdelay", "skippable", "playback_method", "frameworks"],
        w = ["age", "externalUid", "segments", "gender", "dnt", "language"],
        S = ["geo", "device_id"],
        T = ["enabled", "dongle", "member_id", "debug_timeout"],
        u = {
      body: "description",
      body2: "desc2",
      cta: "ctatext",
      image: {
        serverName: "main_image",
        requiredParams: {
          required: !0
        }
      },
      icon: {
        serverName: "icon",
        requiredParams: {
          required: !0
        }
      },
      sponsoredBy: "sponsored_by",
      privacyLink: "privacy_link",
      salePrice: "saleprice",
      displayUrl: "displayurl"
    },
        d = "<script",
        l = /\/\/cdn\.adnxs\.com\/v/,
        m = "trk.js",
        E = Object(i.b)(32, o),
        h = {
      code: o,
      gvlid: 32,
      aliases: ["appnexusAst", "brealtime", "emxdigital", "pagescience", "defymedia", "gourmetads", "matomy", "featureforward", "oftmedia", "districtm", "adasta", "beintoo"],
      supportedMediaTypes: [g.b, g.d, g.c],
      isBidRequestValid: function isBidRequestValid(e) {
        return !!(e.params.placementId || e.params.member && e.params.invCode);
      },
      buildRequests: function buildRequests(e, r) {
        var a = e.map(P),
            t = I()(e, N),
            n = {};
        !0 === k.b.getConfig("coppa") && (n = {
          coppa: !0
        }), t && Object.keys(t.params.user).filter(function (e) {
          return x()(w, e);
        }).forEach(function (e) {
          var r = _.convertCamelToUnderscore(e);

          n[r] = t.params.user[e];
        });
        var i,
            s = I()(e, z);
        s && s.params && s.params.app && (i = {}, Object.keys(s.params.app).filter(function (e) {
          return x()(S, e);
        }).forEach(function (e) {
          return i[e] = s.params.app[e];
        }));
        var o,
            d = I()(e, M);
        d && d.params && s.params.app && s.params.app.id && (o = {
          appid: d.params.app.id
        });
        var p = {},
            c = {},
            u = E.getCookie("apn_prebid_debug") || null;
        if (u) try {
          p = JSON.parse(u);
        } catch (e) {
          _.logError("AppNexus Debug Auction Cookie Error:\n\n" + e);
        } else {
          var l = I()(e, B);
          l && l.debug && (p = l.debug);
        }
        p && p.enabled && Object.keys(p).filter(function (e) {
          return x()(T, e);
        }).forEach(function (e) {
          c[e] = p[e];
        });
        var m = I()(e, q),
            f = m ? parseInt(m.params.member, 10) : 0,
            v = e[0].schain,
            g = {
          tags: C(a),
          user: n,
          sdk: {
            source: "pbjs",
            version: "3.20.0"
          },
          schain: v
        };

        if (0 < f && (g.member_id = f), s && (g.device = i), d && (g.app = o), k.b.getConfig("adpod.brandCategoryExclusion") && (g.brand_category_uniqueness = !0), c.enabled && (g.debug = c, _.logInfo("AppNexus Debug Auction Settings:\n\n" + JSON.stringify(c, null, 4))), r && r.gdprConsent && (g.gdpr_consent = {
          consent_string: r.gdprConsent.consentString,
          consent_required: r.gdprConsent.gdprApplies
        }), r && r.uspConsent && (g.us_privacy = r.uspConsent), r && r.refererInfo) {
          var y = {
            rd_ref: encodeURIComponent(r.refererInfo.referer),
            rd_top: r.refererInfo.reachedTop,
            rd_ifs: r.refererInfo.numIframes,
            rd_stk: r.refererInfo.stack.map(function (e) {
              return encodeURIComponent(e);
            }).join(",")
          };
          g.referrer_detection = y;
        }

        I()(e, D) && e.filter(D).forEach(function (r) {
          var e = function (e, r) {
            var t = r.mediaTypes.video,
                a = t.durationRangeSec,
                n = t.requireExactDuration,
                i = function (e) {
              var r = e.adPodDurationSec,
                  t = e.durationRangeSec,
                  a = e.requireExactDuration,
                  n = _.getMinValueFromArray(t),
                  i = Math.floor(r / n);

              return a ? Math.max(i, t.length) : i;
            }(r.mediaTypes.video),
                s = _.getMaxValueFromArray(a),
                o = e.filter(function (e) {
              return e.uuid === r.bidId;
            }),
                d = _.fill.apply(_, C(o).concat([i]));

            if (n) {
              var p = Math.ceil(i / a.length),
                  c = _.chunk(d, p);

              a.forEach(function (r, e) {
                c[e].map(function (e) {
                  V(e, "minduration", r), V(e, "maxduration", r);
                });
              });
            } else d.map(function (e) {
              return V(e, "maxduration", s);
            });

            return d;
          }(a, r),
              t = g.tags.filter(function (e) {
            return e.uuid !== r.bidId;
          });

          g.tags = [].concat(C(t), C(e));
        });

        var b = _.deepAccess(e[0], "userId.criteoId");

        if (b) {
          var h = [];
          h.push({
            provider: "criteo",
            user_id: b
          }), g.tpuids = h;
        }

        return function (e, t) {
          var a = [],
              n = {};
          !function (e) {
            var r = !0;
            e && e.gdprConsent && e.gdprConsent.gdprApplies && 2 === e.gdprConsent.apiVersion && (r = !(!0 !== _.deepAccess(e.gdprConsent, "vendorData.purpose.consents.1")));
            return r;
          }(t) && (n = {
            withCredentials: !1
          });

          if (15 < e.tags.length) {
            var i = _.deepClone(e);

            _.chunk(e.tags, 15).forEach(function (e) {
              i.tags = e;
              var r = JSON.stringify(i);
              a.push({
                method: "POST",
                url: A,
                data: r,
                bidderRequest: t,
                options: n
              });
            });
          } else {
            var r = JSON.stringify(e);
            a = {
              method: "POST",
              url: A,
              data: r,
              bidderRequest: t,
              options: n
            };
          }

          return a;
        }(g, r);
      },
      interpretResponse: function interpretResponse(e, r) {
        var i = this,
            s = r.bidderRequest;
        e = e.body;
        var o = [];

        if (!e || e.error) {
          var t = "in response for ".concat(s.bidderCode, " adapter");
          return e && e.error && (t += ": ".concat(e.error)), _.logError(t), o;
        }

        if (e.tags && e.tags.forEach(function (e) {
          var r,
              t,
              a = (r = e) && r.ads && r.ads.length && I()(r.ads, function (e) {
            return e.rtb;
          });

          if (a && 0 !== a.cpm && x()(i.supportedMediaTypes, a.ad_type)) {
            var n = function (r, e, t) {
              var a = _.getBidRequest(r.uuid, [t]),
                  n = {
                requestId: r.uuid,
                cpm: e.cpm,
                creativeId: e.creative_id,
                dealId: e.deal_id,
                currency: "USD",
                netRevenue: !0,
                ttl: 300,
                adUnitCode: a.adUnitCode,
                appnexus: {
                  buyerMemberId: e.buyer_member_id,
                  dealPriority: e.deal_priority,
                  dealCode: e.deal_code
                }
              };

              e.advertiser_id && (n.meta = b({}, n.meta, {
                advertiserId: e.advertiser_id
              }));

              if (e.rtb.video) {
                switch (b(n, {
                  width: e.rtb.video.player_width,
                  height: e.rtb.video.player_height,
                  vastImpUrl: e.notify_url,
                  ttl: 3600
                }), _.deepAccess(a, "mediaTypes.video.context")) {
                  case g.a:
                    var i = Object(v.getIabSubCategory)(a.bidder, e.brand_category_id);
                    n.meta = b({}, n.meta, {
                      iabSubCatId: i
                    });
                    var s = e.deal_priority;
                    n.video = {
                      context: g.a,
                      durationSeconds: Math.floor(e.rtb.video.duration_ms / 1e3),
                      dealTier: s
                    }, n.vastUrl = e.rtb.video.asset_url;
                    break;

                  case y.b:
                    if (n.adResponse = r, n.adResponse.ad = n.adResponse.ads[0], n.adResponse.ad.video = n.adResponse.ad.rtb.video, n.vastXml = e.rtb.video.content, e.renderer_url) {
                      var o = I()(t.bids, function (e) {
                        return e.bidId === r.uuid;
                      }),
                          d = _.deepAccess(o, "renderer.options");

                      n.renderer = function (e, r) {
                        var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {},
                            a = f.a.install({
                          id: r.renderer_id,
                          url: r.renderer_url,
                          config: t,
                          loaded: !1,
                          adUnitCode: e
                        });

                        try {
                          a.setRender(J);
                        } catch (e) {
                          _.logWarn("Prebid Error calling setRender on renderer", e);
                        }

                        return a.setEventHandlers({
                          impression: function impression() {
                            return _.logMessage("AppNexus outstream video impression event");
                          },
                          loaded: function loaded() {
                            return _.logMessage("AppNexus outstream video loaded event");
                          },
                          ended: function ended() {
                            _.logMessage("AppNexus outstream renderer video event"), document.querySelector("#".concat(e)).style.display = "none";
                          }
                        }), a;
                      }(n.adUnitCode, e, d);
                    }

                    break;

                  case y.a:
                    n.vastUrl = e.notify_url + "&redir=" + encodeURIComponent(e.rtb.video.asset_url);
                }
              } else if (e.rtb[g.c]) {
                var p = e.rtb[g.c],
                    c = e.viewability.config.replace("src=", "data-src="),
                    u = p.javascript_trackers;
                null == u ? u = c : _.isStr(u) ? u = [u, c] : u.push(c), n[g.c] = {
                  title: p.title,
                  body: p.desc,
                  body2: p.desc2,
                  cta: p.ctatext,
                  rating: p.rating,
                  sponsoredBy: p.sponsored,
                  privacyLink: p.privacy_link,
                  address: p.address,
                  downloads: p.downloads,
                  likes: p.likes,
                  phone: p.phone,
                  price: p.price,
                  salePrice: p.saleprice,
                  clickUrl: p.link.url,
                  displayUrl: p.displayurl,
                  clickTrackers: p.link.click_trackers,
                  impressionTrackers: p.impression_trackers,
                  javascriptTrackers: u
                }, p.main_img && (n["native"].image = {
                  url: p.main_img.url,
                  height: p.main_img.height,
                  width: p.main_img.width
                }), p.icon && (n["native"].icon = {
                  url: p.icon.url,
                  height: p.icon.height,
                  width: p.icon.width
                });
              } else {
                b(n, {
                  width: e.rtb.banner.width,
                  height: e.rtb.banner.height,
                  ad: e.rtb.banner.content
                });

                try {
                  var l = e.rtb.trackers[0].impression_urls[0],
                      m = _.createTrackPixelHtml(l);

                  n.ad += m;
                } catch (e) {
                  _.logError("Error appending tracking pixel", e);
                }
              }

              return n;
            }(e, a, s);

            n.mediaType = (t = a.ad_type) === g.d ? g.d : t === g.c ? g.c : g.b, o.push(n);
          }
        }), e.debug && e.debug.debug_info) {
          var a = "AppNexus Debug Auction for Prebid\n\n" + e.debug.debug_info;
          a = a.replace(/(<td>|<th>)/gm, "\t").replace(/(<\/td>|<\/th>)/gm, "\n").replace(/^<br>/gm, "").replace(/(<br>\n|<br>)/gm, "\n").replace(/<h1>(.*)<\/h1>/gm, "\n\n===== $1 =====\n\n").replace(/<h[2-6]>(.*)<\/h[2-6]>/gm, "\n\n*** $1 ***\n\n").replace(/(<([^>]+)>)/gim, ""), _.logMessage("https://console.appnexus.com/docs/understanding-the-debug-auction"), _.logMessage(a);
        }

        return o;
      },
      getMappingFileInfo: function getMappingFileInfo() {
        return {
          url: "https://acdn.adnxs.com/prebid/appnexus-mapping/mappings.json",
          refreshInDays: 7
        };
      },
      getUserSyncs: function getUserSyncs(e) {
        if (e.iframeEnabled) return [{
          type: "iframe",
          url: "https://acdn.adnxs.com/ib/static/usersync/v3/async_usersync.html"
        }];
      },
      transformBidParams: function transformBidParams(t, e) {
        return t = _.convertTypes({
          member: "string",
          invCode: "string",
          placementId: "number",
          keywords: _.transformBidderParamKeywords
        }, t), e && (t.use_pmt_rule = "boolean" == typeof t.usePaymentRule && t.usePaymentRule, t.usePaymentRule && delete t.usePaymentRule, R(t.keywords) && t.keywords.forEach(O), Object.keys(t).forEach(function (e) {
          var r = _.convertCamelToUnderscore(e);

          r !== e && (t[r] = t[e], delete t[e]);
        })), t;
      },
      onBidWon: function onBidWon(e) {
        e["native"] && function (e) {
          var r = function (e) {
            var r;
            if (_.isStr(e) && j(e)) r = e;else if (_.isArray(e)) for (var t = 0; t < e.length; t++) {
              var a = e[t];
              j(a) && (r = a);
            }
            return r;
          }(e["native"].javascriptTrackers);

          if (r) for (var t = "pbjs_adid=" + e.adId + ";pbjs_auc=" + e.adUnitCode, a = function (e) {
            var r = e.indexOf('src="') + 5,
                t = e.indexOf('"', r);
            return e.substring(r, t);
          }(r), n = a.replace("dom_id=%native_dom_id%", t), i = document.getElementsByTagName("iframe"), s = !1, o = 0; o < i.length && !s; o++) {
            var d = i[o];

            try {
              var p = d.contentDocument || d.contentWindow.document;
              if (p) for (var c = p.getElementsByTagName("script"), u = 0; u < c.length && !s; u++) {
                var l = c[u];
                l.getAttribute("data-src") == a && (l.setAttribute("src", n), l.setAttribute("data-src", ""), l.removeAttribute && l.removeAttribute("data-src"), s = !0);
              }
            } catch (e) {
              if (!(e instanceof DOMException && "SecurityError" === e.name)) throw e;
            }
          }
        }(e);
      }
    };

    function R(e) {
      return _.isArray(e) && 0 < e.length;
    }

    function O(e) {
      R(e.value) && "" === e.value[0] && delete e.value;
    }

    function j(e) {
      var r = e.match(l),
          t = null != r && 1 <= r.length,
          a = e.match(m),
          n = null != a && 1 <= a.length;
      return e.startsWith(d) && n && t;
    }

    function P(r) {
      var n,
          i,
          t = {};

      if (t.sizes = U(r.sizes), t.primary_size = t.sizes[0], t.ad_types = [], t.uuid = r.bidId, r.params.placementId ? t.id = parseInt(r.params.placementId, 10) : t.code = r.params.invCode, t.allow_smaller_sizes = r.params.allowSmallerSizes || !1, t.use_pmt_rule = r.params.usePaymentRule || !1, t.prebid = !0, t.disable_psa = !0, r.params.reserve && (t.reserve = r.params.reserve), r.params.position && (t.position = {
        above: 1,
        below: 2
      }[r.params.position] || 0), r.params.trafficSourceCode && (t.traffic_source_code = r.params.trafficSourceCode), r.params.privateSizes && (t.private_sizes = U(r.params.privateSizes)), r.params.supplyType && (t.supply_type = r.params.supplyType), r.params.pubClick && (t.pubclick = r.params.pubClick), r.params.extInvCode && (t.ext_inv_code = r.params.extInvCode), r.params.externalImpId && (t.external_imp_id = r.params.externalImpId), !_.isEmpty(r.params.keywords)) {
        var e = _.transformBidderParamKeywords(r.params.keywords);

        0 < e.length && e.forEach(O), t.keywords = e;
      }

      if ((r.mediaType === g.c || _.deepAccess(r, "mediaTypes.".concat(g.c))) && (t.ad_types.push(g.c), 0 === t.sizes.length && (t.sizes = U([1, 1])), r.nativeParams)) {
        var a = (n = r.nativeParams, i = {}, Object.keys(n).forEach(function (e) {
          var r = u[e] && u[e].serverName || u[e] || e,
              t = u[e] && u[e].requiredParams;

          if (i[r] = b({}, t, n[e]), (r === u.image.serverName || r === u.icon.serverName) && i[r].sizes) {
            var a = i[r].sizes;
            (_.isArrayOfNums(a) || _.isArray(a) && 0 < a.length && a.every(function (e) {
              return _.isArrayOfNums(e);
            })) && (i[r].sizes = U(i[r].sizes));
          }

          r === u.privacyLink && (i.privacy_supported = !0);
        }), i);
        t[g.c] = {
          layouts: [a]
        };
      }

      var s = _.deepAccess(r, "mediaTypes.".concat(g.d)),
          o = _.deepAccess(r, "mediaTypes.video.context");

      t.hb_source = s && "adpod" === o ? 7 : 1, r.mediaType !== g.d && !s || t.ad_types.push(g.d), (r.mediaType === g.d || s && "outstream" !== o) && (t.require_asset_url = !0), r.params.video && (t.video = {}, Object.keys(r.params.video).filter(function (e) {
        return x()(c, e);
      }).forEach(function (e) {
        return t.video[e] = r.params.video[e];
      })), r.renderer && (t.video = b({}, t.video, {
        custom_renderer_present: !0
      }));
      var d = I()(p.a.getAdUnits(), function (e) {
        return r.transactionId === e.transactionId;
      });
      return d && d.mediaTypes && d.mediaTypes.banner && t.ad_types.push(g.b), 0 === t.ad_types.length && delete t.ad_types, t;
    }

    function U(e) {
      var r = [],
          t = {};
      if (_.isArray(e) && 2 === e.length && !_.isArray(e[0])) t.width = parseInt(e[0], 10), t.height = parseInt(e[1], 10), r.push(t);else if ("object" === s(e)) for (var a = 0; a < e.length; a++) {
        var n = e[a];
        (t = {}).width = parseInt(n[0], 10), t.height = parseInt(n[1], 10), r.push(t);
      }
      return r;
    }

    function N(e) {
      return !!e.params.user;
    }

    function q(e) {
      return !!parseInt(e.params.member, 10);
    }

    function z(e) {
      if (e.params) return !!e.params.app;
    }

    function M(e) {
      return e.params && e.params.app ? !!e.params.app.id : !!e.params.app;
    }

    function B(e) {
      return !!e.debug;
    }

    function D(e) {
      return e.mediaTypes && e.mediaTypes.video && e.mediaTypes.video.context === g.a;
    }

    function V(e, r, t) {
      _.isEmpty(e.video) && (e.video = {}), e.video[r] = t;
    }

    function J(e) {
      var r, t;
      r = e.adUnitCode, (t = document.getElementById(r).querySelectorAll("div[id^='google_ads']"))[0] && t[0].style.setProperty("display", "none"), e.renderer.push(function () {
        window.ANOutstreamVideo.renderAd({
          tagId: e.adResponse.tag_id,
          sizes: [e.getSize().split("x")],
          targetId: e.adUnitCode,
          uuid: e.adResponse.uuid,
          adResponse: e.adResponse,
          rendererOptions: e.renderer.getConfig()
        }, function (e, r, t) {
          e.renderer.handleVideoEvent({
            id: r,
            eventName: t
          });
        }.bind(null, e));
      });
    }

    Object(v.registerBidder)(h);
  }
}, [277]);
pbjsChunk([230], {
  345: function _(n, t, e) {
    n.exports = e(346);
  },
  346: function _(n, t, e) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), e.d(t, "userCMP", function () {
      return l;
    }), e.d(t, "consentTimeout", function () {
      return u;
    }), e.d(t, "allowAuction", function () {
      return g;
    }), e.d(t, "gdprScope", function () {
      return p;
    }), e.d(t, "staticConsentData", function () {
      return m;
    }), t.requestBidsHook = M, t.resetConsentData = function () {
      C = void 0, l = void 0, w = 0, a.gdprDataHandler.setConsentData(null);
    }, t.setConsentConfig = x;
    var d = e(0),
        o = e(3),
        a = e(7),
        i = e(11),
        s = e.n(i),
        r = e(347),
        f = e.n(r);

    function c(n) {
      return (c = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (n) {
        return _typeof(n);
      } : function (n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : _typeof(n);
      })(n);
    }

    var l,
        u,
        g,
        p,
        m,
        C,
        b = "iab",
        v = 1e4,
        y = !0,
        w = 0,
        D = !1,
        k = {
      iab: function iab(o, e, s) {
        function n(n, t) {
          d.logInfo("Received a response from CMP", n), t ? ("tcloaded" === n.eventStatus || "useractioncomplete" === n.eventStatus || "cmpuishown" === n.eventStatus && n.tcString && !0 === n.purposeOneTreatment) && o(n, s) : e("CMP unable to register callback function.  Please check CMP setup.", s);
        }

        var t = function () {
          var t = {};

          function e() {
            t.getConsentData && t.getVendorConsents && (d.logInfo("Received all requested responses from CMP", t), o(t, s));
          }

          return {
            consentDataCallback: function consentDataCallback(n) {
              t.getConsentData = n, e();
            },
            vendorConsentsCallback: function vendorConsentsCallback(n) {
              t.getVendorConsents = n, e();
            }
          };
        }(),
            u = {},
            a = function () {
          for (var n, t, e = window; !n;) {
            try {
              if ("function" == typeof e.__tcfapi || "function" == typeof e.__cmp) {
                t = "function" == typeof e.__tcfapi ? (w = 2, e.__tcfapi) : (w = 1, e.__cmp), n = e;
                break;
              }
            } catch (n) {}

            try {
              if (e.frames.__tcfapiLocator) {
                w = 2, n = e;
                break;
              }
            } catch (n) {}

            try {
              if (e.frames.__cmpLocator) {
                w = 1, n = e;
                break;
              }
            } catch (n) {}

            if (e === window.top) break;
            e = e.parent;
          }

          return {
            cmpFrame: n,
            cmpFunction: t
          };
        }(),
            i = a.cmpFrame,
            r = a.cmpFunction;

        if (!i) return e("CMP not found.", s);
        d.isFn(r) ? (d.logInfo("Detected CMP API is directly accessible, calling it now..."), 1 === w ? (r("getConsentData", null, t.consentDataCallback), r("getVendorConsents", null, t.vendorConsentsCallback)) : 2 === w && r("addEventListener", w, n)) : 1 === w && window.$sf && window.$sf.ext && "function" == typeof window.$sf.ext.cmp ? (d.logInfo("Detected Prebid.js is encased in a SafeFrame and CMP is registered, calling it now..."), c("getConsentData", t.consentDataCallback), c("getVendorConsents", t.vendorConsentsCallback)) : (d.logInfo("Detected CMP is outside the current iframe where Prebid.js is located, calling it now..."), 1 === w ? (l("getConsentData", i, t.consentDataCallback), l("getVendorConsents", i, t.vendorConsentsCallback)) : 2 === w && l("addEventListener", i, n));

        function c(o, a) {
          var n = s.adUnits,
              t = 1,
              e = 1;

          if (Array.isArray(n) && 0 < n.length) {
            var i = d.getAdUnitSizes(n[0]);
            t = i[0][0], e = i[0][1];
          }

          window.$sf.ext.register(t, e, function (n, t) {
            if ("cmpReturn" === n) {
              var e = "getConsentData" === o ? t.vendorConsentData : t.vendorConsents;
              a(e);
            }
          }), window.$sf.ext.cmp(o);
        }

        function l(n, l, t) {
          var d = 2 === w ? "__tcfapi" : "__cmp";
          window[d] = function (n, t, e) {
            var o,
                a,
                i,
                s = Math.random() + "",
                r = "".concat(d, "Call"),
                c = (i = {
              command: n,
              parameter: t,
              callId: s
            }, (a = r) in (o = {}) ? Object.defineProperty(o, a, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }) : o[a] = i, o);
            1 !== w && (c[r].version = w), u[s] = e, l.postMessage(c, "*");
          }, window.addEventListener("message", function (n) {
            var t = "".concat(d, "Return"),
                e = "string" == typeof n.data && f()(n.data, t) ? JSON.parse(n.data) : n.data;

            if (e[t] && e[t].callId) {
              var o = e[t];
              void 0 !== u[o.callId] && u[o.callId](o.returnValue, o.success);
            }
          }, !1), window[d](n, null, t);
        }
      },
      "static": function _static(n, t, e) {
        n(m, e);
      }
    };

    function M(n, t) {
      var e = {
        context: this,
        args: [t],
        nextFn: n,
        adUnits: t.adUnits || pbjs.adUnits,
        bidsBackHandler: t.bidsBackHandler,
        haveExited: !1,
        timer: null
      };
      return C ? (d.logInfo("User consent information already known.  Pulling internally stored information..."), _(null, e)) : s()(Object.keys(k), l) ? (k[l].call(this, h, P, e), void (e.haveExited || (0 === u ? h(void 0, e) : e.timer = setTimeout(function (n) {
        P("CMP workflow exceeded timeout threshold.", n);
      }.bind(null, e), u)))) : (d.logWarn("CMP framework (".concat(l, ") is not a supported framework.  Aborting consentManagement module and resuming auction.")), e.nextFn.apply(e.context, e.args));
    }

    function h(e, n) {
      "static" === l && 2 === (w = e.getConsentData ? 1 : e.getTCData ? 2 : 0) && (e = e.getTCData);
      var t = 1 === w ? function (n) {
        var t = n && n.getConsentData && n.getConsentData.gdprApplies;
        return !("boolean" == typeof t && (!0 !== t || d.isStr(n.getConsentData.consentData) && d.isPlainObject(n.getVendorConsents) && 1 < Object.keys(n.getVendorConsents).length));
      } : 2 === w ? function () {
        var n = e && e.gdprApplies,
            t = e && e.tcString;
        return !("boolean" == typeof n && (!0 !== n || d.isStr(t)));
      } : null;
      d.isFn(t) ? t(e) ? P("CMP returned unexpected value during lookup process.", n, e) : (clearTimeout(n.timer), S(e), _(null, n)) : P("Unable to derive CMP version to process data.  Consent object does not conform to TCF v1 or v2 specs.", n, e);
    }

    function P(n, t, e) {
      clearTimeout(t.timer), g && S(void 0), _(n, t, e);
    }

    function S(n) {
      (C = 1 === w ? {
        consentString: n ? n.getConsentData.consentData : void 0,
        vendorData: n ? n.getVendorConsents : void 0,
        gdprApplies: n ? n.getConsentData.gdprApplies : p
      } : {
        consentString: n ? n.tcString : void 0,
        vendorData: n || void 0,
        gdprApplies: n ? n.gdprApplies : p
      }).apiVersion = w, a.gdprDataHandler.setConsentData(C);
    }

    function _(n, t, e) {
      if (!1 === t.haveExited) {
        t.haveExited = !0;
        var o = t.context,
            a = t.args,
            i = t.nextFn;
        n ? g ? (d.logWarn(n + " Resuming auction without consent data as per consentManagement config.", e), i.apply(o, a)) : (d.logError(n + " Canceling auction as per consentManagement config.", e), "function" == typeof t.bidsBackHandler ? t.bidsBackHandler() : d.logError("Error executing bidsBackHandler")) : i.apply(o, a);
      }
    }

    function x(n) {
      (n = n.gdpr || n.usp ? n.gdpr : n) && "object" === c(n) ? (d.isStr(n.cmpApi) ? l = n.cmpApi : (l = b, d.logInfo("consentManagement config did not specify cmp.  Using system default setting (".concat(b, ")."))), d.isNumber(n.timeout) ? u = n.timeout : (u = v, d.logInfo("consentManagement config did not specify timeout.  Using system default setting (".concat(v, ")."))), "boolean" == typeof n.allowAuctionWithoutConsent ? g = n.allowAuctionWithoutConsent : (g = y, d.logInfo("consentManagement config did not specify allowAuctionWithoutConsent.  Using system default setting (".concat(y, ")."))), p = !0 === n.defaultGdprScope, d.logInfo("consentManagement module has been activated..."), "static" === l && (d.isPlainObject(n.consentData) ? (m = n.consentData, u = 0) : d.logError("consentManagement config with cmpApi: 'static' did not specify consentData. No consents will be available to adapters.")), D || pbjs.requestBids.before(M, 50), D = !0) : d.logWarn("consentManagement config not defined, exiting consent manager");
    }

    o.b.getConfig("consentManagement", function (n) {
      return x(n.consentManagement);
    });
  }
}, [345]);
pbjsChunk([229], {
  353: function _(n, t, e) {
    n.exports = e(354);
  },
  354: function _(n, t, e) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), e.d(t, "consentAPI", function () {
      return c;
    }), e.d(t, "consentTimeout", function () {
      return r;
    }), e.d(t, "staticConsentData", function () {
      return u;
    }), t.requestBidsHook = m, t.resetConsentData = function () {
      l = void 0, c = void 0, o.uspDataHandler.setConsentData(null);
    }, t.setConsentConfig = P;
    var s = e(0),
        a = e(3),
        o = e(7);

    function i(n) {
      return (i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (n) {
        return _typeof(n);
      } : function (n) {
        return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : _typeof(n);
      })(n);
    }

    var c,
        r,
        u,
        l,
        d = "iab",
        p = 50,
        f = !1,
        g = {
      iab: function iab(a, o, i) {
        var t = function () {
          var e = {};
          return {
            consentDataCallback: function consentDataCallback(n, t) {
              t && n.uspString && (e.usPrivacy = n.uspString), e.usPrivacy ? a(e, i) : o("Unable to get USP consent string.", i);
            }
          };
        }(),
            s = {};

        try {
          window.__uspapi("getUSPData", 1, t.consentDataCallback);
        } catch (n) {
          for (var e, c = window; !e;) {
            try {
              c.frames.__uspapiLocator && (e = c);
            } catch (n) {}

            if (c === window.top) break;
            c = c.parent;
          }

          if (!e) return o("USP CMP not found.", i);
          !function (n, i, e) {
            function a(n) {
              var t = n && n.data && n.data.__uspapiReturn;
              t && t.callId && void 0 !== s[t.callId] && (s[t.callId](t.returnValue, t.success), delete s[t.callId]);
            }

            window.__uspapi = function (n, t, e) {
              var a = Math.random() + "",
                  o = {
                __uspapiCall: {
                  command: n,
                  version: t,
                  callId: a
                }
              };
              s[a] = e, i.postMessage(o, "*");
            }, window.addEventListener("message", a, !1), window.__uspapi(n, 1, function (n, t) {
              window.removeEventListener("message", a, !1), e(n, t);
            });
          }("getUSPData", e, t.consentDataCallback);
        }
      },
      "static": function _static(n, t, e) {
        n(u, e);
      }
    };

    function m(n, t) {
      var e = {
        context: this,
        args: [t],
        nextFn: n,
        adUnits: t.adUnits || pbjs.adUnits,
        bidsBackHandler: t.bidsBackHandler,
        haveExited: !1,
        timer: null
      };
      return l ? y(null, e) : g[c] ? (g[c].call(this, v, b, e), void (e.haveExited || (0 === r ? v(void 0, e) : e.timer = setTimeout(function (n) {
        b("USPAPI workflow exceeded timeout threshold.", n);
      }.bind(null, e), r)))) : (s.logWarn("USP framework (".concat(c, ") is not a supported framework. Aborting consentManagement module and resuming auction.")), e.nextFn.apply(e.context, e.args));
    }

    function v(n, t) {
      var e;
      !n || !n.usPrivacy ? b("USPAPI returned unexpected value during lookup process.", t, n) : (clearTimeout(t.timer), (e = n) && e.usPrivacy && (l = e.usPrivacy, o.uspDataHandler.setConsentData(l)), y(null, t));
    }

    function b(n, t, e) {
      clearTimeout(t.timer), y(n, t, e);
    }

    function y(n, t, e) {
      if (!1 === t.haveExited) {
        t.haveExited = !0;
        var a = t.context,
            o = t.args,
            i = t.nextFn;
        n && s.logWarn(n + " Resuming auction without consent data as per consentManagement config.", e), i.apply(a, o);
      }
    }

    function P(n) {
      (n = n.usp) && "object" === i(n) ? (s.isStr(n.cmpApi) ? c = n.cmpApi : (c = d, s.logInfo("consentManagement.usp config did not specify cmpApi. Using system default setting (".concat(d, ")."))), s.isNumber(n.timeout) ? r = n.timeout : (r = p, s.logInfo("consentManagement.usp config did not specify timeout. Using system default setting (".concat(p, ")."))), s.logInfo("USPAPI consentManagement module has been activated..."), "static" === c && (s.isPlainObject(n.consentData) && s.isPlainObject(n.consentData.getUSPData) ? (n.consentData.getUSPData.uspString && (u = {
        usPrivacy: n.consentData.getUSPData.uspString
      }), r = 0) : s.logError("consentManagement config with cmpApi: 'static' did not specify consentData. No consents will be available to adapters.")), f || pbjs.requestBids.before(m, 50), f = !0) : s.logWarn("consentManagement.usp config not defined, exiting usp consent manager");
    }

    a.b.getConfig("consentManagement", function (n) {
      return P(n.consentManagement);
    });
  }
}, [353]);
pbjsChunk([0], {
  365: function _(t, e, r) {
    t.exports = r(366);
  },
  366: function _(t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), r.d(e, "ADAPTER_VERSION", function () {
      return c;
    }), r.d(e, "PROFILE_ID_PUBLISHERTAG", function () {
      return v;
    }), r.d(e, "spec", function () {
      return s;
    }), e.tryGetCriteoFastBid = x;
    var a = r(38),
        i = r(1),
        d = r(3),
        h = r(2),
        f = r(0),
        o = r(12),
        l = r.n(o),
        p = r(367),
        n = (r.n(p), r(9));

    function u() {
      return (u = Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e];

          for (var i in r) {
            Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
          }
        }

        return t;
      }).apply(this, arguments);
    }

    var c = 31,
        m = "criteo",
        v = 185,
        y = Object(n.b)(91),
        b = 65537,
        g = "ztQYwCE5BU7T9CDM5he6rKoabstXRmkzx54zFPZkWbK530dwtLBDeaWBMxHBUT55CYyboR/EZ4efghPi3CoNGfGWezpjko9P6p2EwGArtHEeS4slhu/SpSIFMjG6fdrpRoNuIAMhq1Z+Pr/+HOd1pThFKeGFr2/NhtAg+TXAzaU=",
        s = {
      code: m,
      gvlid: 91,
      supportedMediaTypes: [h.b, h.d, h.c],
      isBidRequestValid: function isBidRequestValid(t) {
        return !(!t || !t.params || !t.params.zoneId && !t.params.networkId) && !(R(t) && !function (e) {
          var r = !0;

          if (["mimes", "playerSize", "maxduration", "protocols", "api"].forEach(function (t) {
            void 0 === f.deepAccess(e, "mediaTypes.video." + t) && (r = !1, f.logError("Criteo Bid Adapter: mediaTypes.video." + t + " is required"));
          }), ["skip", "placement", "playbackmethod"].forEach(function (t) {
            void 0 === f.deepAccess(e, "params.video." + t) && (r = !1, f.logError("Criteo Bid Adapter: params.video." + t + " is required"));
          }), r) {
            if ("instream" == e.mediaTypes.video.context && 1 === e.params.video.placement) return 1;
            if ("outstream" == e.mediaTypes.video.context && 1 !== e.params.video.placement) return 1;
          }

          return;
        }(t));
      },
      buildRequests: function buildRequests(t, e) {
        var r, i;

        if (u(e, {
          publisherExt: d.b.getConfig("fpd.context"),
          userExt: d.b.getConfig("fpd.user"),
          ceh: d.b.getConfig("criteo.ceh")
        }), T() || (window.Criteo = window.Criteo || {}, window.Criteo.usePrebidEvents = !1, x(), setTimeout(function () {
          Object(a.a)("https://static.criteo.net/js/ld/publishertag.prebid.js", m);
        }, e.timeout)), T()) {
          var o = new Criteo.PubTag.Adapters.Prebid(v, c, t, e, "3.20.0"),
              n = d.b.getConfig("enableSendAllBids");
          o.setEnableSendAllBids && "function" == typeof o.setEnableSendAllBids && "boolean" == typeof n && o.setEnableSendAllBids(n), r = o.buildCdbUrl(), i = o.buildCdbRequest();
        } else {
          var s = function (t, e) {
            var r = "";
            e && e.refererInfo && (r = e.refererInfo.referer);
            var i = f.parseUrl(r).search,
                o = {
              url: r,
              debug: "1" === i.pbt_debug,
              noLog: "1" === i.pbt_nolog,
              amp: !1
            };
            return t.forEach(function (t) {
              "amp" === t.params.integrationMode && (o.amp = !0);
            }), o;
          }(t, e);

          r = function (t) {
            var e = "https://bidder.criteo.com/cdb";
            e += "?profileId=207", e += "&av=" + String(c), e += "&wv=" + encodeURIComponent("3.20.0"), e += "&cb=" + String(Math.floor(99999999999 * Math.random())), t.amp && (e += "&im=1");
            t.debug && (e += "&debug=1");
            t.noLog && (e += "&nolog=1");
            return e;
          }(s), i = function (t, e, r) {
            var o,
                i = {
              publisher: {
                url: t.url,
                ext: r.publisherExt
              },
              slots: e.map(function (t) {
                o = t.params.networkId || o;
                var e,
                    r = {
                  impid: t.adUnitCode,
                  transactionid: t.transactionId,
                  auctionId: t.auctionId
                };

                if (t.params.zoneId && (r.zoneid = t.params.zoneId), t.fpd && t.fpd.context && (r.ext = t.fpd.context), t.params.ext && (r.ext = u({}, r.ext, t.params.ext)), t.params.publisherSubId && (r.publishersubid = t.params.publisherSubId), t.params.nativeCallback || f.deepAccess(t, "mediaTypes.".concat(h.c)) ? (r["native"] = !0, (e = t).nativeParams && (e.nativeParams.image && !0 !== e.nativeParams.image.sendId || e.nativeParams.icon && !0 !== e.nativeParams.icon.sendId || e.nativeParams.clickUrl && !0 !== e.nativeParams.clickUrl.sendId || e.nativeParams.displayUrl && !0 !== e.nativeParams.displayUrl.sendId || e.nativeParams.privacyLink && !0 !== e.nativeParams.privacyLink.sendId || e.nativeParams.privacyIcon && !0 !== e.nativeParams.privacyIcon.sendId) && f.logWarn("Criteo: all native assets containing URL should be sent as placeholders with sendId(icon, image, clickUrl, displayUrl, privacyLink, privacyIcon)"), r.sizes = A(C(t), I)) : r.sizes = A(C(t), S), R(t)) {
                  var i = {
                    playersizes: A(f.deepAccess(t, "mediaTypes.video.playerSize"), S),
                    mimes: t.mediaTypes.video.mimes,
                    protocols: t.mediaTypes.video.protocols,
                    maxduration: t.mediaTypes.video.maxduration,
                    api: t.mediaTypes.video.api
                  };
                  i.skip = t.params.video.skip, i.placement = t.params.video.placement, i.minduration = t.params.video.minduration, i.playbackmethod = t.params.video.playbackmethod, i.startdelay = t.params.video.startdelay, r.video = i;
                }

                return r;
              })
            };
            o && (i.publisher.networkid = o);
            i.user = {
              ext: r.userExt
            }, r && r.ceh && (i.user.ceh = r.ceh);
            r && r.gdprConsent && (i.gdprConsent = {}, void 0 !== r.gdprConsent.gdprApplies && (i.gdprConsent.gdprApplies = !!r.gdprConsent.gdprApplies), i.gdprConsent.version = r.gdprConsent.apiVersion, void 0 !== r.gdprConsent.consentString && (i.gdprConsent.consentData = r.gdprConsent.consentString));
            r && r.uspConsent && (i.user.uspIab = r.uspConsent);
            return i;
          }(s, t, e);
        }

        if (i) return {
          method: "POST",
          url: r,
          data: i,
          bidRequests: t
        };
      },
      interpretResponse: function interpretResponse(t, u) {
        var e = t.body || t;

        if (T()) {
          var r = Criteo.PubTag.Adapters.Prebid.GetAdapter(u);
          if (r) return r.interpretResponse(e, u);
        }

        var c = [];
        return e && e.slots && f.isArray(e.slots) && e.slots.forEach(function (e) {
          var t,
              r,
              i,
              o,
              n,
              s = l()(u.bidRequests, function (t) {
            return t.adUnitCode === e.impid && (!t.params.zoneId || parseInt(t.params.zoneId) === e.zoneid);
          }),
              a = s.bidId,
              p = {
            requestId: a,
            adId: e.bidId || f.getUniqueIdentifierStr(),
            cpm: e.cpm,
            currency: e.currency,
            netRevenue: !0,
            ttl: e.ttl || 60,
            creativeId: a,
            width: e.width,
            height: e.height,
            dealId: e.dealCode
          };
          if (e["native"]) {
            if (s.params.nativeCallback) p.ad = (r = a, i = e["native"], o = s.params.nativeCallback, n = "criteo_prebid_native_slots", window[n] = window[n] || {}, window[n][r] = {
              callback: o,
              payload: i
            }, '\n<script type="text/javascript">\nfor (var i = 0; i < 10; ++i) {\n var slots = window.parent.'.concat(n, ';\n  if(!slots){continue;}\n  var responseSlot = slots["').concat(r, '"];\n  responseSlot.callback(responseSlot.payload);\n  break;\n}\n<\/script>'));else {
              if (!0 === d.b.getConfig("enableSendAllBids")) return;
              p["native"] = {
                title: (t = e["native"]).products[0].title,
                body: t.products[0].description,
                sponsoredBy: t.advertiser.description,
                icon: t.advertiser.logo,
                image: t.products[0].image,
                clickUrl: t.products[0].click_url,
                privacyLink: t.privacy.optout_click_url,
                privacyIcon: t.privacy.optout_image_url,
                cta: t.products[0].call_to_action,
                price: t.products[0].price,
                impressionTrackers: t.impression_pixels.map(function (t) {
                  return t.url;
                })
              }, p.mediaType = h.c;
            }
          } else e.video ? (p.vastUrl = e.displayurl, p.mediaType = h.d) : p.ad = e.creative;
          c.push(p);
        }), c;
      },
      onTimeout: function onTimeout(t) {
        T() && Criteo.PubTag.Adapters.Prebid.GetAdapter(t.auctionId).handleBidTimeout();
      },
      onBidWon: function onBidWon(t) {
        T() && Criteo.PubTag.Adapters.Prebid.GetAdapter(t.auctionId).handleBidWon(t);
      },
      onSetTargeting: function onSetTargeting(t) {
        T() && Criteo.PubTag.Adapters.Prebid.GetAdapter(t.auctionId).handleSetTargeting(t);
      }
    };

    function T() {
      return "undefined" != typeof Criteo && Criteo.PubTag && Criteo.PubTag.Adapters && Criteo.PubTag.Adapters.Prebid;
    }

    function C(t) {
      return f.deepAccess(t, "mediaTypes.banner.sizes") || t.sizes;
    }

    function A(t, e) {
      return Array.isArray(t[0]) ? t.map(function (t) {
        return e(t);
      }) : [e(t)];
    }

    function S(t) {
      return t[0] + "x" + t[1];
    }

    function I(t) {
      return void 0 === t[0] && void 0 === t[1] ? "2x2" : t[0] + "x" + t[1];
    }

    function R(t) {
      return void 0 !== f.deepAccess(t, "params.video") && void 0 !== f.deepAccess(t, "mediaTypes.video");
    }

    function x() {
      try {
        var t = "criteo_fast_bid",
            e = "// Hash: ",
            r = y.getDataFromLocalStorage(t);

        if (null !== r) {
          var i = r.indexOf("\n"),
              o = r.substr(0, i).trim();
          if (o.substr(0, e.length) !== e) f.logWarn("No hash found in FastBid"), y.removeDataFromLocalStorage(t);else {
            var n = o.substr(e.length),
                s = r.substr(i + 1);

            if (Object(p.verify)(s, n, g, b)) {
              f.logInfo("Using Criteo FastBid");
              var a = document.createElement("script");
              a.type = "text/javascript", a.text = s, f.insertElement(a);
            } else f.logWarn("Invalid Criteo FastBid found"), y.removeDataFromLocalStorage(t);
          }
        }
      } catch (t) {}
    }

    Object(i.registerBidder)(s);
  },
  367: function _(t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var a = r(368),
        p = r(369);

    e.verify = function (t, e, r, i) {
      var o = new a.BigInteger(a.b64toHex(e)),
          n = new a.BigInteger(a.b64toHex(r)),
          s = o.modPowInt(i, n);
      return a.removeExtraSymbols(s.toHexString()) === p.Sha256.hash(t);
    };
  },
  368: function _(t, e, r) {
    "use strict";

    var i;
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var o = (g.prototype.toHexString = function () {
      if (this.s < 0) return "-" + this.negate().toHexString();
      var t,
          e = !1,
          r = "",
          i = this.t,
          o = this.DB - i * this.DB % 4;
      if (0 < i--) for (o < this.DB && 0 < (t = this[i] >> o) && (e = !0, r = c(t)); 0 <= i;) {
        o < 4 ? (t = (this[i] & (1 << o) - 1) << 4 - o, t |= this[--i] >> (o += this.DB - 4)) : (t = this[i] >> (o -= 4) & 15, o <= 0 && (o += this.DB, --i)), 0 < t && (e = !0), e && (r += c(t));
      }
      return e ? r : "0";
    }, g.prototype.fromHexString = function (t) {
      if (null !== t) {
        this.t = 0, this.s = 0;

        for (var e = t.length, r = !1, i = 0; 0 <= --e;) {
          var o = p(t, e);
          o < 0 ? "-" == t.charAt(e) && (r = !0) : (r = !1, 0 == i ? this[this.t++] = o : i + 4 > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - i) - 1) << i, this[this.t++] = o >> this.DB - i) : this[this.t - 1] |= o << i, (i += 4) >= this.DB && (i -= this.DB));
        }

        this.clamp(), r && g.ZERO.subTo(this, this);
      }
    }, g.prototype.negate = function () {
      var t = T();
      return g.ZERO.subTo(this, t), t;
    }, g.prototype.abs = function () {
      return this.s < 0 ? this.negate() : this;
    }, g.prototype.mod = function (t) {
      var e = T();
      return this.abs().divRemTo(t, null, e), this.s < 0 && 0 < e.compareTo(g.ZERO) && t.subTo(e, e), e;
    }, g.prototype.copyTo = function (t) {
      for (var e = this.t - 1; 0 <= e; --e) {
        t[e] = this[e];
      }

      t.t = this.t, t.s = this.s;
    }, g.prototype.lShiftTo = function (t, e) {
      for (var r = t % this.DB, i = this.DB - r, o = (1 << i) - 1, n = Math.floor(t / this.DB), s = this.s << r & this.DM, a = this.t - 1; 0 <= a; --a) {
        e[a + n + 1] = this[a] >> i | s, s = (this[a] & o) << r;
      }

      for (a = n - 1; 0 <= a; --a) {
        e[a] = 0;
      }

      e[n] = s, e.t = this.t + n + 1, e.s = this.s, e.clamp();
    }, g.prototype.invDigit = function () {
      if (this.t < 1) return 0;
      var t = this[0];
      if (0 == (1 & t)) return 0;
      var e = 3 & t;
      return 0 < (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) ? this.DV - e : -e;
    }, g.prototype.dlShiftTo = function (t, e) {
      var r;

      for (r = this.t - 1; 0 <= r; --r) {
        e[r + t] = this[r];
      }

      for (r = t - 1; 0 <= r; --r) {
        e[r] = 0;
      }

      e.t = this.t + t, e.s = this.s;
    }, g.prototype.squareTo = function (t) {
      for (var e = this.abs(), r = t.t = 2 * e.t; 0 <= --r;) {
        t[r] = 0;
      }

      for (r = 0; r < e.t - 1; ++r) {
        var i = e.am(r, e[r], t, 2 * r, 0, 1);
        (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, i, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV, t[r + e.t + 1] = 1);
      }

      0 < t.t && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp();
    }, g.prototype.multiplyTo = function (t, e) {
      var r = this.abs(),
          i = t.abs(),
          o = r.t;

      for (e.t = o + i.t; 0 <= --o;) {
        e[o] = 0;
      }

      for (o = 0; o < i.t; ++o) {
        e[o + r.t] = r.am(0, i[o], e, o, 0, r.t);
      }

      e.s = 0, e.clamp(), this.s != t.s && g.ZERO.subTo(e, e);
    }, g.prototype.divRemTo = function (t, e, r) {
      var i = t.abs();

      if (!(i.t <= 0)) {
        var o = this.abs();
        if (o.t < i.t) return null != e && e.fromHexString("0"), void (null != r && this.copyTo(r));
        null == r && (r = T());
        var n = T(),
            s = this.s,
            a = t.s,
            p = this.DB - C(i[i.t - 1]);
        0 < p ? (i.lShiftTo(p, n), o.lShiftTo(p, r)) : (i.copyTo(n), o.copyTo(r));
        var u = n.t,
            c = n[u - 1];

        if (0 != c) {
          var d = c * (1 << this.F1) + (1 < u ? n[u - 2] >> this.F2 : 0),
              h = this.FV / d,
              f = (1 << this.F1) / d,
              l = 1 << this.F2,
              m = r.t,
              v = m - u,
              y = null == e ? T() : e;

          for (n.dlShiftTo(v, y), 0 <= r.compareTo(y) && (r[r.t++] = 1, r.subTo(y, r)), g.ONE.dlShiftTo(u, y), y.subTo(n, n); n.t < u;) {
            n[n.t++] = 0;
          }

          for (; 0 <= --v;) {
            var b = r[--m] == c ? this.DM : Math.floor(r[m] * h + (r[m - 1] + l) * f);
            if ((r[m] += n.am(0, b, r, v, 0, u)) < b) for (n.dlShiftTo(v, y), r.subTo(y, r); r[m] < --b;) {
              r.subTo(y, r);
            }
          }

          null != e && (r.drShiftTo(u, e), s != a && g.ZERO.subTo(e, e)), r.t = u, r.clamp(), 0 < p && r.rShiftTo(p, r), s < 0 && g.ZERO.subTo(r, r);
        }
      }
    }, g.prototype.rShiftTo = function (t, e) {
      e.s = this.s;
      var r = Math.floor(t / this.DB);
      if (r >= this.t) e.t = 0;else {
        var i = t % this.DB,
            o = this.DB - i,
            n = (1 << i) - 1;
        e[0] = this[r] >> i;

        for (var s = r + 1; s < this.t; ++s) {
          e[s - r - 1] |= (this[s] & n) << o, e[s - r] = this[s] >> i;
        }

        0 < i && (e[this.t - r - 1] |= (this.s & n) << o), e.t = this.t - r, e.clamp();
      }
    }, g.prototype.drShiftTo = function (t, e) {
      for (var r = t; r < this.t; ++r) {
        e[r - t] = this[r];
      }

      e.t = Math.max(this.t - t, 0), e.s = this.s;
    }, g.prototype.subTo = function (t, e) {
      for (var r = 0, i = 0, o = Math.min(t.t, this.t); r < o;) {
        i += this[r] - t[r], e[r++] = i & this.DM, i >>= this.DB;
      }

      if (t.t < this.t) {
        for (i -= t.s; r < this.t;) {
          i += this[r], e[r++] = i & this.DM, i >>= this.DB;
        }

        i += this.s;
      } else {
        for (i += this.s; r < t.t;) {
          i -= t[r], e[r++] = i & this.DM, i >>= this.DB;
        }

        i -= t.s;
      }

      e.s = i < 0 ? -1 : 0, i < -1 ? e[r++] = this.DV + i : 0 < i && (e[r++] = i), e.t = r, e.clamp();
    }, g.prototype.clamp = function () {
      for (var t = this.s & this.DM; 0 < this.t && this[this.t - 1] == t;) {
        --this.t;
      }
    }, g.prototype.modPowInt = function (t, e) {
      var r;
      return r = new (t < 256 || e.isEven() ? d : f)(e), this.exp(t, r);
    }, g.prototype.exp = function (t, e) {
      if (4294967295 < t || t < 1) return g.ONE;
      var r = T(),
          i = T(),
          o = e.convert(this),
          n = C(t) - 1;

      for (o.copyTo(r); 0 <= --n;) {
        if (e.sqrTo(r, i), 0 < (t & 1 << n)) e.mulTo(i, o, r);else {
          var s = r;
          r = i, i = s;
        }
      }

      return e.revert(r);
    }, g.prototype.isEven = function () {
      return 0 == (0 < this.t ? 1 & this[0] : this.s);
    }, g.prototype.compareTo = function (t) {
      var e = this.s - t.s;
      if (0 != e) return e;
      var r = this.t;
      if (0 != (e = r - t.t)) return this.s < 0 ? -e : e;

      for (; 0 <= --r;) {
        if (0 != (e = this[r] - t[r])) return e;
      }

      return 0;
    }, g.prototype.am1 = function (t, e, r, i, o, n) {
      for (; 0 <= --n;) {
        var s = e * this[t++] + r[i] + o;
        o = Math.floor(s / 67108864), r[i++] = 67108863 & s;
      }

      return o;
    }, g.prototype.am2 = function (t, e, r, i, o, n) {
      for (var s = 32767 & e, a = e >> 15; 0 <= --n;) {
        var p = 32767 & this[t],
            u = this[t++] >> 15,
            c = a * p + u * s;
        o = ((p = s * p + ((32767 & c) << 15) + r[i] + (1073741823 & o)) >>> 30) + (c >>> 15) + a * u + (o >>> 30), r[i++] = 1073741823 & p;
      }

      return o;
    }, g.prototype.am3 = function (t, e, r, i, o, n) {
      for (var s = 16383 & e, a = e >> 14; 0 <= --n;) {
        var p = 16383 & this[t],
            u = this[t++] >> 14,
            c = a * p + u * s;
        o = ((p = s * p + ((16383 & c) << 14) + r[i] + o) >> 28) + (c >> 14) + a * u, r[i++] = 268435455 & p;
      }

      return o;
    }, g);

    function g(t) {
      null !== t && this.fromHexString(t);
    }

    function T() {
      return new o(null);
    }

    function C(t) {
      var e,
          r = 1;
      return 0 != (e = t >>> 16) && (t = e, r += 16), 0 != (e = t >> 8) && (t = e, r += 8), 0 != (e = t >> 4) && (t = e, r += 4), 0 != (e = t >> 2) && (t = e, r += 2), 0 != (e = t >> 1) && (t = e, r += 1), r;
    }

    e.BigInteger = o, e.nbi = T, e.nbits = C;
    var n,
        s,
        a = [];

    for (n = "0".charCodeAt(0), s = 0; s <= 9; ++s) {
      a[n++] = s;
    }

    for (n = "a".charCodeAt(0), s = 10; s < 36; ++s) {
      a[n++] = s;
    }

    for (n = "A".charCodeAt(0), s = 10; s < 36; ++s) {
      a[n++] = s;
    }

    function p(t, e) {
      var r = a[t.charCodeAt(e)];
      return null == r ? -1 : r;
    }

    e.intAt = p;
    var u = "0123456789abcdefghijklmnopqrstuvwxyz";

    function c(t) {
      return u.charAt(t);
    }

    e.int2char = c;
    e.b64toHex = function (t) {
      var e,
          r = "",
          i = 0,
          o = 0;

      for (e = 0; e < t.length && "=" != t.charAt(e); ++e) {
        var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(t.charAt(e));
        n < 0 || (i = 0 == i ? (r += c(n >> 2), o = 3 & n, 1) : 1 == i ? (r += c(o << 2 | n >> 4), o = 15 & n, 2) : 2 == i ? (r += c(o), r += c(n >> 2), o = 3 & n, 3) : (r += c(o << 2 | n >> 4), r += c(15 & n), 0));
      }

      return 1 == i && (r += c(o << 2)), r;
    }, e.removeExtraSymbols = function (t) {
      return t.replace(/^1f+00/, "").replace("3031300d060960864801650304020105000420", "");
    };
    var d = (h.prototype.convert = function (t) {
      return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t;
    }, h.prototype.revert = function (t) {
      return t;
    }, h.prototype.reduce = function (t) {
      t.divRemTo(this.m, null, t);
    }, h.prototype.mulTo = function (t, e, r) {
      t.multiplyTo(e, r), this.reduce(r);
    }, h.prototype.sqrTo = function (t, e) {
      t.squareTo(e), this.reduce(e);
    }, h);

    function h(t) {
      this.m = t;
    }

    var f = (l.prototype.convert = function (t) {
      var e = T();
      return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && 0 < e.compareTo(o.ZERO) && this.m.subTo(e, e), e;
    }, l.prototype.revert = function (t) {
      var e = T();
      return t.copyTo(e), this.reduce(e), e;
    }, l.prototype.reduce = function (t) {
      for (; t.t <= this.mt2;) {
        t[t.t++] = 0;
      }

      for (var e = 0; e < this.m.t; ++e) {
        var r = 32767 & t[e],
            i = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;

        for (t[r = e + this.m.t] += this.m.am(0, i, t, e, 0, this.m.t); t[r] >= t.DV;) {
          t[r] -= t.DV, t[++r]++;
        }
      }

      t.clamp(), t.drShiftTo(this.m.t, t), 0 <= t.compareTo(this.m) && t.subTo(this.m, t);
    }, l.prototype.mulTo = function (t, e, r) {
      t.multiplyTo(e, r), this.reduce(r);
    }, l.prototype.sqrTo = function (t, e) {
      t.squareTo(e), this.reduce(e);
    }, l);

    function l(t) {
      this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t;
    }

    function m(t) {
      var e = T();
      return e.fromHexString(t.toString()), e;
    }

    e.nbv = m, o.ZERO = m(0), o.ONE = m(1), i = "Microsoft Internet Explorer" == navigator.appName ? (o.prototype.am = o.prototype.am2, 30) : "Netscape" != navigator.appName ? (o.prototype.am = o.prototype.am1, 26) : (o.prototype.am = o.prototype.am3, 28), o.prototype.DB = i, o.prototype.DM = (1 << i) - 1, o.prototype.DV = 1 << i;
    o.prototype.FV = Math.pow(2, 52), o.prototype.F1 = 52 - i, o.prototype.F2 = 2 * i - 52;
  },
  369: function _(t, e, r) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var i = (S.hash = function (t) {
      t = S.utf8Encode(t || "");

      for (var e = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], r = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], i = (t += String.fromCharCode(128)).length / 4 + 2, o = Math.ceil(i / 16), n = new Array(o), s = 0; s < o; s++) {
        n[s] = new Array(16);

        for (var a = 0; a < 16; a++) {
          n[s][a] = t.charCodeAt(64 * s + 4 * a) << 24 | t.charCodeAt(64 * s + 4 * a + 1) << 16 | t.charCodeAt(64 * s + 4 * a + 2) << 8 | t.charCodeAt(64 * s + 4 * a + 3) << 0;
        }
      }

      var p = 8 * (t.length - 1) / Math.pow(2, 32),
          u = 8 * (t.length - 1) >>> 0;

      for (n[o - 1][14] = Math.floor(p), n[o - 1][15] = u, s = 0; s < o; s++) {
        for (var c = new Array(64), d = 0; d < 16; d++) {
          c[d] = n[s][d];
        }

        for (d = 16; d < 64; d++) {
          c[d] = S.q1(c[d - 2]) + c[d - 7] + S.q0(c[d - 15]) + c[d - 16] >>> 0;
        }

        var h = r[0],
            f = r[1],
            l = r[2],
            m = r[3],
            v = r[4],
            y = r[5],
            b = r[6],
            g = r[7];

        for (d = 0; d < 64; d++) {
          var T = g + S.z1(v) + S.Ch(v, y, b) + e[d] + c[d],
              C = S.z0(h) + S.Maj(h, f, l);
          g = b, b = y, y = v, v = m + T >>> 0, m = l, l = f, f = h, h = T + C >>> 0;
        }

        r[0] = r[0] + h >>> 0, r[1] = r[1] + f >>> 0, r[2] = r[2] + l >>> 0, r[3] = r[3] + m >>> 0, r[4] = r[4] + v >>> 0, r[5] = r[5] + y >>> 0, r[6] = r[6] + b >>> 0, r[7] = r[7] + g >>> 0;
      }

      var A = new Array(r.length);

      for (g = 0; g < r.length; g++) {
        A[g] = ("00000000" + r[g].toString(16)).slice(-8);
      }

      return A.join("");
    }, S.utf8Encode = function (e) {
      try {
        return new TextEncoder().encode(e).reduce(function (t, e) {
          return t + String.fromCharCode(e);
        }, "");
      } catch (t) {
        return unescape(encodeURIComponent(e));
      }
    }, S.ROTR = function (t, e) {
      return e >>> t | e << 32 - t;
    }, S.z0 = function (t) {
      return S.ROTR(2, t) ^ S.ROTR(13, t) ^ S.ROTR(22, t);
    }, S.z1 = function (t) {
      return S.ROTR(6, t) ^ S.ROTR(11, t) ^ S.ROTR(25, t);
    }, S.q0 = function (t) {
      return S.ROTR(7, t) ^ S.ROTR(18, t) ^ t >>> 3;
    }, S.q1 = function (t) {
      return S.ROTR(17, t) ^ S.ROTR(19, t) ^ t >>> 10;
    }, S.Ch = function (t, e, r) {
      return t & e ^ ~t & r;
    }, S.Maj = function (t, e, r) {
      return t & e ^ t & r ^ e & r;
    }, S);

    function S() {}

    e.Sha256 = i;
  }
}, [365]);
pbjsChunk([182], {
  460: function _(e, r, t) {
    e.exports = t(461);
  },
  461: function _(e, r, t) {
    "use strict";

    Object.defineProperty(r, "__esModule", {
      value: !0
    }), t.d(r, "spec", function () {
      return O;
    });
    var l = t(0),
        y = t(2),
        b = t(3),
        i = t(12),
        a = t.n(i),
        n = t(462),
        s = t.n(n),
        o = t(1);

    function h(e) {
      return (h = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(e);
    }

    var d = [y.b, y.d],
        v = 100,
        g = 300,
        w = 3600,
        x = !0,
        I = {
      JPY: 1
    };

    function p(e) {
      var r = c(e);
      r.video = l.deepClone(e.params.video), r.video.w = e.params.size[0], r.video.h = e.params.size[1];
      var t = l.deepAccess(e, "mediaTypes.video.context");
      return t && ("instream" === t ? r.video.placement = 1 : "outstream" === t ? r.video.placement = 4 : l.logWarn("ix bidder params: video context '".concat(t, "' is not supported"))), r;
    }

    function c(e) {
      var r = {};
      return r.id = e.bidId, r.ext = {}, r.ext.siteID = e.params.siteId, !e.params.hasOwnProperty("id") || "string" != typeof e.params.id && "number" != typeof e.params.id ? r.ext.sid = "".concat(e.params.size[0], "x").concat(e.params.size[1]) : r.ext.sid = String(e.params.id), e.params.hasOwnProperty("bidFloor") && e.params.hasOwnProperty("bidFloorCur") && (r.bidfloor = e.params.bidFloor, r.bidfloorcur = e.params.bidFloorCur), r;
    }

    function u(e) {
      return Array.isArray(e) && 2 === e.length && s()(e[0]) && s()(e[1]);
    }

    function m(e, r) {
      if (u(e)) return e[0] === r[0] && e[1] === r[1];

      for (var t = 0; t < e.length; t++) {
        if (e[t][0] === r[0] && e[t][1] === r[1]) return 1;
      }
    }

    function P(r, e) {
      if (r) return a()(e, function (e) {
        return e.id === r;
      });
    }

    function f(e, r, t, i) {
      var a = [];

      if (window.headertag && "function" == typeof window.headertag.getIdentityInfo) {
        var n = window.headertag.getIdentityInfo();
        if (n && "object" === h(n)) for (var s in n) {
          if (n.hasOwnProperty(s)) {
            var o = n[s];
            !o.responsePending && o.data && "object" === h(o.data) && Object.keys(o.data).length && a.push(o.data);
          }
        }
      }

      var d = {};

      if (d.id = e[0].bidderRequestId, d.imp = t, d.site = {}, d.ext = {}, d.ext.source = "prebid", e[0].schain && (d.source = {
        ext: {
          schain: e[0].schain
        }
      }), 0 < a.length && (d.user = {}, d.user.eids = a), document.referrer && "" !== document.referrer && (d.site.ref = document.referrer), r) {
        if (r.gdprConsent) {
          var p = r.gdprConsent;
          p.hasOwnProperty("gdprApplies") && (d.regs = {
            ext: {
              gdpr: p.gdprApplies ? 1 : 0
            }
          }), p.hasOwnProperty("consentString") && (d.user = d.user || {}, d.user.ext = {
            consent: p.consentString || ""
          });
        }

        r.uspConsent && l.deepSetValue(d, "regs.ext.us_privacy", r.uspConsent), r.refererInfo && (d.site.page = r.refererInfo.referer);
      }

      var c = {},
          u = b.b.getConfig("ix");

      if (u) {
        if ("object" === h(u.firstPartyData)) {
          var m = u.firstPartyData,
              f = "?";

          for (var y in m) {
            m.hasOwnProperty(y) && (f += "".concat(encodeURIComponent(y), "=").concat(encodeURIComponent(m[y]), "&"));
          }

          f = f.slice(0, -1), d.site.page += f;
        }

        "number" == typeof u.timeout && (c.t = u.timeout);
      }

      return c.s = e[0].params.siteId, c.v = i, c.r = JSON.stringify(d), c.ac = "j", c.sd = 1, 8.1 === i && (c.nf = 1), {
        method: "GET",
        url: "https://as-sec.casalemedia.com/cygnus",
        data: c
      };
    }

    var O = {
      code: "ix",
      gvlid: 10,
      supportedMediaTypes: d,
      isBidRequestValid: function isBidRequestValid(e) {
        if (!u(e.params.size)) return l.logError("ix bidder params: bid size has invalid format."), !1;
        if (!m(e.sizes, e.params.size)) return l.logError("ix bidder params: bid size is not included in ad unit sizes."), !1;
        if (e.hasOwnProperty("mediaType") && !l.contains(d, e.mediaType)) return !1;
        if (e.hasOwnProperty("mediaTypes") && !l.deepAccess(e, "mediaTypes.banner.sizes") && !l.deepAccess(e, "mediaTypes.video.playerSize")) return !1;
        if ("string" != typeof e.params.siteId && "number" != typeof e.params.siteId) return l.logError("ix bidder params: siteId must be string or number value."), !1;
        var r,
            t,
            i = e.params.hasOwnProperty("bidFloor"),
            a = e.params.hasOwnProperty("bidFloorCur");
        return !!(!i && !a || i && a && (r = e.params.bidFloor, t = e.params.bidFloorCur, Boolean("number" == typeof r && "string" == typeof t && t.match(/^[A-Z]{3}$/)))) || (l.logError("ix bidder params: bidFloor / bidFloorCur parameter has invalid format."), !1);
      },
      buildRequests: function buildRequests(e, r) {
        for (var t, i, a = [], n = [], s = [], o = null, d = 0; d < e.length; d++) {
          (o = e[d]).mediaType !== y.d && !l.deepAccess(o, "mediaTypes.video") || (o.mediaType === y.d || m(o.mediaTypes.video.playerSize, o.params.size) ? s.push(p(o)) : l.logError("Bid size is not included in video playerSize")), o.mediaType !== y.b && !l.deepAccess(o, "mediaTypes.banner") && (o.mediaType || o.mediaTypes) || n.push((i = void 0, (i = c(t = o)).banner = {}, i.banner.w = t.params.size[0], i.banner.h = t.params.size[1], i.banner.topframe = l.inIframe() ? 0 : 1, i));
        }

        return 0 < n.length && a.push(f(e, r, n, 7.2)), 0 < s.length && a.push(f(e, r, s, 8.1)), a;
      },
      interpretResponse: function interpretResponse(e, r) {
        var t = [];
        if (!e.hasOwnProperty("body") || !e.body.hasOwnProperty("seatbid")) return t;

        for (var i, a, n, s, o = e.body, d = o.seatbid, p = 0; p < d.length; p++) {
          if (d[p].hasOwnProperty("bid")) for (var c = d[p].bid, u = JSON.parse(r.data.r), m = 0; m < c.length; m++) {
            var f = P(c[m].impid, u.imp);
            i = c[m], a = o.cur, n = f, s = void 0, s = {}, I.hasOwnProperty(a) ? s.cpm = i.price / I[a] : s.cpm = i.price / v, s.requestId = i.impid, s.dealId = l.deepAccess(i, "ext.dealid"), s.netRevenue = x, s.currency = a, s.creativeId = i.hasOwnProperty("crid") ? i.crid : "-", l.deepAccess(i, "ext.vasturl") ? (s.vastUrl = i.ext.vasturl, s.width = n.video.w, s.height = n.video.h, s.mediaType = y.d, s.ttl = w) : (s.ad = i.adm, s.width = i.w, s.height = i.h, s.mediaType = y.b, s.ttl = g), s.meta = {}, s.meta.networkId = l.deepAccess(i, "ext.dspid"), s.meta.brandId = l.deepAccess(i, "ext.advbrandid"), s.meta.brandName = l.deepAccess(i, "ext.advbrand"), t.push(s);
          }
        }

        return t;
      },
      transformBidParams: function transformBidParams(e) {
        return l.convertTypes({
          siteID: "number"
        }, e);
      },
      getUserSyncs: function getUserSyncs(e) {
        return e.iframeEnabled ? [{
          type: "iframe",
          url: "https://js-sec.indexww.com/um/ixmatch.html"
        }] : [];
      }
    };
    Object(o.registerBidder)(O);
  }
}, [460]);
pbjsChunk([144], {
  557: function _(e, t, n) {
    e.exports = n(558);
  },
  558: function _(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), n.d(t, "USER_ID_CODE_TO_QUERY_ARG", function () {
      return m;
    }), n.d(t, "spec", function () {
      return a;
    });
    var d = n(3),
        r = n(1),
        c = n(0),
        s = n(2);

    function o(e, t) {
      return function (e) {
        if (Array.isArray(e)) return e;
      }(e) || function (e, t) {
        if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
        var n = [],
            r = !0,
            i = !1,
            a = void 0;

        try {
          for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0) {
            ;
          }
        } catch (e) {
          i = !0, a = e;
        } finally {
          try {
            r || null == o["return"] || o["return"]();
          } finally {
            if (i) throw a;
          }
        }

        return n;
      }(e, t) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }();
    }

    var i = [s.b, s.d],
        p = "hb_pb",
        u = "3.0.2",
        m = {
      britepoolid: "britepoolid",
      criteoId: "criteoid",
      digitrustid: "digitrustid",
      id5id: "id5id",
      idl_env: "lre",
      lipb: "lipbid",
      netId: "netid",
      parrableid: "parrableid",
      pubcid: "pubcid",
      tdid: "ttduuid"
    },
        a = {
      code: "openx",
      gvlid: 69,
      supportedMediaTypes: i,
      isBidRequestValid: function isBidRequestValid(e) {
        var t = e.params.delDomain || e.params.platform;
        return c.deepAccess(e, "mediaTypes.banner") && t ? !!e.params.unit || 0 < c.deepAccess(e, "mediaTypes.banner.sizes.length") : !(!e.params.unit || !t);
      },
      buildRequests: function buildRequests(e, r) {
        if (0 === e.length) return [];
        var i = [],
            t = o(e.reduce(function (e, t) {
          var n;
          return n = t, c.deepAccess(n, "mediaTypes.video") && !c.deepAccess(n, "mediaTypes.banner") || n.mediaType === s.d ? e[0].push(t) : e[1].push(t), e;
        }, [[], []]), 2),
            n = t[0],
            a = t[1];
        return 0 < a.length && i.push(function (e, t) {
          var r = [],
              i = !1,
              n = l(e, t),
              a = c._map(e, function (e) {
            return e.params.unit;
          });

          n.aus = c._map(e, function (e) {
            return c.parseSizesInput(e.mediaTypes.banner.sizes).join(",");
          }).join("|"), n.divIds = c._map(e, function (e) {
            return encodeURIComponent(e.adUnitCode);
          }).join(","), a.some(function (e) {
            return e;
          }) && (n.auid = a.join(","));
          e.some(function (e) {
            return e.params.doNotTrack;
          }) && (n.ns = 1);
          !0 !== d.b.getConfig("coppa") && !e.some(function (e) {
            return e.params.coppa;
          }) || (n.tfcd = 1);
          e.forEach(function (t) {
            if (t.params.customParams) {
              var e = c._map(Object.keys(t.params.customParams), function (e) {
                return function (e, t) {
                  var n = t[e];
                  c.isArray(n) && (n = n.join(","));
                  return (e.toLowerCase() + "=" + n.toLowerCase()).replace("+", ".").replace("/", "_");
                }(e, t.params.customParams);
              }),
                  n = window.btoa(e.join("&"));

              i = !0, r.push(n);
            } else r.push("");
          }), i && (n.tps = r.join(","));
          var s = [],
              o = !1;
          e.forEach(function (e) {
            e.params.customFloor ? (s.push(Math.round(100 * e.params.customFloor) / 100 * 1e3), o = !0) : s.push(0);
          }), o && (n.aumfs = s.join(","));
          return {
            method: "GET",
            url: n.ph ? "https://u.openx.net/w/1.0/arj" : "https://".concat(e[0].params.delDomain, "/w/1.0/arj"),
            data: n,
            payload: {
              bids: e,
              startTime: new Date()
            }
          };
        }(a, r)), 0 < n.length && n.forEach(function (e) {
          var t, n;
          i.push({
            method: "GET",
            url: (n = function (e, t) {
              var n,
                  r,
                  i = l([e], t),
                  a = c.deepAccess(e, "params.video") || {},
                  s = c.deepAccess(e, "mediaTypes.video.context"),
                  o = c.deepAccess(e, "mediaTypes.video.playerSize");
              c.isArray(e.sizes) && 2 === e.sizes.length && !c.isArray(e.sizes[0]) ? (n = parseInt(e.sizes[0], 10), r = parseInt(e.sizes[1], 10)) : c.isArray(e.sizes) && c.isArray(e.sizes[0]) && 2 === e.sizes[0].length ? (n = parseInt(e.sizes[0][0], 10), r = parseInt(e.sizes[0][1], 10)) : c.isArray(o) && 2 === o.length && (n = parseInt(o[0], 10), r = parseInt(o[1], 10));
              Object.keys(a).forEach(function (e) {
                "openrtb" === e ? (a[e].w = n || a[e].w, a[e].v = r || a[e].v, i[e] = JSON.stringify(a[e])) : e in i || "url" === e || (i[e] = a[e]);
              }), i.auid = e.params.unit, i.vwd = n || a.vwd, i.vht = r || a.vht, "outstream" === s && (i.vos = "101");
              a.mimes && (i.vmimes = a.mimes);
              return i;
            }(t = e, r)).ph ? "https://u.openx.net/v/1.0/avjp" : "https://".concat(t.params.delDomain, "/v/1.0/avjp"),
            data: n,
            payload: {
              bid: t,
              startTime: new Date()
            }
          });
        }), i;
      },
      interpretResponse: function interpretResponse(e, t) {
        var n = e.body;
        return ((/avjp$/.test(t.url) ? s.d : s.b) === s.d ? function (e, t) {
          var n = t.bid,
              r = (t.startTime, []);

          if (void 0 !== e && "" !== e.vastUrl && 0 < e.pub_rev) {
            var i = c.parseUrl(e.vastUrl).search || {},
                a = {};
            a.requestId = n.bidId, a.ttl = 300, a.netRevenue = !0, a.currency = e.currency, a.cpm = parseInt(e.pub_rev, 10) / 1e3, a.width = parseInt(e.width, 10), a.height = parseInt(e.height, 10), a.creativeId = e.adid, a.vastUrl = e.vastUrl, a.mediaType = s.d, e.ph = i.ph, e.colo = i.colo, e.ts = i.ts, r.push(a);
          }

          return r;
        } : function (e, t) {
          for (var n = t.bids, r = (t.startTime, e.ads.ad), i = [], a = 0; a < r.length; a++) {
            var s = r[a],
                o = parseInt(s.idx, 10),
                d = {};

            if (d.requestId = n[o].bidId, s.pub_rev) {
              d.cpm = Number(s.pub_rev) / 1e3;
              var c = s.creative[0];
              c && (d.width = c.width, d.height = c.height), d.creativeId = c.id, d.ad = s.html, s.deal_id && (d.dealId = s.deal_id), d.ttl = 300, d.netRevenue = !0, d.currency = s.currency, s.tbd && (d.tbd = s.tbd), d.ts = s.ts, d.meta = {}, s.brand_id && (d.meta.brandId = s.brand_id), s.adv_id && (d.meta.dspid = s.adv_id), i.push(d);
            }
          }

          return i;
        })(n, t.payload);
      },
      getUserSyncs: function getUserSyncs(e, t, n, r) {
        if (e.iframeEnabled || e.pixelEnabled) return [{
          type: e.iframeEnabled ? "iframe" : "image",
          url: c.deepAccess(t, "0.body.ads.pixels") || c.deepAccess(t, "0.body.pixels") || function (e, t) {
            var n = [];
            e && (n.push("gdpr=" + (e.gdprApplies ? 1 : 0)), n.push("gdpr_consent=" + encodeURIComponent(e.consentString || "")));
            t && n.push("us_privacy=" + encodeURIComponent(t));
            return "".concat("https://u.openx.net/w/1.0/pd").concat(0 < n.length ? "?" + n.join("&") : "");
          }(n, r)
        }];
      },
      transformBidParams: function transformBidParams(e) {
        return c.convertTypes({
          unit: "string",
          customFloor: "number"
        }, e);
      }
    };

    function l(e, t) {
      var n,
          r,
          i,
          a,
          s = c.inIframe();

      if (n = {
        ju: d.b.getConfig("pageUrl") || t.refererInfo.referer,
        ch: document.charSet || document.characterSet,
        res: "".concat(screen.width, "x").concat(screen.height, "x").concat(screen.colorDepth),
        ifr: s,
        tz: new Date().getTimezoneOffset(),
        tws: function (e) {
          var t,
              n,
              r,
              i = window,
              a = document,
              s = a.documentElement;

          if (e) {
            try {
              i = window.top, a = window.top.document;
            } catch (e) {
              return;
            }

            s = a.documentElement, r = a.body, t = i.innerWidth || s.clientWidth || r.clientWidth, n = i.innerHeight || s.clientHeight || r.clientHeight;
          } else s = a.documentElement, t = i.innerWidth || s.clientWidth, n = i.innerHeight || s.clientHeight;

          return "".concat(t, "x").concat(n);
        }(s),
        be: 1,
        bc: e[0].params.bc || "".concat(p, "_").concat(u),
        dddid: c._map(e, function (e) {
          return e.transactionId;
        }).join(","),
        nocache: new Date().getTime()
      }, e[0].params.platform && (n.ph = e[0].params.platform), t.gdprConsent) {
        var o = t.gdprConsent;
        void 0 !== o.consentString && (n.gdpr_consent = o.consentString), void 0 !== o.gdprApplies && (n.gdpr = o.gdprApplies ? 1 : 0), "iab" === d.b.getConfig("consentManagement.cmpApi") && (n.x_gdpr_f = 1);
      }

      return t && t.uspConsent && (n.us_privacy = t.uspConsent), c.deepAccess(e[0], "crumbs.pubcid") && c.deepSetValue(e[0], "userId.pubcid", c.deepAccess(e[0], "crumbs.pubcid")), r = n, i = e[0].userId, c._each(i, function (e, t) {
        var n = m[t];
        if (m.hasOwnProperty(t)) switch (t) {
          case "digitrustid":
            r[n] = c.deepAccess(e, "data.id");
            break;

          case "lipb":
            r[n] = e.lipbid;
            break;

          default:
            r[n] = e;
        }
      }), n = r, e[0].schain && (n.schain = (a = e[0].schain, "".concat(a.ver, ",").concat(a.complete, "!").concat(function (e) {
        var n = ["asi", "sid", "hp", "rid", "name", "domain"];
        return e.map(function (t) {
          return n.map(function (e) {
            return t[e] || "";
          }).join(",");
        }).join("!");
      }(a.nodes)))), n;
    }

    Object(r.registerBidder)(a);
  }
}, [557]);
pbjsChunk([107], {
  652: function _(e, r, t) {
    e.exports = t(653);
  },
  653: function _(e, r, t) {
    "use strict";

    Object.defineProperty(r, "__esModule", {
      value: !0
    }), t.d(r, "FASTLANE_ENDPOINT", function () {
      return o;
    }), t.d(r, "VIDEO_ENDPOINT", function () {
      return l;
    }), t.d(r, "SYNC_ENDPOINT", function () {
      return a;
    }), t.d(r, "spec", function () {
      return h;
    }), r.hasVideoMediaType = n, r.masSizeOrdering = c, r.determineRubiconVideoSizeId = S, r.getPriceGranularity = C, r.hasValidVideoParams = j, r.hasValidSupplyChainParams = k, r.encodeParam = T, r.resetUserSync = function () {
      R = !1;
    };
    var g = t(0),
        i = t(1),
        v = t(3),
        u = t(2);

    function b(e, r) {
      return function (e) {
        if (Array.isArray(e)) return e;
      }(e) || function (e, r) {
        if (!(Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e))) return;
        var t = [],
            i = !0,
            n = !1,
            o = void 0;

        try {
          for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (t.push(a.value), !r || t.length !== r); i = !0) {
            ;
          }
        } catch (e) {
          n = !0, o = e;
        } finally {
          try {
            i || null == s["return"] || s["return"]();
          } finally {
            if (n) throw o;
          }
        }

        return t;
      }(e, r) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }();
    }

    function y() {
      return (y = Object.assign || function (e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = arguments[r];

          for (var i in t) {
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          }
        }

        return e;
      }).apply(this, arguments);
    }

    function p(e, r, t) {
      return r in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = t, e;
    }

    function x(e) {
      return (x = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(e);
    }

    var o = "https://fastlane.rubiconproject.com/a/api/fastlane.json",
        l = "https://prebid-server.rubiconproject.com/openrtb2/auction",
        a = "https://eus.rubiconproject.com/usync.html",
        d = {
      FASTLANE: {
        id: "dt.id",
        keyv: "dt.keyv",
        pref: "dt.pref"
      },
      PREBID_SERVER: {
        id: "id",
        keyv: "keyv"
      }
    },
        f = {
      1: "468x60",
      2: "728x90",
      5: "120x90",
      8: "120x600",
      9: "160x600",
      10: "300x600",
      13: "200x200",
      14: "250x250",
      15: "300x250",
      16: "336x280",
      17: "240x400",
      19: "300x100",
      31: "980x120",
      32: "250x360",
      33: "180x500",
      35: "980x150",
      37: "468x400",
      38: "930x180",
      39: "750x100",
      40: "750x200",
      41: "750x300",
      42: "2x4",
      43: "320x50",
      44: "300x50",
      48: "300x300",
      53: "1024x768",
      54: "300x1050",
      55: "970x90",
      57: "970x250",
      58: "1000x90",
      59: "320x80",
      60: "320x150",
      61: "1000x1000",
      64: "580x500",
      65: "640x480",
      66: "930x600",
      67: "320x480",
      68: "1800x1000",
      72: "320x320",
      73: "320x160",
      78: "980x240",
      79: "980x300",
      80: "980x400",
      83: "480x300",
      85: "300x120",
      90: "548x150",
      94: "970x310",
      95: "970x100",
      96: "970x210",
      101: "480x320",
      102: "768x1024",
      103: "480x280",
      105: "250x800",
      108: "320x240",
      113: "1000x300",
      117: "320x100",
      125: "800x250",
      126: "200x600",
      144: "980x600",
      145: "980x150",
      152: "1000x250",
      156: "640x320",
      159: "320x250",
      179: "250x600",
      195: "600x300",
      198: "640x360",
      199: "640x200",
      213: "1030x590",
      214: "980x360",
      221: "1x1",
      229: "320x180",
      230: "2000x1400",
      232: "580x400",
      234: "6x6",
      251: "2x2",
      256: "480x820",
      257: "400x600",
      258: "500x200",
      259: "998x200",
      264: "970x1000",
      265: "1920x1080",
      274: "1800x200",
      278: "320x500",
      282: "320x400",
      288: "640x380"
    };

    g._each(f, function (e, r) {
      return f[e] = r;
    });

    var h = {
      code: "rubicon",
      gvlid: 52,
      supportedMediaTypes: [u.b, u.d],
      isBidRequestValid: function isBidRequestValid(e) {
        if ("object" !== x(e.params)) return !1;

        for (var r = 0, t = ["accountId", "siteId", "zoneId"]; r < t.length; r++) {
          if (e.params[t[r]] = parseInt(e.params[t[r]]), isNaN(e.params[t[r]])) return g.logError("Rubicon: wrong format of accountId or siteId or zoneId."), !1;
        }

        var i = m(e, !0);
        return !!i && ("video" !== i || j(e));
      },
      buildRequests: function buildRequests(e, u) {
        var r = [],
            t = e.filter(function (e) {
          return "video" === m(e);
        }).map(function (e) {
          e.startTime = new Date().getTime();
          var r,
              t = {
            id: e.transactionId,
            test: v.b.getConfig("debug") ? 1 : 0,
            cur: ["USD"],
            source: {
              tid: e.transactionId
            },
            tmax: v.b.getConfig("TTL") || 1e3,
            imp: [{
              exp: 300,
              id: e.adUnitCode,
              secure: 1,
              ext: p({}, e.bidder, e.params),
              video: g.deepAccess(e, "mediaTypes.video") || {}
            }],
            ext: {
              prebid: {
                cache: {
                  vastxml: {
                    returnCreative: !1
                  }
                },
                targeting: {
                  includewinners: !0,
                  includebidderkeys: !1,
                  pricegranularity: C(v.b)
                },
                bidders: {
                  rubicon: {
                    integration: v.b.getConfig("rubicon.int_type") || "pbjs"
                  }
                }
              }
            }
          };
          if ("rubicon" !== e.bidder && (t.ext.prebid.aliases = p({}, e.bidder, "rubicon")), "function" != typeof e.getFloor || v.b.getConfig("rubicon.disableFloors")) r = parseFloat(g.deepAccess(e, "params.floor"));else {
            var i = e.getFloor({
              currency: "USD",
              mediaType: "video",
              size: A(e, "video")
            });
            r = "object" !== x(i) || "USD" !== i.currency || isNaN(parseInt(i.floor)) ? void 0 : parseFloat(i.floor);
          }
          isNaN(r) || (t.imp[0].bidfloor = r), t.imp[0].ext[e.bidder].video.size_id = S(e), function (r, t, e) {
            if (!r) return;
            "object" === x(v.b.getConfig("app")) ? r.app = v.b.getConfig("app") : r.site = {
              page: I(t, e)
            };
            "object" === x(v.b.getConfig("device")) && (r.device = v.b.getConfig("device"));
            t.params.video.language && ["site", "device"].forEach(function (e) {
              r[e] && (r[e].content = y({
                language: t.params.video.language
              }, r[e].content));
            });
          }(t, e, u), function (e, r) {
            "object" === x(e.imp[0].video) && void 0 === e.imp[0].video.skip && (e.imp[0].video.skip = r.params.video.skip);
            "object" === x(e.imp[0].video) && void 0 === e.imp[0].video.skipafter && (e.imp[0].video.skipafter = r.params.video.skipdelay);
            "object" === x(e.imp[0].video) && void 0 === e.imp[0].video.pos && ("atf" === r.params.position ? e.imp[0].video.pos = 1 : "btf" === r.params.position && (e.imp[0].video.pos = 3));
            var t = A(r, "video");
            e.imp[0].video.w = t[0], e.imp[0].video.h = t[1];
          }(t, e);

          var n,
              o = _(e, "PREBID_SERVER");

          o && g.deepSetValue(t, "user.ext.digitrust", o), u.gdprConsent && ("boolean" == typeof u.gdprConsent.gdprApplies && (n = u.gdprConsent.gdprApplies ? 1 : 0), g.deepSetValue(t, "regs.ext.gdpr", n), g.deepSetValue(t, "user.ext.consent", u.gdprConsent.consentString));
          u.uspConsent && g.deepSetValue(t, "regs.ext.us_privacy", u.uspConsent), e.userId && "object" === x(e.userId) && (e.userId.tdid || e.userId.pubcid || e.userId.lipb || e.userId.idl_env) && (g.deepSetValue(t, "user.ext.eids", []), e.userId.tdid && t.user.ext.eids.push({
            source: "adserver.org",
            uids: [{
              id: e.userId.tdid,
              ext: {
                rtiPartner: "TDID"
              }
            }]
          }), e.userId.pubcid && t.user.ext.eids.push({
            source: "pubcommon",
            uids: [{
              id: e.userId.pubcid
            }]
          }), e.userId.lipb && e.userId.lipb.lipbid && (t.user.ext.eids.push({
            source: "liveintent.com",
            uids: [{
              id: e.userId.lipb.lipbid
            }]
          }), t.user.ext.tpid = {
            source: "liveintent.com",
            uid: e.userId.lipb.lipbid
          }, Array.isArray(e.userId.lipb.segments) && e.userId.lipb.segments.length && g.deepSetValue(t, "rp.target.LIseg", e.userId.lipb.segments)), e.userId.idl_env && t.user.ext.eids.push({
            source: "liveramp.com",
            uids: [{
              id: e.userId.idl_env
            }]
          })), !0 === v.b.getConfig("coppa") && g.deepSetValue(t, "regs.coppa", 1), e.schain && k(e.schain) && g.deepSetValue(t, "source.ext.schain", e.schain);
          var a = y({}, e.params.inventory, v.b.getConfig("fpd.context")),
              s = y({}, e.params.visitor, v.b.getConfig("fpd.user"));

          if (!g.isEmpty(a) || !g.isEmpty(s)) {
            var d = {
              bidders: [u.bidderCode],
              config: {
                fpd: {}
              }
            };
            g.isEmpty(a) || (d.config.fpd.site = a), g.isEmpty(s) || (d.config.fpd.user = s), g.deepSetValue(t, "ext.prebid.bidderconfig.0", d);
          }

          var c = g.deepAccess(e, "fpd.context.pbAdSlot");
          return "string" == typeof c && c && g.deepSetValue(t.imp[0].ext, "context.data.adslot", c), e.storedAuctionResponse && g.deepSetValue(t.imp[0], "ext.prebid.storedauctionresponse.id", e.storedAuctionResponse.toString()), {
            method: "POST",
            url: l,
            data: t,
            bidRequest: e
          };
        });
        if (!0 !== v.b.getConfig("rubicon.singleRequest")) r = t.concat(e.filter(function (e) {
          return "banner" === m(e);
        }).map(function (e) {
          var i = h.createSlotParams(e, u);
          return {
            method: "GET",
            url: o,
            data: h.getOrderedParams(i).reduce(function (e, r) {
              var t = i[r];
              return g.isStr(t) && "" !== t || g.isNumber(t) ? "".concat(e).concat(T(r, t), "&") : e;
            }, "") + "slots=1&rand=".concat(Math.random()),
            bidRequest: e
          };
        }));else {
          var n = e.filter(function (e) {
            return "banner" === m(e);
          }).reduce(function (e, r) {
            return (e[r.params.siteId] = e[r.params.siteId] || []).push(r), e;
          }, {});
          r = t.concat(Object.keys(n).reduce(function (r, e) {
            var t, i;
            return t = n[e], i = 10, t.map(function (e, r) {
              return r % i == 0 ? t.slice(r, r + i) : null;
            }).filter(function (e) {
              return e;
            }).forEach(function (e) {
              var i = h.combineSlotUrlParams(e.map(function (e) {
                return h.createSlotParams(e, u);
              }));
              r.push({
                method: "GET",
                url: o,
                data: h.getOrderedParams(i).reduce(function (e, r) {
                  var t = i[r];
                  return g.isStr(t) && "" !== t || g.isNumber(t) ? "".concat(e).concat(T(r, t), "&") : e;
                }, "") + "slots=".concat(e.length, "&rand=").concat(Math.random()),
                bidRequest: e
              });
            }), r;
          }, []));
        }
        return r;
      },
      getOrderedParams: function getOrderedParams(e) {
        var r = /^tg_v/,
            t = /^tg_i/,
            i = ["account_id", "site_id", "zone_id", "size_id", "alt_size_ids", "p_pos", "gdpr", "gdpr_consent", "us_privacy", "rp_schain", "tpid_tdid", "tpid_liveintent.com", "tg_v.LIseg", "dt.id", "dt.keyv", "dt.pref", "rf", "p_geo.latitude", "p_geo.longitude", "kw"].concat(Object.keys(e).filter(function (e) {
          return r.test(e);
        })).concat(Object.keys(e).filter(function (e) {
          return t.test(e);
        })).concat(["tk_flint", "x_source.tid", "x_source.pchain", "p_screen_res", "rp_floor", "rp_secure", "tk_user_key"]);
        return i.concat(Object.keys(e).filter(function (e) {
          return -1 === i.indexOf(e);
        }));
      },
      combineSlotUrlParams: function combineSlotUrlParams(n) {
        if (1 === n.length) return n[0];
        var i = n.reduce(function (r, t, i) {
          return Object.keys(t).forEach(function (e) {
            r.hasOwnProperty(e) || (r[e] = new Array(n.length)), r[e].splice(i, 1, t[e]);
          }), r;
        }, {}),
            o = new RegExp("^([^;]*)(;\\1)+$");
        return Object.keys(i).forEach(function (e) {
          var r = i[e].join(";"),
              t = r.match(o);
          i[e] = t ? t[1] : r;
        }), i;
      },
      createSlotParams: function createSlotParams(e, r) {
        e.startTime = new Date().getTime();
        var t = e.params,
            i = A(e, "banner"),
            n = b(t.latLong || [], 2),
            o = n[0],
            a = n[1],
            s = v.b.getConfig("rubicon.int_type"),
            d = {
          account_id: t.accountId,
          site_id: t.siteId,
          zone_id: t.zoneId,
          size_id: i[0],
          alt_size_ids: i.slice(1).join(",") || void 0,
          rp_floor: .01 < (t.floor = parseFloat(t.floor)) ? t.floor : .01,
          rp_secure: "1",
          tk_flint: "".concat(s || "pbjs_lite", "_v3.20.0"),
          "x_source.tid": e.transactionId,
          "x_source.pchain": t.pchain,
          p_screen_res: [window.screen.width, window.screen.height].join("x"),
          tk_user_key: t.userId,
          "p_geo.latitude": isNaN(parseFloat(o)) ? void 0 : parseFloat(o).toFixed(4),
          "p_geo.longitude": isNaN(parseFloat(a)) ? void 0 : parseFloat(a).toFixed(4),
          "tg_fl.eid": e.code,
          rf: I(e, r)
        };

        if ("function" == typeof e.getFloor && !v.b.getConfig("rubicon.disableFloors")) {
          var c = e.getFloor({
            currency: "USD",
            mediaType: "banner",
            size: "*"
          });
          d.rp_hard_floor = "object" !== x(c) || "USD" !== c.currency || isNaN(parseInt(c.floor)) ? void 0 : c.floor;
        }

        d.p_pos = "atf" === t.position || "btf" === t.position ? t.position : "", e.userId && (e.userId.tdid && (d.tpid_tdid = e.userId.tdid), e.userId.lipb && e.userId.lipb.lipbid && (d["tpid_liveintent.com"] = e.userId.lipb.lipbid, Array.isArray(e.userId.lipb.segments) && e.userId.lipb.segments.length && (d["tg_v.LIseg"] = e.userId.lipb.segments.join(","))), e.userId.idl_env && (d["tpid_liveramp.com"] = e.userId.idl_env)), r.gdprConsent && ("boolean" == typeof r.gdprConsent.gdprApplies && (d.gdpr = Number(r.gdprConsent.gdprApplies)), d.gdpr_consent = r.gdprConsent.consentString), r.uspConsent && (d.us_privacy = encodeURIComponent(r.uspConsent));
        var u = y({}, t.visitor, v.b.getConfig("fpd.user"));
        Object.keys(u).forEach(function (e) {
          null != u[e] && "keywords" !== e && (d["tg_v.".concat(e)] = "object" !== x(u[e]) || Array.isArray(u[e]) ? u[e].toString() : JSON.stringify(u[e]));
        });
        var p = y({}, t.inventory, v.b.getConfig("fpd.context"));
        Object.keys(p).forEach(function (e) {
          null != p[e] && "keywords" !== e && (d["tg_i.".concat(e)] = "object" !== x(p[e]) || Array.isArray(p[e]) ? p[e].toString() : JSON.stringify(p[e]));
        });
        var l = (t.keywords || []).concat(g.deepAccess(v.b.getConfig("fpd.user"), "keywords") || [], g.deepAccess(v.b.getConfig("fpd.context"), "keywords") || []);
        d.kw = Array.isArray(l) && l.length ? l.join(",") : "";
        var f = g.deepAccess(e, "fpd.context.pbAdSlot");
        "string" == typeof f && f && (d["tg_i.dfp_ad_unit_code"] = f.replace(/^\/+/, ""));

        var m = _(e, "FASTLANE");

        return y(d, m), !0 === v.b.getConfig("coppa") && (d.coppa = 1), e.schain && k(e.schain) && (d.rp_schain = h.serializeSupplyChain(e.schain)), d;
      },
      serializeSupplyChain: function serializeSupplyChain(e) {
        if (!k(e)) return "";
        var r = e.ver,
            t = e.complete,
            i = e.nodes;
        return "".concat(r, ",").concat(t, "!").concat(h.serializeSupplyChainNodes(i));
      },
      serializeSupplyChainNodes: function serializeSupplyChainNodes(e) {
        var t = ["asi", "sid", "hp", "rid", "name", "domain"];
        return e.map(function (r) {
          return t.map(function (e) {
            return encodeURIComponent(r[e] || "");
          }).join(",");
        }).join("!");
      },
      interpretResponse: function interpretResponse(d, e) {
        var c = e.bidRequest;
        if (!(d = d.body) || "object" !== x(d)) return [];

        if (d.seatbid) {
          var r = g.deepAccess(d, "ext.errors.rubicon");
          Array.isArray(r) && 0 < r.length && g.logWarn("Rubicon: Error in video response");
          var o = [];
          return d.seatbid.forEach(function (n) {
            (n.bid || []).forEach(function (e) {
              var r = {
                requestId: c.bidId,
                currency: d.cur || "USD",
                creativeId: e.crid,
                cpm: e.price || 0,
                bidderCode: n.seat,
                ttl: 300,
                netRevenue: !1 !== v.b.getConfig("rubicon.netRevenue"),
                width: e.w || g.deepAccess(c, "mediaTypes.video.w") || g.deepAccess(c, "params.video.playerWidth"),
                height: e.h || g.deepAccess(c, "mediaTypes.video.h") || g.deepAccess(c, "params.video.playerHeight")
              };
              e.id && (r.seatBidId = e.id), e.dealid && (r.dealId = e.dealid);
              var t = g.deepAccess(d, "ext.responsetimemillis.rubicon");

              if (c && t && (c.serverResponseTimeMs = t), g.deepAccess(e, "ext.prebid.type") === u.d) {
                r.mediaType = u.d;
                var i = g.deepAccess(e, "ext.prebid.targeting");
                i && "object" === x(i) && (r.adserverTargeting = i), e.ext.prebid.cache && "object" === x(e.ext.prebid.cache.vastXml) && e.ext.prebid.cache.vastXml.cacheId && e.ext.prebid.cache.vastXml.url ? (r.videoCacheKey = e.ext.prebid.cache.vastXml.cacheId, r.vastUrl = e.ext.prebid.cache.vastXml.url) : i && i.hb_uuid && i.hb_cache_host && i.hb_cache_path && (r.videoCacheKey = i.hb_uuid, r.vastUrl = "https://".concat(i.hb_cache_host).concat(i.hb_cache_path, "?uuid=").concat(i.hb_uuid)), e.adm && (r.vastXml = e.adm), e.nurl && (r.vastUrl = e.nurl), !r.vastUrl && e.nurl && (r.vastUrl = e.nurl);
              } else g.logWarn("Rubicon: video response received non-video media type");

              o.push(r);
            });
          }), o;
        }

        var t = d.ads;
        return "object" !== x(c) || Array.isArray(c) || "video" !== m(c) || "object" !== x(t) || (t = t[c.adUnitCode]), !Array.isArray(t) || t.length < 1 ? [] : t.reduce(function (e, r, t) {
          if ("ok" !== r.status) return e;
          var i,
              n,
              o = Array.isArray(c) ? c[t] : c;

          if (o && "object" === x(o)) {
            var a = {
              requestId: o.bidId,
              currency: "USD",
              creativeId: r.creative_id || "".concat(r.network || "", "-").concat(r.advertiser || ""),
              cpm: r.cpm || 0,
              dealId: r.deal,
              ttl: 300,
              netRevenue: !1 !== v.b.getConfig("rubicon.netRevenue"),
              rubicon: {
                advertiserId: r.advertiser,
                networkId: r.network
              },
              meta: {
                advertiserId: r.advertiser,
                networkId: r.network
              }
            };
            if (r.creative_type && (a.mediaType = r.creative_type), r.creative_type === u.d) a.width = o.params.video.playerWidth, a.height = o.params.video.playerHeight, a.vastUrl = r.creative_depot_url, a.impression_id = r.impression_id, a.videoCacheKey = r.impression_id;else {
              a.ad = (i = r.script, n = r.impression_id, "<html>\n<head><script type='text/javascript'>inDapIF=true;<\/script></head>\n<body style='margin : 0; padding: 0;'>\n\x3c!-- Rubicon Project Ad Tag --\x3e\n<div data-rp-impression-id='".concat(n, "'>\n<script type='text/javascript'>").concat(i, "<\/script>\n</div>\n</body>\n</html>"));
              var s = b(f[r.size_id].split("x").map(function (e) {
                return Number(e);
              }), 2);
              a.width = s[0], a.height = s[1];
            }
            a.rubiconTargeting = (Array.isArray(r.targeting) ? r.targeting : []).reduce(function (e, r) {
              return e[r.key] = r.values[0], e;
            }, {
              rpfl_elemid: o.adUnitCode
            }), e.push(a);
          } else g.logError("Rubicon: bidRequest undefined at index position:".concat(t), c, d);

          return e;
        }, []).sort(function (e, r) {
          return (r.cpm || 0) - (e.cpm || 0);
        });
      },
      getUserSyncs: function getUserSyncs(e, r, t, i) {
        if (!R && e.iframeEnabled) {
          var n = "";
          return t && "string" == typeof t.consentString && ("boolean" == typeof t.gdprApplies ? n += "?gdpr=".concat(Number(t.gdprApplies), "&gdpr_consent=").concat(t.consentString) : n += "?gdpr_consent=".concat(t.consentString)), i && (n += "".concat(n ? "&" : "?", "us_privacy=").concat(encodeURIComponent(i))), R = !0, {
            type: "iframe",
            url: a + n
          };
        }
      },
      transformBidParams: function transformBidParams(e) {
        return g.convertTypes({
          accountId: "number",
          siteId: "number",
          zoneId: "number"
        }, e);
      }
    };

    function _(e, r) {
      var t,
          i = 0 < arguments.length && void 0 !== e ? e : {},
          n = 1 < arguments.length ? r : void 0;
      if (!n || !d[n]) return null;
      var o = d[n];

      var a = function () {
        var e = g.deepAccess(i, "userId.digitrustid.data");
        if (e) return e;
        var r = window.DigiTrust && (v.b.getConfig("digiTrustId") || window.DigiTrust.getUser({
          member: "T9QSFKPDN9"
        }));
        return r && r.success && r.identity || null;
      }();

      if (!a || a.privacy && a.privacy.optout) return null;
      var s = (p(t = {}, o.id, a.id), p(t, o.keyv, a.keyv), t);
      return o.pref && (s[o.pref] = 0), s;
    }

    function I(e, r) {
      var t = v.b.getConfig("pageUrl");
      return t = e.params.referrer ? e.params.referrer : t || r.refererInfo.referer, e.params.secure ? t.replace(/^http:/i, "https:") : t;
    }

    function A(e, r) {
      var t = e.params;

      if ("video" === r) {
        var i = [];
        return t.video && t.video.playerWidth && t.video.playerHeight ? i = [t.video.playerWidth, t.video.playerHeight] : Array.isArray(g.deepAccess(e, "mediaTypes.video.playerSize")) && 1 === e.mediaTypes.video.playerSize.length ? i = e.mediaTypes.video.playerSize[0] : Array.isArray(e.sizes) && 0 < e.sizes.length && Array.isArray(e.sizes[0]) && 1 < e.sizes[0].length && (i = e.sizes[0]), i;
      }

      var n = [];
      return Array.isArray(t.sizes) ? n = t.sizes : void 0 !== g.deepAccess(e, "mediaTypes.banner.sizes") ? n = s(e.mediaTypes.banner.sizes) : Array.isArray(e.sizes) && 0 < e.sizes.length ? n = s(e.sizes) : g.logWarn("Rubicon: no sizes are setup or found"), c(n);
    }

    function s(e) {
      return g.parseSizesInput(e).reduce(function (e, r) {
        var t = parseInt(f[r], 10);
        return t && e.push(t), e;
      }, []);
    }

    function n(e) {
      return "object" === x(g.deepAccess(e, "params.video")) && void 0 !== g.deepAccess(e, "mediaTypes.".concat(u.d));
    }

    function m(e, r) {
      var t = 1 < arguments.length && void 0 !== r && r;
      return n(e) ? -1 === ["outstream", "instream"].indexOf(g.deepAccess(e, "mediaTypes.".concat(u.d, ".context"))) ? void (t && g.logError("Rubicon: mediaTypes.video.context must be outstream or instream")) : A(e, "video").length < 2 ? void (t && g.logError("Rubicon: could not determine the playerSize of the video")) : (t && g.logMessage("Rubicon: making video request for adUnit", e.adUnitCode), "video") : 0 === A(e, "banner").length ? void (t && g.logError("Rubicon: could not determine the sizes for banner request")) : (t && g.logMessage("Rubicon: making banner request for adUnit", e.adUnitCode), "banner");
    }

    function c(e) {
      var n = [15, 2, 9];
      return e.sort(function (e, r) {
        var t = n.indexOf(e),
            i = n.indexOf(r);
        return -1 < t || -1 < i ? -1 === t ? 1 : -1 === i ? -1 : t - i : e - r;
      });
    }

    function S(e) {
      var r = parseInt(g.deepAccess(e, "params.video.size_id"));
      return isNaN(r) ? "outstream" === g.deepAccess(e, "mediaTypes.".concat(u.d, ".context")) ? 203 : 201 : r;
    }

    function C(e) {
      return {
        ranges: {
          low: [{
            max: 5,
            increment: .5
          }],
          medium: [{
            max: 20,
            increment: .1
          }],
          high: [{
            max: 20,
            increment: .01
          }],
          auto: [{
            max: 5,
            increment: .05
          }, {
            min: 5,
            max: 10,
            increment: .1
          }, {
            min: 10,
            max: 20,
            increment: .5
          }],
          dense: [{
            max: 3,
            increment: .01
          }, {
            min: 3,
            max: 8,
            increment: .05
          }, {
            min: 8,
            max: 20,
            increment: .5
          }],
          custom: e.getConfig("customPriceBucket") && e.getConfig("customPriceBucket").buckets
        }[e.getConfig("priceGranularity")]
      };
    }

    function j(r) {
      var t = !0,
          e = Object.prototype.toString.call([]),
          i = Object.prototype.toString.call(0),
          n = {
        mimes: e,
        protocols: e,
        maxduration: i,
        linearity: i,
        api: e
      };
      return Object.keys(n).forEach(function (e) {
        Object.prototype.toString.call(g.deepAccess(r, "mediaTypes.video." + e)) !== n[e] && (t = !1, g.logError("Rubicon: mediaTypes.video." + e + " is required and must be of type: " + n[e]));
      }), t;
    }

    function k(e) {
      var r = !1,
          t = ["asi", "sid", "hp"];
      return e.nodes && ((r = e.nodes.reduce(function (e, r) {
        return e ? t.every(function (e) {
          return r[e];
        }) : e;
      }, !0)) || g.logError("Rubicon: required schain params missing")), r;
    }

    function T(e, r) {
      return "rp_schain" === e ? "rp_schain=".concat(r) : "".concat(e, "=").concat(encodeURIComponent(r));
    }

    var R = !1;
    Object(i.registerBidder)(h);
  }
}, [652]);
pbjs.processQueue();
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useGptSlot = function useGptSlot(_ref) {
  var path = _ref.path,
      size = _ref.size,
      id = _ref.id;
  React.useEffect(function () {
    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];
    googletag.cmd.push(function () {
      var definedSlot = window.googletag.defineSlot(path, size, id);
      if (_config.ADOMIK_ENABLED) definedSlot.setTargeting('ad_group', Adomik.randomAdGroup());
      if (_config.ADOMIK_ENABLED) definedSlot.setTargeting('ad_h', new Date().getUTCHours().toString());
      var entries = Object.entries(_user);

      for (var _i = 0, _entries = entries; _i < _entries.length; _i++) {
        var _entries$_i = _slicedToArray(_entries[_i], 2),
            key = _entries$_i[0],
            value = _entries$_i[1];

        definedSlot.setTargeting(key, value);
      }

      definedSlot.addService(window.googletag.pubads());
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });
  }, [path, size, id]);
};
"use strict";

var _addScript = function _addScript() {
  if (!window.googletag) {
    var script = document.createElement("script");
    script.src = "https://www.googletagservices.com/tag/js/gpt.js";
    script.async = true;
    document.body.appendChild(script);
  }
};

var _addScriptA9 = function _addScriptA9() {
  if (!window.apstag) {
    var q = function q(c, r) {
      window.apstag._Q.push([c, r]);
    };

    var script = document.createElement("script");
    script.src = "https://c.amazon-adsystem.com/aax2/apstag.js";
    script.async = true;
    document.body.appendChild(script);
    window.apstag = window.apstag || {
      _Q: []
    };

    if (typeof window.apstag.init === 'undefined') {
      window.apstag.init = function () {
        q('i', arguments);
      };
    }

    if (typeof window.apstag.fetchBids === 'undefined') {
      window.apstag.fetchBids = function () {
        q('f', arguments);
      };
    }

    if (typeof window.apstag.setDisplayBids === 'undefined') {
      window.apstag.setDisplayBids = function () {};
    }

    if (typeof window.apstag.setDisplayBids === 'undefined') {
      window.apstag.targetingKeys = function () {
        return [];
      };
    }
  }
};

var _addScriptPbjs = function _addScriptPbjs() {
  var pbjsConfig = {
    cache: {
      url: 'https://prebid.adnxs.com/pbc/v1/cache'
    },
    s2sConfig: {
      endpoint: 'https://prebid.adnxs.com/pbs/v1/auction',
      syncEndpoint: 'https://prebid.adnxs.com/pbs/v1/cookie_sync'
    },
    enableSendAllBids: true,
    priceGranularity: 'dense'
  };

  if (_config.ONETRUST_ENABLED) {
    pbjsConfig.consentManagement = {
      cmpApi: 'iab',
      timeout: 8000,
      allowAuctionWithoutConsent: true
    };
  }

  window.pbjs = window.pbjs || {
    que: []
  };
  window.pbjs.que.push(function () {
    window.pbjs.setConfig(pbjsConfig);
  });
};
"use strict";

var Adomik = {
  randomAdGroup: function randomAdGroup() {
    var rand = Math.random();

    switch (false) {
      case !(rand < 0.09):
        return 'ad_ex' + Math.floor(100 * rand);

      case !(rand < 0.1):
        return 'ad_bc';

      default:
        return 'ad_opt';
    }
  }
};
"use strict";

var _generateBidders = function _generateBidders(sizes) {
  var bidders = [{
    bidder: 'appnexus',
    user: {
      gender: _user.gender === 'm' ? 1 : _user.gender === 'f' ? 2 : 0,
      age: _user.age || 0
    },
    allowSmallerSizes: true,
    params: {
      placementId: _config.BIDDER_APPNEXUS_PLACEMENTID
    }
  }, {
    bidder: 'aol',
    params: {
      placement: _config.BIDDER_AOL_PLACEMENT,
      network: _config.BIDDER_AOL_NETWORK
    }
  }, {
    bidder: 'ix',
    params: {
      id: _config.BIDDER_IX_ID,
      siteId: _config.BIDDER_IX_SITEID,
      size: sizes[0]
    }
  }, {
    bidder: 'criteo',
    params: {
      zoneId: _config.BIDDER_CRITEO_ZONEID
    }
  }, {
    bidder: 'rubicon',
    params: {
      accountId: _config.BIDDER_RUBICON_ACCOUNTID,
      siteId: _config.BIDDER_RUBICON_SITEID,
      zoneId: _config.BIDDER_RUBICON_ZONEID
    }
  }, {
    bidder: 'openx',
    params: {
      unit: _config.BIDDER_OPENX_UNIT,
      delDomain: _config.BIDDER_OPENX_DELDOMAIN
    }
  }];
  return bidders;
};
"use strict";

var _log = function _log(msg) {
  if (_config.DEBUG) {
    console.log(msg);
  }
};
