export default {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'topmenu',
  contentWidth: 'Fluid',
  fixedHeader: true,
  autoHideHeader: false,
  fixSiderbar: true,
  colorWeak: true,
  menu: {
    locale: false,
  },
  title: 'VIP客户',
  pwa: false,
  iconfontUrl: '',
  PostUrl: process.env.NODE_ENV == 'production' ? '../VIP/post' : '/post'
};