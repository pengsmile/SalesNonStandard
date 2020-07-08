import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.
// import RenderAuthorize from '@/components/Authorized';
export function getAuthority(str) {
  // const authorityString =
  //   typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str; // authorityString could be admin, "admin", ["admin"]
  const authorityString = str;

  let authority;

  try {
    if (authorityString) {
      authority = authorityString;
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  } // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

  if (!authority) {
    return ['admin'];
  }

  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;

  // localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // auto reload
  reloadAuthorized(proAuthority);
}
