import React, { Component, Fragment } from 'react'
import API from '../../Api/articlesAPI'
import Article from './Article/Article';

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
        })
        .catch(err => console.log(err))
    }

    render () {

        const {posts} = this.state

        const liste = Object.keys(posts)
        .map(id => (
            <a href={'/post/' + posts[id].id}>
            <Article 
            key={posts[id].id}
            profilePicture={posts[id].User.profilePicture}
            name={posts[id].User.name}
            likes={posts[id].likes}
            content={posts[id].content} 
            attachment={posts[id].attachment}
            />
            </a>
        ))

        return (
            <Fragment>
                {liste.reverse()}
            </Fragment>
        )
    }
}

export default allArticles