import api from './api'

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMxYjhiZmU2ZDdkNzdjOGU0NzhhYjUiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQwOTI0Njg2LCJleHAiOjE2NDA5Njc4ODZ9.ZOtmYQGYvP0j5l6fYOu9grsWM7iEv45B8yfeKhbttjw'

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