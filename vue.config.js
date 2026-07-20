const { defineConfig } = require('@vue/cli-service')
// const pxtorem = require('postcss-pxtorem')

// const postcss = pxtorem({
//   rootValue: 192,
//   exclude: /node_modules\/[^element-ui]/,
// });

const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  // title: 'Acer Connect X6E',
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.76.1/cgi-bin/cgibin', // 家里电脑地址
        // target: 'http://192.168.76.180:10393/mock/6be134e8-2095-4788-afa1-576910515bf0/cgi-bin/ginbinm', // 家里电脑地址
        // target: 'http://192.168.138.116:10393/mock/6be134e8-2095-4788-afa1-576910515bf0/cgi-bin/ginbinm', // 家里电脑地址
        // target: 'http://10.10.4.17:10393/mock/6be134e8-2095-4788-afa1-576910515bf0/cgi-bin/ginbin', // 单位电脑地址
        changeOrigin: true,
        ws: false,
        secure: false,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  lintOnSave: false,
  // 配置scss文件全局变量
  css: {
    loaderOptions: {
      // 没有分号会报错
      sass: {
        // data: '@import "@/assets/css/vars.scss";' //旧版sass-loader写法(8.0以下)
        additionalData: `@import "@/styles/gaming/variablesglobal.scss";` //新版scss-loader(8.0及以上)
      },
      // postcss: {
      //   postcssOptions: {
      //     plugins: [
      //       postcss
      //     ]
      //   }
      // },
    }
  },
  // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  chainWebpack (config) {
    // set svg-sprite-loader
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Acer Connect X6ES'
        return args
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }


})