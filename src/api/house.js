import request from '@/utils/request'

/**
 * 发布房屋所需的条件
 * @returns
 */
export const params = () => {
  return request({
    url: '/houses/params'
  })
}

/**
 * 获取房屋查询条件
 * @param {*} params
 * @returns
 */
export const condition = (params) => {
  return request({
    url: '/houses/condition',
    params
  })
}

/**
 * 根据条件查询房屋
 * @param {*} params
 * @returns
 */
export const houses = (params) => {
  return request({
    url: '/houses',
    params
  })
}

/**
 * 查询房屋具体信息
 * @param {*} id
 * @returns
 */
export const houseDetails = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
