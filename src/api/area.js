import request from '@/utils/request'

/**
 * 获取城市列表数据
 * @param {*} param0
 * @returns
 */
export const city = ({ level }) => {
  return request({
    url: '/area/city',
    params: { level }
  })
}

/**
 * 热门城市
 * @returns
 */
export const hot = () => {
  return request({
    url: '/area/hot'
  })
}

/**
 * 小区关键词查询
 * @param {*} param0
 * @returns
 */
export const community = ({ name, id }) => {
  return request({
    url: '/area/community',
    params: {
      name, id
    }
  })
}
