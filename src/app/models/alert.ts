export enum AlertType {
  SUCCESS = 'Success',
  ERROR = 'Error',
  INFO = 'Info',
  WARNING = 'Warning',
}

export class Alert {
  constructor(readonly type: AlertType) {}
}
