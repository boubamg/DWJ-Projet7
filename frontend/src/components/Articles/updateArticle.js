import React, { Component } from 'react'
import articlesAPI from '../../Api/articlesAPI'
import { Redirect } from 'react-router-dom'
import ArticleForm from '../Form/Article_form'

const headers = {
    'Authorization': localStorage.getItem('token'),
};

class updateArticle extends Component {

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

        const queryString =  window.location.href;
        let id = queryString.split('/update/')[1]

        articlesAPI.putArticle(id, data, headers)
            .then(() => {
                console.log("Article mis à jour")
                this.setState({ redirect: true })
            })
            .catch(err => console.log(err))
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({ [name]: value })
    }

    handleFileChange = (e) => {  
        this.setState({ attachment: e.target.files[0] });
    }

    render () {

        if(this.state.redirect){
            return  <Redirect to='/post'/>
        }

        return (
           <ArticleForm 
           submit={this.handleSubmit}
           contentValue={this.state.content}
           contentChange={this.handleChange}
           attachmentChange={this.handleFileChange}
           /> 
        )
    }
}

export default updateArticle