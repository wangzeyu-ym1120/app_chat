import http from "../utils/http"

export default {
  login: params => http.post('/login', params),
  register: params => http.post('/register', params),
  queryUserList: params => http.get('/queryUserList', params),
  getUserInfo: params => http.get('/getUserInfo', params),
  getChatMsgList: params => http.get('/getChatMsgList', params)
}