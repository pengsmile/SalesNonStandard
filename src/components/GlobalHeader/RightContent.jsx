// import { Tooltip, Tag } from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
// import React from 'react';
import { connect } from 'umi';
import Avatar from './AvatarDropdown';

// import SelectLang from '../SelectLang';
import styles from './index.less';

// const ENVTagColor = {
//   dev: 'orange',
//   test: 'green',
//   pre: '#87d068',
// };

const GlobalHeaderRight = ({ theme, layout }) => {
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
        <Avatar />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);

/**
 * 头像组件 及语言选择组件
 */
// <Avatar />
// {REACT_APP_ENV && (
//   <span>
//     <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
//   </span>
// )}
// <SelectLang className={styles.action} />


// {REACT_APP_ENV && (
//   <span>
//     <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
//   </span>
// )}