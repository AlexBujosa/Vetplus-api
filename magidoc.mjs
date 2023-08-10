// magidoc.mjs

export default {
  introspection: {
    // type: 'url',
    // url: 'http://localhost:3000/graphql',
    type: 'sdl',
    paths: ['./src/schema.gql'],
  },
  website: {
    template: 'carbon-multi-page',
  },
};
