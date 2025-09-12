export const environment = {
  production: false,
  apiUrl: 'https://jsonplaceholder.typicode.com',
  appName: 'User Dashboard',
  version: '1.0.0',
  enableLogging: true,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes in milliseconds
  pageSize: 5,
  debounceTime: 300, // milliseconds for search debounce
  retryAttempts: 2,
  storageKeys: {
    viewMode: 'user-dashboard-view-mode',
    userCache: 'user-dashboard-cache',
    lastSearch: 'user-dashboard-last-search'
  }
};
