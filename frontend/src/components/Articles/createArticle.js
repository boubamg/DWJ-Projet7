import React, { Component, Fragment } from 'react'
import { Form, FormGroup, Label, Button, Input, Container } from 'reactstrap'
import articlesAPI from '../../Api/articlesAPI'
import { Redirect } from 'react-router-dom'

const headers = {
    'Authorization': localStorage.getItem('token'),
};

class createArticle extends Component {

    state = {
        errors : [],
        content: '',
        attachment: null,
        redirect: false
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let data = new FormData();
        data.append("content", this.state.content);
        data.append("attachment", this.state.attachment);

        articlesAPI.postArticles(data, headers)
            .then(() => {
                console.log("Article ajouté")
               this.setState({ redirect: true })
            })
            .catch(err => console.log(err))
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({ [name]: value })
    }

    handleOnFileChange = (e) => {  
        this.setState({ attachment: e.target.files[0] });
    }

    render () {

        if(this.state.redirect){
            return  <Redirect to='/post'/>
        }

        return (
            <Fragment>
                <Container className="container">
                    <Form encType='multipart/form-data' onSubmit={this.handleSubmit} id='form' >
                        <FormGroup>
                            <Label for="content">Text</Label>
                            <Input type="textarea" name="content" placeholder="Le contenu du post" required
                            value={this.state.content} onChange={this.handleChange}/>
                            {/* <span style={{color: "red"}}>{this.state.errors["content"]}</span> */}
                        </FormGroup>
                        <FormGroup>
                            <Label for="attachment"></Label>
                            <Input type="file" name="attachment" id="attachment"
                            onChange={this.handleOnFileChange} />
                            {/* <span style={{color: "red"}}>{this.state.errors["file"]}</span> */}
                        </FormGroup>
                        <Button type="submit" color="secondary" size="lg" block>Publier</Button>
                    </Form>
                </Container>
            </Fragment>
        )
    }
}

export default createArticle