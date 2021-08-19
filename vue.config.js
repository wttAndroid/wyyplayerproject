// module.exports = {
//   // outputDir: 'docs',
//   // publicPath: 'vue-netease-music',
//   configureWebpack: {
//     devServer: {
//       open: true,
//       proxy: {
//         '/netease-api': {
//           target: 'http://localhost:3000', // 要跨域的域名
//           pathRewrite: {
//             '^/netease-api': ''
//           },
//           changeOrigin: true, // 是否开启跨域
//           secure: false,
//         },
//       },
//       // host: 'localhost',
//       // port: 8888,
//     },
//     externals: process.env.NODE_ENV === 'production' ? {
//       vue: 'Vue',
//       'vue-router': 'VueRouter',
//       vuex: 'Vuex',
//       axios: 'axios',
//     } : {},
//   },
//   css: {
//     loaderOptions: {
//       sass: {
//         prependData: `
//             @import "~@/style/variables.scss";
//             @import "~@/style/mixin.scss";
//           `,
//       },
//     },
//   },
// }

module.exports = { publicPath: './' }
