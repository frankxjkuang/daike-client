/*
 * @Author: kuangxj 
 * @Email: frankxjkuang@gmail.com 
 * @Date: 2018-08-09 15:12:40 
 * @Last Modified by: kaungxj
 * @Last Modified time: 2018-08-22 21:44:58
 * @Description: File desctiption 
 */

import axios from './../api';

const register = data => {
  return axios({
      url: '/register',
      method: 'post',
      data
  })
}

export default {
  register
}