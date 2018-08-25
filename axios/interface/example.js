/*
 * @Author: kuangxj 
 * @Email: frankxjkuang@gmail.com 
 * @Date: 2018-08-25 11:08:10 
 * @Last Modified by: kaungxj
 * @Last Modified time: 2018-08-25 11:09:23
 * @Description: example api 
 */

import axios from './../api'

const getExample = params => {
  return axios({
    url: '/example/get',
    method: 'get',
    params
  })
}

const postExample = data => {
  return axios({
    url: '/example/post',
    method: 'post',
    data
  })
}

export default {
  getExample,
  postExample
}