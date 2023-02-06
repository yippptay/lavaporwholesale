avalaraSelectors = {
    avalaraForm: document.querySelector('[data-form-tax]'),
    checkoutStep: (Shopify.Checkout.OrderStatus) ? 'thank_you' : Shopify.Checkout.step,
    checkoutSubtotal: document.querySelector('[data-checkout-subtotal-price-target]'),
    checkoutTotal: document.querySelectorAll('[data-checkout-payment-due-target]'),
    cartItemsJSON: window.CheckoutJSON,
    checkoutForm: document.querySelectorAll('.main form.edit_checkout'),
    checkoutSummaryBody: document.querySelector('[data-order-summary-section] tbody'),
    shippingForm: document.querySelector('[data-step="contact_information"] form'),
    discountForms: [],
    discountRemoveForms: [],
    checkoutAddress: (window.avalaraExciseTheme.checkoutAddress) ? window.avalaraExciseTheme.checkoutAddress : {},
    customerId: (window.avalaraExciseTheme.customerId) ? window.avalaraExciseTheme.customerId : null,
    exciseData: '[data-excise-row]',
    exciseTax: '[data-value-check]',
};

/* Money formatter */
var Shopify = Shopify || {};
Shopify.money_format = "$";
Shopify.formatMoney = function (cents, format) {
    if (typeof cents == 'string') {
        cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || window.avalaraExciseTheme.moneyFormat);

    function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');

        if (isNaN(number) || number == null) {
            return 0;
        }

        number = (number / 100.0).toFixed(precision);

        var parts = number.split('.'),
            dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
            cents = parts[1] ? (decimal + parts[1]) : '';

        return dollars + cents;
    }

    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }

    return formatString.replace(placeholderRegex, value);
};
/* END Money formatter */

/* Polyfill for foreach */
if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

