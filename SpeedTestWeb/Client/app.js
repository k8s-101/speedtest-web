SpeedTestClient.getSpeedTests()
  .then((speedTests) => {
    const results = SpeedTestClient.parseTestResults(speedTests);
    SpeedTestClient.drawDownloadUploadChart(results);
    SpeedTestClient.drawPingChart(results);
  })
  .catch((error) => console.error(error));