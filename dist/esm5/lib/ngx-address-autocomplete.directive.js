/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description Address autocomplete directive.
 */
import { Directive, EventEmitter, Input, Output } from "@angular/core";
var NgxAddressAutocompleteDirective = /** @class */ (function () {
    function NgxAddressAutocompleteDirective() {
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
    NgxAddressAutocompleteDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var coordinates, e_1, autocomplete_1, circle;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
                                center: (/** @type {?} */ (coordinates)),
                                radius: this.options.radius || this.MAX_RADIUS
                            });
                            autocomplete_1.setBounds(circle.getBounds());
                            autocomplete_1.addListener("place_changed", (/**
                             * @return {?}
                             */
                            function () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise((/**
                     * @param {?} resolve
                     * @param {?} reject
                     * @return {?}
                     */
                    function (resolve, reject) {
                        window.navigator.geolocation.getCurrentPosition((/**
                         * @param {?} location
                         * @return {?}
                         */
                        function (location) {
                            resolve(_this.getLatLngFrom(location));
                        }), (/**
                         * @param {?} err
                         * @return {?}
                         */
                        function (err) {
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
        gmapsAddressComponent.map((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
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
        { type: Directive, args: [{
                    selector: "[ngx-address-autocomplete]"
                },] }
    ];
    NgxAddressAutocompleteDirective.ctorParameters = function () { return []; };
    NgxAddressAutocompleteDirective.propDecorators = {
        uniqueId: [{ type: Input, args: ["ngx-address-autocomplete",] }],
        onSelect: [{ type: Output }],
        options: [{ type: Input, args: ["options",] }]
    };
    return NgxAddressAutocompleteDirective;
}());
export { NgxAddressAutocompleteDirective };
if (false) {
    /** @type {?} */
    NgxAddressAutocompleteDirective.prototype.MAX_RADIUS;
    /** @type {?} */
    NgxAddressAutocompleteDirective.prototype.ELEMENT_INITIALIZATION_DELAY;
    /** @type {?} */
    NgxAddressAutocompleteDirective.prototype.uniqueId;
    /** @type {?} */
    NgxAddressAutocompleteDirective.prototype.onSelect;
    /** @type {?} */
    NgxAddressAutocompleteDirective.prototype.options;
    /** @type {?} */
    NgxAddressAutocompleteDirective.prototype.DEFAULT_KEY_MAPPING;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkZHJlc3MtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZGRyZXNzLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWRkcmVzcy1hdXRvY29tcGxldGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl2RTtJQXNCRTtRQWxCQSxlQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLGlDQUE0QixHQUFHLElBQUksQ0FBQztRQUcxQixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekMsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUVwQyx3QkFBbUIsR0FBRztZQUNwQixpQkFBaUIsRUFBRSxVQUFVO1lBQzdCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLG1CQUFtQixFQUFFLGVBQWU7WUFDcEMsMkJBQTJCLEVBQUUsTUFBTTtZQUNuQyxXQUFXLEVBQUUsWUFBWTtZQUN6QiwyQkFBMkIsRUFBRSxPQUFPO1lBQ3BDLE9BQU8sRUFBRSxTQUFTO1NBQ25CLENBQUM7SUFFYSxDQUFDOzs7O0lBRWhCLGtEQUFROzs7SUFBUjtRQUFBLGlCQW9CQztRQW5CQyxVQUFVOzs7UUFBQzs7Z0JBQ0wsT0FBTyxHQUFHLEtBQUksQ0FBQyxRQUFROztnQkFDdkIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsK0JBQTZCLE9BQU8sTUFBRyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxHQUFHO2dCQUNOLE9BQU8sQ0FBQyxJQUFJLENBQ1YsK0JBQStCLENBQUMsSUFBSTtvQkFDbEMsbUVBQW1FLENBQ3RFLENBQUM7O2dCQUNBLFlBQVksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsSUFBSSxPQUFPOztnQkFD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VUFBVSxFQUNWLDZCQUE2QixDQUM5QixDQUFDO1FBQ0YsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQ3BDLFVBQVUsRUFDViw2QkFBNkIsQ0FDOUIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNoRSxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUM7O1lBQ2pFLHNCQUFzQixHQUMxQixPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksT0FBTyxDQUFDLFlBQVksSUFBSSxDQUFDLHNCQUFzQjtZQUNqRCxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDaEUsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Z0JBakxGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2lCQUN2Qzs7OzsyQkFLRSxLQUFLLFNBQUMsMEJBQTBCOzJCQUNoQyxNQUFNOzBCQUNOLEtBQUssU0FBQyxTQUFTOztJQXlLbEIsc0NBQUM7Q0FBQSxBQWxMRCxJQWtMQztTQS9LWSwrQkFBK0I7OztJQUMxQyxxREFBb0I7O0lBQ3BCLHVFQUFvQzs7SUFFcEMsbURBQW9EOztJQUNwRCxtREFBMkQ7O0lBQzNELGtEQUFvQzs7SUFFcEMsOERBU0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlIE1JVFxuICogQHZlcnNpb24gMS4xLjBcbiAqIEBhdXRob3IgTGVvbmFyZG8gUXVldmVkb1xuICogQGRlc2NyaXB0aW9uIEFkZHJlc3MgYXV0b2NvbXBsZXRlIGRpcmVjdGl2ZS5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmRlY2xhcmUgdmFyIGdvb2dsZTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiBcIltuZ3gtYWRkcmVzcy1hdXRvY29tcGxldGVdXCJcbn0pXG5leHBvcnQgY2xhc3MgTmd4QWRkcmVzc0F1dG9jb21wbGV0ZURpcmVjdGl2ZSB7XG4gIE1BWF9SQURJVVMgPSAxMDAwMDA7XG4gIEVMRU1FTlRfSU5JVElBTElaQVRJT05fREVMQVkgPSAyMDAwO1xuXG4gIEBJbnB1dChcIm5neC1hZGRyZXNzLWF1dG9jb21wbGV0ZVwiKSB1bmlxdWVJZDogc3RyaW5nO1xuICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoXCJvcHRpb25zXCIpIG9wdGlvbnM6IGFueSA9IHt9O1xuXG4gIERFRkFVTFRfS0VZX01BUFBJTkcgPSB7XG4gICAgZm9ybWF0dGVkX2FkZHJlc3M6IFwidmljaW5pdHlcIixcbiAgICBzdHJlZXQ6IFwic3RyZWV0XCIsXG4gICAgc3RyZWV0X251bWJlcjogXCJudW1iZXJcIixcbiAgICBzdWJsb2NhbGl0eV9sZXZlbF8xOiBcIm5laWdoYm91cmhvb2RcIixcbiAgICBhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzI6IFwiY2l0eVwiLFxuICAgIHBvc3RhbF9jb2RlOiBcInBvc3RhbENvZGVcIixcbiAgICBhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzE6IFwic3RhdGVcIixcbiAgICBjb3VudHJ5OiBcImNvdW50cnlcIlxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGxldCBpbnB1dElkID0gdGhpcy51bmlxdWVJZDtcbiAgICAgIGxldCBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbbmd4LWFkZHJlc3MtYXV0b2NvbXBsZXRlPSR7aW5wdXRJZH1dYCk7XG4gICAgICBpZiAoIWRpdilcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIE5neEFkZHJlc3NBdXRvY29tcGxldGVEaXJlY3RpdmUubmFtZSArXG4gICAgICAgICAgICBcIjogV2hvb3BzISBXZSB3ZXJlIHVuYWJsZSB0byBmaW5kIGFueSBkaXZzIHdpdGggdGhlIGlkIHByb3ZpZGVkIDooXCJcbiAgICAgICAgKTtcbiAgICAgIGxldCBkaXZJc0FuSW5wdXQgPSBkaXYgJiYgZGl2Lm5vZGVOYW1lID09IFwiSU5QVVRcIjtcbiAgICAgIGxldCBpbnB1dDogYW55ID0gZGl2SXNBbklucHV0XG4gICAgICAgID8gZGl2XG4gICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW25neC1hZGRyZXNzLWF1dG9jb21wbGV0ZT0ke2lucHV0SWR9XSBpbnB1dGApO1xuICAgICAgaWYgKCFpbnB1dClcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIE5neEFkZHJlc3NBdXRvY29tcGxldGVEaXJlY3RpdmUubmFtZSArXG4gICAgICAgICAgICBcIjogV2hvb3BzISBCZSBzdXJlIHRvIGFkZCB0aGUgZGlyZWN0aXZlIG9ubHkgdG8gaW5wdXRzIG9yIGRpdnMgd2l0aCBpbnB1dCBjaGlsZHJlbiApXCJcbiAgICAgICAgKTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVBdXRvY29tcGxldGVJbnB1dChpbnB1dCk7XG4gICAgfSwgdGhpcy5FTEVNRU5UX0lOSVRJQUxJWkFUSU9OX0RFTEFZKTtcbiAgfVxuXG4gIGFzeW5jIGdlbmVyYXRlQXV0b2NvbXBsZXRlSW5wdXQoaW5wdXQpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXM7XG4gICAgdHJ5IHtcbiAgICAgIGNvb3JkaW5hdGVzID0gYXdhaXQgdGhpcy5nZXRVc2VyTG9jYXRpb24oKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChjb29yZGluYXRlcykge1xuICAgICAgICAvKiBJbiBjYXNlIHRoZSBjb29yZGluYXRlcyB3ZXJlIG9idGFpbmVkIHN1Y2Nlc3NmdWxseSAqL1xuICAgICAgICBsZXQgYXV0b2NvbXBsZXRlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUoXG4gICAgICAgICAgaW5wdXQsXG4gICAgICAgICAgdGhpcy5vcHRpb25zXG4gICAgICAgICk7XG4gICAgICAgIGxldCBjaXJjbGUgPSBuZXcgZ29vZ2xlLm1hcHMuQ2lyY2xlKHtcbiAgICAgICAgICBjZW50ZXI6IDxnb29nbGUubWFwcy5MYXRMbmc+Y29vcmRpbmF0ZXMsXG4gICAgICAgICAgcmFkaXVzOiB0aGlzLm9wdGlvbnMucmFkaXVzIHx8IHRoaXMuTUFYX1JBRElVU1xuICAgICAgICB9KTtcbiAgICAgICAgYXV0b2NvbXBsZXRlLnNldEJvdW5kcyhjaXJjbGUuZ2V0Qm91bmRzKCkpO1xuICAgICAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoXCJwbGFjZV9jaGFuZ2VkXCIsICgpID0+IHtcbiAgICAgICAgICBsZXQgcGxhY2UgPSBhdXRvY29tcGxldGUuZ2V0UGxhY2UoKTtcbiAgICAgICAgICBsZXQgYWRkcmVzcyA9IHRoaXMucGFyc2VBZGRyZXNzKHBsYWNlKTtcbiAgICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeyBwbGFjZTogcGxhY2UsIGFkZHJlc3M6IGFkZHJlc3MgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFVzZXJMb2NhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgd2luZG93Lm5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXG4gICAgICAgIGxvY2F0aW9uID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMuZ2V0TGF0TG5nRnJvbShsb2NhdGlvbikpO1xuICAgICAgICB9LFxuICAgICAgICBlcnIgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TGF0TG5nRnJvbShsb2NhdGlvbikge1xuICAgIGxldCBjb29yZGluYXRlcyA9XG4gICAgICB0eXBlb2YgZ29vZ2xlICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgID8gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhcbiAgICAgICAgICAgIGxvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZSxcbiAgICAgICAgICAgIGxvY2F0aW9uLmNvb3Jkcy5sb25naXR1ZGVcbiAgICAgICAgICApXG4gICAgICAgIDogdGhpcy5jcmVhdGVGYWxsYmFja0Nvb3JkaW5hdGVzKGxvY2F0aW9uKTtcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cblxuICBjcmVhdGVGYWxsYmFja0Nvb3JkaW5hdGVzKG5hdGl2ZUNvb3JkaW5hdGVzKSB7XG4gICAgbmF0aXZlQ29vcmRpbmF0ZXMubGF0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb29yZHMubGF0aXR1ZGU7XG4gICAgfTtcbiAgICBuYXRpdmVDb29yZGluYXRlcy5sbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvb3Jkcy5sb25naXR1ZGU7XG4gICAgfTtcbiAgICByZXR1cm4gbmF0aXZlQ29vcmRpbmF0ZXM7XG4gIH1cblxuICBnZXRBZGRyZXNzRWxlbWVudChcbiAgICBnbWFwc0FkZHJlc3NDb21wb25lbnQ6IEFycmF5PGFueT4sXG4gICAgYWRkcmVzc0NvbXBvbmVudENvZGU6IHN0cmluZ1xuICApIHtcbiAgICBsZXQgdmFsdWU7XG4gICAgZ21hcHNBZGRyZXNzQ29tcG9uZW50Lm1hcChlbGVtZW50ID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgZWxlbWVudC50eXBlcyAmJlxuICAgICAgICBlbGVtZW50LnR5cGVzLmluZGV4T2YgJiZcbiAgICAgICAgZWxlbWVudC50eXBlcy5pbmRleE9mKGFkZHJlc3NDb21wb25lbnRDb2RlKSA+IC0xXG4gICAgICApXG4gICAgICAgIHZhbHVlID0gZWxlbWVudC5zaG9ydF9uYW1lIHx8IGVsZW1lbnQubG9uZ19uYW1lO1xuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGdldFBsYWNlTGF0TG5nKHBsYWNlOiBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VSZXN1bHQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbG5nOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKSxcbiAgICAgIGxhdDogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubGF0KClcbiAgICB9O1xuICB9XG5cbiAgZ2V0QWRkcmVzc0Zyb21QbGFjZShwbGFjZTogZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlUmVzdWx0LCBrZXlNYXBwaW5nPzogYW55KSB7XG4gICAgaWYgKCFwbGFjZSB8fCAhcGxhY2UuZ2VvbWV0cnkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgTmd4QWRkcmVzc0F1dG9jb21wbGV0ZURpcmVjdGl2ZS5uYW1lICtcbiAgICAgICAgICBcIjogV2hvb3BzISBJdCBsb29rcyBsaWtlIHRoZSBnZW9tZXRyeSBwcm9wZXJ0eSBpcyBtaXNzaW5nIGZyb20gdGhpcyBwbGFjZS5cIlxuICAgICAgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IGFkZHJlc3M6IGFueSA9IHt9O1xuICAgIGxldCBhZGRyZXNzS2V5cyA9IGtleU1hcHBpbmcgfHwgdGhpcy5ERUZBVUxUX0tFWV9NQVBQSU5HO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgaW5mb1R5cGUgPSBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbMF07XG4gICAgICBsZXQgaW5mb0lzUmVxdWlyZWQgPSBhZGRyZXNzS2V5c1tpbmZvVHlwZV07XG4gICAgICBpZiAoaW5mb0lzUmVxdWlyZWQpIHtcbiAgICAgICAgbGV0IGluZm9WYWx1ZSA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVtcImxvbmdfbmFtZVwiXTtcbiAgICAgICAgYWRkcmVzc1thZGRyZXNzS2V5c1tpbmZvVHlwZV1dID0gaW5mb1ZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBhZGRyZXNzLnZpY2luaXR5ID0gcGxhY2UuZm9ybWF0dGVkX2FkZHJlc3M7XG4gICAgcmV0dXJuIGFkZHJlc3M7XG4gIH1cblxuICBwYXJzZUFkZHJlc3MocGxhY2U6IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdCkge1xuICAgIGlmICghcGxhY2UpIHJldHVybiB7fTtcbiAgICBsZXQgcmF3QWRkcmVzcyA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50cztcbiAgICBsZXQgYWRkcmVzczogYW55ID0ge307XG4gICAgLyogUGFyc2VzIGFkZHJlc3MgKi9cbiAgICBhZGRyZXNzLnN0cmVldE51bWJlciA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQocmF3QWRkcmVzcywgXCJzdHJlZXRfbnVtYmVyXCIpO1xuICAgIGFkZHJlc3MubG9jYXRpb24gPSB0aGlzLmdldFBsYWNlTGF0TG5nKHBsYWNlKTtcbiAgICBhZGRyZXNzLnN0cmVldCA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQocmF3QWRkcmVzcywgXCJyb3V0ZVwiKTtcbiAgICBhZGRyZXNzLm51bWJlciA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQocmF3QWRkcmVzcywgXCJzdHJlZXRfbnVtYmVyXCIpO1xuICAgIGFkZHJlc3MubmVpZ2hib3VyaG9vZCA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQocmF3QWRkcmVzcywgXCJzdWJsb2NhbGl0eVwiKTtcbiAgICBhZGRyZXNzLmNpdHkgPSB0aGlzLmdldEFkZHJlc3NFbGVtZW50KFxuICAgICAgcmF3QWRkcmVzcyxcbiAgICAgIFwiYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8yXCJcbiAgICApO1xuICAgIGFkZHJlc3Muc3RhdGUgPSB0aGlzLmdldEFkZHJlc3NFbGVtZW50KFxuICAgICAgcmF3QWRkcmVzcyxcbiAgICAgIFwiYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xXCJcbiAgICApO1xuICAgIGFkZHJlc3MuY291bnRyeSA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQocmF3QWRkcmVzcywgXCJjb3VudHJ5XCIpO1xuICAgIGFkZHJlc3MucG9zdGFsQ29kZSA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQocmF3QWRkcmVzcywgXCJwb3N0YWxfY29kZVwiKTtcbiAgICBjb25zdCBzdHJlZXRBbHJlYWR5SGFzTnVtYmVyID1cbiAgICAgIGFkZHJlc3Muc3RyZWV0ICYmICFpc05hTihwYXJzZUludChhZGRyZXNzLnN0cmVldC5zcGxpdChcIixcIilbMV0pKTtcbiAgICBpZiAoYWRkcmVzcy5zdHJlZXROdW1iZXIgJiYgIXN0cmVldEFscmVhZHlIYXNOdW1iZXIpXG4gICAgICBhZGRyZXNzLnN0cmVldCA9IGFkZHJlc3Muc3RyZWV0ICsgXCIsIFwiICsgYWRkcmVzcy5zdHJlZXROdW1iZXI7XG4gICAgcmV0dXJuIGFkZHJlc3M7XG4gIH1cbn1cbiJdfQ==