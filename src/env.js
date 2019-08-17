(function (window) {
  window.__env = window.__env || {};

  // Default API url based on environment
  window.__env.apiUrl = 'http://127.0.0.1:3000/';
  window.__env.appUrl = 'http://localhost:4200/';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));