/**
 * @license MIT
 * @version 1.1.0
 * @author Leonardo Quevedo
 * @description Address autocomplete directive.
 */
/// <reference types="googlemaps" />
import { EventEmitter } from '@angular/core';
export declare class NgxAddressAutocomplete {
    MAX_RADIUS: number;
    ELEMENT_INITIALIZATION_DELAY: number;
    uniqueId: string;
    onSelect: EventEmitter<any>;
    options: any;
    DEFAULT_KEY_MAPPING: {
        'formatted_address': string;
        'street': string;
        'street_number': string;
        'sublocality_level_1': string;
        'administrative_area_level_2': string;
        'postal_code': string;
        'administrative_area_level_1': string;
        'country': string;
    };
    constructor();
    ngOnInit(): void;
    generateAutocompleteInput(input: any): Promise<void>;
    getUserLocation(): Promise<{}>;
    getLatLngFrom(location: any): any;
    createFallbackCoordinates(nativeCoordinates: any): any;
    getAddressElement(gmapsAddressComponent: Array<any>, addressComponentCode: string): any;
    getPlaceLatLng(place: google.maps.places.PlaceResult): {
        lng: number;
        lat: number;
    };
    getAddressFromPlace(place: google.maps.places.PlaceResult, keyMapping?: any): any;
    parseAddress(place: google.maps.places.PlaceResult): any;
}
