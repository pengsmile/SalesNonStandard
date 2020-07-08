import request from '@/utils/request';

import defaultSetting from '@/../config/defaultSettings'

export async function port(params, url) {
  return request(url ? url : defaultSetting.PostUrl, {
    method: 'POST',
    data: {
        ...params
    }
  })
}