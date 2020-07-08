import { CheckOutlined, CloseOutlined,ClockCircleOutlined  } from '@ant-design/icons';
import {
  Badge,
  Card,
  Descriptions,
  Divider,
  Form,
  Table,
  Button,
  Popconfirm,
  message,
  Input,
  InputNumber,
  Spin,
  Timeline,
  Select,
  DatePicker,
  Empty,
  Col,
  Row,
  Radio
} from 'antd';
import { useContext, useState, useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { port } from '@/services/globalquery';
import { useBoolean, useMount, useUnmount } from '@umijs/hooks';
import { history, connect } from 'umi';
import DrwaerSelect from '../ListTableList/components/DrawerSelectHPHP';
import FooterToolbar from './components/FooterToolbar';
import './style.css';
import moment from 'moment';
const EditableContext = React.createContext();
const { Option } = Select;
const { TextArea } = Input;
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  STATUS,
  handleSave,
  type,
  ...restProps
}) => {

  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    if (STATUS == 'AUDIT' || STATUS == 'WATCH') {
        return
    }
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  
  const save = async (e) => {
    const values = await form.validateFields();
    if (values.hasOwnProperty('SPSP_AMT')) {
        values.SPSP_AMT = Number(values.SPSP_AMT).toFixed(2);
    }
    toggleEdit();
    handleSave({ ...record, ...values });
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `请填写${title}`,
          },
        ]}
      >
        <InputNumber ref={inputRef} min={1} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {dataIndex == 'SPSP_AMT' ? '￥ ' : ''}
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
const log = param => {
    console.log(param)
}
function Basic({ dispatch, profileAndbasic, Userloading, selectclinic, user, global }) {
  const { state, toggle, setTrue, setFalse } = useBoolean(false);
  const [form] = Form.useForm();
  const { location } = history;
  const loading = useBoolean(false);
  const [userInfo, setuseInfo] = useState({
    VIP_NAME: '',
    VIP_CERT_ID_NUM: '',
    VIP_CELL_PHONE: '',
    VIP_COMMENT: '',
    NOTIFY_WW_USERID_DESC: '',
    LIMIT_AMT: '',
    PAY_TYPE_DESC: '',
    SPEC_DISCOUNT: '',
    DISCOUNT: '',
    HPPN_NAME: '',
    HPHP_NAME: '',
  });
  const [passState, setpassState] = useState('AUDIT');
  let textarea = {};
  const AUDIT_STATUS = user.userInfo[0].AUDIT_STATUS;
  // const AUDIT_STATUS = '01';
  const { VPTP_KY, VIP_KY, watch } = location.query;
  const [usestatus, setusestatus] = useState(AUDIT_STATUS == '01' ? (watch ? 'WATCH' : 'EDIT') : watch ? 'WATCH' : 'AUDIT');
  const [submitLoading, setsubmitLoading] = useState(false);
  const [auditHistory, setauditHistory] = useState([]);
  const [dataSource, setdataSource] = useState([]);
  const [defsultPayType, setDefaultPayType] = useState({
    SCHEDULE_DT: '',
    AUDIT_DISCOUNT: '',
     AUDIT_SPEC_DISCOUNT: '',
    AUDIT_LIMIT_AMT: '',
    AUDIT_PAY_TYPE : 'SELF_PAY',
    COMMENT : ''
  })
  const [totalPrice, settotalPrice] = useState({
    SPSP_TOTAL: '',
    SPSP_DISCOUNT: '',
    SPSP_SPEC_DISCOUNT: ''
  })
  let columns = [
    {
      title: '处置名称',
      dataIndex: 'SPSP_NAME',
      render(text, record, index){
          return (
              <span>{record.SPSP_NAME}</span>
          )
      }
    },
    {
      title: '数量',
      dataIndex: 'SPSP_UNIT',
      valueType: 'digit',
      editable: true,
      type: 'number',
      align: 'center',
      width: '160px'
    },
    {
      title: '单价',
      dataIndex: 'SPSP_AMT',
      editable: true,
      width: '160px'
    },{
      title: '总价',
      dataIndex: 'SPSP_TOTAL',
      width: '160px',
      render(text, record, index){
        return (
            <span>￥{record.SPSP_TOTAL}</span>
        )
      }
    },{
      title: '额度内优惠',
      dataIndex: 'SPSP_SPEC_DISCOUNT',
      width: '160px',
      render(text, record, index){
        return (
            <span style={{fontWeight: 'bold'}}>￥{record.SPSP_SPEC_DISCOUNT}</span>
        )
      }
    },{
      title: '超额优惠',
      dataIndex: 'SPSP_DISCOUNT',
      width: '160px',
      render(text, record, index){
        return (
            <span style={{fontWeight: 'bold'}}>￥{record.SPSP_DISCOUNT}</span>
        )
      }
    }
  ];
  let options = [{
    title: '操作',
    dataIndex: 'options',
    width: '250px',
    render: (text, record) =>
      dataSource.length >= 1 ? (
        <Popconfirm title="你确定要删除吗?" onConfirm={() => handleDelete(record.SPSP_KY)}>
          <Button danger>删除</Button>
        </Popconfirm>
      ) : null,
  }];
  const userfill = (param) => {
      const {VIP_NAME, VIP_CERT_ID_NUM, VIP_CELL_PHONE, VIP_COMMENT, NOTIFY_WW_USERID_DESC, LIMIT_AMT
        ,PAY_TYPE_DESC, SPEC_DISCOUNT, DISCOUNT, HPPN_NAME, HPHP_NAME,HPHP_ID
      } = param;
      dispatch({
        type: 'selectclinic/ChangePlan',
        payload: {
          switchPlan: true,
          HPHP_ID: HPHP_ID
        }
      });
      dispatch({
        type: 'selectclinic/fetchClinicData',
        payload: {
          DB_NAME: 'DENTAL_CUSTOMER',
          SP_NAME: 'SP_VIP_SVCPROC_LIST',
          m: 'LIST',
          SPPN_NAME: '',
          rows: 20,
          page: 1,
          HPHP_ID: HPHP_ID
        },
      });
      setuseInfo({
        VIP_NAME,
        VIP_CERT_ID_NUM,
        VIP_CELL_PHONE,
        VIP_COMMENT,
        NOTIFY_WW_USERID_DESC,
        LIMIT_AMT,
        PAY_TYPE_DESC,
        SPEC_DISCOUNT: `${Number(SPEC_DISCOUNT) * 100}%`,
        DISCOUNT: `${Number(DISCOUNT) * 100}%`,
        HPPN_NAME,
        HPHP_NAME,
      });
  }
  // 千分位
  const toThousands = (num) => {
    return parseFloat(num).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,");
  }
  /**
   * 算单条各种价格
   * @param 
   */
  const RowPrice = (item, row) => {
    let formdata = form.getFieldsValue();
    //  超额优惠比例
    let SPSP_DISCOUNT = parseFloat(formdata.AUDIT_DISCOUNT) > 1 ? (parseFloat(formdata.AUDIT_DISCOUNT) / 100).toFixed(2) : parseFloat(formdata.AUDIT_DISCOUNT);
    // 额度内优惠比例
    let SPSP_SPEC_DISCOUNT = parseFloat(formdata.AUDIT_SPEC_DISCOUNT) > 1 ? (parseFloat(formdata.AUDIT_SPEC_DISCOUNT) / 100).toFixed(2) : parseFloat(formdata.AUDIT_SPEC_DISCOUNT);
    let total = parseFloat(item.SPSP_UNIT) * parseFloat(row.SPSP_AMT); // 总价
    return Object.assign(row, {
        SPSP_TOTAL: Number(total).toFixed(2),
        SPSP_SPEC_DISCOUNT: Number(total * SPSP_SPEC_DISCOUNT).toFixed(2),
        SPSP_DISCOUNT: Number(total * SPSP_DISCOUNT).toFixed(2)
    })
  }
  /**
   * 算总价 以及优惠价
   */
  const TotalPrice = (detailData) => {
      let total = {
        SPSP_TOTAL: 0,
        SPSP_DISCOUNT: 0,
        SPSP_SPEC_DISCOUNT: 0
      }
      detailData.map(v => {

          total.SPSP_TOTAL += parseFloat(v.SPSP_TOTAL)
          total.SPSP_DISCOUNT += parseFloat(v.SPSP_DISCOUNT)
          total.SPSP_SPEC_DISCOUNT += parseFloat(v.SPSP_SPEC_DISCOUNT)
      });
      total.SPSP_TOTAL = parseFloat(total.SPSP_TOTAL).toFixed(2)
      total.SPSP_DISCOUNT = parseFloat(total.SPSP_DISCOUNT).toFixed(2)
      total.SPSP_SPEC_DISCOUNT = parseFloat(total.SPSP_SPEC_DISCOUNT).toFixed(2)
      settotalPrice(total)
  }
  /**
   * 组件初始化加载
   */
  useMount(()=> {
    const request = async () => {
        loading.setTrue()
        let respone = await port({
          SP_NAME: 'SP_VIP_VTP_SELECT',
          m: 'SELECT',
          DB_NAME: 'DENTAL_CUSTOMER',
          VIP_KY: VIP_KY ? VIP_KY : ''
        });
        if (respone.length) {
          userfill(respone[0])
        } else {
          message.error('客户信息查询失败，请重试...')
        }
        loading.setFalse()
    }
    const requestDetail = async () => {
        loading.setTrue()
        let respone = await port({
          SP_NAME: 'SP_VIP_VTP_SELECT',
          m: 'multi_result',
          DB_NAME: 'DENTAL_CUSTOMER',
          VPTP_KY: VPTP_KY ? VPTP_KY : ''
        });
        userfill(respone.vip);
        const {
          SCHEDULE_DT,
          AUDIT_DISCOUNT,
          AUDIT_SPEC_DISCOUNT,
          AUDIT_LIMIT_AMT,
          AUDIT_PAY_TYPE,
          COMMENT
        } = respone.treatment_plan;
        form.setFieldsValue({
          SCHEDULE_DT: SCHEDULE_DT ? moment(SCHEDULE_DT) : '',
          AUDIT_DISCOUNT: Number(AUDIT_DISCOUNT) * 100,
          AUDIT_SPEC_DISCOUNT: Number(AUDIT_SPEC_DISCOUNT) * 100,
          AUDIT_LIMIT_AMT,
          AUDIT_PAY_TYPE,
          COMMENT
        })
        let datatablesource = respone.treatment_plan_detail;
        let detailData = datatablesource.map(v=>{
          return RowPrice(v, {
              SPSP_KY: v.SPSP_KY,
              SPSP_NAME: v.SPSP_NAME,
              SPSP_AMT: v.SPSP_AMT,
              SPSP_UNIT: v.SPSP_UNIT
          })
        })
        TotalPrice(detailData)
        setdataSource(detailData);
        setauditHistory(respone.audit_history)
        loading.setFalse()
    }
    if (VPTP_KY) {
      requestDetail()
    } else {
      request();
    }
  });
  /**
   * 选择诊所
   * @param {item} item 诊所信息
   */
  const SelectClinic = (item) => {
    let formdata = form.getFieldsValue();
    if (!formdata.AUDIT_DISCOUNT) {
        message.error('请输入超额优惠比例')
        return
    }
    if (!formdata.AUDIT_SPEC_DISCOUNT) {
        message.error('请输入额度内优惠比例')
        return
    }
    let found = dataSource.find((v) => v.SPSP_KY == item.SPSP_KY);

    if (found) {
        message.error('该处置已存在');
        return
    }
    const newData = {
      SPSP_KY: item.SPSP_KY,
      SPSP_NAME: item.SPSP_NAME,
      SPSP_AMT: item.MAX_AMT,
      SPSP_UNIT: 1
    };
    let data = [...dataSource, RowPrice(newData, newData)];
    TotalPrice(data);
    setdataSource(data);
    message.success('添加成功');
  };
  /**
   * 删除方案明细
   * @param {key} 唯一key 
   */
  const handleDelete = (key) => {
    let data = dataSource.filter(v=>{
      if (v.SPSP_KY !== key) {
        return RowPrice(v, v)
      }
    });
    TotalPrice(data);
    setdataSource(data);
  };
  /**
   * 新增明细
   */
  const handleAdd = () => {
    if (Userloading) {
        message.info('明细暂未加载完毕，请稍等片刻');
        return
    }
    setTrue();
  };
  /**
   * 方案修改保存
   * @param {row} row 每行数据
   */
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => {
      return row.SPSP_KY === item.SPSP_KY
    });
    const item = newData[index];
    newData.splice(index, 1, RowPrice(row, { ...item, ...row }));
    TotalPrice(newData)
    setdataSource(newData);
  };
  /**
   * 卸载组件
   */
  useUnmount(() => {
    dispatch({
      type: 'selectclinic/cleanStatus',
    });
    dispatch({
      type: 'selectclinic/ChangePlan',
      payload: {
          switchPlan: false,
          HPHP_ID: ''
      }
    })
  });
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  /**
   * 
   * @param {val} val 是否通过 val
   */
  const ChangePassState = (val) => {
      setpassState(val.target.value);
  }
  const columnOptions = () => {
      let column = usestatus == 'EDIT' ? columns.concat(options) : columns;
      return column.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            STATUS: usestatus,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: handleSave,
            type: col.type
          }),
        };
      })
  }
  /**
   * 提交
   */
  const UserSubmit = async () => {
    message.loading('提交中.....');
    let SubmitParams = {},
    Params = {};
    if (usestatus == 'EDIT') {
      SubmitParams = form.getFieldsValue();
      parseFloat(SubmitParams.AUDIT_DISCOUNT) > 1 ? SubmitParams.AUDIT_DISCOUNT = (parseFloat(SubmitParams.AUDIT_DISCOUNT) / 100).toFixed(2) : ''
      parseFloat(SubmitParams.AUDIT_SPEC_DISCOUNT) > 1 ? SubmitParams.AUDIT_SPEC_DISCOUNT = (parseFloat(SubmitParams.AUDIT_SPEC_DISCOUNT) / 100).toFixed(2) : ''
      Params = {
        SP_NAME: 'SP_VIP_TREATMENT_XML_UPDATE',
        VIP_KY: location.query.VIP_KY,
        m: 'UPDATE',
        DB_NAME: 'DENTAL_CUSTOMER',
        DETAIL_XML: JSON.stringify(dataSource),
        PLAN_XML: JSON.stringify([SubmitParams])
      }
      if (VPTP_KY) {
        Params.VPTP_KY = VPTP_KY
      }
    } else {
      Params = {
          SP_NAME : 'SP_VIP_TREATMENT_AUDITING',
          m: 'UPDATE',
          DB_NAME: 'DENTAL_CUSTOMER',
          AUDIT_ACTION: passState,
          VPTP_KY: VPTP_KY,
          REASON: textarea.current.state.value
      }
    }
    setsubmitLoading(true);
    let respone = await port(Params);
    setsubmitLoading(false);
    if (!respone.RETURN_CODE) {
      message.success(respone.RETURN_MESSAGE);
      message.info('即将返回首页',2, ()=>{
        history.goBack();
      })
      
    } else {
      message.error(respone.RETURN_MESSAGE)
    }
    // if (usestatus == 'AUDIT') {
    //     history.goBack();
    // }
  }
  /**
   * 监听 优惠比例 输入框，计算价格
   * @param {}  
   */
  const discountsTotal = (val) => {
      let value = val.target.value.replace('%', '');
      if (!value) {
          message.error('请输入优惠比例');
          return
      }
      let data = dataSource.map(v=>{
        return RowPrice(v, v)
      });
      TotalPrice(data);
      setdataSource(data);
  }
  const discountParser = (val) => {
    val = val.replace('%', '');
    let value = val.toString().split(".");
    if (value.length > 1) {
        if (val && parseFloat(val) >= 1) {
            return parseFloat(val).toFixed(0)
        }
        if (val && parseFloat(val) > 0 && parseFloat(val) < 1) {
            return parseFloat(val).toFixed(2)
        } else {
          return val
        }
    } else {
        if (val) {
          return parseFloat(val).toFixed(0)
        }
    }
  }
  return (
    <>
      <PageHeaderWrapper title={usestatus == 'EDIT' ? '编辑方案' : usestatus == 'WATCH' ? '查看方案' : '审核方案' }></PageHeaderWrapper>
      <Spin spinning={loading.state}>
      <Card size="small">
        <Descriptions
          title="客户信息"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          style={{
            marginBottom: 10,
          }}
        >
        
          <Descriptions.Item label="客户信息">{userInfo.VIP_NAME}</Descriptions.Item>
          <Descriptions.Item label="通知对象">{userInfo.NOTIFY_WW_USERID_DESC}</Descriptions.Item>
          <Descriptions.Item label="手机号">{userInfo.VIP_CELL_PHONE}</Descriptions.Item>
          <Descriptions.Item label="证件号">{userInfo.VIP_CERT_ID_NUM}</Descriptions.Item>
          <Descriptions.Item label="优惠额度">{userInfo.LIMIT_AMT}</Descriptions.Item>
          <Descriptions.Item label="结算方式">{userInfo.PAY_TYPE_DESC}</Descriptions.Item>
          <Descriptions.Item label="额度内优惠比例">{userInfo.SPEC_DISCOUNT}</Descriptions.Item>
          <Descriptions.Item label="额度外优惠比例">{userInfo.DISCOUNT}</Descriptions.Item>
          <Descriptions.Item label="诊所名称">{`[${userInfo.HPPN_NAME}]-${userInfo.HPHP_NAME}`}</Descriptions.Item>
        </Descriptions>
        <Divider
          style={{
            marginBottom: 10,
          }}
        />
        <div className="title">基本信息</div>
        <Form layout="vertical" form={form} initialValues={defsultPayType}>
          <Row gutter={[8, 8]}>
            <Col sm={24} xs={24} md={12} lg={8} xl={6}>
              <Form.Item
                name="SCHEDULE_DT"
                label="预约日期"
                rules={[{ required: true, message: '选择日期' }]}
              >
                <DatePicker disabled={usestatus ==  'EDIT' ? false : true} style={{width: '100%'}} placeholder="选择日期" />
              </Form.Item>
              
            </Col>
            <Col sm={24} xs={24} md={12} lg={8} xl={6}>
              <Form.Item
                  name="AUDIT_DISCOUNT"
                  label="超额优惠比例"
                  rules={[{ required: true, message: '请输入超额优惠比例' }]}
              >
                  <InputNumber formatter={value => `${value}%`} suffix={'%'} parser={discountParser} onBlur={discountsTotal}  readOnly={usestatus == 'EDIT' ? false : true}  style={{width: '100%'}} min={1} max={100} placeholder="超额优惠比例"/>
              </Form.Item>
            </Col>
            <Col sm={24} xs={24} md={12} lg={8} xl={6}>
              <Form.Item
                name="AUDIT_SPEC_DISCOUNT"
                label="额度内优惠比例"
                initialvalue=''
                rules={[{ required: true, message: '请输入额度内优惠比例' }]}
              >
                <InputNumber formatter={value => `${value}%`} suffix={'%'} parser={discountParser} onBlur={discountsTotal}  readOnly={usestatus == 'EDIT' ? false : true} style={{width: '100%'}} min={1} max={100} placeholder="额度内优惠比例"/>
              </Form.Item>
            </Col>
            <Col sm={24} xs={24} md={12} lg={8} xl={6}>
              <Form.Item
                name="AUDIT_LIMIT_AMT"
                label="优惠额度"
                initialvalue=''
                rules={[{ required: true, message: '请输入优惠额度' }]}
              >
                <InputNumber suffix="￥" readOnly={usestatus == 'EDIT' ? false : true} style={{width: '100%'}} min={1} placeholder="优惠额度"/>
              </Form.Item>
            </Col>
            <Col sm={24} xs={24} md={12} lg={8} xl={6}>
              <Form.Item
                name="AUDIT_PAY_TYPE"
                label="结算方式"
                rules={[{ required: true, message: '请选择结算方式' }]}
              >
                <Select
                  showSearch
                  placeholder="请选择"
                  disabled={usestatus == 'EDIT' ? false : true}
                >
                  {global.share.PayType && global.share.PayType.map((v, i)=><Option key={i} value={v.SYSV_VALUE}>{v.SYSV_NAME}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={24} xs={24} md={12} lg={8} xl={6}>
              <Form.Item
                name="COMMENT"
                label="备注"
              >
                <Input readOnly={usestatus == 'EDIT' ? false : true} placeholder="请输入备注" />
              </Form.Item>
            </Col>
            <Col sm={24} xs={24} md={12} lg={8} xl={6}>
                <Form.Item
                  label="总价"
                >
                  <Input readOnly={true} style={{width: '100%', fontWeight: 'bold', background: '#f9f9f9'}} value={'￥' + totalPrice.SPSP_TOTAL}/>
                </Form.Item>
            </Col>
            <Col sm={24} xs={24} md={12} lg={8} xl={6}>
                <Form.Item
                  label="额度内优惠"
                >
                  <Input readOnly={true} style={{width: '100%', fontWeight: 'bold', background: '#f9f9f9'}} value={'￥' + totalPrice.SPSP_SPEC_DISCOUNT}/>
                </Form.Item>
            </Col>
            <Col sm={24} xs={24} md={12} lg={8} xl={6}>
                <Form.Item
                  label="超额优惠"
                >
                  <Input readOnly={true} style={{width: '100%', fontWeight: 'bold', background: '#f9f9f9'}} value={'￥' + totalPrice.SPSP_DISCOUNT}/>
                </Form.Item>
            </Col>
            
          </Row>
        </Form>
        <Divider
          style={{
            marginBottom: 10,
          }}
        />
        <div className="title">方案明细</div>
        <div>
          
          {usestatus == 'EDIT' ? <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          新增明细
        </Button> : ''}
          <Table
            components={components}
            pagination={false}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columnOptions()}
          />
        </div>

        <div style={{ textAlign: 'left' }}>
          {usestatus == 'EDIT' ? <Button
            onClick={handleAdd}
            type="primary"
            style={{
              marginTop: 16,
            }}
          >
            新增明细
          </Button> : ''}
        </div>
        {usestatus == 'AUDIT' || usestatus == 'WATCH' || usestatus == 'EDIT' ? <>
            <Divider
              style={{
                marginBottom: 10,
              }}
            />
            <div className="title">审核历史</div>
            {auditHistory.length == 0 ? <Empty description="暂无审核记录" /> : <Timeline mode="left">
              {auditHistory.map(v => {
                  return (
                    <Timeline.Item style={{ fontSize: '16px' }} label={v.CREATE_DATE + ' / ' + v.VPTP_STATUS_DESC}>
                        <p>审核人 : {v.WW_USERID_DESC}</p>
                        <p>审核内容 : {v.REASON}</p>
                    </Timeline.Item>
                  )
              })}
          </Timeline>}
        </> : ''}
        {usestatus == 'AUDIT' ? <>
            <Divider
              style={{
                marginBottom: 10,
              }}
            />
            <div className="title">审核说明</div>
            <TextArea ref={textarea} rows={3} placeholder="审核内容" />
            
        </> : ''}
      </Card>
      </Spin>
      <FooterToolbar extra={usestatus == 'AUDIT' ? <Radio.Group onChange={ChangePassState} defaultValue="AUDIT" buttonStyle="solid">
      <Radio value="AUDIT"> 通过</Radio>
      <Radio value="ROLLBACK"> 驳回</Radio>
    </Radio.Group> : ''}>
        {usestatus == 'AUDIT' || usestatus == 'EDIT' ? <Popconfirm
        title="你确定要提交吗？"
        onConfirm={UserSubmit}
      > <Button style={{marginRight: '10px'}} type="primary" loading={submitLoading}>
        提交
      </Button></Popconfirm> : ''}
        <Button onClick={()=>{
          history.goBack();
        }}>
          返回
        </Button>
      </FooterToolbar>
      <DrwaerSelect Openstate={state} SelectClinic={SelectClinic} close={setFalse} />
    </>
  );
}

export default connect(({ profileAndbasic, loading, selectclinic, user, global }) => ({
  profileAndbasic,
  Userloading: loading.effects['selectclinic/fetchClinicData'],
  selectclinic,
  user,
  global
}))(Basic);

// <Radio.Group onChange={ChangePassState} size="large" style={{marginTop: '15px'}} defaultValue="AUDIT" buttonStyle="solid">
//               <Radio.Button value="AUDIT"><CheckOutlined /> 通过</Radio.Button>
//               <Radio.Button value="ROLLBACK"><CloseOutlined /> 驳回</Radio.Button>
//             </Radio.Group>
