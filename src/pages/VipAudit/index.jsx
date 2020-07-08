import { FileSearchOutlined,CarryOutOutlined } from '@ant-design/icons';
import { Button, Card, Input, DatePicker } from 'antd';
import React, { useState, useRef } from 'react';
import { history, connect } from 'umi'
import { port } from '@/services/globalquery';
import { useBoolean } from '@umijs/hooks'
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import moment from 'moment'
// import CreateForm from './components/CreateForm';
// import UpdateForm from './components/UpdateForm';

// import { queryRule } from './service';
import './index.less'

const VipAudit = ({vipAudit, dispatch}) => {
  const {defaultVal} = vipAudit;
  const collapsedState = useBoolean(false);
  const actionRef = useRef();
  const reloadTable = () => {
    actionRef.current.reload()
  }
  const ChangeDate = (val, isEnd) => {
      if (isEnd) {
          dispatch({
            type: 'vipAudit/changeDefaultVal',
            payload: {
              VISIT_DT_START: defaultVal.VISIT_DT_START,
              VISIT_DT_END: val.format('YYYY-MM-DD')
              
            }
          })
      } else {
          dispatch({
            type: 'vipAudit/changeDefaultVal',
            payload: {
              VISIT_DT_START: val.format('YYYY-MM-DD'),
              VISIT_DT_END: defaultVal.VISIT_DT_END
              
            }
          })
      }
      reloadTable()
  }
  const columns = [
    
    {
      title: '开始日期',
      dataIndex: 'VISIT_DT_START',
      hideInTable: true,
      valueType: 'date',
      value:moment().weekday(7).format('YYYY-MM-DD'),
      renderFormItem: (item,{ defaultRender, value, onChange, ...rest }, form) => {


        return <DatePicker allowClear={false} defaultValue={moment(defaultVal.VISIT_DT_START)} onChange={(val)=>{ChangeDate(val)}} style={{width: '100%'}} />
        // return defaultRender(item);
      },
    },
    {
      title: '结束日期',
      dataIndex: 'VISIT_DT_END',
      hideInTable: true,
      valueType: 'date',
      renderFormItem: (item, { defaultRender,value, onChange, ...rest }, form) => {

        return <DatePicker allowClear={false} defaultValue={moment(defaultVal.VISIT_DT_END)} onChange={(val)=>{ChangeDate(val, 1)}} style={{width: '100%'}} />
        // return defaultRender(item);
      },
    },
    {
      title: '客户姓名',
      dataIndex: 'VIP_NAME',
      valueType: 'textarea',
      hideInSearch: true
    },
    {
      title: '诊所名称',
      dataIndex: 'HPHP_NAME',
      valueType: 'text',
      renderFormItem: (item,{ defaultRender, value, onChange, ...rest }, form) => {

        return <Input  onChange={(val)=>{dispatch({
          type: 'vipAudit/changeDefaultVal',
          payload: {
            HPHP_NAME: val.target.value
          }
        }), form.setFieldsValue({
          HPHP_NAME: val.target.value
        })}} value={defaultVal.HPHP_NAME} placeholder="诊所名称" />;
      }
    },
    
    {
      title: '证件号',
      dataIndex: 'VIP_CERT_ID_NUM',
      sorter: false,
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: '手机号',
      dataIndex: 'VIP_CELL_PHONE',
      hideInForm: true,
      hideInSearch: true
    },
    {
      title: '优惠比例',
      dataIndex: 'VPVT_DISCOUNT',
      sorter: false,
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      render(text, record, index){
        return (
            <span>{Number(record.VPVT_DISCOUNT) * 100}%</span>
        )
      }
    },
    {
      title: '应付 / 已付',
      dataIndex: 'VPVT_DISCOUNT',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true,
      render(text, record, index){
        return (
            <span>￥{parseFloat(record.VPVT_ALLOW_AMT).toFixed(2)} / ￥{parseFloat(record.VPVT_FINAL_PAID).toFixed(2)}</span>
        )
      }
    },
    {
      title: '结算方式',
      dataIndex: 'PAY_TYPE_DESC',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true
    },
    {
      title: '审核状态',
      dataIndex: 'VPVT_AUDIT_STS_DESC',
      valueType: 'text',
      hideInSearch: true,
      hideInForm: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (text, row, index, action) => (
        <>
          {row.VPVT_AUDIT_STS > '09' && row.VPVT_AUDIT_STS <= '98' ?
          <>
          <a
            onClick={() => {
              history.push({
                pathname: '/vipAuditSts',
                query: {
                  VPVT_KY: row.VPVT_KY,
                  watch: 1
                }
              });
            }}
          ><FileSearchOutlined />查看</a>
          </> : <a onClick={()=>{
            history.push({
              pathname: '/vipAuditSts',
              query: {
                VPVT_KY: row.VPVT_KY
              }
            });
          }}><CarryOutOutlined /> 审核</a>}
          
        </>
      ),
    },
  ];
  /**
   * Table Post参数 
   * @param {*} params 
   */
  const request = async (params) => {
      Object.assign(params, defaultVal);
      params.SP_NAME = 'SP_VIP_VISIT_AUDIT_INFO_LIST';
      params.m = 'LIST';
      params.DB_NAME = 'DENTAL_CUSTOMER';
      
      params.page = params.current;
      params.rows = params.pageSize;
      let res = await port(params);
      res.data = res.rows;
      return res
  }
  return (
    <>
    <PageHeaderWrapper></PageHeaderWrapper>
    <Card size="small">
      <ProTable
        headerTitle="审核"
        actionRef={actionRef}
        search={{
          collapsed: false,
          optionRender: (btn, formconfig) => {
              return (
                <>
                  <Button type="primary" style={{marginRight: '10px', width: '120px'}} onClick={() => {
                    formconfig.form.submit();
                  }}>{btn.searchText}</Button>
                </>
              )
          }
        }}
        rowKey="key"
        request={request}
        columns={columns}
        pagination={{

          pageSizeOptions:[10],
          defaultPageSize: 10,
          hideOnSinglePage: true,
          pageSize: 15
        }}
      />
      </Card>
    </>
  );
};

export default connect(({vipAudit}) => ({
  vipAudit
}))(VipAudit)
