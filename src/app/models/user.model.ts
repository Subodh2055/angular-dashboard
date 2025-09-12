import {CompanyModel} from "./company.model";
import {AddressModel} from "./address.model";

export class UserModel {
  id: number = 0;
  name: string = '';
  username: string = '';
  email: string = '';
  phone: string = '';
  website: string = '';
  address: AddressModel = new AddressModel();
  company: CompanyModel = new CompanyModel();

  constructor(data?: Partial<UserModel>) {
    if (data) {
      Object.assign(this, data);
      this.address = new AddressModel(data.address);
      this.company = new CompanyModel(data.company);
    }
  }
}
