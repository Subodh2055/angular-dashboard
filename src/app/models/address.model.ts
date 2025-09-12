import {GeoModel} from "./geo.model";

export class AddressModel {
  street: string = '';
  suite: string = '';
  city: string = '';
  zipcode: string = '';
  geo: GeoModel = new GeoModel();

  constructor(data?: Partial<AddressModel>) {
    if (data) {
      Object.assign(this, data);
      this.geo = new GeoModel(data.geo);
    }
  }
}
