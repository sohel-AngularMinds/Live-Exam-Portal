import api from './api'

let token = localStorage.getItem('auth_token');

let header = {
    headers: {
        Authorization: token,
        'content-type': "application/json; charset=utf-8"
    }
}


export const subjectAPI = async (url) => {  
    const response = await api.get(url,header);
    return response.data;
}

export const questionsAPI = async(url) => {
    const response =await api.get(url,header);
   return response.data;
}

//delete Question
export  const deleteQuestion = async(url) => {
    const response = await api.delete(url,header);
    return response;
}

//add new Question
export const postQuestions = async (url,object)=>{
    // http://admin.liveexamcenter.in/api/questions
    const response = await api.post(url, object,header)
    return response
}

//update Old Question
export const putQuestion = async (url, object) => {
    //http://admin.liveexamcenter.in/api/questions/61d67a93e6d7d77c8e4eb037
    const response = await api.put(url, object,header)
    return response;
}