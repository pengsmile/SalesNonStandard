import { LogoutOutlined, SettingOutlined, userrOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import { port } from '@/services/globalquery';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  onMenuClick = async event => {
    const { key } = event;

    if (key === 'logout') {
      let a = document.createElement('a');
      a.href = '../vip/index';
      port({
        redirect_uri: a.href
      }, '../vip/force_refresh').then(respone => {
        if (!respone.RETURN_CODE) {
          location.href= respone.url;
        }
      })
      return;
    }
    // history.push(`/account/${key}`);
  };

  render() {
    const {
      user,
      menu
    } = this.props;

    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <userrOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return user.userInfo.length != 0 ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} src={require('@/assets/useheadphoto.png')} alt="avatar" />
            <span className={styles.name}>{user.userInfo[0].WW_USERID_DESC}</span>
          </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  user
}))(AvatarDropdown);


