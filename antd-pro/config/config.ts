import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';

const { REACT_APP_ENV, PORT = 8000 } = process.env;
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  title: false,
  hash: true,
  antd: {},
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
  routes: [
    {
      path: '/',
      component: './welcome',
    },
  ],
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
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
