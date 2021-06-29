/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/graphql': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  mock: {
    '/graphql': {
      target: 'http://localhost:3333',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  prod: {
    '/graphql': {
      target: 'https://eagle.guanyun.cn',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
