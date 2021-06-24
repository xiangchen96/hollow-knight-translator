module.exports = {
  pathPrefix: "/hollow-knight-translator",
  siteMetadata: {
    title: "Hollow knight translator",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    }
  ],
};
