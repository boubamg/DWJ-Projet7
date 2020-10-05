import React, { Component, Fragment } from 'react'
import commentAPI from '../../Api/commentAPI'
import Comment from './Comment'

const headers = {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
};

class Comments extends Component {

    state = {
        allComment: {}
    }

    componentDidMount () {
        const id = this.props.articleId
        commentAPI.getComments(id, headers)
        .then(comments => {
            this.setState({allComment: comments.data})
        })
        .catch(err => console.log(err))
    }

    handleDeleteComment = (articleId, commentId) => {
        commentAPI.deleteComments(articleId, commentId, headers)
        .then(() => console.log("Comment was deleted"))
        .catch(err => console.log(err))
    }

    render () {

        let {allComment} = this.state

        const listeComment = Object.keys(allComment)
        .map(id => (
            <Comment
                key={allComment[id].id} 
                profilePicture={allComment[id].User.profilePicture}
                name={allComment[id].User.firstname + ' ' + allComment[id].User.lastname}
                comment={allComment[id].commentText}
                handleDeleteComment={() => {this.handleDeleteComment(allComment[id].ArticleId,allComment[id].id)}}
            />
        ))


        return (
            <Fragment>
                {listeComment}
            </Fragment>
           
        )
    }
}

export default Comments