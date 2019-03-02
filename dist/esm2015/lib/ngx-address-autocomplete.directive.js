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
export class NgxAddressAutocompleteDirective {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFkZHJlc3MtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1hZGRyZXNzLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYWRkcmVzcy1hdXRvY29tcGxldGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBT0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU92RSxNQUFNO0lBbUJKO1FBbEJBLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsaUNBQTRCLEdBQUcsSUFBSSxDQUFDO1FBRzFCLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN6QyxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBRXBDLHdCQUFtQixHQUFHO1lBQ3BCLGlCQUFpQixFQUFFLFVBQVU7WUFDN0IsTUFBTSxFQUFFLFFBQVE7WUFDaEIsYUFBYSxFQUFFLFFBQVE7WUFDdkIsbUJBQW1CLEVBQUUsZUFBZTtZQUNwQywyQkFBMkIsRUFBRSxNQUFNO1lBQ25DLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLDJCQUEyQixFQUFFLE9BQU87WUFDcEMsT0FBTyxFQUFFLFNBQVM7U0FDbkIsQ0FBQztJQUVhLENBQUM7Ozs7SUFFaEIsUUFBUTtRQUNOLFVBQVU7OztRQUFDLEdBQUcsRUFBRTs7Z0JBQ1YsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFROztnQkFDdkIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQTZCLE9BQU8sR0FBRyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxHQUFHO2dCQUNOLE9BQU8sQ0FBQyxJQUFJLENBQ1YsK0JBQStCLENBQUMsSUFBSTtvQkFDbEMsbUVBQW1FLENBQ3RFLENBQUM7O2dCQUNBLFlBQVksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsSUFBSSxPQUFPOztnQkFDN0MsS0FB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QVUsRUFDViw2QkFBNkIsQ0FDOUIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUNwQyxVQUFVLEVBQ1YsNkJBQTZCLENBQzlCLENBQUM7UUFDRixPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDaEUsT0FBTyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDOztjQUNqRSxzQkFBc0IsR0FDMUIsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLE9BQU8sQ0FBQyxZQUFZLElBQUksQ0FBQyxzQkFBc0I7WUFDakQsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ2hFLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7OztZQWpMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjthQUN2Qzs7Ozt1QkFLRSxLQUFLLFNBQUMsMEJBQTBCO3VCQUNoQyxNQUFNO3NCQUNOLEtBQUssU0FBQyxTQUFTOzs7O0lBTGhCLHFEQUFvQjs7SUFDcEIsdUVBQW9DOztJQUVwQyxtREFBb0Q7O0lBQ3BELG1EQUEyRDs7SUFDM0Qsa0RBQW9DOztJQUVwQyw4REFTRSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2UgTUlUXG4gKiBAdmVyc2lvbiAxLjEuMFxuICogQGF1dGhvciBMZW9uYXJkbyBRdWV2ZWRvXG4gKiBAZGVzY3JpcHRpb24gQWRkcmVzcyBhdXRvY29tcGxldGUgZGlyZWN0aXZlLlxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuZGVjbGFyZSB2YXIgZ29vZ2xlO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6IFwiW25neC1hZGRyZXNzLWF1dG9jb21wbGV0ZV1cIlxufSlcbmV4cG9ydCBjbGFzcyBOZ3hBZGRyZXNzQXV0b2NvbXBsZXRlRGlyZWN0aXZlIHtcbiAgTUFYX1JBRElVUyA9IDEwMDAwMDtcbiAgRUxFTUVOVF9JTklUSUFMSVpBVElPTl9ERUxBWSA9IDIwMDA7XG5cbiAgQElucHV0KFwibmd4LWFkZHJlc3MtYXV0b2NvbXBsZXRlXCIpIHVuaXF1ZUlkOiBzdHJpbmc7XG4gIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dChcIm9wdGlvbnNcIikgb3B0aW9uczogYW55ID0ge307XG5cbiAgREVGQVVMVF9LRVlfTUFQUElORyA9IHtcbiAgICBmb3JtYXR0ZWRfYWRkcmVzczogXCJ2aWNpbml0eVwiLFxuICAgIHN0cmVldDogXCJzdHJlZXRcIixcbiAgICBzdHJlZXRfbnVtYmVyOiBcIm51bWJlclwiLFxuICAgIHN1YmxvY2FsaXR5X2xldmVsXzE6IFwibmVpZ2hib3VyaG9vZFwiLFxuICAgIGFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMjogXCJjaXR5XCIsXG4gICAgcG9zdGFsX2NvZGU6IFwicG9zdGFsQ29kZVwiLFxuICAgIGFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMTogXCJzdGF0ZVwiLFxuICAgIGNvdW50cnk6IFwiY291bnRyeVwiXG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbGV0IGlucHV0SWQgPSB0aGlzLnVuaXF1ZUlkO1xuICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtuZ3gtYWRkcmVzcy1hdXRvY29tcGxldGU9JHtpbnB1dElkfV1gKTtcbiAgICAgIGlmICghZGl2KVxuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgTmd4QWRkcmVzc0F1dG9jb21wbGV0ZURpcmVjdGl2ZS5uYW1lICtcbiAgICAgICAgICAgIFwiOiBXaG9vcHMhIFdlIHdlcmUgdW5hYmxlIHRvIGZpbmQgYW55IGRpdnMgd2l0aCB0aGUgaWQgcHJvdmlkZWQgOihcIlxuICAgICAgICApO1xuICAgICAgbGV0IGRpdklzQW5JbnB1dCA9IGRpdiAmJiBkaXYubm9kZU5hbWUgPT0gXCJJTlBVVFwiO1xuICAgICAgbGV0IGlucHV0OiBhbnkgPSBkaXZJc0FuSW5wdXRcbiAgICAgICAgPyBkaXZcbiAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbbmd4LWFkZHJlc3MtYXV0b2NvbXBsZXRlPSR7aW5wdXRJZH1dIGlucHV0YCk7XG4gICAgICBpZiAoIWlucHV0KVxuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgTmd4QWRkcmVzc0F1dG9jb21wbGV0ZURpcmVjdGl2ZS5uYW1lICtcbiAgICAgICAgICAgIFwiOiBXaG9vcHMhIEJlIHN1cmUgdG8gYWRkIHRoZSBkaXJlY3RpdmUgb25seSB0byBpbnB1dHMgb3IgZGl2cyB3aXRoIGlucHV0IGNoaWxkcmVuIClcIlxuICAgICAgICApO1xuICAgICAgdGhpcy5nZW5lcmF0ZUF1dG9jb21wbGV0ZUlucHV0KGlucHV0KTtcbiAgICB9LCB0aGlzLkVMRU1FTlRfSU5JVElBTElaQVRJT05fREVMQVkpO1xuICB9XG5cbiAgYXN5bmMgZ2VuZXJhdGVBdXRvY29tcGxldGVJbnB1dChpbnB1dCkge1xuICAgIGxldCBjb29yZGluYXRlcztcbiAgICB0cnkge1xuICAgICAgY29vcmRpbmF0ZXMgPSBhd2FpdCB0aGlzLmdldFVzZXJMb2NhdGlvbigpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIC8qIEluIGNhc2UgdGhlIGNvb3JkaW5hdGVzIHdlcmUgb2J0YWluZWQgc3VjY2Vzc2Z1bGx5ICovXG4gICAgICAgIGxldCBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShcbiAgICAgICAgICBpbnB1dCxcbiAgICAgICAgICB0aGlzLm9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgbGV0IGNpcmNsZSA9IG5ldyBnb29nbGUubWFwcy5DaXJjbGUoe1xuICAgICAgICAgIGNlbnRlcjogPGdvb2dsZS5tYXBzLkxhdExuZz5jb29yZGluYXRlcyxcbiAgICAgICAgICByYWRpdXM6IHRoaXMub3B0aW9ucy5yYWRpdXMgfHwgdGhpcy5NQVhfUkFESVVTXG4gICAgICAgIH0pO1xuICAgICAgICBhdXRvY29tcGxldGUuc2V0Qm91bmRzKGNpcmNsZS5nZXRCb3VuZHMoKSk7XG4gICAgICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcihcInBsYWNlX2NoYW5nZWRcIiwgKCkgPT4ge1xuICAgICAgICAgIGxldCBwbGFjZSA9IGF1dG9jb21wbGV0ZS5nZXRQbGFjZSgpO1xuICAgICAgICAgIGxldCBhZGRyZXNzID0gdGhpcy5wYXJzZUFkZHJlc3MocGxhY2UpO1xuICAgICAgICAgIHRoaXMub25TZWxlY3QuZW1pdCh7IHBsYWNlOiBwbGFjZSwgYWRkcmVzczogYWRkcmVzcyB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0VXNlckxvY2F0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3aW5kb3cubmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAgbG9jYXRpb24gPT4ge1xuICAgICAgICAgIHJlc29sdmUodGhpcy5nZXRMYXRMbmdGcm9tKGxvY2F0aW9uKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVyciA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRMYXRMbmdGcm9tKGxvY2F0aW9uKSB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID1cbiAgICAgIHR5cGVvZiBnb29nbGUgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgPyBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKFxuICAgICAgICAgICAgbG9jYXRpb24uY29vcmRzLmxhdGl0dWRlLFxuICAgICAgICAgICAgbG9jYXRpb24uY29vcmRzLmxvbmdpdHVkZVxuICAgICAgICAgIClcbiAgICAgICAgOiB0aGlzLmNyZWF0ZUZhbGxiYWNrQ29vcmRpbmF0ZXMobG9jYXRpb24pO1xuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuXG4gIGNyZWF0ZUZhbGxiYWNrQ29vcmRpbmF0ZXMobmF0aXZlQ29vcmRpbmF0ZXMpIHtcbiAgICBuYXRpdmVDb29yZGluYXRlcy5sYXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvb3Jkcy5sYXRpdHVkZTtcbiAgICB9O1xuICAgIG5hdGl2ZUNvb3JkaW5hdGVzLmxuZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29vcmRzLmxvbmdpdHVkZTtcbiAgICB9O1xuICAgIHJldHVybiBuYXRpdmVDb29yZGluYXRlcztcbiAgfVxuXG4gIGdldEFkZHJlc3NFbGVtZW50KFxuICAgIGdtYXBzQWRkcmVzc0NvbXBvbmVudDogQXJyYXk8YW55PixcbiAgICBhZGRyZXNzQ29tcG9uZW50Q29kZTogc3RyaW5nXG4gICkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBnbWFwc0FkZHJlc3NDb21wb25lbnQubWFwKGVsZW1lbnQgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBlbGVtZW50LnR5cGVzICYmXG4gICAgICAgIGVsZW1lbnQudHlwZXMuaW5kZXhPZiAmJlxuICAgICAgICBlbGVtZW50LnR5cGVzLmluZGV4T2YoYWRkcmVzc0NvbXBvbmVudENvZGUpID4gLTFcbiAgICAgIClcbiAgICAgICAgdmFsdWUgPSBlbGVtZW50LnNob3J0X25hbWUgfHwgZWxlbWVudC5sb25nX25hbWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZ2V0UGxhY2VMYXRMbmcocGxhY2U6IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdCkge1xuICAgIHJldHVybiB7XG4gICAgICBsbmc6IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpLFxuICAgICAgbGF0OiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKVxuICAgIH07XG4gIH1cblxuICBnZXRBZGRyZXNzRnJvbVBsYWNlKHBsYWNlOiBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VSZXN1bHQsIGtleU1hcHBpbmc/OiBhbnkpIHtcbiAgICBpZiAoIXBsYWNlIHx8ICFwbGFjZS5nZW9tZXRyeSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBOZ3hBZGRyZXNzQXV0b2NvbXBsZXRlRGlyZWN0aXZlLm5hbWUgK1xuICAgICAgICAgIFwiOiBXaG9vcHMhIEl0IGxvb2tzIGxpa2UgdGhlIGdlb21ldHJ5IHByb3BlcnR5IGlzIG1pc3NpbmcgZnJvbSB0aGlzIHBsYWNlLlwiXG4gICAgICApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgYWRkcmVzczogYW55ID0ge307XG4gICAgbGV0IGFkZHJlc3NLZXlzID0ga2V5TWFwcGluZyB8fCB0aGlzLkRFRkFVTFRfS0VZX01BUFBJTkc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBpbmZvVHlwZSA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlc1swXTtcbiAgICAgIGxldCBpbmZvSXNSZXF1aXJlZCA9IGFkZHJlc3NLZXlzW2luZm9UeXBlXTtcbiAgICAgIGlmIChpbmZvSXNSZXF1aXJlZCkge1xuICAgICAgICBsZXQgaW5mb1ZhbHVlID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldW1wibG9uZ19uYW1lXCJdO1xuICAgICAgICBhZGRyZXNzW2FkZHJlc3NLZXlzW2luZm9UeXBlXV0gPSBpbmZvVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGFkZHJlc3MudmljaW5pdHkgPSBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcztcbiAgICByZXR1cm4gYWRkcmVzcztcbiAgfVxuXG4gIHBhcnNlQWRkcmVzcyhwbGFjZTogZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlUmVzdWx0KSB7XG4gICAgaWYgKCFwbGFjZSkgcmV0dXJuIHt9O1xuICAgIGxldCByYXdBZGRyZXNzID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzO1xuICAgIGxldCBhZGRyZXNzOiBhbnkgPSB7fTtcbiAgICAvKiBQYXJzZXMgYWRkcmVzcyAqL1xuICAgIGFkZHJlc3Muc3RyZWV0TnVtYmVyID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCBcInN0cmVldF9udW1iZXJcIik7XG4gICAgYWRkcmVzcy5sb2NhdGlvbiA9IHRoaXMuZ2V0UGxhY2VMYXRMbmcocGxhY2UpO1xuICAgIGFkZHJlc3Muc3RyZWV0ID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCBcInJvdXRlXCIpO1xuICAgIGFkZHJlc3MubnVtYmVyID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCBcInN0cmVldF9udW1iZXJcIik7XG4gICAgYWRkcmVzcy5uZWlnaGJvdXJob29kID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCBcInN1YmxvY2FsaXR5XCIpO1xuICAgIGFkZHJlc3MuY2l0eSA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQoXG4gICAgICByYXdBZGRyZXNzLFxuICAgICAgXCJhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzJcIlxuICAgICk7XG4gICAgYWRkcmVzcy5zdGF0ZSA9IHRoaXMuZ2V0QWRkcmVzc0VsZW1lbnQoXG4gICAgICByYXdBZGRyZXNzLFxuICAgICAgXCJhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzFcIlxuICAgICk7XG4gICAgYWRkcmVzcy5jb3VudHJ5ID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCBcImNvdW50cnlcIik7XG4gICAgYWRkcmVzcy5wb3N0YWxDb2RlID0gdGhpcy5nZXRBZGRyZXNzRWxlbWVudChyYXdBZGRyZXNzLCBcInBvc3RhbF9jb2RlXCIpO1xuICAgIGNvbnN0IHN0cmVldEFscmVhZHlIYXNOdW1iZXIgPVxuICAgICAgYWRkcmVzcy5zdHJlZXQgJiYgIWlzTmFOKHBhcnNlSW50KGFkZHJlc3Muc3RyZWV0LnNwbGl0KFwiLFwiKVsxXSkpO1xuICAgIGlmIChhZGRyZXNzLnN0cmVldE51bWJlciAmJiAhc3RyZWV0QWxyZWFkeUhhc051bWJlcilcbiAgICAgIGFkZHJlc3Muc3RyZWV0ID0gYWRkcmVzcy5zdHJlZXQgKyBcIiwgXCIgKyBhZGRyZXNzLnN0cmVldE51bWJlcjtcbiAgICByZXR1cm4gYWRkcmVzcztcbiAgfVxufVxuIl19