import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import API from '../../Api/userAPI'
import UpdateProfileForm from '../Form/updateProfile_form'

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

class updateProfile extends Component {

    state = {
        biography: "",
        profilePicture: null,
        redirect: false
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let data = new FormData()
        data.append("biography", this.state.biography)
        data.append("profilePicture", this.state.profilePicture)

        API.putProfile(data, headers)
        .then(() => {
            this.setState({redirect: true})
        })
        .catch(err => {
            console.log(err)
        })
    }

    profilePictureChange = (e) => {
        this.setState({ profilePicture: e.target.files[0]})
    }

    render () {

        let { biography, redirect } = this.state

        if(!localStorage.getItem('token')){
            return <Redirect to='/' />
        }

        if(redirect){
            return <Redirect to='/profile' />
        }

        return (
            <UpdateProfileForm
            biographyValue={biography}
            biographyChange={this.handleChange}
            profilePictureChange={this.profilePictureChange} 
            Submit={this.handleSubmit}
            />
        )
    }
}

export default updateProfile