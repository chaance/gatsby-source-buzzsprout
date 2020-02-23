class Buzzsprout {
  // eslint-disable-next-line no-useless-constructor
  constructor({ token, podcastId }) {
    //
  }

  setHeaders = (headers = {}) => {
    //
  };

  request = (path = '', params = {}, method = 'GET') => {
    return new Promise(resolve => {
      resolve(require('../mock-data'));
    });
  };

  getEpisodes = () => {
    return this.request()
      .then(res => res)
      .catch(console.error);
  };
}

module.exports = Buzzsprout;
