module.exports = {
  productionSourceMap: false, // 关键语句
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  devServer: {
    proxy: {
      '/v2': {
        target: 'https://api-v2.chuangkit.com',
        pathRewrite: {
          '^/v2': ''
        },
      },
      '/api': {
        target: 'https://api.chuangkit.com',
        pathRewrite: {
          '^/api': ''
        },
      },
      '/pub': {
        target: 'https://pub-cdn-oss.chuangkit.com',
        pathRewrite: {
          '^/pub': ''
        },
      },
    }
  }
}
