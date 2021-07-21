import path from 'path';

import * as IWebpackChainConfig from 'webpack-chain';

function getModulePackageName(module: { context: string }) {
  if (!module.context) return null;

  const nodeModulesPath = path.join(__dirname, '../node_modules/');
  if (module.context.substring(0, nodeModulesPath.length) !== nodeModulesPath) {
    return null;
  }

  const moduleRelativePath = module.context.substring(nodeModulesPath.length);
  const [moduleDirName] = moduleRelativePath.split(path.sep);
  let packageName: string | null = moduleDirName;
  // handle tree shaking
  if (packageName && packageName.match('^_')) {
    // eslint-disable-next-line prefer-destructuring
    packageName = packageName.match(/^_(@?[^@]+)/)![1];
  }
  return packageName;
}

const webpackPlugin = (config: IWebpackChainConfig) => {
  config.module
    .rule('graphql')
    .test(/\.(graphql|gql)$/)
    .exclude.add(/node_modules/)
    .end()
    .use('graphql')
    .loader('graphql-tag/loader');

  config.module
    .rule('exclude')
    .exclude.add(/\.(graphql|gql)$/)
    .end();

  // config.module.rule('mjs-rule').test(/.m?js/).resolve.set('fullySpecified', false);
};

export default webpackPlugin;
