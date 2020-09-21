import React, { Component, Fragment } from 'react'
import { Form, FormGroup, Label, Button, Input, Container } from 'reactstrap';
import userAPI from '../Api/userAPI'
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
            errors["password"] = "Le mot de passe doit avoir au moins 8 caractères";
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
                localStorage.setItem('token', 'Bearer '  + response.data.token)
                localStorage.setItem('userId', response.data.userId)
                // redirect
                this.setState({redirection: true})
            })
            .catch(err => console.log(err))
    }

    render () {
        
        if(this.state.redirection){
            return <Redirect to='/post'/>;
        }

        return (
            <Fragment>
                <Container className="container">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="exemple@exemple.com" required
                            value={this.state.email} onChange={this.handleChange}/>
                            <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Mot de passe</Label>
                            <Input type="password" name="password" id="password" placeholder="Mot de passe" required
                            value={this.state.password} onChange={this.handleChange}/>
                            <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                        </FormGroup>
                        <Button type="submit" color="secondary" size="lg" block>Se connecter</Button>
                    </Form>
                        <span className="line"></span>
                        <Button onClick={() => window.location.href='/signup'} >Créer un compte</Button>
                </Container>
            </Fragment>
        )
    }
}

export default loginForm