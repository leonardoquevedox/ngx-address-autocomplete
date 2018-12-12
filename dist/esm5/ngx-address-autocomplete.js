/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description Address autocomplete directive.
 */
import { Directive, EventEmitter, Input, Output } from '@angular/core';
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
export { NgxAddressAutocomplete };
if (false) {
    /** @type {?} */
    NgxAddressAutocomplete.prototype.MAX_RADIUS;
    /** @type {?} */
    NgxAddressAutocomplete.prototype.ELEMENT_INITIALIZATION_DELAY;
    /** @type {?} */
    NgxAddressAutocomplete.prototype.uniqueId;
    /** @type {?} */
    NgxAddressAutocomplete.prototype.onSelect;
    /** @type {?} */
    NgxAddressAutocomplete.prototype.options;
    /** @type {?} */
    NgxAddressAutocomplete.prototype.DEFAULT_KEY_MAPPING;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkZHJlc3MtYXV0b2NvbXBsZXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWR5bmFtaWMtbWFzay8iLCJzb3VyY2VzIjpbIm5neC1hZGRyZXNzLWF1dG9jb21wbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUcsTUFBTSxlQUFlLENBQUE7QUFJdkU7SUF1Qkk7UUFsQkEsZUFBVSxHQUFHLE1BQU0sQ0FBQTtRQUNuQixpQ0FBNEIsR0FBRyxJQUFJLENBQUE7UUFHekIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBQ3hDLFlBQU8sR0FBUSxFQUFFLENBQUE7UUFFbkMsd0JBQW1CLEdBQUc7WUFDbEIsbUJBQW1CLEVBQUUsVUFBVTtZQUMvQixRQUFRLEVBQUUsUUFBUTtZQUNsQixlQUFlLEVBQUUsUUFBUTtZQUN6QixxQkFBcUIsRUFBRSxlQUFlO1lBQ3RDLDZCQUE2QixFQUFFLE1BQU07WUFDckMsYUFBYSxFQUFFLFlBQVk7WUFDM0IsNkJBQTZCLEVBQUUsT0FBTztZQUN0QyxTQUFTLEVBQUUsU0FBUztTQUN2QixDQUFBO0lBRWUsQ0FBQzs7OztJQUVqQix5Q0FBUTs7O0lBQVI7UUFBQSxpQkFZQztRQVhHLFVBQVUsQ0FBQzs7Z0JBQ0gsT0FBTyxHQUFHLEtBQUksQ0FBQyxRQUFROztnQkFDdkIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsK0JBQTZCLE9BQU8sTUFBRyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxHQUFHO2dCQUNKLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxHQUFHLG1FQUFtRSxDQUFDLENBQUE7O2dCQUMvRyxZQUFZLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLElBQUksT0FBTzs7Z0JBQzdDLEtBQUssR0FBUSxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcs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QyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSw2QkFBNkIsQ0FBQyxDQUFBO1FBQ2pGLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUMvRCxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDdEUsSUFBSSxPQUFPLENBQUMsWUFBWTtZQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQTtRQUN2RixPQUFPLE9BQU8sQ0FBQTtJQUNsQixDQUFDOztnQkEzSUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw0QkFBNEI7aUJBQ3pDOzs7OzsyQkFNSSxLQUFLLFNBQUMsMEJBQTBCOzJCQUNoQyxNQUFNOzBCQUNOLEtBQUssU0FBQyxTQUFTOztJQWtJcEIsNkJBQUM7Q0FBQSxBQTVJRCxJQTRJQztTQXpJWSxzQkFBc0I7OztJQUUvQiw0Q0FBbUI7O0lBQ25CLDhEQUFtQzs7SUFFbkMsMENBQW1EOztJQUNuRCwwQ0FBMEQ7O0lBQzFELHlDQUFtQzs7SUFFbkMscURBU0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlIE1JVFxuICogQHZlcnNpb24gMS4xLjBcbiAqIEBhdXRob3IgTGVvbmFyZG8gUXVldmVkb1xuICogQGRlc2NyaXB0aW9uIEFkZHJlc3MgYXV0b2NvbXBsZXRlIGRpcmVjdGl2ZS5cbiAqL1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCAgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuXG5kZWNsYXJlIHZhciBnb29nbGVcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmd4LWFkZHJlc3MtYXV0b2NvbXBsZXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgTmd4QWRkcmVzc0F1dG9jb21wbGV0ZSB7XG5cbiAgICBNQVhfUkFESVVTID0gMTAwMDAwXG4gICAgRUxFTUVOVF9JTklUSUFMSVpBVElPTl9ERUxBWSA9IDIwMDBcblxuICAgIEBJbnB1dCgnbmd4LWFkZHJlc3MtYXV0b2NvbXBsZXRlJykgdW5pcXVlSWQ6IHN0cmluZ1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgICBASW5wdXQoJ29wdGlvbnMnKSBvcHRpb25zOiBhbnkgPSB7fVxuXG4gICAgREVGQVVMVF9LRVlfTUFQUElORyA9IHtcbiAgICAgICAgJ2Zvcm1hdHRlZF9hZGRyZXNzJzogJ3ZpY2luaXR5JyxcbiAgICAgICAgJ3N0cmVldCc6ICdzdHJlZXQnLFxuICAgICAgICAnc3RyZWV0X251bWJlcic6ICdudW1iZXInLFxuICAgICAgICAnc3VibG9jYWxpdHlfbGV2ZWxfMSc6ICduZWlnaGJvdXJob29kJyxcbiAgICAgICAgJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMic6ICdjaXR5JyxcbiAgICAgICAgJ3Bvc3RhbF9jb2RlJzogJ3Bvc3RhbENvZGUnLFxuICAgICAgICAnYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xJzogJ3N0YXRlJyxcbiAgICAgICAgJ2NvdW50cnknOiAnY291bnRyeSdcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGlucHV0SWQgPSB0aGlzLnVuaXF1ZUlkXG4gICAgICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW25neC1hZGRyZXNzLWF1dG9jb21wbGV0ZT0ke2lucHV0SWR9XWApXG4gICAgICAgICAgICBpZiAoIWRpdilcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oTmd4QWRkcmVzc0F1dG9jb21wbGV0ZS5uYW1lICsgJzogV2hvb3BzISBXZSB3ZXJlIHVuYWJsZSB0byBmaW5kIGFueSBkaXZzIHdpdGggdGhlIGlkIHByb3ZpZGVkIDooJylcbiAgICAgICAgICAgIGxldCBkaXZJc0FuSW5wdXQgPSBkaXYgJiYgZGl2Lm5vZGVOYW1lID09ICdJTlBVVCdcbiAgICAgICAgICAgIGxldCBpbnB1dDogYW55ID0gZGl2SXNBbklucHV0ID8gZGl2IDogKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtuZ3gtYWRkcmVzcy1hdXRvY29tcGxldGU9JHtpbnB1dElkfV0gaW5wdXRgKSlcbiAgICAgICAgICAgIGlmICghaW5wdXQpXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKE5neEFkZHJlc3NBdXRvY29tcGxldGUubmFtZSArICc6IFdob29wcyEgQmUgc3VyZSB0byBhZGQgdGhlIGRpcmVjdGl2ZSBvbmx5IHRvIGlucHV0cyBvciBkaXZzIHdpdGggaW5wdXQgY2hpbGRyZW4gKScpXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlQXV0b2NvbXBsZXRlSW5wdXQoaW5wdXQpXG4gICAgICAgIH0sIHRoaXMuRUxFTUVOVF9JTklUSUFMSVpBVElPTl9ERUxBWSlcbiAgICB9XG5cbiAgICBhc3luYyBnZW5lcmF0ZUF1dG9jb21wbGV0ZUlucHV0KGlucHV0KSB7XG4gICAgICAgIGxldCBjb29yZGluYXRlc1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSBhd2FpdCB0aGlzLmdldFVzZXJMb2NhdGlvbigpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlKVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKGNvb3JkaW5hdGVzKSB7IC8qIEluIGNhc2UgdGhlIGNvb3JkaW5hdGVzIHdlcmUgb2J0YWluZWQgc3VjY2Vzc2Z1bGx5ICovXG4gICAgICAgICAgICAgICAgbGV0IGF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKGlucHV0LCB0aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICAgICAgbGV0IGNpcmNsZSA9IG5ldyBnb29nbGUubWFwcy5DaXJjbGUoe1xuICAgICAgICAgICAgICAgICAgICBjZW50ZXI6IDxnb29nbGUubWFwcy5MYXRMbmc+Y29vcmRpbmF0ZXMsXG4gICAgICAgICAgICAgICAgICAgIHJhZGl1czogdGhpcy5vcHRpb25zLnJhZGl1cyB8fCB0aGlzLk1BWF9SQURJVVNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZS5zZXRCb3VuZHMoY2lyY2xlLmdldEJvdW5kcygpKVxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlID0gYXV0b2NvbXBsZXRlLmdldFBsYWNlKClcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZHJlc3MgPSB0aGlzLnBhcnNlQWRkcmVzcyhwbGFjZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHsgcGxhY2U6IHBsYWNlLCBhZGRyZXNzOiBhZGRyZXNzIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldFVzZXJMb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChsb2NhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5nZXRMYXRMbmdGcm9tKGxvY2F0aW9uKSlcbiAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRMYXRMbmdGcm9tKGxvY2F0aW9uKSB7XG5cbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0gdHlwZW9mIGdvb2dsZSAhPT0gJ3VuZGVmaW5lZCcgPyBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxvY2F0aW9uLmNvb3Jkcy5sYXRpdHVkZSwgbG9jYXRpb24uY29vcmRzLmxvbmdpdHVkZSkgOiB0aGlzLmNyZWF0ZUZhbGxiYWNrQ29vcmRpbmF0ZXMobG9jYXRpb24pXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlc1xuICAgIH1cblxuICAgIGNyZWF0ZUZhbGxiYWNrQ29vcmRpbmF0ZXMobmF0aXZlQ29vcmRpbmF0ZXMpIHtcbiAgICAgICAgbmF0aXZlQ29vcmRpbmF0ZXMubGF0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRzLmxhdGl0dWRlXG4gICAgICAgIH1cbiAgICAgICAgbmF0aXZlQ29vcmRpbmF0ZXMubG5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRzLmxvbmdpdHVkZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYXRpdmVDb29yZGluYXRlc1xuICAgIH1cblxuICAgIGdldEFkZHJlc3NFbGVtZW50KGdtYXBzQWRkcmVzc0NvbXBvbmVudDogQXJyYXk8YW55PiwgYWRkcmVzc0NvbXBvbmVudENvZGU6IHN0cmluZykge1xuICAgICAgICBsZXQgdmFsdWVcbiAgICAgICAgZ21hcHNBZGRyZXNzQ29tcG9uZW50Lm1hcCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQudHlwZXMgJiYgZWxlbWVudC50eXBlcy5pbmRleE9mICYmIChlbGVtZW50LnR5cGVzLmluZGV4T2YoYWRkcmVzc0NvbXBvbmVudENvZGUpID4gLTEpKVxuICAgICAgICAgICAgICAgIHZhbHVlID0gZWxlbWVudC5zaG9ydF9uYW1lIHx8IGVsZW1lbnQubG9uZ19uYW1lXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cblxuICAgIGdldFBsYWNlTGF0TG5nKHBsYWNlOiBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VSZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxuZzogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKCksXG4gICAgICAgICAgICBsYXQ6IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBZGRyZXNzRnJvbVBsYWNlKHBsYWNlOiBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VSZXN1bHQsIGtleU1hcHBpbmc/OiBhbnkpIHtcbiAgICAgICAgaWYgKCFwbGFjZSB8fCAhcGxhY2UuZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihOZ3hBZGRyZXNzQXV0b2NvbXBsZXRlLm5hbWUgKyAnOiBXaG9vcHMhIEl0IGxvb2tzIGxpa2UgdGhlIGdlb21ldHJ5IHByb3BlcnR5IGlzIG1pc3NpbmcgZnJvbSB0aGlzIHBsYWNlLicpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsZXQgYWRkcmVzczogYW55ID0ge31cbiAgICAgICAgbGV0IGFkZHJlc3NLZXlzID0ga2V5TWFwcGluZyB8fCB0aGlzLkRFRkFVTFRfS0VZX01BUFBJTkdcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmZvVHlwZSA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlc1swXVxuICAgICAgICAgICAgbGV0IGluZm9Jc1JlcXVpcmVkID0gYWRkcmVzc0tleXNbaW5mb1R5cGVdXG4gICAgICAgICAgICBpZiAoaW5mb0lzUmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5mb1ZhbHVlID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldWydsb25nX25hbWUnXVxuICAgICAgICAgICAgICAgIGFkZHJlc3NbYWRkcmVzc0tleXNbaW5mb1R5cGVdXSA9IGluZm9WYWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFkZHJlc3MudmljaW5pdHkgPSBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzc1xuICAgICAgICByZXR1cm4gYWRkcmVzc1xuICAgIH1cblxuICAgIHBhcnNlQWRkcmVzcyhwbGFjZTogZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlUmVzdWx0KSB7XG4gICAgICAgIGlmICghcGxhY2UpIHJldHVybiB7fVxuICAgICAgICBsZXQgcmF3QWRkcmVzcyA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1xuICAgICAgICBsZXQgYWRkcmVzczogYW55ID0ge31cbiAgICAgICAgLyogUGFyc2VzIGFkZHJlc3MgKi9cbiAgICAgICAgYWRkcmVzcy5zdHJlZXROdW1iZXIgPSB0aGlzLmdldEFkZHJlc3NFbGVtZW50KHJhd0FkZHJlc3MsICdzdHJlZXRfbnVtYmVyJylcbiAgICAgICAgYWRkcmVzcy5sb2NhdGlvbiA9IHRoaXMuZ2V0UGxhY2VMYXRMbmcocGxhY2UpXG4gICAgICAgIGFkZHJlc3Muc3RyZWV0ID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCAncm91dGUnKVxuICAgICAgICBhZGRyZXNzLm51bWJlciA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQocmF3QWRkcmVzcywgJ3N0cmVldF9udW1iZXInKVxuICAgICAgICBhZGRyZXNzLm5laWdoYm91cmhvb2QgPSB0aGlzLmdldEFkZHJlc3NFbGVtZW50KHJhd0FkZHJlc3MsICdzdWJsb2NhbGl0eScpXG4gICAgICAgIGFkZHJlc3MuY2l0eSA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQocmF3QWRkcmVzcywgJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMicpXG4gICAgICAgIGFkZHJlc3Muc3RhdGUgPSB0aGlzLmdldEFkZHJlc3NFbGVtZW50KHJhd0FkZHJlc3MsICdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEnKVxuICAgICAgICBhZGRyZXNzLmNvdW50cnkgPSB0aGlzLmdldEFkZHJlc3NFbGVtZW50KHJhd0FkZHJlc3MsICdjb3VudHJ5JylcbiAgICAgICAgYWRkcmVzcy5wb3N0YWxDb2RlID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCAncG9zdGFsX2NvZGUnKVxuICAgICAgICBpZiAoYWRkcmVzcy5zdHJlZXROdW1iZXIpIGFkZHJlc3Muc3RyZWV0ID0gYWRkcmVzcy5zdHJlZXQgKyAnLCAnICsgYWRkcmVzcy5zdHJlZXROdW1iZXJcbiAgICAgICAgcmV0dXJuIGFkZHJlc3NcbiAgICB9XG59Il19