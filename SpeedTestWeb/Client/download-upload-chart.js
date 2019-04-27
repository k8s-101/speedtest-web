var SpeedTestClient = SpeedTestClient || {};

SpeedTestClient.drawDownloadUploadChart = (testResults) => {
  c3.generate({
    bindto: '#download-upload-chart',
    data: {
      x: 'x',
      xFormat: '%Y-%m-%dT%H:%M:%S',
      columns: [
        ['x'].concat(testResults.testDates()),
        ['Download speed'].concat(testResults.downloadSpeeds()),
        ['Upload speed'].concat(testResults.uploadSpeeds()),
      ]
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%d/%m %H:%M'
        }
      },
      y: {
        label: {
          text: 'Mbps',
          position: 'outer-middle'
        }
      }
    }
  });
};
