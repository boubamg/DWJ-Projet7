import React, { Component, Fragment } from 'react'
import API from '../../Api/articlesAPI'
import Article from './Article/Article';
import CreateArticleFrom from './createArticle'
import { Redirect } from 'react-router-dom';

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};


class allArticles extends Component {

    state = {
        posts: {},
        isLoaded: false,
        redirect: false,
        id: "",
        error : null
    }

    componentDidMount(){
        API.getArticles(headers)
        .then(articles => {
            this.setState({
                posts: articles.data,
                isLoaded: true})
        })
        .catch(err => console.log(err))
    }

    handleLikeClick = (id) => {
        API.likeArticle(id, headers)
        .then(() => console.log("Article aimé"))
        .catch((err) => console.log(err))
    }

    handleInfoClick = (id) => {
        this.setState({id, redirect: true})
    }

    render () {

        const {posts, redirect, id} = this.state

        if(redirect){
            return <Redirect to={"/post/" + id} />
        }

        const liste = Object.keys(posts)
        .map(id => (
            // <a href={'/post/' + posts[id].id}>
            <Article 
            key={posts[id].id}
            profilePicture={posts[id].User.profilePicture}
            name={posts[id].User.firstname + ' ' + posts[id].User.lastname}
            likes={posts[id].likes}
            content={posts[id].content} 
            attachment={posts[id].attachment}
            handleLikeClick={() => this.handleLikeClick(posts[id].id)}
            moreInfoClick={() => this.handleInfoClick(posts[id].id)}
            />
            // </a>
        ))

        return (
            <Fragment>
                <CreateArticleFrom />
                {liste.reverse()}
            </Fragment>
        )
    }
}

export default allArticles