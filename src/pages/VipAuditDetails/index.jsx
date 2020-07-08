import {  CloseOutlined, CheckOutlined  } from '@ant-design/icons';
import { Button, Card, Col, Input,notification, Popover,message, Row,Radio,Empty,Popconfirm,Descriptions,Divider, Table,Space,Tag, Timeline } from 'antd';
import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { history, connect } from 'umi';
import { port } from '@/services/globalquery';
import { useBoolean, useMount, useUnmount } from '@umijs/hooks';

import FooterToolbar from './components/FooterToolbar';
import styles from './style.less';
const { TextArea } = Input;

const Info = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);
const VipAuditDetails = ({ dispatch }) => {
  // const [form] = Form.useForm();
  const { location } = history;
  const { VPVT_KY, watch } = location.query;
  // const [error, setError] = useState([]);
  const [userStatus, setuserStatus] = useState(watch ? 'WATCH' : 'AUDIT');
  const [submitLoading, setsubmitLoading] = useState(false);
  const [userInfo, setuseInfo] = useState({
    VIP_NAME: '',
    VIP_CERT_ID_NUM: '',
    VIP_CELL_PHONE: '',
    PAY_TYPE_DESC: '',
    LIMIT_AMT: '',   // 最大额度
    SPEC_DISCOUNT: '',  // 优惠比例
    SUM_ALLOW_AMT: '', // 已用额度
    SUM_PAID: '', // 客户总付
    VPVT_CHG: '', // 总计
    VPVT_CALC_AMT: '', // 优惠
    VPVT_ALLOW_AMT: '', // 应收
    VPVT_FINAL_PAID: '', // 客户付款
    VPVT_COMMENT: '', // 备注
    DCDC_NAME: ''

  });
  const [auditInfo, setauditInfo] = useState({})
  let textarea = {};
  const [usertable, setusertable] = useState([]);
  const [passState, setpassState] = useState('NEXT');
  useMount(()=>{

      const fetchUserInfo = async () => {
          setsubmitLoading(true);
          const hide = message.loading('加载中', 0);
          let respone = await port({
              SP_NAME: 'SP_VIP_VISIT_SELECT',
              m: 'DULPEX',
              VPVT_KY,
              DB_NAME: 'DENTAL_CUSTOMER'
          });

          let resaudit = await port({
            SP_NAME: 'SP_VIP_VISIT_AUDIT_INFO_SELECT',
            DB_NAME: 'DENTAL_CUSTOMER',
            m: 'SELECT',
            VPVT_KY
          });
          setauditInfo(resaudit[0])

          const {VIP_NAME, VIP_CERT_ID_NUM,SUM_PAID,DCDC_NAME,VPVT_COMMENT,VPVT_CHG,VPVT_CALC_AMT,VPVT_ALLOW_AMT,VPVT_FINAL_PAID, VIP_CELL_PHONE,PAY_TYPE_DESC,LIMIT_AMT,SPEC_DISCOUNT,SUM_ALLOW_AMT} = respone.datatable[0];
          setuseInfo({
            VIP_NAME,
            VIP_CERT_ID_NUM,
            VIP_CELL_PHONE,
            PAY_TYPE_DESC,
            LIMIT_AMT,
            SPEC_DISCOUNT,
            SUM_ALLOW_AMT,
            SUM_PAID,
            VPVT_CHG,
            VPVT_CALC_AMT,
            VPVT_ALLOW_AMT,
            VPVT_FINAL_PAID,
            VPVT_COMMENT,
            DCDC_NAME
          });
          setusertable(respone.datatable2);
          setsubmitLoading(false)
          hide();
      }
      fetchUserInfo()
  })

  const ChangePassState = (val) => {
    setpassState(val.target.value);
  }
  const columns = [
    {
      title: '治疗项目',
      dataIndex: 'SPSP_NAME',
      key: 'SPSP_NAME'
    },
    {
      title: '数量',
      dataIndex: 'SPSP_UNIT',
      key: 'SPSP_UNIT',
    },
    {
      title: '单价',
      dataIndex: 'SPSP_AMT',
      key: 'SPSP_AMT',
      render(text, record, index){
        return (
            <span>￥{parseFloat(record.SPSP_AMT).toFixed(2)}</span>
        )
      }
    }
  ];

  const UserSubmit = async () => {
    message.loading('提交中.....');
    setsubmitLoading(true)
    let respone = await port({
      SP_NAME: 'SP_VIP_VISIT_AUDIT_INFO_INVOKE',
      DB_NAME: 'DENTAL_CUSTOMER',
      m: 'INVOKE',
      VPVT_KY: VPVT_KY,
      ACTION: passState,
      AUDIT_COMMENT: textarea.current.state.value
    });
    setsubmitLoading(false);
    if (!respone.RETURN_CODE) {
      notification.success({
        message: respone.RETURN_MESSAGE,
        description: '即将返回首页',
        duration: 2.5
      });
      setTimeout(()=>{
        history.goBack();
      }, 2500);
      
    } else {
      notification.error({
        message: respone.RETURN_MESSAGE,
        description: '',
        duration: 2.5
      });
    }
  }
  return (
    <>
      <PageHeaderWrapper></PageHeaderWrapper>
      <Card className={styles.card} >
        <Descriptions
          title="客户信息"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          style={{
            marginBottom: 10,
          }}
        >
          <Descriptions.Item label="客户姓名">{userInfo.VIP_NAME}</Descriptions.Item>
          <Descriptions.Item label="证件号">{userInfo.VIP_CERT_ID_NUM}</Descriptions.Item>
          <Descriptions.Item label="手机号">{userInfo.VIP_CELL_PHONE}</Descriptions.Item>
          <Descriptions.Item label="优惠比例">{ parseFloat(userInfo.SPEC_DISCOUNT) * 100  }%</Descriptions.Item>
          <Descriptions.Item label="最大额度 / 已用额度">￥{userInfo.LIMIT_AMT} / ￥{userInfo.SUM_ALLOW_AMT}</Descriptions.Item>
          <Descriptions.Item label="客户总付">￥{userInfo.SUM_PAID}</Descriptions.Item>
          <Descriptions.Item label="结算方式">{userInfo.PAY_TYPE_DESC}</Descriptions.Item>
        </Descriptions>
        <Divider
          style={{
            marginBottom: 10,
          }}
        />
        <div className={styles.title}>客户详情</div>
        <div>
            <Row>
              <Col sm={24} xs={24} md={6} lg={6} xl={6}>
                <Info title="总计" value={`￥${userInfo.VPVT_CHG}`} bordered />
              </Col>
              <Col sm={24} xs={24} md={6} lg={6} xl={6}>
                <Info title="优惠" value={`￥${userInfo.VPVT_CALC_AMT}`} bordered />
              </Col>
              <Col sm={24} xs={24} md={6} lg={6} xl={6}>
                <Info title="应收" value={`￥${userInfo.VPVT_ALLOW_AMT}`} bordered />
              </Col>
              <Col sm={24} xs={24} md={6} lg={6} xl={6}>
                <Info title="客户付款" value={`￥${userInfo.VPVT_FINAL_PAID}`} />
              </Col>
            </Row>
        </div>
        <Table
            pagination={false}
            columns={columns}
            bordered
            dataSource={usertable}
        />
        <Divider
              style={{
                marginBottom: 10,
              }}
            />
        <Descriptions
          title="其他信息"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          style={{
            marginBottom: 10,
          }}
        >
          <Descriptions.Item label="医生姓名">{userInfo.DCDC_NAME}</Descriptions.Item>
          <Descriptions.Item label="就诊备注">{userInfo.VPVT_COMMENT}</Descriptions.Item>
        </Descriptions>
        
        <Divider
          style={{
            marginBottom: 10,
          }}
        />
        <div className={styles.title}>审核意见</div>
        { userStatus == 'WATCH' ? <TextArea readOnly={true} style={{resize: "none"}} value={ auditInfo.AUDIT_COMMENT} rows={3} placeholder="审核说明" />
       : <TextArea  ref={textarea} rows={3} placeholder="审核说明" /> }
        <div className={styles.affix}>
          {userStatus == 'WATCH' ? <Tag className={styles.tag} color="error">{auditInfo.VPVT_AUDIT_STS_DESC}</Tag> : ''}
          
        </div>
      </Card>
      <FooterToolbar extra={userStatus == 'AUDIT' ? <Radio.Group onChange={ChangePassState} defaultValue="NEXT" buttonStyle="solid">
      <Radio value="NEXT"> 通过</Radio>
      <Radio value="REJECT"> 驳回</Radio>
    </Radio.Group> : ''}>
        {userStatus == 'AUDIT' ? <Popconfirm title="你确定要提交吗？" onConfirm={UserSubmit}>
          <Button type="primary" loading={submitLoading}>
            提交
          </Button>
        </Popconfirm> : ''}
        
        <Button onClick={()=>{
          history.goBack();
        }}>
          返回
        </Button>
      </FooterToolbar>
      
    </>
  );
};

export default connect(() => ({
  
}))(VipAuditDetails);


// 审核历史部分
// <div className={styles.title}>审核历史</div>
//   <Timeline mode='left'>
//     <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
//     <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
//     <Timeline.Item>Technical testing</Timeline.Item>
//     <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
//   </Timeline>
//   <Divider
//     style={{
//       marginBottom: 10,
//     }}
//   />


// {userStatus == 'AUDIT' ? <>
//             <Divider
//                   style={{
//                     marginBottom: 10,
//                   }}
//                 />
            
//             <div className={styles.title}>备注</div>
//             <TextArea readOnly rows={3} value={userInfo.VPVT_COMMENT} placeholder="就诊备注" />
//         </> : ''}


// <div className={styles.title}>其他信息</div>
//         <Alert
//             message="医生姓名"
//             description={userInfo.DCDC_NAME}
//             type="success"
//           />
        
//         <div className={styles.title}>备注</div>
//         <TextArea readOnly rows={2} value={userInfo.VPVT_COMMENT} placeholder="就诊备注" />