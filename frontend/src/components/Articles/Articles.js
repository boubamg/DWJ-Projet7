import React, { Component, Fragment } from 'react'
import articleAPI from '../../Api/articlesAPI'
import Article from './Article/Article';
import CreateArticleForm from './createArticle'
import { Redirect } from 'react-router-dom';
import CreateComment from '../Comments/createComment'


class allArticles extends Component {

    state = {
        posts: {},
        isLoaded: false,
        redirect: false,
        update: false,
        updateArticle: null,
        id: "",
        error : null,
        reqHeader: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    componentDidMount(){
        
        articleAPI.getArticles(this.state.reqHeader)
        .then(articles => {
            this.setState({
                posts: articles.data,
                isLoaded: true})
        })
        .catch(err => console.log(err))
    }

    handleLikeClick = (id) => {
        articleAPI.likeArticle(id, this.state.reqHeader)
        .then(() => console.log("Article aimé"))
        .catch((err) => console.log(err))
    }

    handleInfoClick = (id) => {
        this.setState({id, redirect: true})
    }

    handleDeletePost = (id) => {
        articleAPI.deleteArticle(id, this.state.reqHeader)
        .then(() => console.log("Article supprimé"))
        .catch(err => console.log(err))
    }

    handleUpdatePost = (id) => {
        this.setState({update: true, updateArticle: id})
    }

    render () {

        const {posts, redirect, update, updateArticle, id} = this.state

        if(redirect){
            return <Redirect to={"/post/" + id} />
        }

        if(update){
            return <Redirect to={'/post/update/' + updateArticle } />
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
            handleDelete={() => this.handleDeletePost(posts[id].id)}
            handleUpdate={() => this.handleUpdatePost(posts[id].id)}
            commentFormComponent={<CreateComment id={posts[id].id} />}
            creator={posts[id].UserId}
            articleId={posts[id].id}
            />
            // </a>
        ))

        return (
            <Fragment>
                <CreateArticleForm />
                {liste}
            </Fragment>
        )
    }
}

export default allArticles