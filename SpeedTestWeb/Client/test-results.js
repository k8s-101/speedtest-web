var SpeedTestClient = SpeedTestClient || {};

SpeedTestClient.parseTestResults = (speedTests) => {
  return {
    testDates: () => {
      if (!speedTests) {
        return [];
      }

      return speedTests
        .map(speedTest => speedTest.testDate)
        .map(date => date.substring(0, 19));
    },
    downloadSpeeds: () => {
      if (!speedTests) {
        return [];
      }

      return speedTests.map(speedTest => speedTest.data.speeds.download)
    },
    uploadSpeeds: () => {
      if (!speedTests) {
        return [];
      }

      return speedTests.map(speedTest => speedTest.data.speeds.upload);
    },
    pings: () => {
        if (!speedTests) {
            return [];
        }

        return speedTests.map(speedTest => speedTest.data.server.ping);
    },
  };
};