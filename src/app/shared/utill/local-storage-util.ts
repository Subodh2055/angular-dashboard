import { ObjectUtil } from './object-util';
import { environment } from '../../../environments/environment';

export class LocalStorageUtil {
  /**
   * @description
   * Get an instance of LocalStorage.
   */
  // public static getStorage(): LocalStorage {
  //   return ObjectUtil.isEmpty(localStorage.getItem(environment.appConfigName))
  //     ? new LocalStorage()
  //     : JSON.parse(
  //         CryptoJsUtil.decrypt(localStorage.getItem(environment.appConfigName))
  //       );
  // }

  /**
   * @param data A local storage instance to save.
   *
   * @description
   * Make sure you use LocalStorageUtil.getStorage() method before
   * to get instance of LocalStorage. Edit the instance and use
   * LocalStorageUtil.setStorage() to set in the browser's localStorage.
   */
  // public static setStorage(data: LocalStorage): void {
  //   localStorage.setItem(
  //   );
  // }
  //
  // /**
  //  * @description
  //  * Passes empty JSON to clear the storage.
  //  */
  // public static clearStorage(): void {
  //   LocalStorageUtil.setStorage(new LocalStorage());
  // }
}

export class LocalStorage {
  username: string | undefined;
}
