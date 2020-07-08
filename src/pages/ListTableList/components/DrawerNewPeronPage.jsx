import { useState,useRef } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select,Space, message, Divider, Descriptions  } from 'antd';
import { useBoolean, useMount, useUpdateEffect } from '@umijs/hooks'
import DrawerSelectHPHP from './DrawerSelectHPHP';
import { port } from '@/services/globalquery';
import { connect } from 'umi'
const { Option } = Select;
const { Search } = Input;
const DrawerForm = (props) => {
    const { userstate, close, global,dispatch, selectclinic, userInfo, reload } = props;
    const SubmitLoading = useBoolean(false);
    const [form] = Form.useForm();
    const { state, toggle, setTrue, setFalse } = useBoolean(false);
    const [userotherinfo, setuserotherinfo] = useState({
      LIMIT_AMT: '',
      SUM_ALLOW_AMT: '',
      SPEC_DISCOUNT: '',
      DISCOUNT: '',
      PAY_TYPE_DESC: '',
      SUM_PAID: ''
    });
    useUpdateEffect(()=> {
      
      const user = async () => {
        const hide = message.loading('查询中,请稍后');
        let respone = await port({
          SP_NAME: 'SP_VIP_VTP_SELECT',
          m: 'SELECT',
          DB_NAME: 'DENTAL_CUSTOMER',
          VIP_KY: userInfo.VIP_KY
        });
        
        if (respone.length) {
          let data = respone[0];
          form.setFieldsValue({
            HPHP_ID: data.HPHP_ID,
            HPHP_NAME: data.HPHP_NAME,
            VIP_NAME: data.VIP_NAME,
            VIP_CELL_PHONE: data.VIP_CELL_PHONE,
            VIP_CERT_ID_NUM: data.VIP_CERT_ID_NUM,
            NOTIFY_WW_USERID: data.NOTIFY_WW_USERID,
            VIP_COMMENT: data.VIP_COMMENT
          })
          setuserotherinfo({
            LIMIT_AMT: data.LIMIT_AMT,
            SUM_ALLOW_AMT: data.SUM_ALLOW_AMT,
            SPEC_DISCOUNT: `${parseFloat(data.SPEC_DISCOUNT) * 100}%`,
            DISCOUNT: `${parseFloat(data.DISCOUNT) * 100}%`,
            PAY_TYPE_DESC: data.PAY_TYPE_DESC,
            SUM_PAID: data.SUM_PAID
          })
        } else {
          message.error('客户信息查询失败，请重试...')
        }
        hide();
      }
      if (userInfo.VIP_KY) {
        user()
      }
      if (userInfo.status == 'NEW') {
        form.setFieldsValue({
          HPHP_ID: '',
          HPHP_NAME: '',
          VIP_NAME: '',
          VIP_CELL_PHONE: '',
          VIP_CERT_ID_NUM: '',
          NOTIFY_WW_USERID: '',
          VIP_COMMENT: ''
        })
        setuserotherinfo({
          LIMIT_AMT: '',
          SUM_ALLOW_AMT: '',
          SPEC_DISCOUNT: '',
          DISCOUNT: '',
          PAY_TYPE_DESC: '',
          SUM_PAID: ''
        })
        // form.resetFields({HPHP_ID: '',
        //   HPHP_NAME: '',
        //   VIP_NAME: '',
        //   VIP_CELL_PHONE: '',
        //   VIP_CERT_ID_NUM: '',
        //   NOTIFY_WW_USERID: '',
        //   VIP_COMMENT: ''})
        }
      
    }, [userInfo]);
    const SelectClinic = (item) => {
      // Inputele.current.input.state.value = item.HPHP_NAME;
      form.setFieldsValue({
        HPHP_ID: item.HPHP_ID,
        HPHP_NAME: item.HPHP_NAME
      })
    }
    
    const Inputele = useRef()
    const Submit = async () => {
        const hide = message.loading('提交中.....', 0);
        let SubmitParams = form.getFieldsValue();
        delete SubmitParams.HPHP_NAME

        if (!/^1[3|4|5|7|8][0-9]{9}$/.test(SubmitParams.VIP_CELL_PHONE)) {
            hide()
            return message.error('请填写正确的手机号')
        }
        SubmitLoading.setTrue();
        let submit = {
          SP_NAME: 'SP_VIP_UPDATE',
          DB_NAME : 'DENTAL_CUSTOMER',
          m: 'UPDATE',
          ...SubmitParams
        };
        userInfo.VIP_KY ? submit.VIP_KY = userInfo.VIP_KY : '';
        let respone = await port(submit);
        hide()
        SubmitLoading.setFalse();
        if (!respone.RETURN_CODE) {
          close();
          reload()
        }
        message.success(respone.RETURN_MESSAGE);
    }
    const defaultParam = {
      VIP_NAME: '',
      VIP_CELL_PHONE: '',
      VIP_CERT_ID_NUM: '',
      HPHP_ID: '',
      NOTIFY_WW_USERID: '',
      VIP_COMMENT: ''
    }
    
    return (
        <div>
          <Drawer
            title={userInfo.watch ? '查看客户信息' : userInfo.VIP_KY ? '修改客户信息' : '新增客户信息'}
            width={document.body.clientWidth < 1024 ? '80%' : '40%'}
            visible={userstate}
            bodyStyle={{ paddingBottom: 80 }}
            onClose={()=>{
                close()
            }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Space>
                  {userInfo.watch ? '' : 
                    <Button 
                    loading={SubmitLoading.state} onClick={Submit} type="primary">
                      提交
                    </Button>
                  }
                  
                  <Button onClick={()=>close()}>
                    关闭
                  </Button>
                </Space>
                
              </div>
            }
          >
            <Form layout="vertical" form={form} initialValues={defaultParam}  hideRequiredMark>
              <Row gutter={[8, 8]}>
                <Col sm={24} xs={24} md={12}>
                  <Form.Item
                    name="VIP_NAME"
                    label="姓名"
                    rules={[{ required: true, message: '请输入姓名' }]}
                  >
                    <Input readOnly={userInfo.watch ? true : false} value="" placeholder="请输入姓名" />
                  </Form.Item>
                  
                </Col>
                <Col sm={24} xs={24} md={12}>
                <Form.Item
                    name="VIP_CELL_PHONE"
                    label="手机号"
                    rules={[{ required: true, message: '请输入正确的手机号' }]}
                >
                    <Input readOnly={userInfo.watch ? true : false} placeholder="请输入手机号"/>
                </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col sm={24} xs={24} md={12}>
                  <Form.Item
                    name="VIP_CERT_ID_NUM"
                    label="证件号"
                    initialvalue=''
                    rules={[{ required: true, message: '请输入证件号' }]}
                  >
                    <Input readOnly={userInfo.watch ? true : false} placeholder="请输入证件号"/>
                  </Form.Item>
                </Col>
                <Col sm={24} xs={24} md={12}>
                  <Form.Item
                    name="HPHP_NAME"
                    label="诊所"
                    rules={[{ required: true, message: '请选择诊所' }]}
                  >
                    <Search
                      placeholder="请选择诊所"  
                      enterButton="选择"
                      readOnly
                      disabled={userInfo.watch ? true : false}
                      ref={Inputele}
                      onSearch={()=>{setTrue(),dispatch({
                        type: 'selectclinic/fetchClinicData',
                        payload: {
                          DB_NAME:'DENTAL_CONFIG',
                          SP_NAME:'SP_HOSPITAL_DETAIL_LIST',
                          m:'LIST',
                          HPHP_NAME: '',
                          rows: 20,
                          page: 1
                        }
                      })}}
                    />
                  </Form.Item>
                  <Form.Item
                  style={{display: 'none'}}
                    name="HPHP_ID"
                    label="诊所名称"
                  >
                    <Input hidden/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                
                <Col sm={24} xs={24} md={12}>
                  <Form.Item
                    name="NOTIFY_WW_USERID"
                    label="通知对象"
                    rules={[{ required: false, message: '请选择通知对象' }]}
                  >
                    <Select
                      showSearch
                      placeholder="请选择"
                      disabled={userInfo.watch ? true : false}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="">选择</Option>
                      {global.share.NoticesPeron && global.share.NoticesPeron.map((v, i)=><Option key={i} value={v.WW_USERID}>{v.MEME_NAME}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col sm={24} xs={24} md={24}>
                  <Form.Item
                    name="VIP_COMMENT"
                    label="备注"
                    initialvalue=''
                    rules={[
                      {
                        required: true,
                        message: '请输入备注',
                      },
                    ]}
                  >
                    <Input.TextArea readOnly={userInfo.watch ? true : false} rows={4} placeholder="请输入备注" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Divider />
            <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} title="">
              <Descriptions.Item label="超额优惠比例">{userotherinfo.DISCOUNT}</Descriptions.Item>
              <Descriptions.Item label="额度内优惠比例">{userotherinfo.SPEC_DISCOUNT}</Descriptions.Item>
              <Descriptions.Item label="结算方式">{userotherinfo.PAY_TYPE_DESC}</Descriptions.Item>
              <Descriptions.Item label="最大额度">{userotherinfo.LIMIT_AMT}</Descriptions.Item>
              <Descriptions.Item label="已用额度">{userotherinfo.SUM_ALLOW_AMT}</Descriptions.Item>
              <Descriptions.Item label="已付总计">{userotherinfo.SUM_PAID}</Descriptions.Item>
            </Descriptions>
          </Drawer>
          <DrawerSelectHPHP Openstate={state} SelectClinic={SelectClinic} close={setFalse} />
        </div>
      );
}

export default connect(({global,selectclinic})=>({
  global,
  selectclinic
}))(DrawerForm)


// <Col sm={24} xs={24} md={12}>
//   <Form.Item
//     name="PAY_TYPE"
//     label="支付方式"
//     rules={[{ required: true, message: '请选择支付方式' }]}
//   >
//     <Select placeholder="请选择支付方式">
//       <Option value="">请选择</Option>
//       {global.share.PayType.length != 0 && global.share.PayType.map((v, i)=><Option key={i} value={v.SYSV_VALUE}>{v.SYSV_NAME}</Option>)}
//     </Select>
//   </Form.Item>
// </Col>