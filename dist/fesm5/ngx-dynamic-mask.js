import { CommonModule } from '@angular/common';
import { __awaiter, __generator } from 'tslib';
import { Directive, EventEmitter, Input, Output, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxAddressAutocomplete = /** @class */ (function () {
    function NgxAddressAutocomplete() {
        this.MAX_RADIUS = 100000;
        this.ELEMENT_INITIALIZATION_DELAY = 2000;
        this.onSelect = new EventEmitter();
        this.options = {};
        this.DEFAULT_KEY_MAPPING = {
            'formatted_address': 'vicinity',
            'street': 'street',
            'street_number': 'number',
            'sublocality_level_1': 'neighbourhood',
            'administrative_area_level_2': 'city',
            'postal_code': 'postalCode',
            'administrative_area_level_1': 'state',
            'country': 'country'
        };
    }
    /**
     * @return {?}
     */
    NgxAddressAutocomplete.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            /** @type {?} */
            var inputId = _this.uniqueId;
            /** @type {?} */
            var div = document.querySelector("[ngx-address-autocomplete=" + inputId + "]");
            if (!div)
                console.warn(NgxAddressAutocomplete.name + ': Whoops! We were unable to find any divs with the id provided :(');
            /** @type {?} */
            var divIsAnInput = div && div.nodeName == 'INPUT';
            /** @type {?} */
            var input = divIsAnInput ? div : (document.querySelector("[ngx-address-autocomplete=" + inputId + "] input"));
            if (!input)
                console.warn(NgxAddressAutocomplete.name + ': Whoops! Be sure to add the directive only to inputs or divs with input children )');
            _this.generateAutocompleteInput(input);
        }, this.ELEMENT_INITIALIZATION_DELAY);
    };
    /**
     * @param {?} input
     * @return {?}
     */
    NgxAddressAutocomplete.prototype.generateAutocompleteInput = /**
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
                        if (coordinates) { /* In case the coordinates were obtained successfully */
                            /* In case the coordinates were obtained successfully */
                            autocomplete_1 = new google.maps.places.Autocomplete(input, this.options);
                            circle = new google.maps.Circle({
                                center: (/** @type {?} */ (coordinates)),
                                radius: this.options.radius || this.MAX_RADIUS
                            });
                            autocomplete_1.setBounds(circle.getBounds());
                            autocomplete_1.addListener('place_changed', function () {
                                /** @type {?} */
                                var place = autocomplete_1.getPlace();
                                /** @type {?} */
                                var address = _this.parseAddress(place);
                                _this.onSelect.emit({ place: place, address: address });
                            });
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
    NgxAddressAutocomplete.prototype.getUserLocation = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        window.navigator.geolocation.getCurrentPosition(function (location) {
                            resolve(_this.getLatLngFrom(location));
                        }, function (err) {
                            reject(err);
                        });
                    })];
            });
        });
    };
    /**
     * @param {?} location
     * @return {?}
     */
    NgxAddressAutocomplete.prototype.getLatLngFrom = /**
     * @param {?} location
     * @return {?}
     */
    function (location) {
        /** @type {?} */
        var coordinates = typeof google !== 'undefined' ? new google.maps.LatLng(location.coords.latitude, location.coords.longitude) : this.createFallbackCoordinates(location);
        return coordinates;
    };
    /**
     * @param {?} nativeCoordinates
     * @return {?}
     */
    NgxAddressAutocomplete.prototype.createFallbackCoordinates = /**
     * @param {?} nativeCoordinates
     * @return {?}
     */
    function (nativeCoordinates) {
        nativeCoordinates.lat = function () {
            return this.coords.latitude;
        };
        nativeCoordinates.lng = function () {
            return this.coords.longitude;
        };
        return nativeCoordinates;
    };
    /**
     * @param {?} gmapsAddressComponent
     * @param {?} addressComponentCode
     * @return {?}
     */
    NgxAddressAutocomplete.prototype.getAddressElement = /**
     * @param {?} gmapsAddressComponent
     * @param {?} addressComponentCode
     * @return {?}
     */
    function (gmapsAddressComponent, addressComponentCode) {
        /** @type {?} */
        var value;
        gmapsAddressComponent.map(function (element) {
            if (element.types && element.types.indexOf && (element.types.indexOf(addressComponentCode) > -1))
                value = element.short_name || element.long_name;
        });
        return value;
    };
    /**
     * @param {?} place
     * @return {?}
     */
    NgxAddressAutocomplete.prototype.getPlaceLatLng = /**
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
    NgxAddressAutocomplete.prototype.getAddressFromPlace = /**
     * @param {?} place
     * @param {?=} keyMapping
     * @return {?}
     */
    function (place, keyMapping) {
        if (!place || !place.geometry) {
            console.warn(NgxAddressAutocomplete.name + ': Whoops! It looks like the geometry property is missing from this place.');
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
                var infoValue = place.address_components[i]['long_name'];
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
    NgxAddressAutocomplete.prototype.parseAddress = /**
     * @param {?} place
     * @return {?}
     */
    function (place) {
        if (!place)
            return {};
        /** @type {?} */
        var rawAddress = place.address_components;
        /** @type {?} */
        var address = {}
        /* Parses address */
        ;
        /* Parses address */
        address.streetNumber = this.getAddressElement(rawAddress, 'street_number');
        address.location = this.getPlaceLatLng(place);
        address.street = this.getAddressElement(rawAddress, 'route');
        address.number = this.getAddressElement(rawAddress, 'street_number');
        address.neighbourhood = this.getAddressElement(rawAddress, 'sublocality');
        address.city = this.getAddressElement(rawAddress, 'administrative_area_level_2');
        address.state = this.getAddressElement(rawAddress, 'administrative_area_level_1');
        address.country = this.getAddressElement(rawAddress, 'country');
        address.postalCode = this.getAddressElement(rawAddress, 'postal_code');
        if (address.streetNumber)
            address.street = address.street + ', ' + address.streetNumber;
        return address;
    };
    NgxAddressAutocomplete.decorators = [
        { type: Directive, args: [{
                    selector: '[ngx-address-autocomplete]'
                },] }
    ];
    /** @nocollapse */
    NgxAddressAutocomplete.ctorParameters = function () { return []; };
    NgxAddressAutocomplete.propDecorators = {
        uniqueId: [{ type: Input, args: ['ngx-address-autocomplete',] }],
        onSelect: [{ type: Output }],
        options: [{ type: Input, args: ['options',] }]
    };
    return NgxAddressAutocomplete;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxAddressAutocompleteModule = /** @class */ (function () {
    function NgxAddressAutocompleteModule() {
    }
    NgxAddressAutocompleteModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [NgxAddressAutocomplete],
                    exports: [NgxAddressAutocomplete]
                },] }
    ];
    return NgxAddressAutocompleteModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxAddressAutocompleteModule, NgxAddressAutocomplete as ɵa };

//# sourceMappingURL=ngx-dynamic-mask.js.map