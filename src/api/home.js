import request from '@/utils/request'

/**
 * 首页轮播图
 * @returns
 */
export const swiper = () => {
  return request({
    url: '/home/swiper'
  })
}

/**
 * 租房小组
 */
export const groups = ({ area }) => {
  return request({
    url: '/home/groups',
    params: {
      area
    }
  })
}
