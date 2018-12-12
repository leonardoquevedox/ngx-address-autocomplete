# Ngx-address-autocomplete
> Ngx-address-autocomplete is a self contained address autocomplete directive for Angular 2+ based on the Google Places Autcomplete API. Along with initializing the autocomplete into any  input, the directive also parses the address object into an [human-friendly](#address-data-structure) format.

[![basic-merchandising](https://imgur.com/LNOYczf.png)](https://github.com/leopq)

**Disclaimer**: I use this module for personal projects, which means it is designed to fulfill their specific use cases. The code I develop is crafted with reuse and generalism in mind, still, it may or may not fulfill for your requirements. In case it does not, please feel free to submit a pull request, create a fork or contact me at lpachecoquevedo@gmail.com so we can figure something out together. Thank you for reading this!

## Installing

```sh
$ npm install --save ngx-address-autocomplete
```

## Quickstart

Import **ngx-address-autocomplete** module in Angular app.

```typescript
import { NgxAddressAutocomplete } from 'ngx-address-autocomplete'

(...)

@NgModule({
  (...)
  imports: [
    NgxAddressAutocomplete.forRoot()
  ]
  (...)
})
```

Then, just define masks in inputs.

#### Usage

In your template, you can declare the ngx-address-autocomplete as the following:
```html
<input type='text' ngx-address-autocomplete (onSelect)='onAddressSelected($event)' >
```

In your TS class, then, you can handle the select event:
```typescript
export default class AddressPage{

    constructor() { }

    onAddressSelected(e) {
      console.log(e.place) // Native Google Place object
      console.log(e.address) // Address obect as demonstrated on the section below.
    }

}
```

#### Address Data Structure

Description of address returned from the direction on user selection of address:

```typescript
  const address = {
      street: string,
      streetNumber: string,
      location: {
        lat: number,
        lng: number
      }
      neighbourhood: string, 
      city: string,
      state: string,
      country: string,
      postalCode: string
  }
```

### And that's all there is about it.
* Any doubts? Fell free to open an issue.
* Improvements? Pull requests are always come!
* Suggestions? Of course: Let's [talk](https://twitter.com/leopq)!