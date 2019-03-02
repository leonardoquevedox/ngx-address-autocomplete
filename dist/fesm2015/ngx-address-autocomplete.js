import { CommonModule } from '@angular/common';
import { __awaiter } from 'tslib';
import { Directive, EventEmitter, Input, Output, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxAddressAutocompleteDirective {
    constructor() {
        this.MAX_RADIUS = 100000;
        this.ELEMENT_INITIALIZATION_DELAY = 2000;
        this.onSelect = new EventEmitter();
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
    ngOnInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            let inputId = this.uniqueId;
            /** @type {?} */
            let div = document.querySelector(`[ngx-address-autocomplete=${inputId}]`);
            if (!div)
                console.warn(NgxAddressAutocompleteDirective.name +
                    ": Whoops! We were unable to find any divs with the id provided :(");
            /** @type {?} */
            let divIsAnInput = div && div.nodeName == "INPUT";
            /** @type {?} */
            let input = divIsAnInput
                ? div
                : document.querySelector(`[ngx-address-autocomplete=${inputId}] input`);
            if (!input)
                console.warn(NgxAddressAutocompleteDirective.name +
                    ": Whoops! Be sure to add the directive only to inputs or divs with input children )");
            this.generateAutocompleteInput(input);
        }), this.ELEMENT_INITIALIZATION_DELAY);
    }
    /**
     * @param {?} input
     * @return {?}
     */
    generateAutocompleteInput(input) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let coordinates;
            try {
                coordinates = yield this.getUserLocation();
            }
            catch (e) {
                console.warn(e);
            }
            finally {
                if (coordinates) {
                    /* In case the coordinates were obtained successfully */
                    /** @type {?} */
                    let autocomplete = new google.maps.places.Autocomplete(input, this.options);
                    /** @type {?} */
                    let circle = new google.maps.Circle({
                        center: (/** @type {?} */ (coordinates)),
                        radius: this.options.radius || this.MAX_RADIUS
                    });
                    autocomplete.setBounds(circle.getBounds());
                    autocomplete.addListener("place_changed", (/**
                     * @return {?}
                     */
                    () => {
                        /** @type {?} */
                        let place = autocomplete.getPlace();
                        /** @type {?} */
                        let address = this.parseAddress(place);
                        this.onSelect.emit({ place: place, address: address });
                    }));
                }
            }
        });
    }
    /**
     * @return {?}
     */
    getUserLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                window.navigator.geolocation.getCurrentPosition((/**
                 * @param {?} location
                 * @return {?}
                 */
                location => {
                    resolve(this.getLatLngFrom(location));
                }), (/**
                 * @param {?} err
                 * @return {?}
                 */
                err => {
                    reject(err);
                }));
            }));
        });
    }
    /**
     * @param {?} location
     * @return {?}
     */
    getLatLngFrom(location) {
        /** @type {?} */
        let coordinates = typeof google !== "undefined"
            ? new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
            : this.createFallbackCoordinates(location);
        return coordinates;
    }
    /**
     * @param {?} nativeCoordinates
     * @return {?}
     */
    createFallbackCoordinates(nativeCoordinates) {
        nativeCoordinates.lat = (/**
         * @return {?}
         */
        function () {
            return this.coords.latitude;
        });
        nativeCoordinates.lng = (/**
         * @return {?}
         */
        function () {
            return this.coords.longitude;
        });
        return nativeCoordinates;
    }
    /**
     * @param {?} gmapsAddressComponent
     * @param {?} addressComponentCode
     * @return {?}
     */
    getAddressElement(gmapsAddressComponent, addressComponentCode) {
        /** @type {?} */
        let value;
        gmapsAddressComponent.map((/**
         * @param {?} element
         * @return {?}
         */
        element => {
            if (element.types &&
                element.types.indexOf &&
                element.types.indexOf(addressComponentCode) > -1)
                value = element.short_name || element.long_name;
        }));
        return value;
    }
    /**
     * @param {?} place
     * @return {?}
     */
    getPlaceLatLng(place) {
        return {
            lng: place.geometry.location.lng(),
            lat: place.geometry.location.lat()
        };
    }
    /**
     * @param {?} place
     * @param {?=} keyMapping
     * @return {?}
     */
    getAddressFromPlace(place, keyMapping) {
        if (!place || !place.geometry) {
            console.warn(NgxAddressAutocompleteDirective.name +
                ": Whoops! It looks like the geometry property is missing from this place.");
            return false;
        }
        /** @type {?} */
        let address = {};
        /** @type {?} */
        let addressKeys = keyMapping || this.DEFAULT_KEY_MAPPING;
        for (let i = 0; i < place.address_components.length; i++) {
            /** @type {?} */
            let infoType = place.address_components[i].types[0];
            /** @type {?} */
            let infoIsRequired = addressKeys[infoType];
            if (infoIsRequired) {
                /** @type {?} */
                let infoValue = place.address_components[i]["long_name"];
                address[addressKeys[infoType]] = infoValue;
            }
        }
        address.vicinity = place.formatted_address;
        return address;
    }
    /**
     * @param {?} place
     * @return {?}
     */
    parseAddress(place) {
        if (!place)
            return {};
        /** @type {?} */
        let rawAddress = place.address_components;
        /** @type {?} */
        let address = {};
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
        const streetAlreadyHasNumber = address.street && !isNaN(parseInt(address.street.split(",")[1]));
        if (address.streetNumber && !streetAlreadyHasNumber)
            address.street = address.street + ", " + address.streetNumber;
        return address;
    }
}
NgxAddressAutocompleteDirective.decorators = [
    { type: Directive, args: [{
                selector: "[ngx-address-autocomplete]"
            },] }
];
NgxAddressAutocompleteDirective.ctorParameters = () => [];
NgxAddressAutocompleteDirective.propDecorators = {
    uniqueId: [{ type: Input, args: ["ngx-address-autocomplete",] }],
    onSelect: [{ type: Output }],
    options: [{ type: Input, args: ["options",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxAddressAutocompleteModule {
}
NgxAddressAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NgxAddressAutocompleteDirective],
                exports: [NgxAddressAutocompleteDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxAddressAutocompleteModule, NgxAddressAutocompleteDirective };

//# sourceMappingURL=ngx-address-autocomplete.js.map