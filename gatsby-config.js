module.exports = {
  siteMetadata: {
    title: `AHA Moments`,
    description: `A blog site for all things`,
    author: `@sherlockq`,
    twitterHandle: "@sherlockq",
    url: "https://zhiqiangqiao.com",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#282828`,
        theme_color: `#282828`,
        display: `minimal-ui`,
        icon: `src/images/dachshund.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `zhiqiangqiao`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-emoji`,
          `gatsby-remark-katex`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `custom-class`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            // All options are optional. Defaults shown here.
            options: {
              theme: "Dark+ (default dark)", // Read on for list of included themes. Also accepts object and function forms.
              wrapperClassName: "",   // Additional class put on 'pre' tag. Also accepts function to set the class dynamically.
              injectStyles: true,     // Injects (minimal) additional CSS for layout and scrolling
              extensions: [],         // Third-party extensions providing additional themes and languages
              languageAliases: {},    // Map of custom/unknown language codes to standard/known language codes
              replaceColor: x => x,   // Function allowing replacement of a theme color with another. Useful for replacing hex colors with CSS variables.
              getLineClassName: ({    // Function allowing dynamic setting of additional class names on individual lines
                                   content,              //   - the string content of the line
                                   index,                //   - the zero-based index of the line within the code fence
                                   language,             //   - the language specified for the code fence
                                   meta,                  //   - any options set on the code fence alongside the language (more on this later)
                                 }) => "",
              logLevel: "warn",       // Set to 'info' to debug if something looks wrong
            },
          },
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [
                // Your custom transformers
              ],
              services: {
                // The service-specific options by the name of the service
              },
            },
          },
        ],
      },
    },
  ],
}
