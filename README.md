# gatsby-source-buzzsprout

A Gatsby plugin to load podcast episodes from the [Buzzsprout API](https://github.com/Buzzsprout/buzzsprout-api). Basic functionality should work, but this is very much a work-in-process. Be prepared for things to break.

## Installation
```bash
$ npm i gatsby-source-buzzsprout
```
OR
```bash
$ yarn add gatsby-source-buzzsprout
```

### Webhooks
TODO

## Usage

In your `gatsby-config.js` file, load in the plugin along with the parameters of which events to load:

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-buzzsprout',
      options: {
        // You will need to generate an access token and get the podcast ID from your account
        // https://github.com/Buzzsprout/buzzsprout-api#authentication
        token: '1234567890',
        podcastId: '123456',
        // This option will pass query params to the event search API
        // TODO: This is not supported yet!
        query: {},
      },
    },
  ],
};
```
