export default defineNuxtConfig({
  extends: '@nuxt-themes/docus',
  colorMode: {
    preference: 'dark'
  },
  runtimeConfig: {
    public: {
      algolia: {
        applicationId: 'WG9OAWWAJE',
        apiKey: 'dde595281a3b929f618568917d677d81',
        langAttribute: 'lang',
        docSearch: {
          appId: 'WG9OAWWAJE',
          apiKey: 'dde595281a3b929f618568917d677d81',
          indexName: 'joy',
        }
      }
    }
  }
})
