/**
 * @license MIT
 * @author Leonardo Quevedo
 * @description Directive module.
 */

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgxAddressAutocomplete } from './ngx-address-autocomplete'

@NgModule({
    imports: [CommonModule],
    declarations: [NgxAddressAutocomplete],
    exports: [NgxAddressAutocomplete]
})
export class NgxAddressAutocompleteModule { }