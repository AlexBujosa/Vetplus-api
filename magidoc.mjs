export default {
  introspection: {
    type: 'sdl',
    paths: ['./src/schema.gql'],
  },
  website: {
    template: 'carbon-multi-page',
    output: '/docs',
    options: {
      siteRoot: '/docs',
    },
  },
};