if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}

export default {
  production: require('./configureStore.prod'),
  development: require('./configureStore.dev')
};
