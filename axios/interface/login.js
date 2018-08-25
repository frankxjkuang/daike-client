/*
 * @Author: kuangxj 
 * @Email: frankxjkuang@gmail.com 
 * @Date: 2018-08-09 15:12:24 
 * @Last Modified by: kaungxj
 * @Last Modified time: 2018-08-25 12:01:24
 * @Description: login api 
 */

import axios from './../api'

const login = data => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}

export default {
  login
}