// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  history: {
    type: 'hash'
  },
  antd: {},
  dva: {
    hmr: true, // model 热更新
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              component: '../layouts/BlankLayout',
              routes: [
                {
                  path: '/',
                  redirect: '/list',
                },
                // {
                //   path: '/welcome',
                //   name: '欢迎',
                //   icon: 'smile',
                //   component: './Welcome',
                // },
                {
                  name: 'VIP客户',
                  icon: 'table',
                  path: '/list',
                  component: './ListTableList',
                },
                {
                  name: 'VIP审核',
                  icon: 'AlignLeft',
                  path: '/vipAudit',
                  authority: 'audit',
                  component: './VipAudit'
                },
                {
                  name: 'vip审核详情',
                  path: '/vipAuditSts',
                  component: './VipAuditDetails',
                  hideInMenu: true
                },
                {
                  name: '方案信息',
                  icon: 'edit',
                  path: '/NewPlan',
                  component: './Plan',
                  hideInMenu: true
                },
                {
                  component: './404',
                }
              ]
            }
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  // manifest: {
  //   basePath: './',
  // },
  outputPath: './SalesNonStandard',
  base: '/',
  publicPath: '../Template/SalesNonStandard/',
  // copy: ['./src/pages/vip_startup.js'],
  chainWebpack(memo, { env, webpack, createCSSRule }){
      memo.watch = true
  }
});


// manifest: {
//   basePath: '/OANew/Template/SalesNonStandard/',
// },
// outputPath: './SalesNonStandard',
// base: '../',
// publicPath: '/OANew/Template/SalesNonStandard/',
