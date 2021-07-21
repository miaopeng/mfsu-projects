import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';

const { winPath } = utils; // preview.pro.ant.design only do not use in your production ;

const { REACT_APP_ENV, PORT = 8000 } = process.env;
export default defineConfig({
  nodeModulesTransform: {
    // 设置 node_modules 目录下依赖文件的编译方式
    type: 'none',
    exclude: [],
  },
  title: false,
  hash: true,
  antd: {},
  outputPath: '../public/assets',
  history: { type: 'hash' },
  dva: {
    hmr: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  externals: {
    bizcharts: 'BizCharts',
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  // extraBabelPlugins: ['babel-plugin-date-fns'],
  // fastRefresh: {},
  mfsu: { production: { output: '.mfsu-production' } },
  webpack5: {},
  scripts: [
    `http://localhost:${PORT}/libs/react/16.13.1/react.development.js`,
    `http://localhost:${PORT}/libs/react-dom/16.13.1/react-dom.development.js`,
  ],
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: './welcome',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
