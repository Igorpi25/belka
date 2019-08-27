module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          auth: {
            test: /[\\/]node_modules[\\/]@aws-amplify[\\/]auth[\\/]/,
            name: 'aws-amplify-auth',
            chunks: 'all',
          }
        }
      }
    }
  }
}
