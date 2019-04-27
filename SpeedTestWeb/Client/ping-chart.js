var SpeedTestClient = SpeedTestClient || {};

SpeedTestClient.drawPingChart = (testResults) => {
  c3.generate({
    bindto: '#ping-chart',
    data: {
      x: 'x',
      xFormat: '%Y-%m-%dT%H:%M:%S',
      columns: [
        ['x'].concat(testResults.testDates()),
        ['Server ping'].concat(testResults.pings()),
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
          text: 'ms',
          position: 'outer-middle'
        }
      }
    }
  });
};
