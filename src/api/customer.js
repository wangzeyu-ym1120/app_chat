import http from "../utils/http"

export default {
  login: params => http.post('/login', params)
}