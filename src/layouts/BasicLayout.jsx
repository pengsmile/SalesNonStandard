/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Link, useIntl, connect } from 'umi';
// import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils';
import logo from '../assets/logo.svg';
// import styles from './BasicLayout.less';
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="对不起，您没有访问本页的权限。"
    extra={
      <Button type="primary">
        <Link to="/user/login">去登录</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList => {
  
  return menuList[0].routes.map(item => {
    const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };

    return Authorized.check(item.authority, localItem, null);
  })
}

  const defaultFooterDom = (
    <DefaultFooter
      copyright="2020 保服通IT技术部出品"
      links={[
        {
          key: '',
          // title: <TwitterOutlined />,
          blankTarget: true,
        }
      ]}
    />
  );

const BasicLayout = props => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    }
  } = props;
  useEffect(()=>{
      // 支付方式
    dispatch({
      type: 'global/fetchPayType',
      payload: {
        DB_NAME: 'DENTAL_CONFIG',
        SP_NAME:  'SP_VARIABLE_SELECT',
        SYSV_TYPE: 'VIP_PAY_TYPE',
        m: 'SELECT',
      }
    })
  },[])
  const handleMenuCollapse = payload => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority
  const menuclick = () => {
    if (window.innerWidth <= 1024) {
      if (dispatch) {
        dispatch({
          type: 'global/changeLayoutCollapsed',
          payload: true
        });
      }
    }
  }
  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  
  const { formatMessage } = useIntl();
  return (
    <>
        <ProLayout
        className='RootContainer'
        logo={logo}
        formatMessage={formatMessage}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link onClick={menuclick} to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        
        menuDataRender={menuDataRender}
        rightContentRender={() => (<RightContent />)}
        footerRender={() => defaultFooterDom}
        {...props}
        {...settings}
      >
        
        {children}
      </ProLayout>
    </>
  );
};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  settings,
  user
}))(BasicLayout);

// rightContentRender={ () => <RightContent/> }  
// menuDataRender={() => {
//   return user.data
// }}

// <Authorized authority={authorized.authority} noMatch={noMatch}>
// </Authorized>