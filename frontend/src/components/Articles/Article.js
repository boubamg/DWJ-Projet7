import React, { Component, Fragment } from 'react'
import API from '../../Api/articlesAPI'
import Article from '../Articles/Article/Article'

const headers = {
    'Authorization': localStorage.getItem('token')
};

class oneArticle extends Component {

    state = {
        post: {},
        isLoaded: false,
        error : null
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

    render () {

        const {post} = this.state

        let article = 
            <Article
            id={post.id}
            //profilePicture={post.User.profilePicture}
            //name={post.User}
            likes={post.likes}
            content={post.content} 
            attachment={post.attachment} 
            />

        return (
            <Fragment> 
                {article}
            </Fragment>
        )
    }
}

export default oneArticle