const path = require('path');
const createNodeHelpers = require('gatsby-node-helpers').default;
const Buzzsprout = require('./lib/Buzzsprout');

const { createNodeFactory } = createNodeHelpers({ typePrefix: `Buzzsprout` });
const PodcastEpisodeNode = createNodeFactory('PodcastEpisode', node => {
  if (!node.slug && node.audio_url) {
    node.slug = path
      .basename(node.audio_url)
      .split('.')
      .slice(0, -1)
      .join('.');
  }
  return node;
});

const PLUGIN_NAME = 'gatsby-source-buzzsprout';

exports.sourceNodes = async (
  { actions: { createNode, setPluginStatus } },
  { query = {}, token, podcastId }
) => {
  if (process.env.NODE_ENV !== 'production') {
    const errorAboutGatsbyPlugins =
      'To read more about configuring Gatsby plugins, read more at https://www.gatsbyjs.org/docs/using-a-plugin-in-your-site/.';
    const errorAboutBuzzsproutAuth =
      'To read more about Buzzsprout authentication, read more at https://github.com/Buzzsprout/buzzsprout-api#authentication.';
    const errorAboutPodcastId = `To get your podcast ID, login to Buzzsprout, click 'My Account' and then locate the ID next to the title of your podcast.`;
    if (!token)
      throw new Error(
        `It looks like you forgot your Buzzsprout Auth token! Make sure to pass your token into '${PLUGIN_NAME}' options in 'gatsby-config.js'. \n${errorAboutBuzzsproutAuth} \n${errorAboutGatsbyPlugins}`
      );
    if (!podcastId)
      throw new Error(
        `It looks like you forgot your Buzzsprout Podcast ID! Make sure to pass the ID into '${PLUGIN_NAME}' options in 'gatsby-config.js'. \n${errorAboutPodcastId} \n${errorAboutGatsbyPlugins}`
      );
  }
  try {
    const buzzsprout = new Buzzsprout({ token, podcastId });
    const episodes = await buzzsprout.getEpisodes();

    episodes
      .map(episode => PodcastEpisodeNode(episode))
      .forEach(node => createNode(node));

    setPluginStatus({ lastFetched: Date.now() });
  } catch (err) {
    console.error('FAIL:', err);
  }
};