/* Polyfill for closest */
if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        let el = this;
        do {
            if (Element.prototype.matches.call(el, s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

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


/* Failure metafield */
var failureData = null;
if (window.avalaraExciseTheme.failureDefault) {
    failureData = (window.avalaraExciseTheme.failureDefault);
}

/* Automate avalara product */
var addressUpdated = 'false';
var discountUpdated = 'false';
var redirectedFromCart = 'false';
let errorMsg;

var variantAvalara = window.avalaraExciseTheme.taxVariantId;
if (avalaraSelectors.avalaraForm) avalaraSelectors.avalaraForm.querySelector('[name="id"]').setAttribute('value', variantAvalara);

var $exciseProduct = document.querySelector('[data-variant-id="' + variantAvalara + '"]'); // From Order Summary product listing
if ($exciseProduct) $exciseProduct.style.display = "none";

let addressObj = avalaraSelectors.checkoutAddress;
let addressValidation = null;
let avalaraData = {};

let formWatcher;

window.avalaraExcise = {
    init: function () {
        addressUpdated = sessionStorage.getItem("addressUpdated");
        discountUpdated = sessionStorage.getItem("discountUpdated");
        redirectedFromCart = localStorage.getItem("redirectedFromCart") || 'false';

        const taxAmount = (CheckoutJSON.avalaraProduct) ? CheckoutJSON.avalaraProduct.final_line_price : 0;
        errorMsg = (CheckoutJSON.avalaraProduct) ? CheckoutJSON.avalaraProduct.error : null;

        let emailPhoneInput = document.getElementById('checkout_email_or_phone') || document.getElementById('checkout_email') || document.getElementById('checkout_phone');
        let emailPhoneInputValue = (emailPhoneInput) ? emailPhoneInput.value.trim() : null;
        let phoneEmailError = document.getElementById('error-for-email_or_phone') || document.getElementById('error-for-email') || document.getElementById('error-for-phone');
        let zipCodeError = document.getElementById('error-for-zip');
        let cityError = document.getElementById('error-for-city');

        if ((avalaraSelectors.checkoutStep == 'contact_information' && emailPhoneInputValue == null) || addressObj.last_name == null || addressObj.address1 == null || addressObj.province == null || addressObj.zip == null || addressObj.city == null || addressObj.last_name == '' || addressObj.address1 == '' || addressObj.province == '' || addressObj.zip == '' || addressObj.city == '') {
            addressValidation = 'empty';
        } else if (avalaraSelectors.checkoutStep == 'contact_information' && (phoneEmailError || zipCodeError || cityError)) {
            addressValidation = 'invalid';
        }

        /* Set SubTotal text to calculating when Tax product with > 0 pricing in present in cart */
        if (CheckoutJSON.avalaraProduct && taxAmount > 0) {
            let updateSubTotal = setInterval(() => {
                if (avalaraSelectors.checkoutSubtotal) {
                    avalaraSelectors.checkoutSubtotal.innerText = 'calculating...';
                    avalaraSelectors.checkoutTotal.forEach((ele, index) => {
                        ele.innerText = 'calculating...';
                    });
                    clearInterval(updateSubTotal);
                }
            }, 100);
        }

        /* Add DOM Events after Load */
        const eventType = event.type;
        setTimeout(() => {
            avalaraExcise._addDataToAvalaraObj();
            avalaraExcise._updateTaxDetailsFromProduct();
            let invalidTransaction = false;
            if (!CheckoutJSON.avalaraProduct || (CheckoutJSON.avalaraProduct && !CheckoutJSON.avalaraProduct.transaction_log_id)) {
                invalidTransaction = true;
            }
            if (addressUpdated !== 'true' && !invalidTransaction && taxAmount <= 0 && addressValidation !== 'empty' && errorMsg && errorMsg.length > 0) {
                avalaraExcise._onAPIError(errorMsg);
            } else if (avalaraSelectors.checkoutStep === 'thank_you') {
                avalaraExcise._calculationForThankyouPage();
            } else if (!CheckoutJSON.avalaraProduct || addressUpdated === 'true' || discountUpdated === 'true' || redirectedFromCart === 'true') {
                if (avalaraSelectors.checkoutStep === 'contact_information') {
                    if (phoneEmailError || zipCodeError || cityError) {
                        addressValidation = 'invalid';
                    } else if (!addressObj.phone || !addressObj.last_name || !addressObj.address1 || !addressObj.province || !addressObj.zip || !addressObj.city) {
                        addressValidation = 'empty';
                    } else {
                        addressValidation = null;
                    }
                }
                if (!addressValidation) {
                    if (eventType !== 'page:change') {
                        avalaraExcise._calculateTaxAmount();
                    }
                }
            } else if (Shopify.Checkout.step === 'payment_method' && invalidTransaction) {
                avalaraExcise._calculateTaxAmount();
            }
            if (errorMsg) {
                avalaraExcise._onAPIError(errorMsg);
            }
        }, 100);


        /* Shipping Form Submit event capture to recall API on page load */
        const shippingForm = avalaraSelectors.shippingForm;
        if (shippingForm) {
            shippingForm.addEventListener('submit', () => {
                let province = shippingForm.querySelector('#checkout_shipping_address_province').value;
                let zipCode = shippingForm.querySelector('#checkout_shipping_address_zip').value;
                let city = shippingForm.querySelector('#checkout_shipping_address_city').value;
                if (province != null && zipCode != null && city != null) {
                    province = province.trim();
                    zipCode = zipCode.trim();
                    city = city.trim();
                    if ((province.length > 0 && addressObj.province_code != province) || (zipCode.length > 0 && addressObj.zip != zipCode) || (city.length > 0 && addressObj.city != city)) {
                        sessionStorage.setItem('addressUpdated', true);
                    }
                }
            });
        }

        avalaraSelectors.discountForms = [];
        let discountApplyName = 'checkout[reduction_code]';
        let discountInputs = document.querySelectorAll(`[name="${discountApplyName}"]`);
        discountInputs.forEach((input) => {
            let closestForm = input.closest('form');
            if (closestForm != null && closestForm != undefined) avalaraSelectors.discountForms.push(closestForm);
        });

        avalaraSelectors.discountRemoveForms = [];
        let discountRemoveName = 'checkout[clear_discount]';
        let removeInputs = document.querySelectorAll(`[name="${discountRemoveName}"]`);
        removeInputs.forEach((input) => {
            let closestForm = input.closest('form');
            if (closestForm != null && closestForm != undefined) avalaraSelectors.discountRemoveForms.push(closestForm);
        });

        if (avalaraSelectors.discountForms.length > 0) {
            //Rework on this part.
            const discountForms = avalaraSelectors.discountForms;
            discountForms.forEach((form) => {
                form.addEventListener('submit', (event) => {
                    let discountAdd = setInterval((e) => {
                        let addedTag = document.querySelector('[data-reduction-form="true"]');
                        if (addedTag != null) {
                            sessionStorage.setItem('discountUpdated', true);
                            location.reload(true);
                            clearInterval(discountAdd)
                        }
                    }, 1000);
                    setTimeout((e) => {
                        clearInterval(discountAdd)
                    }, 10000);
                });
            });
        }

        if (avalaraSelectors.discountRemoveForms.length > 0) {
            //Rework on this part.
            const discountRemoveForms = avalaraSelectors.discountRemoveForms;
            discountRemoveForms.forEach((form) => {
                form.addEventListener('submit', (event) => {
                    let discountRemove = setInterval((e) => {
                        let removeTag = document.querySelector('[data-reduction-form="true"]');
                        if (removeTag == null) {
                            sessionStorage.setItem('discountUpdated', true);
                            location.reload(true);
                            clearInterval(discountRemove)
                        }
                    }, 1000);
                    setTimeout((e) => {
                        clearInterval(discountRemove)
                    }, 10000);
                });
            });
        }


        /* Pricing table update on Shipping Radio change */
        const shippingOptions = document.querySelectorAll('[data-shipping-methods] input[type="radio"]');
        shippingOptions.forEach((input) => {
            input.addEventListener('change', (event) => {
                setTimeout(() => {
                    if (CheckoutJSON.avalaraProduct && CheckoutJSON.avalaraProduct.final_line_price > 0) {
                        avalaraSelectors.checkoutSubtotal.innerText = 'calculating...';
                        avalaraSelectors.checkoutTotal.forEach((ele, index) => {
                            ele.innerText = 'calculating...';
                        });
                        avalaraExcise._updateTaxDetailsFromProduct();
                    }
                });
            });
        })
    },

    /* getPrice from Default Product
    */
    getTaxPriceFromProduct() {
        let exciseTaxAmount = 0;
        let checkoutTotal = CheckoutJSON.total;
        const totalEle = document.querySelector('[data-checkout-payment-due-target]');

        if (totalEle) {
            const finalPrice = totalEle.dataset.checkoutPaymentDueTarget;
            const finalAmount = Shopify.formatMoney(finalPrice, window.avalaraExciseTheme.moneyFormat);
            checkoutTotal = finalAmount;
        }

        if (CheckoutJSON.avalaraProduct && CheckoutJSON.avalaraProduct.final_line_price) {
            exciseTaxAmount = CheckoutJSON.avalaraProduct.final_line_price;
        }

        return {total: checkoutTotal, subtotal: window.CheckoutJSON.subtotal, exciseTaxAmount: exciseTaxAmount};
    },

    /**
     * Add html of avalara if available on order summary
     */
    _updateTaxDetailsFromProduct: function () {
        if (!CheckoutJSON.avalaraProduct) {
            return;
        }
        $exciseProduct = document.querySelector('[data-variant-id="' + variantAvalara + '"]');
        if ($exciseProduct) {
            $exciseProduct.style.display = "none";
        }

        const taxPrice = avalaraExcise.getTaxPriceFromProduct();
        const finalTaxTotal = Shopify.formatMoney(taxPrice.exciseTaxAmount, window.avalaraExciseTheme.moneyFormat);
        setTimeout(() => {
            avalaraSelectors.checkoutSubtotal.innerText = taxPrice.subtotal;
            avalaraSelectors.checkoutTotal.forEach((ele, index) => {
                ele.innerText = taxPrice.total;
            });
            if (taxPrice.exciseTaxAmount > 0) {
                if (document.querySelector(avalaraSelectors.exciseData)) document.querySelector(avalaraSelectors.exciseData).remove();
                var ava_html = '<tr data-excise-row class="total-line total-line--excise-tax"><th class="total-line__name" scope="row">Excise Tax</th><td class="total-line__price"><span class="order-summary__emphasis skeleton-while-loading" data-value-check>' + finalTaxTotal + '</span></td></tr>';
                if (avalaraSelectors.checkoutSummaryBody) avalaraSelectors.checkoutSummaryBody.insertAdjacentHTML("beforeEnd", ava_html);
            } else {
                if (document.querySelector(avalaraSelectors.exciseData)) document.querySelector(avalaraSelectors.exciseData).remove();
            }
        }, 500);
    },

    /*  Function Use: set avalara JSON
    */
    _addDataToAvalaraObj: function () {
        let prodItems = [];
        avalaraSelectors.cartItemsJSON.items.forEach(function (item, e) {
            const product = item;
            let itemJSON = {
                variant_id: product.id,
                sku: product.sku,
                price: product.price,
                quantity: product.quantity,
                vendor: product.vendor,
                tags: product.tags,
            };
            prodItems.push(itemJSON);
        });

        avalaraData = {
            customer_id: avalaraSelectors.customerId,
            cart_items: prodItems,
            shipping_address: {
                country_code: addressObj.country_code,
                province_code: addressObj.province_code,
                province: addressObj.province,
                country: addressObj.country,
                city: addressObj.city,
                zip: addressObj.zip,
                address1: addressObj.address1,
                address2: addressObj.address2,
            }
        }
    },

    /* Function Use: Disable Submit Buttons on Checkout page.
    */
    _disableSubmitButtons: function () {
        formWatcher = setInterval(() => {
            for (let form of document.querySelectorAll('form')) {
                for (let submitButton of form.querySelectorAll('[type="submit"]')) {
                    submitButton.setAttribute('disabled', true);
                    if (submitButton.innerText !== 'Loading...') {
                        submitButton.setAttribute('data-original-text', submitButton.innerText.trim());
                        submitButton.innerText = 'Loading...';
                    }

                }
            }
        }, 50)

    },

    /* Function Use: Enable Submit Buttons on Checkout page.
    */
    _enableSubmitButtons: function () {
        if (formWatcher) {
            clearInterval(formWatcher);
        }
        for (let form of document.querySelectorAll('form')) {
            for (let submitButton of form.querySelectorAll('[type="submit"]')) {
                const originalText = submitButton.getAttribute('data-original-text');
                if (originalText) {
                    submitButton.innerText = originalText;
                    submitButton.removeAttribute('data-original-text');
                }
                submitButton.removeAttribute('disabled');
            }
        }
    },
    /* Function Use: To Add avalara product in checkout
    */
    _calculateTaxAmount: function () {
        if (document.querySelector('[data-avalara-error]')) {
            document.querySelector('[data-avalara-error]').remove();
        }
        sessionStorage.removeItem("addressUpdated");
        sessionStorage.removeItem("discountUpdated");
        localStorage.removeItem("redirectedFromCart");

        if (!addressValidation || discountUpdated === 'true') {
            let apiError = null;
            window.avalaraExcise._disableSubmitButtons();
            window.avalaraExcise.makeRequest({
                method: 'POST',
                url: '/apps/excise/create',
                params: JSON.stringify(avalaraData),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(function (request) {
                window.avalaraExcise._enableSubmitButtons();
                const responseJSON = request;
                const transactionLogId = (responseJSON && responseJSON.transaction_log_id) ? responseJSON.transaction_log_id : 'N/A';
                apiError = (responseJSON && responseJSON.error) ? responseJSON.error : '';
                if (responseJSON.required_excise === false) {
                    if (CheckoutJSON.avalaraProduct != null && CheckoutJSON.avalaraProduct != 'null') {
                        const transactionID = 'N/A';
                        avalaraExcise.updateExciseTax(CheckoutJSON.avalaraProduct.line, 0, transactionID, transactionLogId, '').then(response => {
                            window.avalaraExcise._disableSubmitButtons();
                            location.reload(true);
                        });
                    }
                } else {
                    const transactionID = responseJSON.TranId || 'N/A';
                    const responseTax = parseFloat(responseJSON.TotalTaxAmount) * 100;
                    if (avalaraSelectors.avalaraForm) {
                        avalaraSelectors.avalaraForm.querySelector('#avalara-transaction-id').value = transactionID;
                        avalaraSelectors.avalaraForm.querySelector('#transaction-log-id').value = transactionLogId;
                        if (!responseJSON.TotalTaxAmount) {
                            avalaraSelectors.avalaraForm.querySelector('#excise_properties').value = 0;
                        } else {
                            avalaraSelectors.avalaraForm.querySelector('#excise_properties').value = responseTax;
                        }
                    }
                    if (CheckoutJSON.avalaraProduct && parseFloat(CheckoutJSON.avalaraProduct.taxPrice) == responseTax) {
                        avalaraExcise._updateTaxDetailsFromProduct();
                        avalaraExcise.updateExciseTax(CheckoutJSON.avalaraProduct.line, responseTax, transactionID, transactionLogId, apiError).then(response => {
                            window.avalaraExcise._disableSubmitButtons();
                            location.reload(true);
                        });

                    } else if (CheckoutJSON.avalaraProduct && responseTax.toString() === 'NaN' || responseTax <= 0) {
                        avalaraExcise.updateExciseTax(CheckoutJSON.avalaraProduct.line, 0, transactionID, transactionLogId).then(response => {
                            window.avalaraExcise._disableSubmitButtons();
                            location.reload(true);
                        });
                    } else if (responseTax >= 0) {
                        if (CheckoutJSON.avalaraProduct) {
                            avalaraExcise.updateExciseTax(CheckoutJSON.avalaraProduct.line, responseTax, transactionID, transactionLogId, apiError).then(response => {
                                window.avalaraExcise._disableSubmitButtons();
                                location.reload(true);
                            });
                        } else {
                            let formdata = new FormData(avalaraSelectors.avalaraForm);
                            avalaraExcise.addExciseTax(formdata);
                        }
                    }
                }
            }).catch(function (request) {
                window.avalaraExcise._enableSubmitButtons();
                apiError = (request && request.error) ? request.error.error : '';
                if (request.status >= 500) {
                    Rollbar.error('Code[5]: API status failure while calculating excise tax.', request.error || null);
                    apiError = (window.avalaraExciseTheme) ? window.avalaraExciseTheme.failureDefault.place_order : '';
                } else {
                    const transactionLogId = (request && request.transaction_log_id) ? request.transaction_log_id : 'N/A';
                    if (CheckoutJSON.avalaraProduct && CheckoutJSON.avalaraProduct.line) {
                        avalaraExcise.updateExciseTax(CheckoutJSON.avalaraProduct.line, 0, 'N/A', transactionLogId, apiError).then(response => {
                            window.avalaraExcise._disableSubmitButtons();
                            location.reload(true);
                        });
                    } else if (avalaraSelectors.avalaraForm) {
                        avalaraSelectors.avalaraForm.querySelector('#excise_properties').value = 0;
                        avalaraSelectors.avalaraForm.querySelector('#checkout_failure').value = 'true';
                        avalaraSelectors.avalaraForm.querySelector('#avalara-transaction-id').value = 'N/A';
                        avalaraSelectors.avalaraForm.querySelector('#transaction-log-id').value = transactionLogId;
                        let errorInput = document.createElement("input");
                        errorInput.setAttribute("type", "text");
                        errorInput.setAttribute("name", "properties[avalara_error_msg]");
                        errorInput.setAttribute("value", apiError);
                        avalaraSelectors.avalaraForm.appendChild(errorInput);

                        let formdata = new FormData(avalaraSelectors.avalaraForm);
                        avalaraExcise.addExciseTax(formdata);
                    }
                    avalaraExcise._onAPIError(apiError);
                }
            })
        }
    },

    _onAPIError(error) {
        if (error) {
            let errorMsg = `<p data-avalara-error class="data-avalara-error" style="display: block;color: #e22120; border-color: #ff6d6d; -webkit-box-shadow: 0 0 0 1px #ff6d6d; box-shadow: 0 0 0 2px #ff6d6d; border: 2px transparent solid; border-radius: 3px; padding: 6px;  margin-bottom: 15px;">${error}</p>`;
            avalaraExcise._addErrorMsg(errorMsg, error);
        } else {
            if (failureData != null) {
                // search for error metafield
                let selectedDefault = failureData.selected_option;
                let errorMsg = `<p data-avalara-error class="data-avalara-error" style="display: block;color: #e22120; border-color: #ff6d6d; -webkit-box-shadow: 0 0 0 1px #ff6d6d; box-shadow: 0 0 0 2px #ff6d6d; border: 2px transparent solid; border-radius: 3px; padding: 6px;  margin-bottom: 15px;">${failureData[selectedDefault]}</p>`;
                avalaraExcise._addErrorMsg(errorMsg, failureData[selectedDefault]);
            } else {
                // create error metafield if not found
                let failReq = new XMLHttpRequest();
                failReq.open('POST', '/apps/excise/failover-metafield-create', true);
                failReq.send();
                failReq.responseType = 'json';
                failReq.onload = function (response) {
                    failureData = this.response;
                    let selectedDefault = failureData.selected_option;
                    let errorMsg = `<p data-avalara-error class="data-avalara-error" style="display: block;color: #e22120; border-color: #ff6d6d; -webkit-box-shadow: 0 0 0 1px #ff6d6d; box-shadow: 0 0 0 2px #ff6d6d; border: 2px transparent solid; border-radius: 3px; padding: 6px;  margin-bottom: 15px;">${failureData[selectedDefault]}</p>`;
                    avalaraExcise._addErrorMsg(errorMsg, failureData[selectedDefault]);
                }
            }
        }
        if (document.querySelector(avalaraSelectors.exciseData)) document.querySelector(avalaraSelectors.exciseData).style.display = "none";
    },

    _addErrorMsg: function (errorMsgHTML, errorMsg) { // add error to selector
        if (document.querySelector('[data-avalara-error]')) {
            document.querySelector('[data-avalara-error]').innerHTML = errorMsg;
        } else if (avalaraSelectors.checkoutForm) {
            avalaraSelectors.checkoutForm.forEach(function (ele, index) {
                if (ele.querySelector('.section__header')) {
                    ele.querySelector('.section__header').insertAdjacentHTML("afterend", errorMsgHTML)
                }
            });
        }
    },

    /* Function for remove item from cart */
    addExciseTaxOld: async function (formdata) {
        let request = new XMLHttpRequest();
        request.open('POST', '/cart/add.js', true);
        request.send(formdata);
        request.onload = function (response) {
            if (!request.status.toString().startsWith('2')) {
                Rollbar.error('Code[6]: Unable to remove item from cart.', this.response);
            }
            location.reload(true);
        }
    },

    addExciseTax: async function (formdata) {
        await window.avalaraExcise.makeRequest({
            method: 'POST',
            url: '/cart/add.js',
            params: formdata,
        }).then(response => {
            location.reload(true);
        }).catch(error => {
            Rollbar.error('Code[6]: Unable to remove item from cart.', error);
        });
    },

    /* Function for remove item from cart */
    updateExciseTax: async function (line, exciseTax, transaction_id, transaction_log_id, error) {
        try {
            exciseTax = exciseTax || 0;
            let checkout_failure = false;
            if (exciseTax <= 0) checkout_failure = true;
            let properties = {
                'avalara_excise_tax': exciseTax,
                'avalara_transaction_id': transaction_id,
                'transaction_log_id': transaction_log_id,
                'checkout_failure': checkout_failure
            };
            if (error) {
                properties.avalara_error_msg = error
            }

            const data = {
                'line': line,
                'quantity': 1,
                'properties': properties
            };

            return await window.avalaraExcise.makeRequest({
                method: 'POST',
                url: '/cart/change.js',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                params: JSON.stringify(data),
            });
        } catch (error) {
            Rollbar.error('Code[7]: Unable to update Excise tax. ', error);
            return false;
        }

    },

    _calculationForThankyouPage: function () {
        const orderItems = document.querySelectorAll('[data-order-summary-section] .product');
        let taxAmount = 0;
        let taxproductFound = false;
        orderItems.forEach(function (ele, index) {
            const textContent = ele.textContent.toLowerCase();
            if (textContent.indexOf("excise tax") > -1 || textContent.indexOf("excise_tax") > -1) {
                taxproductFound = true;
                ele.style.display = "none";
                taxAmount = ele.querySelector('.product__price span').textContent;
            }
        });

        if (taxproductFound) {
            let ava_html = `<tr data-excise-row class="total-line total-line--excise-tax"><th class="total-line__name" scope="row">Excise Tax</th><td class="total-line__price"><span class="order-summary__emphasis skeleton-while-loading" data-value-check>${taxAmount}</span></td></tr>`;
            avalaraSelectors.checkoutSummaryBody.insertAdjacentHTML("beforeEnd", ava_html);
            if (avalaraSelectors.checkoutSubtotal) avalaraSelectors.checkoutSubtotal.innerText = window.CheckoutJSON.subtotal;
        }
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
            if (request.headers) {
                Object.keys(request.headers).forEach(function (key) {
                    xhr.setRequestHeader(key, request.headers[key]);
                });
            }
            xhr.send(request.params);
        });
    }
};

(function ($) {
    $(document).on("page:load page:change", async function (event) {
        if (avalaraSelectors.checkoutStep !== 'thank_you') {
            let cartData = null;
            const cartItems = [];
            const avalaraProduct = {};

            await window.avalaraExcise.makeRequest({
                method: 'GET',
                url: '/cart.json',
            }).then(response => {
                cartData = response;
                if (cartData != null) {
                    cartData.items.forEach((item, i) => {
                        let index = i + 1;
                        if (item.properties && item.properties.avalara_excise_tax !== undefined) {
                            avalaraProduct.line = index;
                            avalaraProduct.final_line_price = (item.final_price / 100).toFixed(2);
                            avalaraProduct.taxPrice = item.properties.avalara_excise_tax;
                            avalaraProduct.error = item.properties['avalara_error_msg'];
                            avalaraProduct.transaction_id = item.properties['avalara_transaction_id'];
                            avalaraProduct.transaction_log_id = item.properties['transaction_log_id'];
                        } else {
                            let itemJSON = {
                                id: item.variant_id,
                                line: index,
                                title: item.title,
                                sku: (item.sku).substring(0, 50),
                                price: (item.final_price / 100).toFixed(2),
                                quantity: item.quantity,
                                vendor: item.vendor
                            };
                            cartItems.push(itemJSON);
                        }
                    });
                    if (avalaraProduct.line !== undefined) window.CheckoutJSON.avalaraProduct = avalaraProduct;
                    errorMsg = (CheckoutJSON.avalaraProduct) ? CheckoutJSON.avalaraProduct.error : null;
                }
            }).catch(error => {
                Rollbar.error('Code[8]: Unable to fetch cart data at checkout.', error);
            });

            if (event.type === 'page:load') {
                avalaraExcise.init();
            } else {
                avalaraSelectors.checkoutSubtotal = document.querySelector('[data-checkout-subtotal-price-target]');
                avalaraSelectors.checkoutSummaryBody = document.querySelector('[data-order-summary-section] tbody');
                avalaraExcise.init();
            }
        } else {
            avalaraExcise._calculationForThankyouPage();
        }
    });
})(Checkout.$);
