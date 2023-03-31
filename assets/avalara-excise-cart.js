/*Rollbar Snippet Start*/
var _rollbarConfig = {
    accessToken: "787ea76171d247609fd3526b7323e5cf",
    captureUncaught: false,
    captureUnhandledRejections: false,
    payload: {
        environment: "production",
        client: {
            javascript: {
                code_version: '1.0.0',
            }
        },
    }
};
!function (r) {
    var e = {};

    function o(n) {
        if (e[n]) return e[n].exports;
        var t = e[n] = {i: n, l: !1, exports: {}};
        return r[n].call(t.exports, t, t.exports, o), t.l = !0, t.exports
    }

    o.m = r, o.c = e, o.d = function (r, e, n) {
        o.o(r, e) || Object.defineProperty(r, e, {enumerable: !0, get: n})
    }, o.r = function (r) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(r, "__esModule", {value: !0})
    }, o.t = function (r, e) {
        if (1 & e && (r = o(r)), 8 & e) return r;
        if (4 & e && "object" == typeof r && r && r.__esModule) return r;
        var n = Object.create(null);
        if (o.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: r
        }), 2 & e && "string" != typeof r) for (var t in r) o.d(n, t, function (e) {
            return r[e]
        }.bind(null, t));
        return n
    }, o.n = function (r) {
        var e = r && r.__esModule ? function () {
            return r.default
        } : function () {
            return r
        };
        return o.d(e, "a", e), e
    }, o.o = function (r, e) {
        return Object.prototype.hasOwnProperty.call(r, e)
    }, o.p = "", o(o.s = 0)
}([function (r, e, o) {
    "use strict";
    var n = o(1), t = o(5);
    _rollbarConfig = _rollbarConfig || {}, _rollbarConfig.rollbarJsUrl = _rollbarConfig.rollbarJsUrl || "https://cdn.rollbar.com/rollbarjs/refs/tags/v2.25.0/rollbar.min.js", _rollbarConfig.async = void 0 === _rollbarConfig.async || _rollbarConfig.async;
    var a = n.setupShim(window, _rollbarConfig), l = t(_rollbarConfig);
    window.rollbar = n.Rollbar, a.loadFull(window, document, !_rollbarConfig.async, _rollbarConfig, l)
}, function (r, e, o) {
    "use strict";
    var n = o(2), t = o(3);

    function a(r) {
        return function () {
            try {
                return r.apply(this, arguments)
            } catch (r) {
                try {
                    console.error("[Rollbar]: Internal error", r)
                } catch (r) {
                }
            }
        }
    }

    var l = 0;

    function i(r, e) {
        this.options = r, this._rollbarOldOnError = null;
        var o = l++;
        this.shimId = function () {
            return o
        }, "undefined" != typeof window && window._rollbarShims && (window._rollbarShims[o] = {
            handler: e,
            messages: []
        })
    }

    var s = o(4), d = function (r, e) {
        return new i(r, e)
    }, c = function (r) {
        return new s(d, r)
    };

    function u(r) {
        return a((function () {
            var e = this, o = Array.prototype.slice.call(arguments, 0), n = {shim: e, method: r, args: o, ts: new Date};
            window._rollbarShims[this.shimId()].messages.push(n)
        }))
    }

    i.prototype.loadFull = function (r, e, o, n, t) {
        var l = !1, i = e.createElement("script"), s = e.getElementsByTagName("script")[0], d = s.parentNode;
        i.crossOrigin = "", i.src = n.rollbarJsUrl, o || (i.async = !0), i.onload = i.onreadystatechange = a((function () {
            if (!(l || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) {
                i.onload = i.onreadystatechange = null;
                try {
                    d.removeChild(i)
                } catch (r) {
                }
                l = !0, function () {
                    var e;
                    if (void 0 === r._rollbarDidLoad) {
                        e = new Error("rollbar.js did not load");
                        for (var o, n, a, l, i = 0; o = r._rollbarShims[i++];) for (o = o.messages || []; n = o.shift();) for (a = n.args || [], i = 0; i < a.length; ++i) if ("function" == typeof (l = a[i])) {
                            l(e);
                            break
                        }
                    }
                    "function" == typeof t && t(e)
                }()
            }
        })), d.insertBefore(i, s)
    }, i.prototype.wrap = function (r, e, o) {
        try {
            var n;
            if (n = "function" == typeof e ? e : function () {
                return e || {}
            }, "function" != typeof r) return r;
            if (r._isWrap) return r;
            if (!r._rollbar_wrapped && (r._rollbar_wrapped = function () {
                o && "function" == typeof o && o.apply(this, arguments);
                try {
                    return r.apply(this, arguments)
                } catch (o) {
                    var e = o;
                    throw e && ("string" == typeof e && (e = new String(e)), e._rollbarContext = n() || {}, e._rollbarContext._wrappedSource = r.toString(), window._rollbarWrappedError = e), e
                }
            }, r._rollbar_wrapped._isWrap = !0, r.hasOwnProperty)) for (var t in r) r.hasOwnProperty(t) && (r._rollbar_wrapped[t] = r[t]);
            return r._rollbar_wrapped
        } catch (e) {
            return r
        }
    };
    for (var p = "log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,captureEvent,captureDomContentLoaded,captureLoad".split(","), f = 0; f < p.length; ++f) i.prototype[p[f]] = u(p[f]);
    r.exports = {
        setupShim: function (r, e) {
            if (r) {
                var o = e.globalAlias || "Rollbar";
                if ("object" == typeof r[o]) return r[o];
                r._rollbarShims = {}, r._rollbarWrappedError = null;
                var l = new c(e);
                return a((function () {
                    e.captureUncaught && (l._rollbarOldOnError = r.onerror, n.captureUncaughtExceptions(r, l, !0), e.wrapGlobalEventHandlers && t(r, l, !0)), e.captureUnhandledRejections && n.captureUnhandledRejections(r, l, !0);
                    var a = e.autoInstrument;
                    return !1 !== e.enabled && (void 0 === a || !0 === a || "object" == typeof a && a.network) && r.addEventListener && (r.addEventListener("load", l.captureLoad.bind(l)), r.addEventListener("DOMContentLoaded", l.captureDomContentLoaded.bind(l))), r[o] = l, l
                }))()
            }
        }, Rollbar: c
    }
}, function (r, e, o) {
    "use strict";

    function n(r, e, o, n) {
        r._rollbarWrappedError && (n[4] || (n[4] = r._rollbarWrappedError), n[5] || (n[5] = r._rollbarWrappedError._rollbarContext), r._rollbarWrappedError = null);
        var t = e.handleUncaughtException.apply(e, n);
        o && o.apply(r, n), "anonymous" === t && (e.anonymousErrorsPending += 1)
    }

    r.exports = {
        captureUncaughtExceptions: function (r, e, o) {
            if (r) {
                var t;
                if ("function" == typeof e._rollbarOldOnError) t = e._rollbarOldOnError; else if (r.onerror) {
                    for (t = r.onerror; t._rollbarOldOnError;) t = t._rollbarOldOnError;
                    e._rollbarOldOnError = t
                }
                e.handleAnonymousErrors();
                var a = function () {
                    var o = Array.prototype.slice.call(arguments, 0);
                    n(r, e, t, o)
                };
                o && (a._rollbarOldOnError = t), r.onerror = a
            }
        }, captureUnhandledRejections: function (r, e, o) {
            if (r) {
                "function" == typeof r._rollbarURH && r._rollbarURH.belongsToShim && r.removeEventListener("unhandledrejection", r._rollbarURH);
                var n = function (r) {
                    var o, n, t;
                    try {
                        o = r.reason
                    } catch (r) {
                        o = void 0
                    }
                    try {
                        n = r.promise
                    } catch (r) {
                        n = "[unhandledrejection] error getting `promise` from event"
                    }
                    try {
                        t = r.detail, !o && t && (o = t.reason, n = t.promise)
                    } catch (r) {
                    }
                    o || (o = "[unhandledrejection] error getting `reason` from event"), e && e.handleUnhandledRejection && e.handleUnhandledRejection(o, n)
                };
                n.belongsToShim = o, r._rollbarURH = n, r.addEventListener("unhandledrejection", n)
            }
        }
    }
}, function (r, e, o) {
    "use strict";

    function n(r, e, o) {
        if (e.hasOwnProperty && e.hasOwnProperty("addEventListener")) {
            for (var n = e.addEventListener; n._rollbarOldAdd && n.belongsToShim;) n = n._rollbarOldAdd;
            var t = function (e, o, t) {
                n.call(this, e, r.wrap(o), t)
            };
            t._rollbarOldAdd = n, t.belongsToShim = o, e.addEventListener = t;
            for (var a = e.removeEventListener; a._rollbarOldRemove && a.belongsToShim;) a = a._rollbarOldRemove;
            var l = function (r, e, o) {
                a.call(this, r, e && e._rollbar_wrapped || e, o)
            };
            l._rollbarOldRemove = a, l.belongsToShim = o, e.removeEventListener = l
        }
    }

    r.exports = function (r, e, o) {
        if (r) {
            var t, a,
                l = "EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");
            for (t = 0; t < l.length; ++t) r[a = l[t]] && r[a].prototype && n(e, r[a].prototype, o)
        }
    }
}, function (r, e, o) {
    "use strict";

    function n(r, e) {
        this.impl = r(e, this), this.options = e, function (r) {
            for (var e = function (r) {
                return function () {
                    var e = Array.prototype.slice.call(arguments, 0);
                    if (this.impl[r]) return this.impl[r].apply(this.impl, e)
                }
            }, o = "log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,_createItem,wrap,loadFull,shimId,captureEvent,captureDomContentLoaded,captureLoad".split(","), n = 0; n < o.length; n++) r[o[n]] = e(o[n])
        }(n.prototype)
    }

    n.prototype._swapAndProcessMessages = function (r, e) {
        var o, n, t;
        for (this.impl = r(this.options); o = e.shift();) n = o.method, t = o.args, this[n] && "function" == typeof this[n] && ("captureDomContentLoaded" === n || "captureLoad" === n ? this[n].apply(this, [t[0], o.ts]) : this[n].apply(this, t));
        return this
    }, r.exports = n
}, function (r, e, o) {
    "use strict";
    r.exports = function (r) {
        return function (e) {
            if (!e && !window._rollbarInitialized) {
                for (var o, n, t = (r = r || {}).globalAlias || "Rollbar", a = window.rollbar, l = function (r) {
                    return new a(r)
                }, i = 0; o = window._rollbarShims[i++];) n || (n = o.handler), o.handler._swapAndProcessMessages(l, o.messages);
                window[t] = n, window._rollbarInitialized = !0
            }
        }
    }
}]);
/*Rollbar Snippet END*/

