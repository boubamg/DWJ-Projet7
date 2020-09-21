import React, { Component, Fragment } from 'react'
import { Form, FormGroup, Label, Button, Input, Row, Container, Col } from 'reactstrap';
import userAPI from '../Api/userAPI'
import {Redirect} from 'react-router-dom'
//import './Connexion.css'


class Signup extends Component {

    state = {
        // init empty data
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        redirection: false,
        formIsValid: true,
        errors: {}
    }

    handleChange = (event) => {
        let { name, value} = event.target
        this.setState({ [name] : value })
    }

    verification = () => {
        const { firstname, lastname, email, password, confirmPassword, errors, formIsValid} = this.state

        if(!/^[A-Za-z]{2,}$/.test(firstname)){
            this.setState({formIsValid: false})
            errors["firstname"] = "Le prénom est incorrect";
        }
        if(!/^[A-Za-z]{2,}$/.test(lastname)){
            this.setState({formIsValid: false})
            errors["lastname"] = "Le nom est incorrect";
        }
        if(!/^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,}$/.test(email)){
            this.setState({formIsValid: false})
            errors["email"] = "L'email est incorrect";
        }
        if(!password || password.length < 8 ){
            this.setState({formIsValid: false})
            errors["password"] = "Le mot de passe doit avoir au moins 8 caractères";
        }
        if(confirmPassword !== password) {
            this.setState({formIsValid: false})
            errors["confirmPassword"] = "La confirmation du mot de passe est incorrect"
        }
        return formIsValid;
    }

    handleSubmit = event => {
        event.preventDefault()
        const { firstname, lastname, email, password} = this.state

        if(!this.verification()){
            return "Le formulaire contient des erreurs"
        }

        userAPI.signup(firstname, lastname ,email, password)
        .then(() => {
            this.setState({redirection: true})
        })
        .catch(error => {
            console.log(error);
        });
    }

    render () {

        const {redirection} = this.state;
        if(redirection){
            return <Redirect to='/'/>;
        }

        return (
            <Fragment>
                <Container>
                <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="firstname">Prénom</Label>
                                    <Input type="text" name="firstname"  placeholder="Prénom" required 
                                    value={this.state.firstname} onChange={this.handleChange}/>
                                    <span style={{color: "red"}}>{this.state.errors["firstname"]}</span>
                                </FormGroup>
                            </Col>
                            <Col xs="6">
                                <FormGroup>
                                    <Label for="lastname">Nom</Label>
                                    <Input type="text" name="lastname" placeholder="Nom" required 
                                    value={this.state.lastname} onChange={this.handleChange}/>
                                    <span style={{color: "red"}}>{this.state.errors["lastname"]}</span>
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" placeholder="exemple@exemple.com" required 
                            value={this.state.email} onChange={this.handleChange}/>
                            <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Mot de passe</Label>
                            <Input type="password" name="password" placeholder="Mot de passe" required
                            value={this.state.password} onChange={this.handleChange}/>
                            <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="corfirmPassword">Mot de passe</Label>
                            <Input type="password" name="confirmPassword" placeholder="Confirmation du mot de passe" required
                            value={this.state.confirmPassword} onChange={this.handleChange}/>
                            <span style={{color: "red"}}>{this.state.errors["confirmPassword"]}</span>
                        </FormGroup>
                        <Button block type="submit">S'inscrire</Button>
                    </Form>
                </Container>
            </Fragment>
        )
    }
}

export default Signup