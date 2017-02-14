import axios from 'axios';

axios.defaults.baseURL = 'https://api.dribbble.com/v1/';
axios.defaults.headers.common['Authorization'] = 'Bearer de7970dafed989201a01d7d35972df43fbecb1f9cb27450b76fdb24f19961253';

export function getUserById(id) {
    return axios.get('/users/' + id);
}

export function getUserShots(userId) {
    return axios.get('/users/' + userId + '/shots');
}