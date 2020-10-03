import axios from 'axios'

const headers = {
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
    "Content-Type": "application/json",
    'Accept': 'application/json',
};

const baseUrl = "http://localhost:4000/api/user";

export default {

    signup : (firstname, lastname, email, password) => {
    return axios.post(baseUrl + "/signup", {firstname, lastname, email, password}, {headers})
    },

    login : (email, password) => {
    return axios.post(baseUrl + "/login", {email, password}, {headers});
    },

    getProfile : () => {
    return axios.get(baseUrl + "/me", {headers});
    },  

    putProfile : (data) => {
    return axios.put(baseUrl + "/me", data, {headers});
    }, 

    deleteAccount : () => {
    return axios.delete(baseUrl + "/me", {headers});
    }

}