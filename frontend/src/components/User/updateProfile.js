import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Label, Button, Input, Container } from 'reactstrap'
import API from '../../Api/userAPI'

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
            return <Redirect to='/me' />
        }

        return (
            <Fragment>
                <Container className="container">
                    <Form onSubmit={this.handleSubmit} id='form' >
                        <FormGroup>
                            <Label for="biography">Biographie</Label>
                            <Input type="textarea" name="biography" placeholder="Biography"
                            value={biography} onChange={this.handleChange} />
                            {/* <span style={{color: "red"}}>{contentError}</span> */}
                        </FormGroup>
                        <FormGroup>
                            <Label for="profilePicture">Photo de profil</Label>
                            <Input type="file" name="profilePicture" id="profilePicture"
                            onChange={this.profilePictureChange} />
                            {/* <span style={{color: "red"}}>{{attachmentError}}</span> */}
                        </FormGroup>
                        <Button type="submit" color="secondary" size="lg" block>Mettre à jour</Button>
                    </Form>
                </Container>
            </Fragment>
        )
    }
}

export default updateProfile