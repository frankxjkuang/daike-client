/*
 * @Author: kuangxj 
 * @Email: frankxjkuang@gmail.com 
 * @Date: 2018-08-22 11:38:38 
 * @Last Modified by: kaungxj
 * @Last Modified time: 2018-08-22 21:45:14
 * @Description: substitute api 
 */

import axios from './../api'

const getCourse = data => {
  return axios({
    url: '/course',
    method: 'post',
    data
  })
}

const substitute = data => {
  return axios({
    url: '/substitute',
    method: 'post',
    data
  })
}

const collectCourse = data => {
  return axios({
    url: '/collect',
    method: 'post',
    data
  })
}

const getCourseByType = data => {
  return axios({
    url: '/course/type',
    method: 'post',
    data
  })
}

export default {
  getCourse,
  substitute,
  collectCourse,
  getCourseByType
}