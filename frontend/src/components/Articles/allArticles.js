import React, { Component } from 'react'
import API from '../../Api/articlesAPI'

const headers = {
    'Authorization': localStorage.getItem('token')
};

class allArticles extends Component {
    state = {
        posts: [],
        isLoaded: false,
        error : null
    }

    componentDidMount(){
        API.getArticles(headers)
        .then(articles => {
            this.setState({
                posts: articles.data,
                isLoaded: true
            })              
        })
        .catch(err => console.log(err))
    }

    render () {
        
        return (
            <div>
                <h1>Post</h1>
            </div>
        )
    }
}

export default allArticles