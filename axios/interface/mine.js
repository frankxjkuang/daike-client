/*
 * @Author: kuangxj 
 * @Email: frankxjkuang@gmail.com 
 * @Date: 2018-08-17 14:29:09 
 * @Last Modified by: kaungxj
 * @Last Modified time: 2018-08-22 21:44:46
 * @Description: mine api
 */

import axios from './../api'

const searchSchoolByName = data => {
  return axios({
    url: '/school',
    method: 'post',
    data
  })
}

const updateUser = data => {
  return axios({
    url: '/update/user',
    method: 'post',
    data
  })
}

export default {
  searchSchoolByName,
  updateUser
}