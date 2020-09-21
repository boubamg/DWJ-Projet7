import axios from 'axios'

const headers = {
    //'Content-Type': 'multipart/form-data',
    "Content-Type": "application/json",
    'Accept': 'application/json',
};

const baseUrl = "http://localhost:4000/api/article";

export default {

    getArticles : (headers) => {
    return axios.get(baseUrl + "/", {headers})
    },

    postArticles : (content, attachment) => {
        return axios.post(baseUrl + "/", {content, attachment }, {headers})
    }

}