import axios from 'axios'

const headers = {
    'Authorization': localStorage.getItem('token')
};


const baseUrl = "http://localhost:4000/api/article";

export default {

    getArticles : () => {
    return axios.get(baseUrl + "/", {headers})
    },

    postArticles : (data) => {
        return axios.post(baseUrl + "/", data , {headers} )
    },

    getOneArticle : (id) => {
        return axios.get(baseUrl + "/" + id, {headers} )
    },

    putArticle : (id, data) => {
        return axios.put(baseUrl + "/" + id, data , {headers} )
    },

    deleteArticle : (id) => {
        return axios.delete(baseUrl + "/" + id, {headers} )
    }

}