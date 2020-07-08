import request from '@/utils/request';
import defaultSetting from '@/../config/defaultSettings'

export async function queryRule(params) {
  return request('/api/rule', {
    method: 'POST',
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

export async function queryHpRule(params) {  
  return request(defaultSetting.PostUrl,{
    method: 'POST',
    data: params
  })
}