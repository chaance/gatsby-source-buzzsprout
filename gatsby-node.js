const createNodeHelpers = require('gatsby-node-helpers').default;
const Buzzsprout = require('./src/Buzzsprout');

const { createNodeFactory } = createNodeHelpers({ typePrefix: `Buzzsprout` });

const PodcastEpisodeNode = createNodeFactory('PodcastEpisode', node => {
  return node;
});

exports.sourceNodes = async function(
  { actions: { createNode, setPluginStatus } },
  { query = {}, token, podcastId }
) {
  if (!token) {
    throw new Error('Missing auth token');
  }
  if (!podcastId) {
    throw new Error('Missing podcast ID');
  }
  const buzzsprout = new Buzzsprout({ token, podcastId });
  try {
    const episodes = await buzzsprout.getEpisodes();

    episodes
      .map(PodcastEpisode => PodcastEpisodeNode(PodcastEpisode))
      .forEach(PodcastEpisodeNode => createNode(PodcastEpisodeNode));

    setPluginStatus({ lastFetched: new Date() });
  } catch (err) {
    console.error('FAIL:', err);
  }
};
