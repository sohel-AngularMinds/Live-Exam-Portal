import api from './api'

export const subjectAPI = () => {
    const response = api.get('/subjects?term=');
    console.log(response);
}

export const questionAPI = (url) => {
    const response = api.get(url);
    console.log(response);
}