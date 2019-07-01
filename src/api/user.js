import http from '../util/http';
export default {
    login(data) {
        return http.post('/user/login', data)
    },
}