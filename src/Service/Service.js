import api from './api'

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMxYjhiZmU2ZDdkNzdjOGU0NzhhYjUiLCJfYWN0aXZlT3JnIjoiNjE5Y2U0YThlNTg2ODUxNDYxMGM4ZGE3IiwiaWF0IjoxNjQxMjcyNjUyLCJleHAiOjE2NDEzMTU4NTJ9.3P20zA1ky9H1-7bgYxQ3ZbsNE8sSJNZLCGKeK442nTU'

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


export  const deleteQuestion = async(url) => {
    const response = await api.delete(url,{
        headers: {
            Authorization: token,
            'content-type': "application/json; charset=utf-8"
        }
    });
    return response;
}


export const postQuestions = async (url,object)=>{
    // http://admin.liveexamcenter.in/api/questions
    const response = await api.post(url, object,{
        headers: {
            Authorization: token,
            'content-type': "application/json; charset=utf-8"
        }
    })
    return response
}
