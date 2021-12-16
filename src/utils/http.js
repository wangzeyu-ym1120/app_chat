import axios from 'axios'
import datahelper from './datahelper'
import qs from 'qs'

const axiosInstance = axios.create()
axiosInstance.defaults.timeout = 30000
axiosInstance.defaults.baseURL = process.env.VUE_APP_API_ROOT
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json charset=UTF-8'

axiosInstance.interceptors.request.use(
  conifg => {
    console.log('http-request-conifg', conifg)
    return conifg
  },
  error => {
    console.log('http-request-error', error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    console.log('http-response', response)
    if (response.data.code === 0) {
      return response.data.content
    }
  },
  error => {
    console.log('http-error', error)
  }
)

const get = (url, params = {}) => {
  const data = params || {}
  data['sendTime'] = new Date().getTime()
  return axiosInstance.get(url, {
    params: data
  })
}

const post = (url, params = { data: {}, contentType: '' }) => {
  if (datahelper.getValue(params, 'params.contentType') == 'form') {
    return axiosInstance.post(url, qs.stringify(params.data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
  if (datahelper.getValue(params, 'params.contentType') == 'formData') {
    return axiosInstance.post(url, params.data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } 

  return axiosInstance.post(url, params.data || params)
}

export default {
  get,
  post
}