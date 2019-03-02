/**
 * @license MIT
 * @author Leonardo Quevedo
 * @description Directive module.
 */

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgxAddressAutocompleteDirective } from './ngx-address-autocomplete.directive'

@NgModule({
    imports: [CommonModule],
    declarations: [NgxAddressAutocompleteDirective],
    exports: [NgxAddressAutocompleteDirective]
})
export class NgxAddressAutocompleteModule { }
