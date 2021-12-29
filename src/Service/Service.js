import api from './api'

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMxYjhiZmU2ZDdkNzdjOGU0NzhhYjUiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQwNzUwNzkzLCJleHAiOjE2NDA3OTM5OTN9.B-4YUAaOiq2yUbzlgdSxefu8AL5TjZ3p0czPcTzO7R8'

export const subjectAPI = async (url) => {  
    const response = await api.get(url, {
        headers: {
            Authorization: token,
            'content-type': "application/json; charset=utf-8"
        }
    });
    return response.data;
}

export const questionsAPI = async(url) => {
    const response =await api.get(url, {
        headers: {
            Authorization: token,
            'content-type': "application/json; charset=utf-8"
        }
    });
   return response.data;
}