import request from '@/utils/request'

/**
 * 房屋图像上传
 * @param {*} param0
 * @returns
 */
export const image = (file) => {
  return request({
    method: 'post',
    url: '/houses/image',
    data: file
  })
}
