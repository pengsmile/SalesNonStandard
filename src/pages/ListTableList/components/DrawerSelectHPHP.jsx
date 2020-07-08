import React,{useState,useEffect}from 'react';
import { Drawer, Button,Spin, Row, Col, Input,message,List, Empty  } from 'antd';
import './DrawerSelectHPHP.css'
import { connect } from 'umi'
import { useBoolean, useMount, useUpdateEffect } from '@umijs/hooks'
import InfiniteScroll from 'react-infinite-scroller';
import { port } from '@/services/globalquery';
const { Search } = Input;


function Clinic (props) {
     const { Openstate, close, SelectClinic, selectclinic, dispatch, Userloading } = props;
     const [HPHP_NAME,setHPHP_NAME] = useState('');

     const handleInfiniteOnLoad = () => {
          if (Userloading) {
               return
          }
          if (selectclinic.page >= selectclinic.total) {
               dispatch({
                    type: 'selectclinic/switchHasMore'
               })
               return
          }
          let pages = selectclinic.page;
          let params = {
               DB_NAME: selectclinic.switchPlan ? 'DENTAL_CUSTOMER' : 'DENTAL_CONFIG',
               SP_NAME: selectclinic.switchPlan ? 'SP_VIP_SVCPROC_LIST' : 'SP_HOSPITAL_DETAIL_LIST',
               m:'LIST',
               rows: 20,
               page: ++pages
          }
          if (selectclinic.switchPlan) {
               params.SPPN_NAME = HPHP_NAME
               params.HPHP_ID = selectclinic.HPHP_ID;
          } else {
               params.HPHP_NAME = HPHP_NAME
          }

          dispatch({
               type: 'selectclinic/fetchClinicData',
               payload: params
          })
     };
     const search = (value) => {
          setHPHP_NAME(value)
          let params = {
               
               DB_NAME: selectclinic.switchPlan ? 'DENTAL_CUSTOMER' : 'DENTAL_CONFIG',
               SP_NAME:selectclinic.switchPlan ? 'SP_VIP_SVCPROC_LIST' : 'SP_HOSPITAL_DETAIL_LIST',
               m:'LIST',
               rows: 20,
               page: 1
          }
          if (selectclinic.switchPlan) {
               params.SPPN_NAME = value;
               params.HPHP_ID = selectclinic.HPHP_ID;
          } else {
               params.HPHP_NAME = value
          }
          let container = document.querySelector('.ant-drawer-body .ant-spin-container')
          if (container) {
               container.scrollTop = 0;
          }
          dispatch({
               type: 'selectclinic/fetchClinicData',
               payload: params
          })
     }

     return(
          
          <Drawer width={document.body.clientWidth < 1024 ? '80%' : '40%'} destroyOnClose={true} className="clinicbox" footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={()=>close()} type="primary">关闭</Button>
              </div>
            } visible={Openstate} onClose={()=> close()} closable={false}>
               
               <Search  enterButton="搜索"  onSearch={search}></Search>
               <Spin className="container" spinning={Userloading ? Userloading : false}>

                   <InfiniteScroll
                        initialLoad={false}
                        pageStart={1}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={selectclinic.hasMore}
                        useWindow={false}
                   >     
                         
                              <List
                                   dataSource={selectclinic.dataSource}
                                   renderItem={item => {
                                        return (
                                             <List.Item className="item" onClick={()=>{selectclinic.switchPlan? SelectClinic(item) : (close(),SelectClinic(item))}} key={selectclinic.switchPlan ? item.SPSP_KY : item.HPPN_ID}>
                                                  <List.Item.Meta title={selectclinic.switchPlan ? item.SPSP_NAME : item.HPHP_NAME} />
                                                  <div className="money">{selectclinic.switchPlan ? `￥${item.MAX_AMT}` : ''}</div>
                                             </List.Item>
                                             )
                                   }}
                                   >
                                   {selectclinic.dataSource.length == 0 ? <Empty /> : ''}
                                   {selectclinic.dataSource.length != 0 && Userloading && selectclinic.hasMore && (
                                   <div style={{textAlign: 'center'}} className="demo-loading-container">
                                        <Spin />
                                   </div>
                                   )}
                              </List>
                         
                        
                   </InfiniteScroll>
              </Spin>
               
          </Drawer>
          
        )
}

export default connect(({selectclinic, loading})=> ({
     selectclinic,
     Userloading: loading.effects['selectclinic/fetchClinicData']
}))(Clinic) 