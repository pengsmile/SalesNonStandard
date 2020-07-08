// import { useEffect, useState } from 'react';
// import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect } from 'umi';
import NoAccess from './NoAccess'
// import { port } from '@/services/globalquery';
import { setAuthority } from '@/utils/authority';
import { useMount, useUpdateEffect, useBoolean } from '@umijs/hooks';
import { message } from 'antd'
// import { stringify } from 'querystring';

const SecurityLayout = (props) => {
  const { dispatch, user, children, userStatus } = props;
  const { state, setFalse } = useBoolean(true);
  useMount(()=>{
    // 用户信息
    dispatch({
      type: 'user/fetchCurrent',
      payload: {
          SP_NAME:'SP_VIP_USUS_VERIFY',
          m:'SELECT',
          DB_NAME:'DENTAL_CUSTOMER'
      }
    });
    // 验证是否有审核权限
    dispatch({
      type: 'user/fetchvipAudit',
      payload: {
        SP_NAME: 'SP_VIP_AUDIT_AUTH_VERIFY',
        m: 'INVOKE',
        DB_NAME:'DENTAL_CUSTOMER'
      }
    })

  })
  useUpdateEffect(()=>{
    
    if (!user.length) {
      message.error('该用户暂无权限访问');
      setFalse()
    } else {
      message.success('登录成功')
    }
    // setAuthority(userStatus)
  },[user])
  useUpdateEffect(()=>{
    setAuthority(userStatus)
  },[userStatus])
  return (
      <>
      {user.length && userStatus ? children : state ? '' : <NoAccess />}
      </>
  )

}

export default connect(({ user }) => ({
  user: user.userInfo,
  userStatus: user.userStatus
}))(SecurityLayout);
// {user.length ? children : state ? '' : <NoAccess />}