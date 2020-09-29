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

        let data = new FormData(event.target);

        data.append("content", this.state.content);
        data.append("attachment", this.state.attachment);

        let allData = {}
        for (let [key, value] of data) { 
            allData[key] = value
        }

        articlesAPI.postArticles(allData["content"], allData["attachment"], headers)
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
        console.log(this.state.attachment)

    }

    fileData = () => { 
     
        if (this.state.attachment) { 
            
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {this.state.attachment.name}</p> 
              <p>File Type: {this.state.attachment.type}</p> 
              <p> 
                Last Modified:{" "} 
                {this.state.attachment.lastModifiedDate.toDateString()} 
              </p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
              <h4>Choose before Pressing the Upload button</h4> 
            </div> 
          ); 
        } 
      }; 

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
                    {this.fileData()}
                </Container>
            </Fragment>
        )
    }
}

export default createArticle