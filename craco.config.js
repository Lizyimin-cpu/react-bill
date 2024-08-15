const path = require('path')

module.exports = {
  devServer: {
    port: 3003
  },
  // webpack 
  webpack: {
    // name
    alias: {
      // Convention: Use @ to indicate the path where the src file is located
      '@': path.resolve(__dirname, 'src')
    }
  }
}