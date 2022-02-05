const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  // ...
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        Test: / \ (js| CSS)? $/ , // which files should be compressed
        Filename: '[path]. GZ [query]', // compressed filename
        Algorithm: 'gzip', // use gzip compression
        Minratio: 1, // compression rate less than 1
        Deleteoriginalassets: true // delete the uncompressed file. Set it carefully. If you want to provide non gzip resources, you can set it to false or not
      })
    ]
  }
}