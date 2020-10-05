import React, { Component, Fragment } from 'react'
import {Redirect} from 'react-router-dom'
import API from '../../Api/articlesAPI'
import Article from '../Articles/Article/Article'
import CreateComment from '../Comments/createComment'

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

class oneArticle extends Component {

    state = {
        post: {},
        isLoaded: false,
        error : null,
        canUpdate: false,
        redirect: false
    }

    componentDidMount(){

        const queryString =  window.location.href;
        let id = queryString.split('/post/')[1]
        
        API.getOneArticle(id, headers)
        .then(article => {
            this.setState({
                post: article.data,
                isLoaded: true
            })            
            console.log(this.state.post)  
        })
        .catch(err => console.log(err))

    }

    userCanUpdate = async () => {

        let postUserId = await this.state.post.UserId

        if(parseInt(localStorage.getItem("userId")) === postUserId) {
            this.setState({ canUpdate: true })
        }

        return this.state.canUpdate
    }

    handleDelete = () => {
        API.deleteArticle(this.state.post.id, headers)
        .then(() => console.log("It was deleted"))
        .catch(err => console.log(err))

        this.setState({redirect: true})
    }

    handleLikeClick = (id) => {
        API.likeArticle(id, headers)
        .then(() => console.log("Article aimé"))
        .catch((err) => console.log(err))
    }

    render () {

        if(!localStorage.getItem('token')){
            return <Redirect to='/' />
        }

        const {post, redirect} = this.state

        if(redirect){
            return <Redirect to='/post' />
        }

        let article = 
            <Article
            id={post.id}
            //profilePicture={post.User.profilePicture}
            //name={post.User}
            likes={post.likes}
            content={post.content} 
            attachment={post.attachment}
            handleLikeClick={() => this.handleLikeClick(post.id)} 
            component={<CreateComment />}
            />

        return (
            <Fragment> 
                {article}
                {this.userCanUpdate ? <a href={'/post/update/' + post.id}>Update</a> : null}
                {this.userCanUpdate ? <button onClick={this.handleDelete}>Delete</button> : null}
            </Fragment>
        )
    }
}

export default oneArticle