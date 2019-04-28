const Configuration = (() => {
  const prodConfiguration = {
    speedTestApiBase: 'http://137.117.213.59',
  };

  const devConfiguration = {
    speedTestApiBase: 'http://localhost:5000',
  };

  const isDevelopment = () =>
    window.location.host.includes('localhost') ||
    window.location.host.includes('127.0.0.1');

  if (isDevelopment()) {
    return devConfiguration;
  } else {
    return prodConfiguration;
  }
})();
