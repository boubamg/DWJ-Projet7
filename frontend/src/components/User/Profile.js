import React, { Component } from 'react'
import userAPI from '../../Api/userAPI'

class Profile extends Component {

    state = {
        user: {}
    }

    componentDidMount() {
        userAPI.getProfile()
        .then(user => {
            this.setState({user : user.data})
            console.log(this.state.user)
        })
        .catch(err => console.log(err))
        
    }

    render () {
        return (
            <div>
                <h1>Profile</h1>
            </div>
        )
    }
}

export default Profile