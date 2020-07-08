import { DownOutlined, PlusOutlined, EditOutlined, DeleteOutlined,CloseOutlined,FileSearchOutlined, UpOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Button, Divider,Form, DatePicker, Dropdown, Menu,Select, message, Input, Card, Popconfirm,Radio } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history, connect } from 'umi'
import { port } from '@/services/globalquery';
import { useBoolean, useMount, useUnmount } from '@umijs/hooks';
import DrawerPage from './components/DrawerNewPeronPage';
import DrawerSelectHPHP from './components/DrawerSelectHPHP';
import moment from 'moment';
import './index.less'
const { Option } = Select;
const { Search } = Input;

/**
 * * Table多选事件 , 保留代码，功能移除
 * @param {*} selectedRows 
 */
const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = (props) => {
  // const [hphp_id, setHPHP_ID] = useState('');
  const [column, setColumn] = useState([]);
  const { state, toggle, setTrue, setFalse } = useBoolean(false);
  const hpstate = useBoolean(false);
  const [UserInfo, setUserInfo] = useState({});
  const collapsedState = useBoolean(false);
  const { user, dispatch, global, selectclinic } = props
  const actionRef = useRef();
  const AUDIT_STATUS = user.userInfo[0].AUDIT_STATUS;
  // const AUDIT_STATUS = '01';
  const { userstatus, defaultVal } = global;

  useEffect(()=>{
    // 通知对象
    dispatch({
      type: 'global/fetchNoticesPeron',
      payload: {
        DB_NAME: 'OA_PROD',
        SP_NAME: 'SP_OANEW_GET_USERINFO_CUR_DEPARTMENT',
        m: 'SELECT',
      }
    })
    // 审核状态
    dispatch({
        type: 'global/fetchAuditStatus',
        payload: {
          SP_NAME: 'SP_STATUS_LIST',
          DB_NAME: 'DENTAL_CONFIG',
          STST_TYPE: 'VPTP_STATUS',
          m: 'SELECT'
        }
    })
    dispatch({
      type: 'selectclinic/fetchClinicData',
      payload: {
        DB_NAME:'DENTAL_CONFIG',
        SP_NAME:'SP_HOSPITAL_DETAIL_LIST',
        m:'LIST',
        HPHP_NAME: '',
        rows: 20,
        page: 1
      }
    })
},[])
  useUnmount(()=>{
    dispatch({
      type: 'selectclinic/cleanStatus'
    })
  })
  const cleanSelectHp = () => {
      // inputele.current.input.state.value = '';
      // setHPHP_ID('');
      dispatch({
          type: 'global/changeDefaultVal',
          payload: {
              HPHP_ID: '',
              HPHP_NAME: ''
          }
      })
      reloadTable();
  }
  const suffix = (
    <CloseOutlined
      onClick={cleanSelectHp}
      style={{
        fontSize: 14
      }}
    />
  );
  // 切换搜索日期表单
  const ChangeDate = (val, isEnd) => {
      // val为空时
      // if (!val) {
      //     dispatch({
      //       type: 'global/changeDate',
      //       payload: {
      //         END_DATE: isEnd ? '' : defaultVal.END_DATE,
      //       START_DATE: isEnd ? defaultVal.START_DATE : ''
      //       }
      //     })
      //     return
      // }
      if (isEnd) {
          dispatch({
            type: 'global/changeDefaultVal',
            payload: {
              START_DATE: defaultVal.START_DATE,
              END_DATE: val.format('YYYY-MM-DD')
              
            }
          })
      } else {
          dispatch({
            type: 'global/changeDefaultVal',
            payload: {
              START_DATE: val.format('YYYY-MM-DD'),
              END_DATE: defaultVal.END_DATE
              
            }
          })
      }
      reloadTable()
  }
  const columns = [
    {
      title: '客户信息',
      dataIndex: 'MEME_INFO',
      valueType: 'text',
      hideInTable: true,
      renderFormItem: (item,{ defaultRender, value, onChange, ...rest }, form) => {

        return <Input  onChange={(val)=>{dispatch({
          type: 'global/changeDefaultVal',
          payload: {
              MEME_INFO: val.target.value
          }
        }), form.setFieldsValue({
          MEME_INFO: val.target.value
        })}} value={defaultVal.MEME_INFO} placeholder="客户信息" />;
      }
    },
    {
      title: '开始日期',
      dataIndex: 'START_DATE',
      hideInTable: true,
      valueType: 'date',
      value:moment().weekday(7).format('YYYY-MM-DD'),
      renderFormItem: (item,{ defaultRender, value, onChange, ...rest }, form) => {


        return <DatePicker allowClear={false} defaultValue={moment(defaultVal.START_DATE)} onChange={(val)=>{ChangeDate(val)}} style={{width: '100%'}} />
        // return defaultRender(item);
      },
    },
    {
      title: '结束日期',
      dataIndex: 'END_DATE',
      hideInTable: true,
      valueType: 'date',
      renderFormItem: (item, { defaultRender,value, onChange, ...rest }, form) => {

        return <DatePicker allowClear={false} defaultValue={moment(defaultVal.END_DATE)} onChange={(val)=>{ChangeDate(val, 1)}} style={{width: '100%'}} />
        // return defaultRender(item);
      },
    },
    {
      title: '诊所',
      hideInTable: true,
      dataIndex: 'HPHP_NAME',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        // const status = form.getFieldValue('status');

        return <Search
            placeholder="添加诊所"
            enterButton="选择"
            suffix={suffix}
            readOnly
            value={defaultVal.HPHP_NAME}
            ref={inputele}
            onSearch={SelectHPHP}
          />;
      }
    },
    {
      title: '审核状态',
      dataIndex: 'VPTP_STATUS',
      hideInTable: true,
      renderFormItem: (item, render, form) => {
          const { defaultRender, ...rest } = render;
          return <Select onChange={(val)=>{dispatch({
            type: 'global/changeDefaultVal',
            payload: {
              VPTP_STATUS: val
            }
          }),form.setFieldsValue({
            VPTP_STATUS: val
          }), reloadTable()}} value={defaultVal.VPTP_STATUS} placeholder="请选择审核状态">
                    <Option value="">请选择</Option>
                    {global.share.AuditStatus.length != 0 && global.share.AuditStatus.map((v, i)=>{
                        if(v.STST_VALUE == '99'){
                            return
                        }
                        return <Option key={i} value={v.STST_VALUE}>{v.STST_NAME}</Option>
                    })}
                  </Select>
      }
    }
  ];
  let options = (status) => {
      return {
        title: '操作',
        width: 310,
        dataIndex: 'option',
        valueType: 'option',
        render: (text, row, index, action) => (
          <>
            {user.userInfo.length != 0 && AUDIT_STATUS == '01' ? 
            <>
                <a onClick={()=>{
                  history.push({
                    pathname: '/NewPlan',
                    query: {
                      VIP_KY: row.VIP_KY
                    }
                  });
                }}> <PlusOutlined /> 新增方案</a>
                <Divider type="vertical" />
                {
                  AUDIT_STATUS < row.VPTP_STATUS ? <>{status == '0' ? '' : <a onClick={()=>{
                    history.push({
                      pathname: '/NewPlan',
                      query: {
                        VIP_KY: row.VIP_KY,
                        VPTP_KY: row.VPTP_KY,
                        watch: 1
                      }
                    });
                  }}><FileSearchOutlined /> 查看</a>}</> : <>
                      <a onClick={()=>{
                        if (status == '0') {
                          setUserInfo({
                              VIP_KY: row.VIP_KY
                          })
                          setTrue()
                        } else {
                            history.push({
                              pathname: '/NewPlan',
                              query: {
                                VIP_KY: row.VIP_KY,
                                VPTP_KY: row.VPTP_KY
                              }
                            });
                        }
                    }}> <EditOutlined /> 修改{status == '0' ? '客户' : '方案'}</a>
                    <Divider type="vertical" />
                    <Popconfirm icon={<DeleteOutlined/>} title={`是否停用${status == '0' ? '客户' : '方案'}`} onConfirm={()=>BlockUser(row,status)}>
                        <a
                          style={{color: 'red'}}
                        ><DeleteOutlined /> 停用{status == '0' ? '客户' : '方案'}
                        </a>
                    </Popconfirm>
                  </>
                }

                
              
            </> : AUDIT_STATUS <= row.VPTP_STATUS ? <a onClick={()=>{
                if (status == '0') {
                  setUserInfo({
                    VIP_KY: row.VIP_KY,
                    watch: 1
                  })
                  setTrue()
                } else {
                  history.push({
                    pathname: '/NewPlan',
                    query: {
                      VIP_KY: row.VIP_KY,
                      VPTP_KY: row.VPTP_KY,
                      watch: 1
                    }
                  });
                }
              
            }}><FileSearchOutlined /> 查看方案</a> : <>{status == '0' ? <a onClick={()=>{
              if (status == '0') {
                setUserInfo({
                  VIP_KY: row.VIP_KY,
                  watch: 1
                })
                setTrue()
              }
          }}><FileSearchOutlined /> 查看客户信息</a> : <a onClick={()=>{
              history.push({
                pathname: '/NewPlan',
                query: {
                  VIP_KY: row.VIP_KY,
                  VPTP_KY: row.VPTP_KY
                }
              });
            }}> <CarryOutOutlined /> 审核</a>}</>
            }
          </>
        )
  }
  };
  // VIP客户表格
  let VIPTable = [{
      title: '客户姓名',
      hideInSearch: true,
      dataIndex: 'VIP_NAME'
    },{
      title: '联系方式',
      hideInSearch: true,
      dataIndex: 'VIP_CELL_PHONE'
    },{
      title: '诊所',
      hideInSearch: true,
      dataIndex: 'HPPN_NAME',
      render(text, record, index){
        return (
            <span>[{record.HPPN_NAME}]{record.HPHP_NAME}</span>
        )
      }
    },{
      title: '优惠额度',
      hideInSearch: true,
      dataIndex: 'LIMIT_AMT',
      render(text, record, index){
        return (
            <span>￥{record.LIMIT_AMT}</span>
        )
      }
    },{
      title: '额度内优惠比例',
      hideInSearch: true,
      dataIndex: 'SPEC_DISCOUNT',
      render(text, record, index){
        return (
            <span>{Number(record.SPEC_DISCOUNT) * 100}%</span>
        )
      }
    },{
      title: '额度外优惠比例',
      hideInSearch: true,
      dataIndex: 'DISCOUNT',
      render(text, record, index){
        return (
            <span>{Number(record.DISCOUNT) * 100}%</span>
        )
      }
    },{
      title: '结算方式',
      hideInSearch: true,
      dataIndex: 'PAY_TYPE_DESC'
    },{
      title: '创建人',
      hideInSearch: true,
      dataIndex: 'WW_USERID_DESC'
    },{
      title: '创建时间',
      hideInSearch: true,
      dataIndex: 'CREATE_DATE'
    }];
  // 治疗方案表格
  let VTPTable = [{
    title: '姓名',
    hideInSearch: true,
    dataIndex: 'VIP_NAME'
  },{
    title: '联系方式',
    hideInSearch: true,
    dataIndex: 'VIP_CELL_PHONE'
  },{
    title: '诊所',
    hideInSearch: true,
    dataIndex: 'HPPN_NAME',
    render(text, record, index){
      return (
          <span>[{record.HPPN_NAME}]{record.HPHP_NAME}</span>
      )
    }
  },{
    title: '优惠额度',
    hideInSearch: true,
    dataIndex: 'AUDIT_LIMIT_AMT',
    render(text, record, index){
      return (
          <span>￥{record.AUDIT_LIMIT_AMT}</span>
      )
    }
  },{
    title: '额度内优惠比例',
    hideInSearch: true,
    dataIndex: 'AUDIT_SPEC_DISCOUNT',
    render(text, record, index){
        return (
            <span>{Number(record.AUDIT_SPEC_DISCOUNT) * 100}%</span>
        )
    }
  },{
    title: '超额优惠比例',
    hideInSearch: true,
    dataIndex: 'AUDIT_DISCOUNT',
    render(text, record, index){
        return (
            <span>{Number(record.AUDIT_DISCOUNT) * 100}%</span>
        )
    }
  },{
    title: '结算方式',
    hideInSearch: true,
    dataIndex: 'PAY_TYPE_DESC'
  },{
    title: '审核状态',
    hideInSearch: true,
    dataIndex: 'VPTP_STATUS_DESC'
  },{
    title: '创建人',
    hideInSearch: true,
    dataIndex: 'WW_USERID_DESC'
  },{
    title: '创建日期',
    hideInSearch: true,
    dataIndex: 'CREATE_DATE'
  },];
  useMount(()=>{
    if (AUDIT_STATUS !== '01') {
      switchStatus('1')
      dispatch({
        type: 'global/changeUserState',
        payload: '1'
      });
    } else {
      switchStatus(userstatus)
    }
    
  })
  const ChangeStatus = (val) => {
  
      switchStatus(val.target.value)
      dispatch({
        type: 'global/changeUserState',
        payload: val.target.value
      });
      actionRef.current.reload()
  }
  const switchStatus = (status) => {
    if (status == '0') {
      let data = columns.concat(VIPTable, options(status));
      setColumn(data);
    } else {
      let data = columns.concat(VTPTable, options(status));
      setColumn(data);
    }
  }
  const SelectHPHP = () => {
    hpstate.setTrue()
    dispatch({
      type: 'selectclinic/fetchClinicData',
      payload: {
        DB_NAME:'DENTAL_CONFIG',
        SP_NAME:'SP_HOSPITAL_DETAIL_LIST',
        m:'LIST',
        HPHP_NAME: '',
        rows: 20,
        page: 1
      }
    })
  }
  let inputele = useRef();
  /**
   * * 选择诊所
   * @param {} item 
   */
  const SelectClinic = (item) => {

      dispatch({
        type: 'global/changeDefaultVal',
        payload:{
            HPHP_ID: item.HPHP_ID,
            HPHP_NAME: item.HPHP_NAME
        }
      })
      actionRef.current.reload()
  }
  
  
  const NewScheme = () => {
    setUserInfo({
      status: 'NEW'
    })
    setTrue()
    
  }
  /**
   * * 停用事件
   * @param {row, status} row 为每行数据， status为当前切换状态
   */
  const BlockUser = async (row, status) => {
    let hide = message.loading('停用中,请稍后...', 0);
    let params = {
      DB_NAME: 'DENTAL_CUSTOMER'
    }
    if (status == '0') {
      Object.assign(params, {
        VIP_KY: row.VIP_KY,
        m: 'REVOKE',
        SP_NAME: 'SP_VIP_REVOKE',
      })
    } else {
      Object.assign(params, {
          AUDIT_ACTION: 'REVOKE',
          VPTP_KY: row.VPTP_KY,
          m: 'UPDATE',
          SP_NAME: 'SP_VIP_TREATMENT_AUDITING',
      })
    }
    let respone = await port(params);
    hide();
    if (!respone.RETURN_CODE) {
      message.success(respone.RETURN_MESSAGE);
      reloadTable();
    } else {
      message.error(respone.RETURN_MESSAGE);
    }

  }
  /**
   * Table Post参数 
   * @param {*} params 
   */
  const request = async (params) => {
      Object.assign(params, defaultVal);
      delete params.HPHP_NAME
      params.SP_NAME = 'SP_VIP_VTP_LIST';
      params.VIEW_TYPE = userstatus == '0' ? 'VIP' : 'VTP';
      params.m = 'LIST';
      params.DB_NAME = 'DENTAL_CUSTOMER';
      
      params.page = params.current;
      params.rows = params.pageSize;
      let res = await port(params);
      res.data = res.rows;
      return res
  }
  const reloadTable = () => {
    actionRef.current.reload()
  }
  return (
    <>
    <PageHeaderWrapper></PageHeaderWrapper>
      <Card size="small">
      <Radio.Group onChange={ChangeStatus} value={userstatus} buttonStyle="solid">
        <Radio.Button value="0">客户信息</Radio.Button>
        <Radio.Button value="1">治疗方案</Radio.Button>
      </Radio.Group>
      <ProTable
        headerTitle="查询"
        options={{setting: true}}
        search={{
          collapsed: collapsedState.state,
          resetText: '',
          onCollapse: (collapsed) => {
              if (collapsed) {
                collapsedState.setTrue()
              } else {
                collapsedState.setFalse()
              }
          },
          collapseRender: (collapsed) => {
              return collapsed ? <span>展开 <DownOutlined /></span> : <span>收起 <UpOutlined /></span>
          },
          // optionRender: (btn, formconfig) => {
          //     return (
          //       <>
          //         <Button type="primary" style={{marginRight: '10px'}} onClick={() => {
          //           formconfig.form.submit();
          //         }}>{btn.searchText}</Button>

          //         <Button onClick={() => {
          //           setHPHP_NAME('');
          //           formconfig.form.resetFields();
          //           reloadTable();
          //         }}>{btn.resetText}</Button>
          //       </>
          //     )
          // }
        }}
        beforeSearchSubmit={(param)=> {
            return param
        }}
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          AUDIT_STATUS == '01' ? <Button type="primary" onClick={NewScheme}>
          <PlusOutlined /> 新建客户
          </Button>: '',
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        
        request={request}
        columns={column}
        
        pagination={{

          pageSizeOptions:[10],
          defaultPageSize: 10,
          hideOnSinglePage: true,
          pageSize: 15
        }}
      />
      <Radio.Group style={{marginTop: '20px'}} onChange={ChangeStatus} value={userstatus} buttonStyle="solid">
        <Radio.Button value="0">客户信息</Radio.Button>
        <Radio.Button value="1">治疗方案</Radio.Button>
      </Radio.Group>
    </Card>
    <DrawerPage reload={reloadTable} userInfo={UserInfo} userstate={state} close={setFalse} />
    <DrawerSelectHPHP Openstate={hpstate.state} SelectClinic={SelectClinic} close={hpstate.setFalse} />
    </>
  );
};

export default connect(({ user, global, selectclinic })=>({
  user,
  global,
  selectclinic
}))(TableList)

// 已选择 文字描述
// tableAlertRender={({ selectedRowKeys, selectedRows }) => (
//   <div>
//     已选择{' '}
//     <a
//       style={{
//         fontWeight: 600,
//       }}
//     >
//       {selectedRowKeys.length}
//     </a>{' '}
//     项&nbsp;&nbsp;
//     <span>
//       服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
//     </span>
//   </div>
// )}
// rowSelection={{}}
// params={{
//   sorter,
// }}

// <ProTable
//   onSubmit={async value => {
//     const success = await handleAdd(value);

//     if (success) {
//       handleModalVisible(false);

//       if (actionRef.current) {
//         actionRef.current.reload();
//       }
//     }
//   }}
//   rowKey="key"
//   type="form"
//   columns={columns}
//   rowSelection={{}}
// />

// <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        
// </CreateForm>