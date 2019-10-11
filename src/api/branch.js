import http from '../util/http';
export default {
    update(data) {
        return http.post('/branch/update', data)
    },
    findPage(data) {
        return http.get('/branch/findPage', data)
    },
    delete(data) {
        return http.post('/branch/delete', data)
    },
    insert(data) {
        return http.post('/branch/insert', data)
    },
    findByProvince(data){
        return http.get('/branch/findByProvince',data)
    }

}