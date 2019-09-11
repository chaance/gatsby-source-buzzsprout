// const qs = require('qs');
const fetch = require('node-fetch');

/**
 * Todos:
 */

class Buzzsprout {
  constructor({ token, podcastId }) {
    this.token = token;
    this.podcastId = podcastId;
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Token token=${this.token}`,
      'Content-Type': 'application/json',
    };
    this.baseUrl = `https://www.buzzsprout.com/api/${this.podcastId}`;
  }

  setHeaders = (headers = {}) => {
    // extract auth values to avoid potential bugs
    const { Authorization, authorization, ...newHeaders } = headers;
    const { currentHeaders } = this;
    this.headers = {
      ...currentHeaders,
      ...newHeaders,
    };
  };

  request = (path = '', params = {}, method = 'GET') => {
    // TODO: let query = qs.stringify(params) || '';
    const url = this.baseUrl + path;
    return fetch(url, {
      method,
      headers: this.headers,
      cache: 'default',
    });
  };

  getEpisodes = () => {
    return this.request('/episodes.json')
      .then(res => res.json())
      .catch(console.error);
  };
}

module.exports = Buzzsprout;
