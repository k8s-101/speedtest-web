const getConfiguration = () => {
  var getUrl = window.location;
  var baseUrl = getUrl.protocol + '//' + getUrl.host + '/';
  let url = baseUrl + '/configuration.json';
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

  const speedTestApiUrl = apiBase => {
    const apiUrl = new URL(apiBase + '/SpeedTest');

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
