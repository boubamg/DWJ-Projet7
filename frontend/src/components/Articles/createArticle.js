import React, { Component } from 'react'
import articlesAPI from '../../Api/articlesAPI'
import { Redirect } from 'react-router-dom'
import ArticleForm from '../Form/Article_form'

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
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

    handleFileChange = (e) => {  
        this.setState({ attachment: e.target.files[0] });
    }

    render () {

        if(!localStorage.getItem('token')){
            return <Redirect to='/' />
        }

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

export default createArticle