let avalaraProduct = null;
let avalaraProductIndex = null;

window.avalaraExcise = {
    _getCartData: () => {
        window.avalaraExcise.makeRequest({
            method: 'GET',
            url: '/cart.json',
        }).then(response => {
            if (response.item_count > 0) {
                avalaraExcise._manageExciseProduct(response);
            }
        }).catch(error => {
            Rollbar.error('Code[1]: Unable to fetch cart data.', error);
        });
    },

    _manageExciseProduct: (cart) => {
        avalaraProduct = null;
        avalaraProductIndex = null;
        let taxProductID = window.avalaraExciseTheme.taxVariantId;
        let index = 0;
        for (const item of cart.items) {
            if (item.id === taxProductID && item.properties && item.properties['avalara_excise_tax'] !== null) {
                avalaraProduct = item;
                avalaraProductIndex = index + 1;
                break;
            }
            index++;
        }

        if ((avalaraProduct && cart.item_count === 1) || (avalaraProduct && window.avalaraExciseTheme.isB2BCustomer)) {
            //Remove Excise product from cart, as it is the only product in cart.
            const body = {
                line: avalaraProductIndex,
                quantity: 0
            };
            window.avalaraExcise.makeRequest({
                method: 'POST',
                url: '/cart/change.js',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'xmlhttprequest'
                },
                params: JSON.stringify(body),
            }).then(response => {
                return response;
            }).then(json => {
                window.location.reload();
            }).catch(error => {
                Rollbar.error('Code[2]: Fail to remove excise product from cart.', error);
            });
        } else if (avalaraProduct) {
            // Reset Excise product property to 0, we will recalculate it on checkout
            const exciseTax = avalaraProduct.properties['avalara_excise_tax'];
            if (exciseTax > 0 || avalaraProduct.quantity > 1 || avalaraProduct.properties['avalara_transaction_id']) {
                const body = {
                    line: avalaraProductIndex,
                    quantity: 1,
                    properties: {
                        'avalara_excise_tax': 0
                    }
                };

                window.avalaraExcise.makeRequest({
                    method: 'POST',
                    url: '/cart/change.js',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'xmlhttprequest'
                    },
                    params: JSON.stringify(body),
                }).then(() => {
                    window.location.reload();
                }).catch(error => {
                    Rollbar.error('Code[3]: Failed to reset Excise Product.', error);
                });
            }
        } else if (window.avalaraExciseTheme && window.avalaraExciseTheme.taxVariantId && !window.avalaraExciseTheme.isB2BCustomer) {
            // Ådd Excise product with 0 value, we will calculate it on checkout
            const body = {
                id: window.avalaraExciseTheme.taxVariantId,
                quantity: 1,
                properties: {
                    'avalara_excise_tax': 0
                }
            };

            window.avalaraExcise.makeRequest({
                method: 'POST',
                url: '/cart/add.js',
                headers: {
                    'Content-Type': 'application/json',
                },
                params: JSON.stringify(body),
            }).then(() => {
                window.location.reload();
            }).catch(error => {
                Rollbar.error('Code[4]: Failed to add Excise Product in cart.', error);
            });
        }
    },

    init: () => {
        if (window.avalaraExcise.checkDraftOrder()) {
            localStorage.removeItem('AVALARA_DRAFT_ORDER');
        }
        avalaraExcise._getCartData();
    },

    checkDraftOrder: function () {
        let draftOrder = localStorage.getItem('AVALARA_DRAFT_ORDER');
        return draftOrder !== undefined && draftOrder !== null;
    },

    makeRequest: (request) => {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.open(request.method, request.url);
            xhr.responseType = 'json'
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response)
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText,
                        error: xhr.response
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText,
                    error: xhr.response
                });
            };
            if (request.headers !== undefined) {
                Object.keys(request.headers).forEach(function (key) {
                    xhr.setRequestHeader(key, request.headers[key]);
                });
            }
            xhr.send(request.params)
        });
    }
}

