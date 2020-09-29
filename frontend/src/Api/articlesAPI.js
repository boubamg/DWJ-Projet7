import axios from 'axios'


const baseUrl = "http://localhost:4000/api/article";

export default {

    getArticles : (headers) => {
    return axios.get(baseUrl + "/", {headers})
    },

    postArticles : (attachment, headers) => {
        return axios.post(baseUrl + "/", {attachment} , {headers} )
    }

}