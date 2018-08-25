/*
 * @Author: kuangxj 
 * @Email: frankxjkuang@gmail.com 
 * @Date: 2018-08-17 14:29:09 
 * @Last Modified by: kaungxj
 * @Last Modified time: 2018-08-22 21:44:53
 * @Description: publish api
 */

import axios from './../api'

const publishCourse = data => {
  return axios({
    url: '/publish',
    method: 'post',
    data
  })
}

export default {
  publishCourse
}