import React, { Component, Fragment } from 'react'
import API from '../../Api/articlesAPI'
import Article from './Article/Article';
import CreateArticleFrom from './createArticle'

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};


class allArticles extends Component {

    state = {
        posts: {},
        isLoaded: false,
        error : null
    }

    componentDidMount(){
        API.getArticles(headers)
        .then(articles => {
            this.setState({
                posts: articles.data,
                isLoaded: true})
            console.log(this.state.posts[0])
        })
        .catch(err => console.log(err))
    }

    handleLikeClick = (id) => {
        API.likeArticle(id, headers)
        .then(() => console.log("Article aimé"))
        .catch((err) => console.log(err))
    }

    render () {

        const {posts} = this.state

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