import http from '../util/http';
export default {
    login(data) {
        return http.post('/user/login', data)
    },
    register(data){
        return http.post('/user/register',data)
    },
    update(data){
        return http.post('/user/update',data)
    },
    findPage(data){
        return http.get('/user/findPage',data)
    },
    delete(data){
        return http.post('/user/delete',data)
    },
    resetPassword(data){
        return http.post('/user/resetPassword',data)
    }
}