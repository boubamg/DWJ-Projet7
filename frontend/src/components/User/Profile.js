import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import API from '../../Api/userAPI'

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

class Profile extends Component {

    state = {
        user: {},
        redirect: false
    }

    componentDidMount() {
        API.getProfile(headers)
        .then(user => {
            this.setState({user : user.data})
            console.log(this.state.user)
        })
        .catch(err => console.log(err))
    }

    handleDelete = () => {
        API.deleteAccount(headers)
        .then(() => {
            console.log("Account was deleted")
            localStorage.clear()
            this.setState({redirect: true})
        })
        .catch(err => {
            console.log(err)
        })

    }

    render () {

        let {redirect} = this.state

        if(!localStorage.getItem('token')){
            return <Redirect to='/' />
        }

        if(redirect){
            return <Redirect to='/' />
        }

        return (
            <div>
                <h1>Profile</h1>
                <button onClick={this.handleDelete}>Supprimer le compte</button>
            </div>
        )
    }
}

export default Profile