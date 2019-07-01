import http from '../util/http';
export default {
    findAll() {
        return http.post('/version/findAll', {})
    },
    deleteVersion(data) {
        return http.post('/version/deleteVersion', data)
    },
    createVersion(data) {
        return http.post('/version/createVersion', data)
    },
    updateVersion(data) {
        return http.post('/version/updateVersion', data)
    },
    findPage(data){
        return http.post('/version/findPage',data)
    },
    upload(data){
        return http.fileUpload('/version/upload',data)
    }
}