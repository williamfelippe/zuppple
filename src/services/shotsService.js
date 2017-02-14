import axios from 'axios';

axios.defaults.baseURL = 'https://api.dribbble.com/v1/';
axios.defaults.headers.common['Authorization'] = 'Bearer de7970dafed989201a01d7d35972df43fbecb1f9cb27450b76fdb24f19961253';

export function getListOfShots(page, perPage) {
    return axios.get('/shots', {
        params: {
            page: page,
            per_page: perPage
        }
    });
}

export function getShotById(shotId) {
    return axios.get('/shots/' + shotId);
}

export function getShotComments(shotId) {
    return axios.get('/shots/' + shotId + '/comments');
}

export function getShotAttachments(shotId) {
    return axios.get('/shots/' + shotId + '/attachments');
}

export function likeShot(id) {
    return axios.post('/shots/' + id + '/like');
}

export function unlikeShot(id) {
    return axios.delete('/shots/' + id + '/like');
}