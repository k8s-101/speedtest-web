const cleanUrl = url => {
  return url.endsWith('/') ? url.slice(0, url.length - 1) : url;
};


const getCurrentHost = () => {
  var getUrl = window.location;
  var pathNameSplit = window.location.pathname.split('/');
  pathNameSplit.pop();
  var baseUrl = getUrl.protocol + '//' + getUrl.host + pathNameSplit.join('/');
  return baseUrl;
}

const getConfiguration = () => {
  var baseUrl = getCurrentHost();
  let url = cleanUrl(baseUrl) + '/configuration.json';
  return fetch(url)
    .then(res => res.json())
    .catch(err => {
      throw err;
    });
};

var SpeedTestClient = SpeedTestClient || {};

SpeedTestClient.getSpeedTests = () => {
  const twoDaysAgo = () => {
    const now = new Date();
    now.setDate(now.getDate() - 2);
    return now;
  };

  const asApiDateParameter = date => {
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
  };

  const getApiBasePath = (apiBase) => {
    const cleanedUrl = cleanUrl(apiBase);
    const isHostPath = cleanedUrl.includes('://');
    if (isHostPath) {
      return new URL(cleanedUrl + '/SpeedTest');
    }
    return new URL(`${getCurrentHost()}${cleanedUrl}/SpeedTest`.replace('/client', ''));
  }

  const speedTestApiUrl = apiBase => {
    const apiUrl = getApiBasePath(apiBase)

    const params = apiUrl.searchParams;
    params.set('From', 0);
    params.set('To', 30);
    const sortOnTestDate = 3;
    params.set('SortOn', sortOnTestDate);
    const sortOrderDescending = 1;
    params.set('SortOrder', sortOrderDescending);
    params.set('TestDateGt', asApiDateParameter(twoDaysAgo()));

    return apiUrl;
  };
  return getConfiguration().then(config =>
    d3.json(speedTestApiUrl(config.speedTestApiBase)),
  );
};


