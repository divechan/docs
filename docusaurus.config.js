const math = require('remark-math')
const katex = require('rehype-katex')
require('dotenv').config()

module.exports = {
  customFields: {
    // Analytics proxy URL
    analyticsProxyUrl: process.env.REACT_APP_AMPLITUDE_PROXY_URL,
    // Determines if staging env
    stagingEnv: process.env.REACT_APP_STAGING,
    // From node
    nodeEnv: process.env.NODE_ENV,
  },
  title: 'Rails Network Technical Documentation',
  tagline: 'Documentation and Guides',
  url: 'https://docs.steamexchange.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'ignore',
  favicon: 'img/favicon.jpg',
  organizationName: 'Steam Exchange', // Usually your GitHub org/user name.
  projectName: 'steamx-docs', // Usually your repo name.
  themeConfig: {
    image: 'img/twitter_card_bg.jpg',
    prism: {
      additionalLanguages: ['solidity'],
    },
    algolia: {
      apiKey: '32465e2ab6f7554ff014e64c0d92171c',
      indexName: 'v3-docs',
      appId: 'S0IDD0YGLZ',
    },
    navbar: {
      title: 'Rails Network Technical Documentation',
      logo: {
        alt: 'Rails white',
        src: 'https://raw.githubusercontent.com/divechan/brandkit/main/SVGs/railslogoonlygray.svg',
      },
      items: [
        {
          to: '/steamexchange/steam-exchange-overview',
          label: 'Steam Exchange',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/railsnetwork/rails-address-information',
          label: 'Rails Network',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/concepts/overview',
          label: 'Concepts',
          position: 'left',
          className: 'V3_active',
        },
        {
          to: '/contracts/v2/overview',
          label: 'Contracts',
          position: 'left',
          className: 'V3_active',
        },
        
        {
          to: '/api/subgraph/overview',
          label: 'APIs',
          position: 'left',
          className: 'V3_active',
        },
      ],
    },
    footer: {
      // style: "light",
      links: [
        {
          title: 'Developers',
          items: [
            {
              label: 'Apply',
              href: 'https://www.jotform.com/form/233264447089059',
            },
            {
              label: 'Testnet Explorer',
              href: 'https://build.steamexchange.io',
            },
          ],
        },
       
        {
          title: 'Steam Exchange Ecosystem',
          items: [
            {
              label: 'Home',
              href: 'https://steamexchange.io',
            },
            {
              label: 'Depot',
              href: 'https://depot.steamexchange.io',
            },
            {
              label: 'Mainnet Explorer',
              href: 'https://explore.steamexchange.io',
            },
            {
              label: 'Swap',
              href: 'https://swap.steamexchange.io',
            },
            {
              label: 'Chart (Gecko Terminal)',
              href: 'https://www.geckoterminal.com/rails-network/pools/0x587d7f5db5feee563d55fab612400f147cf107f0',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/SteamXchangeOfficial/',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/qD4YqBaEN2',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/Steam_Exchange',
            },
            {
              label: 'Forum',
              href: 'https://forum.steamexchange.io',
            },
          ],
        },
      ],
      // copyright: `unlicensed`,
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          includeCurrentVersion: true,
        },
        blog: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
          path: 'blog/',
          blogTitle: 'Engineering Blog',
          blogSidebarCount: 0,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          customCss2: require.resolve('./src/css/colors.css'),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    ['@saucelabs/theme-github-codeblock', {}],
    // Remove or comment out the plugin-client-redirects section if not needed
    /*
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // All your redirect rules here
        ],
        createRedirects(existingPath) {
          // Your dynamic redirect rules here
          return undefined;
        },
      },
    ],
    */
  ],
}
