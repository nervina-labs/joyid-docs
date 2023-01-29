export default defineAppConfig({
  hasDocSearch: true,
  content: {
    hasDocSearch: true,
    markdown: {
      remarkExternalLinks: {
        content: {
          type: "element",
          tagName: "icon-external-link",
        },
      },
    },
  },
  docus: {
    title: 'JoyID Docs',
    description: 'Developer documentation for JoyID',
    socials: {
      github: 'nervina-labs/joyid',
    },
    aside: {
      level: 1,
      exclude: [],
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: []
    },
    github: {
      root: 'content',
      edit: true,
      contributors: false,
      owner: 'nervina-labs',
      repo: 'joyid-docs',
      branch: 'main'
    },
    footer: {
      credits: {
        href: 'https://nervina.io/',
        text: 'Nervina Labs'
      }
    }
  }
})
