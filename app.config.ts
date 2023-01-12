export default defineAppConfig({
  hasDocSearch: true,
  github: {
    owner: 'nervina-labs',
    repo: 'joyid-docs',
    branch: 'main'
  },
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
    hasDocSearch: true,
    description: 'Developer documentation for JoyID',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
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
      contributors: false
    },
    footer: {
      credits: {
        href: 'https://nervina.io/',
        text: 'Nervina Labs'
      }
    }
  }
})
