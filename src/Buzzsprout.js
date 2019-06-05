// const qs = require('qs');
const fetch = require('node-fetch');

function Buzzsprout({ token, podcastId }) {
  this.token = token;
  this.podcastId = podcastId;
  this.headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: `Token token=${this.token}`,
    'Content-Type': 'application/json',
  };
  this.baseUrl = `https://www.buzzsprout.com/api/${this.podcastId}`;
}

Buzzsprout.prototype.request = function(
  path = '',
  params = {},
  method = 'GET'
) {
  // let query = qs.stringify(params) || '';
  const url = this.baseUrl + path;
  return fetch(url, {
    method: method,
    headers: this.headers,
  });
};

Buzzsprout.prototype.getEpisodes = function() {
  return this.request('/episodes.json')
    .then(res => res.json())
    .catch(console.error);
};

module.exports = Buzzsprout;
