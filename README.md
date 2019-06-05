# gatsby-source-buzzsprout

A Gatsby plugin to load podcast episodes from the [Buzzsprout API](https://github.com/Buzzsprout/buzzsprout-api). Basic functionality should work, but this is very much a work-in-process. Be prepared for things to break.

Please note that the Buzzsprout API itself is still somewhat fresh and is likely to evolve over time.

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

In your `gatsby-config.js` file, load in the plugin along with the parameters of which podcast episodes to load:

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

In your page, construct a query to get the data you need from the API.

```js
import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import Episode from 'components/Episode';

const PodcastPage = ({
  data: {
    allBuzzsproutPodcastEpisode: { edges: episodes },
  },
}) => {
  return (
    <Layout>
      <h1>My Podcast Episodes</h1>
      <ul>
        {episodes.map(({ node }) => (
          <Episode
            key={node.id}
            episode={node.episode_number}
            title={node.title}
            url={node.audio_url}
          />
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query HomePageQuery {
    allBuzzsproutPodcastEpisode {
      edges {
        node {
          id
          title
          audio_url
          episode_number
        }
      }
    }
  }
`;

export default IndexPage;
```
