import { Link } from 'umi';
import { Result, Button } from 'antd';
import React from 'react';
import { port } from '@/services/globalquery';
export default () => {
  const logout = () => {
      let a = document.createElement('a');
      a.href = '../vip/index';
      port({
        redirect_uri: a.href
      }, '../vip/force_refresh').then(respone => {
        if (!respone.RETURN_CODE) {
          location.href= respone.url;
        }
      })
  }
  return(
    <Result
      status="403"
      title="403"
      style={{
        background: 'none',
      }}
      subTitle="暂无访问权限,如有疑问,请咨询IT技术部"
      extra={
        <Link to="/">
          <Button onClick={logout} type="primary">重新登录</Button>
        </Link>
      }
    />
)};
