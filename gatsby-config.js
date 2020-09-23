/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `MCC Dashboard`,
    description: `Just a simple dashboard.`,
    author: `Luke Moderwell`,
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sass`,
    // {
    //   resolve: `gatsby-plugin-google-fonts`,
    //   options: {
    //     fonts: [`Inter`],
    //     display: 'swap',
    //   },
    // },
  ],
};
