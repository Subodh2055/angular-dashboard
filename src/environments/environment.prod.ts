export const environment = {
  production: true,
  apiUrl: 'https://jsonplaceholder.typicode.com',
  appName: 'User Dashboard',
  version: '1.0.0',
  enableLogging: false,
  appConfigName: 'user-dashboard-config',
  cacheTimeout: 10 * 60 * 1000, // 10 minutes in milliseconds
  pageSize: 5,
  debounceTime: 300, // milliseconds for search debounce
  retryAttempts: 3,
  storageKeys: {
    viewMode: 'user-dashboard-view-mode',
    userCache: 'user-dashboard-cache',
    lastSearch: 'user-dashboard-last-search'
  }
};
