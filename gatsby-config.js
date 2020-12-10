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
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "hollow-knight-translator",
        short_name: "hk-translator",
        start_url: "/",
        background_color: "#e5e7eb",
        theme_color: "#e5e7eb",
        display: "minimal-ui",
        icon: "src/images/hk-icon.png", // This path is relative to the root of the site.
      },
    },
  ],
};