avalaraExcise.init();


function avalaraExciseXMLRequestCallback(callback) {
    var oldSend, i;
    if (XMLHttpRequest.callbacks) {
        XMLHttpRequest.callbacks.push(callback);
    } else {
        XMLHttpRequest.callbacks = [callback];
        oldSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function () {
            if (XMLHttpRequest.callbacks) {
                for (i = 0; i < XMLHttpRequest.callbacks.length; i++) {
                    XMLHttpRequest.callbacks[i](this);
                }
            }
            oldSend.apply(this, arguments);
        }
    }
}

function storeDraftOrder(order) {
    let orderData = {}
    orderData.id = order.id
    orderData.email = order.email
    orderData.line_items = order.line_items
    localStorage.setItem("AVALARA_DRAFT_ORDER", JSON.stringify(orderData));
}

avalaraExciseXMLRequestCallback(function (xhr) {
    let endpoints = ["/apps/wpdapp/api/order/draft"]
    var isStaged = false;
    const xhrReadyStageHandler = function () {
        // In local files, status is 0 upon success in Mozilla Firefox
        if (xhr.readyState === XMLHttpRequest.DONE) {
            isStaged = true;
            endpoints.forEach(function (endpoint) {
                if (xhr._url && xhr._url.includes(endpoint)) {
                    var status = xhr.status;
                    if ((status >= 200 && status < 400)) {
                        var response = JSON.parse(xhr.response)
                        if (!response.order.errors) {
                            storeDraftOrder(response.order.body.draft_order);
                            console.log('draft order stored in local storage');
                        }
                    }
                }
            });
        }
    };

    const interval = setInterval(function () {
        if (!isStaged) {
            xhrReadyStageHandler();
        }
        if (isStaged) {
            clearInterval(interval);
        }
    }, 500);

});
(function () {
    'use strict';

    // save the original methods before overwriting them
    Document.prototype._avalaraExciseAddEventListener = Document.prototype.addEventListener;
    Document.prototype._avalaraExciseRemoveEventListener = Document.prototype.removeEventListener;

    /**
     * [addEventListener description]
     * @param {[type]}  type       [description]
     * @param {[type]}  listener   [description]
     * @param {Boolean} useCapture [description]
     */

    Document.prototype._avalaraExciseAddEventListener = function (type, listener, useCapture = false) {

        // declare listener
        this._avalaraExciseAddEventListener(type, listener, useCapture);
        if (!this.avalaraExciseEventListenerList) this.avalaraExciseEventListenerList = {};
        if (!this.avalaraExciseEventListenerList[type]) this.avalaraExciseEventListenerList[type] = [];
        // add listener to  event tracking list
        this.avalaraExciseEventListenerList[type].push({type, listener, useCapture});
    };
    Document.prototype._avalaraExciseRemoveEventListener = function (type, listener, useCapture = false) {
        // remove listener
        this._avalaraExciseRemoveEventListener(type, listener, useCapture);

        if (!this.avalaraExciseEventListenerList) this.avalaraExciseEventListenerList = {};
        if (!this.avalaraExciseEventListenerList[type]) this.avalaraExciseEventListenerList[type] = [];
        for (let i = 0; i < this.avalaraExciseEventListenerList[type].length; i++) {

            if (this.avalaraExciseEventListenerList[type][i].listener === listener && this.avalaraExciseEventListenerList[type][i].useCapture === useCapture) {
                this.avalaraExciseEventListenerList[type].splice(i, 1);
                break;
            }
        }
        // if no more events of the removed event type are left,remove the group
        if (this.avalaraExciseEventListenerList[type].length == 0) delete this.avalaraExciseEventListenerList[type];
    };

    Document.prototype.avalaraExciseGetEventListeners = function (type) {
        if (!this.avalaraExciseEventListenerList) this.avalaraExciseEventListenerList = {};
        // return reqested listeners type or all them
        if (type === undefined) return this.avalaraExciseEventListenerList;
        return this.avalaraExciseEventListenerList[type];
    };
})();
