import axios from 'axios'

const headers = {
    'Authorization': localStorage.getItem('token'),
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

    changeProfile : (biography, profilePicture) => {
    return axios.put(baseUrl + "/me", {biography, profilePicture}, {headers});
    }, 

    deleteAccount : () => {
    return axios.delete(baseUrl + "/me", {headers});
    }

}