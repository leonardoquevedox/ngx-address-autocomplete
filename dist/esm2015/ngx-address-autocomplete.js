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
export class NgxAddressAutocomplete {
    constructor() {
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
    ngOnInit() {
        setTimeout(() => {
            /** @type {?} */
            let inputId = this.uniqueId;
            /** @type {?} */
            let div = document.querySelector(`[ngx-address-autocomplete=${inputId}]`);
            if (!div)
                console.warn(NgxAddressAutocomplete.name + ': Whoops! We were unable to find any divs with the id provided :(');
            /** @type {?} */
            let divIsAnInput = div && div.nodeName == 'INPUT';
            /** @type {?} */
            let input = divIsAnInput ? div : (document.querySelector(`[ngx-address-autocomplete=${inputId}] input`));
            if (!input)
                console.warn(NgxAddressAutocomplete.name + ': Whoops! Be sure to add the directive only to inputs or divs with input children )');
            this.generateAutocompleteInput(input);
        }, this.ELEMENT_INITIALIZATION_DELAY);
    }
    /**
     * @param {?} input
     * @return {?}
     */
    generateAutocompleteInput(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            let coordinates;
            try {
                coordinates = yield this.getUserLocation();
            }
            catch (e) {
                console.warn(e);
            }
            finally {
                if (coordinates) { /* In case the coordinates were obtained successfully */
                    /* In case the coordinates were obtained successfully */
                    /** @type {?} */
                    let autocomplete = new google.maps.places.Autocomplete(input, this.options);
                    /** @type {?} */
                    let circle = new google.maps.Circle({
                        center: (/** @type {?} */ (coordinates)),
                        radius: this.options.radius || this.MAX_RADIUS
                    });
                    autocomplete.setBounds(circle.getBounds());
                    autocomplete.addListener('place_changed', () => {
                        /** @type {?} */
                        let place = autocomplete.getPlace();
                        /** @type {?} */
                        let address = this.parseAddress(place);
                        this.onSelect.emit({ place: place, address: address });
                    });
                }
            }
        });
    }
    /**
     * @return {?}
     */
    getUserLocation() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                window.navigator.geolocation.getCurrentPosition((location) => {
                    resolve(this.getLatLngFrom(location));
                }, (err) => {
                    reject(err);
                });
            });
        });
    }
    /**
     * @param {?} location
     * @return {?}
     */
    getLatLngFrom(location) {
        /** @type {?} */
        let coordinates = typeof google !== 'undefined' ? new google.maps.LatLng(location.coords.latitude, location.coords.longitude) : this.createFallbackCoordinates(location);
        return coordinates;
    }
    /**
     * @param {?} nativeCoordinates
     * @return {?}
     */
    createFallbackCoordinates(nativeCoordinates) {
        nativeCoordinates.lat = function () {
            return this.coords.latitude;
        };
        nativeCoordinates.lng = function () {
            return this.coords.longitude;
        };
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
        gmapsAddressComponent.map((element) => {
            if (element.types && element.types.indexOf && (element.types.indexOf(addressComponentCode) > -1))
                value = element.short_name || element.long_name;
        });
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
            console.warn(NgxAddressAutocomplete.name + ': Whoops! It looks like the geometry property is missing from this place.');
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
                let infoValue = place.address_components[i]['long_name'];
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
        let address = {}
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
    }
}
NgxAddressAutocomplete.decorators = [
    { type: Directive, args: [{
                selector: '[ngx-address-autocomplete]'
            },] }
];
/** @nocollapse */
NgxAddressAutocomplete.ctorParameters = () => [];
NgxAddressAutocomplete.propDecorators = {
    uniqueId: [{ type: Input, args: ['ngx-address-autocomplete',] }],
    onSelect: [{ type: Output }],
    options: [{ type: Input, args: ['options',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkZHJlc3MtYXV0b2NvbXBsZXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWR5bmFtaWMtbWFzay8iLCJzb3VyY2VzIjpbIm5neC1hZGRyZXNzLWF1dG9jb21wbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU9BLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUcsTUFBTSxlQUFlLENBQUE7QUFPdkUsTUFBTSxPQUFPLHNCQUFzQjtJQW9CL0I7UUFsQkEsZUFBVSxHQUFHLE1BQU0sQ0FBQTtRQUNuQixpQ0FBNEIsR0FBRyxJQUFJLENBQUE7UUFHekIsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFBO1FBQ3hDLFlBQU8sR0FBUSxFQUFFLENBQUE7UUFFbkMsd0JBQW1CLEdBQUc7WUFDbEIsbUJBQW1CLEVBQUUsVUFBVTtZQUMvQixRQUFRLEVBQUUsUUFBUTtZQUNsQixlQUFlLEVBQUUsUUFBUTtZQUN6QixxQkFBcUIsRUFBRSxlQUFlO1lBQ3RDLDZCQUE2QixFQUFFLE1BQU07WUFDckMsYUFBYSxFQUFFLFlBQVk7WUFDM0IsNkJBQTZCLEVBQUUsT0FBTztZQUN0QyxTQUFTLEVBQUUsU0FBUztTQUN2QixDQUFBO0lBRWUsQ0FBQzs7OztJQUVqQixRQUFRO1FBQ0osVUFBVSxDQUFDLEdBQUcsRUFBRTs7Z0JBQ1IsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFROztnQkFDdkIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLE9BQU8sR0FBRyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxHQUFHO2dCQUNKLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxHQUFHLG1FQUFtRSxDQUFDLENBQUE7O2dCQUMvRyxZQUFZLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLElBQUksT0FBTzs7Z0JBQzdDLEtBQUssR0FBUSxZQUFZLENBQUMsQ0FBQyxD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QkFBNkIsQ0FBQyxDQUFBO1FBQ2hGLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSw2QkFBNkIsQ0FBQyxDQUFBO1FBQ2pGLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUMvRCxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDdEUsSUFBSSxPQUFPLENBQUMsWUFBWTtZQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQTtRQUN2RixPQUFPLE9BQU8sQ0FBQTtJQUNsQixDQUFDOzs7WUEzSUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7YUFDekM7Ozs7O3VCQU1JLEtBQUssU0FBQywwQkFBMEI7dUJBQ2hDLE1BQU07c0JBQ04sS0FBSyxTQUFDLFNBQVM7Ozs7SUFMaEIsNENBQW1COztJQUNuQiw4REFBbUM7O0lBRW5DLDBDQUFtRDs7SUFDbkQsMENBQTBEOztJQUMxRCx5Q0FBbUM7O0lBRW5DLHFEQVNDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZSBNSVRcbiAqIEB2ZXJzaW9uIDEuMS4wXG4gKiBAYXV0aG9yIExlb25hcmRvIFF1ZXZlZG9cbiAqIEBkZXNjcmlwdGlvbiBBZGRyZXNzIGF1dG9jb21wbGV0ZSBkaXJlY3RpdmUuXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcblxuZGVjbGFyZSB2YXIgZ29vZ2xlXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW25neC1hZGRyZXNzLWF1dG9jb21wbGV0ZV0nXG59KVxuZXhwb3J0IGNsYXNzIE5neEFkZHJlc3NBdXRvY29tcGxldGUge1xuXG4gICAgTUFYX1JBRElVUyA9IDEwMDAwMFxuICAgIEVMRU1FTlRfSU5JVElBTElaQVRJT05fREVMQVkgPSAyMDAwXG5cbiAgICBASW5wdXQoJ25neC1hZGRyZXNzLWF1dG9jb21wbGV0ZScpIHVuaXF1ZUlkOiBzdHJpbmdcbiAgICBAT3V0cHV0KCkgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gICAgQElucHV0KCdvcHRpb25zJykgb3B0aW9uczogYW55ID0ge31cblxuICAgIERFRkFVTFRfS0VZX01BUFBJTkcgPSB7XG4gICAgICAgICdmb3JtYXR0ZWRfYWRkcmVzcyc6ICd2aWNpbml0eScsXG4gICAgICAgICdzdHJlZXQnOiAnc3RyZWV0JyxcbiAgICAgICAgJ3N0cmVldF9udW1iZXInOiAnbnVtYmVyJyxcbiAgICAgICAgJ3N1YmxvY2FsaXR5X2xldmVsXzEnOiAnbmVpZ2hib3VyaG9vZCcsXG4gICAgICAgICdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzInOiAnY2l0eScsXG4gICAgICAgICdwb3N0YWxfY29kZSc6ICdwb3N0YWxDb2RlJyxcbiAgICAgICAgJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMSc6ICdzdGF0ZScsXG4gICAgICAgICdjb3VudHJ5JzogJ2NvdW50cnknXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGxldCBpbnB1dElkID0gdGhpcy51bmlxdWVJZFxuICAgICAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtuZ3gtYWRkcmVzcy1hdXRvY29tcGxldGU9JHtpbnB1dElkfV1gKVxuICAgICAgICAgICAgaWYgKCFkaXYpXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKE5neEFkZHJlc3NBdXRvY29tcGxldGUubmFtZSArICc6IFdob29wcyEgV2Ugd2VyZSB1bmFibGUgdG8gZmluZCBhbnkgZGl2cyB3aXRoIHRoZSBpZCBwcm92aWRlZCA6KCcpXG4gICAgICAgICAgICBsZXQgZGl2SXNBbklucHV0ID0gZGl2ICYmIGRpdi5ub2RlTmFtZSA9PSAnSU5QVVQnXG4gICAgICAgICAgICBsZXQgaW5wdXQ6IGFueSA9IGRpdklzQW5JbnB1dCA/IGRpdiA6IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbbmd4LWFkZHJlc3MtYXV0b2NvbXBsZXRlPSR7aW5wdXRJZH1dIGlucHV0YCkpXG4gICAgICAgICAgICBpZiAoIWlucHV0KVxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihOZ3hBZGRyZXNzQXV0b2NvbXBsZXRlLm5hbWUgKyAnOiBXaG9vcHMhIEJlIHN1cmUgdG8gYWRkIHRoZSBkaXJlY3RpdmUgb25seSB0byBpbnB1dHMgb3IgZGl2cyB3aXRoIGlucHV0IGNoaWxkcmVuICknKVxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZUF1dG9jb21wbGV0ZUlucHV0KGlucHV0KVxuICAgICAgICB9LCB0aGlzLkVMRU1FTlRfSU5JVElBTElaQVRJT05fREVMQVkpXG4gICAgfVxuXG4gICAgYXN5bmMgZ2VuZXJhdGVBdXRvY29tcGxldGVJbnB1dChpbnB1dCkge1xuICAgICAgICBsZXQgY29vcmRpbmF0ZXNcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gYXdhaXQgdGhpcy5nZXRVc2VyTG9jYXRpb24oKVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZSlcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmIChjb29yZGluYXRlcykgeyAvKiBJbiBjYXNlIHRoZSBjb29yZGluYXRlcyB3ZXJlIG9idGFpbmVkIHN1Y2Nlc3NmdWxseSAqL1xuICAgICAgICAgICAgICAgIGxldCBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShpbnB1dCwgdGhpcy5vcHRpb25zKVxuICAgICAgICAgICAgICAgIGxldCBjaXJjbGUgPSBuZXcgZ29vZ2xlLm1hcHMuQ2lyY2xlKHtcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyOiA8Z29vZ2xlLm1hcHMuTGF0TG5nPmNvb3JkaW5hdGVzLFxuICAgICAgICAgICAgICAgICAgICByYWRpdXM6IHRoaXMub3B0aW9ucy5yYWRpdXMgfHwgdGhpcy5NQVhfUkFESVVTXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGUuc2V0Qm91bmRzKGNpcmNsZS5nZXRCb3VuZHMoKSlcbiAgICAgICAgICAgICAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZSA9IGF1dG9jb21wbGV0ZS5nZXRQbGFjZSgpXG4gICAgICAgICAgICAgICAgICAgIGxldCBhZGRyZXNzID0gdGhpcy5wYXJzZUFkZHJlc3MocGxhY2UpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh7IHBsYWNlOiBwbGFjZSwgYWRkcmVzczogYWRkcmVzcyB9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBnZXRVc2VyTG9jYXRpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigobG9jYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuZ2V0TGF0TG5nRnJvbShsb2NhdGlvbikpXG4gICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0TGF0TG5nRnJvbShsb2NhdGlvbikge1xuXG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IHR5cGVvZiBnb29nbGUgIT09ICd1bmRlZmluZWQnID8gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsb2NhdGlvbi5jb29yZHMubGF0aXR1ZGUsIGxvY2F0aW9uLmNvb3Jkcy5sb25naXR1ZGUpIDogdGhpcy5jcmVhdGVGYWxsYmFja0Nvb3JkaW5hdGVzKGxvY2F0aW9uKVxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBjcmVhdGVGYWxsYmFja0Nvb3JkaW5hdGVzKG5hdGl2ZUNvb3JkaW5hdGVzKSB7XG4gICAgICAgIG5hdGl2ZUNvb3JkaW5hdGVzLmxhdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvb3Jkcy5sYXRpdHVkZVxuICAgICAgICB9XG4gICAgICAgIG5hdGl2ZUNvb3JkaW5hdGVzLmxuZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvb3Jkcy5sb25naXR1ZGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlQ29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBnZXRBZGRyZXNzRWxlbWVudChnbWFwc0FkZHJlc3NDb21wb25lbnQ6IEFycmF5PGFueT4sIGFkZHJlc3NDb21wb25lbnRDb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IHZhbHVlXG4gICAgICAgIGdtYXBzQWRkcmVzc0NvbXBvbmVudC5tYXAoKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnR5cGVzICYmIGVsZW1lbnQudHlwZXMuaW5kZXhPZiAmJiAoZWxlbWVudC50eXBlcy5pbmRleE9mKGFkZHJlc3NDb21wb25lbnRDb2RlKSA+IC0xKSlcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGVsZW1lbnQuc2hvcnRfbmFtZSB8fCBlbGVtZW50LmxvbmdfbmFtZVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbiAgICBnZXRQbGFjZUxhdExuZyhwbGFjZTogZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlUmVzdWx0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsbmc6IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpLFxuICAgICAgICAgICAgbGF0OiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QWRkcmVzc0Zyb21QbGFjZShwbGFjZTogZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlUmVzdWx0LCBrZXlNYXBwaW5nPzogYW55KSB7XG4gICAgICAgIGlmICghcGxhY2UgfHwgIXBsYWNlLmdlb21ldHJ5KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oTmd4QWRkcmVzc0F1dG9jb21wbGV0ZS5uYW1lICsgJzogV2hvb3BzISBJdCBsb29rcyBsaWtlIHRoZSBnZW9tZXRyeSBwcm9wZXJ0eSBpcyBtaXNzaW5nIGZyb20gdGhpcyBwbGFjZS4nKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFkZHJlc3M6IGFueSA9IHt9XG4gICAgICAgIGxldCBhZGRyZXNzS2V5cyA9IGtleU1hcHBpbmcgfHwgdGhpcy5ERUZBVUxUX0tFWV9NQVBQSU5HXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaW5mb1R5cGUgPSBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbMF1cbiAgICAgICAgICAgIGxldCBpbmZvSXNSZXF1aXJlZCA9IGFkZHJlc3NLZXlzW2luZm9UeXBlXVxuICAgICAgICAgICAgaWYgKGluZm9Jc1JlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZm9WYWx1ZSA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVsnbG9uZ19uYW1lJ11cbiAgICAgICAgICAgICAgICBhZGRyZXNzW2FkZHJlc3NLZXlzW2luZm9UeXBlXV0gPSBpbmZvVmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBhZGRyZXNzLnZpY2luaXR5ID0gcGxhY2UuZm9ybWF0dGVkX2FkZHJlc3NcbiAgICAgICAgcmV0dXJuIGFkZHJlc3NcbiAgICB9XG5cbiAgICBwYXJzZUFkZHJlc3MocGxhY2U6IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdCkge1xuICAgICAgICBpZiAoIXBsYWNlKSByZXR1cm4ge31cbiAgICAgICAgbGV0IHJhd0FkZHJlc3MgPSBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNcbiAgICAgICAgbGV0IGFkZHJlc3M6IGFueSA9IHt9XG4gICAgICAgIC8qIFBhcnNlcyBhZGRyZXNzICovXG4gICAgICAgIGFkZHJlc3Muc3RyZWV0TnVtYmVyID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCAnc3RyZWV0X251bWJlcicpXG4gICAgICAgIGFkZHJlc3MubG9jYXRpb24gPSB0aGlzLmdldFBsYWNlTGF0TG5nKHBsYWNlKVxuICAgICAgICBhZGRyZXNzLnN0cmVldCA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQocmF3QWRkcmVzcywgJ3JvdXRlJylcbiAgICAgICAgYWRkcmVzcy5udW1iZXIgPSB0aGlzLmdldEFkZHJlc3NFbGVtZW50KHJhd0FkZHJlc3MsICdzdHJlZXRfbnVtYmVyJylcbiAgICAgICAgYWRkcmVzcy5uZWlnaGJvdXJob29kID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCAnc3VibG9jYWxpdHknKVxuICAgICAgICBhZGRyZXNzLmNpdHkgPSB0aGlzLmdldEFkZHJlc3NFbGVtZW50KHJhd0FkZHJlc3MsICdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzInKVxuICAgICAgICBhZGRyZXNzLnN0YXRlID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCAnYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xJylcbiAgICAgICAgYWRkcmVzcy5jb3VudHJ5ID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCAnY291bnRyeScpXG4gICAgICAgIGFkZHJlc3MucG9zdGFsQ29kZSA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQocmF3QWRkcmVzcywgJ3Bvc3RhbF9jb2RlJylcbiAgICAgICAgaWYgKGFkZHJlc3Muc3RyZWV0TnVtYmVyKSBhZGRyZXNzLnN0cmVldCA9IGFkZHJlc3Muc3RyZWV0ICsgJywgJyArIGFkZHJlc3Muc3RyZWV0TnVtYmVyXG4gICAgICAgIHJldHVybiBhZGRyZXNzXG4gICAgfVxufSJdfQ==