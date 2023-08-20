export default {
  introspection: {
    type: 'sdl',
    paths: ['./src/schema.gql'],
  },
  website: {
    template: 'carbon-multi-page',
    options: {
      queryGenerationFactories: {
        Upload: 'image blob goes here',
      },
    },
  },
};
