import { ObjectUtil } from './object-util';
import { environment } from '../../../environments/environment';

export class LocalStorageUtil {

  /**
   * Get an instance of LocalStorage from browser localStorage.
   * If nothing exists, returns a new instance.
   */
  public static getStorage(): LocalStorage {
    const stored = localStorage.getItem(environment.appConfigName);
    if (ObjectUtil.isEmpty(stored)) {
      return new LocalStorage();
    }

    try {
      return JSON.parse(stored!) as LocalStorage;
    } catch (error) {
      console.error('Error parsing localStorage:', error);
      return new LocalStorage();
    }
  }

  /**
   * Save LocalStorage instance to browser localStorage
   * @param data LocalStorage object
   */
  public static setStorage(data: LocalStorage): void {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(environment.appConfigName, jsonData);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  /**
   * Clears the stored LocalStorage by resetting to empty object
   */
  public static clearStorage(): void {
    this.setStorage(new LocalStorage());
  }
}

/**
 * Define your LocalStorage structure here
 */
export class LocalStorage {
  username?: string;
  userListLayout?: boolean; // table or card view
  searchTerm?: string;
  currentPage?: number;
}
