import request from '@/utils/request'

/**
 * 获取用户的信息资料
 */
export const getUserInfo = () => {
  return request({
    url: '/user'
  })
}

/**
 * 用户退出
 * @returns
 */
export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

/**
 * 查看收藏列表
 */
export const getFavorites = () => {
  return request({
    url: '/user/favorites'
  })
}

/**
 * 查看已发布房源列表
 * @returns
 */
export const getUserHouseRent = () => {
  return request({
    url: '/user/houses'
  })
}

/**
 * 发布房源
 * @param {*} data
 * @returns
 */
export const houses = (data) => {
  return request({
    url: '/user/houses',
    method: 'post',
    data
  })
}

/**
 * 房屋是否收藏
 * @param {*} id
 * @returns
 */
export const isFavorites = (id) => {
  return request({
    url: `/user/favorites/${id}`
  })
}

/**
 * 添加收藏
 * @param {*} data
 * @returns
 */
export const addFavorites = (id) => {
  return request({
    method: 'post',
    url: `/user/favorites/${id}`
  })
}

/**
 * 删除收藏
 * @param {*} id
 * @returns
 */
export const delFavorites = (id) => {
  return request({
    method: 'delete',
    url: `/user/favorites/${id}`
  })
}
