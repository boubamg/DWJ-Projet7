import React, { Component } from 'react'

import SignIn from '../../Form/Login_form'
import userAPI from '../../../Api/userAPI'
import {Redirect} from 'react-router-dom'
import './Connexion.css'

class loginForm extends Component {

    state = {
        email: "",
        password: "",
        isValidForm: true,
        errors : {},
        redirection: false
    }

    handleChange = event => {
        const {name,value} = event.target;
        this.setState({[name]: value})
    }

    verification = () => {
        const {email, password, errors, isValidForm} = this.state;
        if(!/^[A-Za-z0-9_.-]+@[A-Za-z0-9_.-]+\.[A-Za-z]{2,}$/.test(email)){
        errors['email'] = "L'email est invalide";
        this.setState({isValidForm: false})
        }

        if(!password || password.length < 8 ){
            errors["password"] = "Le mot de passe doit contenir au moins 8 caractères";
            this.setState({formIsValid: false})
        }
        return isValidForm;
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {email, password} = this.state

        if(!this.verification()){
            return "Le formulaire contient des erreurs"
        }

        userAPI.login(email, password)
            .then(response => { 
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                // redirect
                this.setState({redirection: true})
            })
            .catch(err => console.log(err))
    }

    render () {

        if(localStorage.getItem('token')){
            return <Redirect to='/post' />
        }
        
        if(this.state.redirection){
            return <Redirect to='/post'/>;
        }

        let {email, password} = this.state

        return (

            <SignIn
            emailValue={email}
            passwordValue={password}
            Change={this.handleChange} 
            Submit={this.handleSubmit}
            />
        )
    }
}

export default loginForm