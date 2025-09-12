export class CompanyModel {
  name: string | undefined;
  catchPhrase: string = '';
  bs: string = '';
  constructor(data?: Partial<CompanyModel>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  getDescription(): string {
    return `${this.name} - ${this.catchPhrase}`;
  }
}
