import React from "react";
import API from '../../Api/userAPI'
import { Redirect } from 'react-router-dom'
import ProfileComponent from './Profile/Profile'

import UpdateProfileForm from './updateProfile'

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

class Profile extends React.Component {

    state = {
        user: {},
        redirect: false
    }

  componentDidMount() {
  
    API.getProfile(headers)
    .then(user => {
        this.setState({
            user: user.data
        })
    })
    .catch(err => console.log(err))

    console.log(this.state.user)
    console.log(this.state.user.lastname)
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

  render() {

    const {user, redirect} = this.state

    if(!localStorage.getItem('token')){
        return <Redirect to='/' />
    }

    if(redirect){
        return <Redirect to='/' />
    }

    return ( 
      <ProfileComponent
        profilePicture={user.profilePicture}
        lastname={user.lastname} 
        firstname={user.firstname}
        email={user.email}
        biography={user.biography}
        component={<UpdateProfileForm />}
        handleDelete={this.handleDelete}
      />
    )
  }
}

export default Profile;
