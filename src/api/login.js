import request from '@/utils/request'

/**
 * 登录
 * @param {*} data
 * @returns
 */
export const Login = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
