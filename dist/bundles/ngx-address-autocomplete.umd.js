(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-address-autocomplete', ['exports', '@angular/common', '@angular/core'], factory) :
    (factory((global['ngx-address-autocomplete'] = {}),global.ng.common,global.ng.core));
}(this, (function (exports,common,core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxAddressAutocompleteDirective = /** @class */ (function () {
        function NgxAddressAutocompleteDirective() {
            this.MAX_RADIUS = 100000;
            this.ELEMENT_INITIALIZATION_DELAY = 2000;
            this.onSelect = new core.EventEmitter();
            this.options = {};
            this.DEFAULT_KEY_MAPPING = {
                formatted_address: "vicinity",
                street: "street",
                street_number: "number",
                sublocality_level_1: "neighbourhood",
                administrative_area_level_2: "city",
                postal_code: "postalCode",
                administrative_area_level_1: "state",
                country: "country"
            };
        }
        /**
         * @return {?}
         */
        NgxAddressAutocompleteDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                setTimeout(( /**
                 * @return {?}
                 */function () {
                    /** @type {?} */
                    var inputId = _this.uniqueId;
                    /** @type {?} */
                    var div = document.querySelector("[ngx-address-autocomplete=" + inputId + "]");
                    if (!div)
                        console.warn(NgxAddressAutocompleteDirective.name +
                            ": Whoops! We were unable to find any divs with the id provided :(");
                    /** @type {?} */
                    var divIsAnInput = div && div.nodeName == "INPUT";
                    /** @type {?} */
                    var input = divIsAnInput
                        ? div
                        : document.querySelector("[ngx-address-autocomplete=" + inputId + "] input");
                    if (!input)
                        console.warn(NgxAddressAutocompleteDirective.name +
                            ": Whoops! Be sure to add the directive only to inputs or divs with input children )");
                    _this.generateAutocompleteInput(input);
                }), this.ELEMENT_INITIALIZATION_DELAY);
            };
        /**
         * @param {?} input
         * @return {?}
         */
        NgxAddressAutocompleteDirective.prototype.generateAutocompleteInput = /**
         * @param {?} input
         * @return {?}
         */
            function (input) {
                return __awaiter(this, void 0, void 0, function () {
                    var coordinates, e_1, autocomplete_1, circle;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, 3, 4]);
                                return [4 /*yield*/, this.getUserLocation()];
                            case 1:
                                coordinates = _a.sent();
                                return [3 /*break*/, 4];
                            case 2:
                                e_1 = _a.sent();
                                console.warn(e_1);
                                return [3 /*break*/, 4];
                            case 3:
                                if (coordinates) {
                                    /* In case the coordinates were obtained successfully */
                                    autocomplete_1 = new google.maps.places.Autocomplete(input, this.options);
                                    circle = new google.maps.Circle({
                                        center: ( /** @type {?} */(coordinates)),
                                        radius: this.options.radius || this.MAX_RADIUS
                                    });
                                    autocomplete_1.setBounds(circle.getBounds());
                                    autocomplete_1.addListener("place_changed", ( /**
                                     * @return {?}
                                     */function () {
                                        /** @type {?} */
                                        var place = autocomplete_1.getPlace();
                                        /** @type {?} */
                                        var address = _this.parseAddress(place);
                                        _this.onSelect.emit({ place: place, address: address });
                                    }));
                                }
                                return [7 /*endfinally*/];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            };
        /**
         * @return {?}
         */
        NgxAddressAutocompleteDirective.prototype.getUserLocation = /**
         * @return {?}
         */
            function () {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(( /**
                                 * @param {?} resolve
                                 * @param {?} reject
                                 * @return {?}
                                 */function (resolve, reject) {
                                window.navigator.geolocation.getCurrentPosition(( /**
                                 * @param {?} location
                                 * @return {?}
                                 */function (location) {
                                    resolve(_this.getLatLngFrom(location));
                                }), ( /**
                                 * @param {?} err
                                 * @return {?}
                                 */function (err) {
                                    reject(err);
                                }));
                            }))];
                    });
                });
            };
        /**
         * @param {?} location
         * @return {?}
         */
        NgxAddressAutocompleteDirective.prototype.getLatLngFrom = /**
         * @param {?} location
         * @return {?}
         */
            function (location) {
                /** @type {?} */
                var coordinates = typeof google !== "undefined"
                    ? new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
                    : this.createFallbackCoordinates(location);
                return coordinates;
            };
        /**
         * @param {?} nativeCoordinates
         * @return {?}
         */
        NgxAddressAutocompleteDirective.prototype.createFallbackCoordinates = /**
         * @param {?} nativeCoordinates
         * @return {?}
         */
            function (nativeCoordinates) {
                nativeCoordinates.lat = ( /**
                 * @return {?}
                 */function () {
                    return this.coords.latitude;
                });
                nativeCoordinates.lng = ( /**
                 * @return {?}
                 */function () {
                    return this.coords.longitude;
                });
                return nativeCoordinates;
            };
        /**
         * @param {?} gmapsAddressComponent
         * @param {?} addressComponentCode
         * @return {?}
         */
        NgxAddressAutocompleteDirective.prototype.getAddressElement = /**
         * @param {?} gmapsAddressComponent
         * @param {?} addressComponentCode
         * @return {?}
         */
            function (gmapsAddressComponent, addressComponentCode) {
                /** @type {?} */
                var value;
                gmapsAddressComponent.map(( /**
                 * @param {?} element
                 * @return {?}
                 */function (element) {
                    if (element.types &&
                        element.types.indexOf &&
                        element.types.indexOf(addressComponentCode) > -1)
                        value = element.short_name || element.long_name;
                }));
                return value;
            };
        /**
         * @param {?} place
         * @return {?}
         */
        NgxAddressAutocompleteDirective.prototype.getPlaceLatLng = /**
         * @param {?} place
         * @return {?}
         */
            function (place) {
                return {
                    lng: place.geometry.location.lng(),
                    lat: place.geometry.location.lat()
                };
            };
        /**
         * @param {?} place
         * @param {?=} keyMapping
         * @return {?}
         */
        NgxAddressAutocompleteDirective.prototype.getAddressFromPlace = /**
         * @param {?} place
         * @param {?=} keyMapping
         * @return {?}
         */
            function (place, keyMapping) {
                if (!place || !place.geometry) {
                    console.warn(NgxAddressAutocompleteDirective.name +
                        ": Whoops! It looks like the geometry property is missing from this place.");
                    return false;
                }
                /** @type {?} */
                var address = {};
                /** @type {?} */
                var addressKeys = keyMapping || this.DEFAULT_KEY_MAPPING;
                for (var i = 0; i < place.address_components.length; i++) {
                    /** @type {?} */
                    var infoType = place.address_components[i].types[0];
                    /** @type {?} */
                    var infoIsRequired = addressKeys[infoType];
                    if (infoIsRequired) {
                        /** @type {?} */
                        var infoValue = place.address_components[i]["long_name"];
                        address[addressKeys[infoType]] = infoValue;
                    }
                }
                address.vicinity = place.formatted_address;
                return address;
            };
        /**
         * @param {?} place
         * @return {?}
         */
        NgxAddressAutocompleteDirective.prototype.parseAddress = /**
         * @param {?} place
         * @return {?}
         */
            function (place) {
                if (!place)
                    return {};
                /** @type {?} */
                var rawAddress = place.address_components;
                /** @type {?} */
                var address = {};
                /* Parses address */
                address.streetNumber = this.getAddressElement(rawAddress, "street_number");
                address.location = this.getPlaceLatLng(place);
                address.street = this.getAddressElement(rawAddress, "route");
                address.number = this.getAddressElement(rawAddress, "street_number");
                address.neighbourhood = this.getAddressElement(rawAddress, "sublocality");
                address.city = this.getAddressElement(rawAddress, "administrative_area_level_2");
                address.state = this.getAddressElement(rawAddress, "administrative_area_level_1");
                address.country = this.getAddressElement(rawAddress, "country");
                address.postalCode = this.getAddressElement(rawAddress, "postal_code");
                /** @type {?} */
                var streetAlreadyHasNumber = address.street && !isNaN(parseInt(address.street.split(",")[1]));
                if (address.streetNumber && !streetAlreadyHasNumber)
                    address.street = address.street + ", " + address.streetNumber;
                return address;
            };
        NgxAddressAutocompleteDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: "[ngx-address-autocomplete]"
                    },] }
        ];
        NgxAddressAutocompleteDirective.ctorParameters = function () { return []; };
        NgxAddressAutocompleteDirective.propDecorators = {
            uniqueId: [{ type: core.Input, args: ["ngx-address-autocomplete",] }],
            onSelect: [{ type: core.Output }],
            options: [{ type: core.Input, args: ["options",] }]
        };
        return NgxAddressAutocompleteDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxAddressAutocompleteModule = /** @class */ (function () {
        function NgxAddressAutocompleteModule() {
        }
        NgxAddressAutocompleteModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
                        declarations: [NgxAddressAutocompleteDirective],
                        exports: [NgxAddressAutocompleteDirective]
                    },] }
        ];
        return NgxAddressAutocompleteModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgxAddressAutocompleteModule = NgxAddressAutocompleteModule;
    exports.NgxAddressAutocompleteDirective = NgxAddressAutocompleteDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-address-autocomplete.umd.js.map