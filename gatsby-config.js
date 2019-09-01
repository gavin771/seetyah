module.exports = {
  siteMetadata: {
    title: 'Seetyah | Easy to use workspace for images, links and more',
    author: '@gavin771',
    description: 'An easy to use workspace for images, links and more',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#34b3a0',
        theme_color: '#34b3a0',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
  ],
}
