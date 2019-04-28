const Configuration = (() => {
  const prodConfiguration = {
    speedTestApiBase: '<fill-in-prod-url-here>'
  };

  const devConfiguration = {
    speedTestApiBase: 'http://localhost:5000'
  };

  const isDevelopment = () =>
      window.location.host.includes('localhost')
      || window.location.host.includes('127.0.0.1');

  if (isDevelopment) {
    return devConfiguration;
  }
  else {
    return prodConfiguration;
  }
})();
