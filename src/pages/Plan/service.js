import request from '@/utils/request';

export async function queryBasicProfile(params) {
  return request('/api/profile/basic', {
    method: 'POST',
    params,
  });
}
