<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby icon" src="https://www.gatsbyjs.org/monogram.svg" height="60" />
  </a>
  <img aria-hidden="true" src="https://res.cloudinary.com/chancedigital/image/upload/c_scale,h_150/v1559751463/hrt.png" alt="heart icon" height="60">
  <a href="https://www.gatsbyjs.org">
    <img alt="Buzzsprout icon" src="https://res.cloudinary.com/chancedigital/image/upload/c_limit,h_100,w_150/v1559748379/buzzsprout-logo-icon.png" height="60" />
  </a>
</p>

<h1 align="center">
  gatsby-source-buzzsprout
</h1>

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
